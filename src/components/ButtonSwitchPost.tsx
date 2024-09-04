import React, { useState } from "react";

import ImageLayout from "../../public/img/button/LayoutImage";
import LayoutVideo from "../../public/img/button/LayoutVIdeo";
import LayoutBlog from "../../public/img/button/LayoutBlog";

import { BlogComponent, ImageComponent, VideoComponent } from "./Postingan";

type TabType = "image" | "video" | "blog";

const ButtonSwitchPost: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("image");

  const iconMap = {
    image: ImageLayout,
    video: LayoutVideo,
    blog: LayoutBlog,
  };

  const handleClick = () => {
    setActiveTab((prevTab) => (prevTab === "image" ? "video" : "image"));
  };

  return (
    <div className="flex flex-col absolute cursor-pointer m-auto items-center">
      <div
        className={`cursor-pointer transition-transform duration-200 ease-in-out transform ${
          activeTab === "image" ? "scale-110" : "scale-100"
        }`}
        onClick={handleClick} //  panggil handleClick
        dangerouslySetInnerHTML={{ __html: iconMap[activeTab] }} //  Dinamis
      />
      {activeTab === "image" && <ImageComponent />}
      {activeTab === "video" && <VideoComponent />}
      {activeTab === "video" && <BlogComponent />}
    </div>
  );
};

export default ButtonSwitchPost;
