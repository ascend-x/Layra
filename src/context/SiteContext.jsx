import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const SiteContext = createContext();

export const useSite = () => useContext(SiteContext);

// Initial Static Content
const initialCategories = [
    { name: 'Skin Care', image: '/images/skin_care_category_1772097725583.png', link: '/shop?category=skin-care', description: 'Natural glow for your skin' },
    { name: 'Body Care', image: '/images/body_care_category_1772097827624.png', link: '/shop?category=body-care', description: 'Nourish your body daily' },
    { name: 'Edibles', image: '/images/edibles_category_1772097885556.png', link: '/shop?category=edibles', description: 'Healthy organic treats' },
    { name: 'Hair Care', image: '/images/hair_care_category_1772097909527.png', link: '/shop?category=hair-care', description: 'Stronger, shinier hair' }
];

const initialTestimonials = [
    { name: 'Sarah M.', role: 'Loyal Customer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', text: "I've never felt better since switching to Layra's organic supplements. The quality is unmatched and I love the eco-friendly packaging!" },
    { name: 'James L.', role: 'Health Enthusiast', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', text: "The herbal teas are my absolute favorite. They are so soothing and have become a staple in my nightly routine. Highly recommend!" },
    { name: 'Elena R.', role: 'Yoga Instructor', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', text: "As a yoga instructor, I'm very conscious about what I put in my body. Layra's products align perfectly with my values. Pure and effective." }
];

const initialAboutData = {
    title: "Rooted in Nature",
    para1: "Layra Herbal Products was born from a simple belief: that nature holds the key to true wellness. Our journey began in small organic farms, selecting the purest herbs known for their healing properties.",
    para2: "We combine traditional Ayurvedic wisdom with modern extraction techniques to bring you products that are potent, pure, and effective. Every bottle tells a story of care, sustainability, and uncompromising quality.",
    para3: "Our mission is to make natural wellness accessible to everyone, ensuring that what you put on and in your body is free from harmful chemicals and full of vibrant life.",
    image: "/images/about_section_image_1772097693985.png"
};

export const SiteProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [aboutData, setAboutDataState] = useState(initialAboutData);
    const [loading, setLoading] = useState(true);

    const initRef = useRef(false);

    useEffect(() => {
        if (!initRef.current) {
            initRef.current = true;
            fetchSiteData();
        }
    }, []);

    const fetchSiteData = async () => {
        setLoading(true);
        try {
            // Fetch Categories
            const catRef = collection(db, 'categories');
            const catSnapshot = await getDocs(catRef);
            let catData = catSnapshot.docs.map(document => ({ id: document.id, ...document.data() }));

            if (catData.length === 0) {
                console.warn("Categories not found in database.");
            }
            setCategories(catData.sort((a, b) => a.name.localeCompare(b.name)));

            // Fetch Testimonials
            const testRef = collection(db, 'testimonials');
            const testSnapshot = await getDocs(testRef);
            let testData = testSnapshot.docs.map(document => ({ id: document.id, ...document.data() }));

            if (testData.length === 0) {
                console.warn("Testimonials not found in database.");
            }
            setTestimonials(testData);

            // Fetch About Data (Settings)
            const settingsRef = collection(db, 'settings');
            const settingsSnapshot = await getDocs(settingsRef);
            const aboutDoc = settingsSnapshot.docs.find(d => d.data().key === 'about');

            if (!aboutDoc) {
                await addDoc(settingsRef, { key: 'about', value: initialAboutData });
                setAboutDataState(initialAboutData);
            } else {
                setAboutDataState(aboutDoc.data().value);
            }

        } catch (err) {
            console.error('Error fetching site data:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (id, updatedCat) => {
        try {
            const payload = { ...updatedCat };
            delete payload.id;
            await updateDoc(doc(db, 'categories', id), payload);
            setCategories(categories.map(c => c.id === id ? { ...updatedCat, id } : c));
        } catch (e) {
            console.error("Update Category Error:", e);
        }
    };

    const addTestimonial = async (testimonial) => {
        try {
            const docRef = await addDoc(collection(db, 'testimonials'), testimonial);
            setTestimonials([...testimonials, { id: docRef.id, ...testimonial }]);
        } catch (e) {
            console.error("Add Testimonial Error:", e);
        }
    };

    const updateTestimonial = async (id, updatedTest) => {
        try {
            const payload = { ...updatedTest };
            delete payload.id;
            await updateDoc(doc(db, 'testimonials', id), payload);
            setTestimonials(testimonials.map(t => t.id === id ? { ...updatedTest, id } : t));
        } catch (e) {
            console.error("Update Testimonial Error:", e);
        }
    };

    const deleteTestimonial = async (id) => {
        try {
            await deleteDoc(doc(db, 'testimonials', id));
            setTestimonials(testimonials.filter(t => t.id !== id));
        } catch (e) {
            console.error("Delete Testimonial Error:", e);
        }
    };

    const setAboutData = async (newAboutData) => {
        try {
            const settingsRef = collection(db, 'settings');
            const settingsSnapshot = await getDocs(settingsRef);
            const aboutDoc = settingsSnapshot.docs.find(d => d.data().key === 'about');

            if (aboutDoc) {
                await updateDoc(doc(db, 'settings', aboutDoc.id), { value: newAboutData });
            } else {
                await addDoc(settingsRef, { key: 'about', value: newAboutData });
            }
            setAboutDataState(newAboutData);
        } catch (e) {
            console.error("Update About Data Error:", e);
        }
    };

    return (
        <SiteContext.Provider value={{
            categories, updateCategory,
            testimonials, updateTestimonial, deleteTestimonial, addTestimonial,
            aboutData, setAboutData,
            loading
        }}>
            {children}
        </SiteContext.Provider>
    );
};
