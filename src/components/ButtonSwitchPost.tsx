import React, { useState } from "react";

import ImageLayout from "../../public/img/button/LayoutImage";

import { ImageComponent } from "./Postingan";

type TabType = "image" | "video" | "blog";

const ButtonSwitchPost: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("image");

  const tabStyle = (tab: TabType) => {
    return `cursor=pointer transition-transform duration-200 ease-in-out transform ${
      activeTab === tab ? "scale-110" : "scale-100"
    }`;
  };

  const handleClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-row gap-2 absolute bottom-[480px] items-center">
      <div
        className={tabStyle("image")}
        onClick={() => handleClick("image")}
        dangerouslySetInnerHTML={{ __html: ImageLayout }}
      />

      {activeTab === "image" && <ImageComponent />}
    </div>
  );
};

export default ButtonSwitchPost;
