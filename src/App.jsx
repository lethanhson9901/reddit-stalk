// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Github } from 'lucide-react';
import BlogPost from './components/BlogPost';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Load posts from your file system
    const loadPosts = async () => {
      try {
        const response = await window.fs.readFile('your-posts-directory/posts.json');
        const text = new TextDecoder().decode(response);
        setPosts(JSON.parse(text));
      } catch (error) {
        console.error('Error loading posts:', error);
        // Fallback to example post
        setPosts([{
          title: "Những Website 'Cứng Đầu' Nhất: Thử Thách Nào Cho Dân Cào Dữ Liệu?",
          content: `Bạn đã bao giờ "vật lộn" với việc cào dữ liệu (web scraping) từ một website nào đó chưa? 
                    Cảm giác như đang đối đầu với một "boss cuối" khó nhằn...`,
          date: "Jan 15, 2024",
          tags: ["Web Scraping", "Technical", "Reddit Summary"]
        }]);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#DAE0E6] dark:bg-black transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-[#1A1A1B] shadow-md fixed w-full z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and mobile menu button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272729] focus:outline-none focus:ring-2 focus:ring-orange-500 md:hidden"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-orange-500 text-3xl">●</span>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  reddit<span className="text-gray-500">stalk</span>
                </h1>
              </div>
            </div>
            
            {/* Search bar */}
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full leading-5 bg-gray-100 dark:bg-[#272729] placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-300"
                    placeholder="Search posts..."
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-4">
              <ThemeToggle 
                isDark={isDarkMode} 
                onToggle={() => setIsDarkMode(!isDarkMode)} 
              />
              <a
                href="https://github.com/yourusername/reddit-stalk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#1A1A1B] shadow-xl p-4">
            {/* Add mobile menu items if needed */}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogPost key={index} {...post} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No posts found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#1A1A1B] mt-12 py-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Made with <span className="text-orange-500">●</span> by Your Name • Powered by Reddit Summaries
          </p>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
};

export default App;