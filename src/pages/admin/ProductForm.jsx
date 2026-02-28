import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { ArrowLeft, Save } from 'lucide-react';
import { compressImage } from '../../utils/imageHelper';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, addProduct, updateProduct } = useProducts();
    const isEditMode = !!id;

    const [formData, setFormData] = useState(() => {
        if (id) {
            const product = products.find(p => String(p.id) === String(id));
            if (product) {
                return {
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    oldPrice: product.oldPrice || '',
                    image: product.image,
                    description: product.description || '',
                    sale: product.sale || false,
                    new: product.new || false,
                    isBestSeller: product.isBestSeller || false
                };
            }
        }
        return {
            name: '',
            category: '',
            price: '',
            oldPrice: '',
            image: '',
            description: '',
            sale: false,
            new: false,
            isBestSeller: false
        };
    });

    const [errors, setErrors] = useState({});



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'image') {
            const urlPattern = /^(https?:\/\/|data:image\/|\/images\/)/i;
            if (value && !urlPattern.test(value)) {
                setErrors(prev => ({ ...prev, image: 'Image URL must start with http://, https://, or be a local image.' }));
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.image;
                    return newErrors;
                });
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length > 0) return;

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null
        };

        if (isEditMode) {
            updateProduct(id, productData);
        } else {
            addProduct(productData);
        }
        navigate('/admin/dashboard');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? 'Edit Product' : 'Add New Product'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    >
                        <option value="">Select Category</option>
                        <option value="Skin Care">Skin Care</option>
                        <option value="Hair Care">Hair Care</option>
                        <option value="Body Care">Body Care</option>
                        <option value="Edibles">Edibles</option>
                        <option value="Supplements">Supplements</option>
                        <option value="Aromatherapy">Aromatherapy</option>
                    </select>
                </div>

                {/* Prices */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Old Price (₹) <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input
                            type="number"
                            name="oldPrice"
                            step="0.01"
                            value={formData.oldPrice}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        required
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                    />

                    <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Or Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    try {
                                        const base64 = await compressImage(file);
                                        setFormData(prev => ({ ...prev, image: base64 }));
                                        setErrors(prev => {
                                            const newErrors = { ...prev };
                                            delete newErrors.image;
                                            return newErrors;
                                        });
                                    } catch (err) {
                                        setErrors(prev => ({ ...prev, image: 'Failed to compress image' }));
                                    }
                                }
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 items-center file:text-[var(--color-primary)] hover:file:bg-gray-200"
                        />
                    </div>
                    {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                    {formData.image && (
                        <div className="mt-4 relative h-32 w-32 rounded-lg overflow-hidden border border-gray-200">
                            <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    ></textarea>
                </div>

                {/* Toggles */}
                <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="sale"
                            checked={formData.sale}
                            onChange={handleChange}
                            className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                        />
                        <span className="text-sm font-medium text-gray-700">On Sale</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="new"
                            checked={formData.new}
                            onChange={handleChange}
                            className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                        />
                        <span className="text-sm font-medium text-gray-700">New Arrival</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isBestSeller"
                            checked={formData.isBestSeller}
                            onChange={handleChange}
                            className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                        />
                        <span className="text-sm font-medium text-gray-700">Best Seller</span>
                    </label>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        className="flex items-center space-x-2 bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:bg-[#3d5435] transition-colors"
                    >
                        <Save size={20} />
                        <span>{isEditMode ? 'Update Product' : 'Create Product'}</span>
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ProductForm;
