import React from 'react';
import { Instagram } from 'lucide-react';

// We'll update these with generated images once the API cooldown finishes
const instagramPosts = [
    { id: 1, image: '/images/insta_scrub.png', link: '#' },
    { id: 2, image: '/images/insta_lotion.png', link: '#' },
    { id: 3, image: '/images/insta_skin_care.png', link: '#' },
    { id: 4, image: '/images/insta_hero.png', link: '#' },
];

const InstagramFeed = () => {
    return (
        <section className="py-20 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-4xl font-extrabold text-[#2c3e24] font-serif sm:text-5xl inline-block relative">
                            Follow Our Journey
                            <svg className="absolute w-[120%] h-3 -bottom-2 -left-[10%] text-[#a06d40]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" fill="none" />
                            </svg>
                        </h2>
                        <p className="mt-6 text-lg text-[#5c5446] font-medium">
                            Join our community on Instagram <span className="text-[#a06d40] font-bold">@LayraHerbal</span>
                        </p>
                    </div>

                    <a href="#" className="flex items-center space-x-2 border-2 border-dashed border-[#a06d40] text-[#a06d40] px-6 py-3 rounded-xl font-bold hover:bg-[#a06d40] hover:text-[#fffaef] transition-colors shadow-sm">
                        <Instagram size={20} />
                        <span>Follow Us</span>
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {instagramPosts.map((post) => (
                        <a
                            key={post.id}
                            href={post.link}
                            className="group relative aspect-square overflow-hidden rounded-2xl bg-[#fffaef] border-2 border-dashed border-[#d4cbba] hover:border-[#a06d40] transition-colors p-1"
                        >
                            <img
                                src={post.image}
                                alt="Instagram post"
                                className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-[#2c3e24]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                                <Instagram className="text-[#fffaef] w-10 h-10" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramFeed;
