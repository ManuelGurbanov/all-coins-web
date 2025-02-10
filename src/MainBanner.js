import React from "react";

export default function MainBanner() {
    return (
        <div className="w-screen flex flex-col items-center justify-center mt-12">

            <img className="max-[450px]:hidden w-screen object-cover" src="desktopBanner.webp" alt="bg" data-aos="fade-up"/>

            <img className="hidden max-[450px]:block h-screen w-full object-cover" src="phoneBanner.webp" alt="bg" data-aos="fade-up" />
        </div>
    );
}
