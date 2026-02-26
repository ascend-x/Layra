import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const TestimonialsAdmin = () => {
    const { testimonials, deleteTestimonial } = useSite();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            deleteTestimonial(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Testimonials</h1>
                <Link
                    to="/admin/testimonials/new"
                    className="flex items-center space-x-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[#3d5435] transition-colors"
                >
                    <Plus size={20} />
                    <span>Add Testimonial</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Text</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {testimonials.map((testimonial) => (
                            <tr key={testimonial.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={testimonial.image} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {testimonial.role}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                    {testimonial.text}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-3">
                                        <Link
                                            to={`/admin/testimonials/edit/${testimonial.id}`}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(testimonial.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TestimonialsAdmin;
