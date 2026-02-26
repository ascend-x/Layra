import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';

import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductForm from './pages/admin/ProductForm';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';
import CategoryForm from './pages/admin/CategoryForm';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin';
import TestimonialForm from './pages/admin/TestimonialForm';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import { SiteProvider } from './context/SiteContext';
import ScrollToTop from './components/layout/ScrollToTop';

import ProtectedRoute from './components/admin/ProtectedRoute';

import { useSite } from './context/SiteContext';
import { useProducts } from './context/ProductContext';
import GlobalLoader from './components/layout/GlobalLoader';

// Placeholder components for other routes
const NotFound = () => <div className="p-8 text-2xl font-bold text-red-500">404 - Page Not Found</div>;

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const { loading: siteLoading } = useSite();
  const { loading: productsLoading } = useProducts();

  if (siteLoading || productsLoading) {
    return <GlobalLoader />;
  }

  return (
    <Routes location={location} key={location.pathname}>
      {/* Public Routes */}
      <Route path="/" element={<Layout><PageWrapper><Home /></PageWrapper></Layout>} />
      <Route path="/shop" element={<Layout><PageWrapper><Shop /></PageWrapper></Layout>} />
      <Route path="/product/:id" element={<Layout><PageWrapper><ProductDetails /></PageWrapper></Layout>} />
      <Route path="/about" element={<Layout><PageWrapper><About /></PageWrapper></Layout>} />
      <Route path="/contact" element={<Layout><PageWrapper><Contact /></PageWrapper></Layout>} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<PageWrapper><Login /></PageWrapper>} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="categories" element={<CategoriesAdmin />} />
          <Route path="categories/edit/:id" element={<CategoryForm />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="testimonials/new" element={<TestimonialForm />} />
          <Route path="testimonials/edit/:id" element={<TestimonialForm />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>
      </Route>

      <Route path="*" element={<Layout><PageWrapper><NotFound /></PageWrapper></Layout>} />
    </Routes>
  );
}

export default App;
