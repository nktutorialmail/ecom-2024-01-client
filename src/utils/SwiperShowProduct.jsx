/* eslint-disable react/prop-types */
import { Swiper} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const SwiperShowProduct = ({ children }) => {
  return (
    <Swiper 
    slidesPerView={5}
    spaceBetween={2}
    pagination={true} 
    navigation={true}    
    modules={[Pagination, Autoplay, Navigation]}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }} 
    className="mySwiper object-cover rounded-md mt-3"
    breakpoints={{
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
      1280: {
        slidesPerView: 7,
        spaceBetween: 50,
      },
    }}

  >
   {children}
  </Swiper>
  )
}

export default SwiperShowProduct