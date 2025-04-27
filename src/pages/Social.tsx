
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SocialPostCard, { PostType } from '../components/SocialPostCard';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Mock posts data - in a real app this would come from an API
const mockPosts: PostType[] = [
  {
    id: 'post1',
    user: {
      id: 'user1',
      email: 'user1@example.com',
      displayName: 'FragMaster',
      rank: 'Diamond 1',
      role: 'Duelist',
      avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=user1',
    },
    content: 'Looking for a 5th player for our team. We need a good controller main. Must have mic and be at least Platinum rank.',
    createdAt: new Date('2023-04-25T10:24:00'),
    likes: 12,
    comments: 5,
    isLiked: false,
  },
  {
    id: 'post2',
    user: {
      id: 'user2',
      email: 'user2@example.com',
      displayName: 'ValorGirl',
      rank: 'Ascendant 2',
      role: 'Controller',
      avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=user2',
    },
    content: 'Just hit Ascendant! Looking for serious players to grind to immortal this weekend. DM me if interested.',
    createdAt: new Date('2023-04-24T15:30:00'),
    likes: 24,
    comments: 8,
    isLiked: true,
  },
  {
    id: 'post3',
    user: {
      id: 'user3',
      email: 'user3@example.com',
      displayName: 'HeadshotHero',
      rank: 'Gold 3',
      role: 'Sentinel',
      avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=user3',
    },
    content: 'Anyone else struggling with the new map? Looking for tips on good setups and strategies.',
    createdAt: new Date('2023-04-24T09:15:00'),
    likes: 7,
    comments: 15,
    isLiked: false,
  },
  {
    id: 'post4',
    user: {
      id: 'user4',
      email: 'user4@example.com',
      displayName: 'ValorantCoach',
      rank: 'Immortal 1',
      role: 'Flex',
      avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=user4',
    },
    content: 'Doing free VOD reviews today for players Silver to Diamond. Drop your discord in the comments if interested!',
    createdAt: new Date('2023-04-23T18:45:00'),
    likes: 36,
    comments: 22,
    isLiked: true,
  },
  {
    id: 'post5',
    user: {
      id: 'user5',
      email: 'user5@example.com',
      displayName: 'TacticalPlayer',
      rank: 'Platinum 2',
      role: 'Initiator',
      avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=user5',
    },
    content: 'Looking for a consistent duo partner to climb through Platinum. I main Fade and KAY/O. Please have mic!',
    createdAt: new Date('2023-04-23T14:20:00'),
    likes: 9,
    comments: 4,
    isLiked: false,
  },
];

const Social = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Simulate fetching posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // In a real app, you'd fetch from your API
        setPosts(mockPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "Failed to load social posts. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [toast]);
  
  // Handle liking a post
  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const wasLiked = post.isLiked;
          return {
            ...post,
            likes: wasLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !wasLiked,
          };
        }
        return post;
      })
    );
  };
  
  // Handle commenting on a post (placeholder)
  const handleComment = (postId: string) => {
    // In a real app, this would open a comment modal or section
    toast({
      title: "Comments",
      description: "Comment feature coming soon!",
    });
  };
  
  // Handle clicking on a user
  const handleUserClick = (userId: string) => {
    // In a real app, this would navigate to the user's profile
    toast({
      title: "User Profile",
      description: "Viewing user profiles coming soon!",
    });
  };
  
  // Handle creating a new post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create a new post object
      const newPost: PostType = {
        id: 'post' + Date.now(),
        user: user!,
        content: newPostContent,
        createdAt: new Date(),
        likes: 0,
        comments: 0,
        isLiked: false,
      };
      
      // In a real app, you'd send this to your API
      // Here we just add it to the state
      setPosts(prevPosts => [newPost, ...prevPosts]);
      
      // Clear the form
      setNewPostContent('');
      
      toast({
        title: "Success",
        description: "Your post has been published!",
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="pb-12">
        <h1 className="text-3xl font-bold mb-6">Social Feed</h1>
        
        {/* New post form */}
        <div className="valorant-card mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Create Post</h2>
            <form onSubmit={handleCreatePost}>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Looking for teammates? Share your thoughts..."
                className="w-full min-h-[120px] rounded-md border bg-card px-4 py-2 focus:border-valorant-red focus:outline-none focus:ring-1 focus:ring-valorant-red resize-none"
              ></textarea>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !newPostContent.trim()}
                  className="valorant-button"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-valorant-light"></div>
                  ) : (
                    'Post'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Posts feed */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-valorant-red"></div>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <SocialPostCard 
                key={post.id} 
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onUserClick={handleUserClick}
              />
            ))
          ) : (
            <div className="valorant-card p-6 text-center">
              <h3 className="text-lg font-medium">No posts yet</h3>
              <p className="text-muted-foreground mt-2">Be the first to share something with the community!</p>
            </div>
          )}
          
          {posts.length > 0 && (
            <div className="text-center pt-4">
              <button className="valorant-button-outline">
                Load More Posts
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Social;
