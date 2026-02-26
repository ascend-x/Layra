/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const mapToJS = (p) => ({
    ...p,
    oldPrice: p.old_price,
    isBestSeller: p.is_best_seller,
    howToUse: p.how_to_use
});

const mapToDB = (p) => {
    const { isBestSeller, howToUse, oldPrice, id, created_at, ...rest } = p;
    return {
        ...rest,
        old_price: oldPrice || null,
        is_best_seller: isBestSeller || false,
        how_to_use: howToUse || []
    };
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Auto-seed if empty
            if (data.length === 0) {
                const dbSeeds = initialProducts.map(p => mapToDB(p));
                const { data: seededData, error: seedError } = await supabase
                    .from('products')
                    .insert(dbSeeds)
                    .select();

                if (!seedError && seededData) {
                    setProducts(seededData.map(mapToJS));
                    return;
                } else {
                    console.error("Seed error - Likely blocked by RLS in Production:", seedError);
                    // Crucial: Set products to empty array so loading finishes instead of crashing
                    setProducts([]);
                }
            } else {
                setProducts(data.map(mapToJS));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]); // Failsafe
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (product) => {
        try {
            const { data, error } = await supabase
                .from('products')
                .insert([mapToDB(product)])
                .select();

            if (error) throw error;
            if (data && data.length > 0) {
                setProducts(prev => [mapToJS(data[0]), ...prev]);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            const payload = mapToDB(updatedProduct);

            const { error } = await supabase
                .from('products')
                .update(payload)
                .eq('id', id);

            if (error) throw error;
            setProducts(products.map(p => p.id === id ? { ...updatedProduct, id } : p));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
