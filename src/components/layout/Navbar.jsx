import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
    const { cartCount, toggleCart } = useCart();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-[#fffaef] shadow-sm sticky top-0 z-50 border-b-2 border-dashed border-[#d4cbba]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-3xl font-bold text-[#2c3e24] font-serif tracking-tight flex items-center">
                            Layra<span className="text-[#a06d40] text-4xl leading-none">.</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-[#5c5446] hover:text-[#4a6b3d] font-bold transition-colors relative group">
                            <span>Home</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 border-b-2 border-dashed border-[#a06d40] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/shop" className="text-[#5c5446] hover:text-[#4a6b3d] font-bold transition-colors relative group">
                            <span>Shop</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 border-b-2 border-dashed border-[#a06d40] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/about" className="text-[#5c5446] hover:text-[#4a6b3d] font-bold transition-colors relative group">
                            <span>About Us</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 border-b-2 border-dashed border-[#a06d40] transition-all group-hover:w-full"></span>
                        </Link>

                        {/* Pages Dropdown */}
                        <div className="relative group">
                            <button
                                className="flex items-center text-[#5c5446] hover:text-[#4a6b3d] font-bold transition-colors outline-none relative group-btn"
                                onClick={() => setIsPagesDropdownOpen(!isPagesDropdownOpen)}
                                onMouseEnter={() => setIsPagesDropdownOpen(true)}
                            >
                                <span>Pages</span> <ChevronDown size={16} className="ml-1" />
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 border-b-2 border-dashed border-[#a06d40] transition-all group-hover:w-full"></span>
                            </button>

                            {/* Dropdown Content */}
                            <div
                                className={`absolute left-0 mt-2 w-48 bg-[#fffaef] rounded-xl shadow-lg border-2 border-dashed border-[#d4cbba] py-2 transition-all duration-200 ${isPagesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                    }`}
                                onMouseLeave={() => setIsPagesDropdownOpen(false)}
                            >
                                <Link to="/faq" className="block px-4 py-2 text-sm font-semibold text-[#5c5446] hover:bg-[#d4cbba]/20 hover:text-[#4a6b3d]">FAQ</Link>
                                <Link to="/testimonials" className="block px-4 py-2 text-sm font-semibold text-[#5c5446] hover:bg-[#d4cbba]/20 hover:text-[#4a6b3d]">Testimonials</Link>
                                <Link to="/contact" className="block px-4 py-2 text-sm font-semibold text-[#5c5446] hover:bg-[#d4cbba]/20 hover:text-[#4a6b3d]">Contact Us</Link>
                            </div>
                        </div>

                        <Link to="/contact" className="text-[#5c5446] hover:text-[#4a6b3d] font-bold transition-colors relative group">
                            <span>Contact</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 border-b-2 border-dashed border-[#a06d40] transition-all group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-[#5c5446] hover:text-[#a06d40] transition-colors">
                            <Search size={22} />
                        </button>
                        <button className="text-[#5c5446] hover:text-[#a06d40] transition-colors">
                            <User size={22} />
                        </button>
                        <div className="relative">
                            <button
                                onClick={toggleCart}
                                className="text-[#5c5446] hover:text-[#a06d40] transition-colors"
                            >
                                <ShoppingCart size={22} />
                            </button>
                            <span className="absolute -top-2 -right-2 bg-[#a06d40] text-[#fffaef] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                                {cartCount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center absolute right-4 top-6">
                    <button
                        onClick={toggleMenu}
                        className="text-[#5c5446] hover:text-[#4a6b3d] outline-none"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {
                isMenuOpen && (
                    <div className="md:hidden bg-[#fffaef] border-b-2 border-dashed border-[#d4cbba] absolute w-full shadow-lg">
                        <div className="px-4 pt-2 pb-4 space-y-2">
                            <Link to="/" className="block px-3 py-2 rounded-lg text-base font-bold text-[#5c5446] hover:text-[#4a6b3d] hover:bg-[#d4cbba]/20 border-l-2 border-dashed border-transparent hover:border-[#a06d40]">Home</Link>
                            <Link to="/shop" className="block px-3 py-2 rounded-lg text-base font-bold text-[#5c5446] hover:text-[#4a6b3d] hover:bg-[#d4cbba]/20 border-l-2 border-dashed border-transparent hover:border-[#a06d40]">Shop</Link>
                            <Link to="/about" className="block px-3 py-2 rounded-lg text-base font-bold text-[#5c5446] hover:text-[#4a6b3d] hover:bg-[#d4cbba]/20 border-l-2 border-dashed border-transparent hover:border-[#a06d40]">About Us</Link>
                            <Link to="/contact" className="block px-3 py-2 rounded-lg text-base font-bold text-[#5c5446] hover:text-[#4a6b3d] hover:bg-[#d4cbba]/20 border-l-2 border-dashed border-transparent hover:border-[#a06d40]">Contact</Link>
                            <div className="border-t-2 border-dashed border-[#d4cbba] my-3"></div>
                            <div className="flex justify-around py-2">
                                <button className="text-[#5c5446] hover:text-[#a06d40]"><Search size={24} /></button>
                                <button className="text-[#5c5446] hover:text-[#a06d40]"><User size={24} /></button>
                                <button onClick={toggleCart} className="text-[#5c5446] hover:text-[#a06d40] relative">
                                    <ShoppingCart size={24} />
                                    <span className="absolute -top-2 -right-2 bg-[#a06d40] text-[#fffaef] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </nav >
    );
};

export default Navbar;
