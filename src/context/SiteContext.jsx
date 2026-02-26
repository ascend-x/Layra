import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

const SiteContext = createContext();

export const useSite = () => useContext(SiteContext);

// Initial Static Content
const initialCategories = [
    {
        name: 'Skin Care',
        image: '/images/skin_care_category_1772097725583.png',
        link: '/shop?category=skin-care',
        description: 'Natural glow for your skin'
    },
    {
        name: 'Body Care',
        image: '/images/body_care_category_1772097827624.png',
        link: '/shop?category=body-care',
        description: 'Nourish your body daily'
    },
    {
        name: 'Edibles',
        image: '/images/edibles_category_1772097885556.png',
        link: '/shop?category=edibles',
        description: 'Healthy organic treats'
    },
    {
        name: 'Hair Care',
        image: '/images/hair_care_category_1772097909527.png',
        link: '/shop?category=hair-care',
        description: 'Stronger, shinier hair'
    }
];

const initialTestimonials = [
    {
        name: 'Sarah M.',
        role: 'Loyal Customer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        text: "I've never felt better since switching to Layra's organic supplements. The quality is unmatched and I love the eco-friendly packaging!",
    },
    {
        name: 'James L.',
        role: 'Health Enthusiast',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        text: "The herbal teas are my absolute favorite. They are so soothing and have become a staple in my nightly routine. Highly recommend!",
    },
    {
        name: 'Elena R.',
        role: 'Yoga Instructor',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        text: "As a yoga instructor, I'm very conscious about what I put in my body. Layra's products align perfectly with my values. Pure and effective.",
    }
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
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchSiteData();
        }
    }, []);

    const fetchSiteData = async () => {
        setLoading(true);
        try {
            // Fetch Categories
            const { data: catData, error: catError } = await supabase.from('categories').select('*').order('id');
            if (catError) console.error('Categories Error:', catError);
            if (!catError && catData) {
                if (catData.length === 0) {
                    const { data: seededCats } = await supabase.from('categories').insert(initialCategories).select();
                    if (seededCats) setCategories(seededCats);
                } else {
                    setCategories(catData);
                }
            }

            // Fetch Testimonials
            const { data: testData, error: testError } = await supabase.from('testimonials').select('*').order('id');
            if (testError) console.error('Testimonials Error:', testError);
            if (!testError && testData) {
                if (testData.length === 0) {
                    const { data: seededTests } = await supabase.from('testimonials').insert(initialTestimonials).select();
                    if (seededTests) setTestimonials(seededTests);
                } else {
                    setTestimonials(testData);
                }
            }

            // Fetch About Data (Settings)
            const { data: settingsData, error: settingsError } = await supabase.from('settings').select('*').eq('key', 'about');
            if (settingsError) console.error('Settings Error:', settingsError);
            if (!settingsError && settingsData) {
                if (settingsData.length === 0) {
                    await supabase.from('settings').insert([{ key: 'about', value: initialAboutData }]);
                    setAboutDataState(initialAboutData);
                } else {
                    setAboutDataState(settingsData[0].value);
                }
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
            const { error } = await supabase.from('categories').update(payload).eq('id', id);

            if (!error) {
                setCategories(categories.map(c => c.id === id ? { ...updatedCat, id } : c));
            } else {
                console.error("Update Category Error:", error);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const addTestimonial = async (testimonial) => {
        try {
            const { data, error } = await supabase.from('testimonials').insert([testimonial]).select();
            if (!error && data && data.length > 0) {
                setTestimonials([...testimonials, data[0]]);
            } else {
                console.error("Add Testimonial Error:", error);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const updateTestimonial = async (id, updatedTest) => {
        try {
            const payload = { ...updatedTest };
            delete payload.id;
            const { error } = await supabase.from('testimonials').update(payload).eq('id', id);

            if (!error) {
                setTestimonials(testimonials.map(t => t.id === id ? { ...updatedTest, id } : t));
            } else {
                console.error("Update Testimonial Error:", error);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const deleteTestimonial = async (id) => {
        try {
            const { error } = await supabase.from('testimonials').delete().eq('id', id);
            if (!error) {
                setTestimonials(testimonials.filter(t => t.id !== id));
            } else {
                console.error("Delete Testimonial Error:", error);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const setAboutData = async (newAboutData) => {
        try {
            const { error } = await supabase.from('settings').update({ value: newAboutData }).eq('key', 'about');
            if (!error) {
                setAboutDataState(newAboutData);
            } else {
                console.error("Update About Data Error:", error);
            }
        } catch (e) {
            console.error(e);
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
