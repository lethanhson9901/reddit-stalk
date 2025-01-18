import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Share2, BookmarkPlus } from 'lucide-react';
import ShareModal from '../share/ShareModal';
import { calculateReadingTime } from '../../utils';

const PostPage = ({ posts }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Find the post by ID
  const post = posts.find((p, index) => index.toString() === id);
  
  if (!post) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Post not found</h1>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-orange-500 hover:text-orange-600 dark:text-orange-400 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} />
            Back to home
          </button>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="min-h-screen pt-20 px-4">
      <article className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-orange-500 hover:text-orange-600 dark:text-orange-400 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
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

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {post.title}
          </h1>

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
      </article>

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

export default PostPage;