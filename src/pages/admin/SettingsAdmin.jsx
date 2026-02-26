import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Save } from 'lucide-react';
import { compressImage } from '../../utils/imageHelper';

const SettingsAdmin = () => {
    const { aboutData, setAboutData } = useSite();

    const [formData, setFormData] = useState({
        title: aboutData.title,
        para1: aboutData.para1,
        para2: aboutData.para2,
        para3: aboutData.para3,
        image: aboutData.image
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSuccess(false);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await compressImage(file);
                setFormData(prev => ({ ...prev, image: base64 }));
                setError('');
                setSuccess(false);
            } catch (err) {
                setError('Failed to compress image');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAboutData(formData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-8">

                <div>
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">About Section</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 1</label>
                            <textarea
                                name="para1"
                                rows="3"
                                required
                                value={formData.para1}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 2</label>
                            <textarea
                                name="para2"
                                rows="3"
                                required
                                value={formData.para2}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 3</label>
                            <textarea
                                name="para3"
                                rows="3"
                                required
                                value={formData.para3}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">About Image URL</label>
                            <input
                                type="text"
                                name="image"
                                required
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                            />

                            <div className="mt-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Or Upload Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 items-center file:text-[var(--color-primary)] hover:file:bg-gray-200"
                                />
                            </div>
                            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

                            {formData.image && (
                                <div className="mt-4 relative h-48 w-full max-w-sm rounded-lg overflow-hidden border border-gray-200">
                                    <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-6 pt-6">
                    <div>
                        {success && <span className="text-green-600 font-medium tracking-wide">Settings saved successfully!</span>}
                    </div>
                    <button
                        type="submit"
                        className="flex items-center space-x-2 bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg hover:bg-[#3d5435] transition-colors shadow-md"
                    >
                        <Save size={20} />
                        <span>Save All Settings</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingsAdmin;
