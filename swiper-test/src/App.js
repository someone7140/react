import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function App() {
  const swiperRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          marginLeft: "80px",
          display: "flex",
          width: "800px",
        }}
      >
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={activeIndex === 0}
        >
          Prev
        </button>
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChangeTransitionEnd={updateActiveIndex}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
        </Swiper>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={activeIndex === 3}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
