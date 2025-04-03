import React from 'react';

const VideoBackground = ({ src }) => {
    return (
        <video className="video-brackground" src={src} autoPlay muted loop></video>
    );
};

export default VideoBackground;