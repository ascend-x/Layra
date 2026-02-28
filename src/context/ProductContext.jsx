/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore';
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
        how_to_use: howToUse || [],
        created_at: created_at || Timestamp.now()
    };
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const initRef = useRef(false);

    useEffect(() => {
        if (!initRef.current) {
            initRef.current = true;
            fetchProducts();
        }
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const productsRef = collection(db, 'products');
            const q = query(productsRef, orderBy('created_at', 'desc'));
            const querySnapshot = await getDocs(q);

            let fetchedProducts = querySnapshot.docs.map(document => ({ id: document.id, ...document.data() }));

            if (fetchedProducts.length === 0) {
                console.warn("Products not found in database.");
            }

            setProducts(fetchedProducts.map(mapToJS));
        } catch (error) {
            console.error('Error fetching products:', error);
            // Crucial: Set products to empty array so loading finishes instead of crashing
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (product) => {
        try {
            const productsRef = collection(db, 'products');
            const payload = mapToDB(product);
            const docRef = await addDoc(productsRef, payload);
            setProducts(prev => [mapToJS({ id: docRef.id, ...payload }), ...prev]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            const productRef = doc(db, 'products', id);
            const payload = mapToDB(updatedProduct);
            await updateDoc(productRef, payload);
            setProducts(products.map(p => p.id === id ? { ...updatedProduct, id } : p));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const productRef = doc(db, 'products', id);
            await deleteDoc(productRef);
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
