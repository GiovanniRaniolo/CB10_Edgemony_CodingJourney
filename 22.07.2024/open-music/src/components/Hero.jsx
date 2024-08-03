import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  EffectCoverflow,
  Pagination,
  Keyboard,
  Mousewheel,
} from "swiper/modules";
import { db, dbRef, get } from "../firebase";
import { usePlayer } from "../context/PlayerContext";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const [tracks, setTracks] = useState([]);
  const { playTrack } = usePlayer();
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

  const handleImageClick = (trackId) => {
    navigate(`/track/${trackId}`);
  };

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={4}
      spaceBetween={30}
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={{ dynamicBullets: true }}
      keyboard={{ enabled: true }}
      mousewheel={{ invert: false }}
      modules={[EffectCoverflow, Pagination, Keyboard, Mousewheel]}
      className="w-full h-[500px] mySwiper relative"
    >
      {tracks.map((track) => (
        <SwiperSlide
          key={track.id}
          className="cursor-pointer flex justify-center items-center relative"
        >
          <div className="relative w-[300px] h-[300px]">
            <img
              src={track.cover}
              alt={track.title}
              className="w-full h-full object-cover rounded-lg"
              onClick={() => handleImageClick(track.id)} // Handle image click
            />
            {/* Text */}
            <div className="absolute -bottom-14 left-0 right-0 flex justify-center items-center px-4">
              <div className="flex flex-col items-center text-center mx-4">
                <h3 className="text-lg text-violet-700 font-bold">
                  {track.title}
                </h3>
                <p className="text-sm text-violet-500">{track.artist}</p>
              </div>
              {/* Play */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent image click event
                  playTrack(track);
                }}
                className="play-button absolute left-4"
              >
                <FaPlay className="play-icon" />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
