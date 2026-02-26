import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import { ArrowLeft, Save } from 'lucide-react';
import { compressImage } from '../../utils/imageHelper';

const TestimonialForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { testimonials, addTestimonial, updateTestimonial } = useSite();
    const isEditMode = !!id;

    const [formData, setFormData] = useState(() => {
        if (id) {
            const testimonial = testimonials.find(t => t.id === parseInt(id));
            if (testimonial) return testimonial;
        }
        return {
            name: '',
            role: '',
            text: '',
            image: ''
        };
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await compressImage(file);
                setFormData(prev => ({ ...prev, image: base64 }));
                setError('');
            } catch (err) {
                setError('Failed to compress image');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            updateTestimonial(parseInt(id), formData);
        } else {
            addTestimonial(formData);
        }
        navigate('/admin/testimonials');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate('/admin/testimonials')}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? 'Edit Testimonial' : 'Add Testimonial'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role (e.g. Loyal Customer)</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
                    <textarea
                        name="text"
                        required
                        rows="4"
                        value={formData.text}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avatar Image URL</label>
                    <input
                        type="text"
                        name="image"
                        required
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    />

                    <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Or Upload Avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 items-center file:text-[var(--color-primary)] hover:file:bg-gray-200"
                        />
                    </div>
                    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

                    {formData.image && (
                        <div className="mt-4 relative h-16 w-16 rounded-full overflow-hidden border border-gray-200">
                            <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        className="flex items-center space-x-2 bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:bg-[#3d5435] transition-colors"
                    >
                        <Save size={20} />
                        <span>{isEditMode ? 'Update' : 'Create'} Testimonial</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TestimonialForm;
