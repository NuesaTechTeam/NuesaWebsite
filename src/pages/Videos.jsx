import React from "react";
import { VideosSection } from "../components/Videos";
import useSEO from "../hooks/useSEO";

const Videos = () => {
  useSEO({
    title: "Videos & Media",
    description: "Watch video highlights, academic tutorials, executive sessions, and event coverages from NUESA ABUAD."
  });

  return <VideosSection />;
};

export default Videos;
