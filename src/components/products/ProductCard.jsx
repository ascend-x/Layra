import React from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    return (
        <div className="group relative bg-[#fffaef] rounded-3xl shadow-[4px_4px_0px_0px_#d4cbba] hover:shadow-[8px_8px_0px_0px_#d4cbba] transition-all duration-300 overflow-hidden border border-[#d4cbba] p-2 flex flex-col">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-[#e6decf] rounded-t-[20px] rounded-b-[12px] border-2 border-dashed border-[#d4cbba]/50 group-hover:border-[#a06d40]/40 transition-colors">
                <Link to={`/product/${product.name.replace(/\s+/g, '-').toLowerCase()}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                </Link>

                {/* Badges */}
                {product.sale && (
                    <span className="absolute top-3 left-3 bg-[#e05a5a] text-[#fffaef] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        SALE
                    </span>
                )}
                {product.new && (
                    <span className="absolute top-3 left-3 bg-[#4a6b3d] text-[#fffaef] text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-dashed border-[#fffaef]/30">
                        NEW
                    </span>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute inset-0 bg-[#2c3e24]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 pointer-events-none rounded-t-[20px] rounded-b-[12px]">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(product)}
                        className="bg-[#fffaef] p-3 rounded-full text-[#5c5446] hover:text-[#5c854c] hover:bg-white transition-all shadow-md border-2 border-dashed border-transparent hover:border-[#5c854c]/30 pointer-events-auto cursor-pointer"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={20} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-[#fffaef] p-3 rounded-full text-[#5c5446] hover:text-[#e05a5a] hover:bg-white transition-all shadow-md border-2 border-dashed border-transparent hover:border-[#e05a5a]/30 pointer-events-auto cursor-pointer"
                        title="Add to Wishlist"
                    >
                        <Heart size={20} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-[#fffaef] p-3 rounded-full text-[#5c5446] hover:text-[#a06d40] hover:bg-white transition-all shadow-md border-2 border-dashed border-transparent hover:border-[#a06d40]/30 pointer-events-auto cursor-pointer"
                        title="Quick View"
                    >
                        <Eye size={20} />
                    </motion.button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5 text-center flex-1 flex flex-col justify-between relative z-10">
                <div>
                    <Link to={`/product/${product.name.replace(/\s+/g, '-').toLowerCase()}`}>
                        <h3 className="text-[#2c3e24] font-bold font-serif text-lg leading-tight hover:text-[#a06d40] transition-colors line-clamp-2">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-[#8d7c62] mt-2 font-medium uppercase tracking-wider">{product.category}</p>
                </div>

                <div className="mt-4 pt-4 border-t-2 border-dashed border-[#e6decf] flex items-center justify-center space-x-3">
                    <span className="text-[#5c854c] font-bold text-xl drop-shadow-sm">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                        <span className="text-[#a06d40]/60 text-sm font-semibold line-through">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
