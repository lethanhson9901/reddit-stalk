import React from 'react';
import { Eye, EyeOff, Edit, Trash } from 'lucide-react';

const AdminPostManager = ({ posts, onToggleVisibility, onDeletePost, onEditPost }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Post Management</h2>
        
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div 
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      post.isPublic 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {post.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleVisibility(index)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    title={post.isPublic ? "Make Private" : "Make Public"}
                  >
                    {post.isPublic ? (
                      <Eye className="w-5 h-5 text-green-500" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-red-500" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => onEditPost(index)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Edit Post"
                  >
                    <Edit className="w-5 h-5 text-blue-500" />
                  </button>
                  
                  <button
                    onClick={() => onDeletePost(index)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Delete Post"
                  >
                    <Trash className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPostManager;