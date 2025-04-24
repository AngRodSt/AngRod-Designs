'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css';
import { Product } from '@/lib/shopify/types';
import ProductCard from './ProductCarouselCard';
import { Navigation } from 'swiper/modules';

//Function to create a carousel for the products
export default function ProductCarousel({ products }: { products: Product[] }) {
  return (
    <>
      <div className="relative w-full min-h-[300px]">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.handle}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next "></div>
      </div>
    </>
  );
}
