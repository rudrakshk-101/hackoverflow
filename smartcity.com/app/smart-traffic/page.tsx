"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import Link from "next/link";

export default function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-[80vw]">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <Link href={'/smart-traffic/video-transmit-mlModel-low'}>
    <div>
      <p className="font-bold text-4xl text-white">CCTV Feed</p>
      <p className="font-normal text-base text-white"></p>
    </div>
    </Link>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">CCTV Feed</p>
      <p className="font-normal text-base text-white"></p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <Link href={'/smart-traffic/video-transmit-mlModel-high'}>
    <div>
      <p className="font-bold text-4xl text-white">CCTV Feed</p>
      <p className="font-normal text-base text-white"></p>
    </div>
    </Link>
  );
};

const SkeletonFour = () => {
  return (
    <Link href={'/smart-traffic/video-transmit-mlModel-high'}>
    <div>
      <p className="font-bold text-4xl text-white">CCTV Feed</p>
      <p className="font-normal text-base text-white"></p>
    </div>
    </Link>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1530685932526-48ec92998eaa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1569261655993-3ae347322edd?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1661964078564-c910e473f98e?q=80&w=2579&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1663133742817-5d9eb1caabeb?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
