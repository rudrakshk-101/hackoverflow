import React from 'react';

const Video = () => {
 return (
    <div className="h-screen flex items-center bg-black justify-center">
        <iframe src="http://127.0.0.1:5000/video_feed/green.mp4" className="w-[190vw] scale-75 h-[90vh] overflow-hidden"></iframe>
    </div>
 );
};

export default Video;