import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronRight, Github, Moon, Sun, ArrowUp, Clock, Calendar, Tag, Share2, BookmarkPlus } from 'lucide-react';

const SidebarToggle = ({ onSidebarToggle, isOpen }) => (
  <button 
    onClick={onSidebarToggle}
    className="fixed top-4 left-4 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-50 border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
  >
    <Menu size={20} />
  </button>
);

const BlogPost = ({ title, content, category, date }) => {
  const readingTime = Math.ceil(content.split(' ').length / 200);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg hover:border-orange-500 transition-all duration-200 border border-gray-200 dark:border-gray-700 group">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
            <Tag size={12} />
            {category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock size={12} />
            {readingTime} min read
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Calendar size={12} />
            {date}
          </span>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 leading-tight group-hover:text-orange-500 transition-colors">
          {title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base line-clamp-3">
          {content}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <button className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 flex items-center gap-2 text-sm">
            Read more 
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" title="Save for later">
              <BookmarkPlus size={18} />
            </button>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" title="Share">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, setIsOpen, isPinned, setPinned, communities, selectedCommunity, onSelectCommunity }) => (
  <div className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-800 w-64 border-r border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-in-out ${!isOpen ? '-translate-x-64' : 'translate-x-0'} z-20`}>
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Communities</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        {communities.map((community, index) => (
          <button 
            key={index}
            onClick={() => {
              onSelectCommunity(community);
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 mb-1 rounded-md transition-colors ${
              selectedCommunity === community
                ? 'bg-orange-500 text-white'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {community}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Made with ❤️ by{" "}
          <a 
            href="https://github.com/lethanhson9901" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
          >
            Son Le
          </a>
        </div>
      </div>
    </div>
  </div>
);

const Header = ({ searchQuery, setSearchQuery, darkMode, setDarkMode }) => (
  <header className="fixed top-0 w-full z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-8" /> {/* Spacer for toggle button */}
        <button 
          onClick={() => window.location.href = '/'}
          className="text-xl font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <span className="text-orange-500">Reddit</span>
          <span className="dark:text-white">Stalk</span>
        </button>
      </div>

      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1.5 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <a 
          href="https://github.com/lethanhson9901/reddit-stalk" 
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          title="View on GitHub"
        >
          <Github size={20} />
        </a>
      </div>
    </div>
  </header>
);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isVisible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 z-40"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  ) : null;
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarPinned, setSidebarPinned] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const communities = [
    '/r/all',
    '/r/webdev',
    '/r/programming',
    '/r/technology',
    '/r/datascience',
    '/r/machinelearning',
    '/r/artificial'
  ];

  const posts = [
    {
      title: "Những Website 'Cứng Đầu' Nhất: Thử Thách Nào Cho Dân Cào Dữ Liệu?",
      content: "Bạn đã bao giờ 'vật lộn' với việc cào dữ liệu (web scraping) từ một website nào đó chưa? Cảm giác như đang đối đầu với một 'boss cuối' khó nhằn...",
      category: "🌐 Web Scraping",
      date: "Jan 17, 2024"
    }
  ];

  const filteredPosts = selectedCommunity && selectedCommunity !== '/r/all'
    ? posts.filter(post => post.category === selectedCommunity)
    : posts;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <SidebarToggle 
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} 
        isOpen={sidebarOpen}
      />
      
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        isPinned={sidebarPinned}
        setPinned={setSidebarPinned}
        communities={communities}
        selectedCommunity={selectedCommunity}
        onSelectCommunity={setSelectedCommunity}
      />
      
      <main className="pt-14">
        <div className="transition-all duration-300">
          <div className="max-w-3xl mx-auto px-4 py-6">            
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <BlogPost key={index} {...post} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <ScrollToTop />
    </div>
  );
};

export default App;