import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import axios from 'axios';

const ContentCarousel = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetImage();
  }, [])

  const handleGetImage = () => {
    axios.get("https://picsum.photos/v2/list?page=1&limit=20")
    .then((res) => {
      console.log(res)
      setData(res.data);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
    <Swiper 
      pagination={true} 
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }} 
      className="mySwiper h-80 object-cover rounded-md"
    >
      {
        data?.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.download_url} />
          </SwiperSlide>
        ))
      }
    </Swiper>

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
    >
      {
        data?.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              className="rounded-md" 
              src={item.download_url} />
          </SwiperSlide>
        ))
      }
    </Swiper>



  </>
  )
}

export default ContentCarousel