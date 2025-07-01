'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const floatingImages = [
  { src: "/stef_2561.jpg", alt: "Decor 1" },
  { src: "/stef_6210.JPEG", alt: "Decor 2" },
  { src: "/stef_7979.jpg", alt: "Decor 3" },
  { src: "/stef_8104.PNG", alt: "Decor 4" },
  { src: "/stef_8458.jpg", alt: "Decor 5" },
  { src: "/stef_8533.jpg", alt: "Decor 6" },
];

const starIcons = [
  { className: "top-6 left-6 text-2xl animate-pulse", icon: "✨" },
  { className: "top-10 right-10 text-3xl animate-bounce", icon: "🌟" },
  { className: "top-1/3 left-20 text-xl animate-spin-slow", icon: "✨" },
  { className: "bottom-1/3 right-32 text-3xl animate-pulse", icon: "🌟" },
  { className: "bottom-20 left-12 text-2xl animate-bounce", icon: "✨" },
  { className: "bottom-8 right-8 text-2xl animate-spin-slow", icon: "🌟" },
];

const getRandomStyle = () => ({
  top: `${Math.random() * 85}vh`,
  left: `${Math.random() * 85}vw`,
  rotate: `${Math.random() * 30 - 15}deg`,
});

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [imageStates, setImageStates] = useState<{ top: string; left: string; rotate: string; visible: boolean }[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const initial = floatingImages.map(() => ({
      ...getRandomStyle(),
      visible: false,
    }));
    setImageStates(initial);
    setHydrated(true);

    const tryPlay = () => {
      audioRef.current?.play().catch(() => {
        const onClick = () => {
          audioRef.current?.play();
          window.removeEventListener("click", onClick);
        };
        window.addEventListener("click", onClick);
      });
    };

    // Wait for DOM to stabilize before autoplay attempt
    setTimeout(() => {
      tryPlay();
    }, 100);
  }, []);

  useEffect(() => {
    if (!hydrated || imageStates.length === 0) return;

    const timers: NodeJS.Timeout[] = [];

    imageStates.forEach((_, i) => {
      const updateCycle = () => {
        setImageStates((prev) =>
          prev.map((img, j) =>
            j === i
              ? {
                ...getRandomStyle(),
                visible: true,
              }
              : img
          )
        );

        const outTimer = setTimeout(() => {
          setImageStates((prev) =>
            prev.map((img, j) =>
              j === i
                ? {
                  ...img,
                  visible: false,
                }
                : img
            )
          );
        }, 3000);

        timers.push(outTimer);
      };

      updateCycle();
      const loopTimer = setInterval(updateCycle, 6000 + i * 500);
      timers.push(loopTimer);
    });

    return () => timers.forEach(clearTimeout);
  }, [hydrated, imageStates.length]);

  return (
    <>
      {/* 🎶 Background Music (rendered immediately) */}
      <audio ref={audioRef} autoPlay loop>
        <source src="/japanese-denim.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {!hydrated ? null : (
        <div className="relative min-h-screen bg-pink-100 flex flex-col items-center justify-center overflow-hidden p-8">
          {/* 🌟 Star Icons */}
          {starIcons.map((star, i) => (
            <div key={i} className={`absolute text-yellow-400 ${star.className}`}>
              {star.icon}
            </div>
          ))}

          {/* ✨ Floating Photos */}
          {floatingImages.map((img, i) => (
            <Image
              key={i}
              src={img.src}
              alt={img.alt}
              width={220}
              height={220}
              className={`absolute rounded-xl shadow-md transition-all duration-1000 ${imageStates[i]?.visible ? "opacity-100" : "opacity-0"
                }`}
              style={{
                top: imageStates[i]?.top,
                left: imageStates[i]?.left,
                transform: `rotate(${imageStates[i]?.rotate})`,
                zIndex: 1,
              }}
            />
          ))}

          {/* 🍓 Main Card */}
          <div className="bg-white p-6 rounded-2xl shadow-xl z-10">
            <Image
              src="/strawshort.png"
              alt="Strawberry Shortcake"
              width={300}
              height={300}
              priority
            />
          </div>

          {/* 🎉 Title and Text */}
          <h1 className="text-4xl sm:text-5xl font-bold text-[#e94d87] mt-8 text-center z-10">
            🎉 Happy Birthday Stef! 🍓
          </h1>
          <p className="mt-4 text-lg text-center text-[#a33a56] max-w-xl z-10 font-bold">
            😼 yippeee finally 21! time's flying by :0 🍰💖
          </p>

          {/* 💌 Button */}
          <Link
            href="/letter"
            className="mt-8 bg-[#e94d87] hover:bg-[#ff6b9d] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 animate-bounce hover:animate-none z-10"
          >
            Click me 💌
          </Link>
        </div>
      )}
    </>
  );
}
