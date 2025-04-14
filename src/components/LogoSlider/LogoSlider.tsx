'use client';

import React from 'react';
import { useKeenSlider } from 'keen-slider/react';

const logos = [
  '/logos/civicinnovation-dark.webp',
  '/logos/mozart-dark.webp',
  '/logos/greenomy-dark.webp',
  '/logos/subminimal-dark.webp',
  '/logos/yskinz-dark.webp',
  '/logos/healthbird-dark.webp',
  '/logos/absentify-dark.webp',
  '/logos/strom-dark.webp',
  '/logos/niini-dark.webp',
  '/logos/onboard-dark.webp',
  '/logos/tryp-dark.webp',
];
export default function LogoSlider() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    breakpoints: {
      "(max-width: 640px)": {
        slides: { perView: 3, spacing: 10 },
      },
      "(min-width: 641px) and (max-width: 1024px)": {
        slides: { perView: 4, spacing: 15 },
      },
    },
    slides: { perView: 6, spacing: 15 },
    created(slider) {
      setInterval(() => {
        slider.next();
      }, 2000);
    },
  });
  

  return (
    <div className="py-8">
      <div ref={sliderRef} className="keen-slider">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="keen-slider__slide flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-md"
          >
            <img src={logo} alt={`logo-${index}`} className="lg:h-14 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );

}
