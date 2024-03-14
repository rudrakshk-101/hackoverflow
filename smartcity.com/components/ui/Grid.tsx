"use client";
import { cn } from "@/utils/cn";
import { useState } from "react";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconTrash,
  IconTrafficLights,
  
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Grid() {
  return (
    <BentoGrid className="max-w-4xl h-[100vh] w-[100vw] scale-90 mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);


const SkeletonOne = () => {
  const dustbinVariants = {
     open: {
       x: -50,
       transition: {
         duration: 0.5,
       },
     },
     closed: {
       x: 0,
       transition: {
         duration: 0.5,
       },
     },
  };
 
  return (
     <motion.div
       className="flex flex-1 w-full h-full min-h-[8rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 items-center justify-center"
     >
       <motion.div
         className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center"
       >
         {/* Simulate the opening of the dustbin */}
         <motion.div variants={dustbinVariants}
         initial="closed"
         whileHover="open" className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg shadow-inner transform rotate-45"></motion.div>
       </motion.div>
     </motion.div>
  );
 };
 

 import  {  useEffect } from 'react';
import {  useAnimation } from 'framer-motion';

const SkeletonTwo = () => {
 // Define the animation variants for each light
 const lightVariants = {
    dim: {
      backgroundColor: "#333333", // Dim color
      transition: { duration: 0.5 },
    },
    red: {
      backgroundColor: "#FF0000",
      transition: { duration: 0.5 },
    },
    yellow: {
      backgroundColor: "#FFFF00",
      transition: { duration: 0.5 },
    },
    green: {
      backgroundColor: "#00FF00",
      transition: { duration: 0.5 },
    },
 };

 // Define the sequence of light changes
 const [light, setLight] = useState(["red", "yellow", "green"]);

 // Use useEffect to change the light sequence automatically
 useEffect(() => {
    const interval = setInterval(() => {
      // Change the light sequence
      setLight(prevSequence => [...prevSequence.slice(1), prevSequence[0]]);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
 }, []);

 // Use useAnimation to control the animation state of each light
 const controls = useAnimation();

 useEffect(() => {
    // Animate each light to dim state first
    controls.start("dim");

    // Then animate to the current light state
    setTimeout(() => {
      controls.start(light[0]);
    }, 500); // Adjust timing as needed
 }, [light, controls]);

 return (
    <div className="traffic-light-container">
      <motion.div
        className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 items-center justify-center"
      >
        {light.map((light, index) => (
          <motion.div
            key={index}
            variants={lightVariants}
            initial="dim"
            animate={controls}
            className="w-12 h-12 rounded-full"
          ></motion.div>
        ))}
      </motion.div>
    </div>
 );
};

 

const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full justify-center h-full min-h-[7rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <Image src="/behance.png" className="scale-150"  width={300} height={1000} alt="smart agriculture" />
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <Image
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-500">
          There are a lot of cool framerworks out there like React, Angular,
          Vue, Svelte that can make your life ....
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500">Use PHP.</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
};
const items = [
  {
     title: "Smart Dustbin System",
     description: (
       <span className="text-sm">
         Automated waste collection and management for a cleaner city.
       </span>
     ),
     header: <SkeletonOne />,
     className: "md:col-span-1",
    //  icon: <IconTrash className="h-4 w-4 text-neutral-500" />, // Assuming IconTrash is a suitable icon for a dustbin
  },
  {
     title: "Smart Traffic System",
     description: (
       <span className="text-sm">
         Intelligent traffic management to reduce congestion and improve flow.
       </span>
     ),
     header: <SkeletonTwo />,
     className: "md:col-span-1",
    //  icon: <IconTrafficLight className="h-4 w-4 text-neutral-500" />, // Assuming IconTrafficLight is a suitable icon for traffic
  },
  {
     title: "Smart Street Light System",
     description: (
       <span className="text-sm">
         Smart street lighting that adjusts based on demand and time of day.
       </span>
     ),
     header: <SkeletonThree />,
     className: "md:col-span-1",
    //  icon: <IconStreetLight className="h-4 w-4 text-neutral-500" />, // Assuming IconStreetLight is a suitable icon for street lights
  },
  {
     title: "Smart Agriculture Environment",
     description: (
       <span className="text-sm">
         Real-time Monitoring And Reporting Of Soil Statistics, With Power Of ML Model.
       </span>
     ),
     header: <SkeletonFour />,
     className: "md:col-span-2",
    //  icon: <IconAirQuality className="h-4 w-4 text-neutral-500" />, // Assuming IconAirQuality is a suitable icon for air quality
  },
  {
     title: "Smart Emergency Services",
     description: (
       <span className="text-sm">
         Optimized emergency services for quicker response times and better accessibility.
       </span>
     ),
     header: <SkeletonFive />,
     className: "md:col-span-1",
    //  icon: <IconEmergency className="h-4 w-4 text-neutral-500" />, // Assuming IconEmergency is a suitable icon for emergency services
  },
 ];
 