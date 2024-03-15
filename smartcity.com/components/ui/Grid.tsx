
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
    <BentoGrid className="max-w-4xl h-auto w-[100vw] scale-90 mx-auto md:auto-rows-[20rem] ">
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
       y: -40,
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
    <Link href={'/smart-dustbin'}>
    <motion.div
    className="flex flex-col w-full h-full min-h-[8rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] space-y-2 items-center justify-center relative flex-1 "
   >
    <motion.div
       className="w-full sm:w-24 h-[13vh] bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center"
    >
       <Image src={"/dust.png"} alt="recycle" width={40} height={40} className="mt-5" />
       {/* Simulate the opening of the dustbin */}
       <motion.div variants={dustbinVariants}
         initial="closed"
         whileHover="open" className="w-full sm:w-[6rem] h-8 top-[2vh] absolute bg-gray-500 rounded-[5px] shadow-inner transform rotate-45 flex justify-center "></motion.div>
    </motion.div>
   </motion.div>
   </Link>
   
  );
 };
 

 import  {  useEffect } from 'react';
import {  useAnimation } from 'framer-motion';
import Link from "next/link";

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
  const Variants = {
    open: {
      x: -10,
      y:-5,
      z:-90,
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      x: 0,
      y:0,
      z:0,
      transition: {
        duration: 0.5,
      },
    },
 };
  return (
    <motion.div className="flex justify-center items-center h-screen">
      <motion.div className="animate-rotateX" variants={Variants}
         initial="closed"
         whileHover="open">
        <Image
          src="/solarpanel.png" 
          alt="Animated Image"
          width={100} 
          height={100} 
          className="transform transition-transform duration-500 ease-in-out"
        />
        
      </motion.div>
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
      <Image src="/smf.png" className="rounded-3xl px-2" width={650} height={200} alt="smart agriculture" />
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
    <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2">
 <div className="h-[8vw] w-[8vw] rounded-[50%] dark:bg-[red] mt-[4vh] ml-[5vw] text-center relative">
    <h1 className="dark:font-extrabold text-white text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:text-2xl lg:text-3xl xl:text-4xl">SOS</h1>
 </div>
</div>

   
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
     title: "Smart Solar Panel System",
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
 