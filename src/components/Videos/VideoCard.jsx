import React from "react";

const VideoCard = ({ title, description, videoUrl, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
      onClick={onClick}
    >
      <video
        src={videoUrl}
        className="w-full h-48 object-cover"
        muted
        loop
        onMouseEnter={(e) => e.target.play()}
        onMouseLeave={(e) => e.target.pause()}
      ></video>
      <div className="p-4">
        <h3 className="text-lg font-bold text-green mb-2">{title}</h3>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
