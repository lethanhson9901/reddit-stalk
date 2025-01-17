import React, { useState, useEffect } from 'react';
// Import components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import BlogPost from './components/blog/BlogPost';
import { SidebarToggle, Pagination } from './components/ui';

const App = () => {
  const POSTS_PER_PAGE = 5;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Sample posts data - in a real app, this would come from an API
  const posts = [
    {
      title: "Những Website 'Cứng Đầu' Nhất: Thử Thách Nào Cho Dân Cào Dữ Liệu?",
      content: "Bạn đã bao giờ 'vật lộn' với việc cào dữ liệu (web scraping) từ một website nào đó chưa? Cảm giác như đang đối đầu với một 'boss cuối' khó nhằn...",
      category: "🌐 Web Scraping",
      date: "Jan 17, 2024"
    },
    {
      title: "Machine Learning in Production: Best Practices",
      content: "Learn how to effectively deploy and maintain machine learning models in production environments. We'll cover monitoring, versioning, and scaling...",
      category: "/r/machinelearning",
      date: "Jan 16, 2024"
    },
    {
      title: "The Future of Web Development",
      content: "Exploring upcoming trends in web development including WebAssembly, Edge Computing, and new JavaScript features...",
      category: "/r/webdev",
      date: "Jan 15, 2024"
    }
  ];

  // Reset to first page when search query or community changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCommunity]);

  // Filter posts based on both community selection and search query
  const filteredPosts = posts.filter(post => {
    const matchesCommunity = !selectedCommunity || selectedCommunity === '/r/all' || post.category === selectedCommunity;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchLower) || 
      post.content.toLowerCase().includes(searchLower);
    
    return matchesCommunity && matchesSearch;
  });

  // No results message component
  const NoResults = () => (
    <div className="text-center py-8">
      <p className="text-gray-500 dark:text-gray-400">No posts found matching your search criteria</p>
    </div>
  );

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
        communities={communities}
        selectedCommunity={selectedCommunity}
        onSelectCommunity={setSelectedCommunity}
      />
      
      <main className="pt-14">
        <div className="transition-all duration-300">
          <div className="max-w-3xl mx-auto px-4 py-6">            
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                <>
                  {filteredPosts
                    .slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)
                    .map((post, index) => (
                      <BlogPost key={index} {...post} />
                    ))}
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredPosts.length / POSTS_PER_PAGE)}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                <NoResults />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;