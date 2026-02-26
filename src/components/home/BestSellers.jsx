import React from 'react';
import ProductCard from '../products/ProductCard';
import { useProducts } from '../../context/ProductContext';

const BestSellers = () => {
    const { products } = useProducts();

    const bestSellerProducts = products.filter(p => p.isBestSeller);
    const bestSellers = bestSellerProducts.length > 0 ? bestSellerProducts.slice(0, 4) : products.slice(0, 4);

    return (
        <section className="py-20 relative bg-[#fffaef] overflow-hidden">
            {/* Very faint background patch pattern */}
            <div className="absolute inset-4 sm:inset-6 border-[3px] border-dashed border-[#e6decf] rounded-[40px] pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 relative">
                    <h2 className="text-4xl font-extrabold text-[#2c3e24] font-serif sm:text-5xl inline-block relative">
                        Best Sellers
                        <svg className="absolute w-[120%] h-3 -bottom-2 -left-[10%] text-[#a06d40]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" fill="none" />
                        </svg>
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg text-[#5c5446] mx-auto font-medium">
                        Our most loved products, stitched into your daily routine.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {bestSellers.map((product) => (
                        <div key={product.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] min-w-[250px] max-w-sm">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <a href="/shop" className="inline-block px-10 py-4 border-2 border-dashed border-[#4a6b3d] text-[#5c854c] font-bold rounded-xl hover:bg-[#5c854c] hover:text-[#fffaef] transition-all duration-300 shadow-sm hover:shadow-md">
                        View All Products
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
