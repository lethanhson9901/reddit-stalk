import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import BlogPost from './components/blog/BlogPost';
import PostPage from './components/blog/PostPage';
import AdminAuth from './components/admin/AdminAuth';
import AdminPostManager from './components/admin/AdminPostManager';
import { SidebarToggle, Pagination } from './components/ui';
import { communities } from './data/posts'; // Import communities from posts.js

const MainContent = ({ 
  posts, 
  searchQuery, 
  selectedCommunity,
  currentPage,
  setCurrentPage,
  POSTS_PER_PAGE,
  isAdmin 
}) => {
  const location = useLocation();
  const filteredPosts = posts.filter(post => {
    const matchesCommunity = !selectedCommunity || selectedCommunity === '/r/all' || post.category === selectedCommunity;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchLower) || 
      post.content.toLowerCase().includes(searchLower);
    const isVisible = isAdmin || post.isPublic;
    
    return matchesCommunity && matchesSearch && isVisible;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCommunity, setCurrentPage]);

  if (location.pathname.startsWith('/post/')) {
    return null;
  }

  return (
    <div className="space-y-4">
      {filteredPosts.length > 0 ? (
        <>
          {filteredPosts
            .slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)
            .map((post, index) => (
              <BlogPost key={index} id={index} {...post} />
            ))}
          <Pagination 
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPosts.length / POSTS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No posts found matching your search criteria</p>
        </div>
      )}
    </div>
  );
};

const AppContent = ({ darkMode, setDarkMode }) => {
  const POSTS_PER_PAGE = 5;
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([
    {
      title: "Những Website 'Cứng Đầu' Nhất: Thử Thách Nào Cho Dân Cào Dữ Liệu?",
      content: "Bạn đã bao giờ 'vật lộn' với việc cào dữ liệu (web scraping) từ một website nào đó chưa? Cảm giác như đang đối đầu với một 'boss cuối' khó nhằn...",
      category: "🌐 Web Scraping",
      date: "Jan 17, 2024",
      isPublic: true
    },
    {
      title: "Machine Learning in Production: Best Practices",
      content: "Learn how to effectively deploy and maintain machine learning models in production environments. We'll cover monitoring, versioning, and scaling...",
      category: "/r/machinelearning",
      date: "Jan 16, 2024",
      isPublic: true
    },
    {
      title: "The Future of Web Development",
      content: "Exploring upcoming trends in web development including WebAssembly, Edge Computing, and new JavaScript features...",
      category: "/r/webdev",
      date: "Jan 15, 2024",
      isPublic: false
    }
  ]);

  const handleToggleVisibility = (index) => {
    setPosts(posts.map((post, i) => 
      i === index ? { ...post, isPublic: !post.isPublic } : post
    ));
  };

  const handleDeletePost = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  const handleEditPost = (index) => {
    // Implement edit functionality
    console.log('Edit post:', index);
  };

  const location = useLocation();

  if (!isAdmin && location.pathname === '/admin') {
    return <AdminAuth onLogin={setIsAdmin} />;
  }

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
        isAdmin={isAdmin}
        onLogout={() => {
          setIsAdmin(false);
          localStorage.removeItem('isAdmin');
        }}
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        communities={communities}
        selectedCommunity={selectedCommunity}
        onSelectCommunity={setSelectedCommunity}
        isAdmin={isAdmin}
      />
      
      <main className="pt-14">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Routes>
            <Route 
              path="/" 
              element={
                <MainContent 
                  posts={posts}
                  searchQuery={searchQuery}
                  selectedCommunity={selectedCommunity}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  POSTS_PER_PAGE={POSTS_PER_PAGE}
                  isAdmin={isAdmin}
                />
              } 
            />
            <Route 
              path="/post/:id" 
              element={<PostPage posts={posts} isAdmin={isAdmin} />} 
            />
            {isAdmin && (
              <Route 
                path="/admin" 
                element={
                  <AdminPostManager 
                    posts={posts}
                    onToggleVisibility={handleToggleVisibility}
                    onDeletePost={handleDeletePost}
                    onEditPost={handleEditPost}
                  />
                } 
              />
            )}
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AppContent;