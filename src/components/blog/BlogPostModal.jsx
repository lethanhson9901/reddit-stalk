import React, { useState } from 'react';
import { X, Clock, Calendar, Tag, Share2, BookmarkPlus } from 'lucide-react';
import ShareModal from '../share/ShareModal';
import { formatDate, calculateReadingTime } from '../../utils';

const BlogPostModal = ({ post, isOpen, onClose }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  
  if (!isOpen) return null;
  
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
              <Tag size={12} />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock size={12} />
              {readingTime} min read
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Calendar size={12} />
              {post.date}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {post.title}
          </h2>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {post.content}
            </p>
          </div>
          
          <div className="flex justify-end items-center gap-3 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" 
              title="Save for later"
            >
              <BookmarkPlus size={18} />
            </button>
            <button 
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" 
              title="Share" 
              onClick={() => setShowShareModal(true)}
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          post={post}
        />
      )}
    </div>
  );
};

export default BlogPostModal;