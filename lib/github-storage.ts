import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const owner = 'multimediadrw'
const repo = 'drwfoundation'
const branch = 'main'

export async function savePostToGitHub(slug: string, content: string) {
  try {
    const path = `content/posts/${slug}.md`
    
    // Get current file SHA (needed for update)
    let sha: string | undefined
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      })
      
      if ('sha' in data) {
        sha = data.sha
      }
    } catch (error) {
      // File doesn't exist, will create new
      sha = undefined
    }

    // Commit the file
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Update article: ${slug}`,
      content: Buffer.from(content).toString('base64'),
      branch,
      sha
    })

    return { success: true, commit: data.commit.sha }
  } catch (error) {
    console.error('Error saving to GitHub:', error)
    return { success: false, error: 'Failed to commit to GitHub' }
  }
}

export async function getPostFromGitHub(slug: string) {
  try {
    const path = `content/posts/${slug}.md`
    
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    })

    if ('content' in data && data.content) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8')
      return { success: true, content }
    }

    return { success: false, error: 'File not found' }
  } catch (error) {
    console.error('Error reading from GitHub:', error)
    return { success: false, error: 'Failed to read from GitHub' }
  }
}

export async function saveLaporanToGitHub(data: any) {
  try {
    const path = 'data/laporan.json'
    const content = JSON.stringify(data, null, 2)
    
    // Get current file SHA
    let sha: string | undefined
    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      })
      
      if ('sha' in fileData) {
        sha = fileData.sha
      }
    } catch (error) {
      // File doesn't exist, will create new
      sha = undefined
    }

    // Commit the file
    const { data: commitData } = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'Update laporan data',
      content: Buffer.from(content).toString('base64'),
      branch,
      sha
    })

    return { success: true, commit: commitData.commit.sha }
  } catch (error) {
    console.error('Error saving laporan to GitHub:', error)
    return { success: false, error: 'Failed to commit laporan to GitHub' }
  }
}

export async function getLaporanFromGitHub() {
  try {
    const path = 'data/laporan.json'
    
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    })

    if ('content' in data && data.content) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8')
      return { success: true, data: JSON.parse(content) }
    }

    return { success: false, error: 'File not found' }
  } catch (error) {
    console.error('Error reading laporan from GitHub:', error)
    return { success: false, error: 'Failed to read laporan from GitHub' }
  }
}

export async function savePageToGitHub(slug: string, content: string) {
  try {
    const path = `content/pages/${slug}.md`
    
    // Get current file SHA (needed for update)
    let sha: string | undefined
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      })
      
      if ('sha' in data) {
        sha = data.sha
      }
    } catch (error) {
      // File doesn't exist, will create new
      sha = undefined
    }

    // Commit the file
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Update program: ${slug}`,
      content: Buffer.from(content).toString('base64'),
      branch,
      sha
    })

    return { success: true, commit: data.commit.sha }
  } catch (error) {
    console.error('Error saving page to GitHub:', error)
    return { success: false, error: 'Failed to commit to GitHub' }
  }
}

export async function deletePostFromGitHub(slug: string) {
  try {
    const path = `content/posts/${slug}.md`
    
    // Get file SHA (required for deletion)
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    })

    if (Array.isArray(fileData)) {
      return { success: false, error: 'Path is a directory' }
    }

    // Delete file from GitHub
    await octokit.repos.deleteFile({
      owner,
      repo,
      path,
      message: `Delete article: ${slug}`,
      sha: fileData.sha,
      branch
    })

    return { success: true }
  } catch (error: any) {
    console.error('Error deleting post from GitHub:', error)
    if (error.status === 404) {
      return { success: false, error: 'Article not found' }
    }
    return { success: false, error: 'Failed to delete from GitHub' }
  }
}

export async function deletePageFromGitHub(slug: string) {
  try {
    const path = `content/pages/${slug}.md`
    
    // Get file SHA (required for deletion)
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    })

    if (Array.isArray(fileData)) {
      return { success: false, error: 'Path is a directory' }
    }

    // Delete file from GitHub
    await octokit.repos.deleteFile({
      owner,
      repo,
      path,
      message: `Delete program: ${slug}`,
      sha: fileData.sha,
      branch
    })

    return { success: true }
  } catch (error: any) {
    console.error('Error deleting page from GitHub:', error)
    if (error.status === 404) {
      return { success: false, error: 'Program not found' }
    }
    return { success: false, error: 'Failed to delete from GitHub' }
  }
}

export async function getPageFromGitHub(slug: string) {
  try {
    const path = `content/pages/${slug}.md`
    
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    })

    if ('content' in data && data.content) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8')
      return { success: true, content }
    }

    return { success: false, error: 'File not found' }
  } catch (error) {
    console.error('Error reading page from GitHub:', error)
    return { success: false, error: 'Failed to read from GitHub' }
  }
}
