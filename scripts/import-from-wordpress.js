#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('http'); // Using http since WordPress is on localhost

const WORDPRESS_URL = 'http://localhost:8094';
const OUTPUT_DIR = path.join(__dirname, '../content');

// Create output directories
const dirs = [
  path.join(OUTPUT_DIR, 'posts'),
  path.join(OUTPUT_DIR, 'pages'),
  path.join(__dirname, '../public/images')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Helper to fetch from WordPress REST API
async function fetchWordPressAPI(endpoint) {
  return new Promise((resolve, reject) => {
    const url = `${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`;
    console.log(`📡 Fetching: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          console.error(`❌ Error parsing JSON from ${endpoint}:`, error);
          resolve([]);
        }
      });
    }).on('error', (error) => {
      console.error(`❌ Error fetching ${endpoint}:`, error);
      resolve([]);
    });
  });
}

// Clean HTML content for Markdown
function cleanContent(html) {
  if (!html) return '';
  
  // Remove WordPress comments
  let cleaned = html.replace(/<!--[\s\S]*?-->/g, '');
  
  // Simple HTML to Markdown conversions
  cleaned = cleaned
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<[^>]+>/g, ''); // Remove any remaining HTML tags
  
  // Clean up excessive newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
  
  return cleaned;
}

// Create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Convert post to Markdown
function postToMarkdown(post) {
  const slug = post.slug || createSlug(post.title.rendered);
  const date = new Date(post.date).toISOString().split('T')[0];
  const excerpt = post.excerpt?.rendered ? cleanContent(post.excerpt.rendered) : '';
  const content = cleanContent(post.content.rendered);
  
  const frontmatter = `---
title: "${post.title.rendered.replace(/"/g, '\\"')}"
date: "${date}"
slug: "${slug}"
excerpt: "${excerpt.substring(0, 200).replace(/"/g, '\\"')}"
author: "${post.author || 'DRW Foundation'}"
---

${content}
`;
  
  return { slug, content: frontmatter };
}

// Main export function
async function exportWordPressContent() {
  console.log('🚀 Starting WordPress content export...\n');
  
  try {
    // Fetch posts
    console.log('📝 Fetching posts...');
    const posts = await fetchWordPressAPI('posts?per_page=100');
    console.log(`✅ Found ${posts.length} posts\n`);
    
    if (posts.length > 0) {
      posts.forEach((post, index) => {
        const { slug, content } = postToMarkdown(post);
        const filename = path.join(OUTPUT_DIR, 'posts', `${slug}.md`);
        fs.writeFileSync(filename, content, 'utf8');
        console.log(`  ${index + 1}. ✅ ${slug}.md`);
      });
    }
    
    // Fetch pages
    console.log('\n📄 Fetching pages...');
    const pages = await fetchWordPressAPI('pages?per_page=100');
    console.log(`✅ Found ${pages.length} pages\n`);
    
    if (pages.length > 0) {
      pages.forEach((page, index) => {
        const { slug, content } = postToMarkdown(page);
        const filename = path.join(OUTPUT_DIR, 'pages', `${slug}.md`);
        fs.writeFileSync(filename, content, 'utf8');
        console.log(`  ${index + 1}. ✅ ${slug}.md`);
      });
    }
    
    console.log('\n✨ Export completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   Posts: ${posts.length}`);
    console.log(`   Pages: ${pages.length}`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Copy images: cp -r ../drwfoundation/nextjs-export/public/images/* public/images/`);
    console.log(`   2. Review content in content/ directory`);
    console.log(`   3. Run: npm run dev`);
    console.log(`   4. Push to GitHub and deploy to Vercel\n`);
    
  } catch (error) {
    console.error('❌ Export failed:', error);
    process.exit(1);
  }
}

// Run export
exportWordPressContent();
