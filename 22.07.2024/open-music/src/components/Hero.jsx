// Hero.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { db, dbRef, get } from "../firebase"; // Importa correttamente dbRef
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTracks = async () => {
      const tracksRef = dbRef(db, "tracks"); // Usa dbRef al posto di dbref
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
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-[400px] mySwiper"
    >
      {tracks.map((track) => (
        <SwiperSlide
          key={track.id}
          onClick={() => navigate(`/track/${track.id}`)}
          className="cursor-pointer"
        >
          <img
            src={track.cover}
            alt={track.title}
            className="w-full h-[300px] object-cover"
          />
          <div className="text-center pt-4">
            <h3 className="text-lg text-violet-900 font-bold">{track.title}</h3>
            <p className="text-sm text-violet-500">{track.artist}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
