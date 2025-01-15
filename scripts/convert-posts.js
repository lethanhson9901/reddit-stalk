const fs = require('fs').promises;
const path = require('path');

async function convertPosts() {
  try {
    // Read all files from your posts directory
    const postsDir = path.join(__dirname, '../posts');
    const files = await fs.readdir(postsDir);
    
    const posts = [];
    
    for (const file of files) {
      if (file.endsWith('.txt')) {
        const content = await fs.readFile(path.join(postsDir, file), 'utf8');
        
        // Extract title from filename or first line
        const title = path.basename(file, '.txt')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
        
        // Create post object
        const post = {
          title,
          content,
          date: new Date().toISOString().split('T')[0], // You might want to extract this from file metadata
          tags: ['Reddit Summary'], // You might want to generate these based on content
        };
        
        posts.push(post);
      }
    }
    
    // Write the posts to a JSON file
    const outputFile = path.join(__dirname, '../public/posts.json');
    await fs.writeFile(outputFile, JSON.stringify(posts, null, 2));
    
    console.log(`Successfully converted ${posts.length} posts to JSON`);
  } catch (error) {
    console.error('Error converting posts:', error);
  }
}

convertPosts();