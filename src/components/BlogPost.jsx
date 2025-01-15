// src/components/BlogPost.jsx
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const BlogPost = ({ title, content, date, tags = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white dark:bg-[#1A1A1B] rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 text-sm rounded-full bg-blue-50 dark:bg-[#272729] text-blue-600 dark:text-blue-400">
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-[#D7DADC]">{title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{date}</p>
      <div className={`prose dark:prose-invert max-w-none ${isExpanded ? '' : 'line-clamp-3'}`}>
        {content}
      </div>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group"
      >
        {isExpanded ? 'Read less' : 'Read more'}
        <ChevronRight className={`transform transition-transform group-hover:translate-x-1 ${isExpanded ? 'rotate-90' : ''}`} size={16} />
      </button>
    </div>
  );
};

export default BlogPost;
