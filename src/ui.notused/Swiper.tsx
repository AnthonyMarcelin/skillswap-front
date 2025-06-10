import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function SwiperComponent() {
  return (
    <div className="h-100 bg-primary flex items-center justify-center">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full max-w-2xl"
      >
        {[...Array(9)].map((_, i) => (
          <SwiperSlide
            key={i}
            className="flex items-center justify-center text-white text-2xl font-bold bg-gray-700 h-64"
          >
            Slide {i + 1}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
