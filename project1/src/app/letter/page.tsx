'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";


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
                <h1 className="text-3xl font-bold text-[#e94d87] mb-4">😼</h1>
                <p className="text-lg text-[#a33a56] mb-6">
                    Dear Stef,<br /><br />
                    Im so happy we've gotten so close in these last couple months! You've been such a great friend and i've rlly enjoyed our calls and texts! 🍓🌸 I hope we keep talking and I hope u have a great 21st!!!<br /><br />
                    From,<br />
                    Akshat 🙃
                </p>
                <Image
                    src="/akshatstef.JPEG"
                    alt="Akshat and Stef"
                    width={400}
                    height={400}
                    className="rounded-lg mx-auto shadow-md"

                />

                <Link
                    href="/gifts"
                    className="mt-6 inline-block bg-[#e94d87] hover:bg-[#ff6b9d] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 animate-bounce hover:animate-none"
                >
                    🎁 See Your Birthday Gifts
                </Link>



            </div>

            {/* Background music */}
            <audio ref={audioRef} loop>
                <source src="/lovergirl.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
