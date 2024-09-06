"use client";

import { useEffect, useRef } from "react";

export const ImageComponent = () => {
  return (
    <div className="flex flex-col relative w-[250px]  m-auto ">
      <section>
        <img src="/img/1.jpg" alt="" height="100px" />
        <img src="/img/2.webp" alt="" className="my-3" />
      </section>
    </div>
  );
};

export const VideoComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Pastikan videoRef.current sudah ada dan terdefinisi
    if (videoRef.current) {
      videoRef.current.volume = 0.1; // Set volume ke 50%
    }
  }, []);

  return (
    <div className="absolute w-[200px]  h-[200px] flex bottom-[400px] my-24 ml-[170px]  right-[120px]">
      <video ref={videoRef} controls>
        <source src="/video/freya.mp4" type="video/mp4" />
        your browser not support the video tag
      </video>
      <video ref={videoRef} controls>
        <source src="/video/zee.mp4" type="video/mp4" />
        your browser not support the video tag
      </video>
    </div>
  );
};

export const BlogComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Pastikan videoRef.current sudah ada dan terdefinisi
    if (videoRef.current) {
      videoRef.current.volume = 0.1; // Set volume ke 50%
    }
  }, []);

  return (
    <div className="absolute w-[200px] h-[200px] flex  ml-[170px] ">
      <video ref={videoRef} controls>
        <source src="/video/freya.mp4" type="video/mp4" />
        your browser not support the video tag
      </video>
      <video ref={videoRef} controls>
        <source src="/video/zee.mp4" type="video/mp4" />
        your browser not support the video tag
      </video>
    </div>
  );
};
