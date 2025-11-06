import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Calendar, MapPin, Star } from 'lucide-react';
import { Post } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

interface PostCardProps {
  post: Post;
}

// Fonction utilitaire pour formater le prix en FCFA
const formatCFA = (amount: number) => {
    try {
        return amount.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'XOF', // Franc CFA Ouest Africain
            minimumFractionDigits: 0, 
            maximumFractionDigits: 0
        });
    } catch (e) {
        return `${amount} F CFA`;
    }
};

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const { likePost, addComment } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isLiked = user ? post.likes.includes(user.id) : false;

  const handleLike = () => {
    if (user) {
      likePost(post.id, user.id);
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && newComment.trim()) {
      addComment(post.id, user.id, newComment.trim());
      setNewComment('');
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center space-x-3">
        <Link to={`/couturier/${post.couturierId}`}>
          <img
            src={post.couturier.avatar}
            alt={post.couturier.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Link
              to={`/couturier/${post.couturierId}`}
              // Lien en BLEU
              className="font-semibold text-gray-900 hover:text-blue-600"
            >
              {post.couturier.businessName || post.couturier.name}
            </Link>
            {post.couturier.subscription?.type === 'premium' && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Premium
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{post.couturier.location.city}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-current text-yellow-400" />
              <span>{post.couturier.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span 
            // Catégorie en BLEU
            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
        <p className="text-gray-700 mb-3">{post.description}</p>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              // Tags en BLEU
              <span key={index} className="text-blue-600 text-sm">#{tag}</span>
            ))}
          </div>
        )}

        {post.price && (
          // Prix formaté en FCFA et en BLEU
          <div className="text-2xl font-bold text-blue-600 mb-3">
            À partir de {formatCFA(post.price)}
          </div>
        )}
      </div>

      {/* Images - Logic non modifiée */}
      {post.images.length > 0 && (
        <div className="relative">
          <img
            src={post.images[currentImageIndex]}
            alt={post.title}
            className="w-full h-80 object-cover"
          />
          
          {post.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                →
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {post.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              // J'ai gardé le like en rouge (standard UI/UX)
              className={`flex items-center space-x-2 ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              } transition-colors`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes.length}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              // Commentaire en BLEU
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments.length}</span>
            </button>
            
            <button 
              // Partage en BLEU
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <Link
            to={`/couturier/${post.couturierId}/appointment`}
            // Bouton 'Prendre RDV' en BLEU
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md"
          >
            <Calendar className="h-4 w-4" />
            <span>Prendre RDV</span>
          </Link>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="border-t border-gray-200 pt-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3 mb-3">
                <img
                  src={comment.user.avatar || '/default-avatar.png'}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <div className="font-medium text-sm text-gray-900">{comment.user.name}</div>
                    <div className="text-gray-700">{comment.content}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            ))}

            {user && (
              <form onSubmit={handleComment} className="flex space-x-3 mt-3">
                <img
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Écrire un commentaire..."
                    // Focus Ring en BLEU
                    className="w-full px-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}