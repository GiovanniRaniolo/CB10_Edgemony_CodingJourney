import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/scrollbar";
import {
  EffectCoverflow,
  Scrollbar,
  Keyboard,
  Mousewheel,
} from "swiper/modules";
import { db, dbRef, get } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Hero.css"; // Assicurati che il CSS sia importato correttamente

const Hero = () => {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTracks = async () => {
      const tracksRef = dbRef(db, "tracks");
      const snapshot = await get(tracksRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedTracks = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTracks(formattedTracks);
      }
    };

    fetchTracks();
  }, []);

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={4}
      spaceBetween={-30}
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      scrollbar={{ draggable: true }}
      keyboard={{ enabled: true }} // Abilita la navigazione con la tastiera
      mousewheel={{ invert: false }} // Abilita la navigazione con la rotella del mouse
      modules={[EffectCoverflow, Scrollbar, Keyboard, Mousewheel]}
      className="w-full h-[550px] mySwiper relative"
    >
      {tracks.map((track) => (
        <SwiperSlide
          key={track.id}
          onClick={() => navigate(`/track/${track.id}`)}
          className="cursor-pointer flex justify-center items-center"
        >
          <div className="w-[300px] h-[300px]">
            <img
              src={track.cover}
              alt={track.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="text-center pt-4">
              <h3 className="text-lg text-violet-900 font-bold">
                {track.title}
              </h3>
              <p className="text-sm text-violet-500">{track.artist}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
