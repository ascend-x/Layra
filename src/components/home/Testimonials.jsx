import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Quote } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useSite } from '../../context/SiteContext';

const Testimonials = () => {
    const { testimonials } = useSite();
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 relative">
                    <h2 className="text-4xl font-extrabold text-[#2c3e24] font-serif sm:text-5xl inline-block relative">
                        What Our Customers Say
                        <svg className="absolute w-[110%] h-3 -bottom-2 -left-[5%] text-[#a06d40]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" fill="none" />
                        </svg>
                    </h2>
                </div>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    centerInsufficientSlides={true}
                    pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet bg-[#a06d40]', bulletActiveClass: 'swiper-pagination-bullet-active bg-[#4a6b3d]' }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    className="pb-16"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id} className="pb-10 pt-4 px-4">
                            <div className="bg-[#fffaef] p-8 rounded-3xl border border-[#d4cbba] shadow-[6px_6px_0px_0px_#d4cbba] hover:shadow-[10px_10px_0px_0px_#d4cbba] transition-all duration-300 h-full relative group">
                                {/* Decorative corner stitches */}
                                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-dashed border-[#8d7c62]"></div>
                                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-dashed border-[#8d7c62]"></div>
                                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-dashed border-[#8d7c62]"></div>
                                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-dashed border-[#8d7c62]"></div>

                                <Quote className="absolute top-6 right-6 text-[#d4cbba] w-12 h-12 group-hover:text-[#e6decf] transition-colors" />

                                <div className="flex items-center mb-6 relative z-10 pt-2">
                                    <div className="relative">
                                        <div className="absolute -inset-1 border-2 border-dashed border-[#8d7c62] rounded-full"></div>
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-14 h-14 rounded-full object-cover relative z-10 border-2 border-[#fffaef]"
                                        />
                                    </div>
                                    <div className="ml-5">
                                        <h4 className="text-lg font-bold text-[#2c3e24] font-serif">{testimonial.name}</h4>
                                        <p className="text-sm text-[#a06d40] font-medium tracking-wide uppercase">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-[#5c5446] italic leading-relaxed font-medium relative z-10 px-2 text-lg">"{testimonial.text}"</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Pagination Styles - inline style hack to style swiper bullets without a separate css file */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .swiper-pagination-bullet { width: 10px; height: 10px; background: #d4cbba; opacity: 1; border-radius: 4px; transition: all 0.3s; }
                .swiper-pagination-bullet-active { width: 30px; background: #a06d40; border-radius: 4px; }
            `}} />
        </section>
    );
};

export default Testimonials;
