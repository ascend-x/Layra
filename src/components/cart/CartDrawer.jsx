import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
    const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const handleCheckout = () => {
        const phoneNumber = "6374079511"; // Replace with actual WhatsApp number
        let message = "Hello Layra Herbal, I would like to place an order:%0A%0A";

        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (₹${item.price.toFixed(2)})%0A`;
        });

        message += `%0ATotal: ₹${cartTotal.toFixed(2)} (excl. shipping)`;

        // For local testing on desktop, web.whatsapp.com is often more reliable than wa.me
        window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`, '_blank');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#fffaef] shadow-[0px_0px_20px_0px_rgba(44,62,36,0.2)] z-50 flex flex-col border-l-2 border-dashed border-[#d4cbba]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-dashed border-[#d4cbba]">
                            <h2 className="text-xl font-bold font-serif text-[#2c3e24]">Your Cart</h2>
                            <button
                                onClick={toggleCart}
                                className="p-2 text-[#8d7c62] hover:text-[#5c854c] hover:bg-[#d4cbba]/20 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-[#8d7c62] space-y-4">
                                    <ShoppingBag size={56} className="opacity-30 text-[#a06d40]" />
                                    <p className="font-medium text-lg">Your cart is feeling light.</p>
                                    <button
                                        onClick={toggleCart}
                                        className="text-[#5c854c] font-bold hover:text-[#4a6b3d] border-b-2 border-dashed border-[#5c854c] hover:border-[#4a6b3d] transition-colors pb-1 mt-2"
                                    >
                                        Discover Nature's Best
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl border border-[#d4cbba] shadow-[4px_4px_0px_0px_#d4cbba] relative group">
                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 border-dashed border-[#d4cbba]">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-bold text-[#2c3e24]">
                                                    <h3 className="line-clamp-1">{item.name}</h3>
                                                    <p className="ml-4 text-[#5c854c]">₹{(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-xs font-semibold text-[#8d7c62] uppercase tracking-wider">{item.category}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm mt-3">
                                                <div className="flex items-center border-2 border-dashed border-[#8d7c62] rounded-lg bg-[#fffaef]">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-2.5 py-1 text-[#8d7c62] hover:text-[#a06d40] hover:bg-[#d4cbba]/20 transition-colors"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-2 py-1 text-[#2c3e24] font-bold min-w-[24px] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2.5 py-1 text-[#8d7c62] hover:text-[#a06d40] hover:bg-[#d4cbba]/20 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-[#e05a5a]/70 hover:text-[#e05a5a] hover:bg-[#e05a5a]/10 rounded-lg transition-colors flex items-center"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="border-t-2 border-dashed border-[#d4cbba] px-6 py-6 bg-[#fffaef]">
                                <div className="flex justify-between text-lg font-bold text-[#2c3e24] mb-2 font-serif">
                                    <p>Subtotal</p>
                                    <p className="text-[#5c854c]">₹{cartTotal.toFixed(2)}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-[#8d7c62] font-medium mb-6">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full flex items-center justify-center rounded-xl border-2 border-dashed border-[#4a6b3d] bg-[#5c854c] px-6 py-4 text-lg font-bold text-[#fffaef] shadow-md hover:bg-[#4a6b3d] hover:border-[#2c3e24] transition-all active:scale-[0.98]"
                                >
                                    <ShoppingBag size={20} className="mr-2" />
                                    Checkout on WhatsApp
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
