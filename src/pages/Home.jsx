import React from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import BestSellers from '../components/home/BestSellers';
import Testimonials from '../components/home/Testimonials';
import InstagramFeed from '../components/home/InstagramFeed';
import Newsletter from '../components/home/Newsletter';
import FeedbackCTA from '../components/home/FeedbackCTA';

const Home = () => {
    return (
        <>
            <Hero />
            <Categories />
            <BestSellers />
            <Testimonials />
            <FeedbackCTA />
            <InstagramFeed />
            <Newsletter />
        </>
    );
};

export default Home;
