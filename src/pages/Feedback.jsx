import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Loader2, Camera, UserCheck, UploadCloud, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const Feedback = () => {
    const { user, openAuthModal, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        age: '',
        phone: '',
        product: '',
        feedback: '',
        instagramConsent: false
    });

    const [photos, setPhotos] = useState([]); // array of up to 2 File objects
    const [video, setVideo] = useState(null); // File object or null
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Replace this with the actual deployed Google Apps Script Web App URL in your .env file
    const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

    useEffect(() => {
        if (!authLoading && !user && !isSuccess) {
            // Wait a tiny bit for render, then prompt login
            const timer = setTimeout(() => {
                openAuthModal(() => {
                    // Success callback - already on the page, do nothing special
                });
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [user, authLoading, openAuthModal, isSuccess]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        let newPhotos = [...photos];
        let newVideo = video;

        for (const file of files) {
            if (file.size > 50 * 1024 * 1024) {
                alert(`File ${file.name} is too large! Maximum size is 50MB.`);
                continue;
            }

            if (file.type.startsWith('image/')) {
                if (newPhotos.length < 2) {
                    newPhotos.push(file);
                } else {
                    alert('You can only upload a maximum of 2 photos.');
                }
            } else if (file.type.startsWith('video/')) {
                if (!newVideo) {
                    newVideo = file;
                } else {
                    alert('You can only upload a maximum of 1 video.');
                }
            } else {
                alert(`File ${file.name} has an invalid format. Images or videos only.`);
            }
        }

        setPhotos(newPhotos);
        setVideo(newVideo);

        // Reset file inputs so the same file could be selected again if removed
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (cameraInputRef.current) cameraInputRef.current.value = '';
    };

    const removePhoto = (index) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const removeVideo = () => {
        setVideo(null);
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]); // Strip prefix data:image/png;base64,
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            openAuthModal();
            return;
        }
        if (rating === 0) return alert('Please provide a rating.');

        setIsSubmitting(true);

        try {
            // Process photos
            let photo1Data = { base64: '', mime: '', name: '' };
            let photo2Data = { base64: '', mime: '', name: '' };

            if (photos.length > 0) {
                photo1Data.base64 = await convertFileToBase64(photos[0]);
                photo1Data.mime = photos[0].type;
                photo1Data.name = photos[0].name;
            }
            if (photos.length > 1) {
                photo2Data.base64 = await convertFileToBase64(photos[1]);
                photo2Data.mime = photos[1].type;
                photo2Data.name = photos[1].name;
            }

            // Process video
            let videoData = { base64: '', mime: '', name: '' };
            if (video) {
                videoData.base64 = await convertFileToBase64(video);
                videoData.mime = video.type;
                videoData.name = video.name;
            }

            const payload = {
                name: DOMPurify.sanitize(user?.displayName || 'Anonymous User'),
                email: DOMPurify.sanitize(user?.email || ''),
                profilePhoto: DOMPurify.sanitize(user?.photoURL || ''),
                age: DOMPurify.sanitize(formData.age),
                phone: DOMPurify.sanitize(formData.phone),
                product: DOMPurify.sanitize(formData.product),
                rating,
                feedback: DOMPurify.sanitize(formData.feedback),
                instagramConsent: formData.instagramConsent ? 'Yes' : 'No',
                date: new Date().toISOString(),
                // File data mapping
                photo1Base64: photo1Data.base64,
                photo1MimeType: photo1Data.mime,
                photo1Name: photo1Data.name,

                photo2Base64: photo2Data.base64,
                photo2MimeType: photo2Data.mime,
                photo2Name: photo2Data.name,

                videoBase64: videoData.base64,
                videoMimeType: videoData.mime,
                videoName: videoData.name
            };

            // Using no-cors prevents the browser from reading the JSON response, 
            // but is perfectly fine for "fire-and-forget" webhook saves.
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to send feedback. Please try again or check your internet connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // If still checking auth, show a gentle loading state or just blank until modal pops
    if (authLoading) {
        return <div className="min-h-screen bg-[#fffaef] flex items-center justify-center font-bold text-[#8d7c62]">Loading...</div>;
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#fffaef] pt-24 pb-16 px-4">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 md:p-12 text-center border border-[#d4cbba] shadow-[8px_8px_0px_0px_#d4cbba]"
                    >
                        <div className="w-24 h-24 bg-[#5c854c]/10 text-[#5c854c] rounded-full mx-auto flex items-center justify-center mb-6">
                            <Star className="fill-current" size={48} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#2c3e24] mb-4">Thank You!</h1>
                        <p className="text-lg text-[#5c5446] mb-8 font-medium">Your feedback has been successfully shared. We deeply appreciate you helping Layra grow closer to nature's perfection.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center rounded-xl border-2 border-[#d4cbba] bg-[#fffaef] px-8 py-4 text-lg font-bold text-[#5c5446] shadow-[4px_4px_0px_0px_#d4cbba] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_#d4cbba] transition-all"
                        >
                            Return Home
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffaef] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2c3e24] font-serif mb-4">Share Your Layra Journey</h1>
                    <p className="text-lg text-[#5c5446] max-w-2xl mx-auto">
                        Your experience helps us perfect our herbal remedies. Share a photo or video of your results and tell us how Layra worked for you!
                    </p>
                </div>

                {/* Authentication Gate Hint */}
                {!user ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-8 text-center border border-[#d4cbba] shadow-[4px_4px_0px_0px_#d4cbba]"
                    >
                        <div className="w-16 h-16 bg-[#a06d40]/10 text-[#a06d40] rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserCheck size={32} />
                        </div>
                        <h2 className="text-2xl font-bold font-serif text-[#2c3e24] mb-2">Sign in Required</h2>
                        <p className="text-[#5c5446] mb-6 font-medium">Please sign in with Google so we can verify and attribute your feedback.</p>
                        <button
                            onClick={() => openAuthModal()}
                            className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#a06d40] bg-[#fffaef] px-8 py-3 text-base font-bold text-[#a06d40] hover:bg-[#a06d40]/10 transition-colors"
                        >
                            Sign in now
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-6 md:p-10 border border-[#d4cbba] shadow-[8px_8px_0px_0px_#d4cbba]"
                    >
                        {/* Profile Banner */}
                        <div className="flex items-center gap-4 p-4 bg-[#fffaef] rounded-2xl border-2 border-dashed border-[#d4cbba] mb-8">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#a06d40]">
                                <img src={user.photoURL || "https://images.unsplash.com/photo-1544257134-8b63e8a4a584?q=80&w=64&h=64&auto=format&fit=crop"} alt={user.displayName} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#2c3e24] uppercase tracking-wide">Posting As</p>
                                <p className="text-lg font-serif font-bold text-[#a06d40] leading-none mt-1">{user.displayName}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Personal Details Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="age" className="block text-sm font-bold text-[#5c5446] mb-2">Age</label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        required
                                        min="13"
                                        max="120"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border-2 border-[#d4cbba] bg-white px-4 py-3 text-[#5c5446] font-medium focus:border-[#a06d40] focus:outline-none focus:ring-0 transition-colors"
                                        placeholder="e.g. 28"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-[#5c5446] mb-2">WhatsApp Number (Optional)</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border-2 border-[#d4cbba] bg-white px-4 py-3 text-[#5c5446] font-medium focus:border-[#a06d40] focus:outline-none focus:ring-0 transition-colors"
                                        placeholder="+91..."
                                    />
                                </div>
                            </div>

                            {/* Product Purchased */}
                            <div>
                                <label htmlFor="product" className="block text-sm font-bold text-[#5c5446] mb-2">Which product did you use?</label>
                                <input
                                    type="text"
                                    id="product"
                                    name="product"
                                    required
                                    value={formData.product}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border-2 border-[#d4cbba] bg-white px-4 py-3 text-[#5c5446] font-medium focus:border-[#a06d40] focus:outline-none focus:ring-0 transition-colors"
                                    placeholder="e.g. Layra Herbal Face and Body Pack"
                                />
                            </div>

                            {/* Rating */}
                            <div className="pt-4 border-t-2 border-dashed border-[#d4cbba]">
                                <label className="block text-lg font-bold font-serif text-[#2c3e24] mb-4 text-center">
                                    Rate your experience
                                </label>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star
                                                size={48}
                                                className={`transition-colors duration-200 ${(hoverRating || rating) >= star
                                                    ? 'fill-[#a06d40] text-[#a06d40] drop-shadow-md'
                                                    : 'fill-[#fffaef] text-[#d4cbba]'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Review Text */}
                            <div>
                                <label htmlFor="feedback" className="block text-lg font-bold font-serif text-[#2c3e24] mb-3">
                                    Your Review
                                </label>
                                <textarea
                                    id="feedback"
                                    name="feedback"
                                    required
                                    value={formData.feedback}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full rounded-xl border-2 border-[#d4cbba] bg-white px-4 py-4 text-[#5c5446] font-medium focus:border-[#a06d40] focus:outline-none focus:ring-0 resize-none transition-colors"
                                    placeholder="Tell us about the changes you noticed, how it feels, and why you love it..."
                                />
                            </div>

                            {/* Media Uploader */}
                            <div className="pt-4 border-t-2 border-dashed border-[#d4cbba]">
                                <label className="block text-lg font-bold font-serif text-[#2c3e24] mb-1">
                                    Attach Media (Optional)
                                </label>
                                <p className="text-sm text-[#8d7c62] mb-4 font-medium">Show us your glow! Upload a photo or video under 50MB.</p>

                                {!photos.length && !video ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Hidden inputs */}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*,video/*"
                                            multiple
                                            className="hidden"
                                        />
                                        <input
                                            type="file"
                                            ref={cameraInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*,video/*"
                                            multiple
                                            capture="environment"
                                            className="hidden"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => cameraInputRef.current?.click()}
                                            className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-[#a06d40] bg-[#a06d40]/5 hover:bg-[#a06d40]/10 transition-colors text-[#a06d40] group"
                                        >
                                            <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                                <Camera size={24} />
                                            </div>
                                            <span className="font-bold text-sm">Take Photo/Video</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-[#5c854c] bg-[#5c854c]/5 hover:bg-[#5c854c]/10 transition-colors text-[#5c854c] group"
                                        >
                                            <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                                <UploadCloud size={24} />
                                            </div>
                                            <span className="font-bold text-sm">Choose Files</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Media Preview Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {photos.map((photo, index) => (
                                                <div key={`photo-${index}`} className="relative rounded-2xl border-2 border-[#d4cbba] overflow-hidden bg-black/5 aspect-square flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => removePhoto(index)}
                                                        className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur text-[#e05a5a] rounded-full flex items-center justify-center shadow-md hover:bg-[#e05a5a] hover:text-white transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                    <img src={URL.createObjectURL(photo)} alt="Preview" className="w-full h-full object-cover" />
                                                </div>
                                            ))}

                                            {video && (
                                                <div className="relative rounded-2xl border-2 border-[#d4cbba] overflow-hidden bg-black/5 aspect-square flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={removeVideo}
                                                        className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur text-[#e05a5a] rounded-full flex items-center justify-center shadow-md hover:bg-[#e05a5a] hover:text-white transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                    <video src={URL.createObjectURL(video)} className="w-full h-full object-cover" controls />
                                                </div>
                                            )}

                                            {/* Add More button if under limit (2 photos + 1 video = 3 total) */}
                                            {(photos.length < 2 || !video) && (
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="rounded-2xl border-2 border-dashed border-[#a06d40] bg-[#fffaef] flex flex-col items-center justify-center aspect-square text-[#a06d40] hover:bg-[#a06d40]/5 transition-colors"
                                                >
                                                    <UploadCloud size={24} className="mb-2" />
                                                    <span className="font-bold text-xs">Add More</span>
                                                </button>
                                            )}
                                        </div>

                                        {/* Hidden inputs keep existing here so "Add More" maintains functionality */}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*,video/*"
                                            multiple
                                            className="hidden"
                                        />
                                        <input
                                            type="file"
                                            ref={cameraInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*,video/*"
                                            multiple
                                            capture="environment"
                                            className="hidden"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Instagram Consent Checkbox */}
                            <div className="pt-2">
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <div className="relative flex items-center justify-center mt-0.5">
                                        <input
                                            type="checkbox"
                                            name="instagramConsent"
                                            checked={formData.instagramConsent}
                                            onChange={handleInputChange}
                                            className="appearance-none w-6 h-6 rounded-lg border-2 border-[#d4cbba] checked:bg-[#5c854c] checked:border-[#5c854c] focus:outline-none transition-colors cursor-pointer peer shadow-sm"
                                        />
                                        <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-[#5c5446] group-hover:text-[#4a6b3d] transition-colors">I agree to let Layra Herbal feature my review and media on their Instagram and marketing channels.</p>
                                    </div>
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting || rating === 0}
                                className="w-full mt-8 flex items-center justify-center gap-3 rounded-2xl border-2 border-[#2c3e24] bg-[#5c854c] px-8 py-5 text-lg font-bold text-[#fffaef] shadow-[4px_4px_0px_0px_#2c3e24] hover:bg-[#4a6b3d] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_#2c3e24] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-[4px_4px_0px_0px_#2c3e24]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        Uploading nicely to nature...
                                    </>
                                ) : (
                                    <>
                                        <Send size={24} />
                                        Submit Feedback
                                    </>
                                )}
                            </button>

                        </form>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Feedback;
