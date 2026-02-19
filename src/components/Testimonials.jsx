"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Mohamed Hassan",
    reviewCount: "4 reviews",
    rating: 5,
    timeAgo: "6 days ago",
    avatar: "M",
    avatarBg: "#e8b4b8",
    avatarColor: "#5a3a3a",
    text: "Meson Financial is a great app and super easy to use. It keeps all your receipts in one place, which makes tracking expenses and dealing with the IRS stress-free. I highly recommend it!",
  },
  {
    name: "Selam",
    reviewCount: "1 review",
    rating: 5,
    timeAgo: "3 days ago",
    avatar: "S",
    avatarBg: "#4a90a4",
    avatarColor: "#fff",
    text: "Mesob Financial has completely changed how we manage our grocery store finances. Recording daily sales, supplier payments, and expenses used to take hours, but now everything is simple and organized in one place.",
  },
  {
    name: "Dawit Bekele",
    reviewCount: "7 reviews",
    rating: 5,
    timeAgo: "1 week ago",
    avatar: "D",
    avatarBg: "#7b9e6b",
    avatarColor: "#fff",
    text: "Running a restaurant means hundreds of expenses daily. Mesob keeps it all under control. The receipt scanner saves me two hours every week. Worth every penny.",
  },
  {
    name: "Fatuma Ali",
    reviewCount: "2 reviews",
    rating: 5,
    timeAgo: "2 weeks ago",
    avatar: "F",
    avatarBg: "#c4916b",
    avatarColor: "#fff",
    text: "I was drowning in paperwork before Mesob. Now my boutique's financials are always up to date. Tax season is no longer a nightmare. This app is a lifesaver for any small business owner.",
  },
  {
    name: "Yonas Girma",
    reviewCount: "3 reviews",
    rating: 5,
    timeAgo: "10 days ago",
    avatar: "Y",
    avatarBg: "#8b7db5",
    avatarColor: "#fff",
    text: "Simple, clean, and incredibly efficient. I manage three stores and Mesob Financial lets me keep everything separate and clear. The reporting feature is especially useful.",
  },
  {
    name: "Hana Mekonnen",
    reviewCount: "5 reviews",
    rating: 4,
    timeAgo: "5 days ago",
    avatar: "H",
    avatarBg: "#b5847d",
    avatarColor: "#fff",
    text: "Finally an app that understands the needs of small businesses. The interface is intuitive and the support team is incredibly responsive. Mesob has made bookkeeping something I no longer dread.",
  },
];


const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} width="15" height="15" viewBox="0 0 20 20"
        fill={s <= rating ? "#fbbf24" : "#374151"}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);


const TestimonialCard = ({ testimonial }) => (
  <div className="flex flex-col gap-4 bg-[#262b3d]  p-6 h-full" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)" }}>
    {/* Header */}
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
        style={{ backgroundColor: testimonial.avatarBg, color: testimonial.avatarColor }}
      >
        {testimonial.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm leading-snug">{testimonial.name}</p>
        <p className="text-gray-500 text-xs">{testimonial.reviewCount}</p>
      </div>
      
    </div>

    {/* Stars + time + badge */}
    <div className="flex items-center gap-2 flex-wrap">
      <StarRating rating={testimonial.rating} />
      <span className="text-gray-400 text-xs">{testimonial.timeAgo}</span>
      
    </div>

    {/* Text */}
    <p className="text-gray-300 text-sm leading-relaxed">
      {testimonial.text}
    </p>
  </div>
);


const TestimonialRow = ({ items }) => {
  const [page, setPage]       = useState(0);
  const [perPage, setPerPage] = useState(2);
  const touchX                = useRef(null);

  useEffect(() => {
    const calc = () => setPerPage(window.innerWidth < 640 ? 1 : 2);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const totalPages = Math.ceil(items.length / perPage);
  const go = useCallback((p) => {
    setPage(Math.max(0, Math.min(p, totalPages - 1)));
  }, [totalPages]);

  const visible = items.slice(page * perPage, page * perPage + perPage);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return;
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) go(page + (diff > 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 2-column grid, equal width */}
      <div
        className="grid gap-5"
        style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {visible.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </div>

      {/* Nav controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mb-3">
          <button
            onClick={() => go(page - 1)}
            disabled={page === 0}
            className="w-9 h-9 rounded-full bg-[#2a2f45] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#363c58] disabled:opacity-30 disabled:cursor-default transition-all duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => go(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === page ? "w-6 h-2 bg-blue-400" : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(page + 1)}
            disabled={page >= totalPages - 1}
            className="w-9 h-9 rounded-full bg-[#2a2f45] flex items-center  justify-center text-gray-300 hover:text-white hover:bg-[#363c58] disabled:opacity-30 disabled:cursor-default transition-all duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};


const Testimonials = () => (
  <section className="py-16 sm:py-24" style={{ backgroundColor: "#1d212c" }}>
    <div className="max-w-5xl mx-auto px-6 sm:px-10">

      {/* Heading */}
      <div className="text-center mb-12">
  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug pt-3 pb-3">
          Trusted by hundreds of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            small business owners
          </span>
        </h2>
      
      </div>


      <TestimonialRow items={testimonials} />

    </div>
  </section>
);

export default Testimonials;