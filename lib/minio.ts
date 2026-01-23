import * as Minio from 'minio'

// MinIO configuration
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
})

const BUCKET_NAME = process.env.MINIO_BUCKET || 'drwfoundation'

// Ensure bucket exists
export async function ensureBucket() {
  const exists = await minioClient.bucketExists(BUCKET_NAME)
  if (!exists) {
    await minioClient.makeBucket(BUCKET_NAME, 'us-east-1')
    
    // Set public read policy
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
        },
      ],
    }
    await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy))
  }
}

// Upload file to MinIO
export async function uploadFile(
  file: Buffer,
  fileName: string,
  contentType: string = 'application/octet-stream'
): Promise<string> {
  await ensureBucket()
  
  const objectName = `images/${Date.now()}-${fileName}`
  
  await minioClient.putObject(BUCKET_NAME, objectName, file, file.length, {
    'Content-Type': contentType,
  })
  
  // Return public URL
  const protocol = process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http'
  const endpoint = process.env.MINIO_ENDPOINT || 'localhost'
  const port = process.env.MINIO_PORT || '9000'
  
  return `${protocol}://${endpoint}:${port}/${BUCKET_NAME}/${objectName}`
}

// Get presigned URL for private files
export async function getPresignedUrl(objectName: string, expiry: number = 86400): Promise<string> {
  return await minioClient.presignedGetObject(BUCKET_NAME, objectName, expiry)
}

// Delete file from MinIO
export async function deleteFile(objectName: string): Promise<void> {
  await minioClient.removeObject(BUCKET_NAME, objectName)
}

export default minioClient
