import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const { cartCount, toggleCart } = useCart();
    const { user, openAuthModal, logout } = useAuth();

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

                        {/* Profile Area */}
                        <div className="relative group">
                            {user ? (
                                <button
                                    className="flex items-center text-[#5c5446] hover:text-[#a06d40] transition-colors outline-none cursor-pointer"
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    // Make it work on both click and hover
                                    onMouseEnter={() => setIsProfileDropdownOpen(true)}
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#d4cbba] hover:border-[#a06d40] transition-colors">
                                        <img src={user.photoURL || "https://images.unsplash.com/photo-1544257134-8b63e8a4a584?q=80&w=64&h=64&auto=format&fit=crop"} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                                    </div>
                                </button>
                            ) : (
                                <button onClick={() => openAuthModal()} className="text-[#5c5446] hover:text-[#a06d40] transition-colors">
                                    <User size={22} />
                                </button>
                            )}

                            {/* Profile Dropdown */}
                            {user && (
                                <div
                                    className={`absolute right-0 mt-2 w-48 bg-[#fffaef] rounded-xl shadow-[0px_10px_30px_rgba(44,62,36,0.1)] border-2 border-dashed border-[#d4cbba] py-2 transition-all duration-200 z-50 ${isProfileDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                        }`}
                                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                                >
                                    <div className="px-4 py-3 border-b-2 border-dashed border-[#d4cbba] mb-1">
                                        <p className="text-sm font-bold text-[#2c3e24] truncate">{user.displayName || "Herbal Enthusiast"}</p>
                                        <p className="text-xs font-medium text-[#8d7c62] truncate">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 text-sm font-semibold text-[#e05a5a] hover:bg-[#e05a5a]/10 flex items-center gap-2 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>

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
                                {user ? (
                                    <button onClick={logout} className="text-[#e05a5a] hover:text-[#c44e4e]"><LogOut size={24} /></button>
                                ) : (
                                    <button onClick={() => { setIsMenuOpen(false); openAuthModal(); }} className="text-[#5c5446] hover:text-[#a06d40]"><User size={24} /></button>
                                )}
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
