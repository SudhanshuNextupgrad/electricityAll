import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination,Autoplay } from 'swiper/modules';

export default function Slider(){
  return(
    <div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true
        }}
        // autoplay={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination,Autoplay]}
        loop={true}
        className="mySwiper"
        style={{
          "--swiper-pagination-color": "yellow",
          "--swiper-pagination-bullet-inactive-color": "lightyellow",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "10px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
          "--swiper-pagination-bullet-border-radius":"0px"
      }}
      >
        <SwiperSlide>
          <div>
            <Image src="/homepage/banner-slider-img1.png" height={500} width= {300} alt='img' />
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div>
            <Image src="/homepage/banner-slider-img2.png" height={500} width= {300} alt='img' />
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div>
            <Image src="/homepage/banner-slider-img1.png" height={500} width= {300} alt='img' />
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div>
            <Image src="/homepage/banner-slider-img2.png" height={500} width= {300} alt='img' />
          </div>
          </SwiperSlide>
          
          
        
      </Swiper>
    </div>
  )
}
