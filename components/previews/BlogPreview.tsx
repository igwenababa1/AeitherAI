import React from 'react';

const defaultPosts = [
    {
        id: 1,
        category: 'Technology',
        title: 'The Future of AI in Web Development',
        author: 'Jane Doe',
        date: 'Oct 12, 2024',
        excerpt: 'Artificial Intelligence is revolutionizing the way we build websites and applications. From automated code generation to intelligent testing, the possibilities are endless...',
        authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    },
    {
        id: 2,
        category: 'Design',
        title: 'Crafting User-Centric UI/UX',
        author: 'John Smith',
        date: 'Oct 10, 2024',
        excerpt: 'A deep dive into the principles of creating intuitive and beautiful user interfaces that keep users engaged and delighted. We explore color theory, typography, and more.',
        authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    },
];

interface Post {
    id: number;
    category: string;
    title: string;
    author: string;
    date: string;
    excerpt: string;
    authorImage: string;
}

interface BlogPreviewProps {
  posts?: {
    title: string;
    category: string;
    excerpt: string;
    author: string;
  }[];
}


export const BlogPreview: React.FC<BlogPreviewProps> = ({ posts: dynamicPosts }) => {
    const postsToRender = (dynamicPosts && dynamicPosts.length > 0)
        ? dynamicPosts.map((post, index) => ({
            ...post,
            id: index + 1,
            date: 'Oct 12, 2024',
            authorImage: index % 2 === 0 
                ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
                : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        }))
        : defaultPosts;


    return (
        <div className="w-full h-full bg-gray-50 text-gray-800 font-sans rounded-b-lg flex flex-col">
            <header className="bg-white border-b border-gray-200 p-4 flex flex-wrap justify-between items-center gap-4 sm:gap-0 flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">The AetherWorks Post</h1>
                <nav className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
                    <a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-900">Home</a>
                    <a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-900">About</a>
                    <button className="bg-gray-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-gray-900 text-sm sm:text-base">Subscribe</button>
                </nav>
            </header>
            <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
                <div className="space-y-8">
                    {postsToRender.map(post => (
                        <article key={post.id} className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <p className="text-sm font-semibold text-indigo-600 mb-1">{post.category}</p>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex items-center">
                                <img src={post.authorImage} alt={post.author} className="w-10 h-10 rounded-full mr-3 object-cover" />
                                <div>
                                    <p className="font-semibold text-gray-900">{post.author}</p>
                                    <p className="text-sm text-gray-500">{post.date}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
};