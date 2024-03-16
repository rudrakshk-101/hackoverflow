"use client";
import { useRouter } from 'next/navigation'; // Corrected import path
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import React, { useEffect, useState } from 'react';

const Video = () => {
 const { push } = useRouter();
 // Define the loading state and its setter function
 const [loading, setLoading] = useState(false);

 useEffect(() => {
    setTimeout(() => {
      setLoading(true); 
    }, 3500);

    setTimeout(() => {
      window.location.href = "http://127.0.0.1:5000/transmitMLLowSystem";
    }, 12000);
 }, []);

 return (
    <div>
      <iframe src="http://127.0.0.1:5000/video_feed/green.mp4" className="w-[91.2vw] flex scale-75 h-[92vh] overflow-hidden"></iframe>
      {loading && <Loader loadingStates={loadingStates} loading={loading} />}
    </div>
 );
};

const loadingStates = [
 { text: "Analyzing Vehicles" },
 { text: "Counting Vehicles" },
 { text: "Getting Current Map" },
 { text: "Making Changes" },
 { text: "Finishing it up" }
];

function MultiStepLoaderDemo() {
 const [loading, setLoading] = useState(false);
 return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={loading} />
    </div>
 );
}

export default Video;
