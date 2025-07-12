'use client';

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function GiftsPage() {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(() => {
                    const handleClick = () => {
                        audioRef.current?.play();
                        window.removeEventListener("click", handleClick);
                    };
                    window.addEventListener("click", handleClick);
                });
            }
        };
        playAudio();
    }, []);

    return (
        <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center text-center p-8 relative">
            <h1 className="text-4xl font-bold text-[#e94d87] mb-2">🎁 MWEHEHEHEH!</h1>
            <p className="text-lg text-[#a33a56] mb-8 max-w-xl">
                GET READY FOR SOME FUN DAYS IN SEPTEMBER :3
            </p>

            <div className="relative w-full max-w-6xl flex flex-col lg:flex-row items-start justify-center gap-12">
                {/* Gift images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-shrink-0 z-10">
                    <Image
                        src="/dintaifung.png"
                        alt="Din Tai Fung"
                        width={500}
                        height={300}
                        className="rounded-xl shadow-lg"
                    />
                    <Image
                        src="/great_america_tickets.jpg"
                        alt="Great America Ticket"
                        width={500}
                        height={300}
                        className="rounded-xl shadow-lg"
                    />
                </div>

                {/* Calendar Image */}
                <div className="hidden lg:block flex-shrink-0">
                    <Image
                        src="/calendar_sept14.png"
                        alt="Calendar - Sept 14"
                        width={400}
                        height={400}
                        className="rounded-xl shadow-xl"
                    />
                </div>
            </div>

            <Link
                href="/letter"
                className="mt-12 bg-[#e94d87] hover:bg-[#ff6b9d] text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300 z-20"
            >
                ⬅️ Back to Letter
            </Link>

            {/* 🎵 Background music */}
            <audio ref={audioRef} loop>
                <source src="/baby.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
