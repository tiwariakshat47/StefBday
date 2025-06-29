'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Letter() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioStarted, setAudioStarted] = useState(false);

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current && !audioStarted) {
                audioRef.current
                    .play()
                    .then(() => setAudioStarted(true))
                    .catch((err) => {
                        console.warn("Autoplay failed. Waiting for user interaction.");
                    });
            }
        };

        // Try autoplay
        playAudio();

        // Add fallback for user interaction (required by some browsers)
        const handleClick = () => playAudio();
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [audioStarted]);

    return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center p-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-xl text-center animate-fade-in">
                <h1 className="text-3xl font-bold text-[#e94d87] mb-4">💌 A Letter for You</h1>
                <p className="text-lg text-[#a33a56] mb-6">
                    Dear Stef,<br /><br />
                    You bring sweetness, sunshine, and sparkles into every room. I hope today is filled with everything that makes you smile — strawberry dreams, soft hugs, and lots of love. 🍓🌸💕<br /><br />
                    Love always,<br />
                    Your #1 Shortcake Fan 🍰
                </p>
                <Image
                    src="/akshatstef.JPEG"
                    alt="Akshat and Stef"
                    width={400}
                    height={400}
                    className="rounded-lg mx-auto shadow-md"
                />
            </div>

            {/* Background music */}
            <audio ref={audioRef} loop>
                <source src="/lovergirl.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
