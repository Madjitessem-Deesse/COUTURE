import React, { useState } from 'react';
import { PostCard } from '../components/posts/PostCard';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Filter, TrendingUp, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';


export function Feed() {
  const { posts } = useApp();
  const { user, isCouturier } = useAuth();
  const [filter, setFilter] = useState<'all' | 'trending' | 'recent' | 'liked'>('all');

  const filteredPosts = posts.filter(post => {
    switch (filter) {
      case 'trending':
        return post.likes.length > 0;
      case 'recent':
        return new Date(post.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000);
      case 'liked':
        return user ? post.likes.includes(user.id) : false;
      default:
        return true;
    }
  });


  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Rejoignez la communauté CoutureConnect
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Découvrez les créations des meilleurs couturiers, partagez vos inspirations 
              et connectez-vous avec une communauté passionnée de couture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
         
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all font-medium"
              >
                S'inscrire gratuitement
              </Link>
              <Link
                to="/login"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors font-medium"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

 
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fil d'actualité</h1>
            <p className="text-gray-600">Découvrez les dernières créations de la communauté</p>
          </div>
          
          {isCouturier && (
            <Link
              to="/create-post"
              // Bouton Publier en BLEU
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md"
            >
              <Plus className="h-5 w-5" />
              <span>Publier</span>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex items-center space-x-1 overflow-x-auto">
            <Filter className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
            
            {/* Bouton Tout - Bleu actif */}
            <button
              onClick={() => setFilter('all')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-700 font-semibold' // Bleu actif
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>Tout</span>
            </button>
            
            {/* Bouton Tendances - Bleu actif */}
            <button
              onClick={() => setFilter('trending')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                filter === 'trending'
                  ? 'bg-blue-100 text-blue-700 font-semibold' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Tendances</span>
            </button>
            
            {/* Bouton Récent - Bleu actif */}
            <button
              onClick={() => setFilter('recent')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                filter === 'recent'
                  ? 'bg-blue-100 text-blue-700 font-semibold' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Récent</span>
            </button>
            
           
            <button
              onClick={() => setFilter('liked')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                filter === 'liked'
                  ? 'bg-blue-100 text-blue-700 font-semibold' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>Aimés</span>
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-8">
            {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune publication trouvée</h3>
              <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'Soyez le premier à publier dans cette communauté !'
                : 'Essayez de changer les filtres pour voir plus de contenu.'
              }
              </p>
              {isCouturier && (
              <Link
                to="/create-post"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all"
              >
                <Plus className="h-5 w-5" />
                <span>Créer une publication</span>
              </Link>
              )}
            </div>
            ) : (
            filteredPosts.map(post => {
              const normalizedComments = (post.comments || []).map((comment: any) => ({
                id: comment.id,
                user: {
                  id: comment.user?.id ?? '',
                  name: comment.user?.name ?? 'Anonyme',
                  avatar: comment.user?.avatar ?? '',
                },
                content: comment.content ?? '',
                createdAt: comment.createdAt ?? new Date().toISOString(),
              }));

              const normalizedPost: any = {
                id: String(post.id),
                couturierId: post.couturierId ?? (post.couturier && post.couturier.id) ?? '',
                title: (post as any).title ?? (post as any).name ?? '',
                description: (post as any).description ?? (post as any).content ?? '',
                category: (post as any).category ?? '',
                images: (post as any).images ?? [],
                tags: (post as any).tags ?? [],
                price: (post as any).price,
                createdAt: post.createdAt ?? new Date().toISOString(),
                likes: (post as any).likes ?? [],
                comments: normalizedComments,
                couturier: {
                  id: post.couturier?.id ?? '',
                  name: post.couturier?.name ?? '',
                  businessName: post.couturier?.businessName,
                  avatar: post.couturier?.avatar ?? '',
                  location: { city: post.couturier?.location?.city ?? '' },
                  rating: post.couturier?.rating ?? 0,
                  subscription: post.couturier?.subscription,
                },
                 ...(post as any),
              };

              return <PostCard key={String(post.id)} post={normalizedPost} />;
            })
            )}
        </div>
      </div>
    </div>
  );
}