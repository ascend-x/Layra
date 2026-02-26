import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Filter, Scale } from 'lucide-react';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const { products } = useProducts();

    // Derived state for filtered products
    const filteredProducts = (categoryParam && categoryParam !== 'All')
        ? products.filter(product =>
            product.category.toLowerCase().replace(/\s+/g, '-') === categoryParam.toLowerCase() ||
            product.category === categoryParam
        )
        : products;

    const activeCategory = categoryParam || 'All';
    const categories = ['All', ...new Set(products.map(p => p.category))];

    const handleCategoryChange = (category) => {
        if (category === 'All') {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category: category.toLowerCase().replace(/\s+/g, '-') });
        }
    };

    return (
        <div className="bg-white min-h-screen py-16 relative">
            {/* Top decorative stitch pattern */}
            <div className="absolute top-0 left-0 w-full h-2 border-b-2 border-dashed border-[#e6decf]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#2c3e24] font-serif relative inline-block">
                        Shop Our Collection
                        <svg className="absolute w-[110%] h-3 -bottom-2 -left-[5%] text-[#a06d40]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" fill="none" />
                        </svg>
                    </h1>
                    <div className="mt-8 md:mt-0 flex items-center bg-[#fffaef] rounded-xl shadow-[4px_4px_0px_0px_#d4cbba] px-5 py-3 border border-[#d4cbba] transition-all hover:-translate-y-0.5 relative group">
                        <Filter size={18} className="text-[#8d7c62] mr-3" />
                        <span className="text-sm font-bold text-[#5c5446] mr-3 uppercase tracking-wide">Sort by:</span>
                        <select className="text-base font-bold text-[#2c3e24] bg-transparent outline-none cursor-pointer appearance-none pr-6">
                            <option>Default</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest First</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8d7c62]">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-72 flex-shrink-0">
                        <div className="bg-[#fffaef] rounded-3xl shadow-[6px_6px_0px_0px_#d4cbba] p-8 border border-[#d4cbba] sticky top-28 relative">
                            {/* Decorative patch stitches */}
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-dashed border-[#8d7c62]"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-dashed border-[#8d7c62]"></div>

                            <h3 className="text-xl font-bold font-serif text-[#2c3e24] mb-6 border-b-2 border-dashed border-[#d4cbba] pb-4 flex items-center">
                                Categories
                            </h3>
                            <ul className="space-y-4">
                                {categories.map((category) => (
                                    <li key={category}>
                                        <button
                                            onClick={() => handleCategoryChange(category)}
                                            className={`w-full text-left flex justify-between items-center group transition-all py-1 ${activeCategory === category
                                                ? 'text-[#a06d40] font-bold pl-2 border-l-2 border-[#a06d40] -ml-[2px]'
                                                : 'text-[#5c5446] font-medium hover:text-[#5c854c] hover:pl-2'
                                                }`}
                                        >
                                            <span className="text-lg">{category}</span>
                                            {activeCategory === category && (
                                                <span className="w-2 h-2 rounded-full bg-[#a06d40] shadow-sm"></span>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-[#fffaef] rounded-3xl shadow-[6px_6px_0px_0px_#d4cbba] border border-[#d4cbba] border-dashed border-[3px]">
                                <Scale size={48} className="mx-auto text-[#d4cbba] mb-4" />
                                <p className="text-[#5c5446] text-xl font-medium">No products found in this category.</p>
                                <button
                                    onClick={() => handleCategoryChange('All')}
                                    className="mt-6 inline-flex items-center justify-center px-8 py-3 bg-[#5c854c] text-white font-bold rounded-xl shadow-md hover:bg-[#4a6b3d] transition-all"
                                >
                                    View all products
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
