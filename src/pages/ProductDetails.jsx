import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { Minus, Plus, ShoppingCart, Heart, ArrowLeft, Star, Truck, ShieldCheck } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { products } = useProducts();
    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        );
    }

    const handleQuantityId = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div className="bg-white min-h-screen py-16 relative">
            {/* Top decorative stitch pattern */}
            <div className="absolute top-0 left-0 w-full h-2 border-b-2 border-dashed border-[#e6decf]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Breadcrumb / Back */}
                <div className="mb-10">
                    <Link to="/shop" className="inline-flex items-center text-[#8d7c62] hover:text-[#a06d40] font-bold transition-all group">
                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Shop
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

                    {/* Image Gallery */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="aspect-square bg-[#fffaef] rounded-3xl border border-[#d4cbba] shadow-[8px_8px_0px_0px_#d4cbba] p-3 relative"
                        >
                            {/* Inner dashed patch border */}
                            <div className="absolute inset-2 border-2 border-dashed border-[#d4cbba]/60 rounded-2xl pointer-events-none z-10"></div>

                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover object-center rounded-[20px]"
                            />
                            {product.sale && (
                                <span className="absolute top-6 left-6 bg-[#e05a5a] text-[#fffaef] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-sm z-20">
                                    SALE
                                </span>
                            )}
                        </motion.div>
                        {/* Thumbnails (Simulated since we have 1 image per product in mock data) */}
                        <div className="grid grid-cols-4 gap-4 px-2">
                            {[product.image, product.image, product.image, product.image].map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`aspect-square rounded-2xl overflow-hidden border-[3px] transition-all bg-[#fffaef] p-1 ${activeImage === idx ? 'border-[#a06d40] opacity-100 shadow-sm' : 'border-dashed border-[#d4cbba] opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} alt="Thumbnail tip" className="w-full h-full object-cover rounded-xl" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:pl-8">
                        <h1 className="text-4xl font-extrabold text-[#2c3e24] font-serif mb-4 line-clamp-2 leading-tight">{product.name}</h1>

                        <div className="flex items-center mb-6 space-x-4">
                            <div className="flex items-center text-[#a06d40]">
                                <Star size={20} fill="currentColor" />
                                <Star size={20} fill="currentColor" />
                                <Star size={20} fill="currentColor" />
                                <Star size={20} fill="currentColor" />
                                <Star size={20} fill="currentColor" className="text-[#d4cbba]" />
                                <span className="text-[#8d7c62] text-sm font-bold ml-2">(24 reviews)</span>
                            </div>
                            <span className="text-[#d4cbba]">|</span>
                            <span className="text-[#5c854c] font-bold text-sm tracking-wide uppercase">{product.category}</span>
                        </div>

                        <div className="flex items-end space-x-4 mb-8">
                            <span className="text-4xl font-extrabold text-[#5c854c]">₹{product.price.toFixed(2)}</span>
                            {product.volume && (
                                <span className="text-xl text-[#8d7c62] mb-1 font-medium">/ {product.volume}</span>
                            )}
                            {product.oldPrice && (
                                <span className="text-2xl text-[#a06d40]/60 line-through mb-1 font-bold">₹{product.oldPrice.toFixed(2)}</span>
                            )}
                        </div>

                        <p className="text-[#5c5446] leading-relaxed mb-8 font-medium text-lg">
                            {product.description || "Experience the finest quality natural ingredients carefully selected for your well-being. This product is 100% organic, cruelty-free, and sustainably sourced to ensure the best for you and the planet."}
                        </p>

                        {product.benefits && (
                            <div className="mb-8">
                                <h3 className="text-xl font-bold font-serif text-[#2c3e24] mb-3 flex items-center">
                                    <span className="w-4 h-0.5 bg-dashed border-t-2 border-dashed border-[#a06d40] mr-2"></span> Key Benefits:
                                </h3>
                                <ul className="list-disc pl-5 text-[#5c5446] font-medium space-y-2">
                                    {product.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {product.howToUse && (
                            <div className="mb-10">
                                <h3 className="text-xl font-bold font-serif text-[#2c3e24] mb-3 flex items-center">
                                    <span className="w-4 h-0.5 bg-dashed border-t-2 border-dashed border-[#a06d40] mr-2"></span> How to Use:
                                </h3>
                                <ul className="list-none space-y-3 text-[#5c5446] font-medium">
                                    {product.howToUse.map((step, index) => (
                                        <li key={index} className="flex">
                                            <span className="text-[#a06d40] mr-3 flex-shrink-0 font-bold">✓</span>
                                            <span>{step.replace(/^\d+\.\s*/, '')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
                            <div className="flex items-center border-2 border-dashed border-[#8d7c62] rounded-xl w-full sm:w-36 justify-between px-4 py-3 bg-[#fffaef]">
                                <button onClick={() => handleQuantityId('dec')} className="text-[#8d7c62] hover:text-[#a06d40] p-1 transition-colors">
                                    <Minus size={18} />
                                </button>
                                <span className="font-bold text-[#2c3e24] text-lg">{quantity}</span>
                                <button onClick={() => handleQuantityId('inc')} className="text-[#8d7c62] hover:text-[#a06d40] p-1 transition-colors">
                                    <Plus size={18} />
                                </button>
                            </div>

                            <button
                                onClick={() => addToCart(product, quantity)}
                                className="flex-1 bg-[#5c854c] border-2 border-dashed border-[#4a6b3d] text-[#fffaef] font-bold text-lg rounded-xl py-4 px-6 hover:bg-[#4a6b3d] transition-all flex items-center justify-center shadow-md active:scale-[0.98]"
                            >
                                <ShoppingCart size={22} className="mr-3" />
                                Add to Cart
                            </button>

                            <button className="sm:w-16 w-full bg-[#fffaef] border-2 border-dashed border-[#d4cbba] rounded-xl py-4 flex items-center justify-center text-[#8d7c62] hover:text-[#e05a5a] hover:border-[#e05a5a]/50 transition-all">
                                <Heart size={24} />
                            </button>
                        </div>

                        {/* Features / Benefits */}
                        <div className="grid grid-cols-1 gap-5 py-6 border-t border-b border-dashed border-[#d4cbba] mb-6">
                            <div className="flex items-center text-[#5c5446] font-bold">
                                <div className="bg-[#5c854c]/10 p-2.5 rounded-xl mr-4 text-[#5c854c]">
                                    <Truck size={22} />
                                </div>
                                <span>Free shipping on all orders over ₹500</span>
                            </div>
                            <div className="flex items-center text-[#5c5446] font-bold">
                                <div className="bg-[#a06d40]/10 p-2.5 rounded-xl mr-4 text-[#a06d40]">
                                    <ShieldCheck size={22} />
                                </div>
                                <span>30-day money back guarantee stitched in!</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
