import React, { useState } from 'react';
import { ChevronRight, Clock, Calendar, Tag, Share2, BookmarkPlus } from 'lucide-react';
import ShareModal from '../share/ShareModal';

const BlogPost = ({ title, content, category, date }) => {
  const [showShareModal, setShowShareModal] = useState(false);
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
          post={{ title, content, category, date }}
        />
      )}
    </div>
  );
};

export default BlogPost;