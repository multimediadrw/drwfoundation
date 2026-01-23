import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const owner = 'multimediadrw'
const repo = 'drwfoundation'
const branch = 'main'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Convert data to JSON string
    const content = JSON.stringify(data, null, 2)
    const contentBase64 = Buffer.from(content).toString('base64')
    
    const filePath = 'content/tentang.json'
    
    // Get current file SHA (if exists)
    let sha: string | undefined
    try {
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref: branch,
      })
      
      if ('sha' in fileData) {
        sha = fileData.sha
      }
    } catch (error) {
      // File doesn't exist yet, that's okay
      console.log('File does not exist yet, will create new')
    }
    
    // Create or update file
    const response = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: `Update halaman tentang`,
      content: contentBase64,
      branch,
      ...(sha && { sha }),
    })
    
    return NextResponse.json({
      success: true,
      message: 'Data tentang berhasil disimpan',
      commit: response.data.commit.sha
    })
  } catch (error) {
    console.error('Error saving tentang data:', error)
    return NextResponse.json(
      { error: 'Gagal menyimpan data tentang' },
      { status: 500 }
    )
  }
}
