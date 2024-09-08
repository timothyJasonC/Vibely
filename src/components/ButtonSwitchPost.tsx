import { TabType } from "@/types";
import Image from "next/image";
import React from "react";

interface Props {
  category: TabType;
  setCategory: React.Dispatch<React.SetStateAction<TabType>>;
}

const ButtonSwitchPost: React.FC<Props> = ({ setCategory, category }) => {
  let categoryPost = category;

  function handleActive(e: React.MouseEvent<HTMLElement>) {
    let clickCategory = e.currentTarget;

    const title = clickCategory.getAttribute("title");

    if (title && (title === "image" || title === "video" || title === "blog")) {
      setCategory(title as TabType);
    }
  }

  return (
    <>
      <div className="flex flex-row bg-[#E0F4FF] m-auto relative top-[350px] w-2/3 mx-auto rounded-full gap-3">
        <img
          src="/img/button/LayoutImage.svg"
          alt="Image Post"
          className={`cursor-pointer py-2 ${
            categoryPost === "image" ? "hover-category-active" : "px-7"
          }`}
          title="image"
          onClick={handleActive}
        />
        <Image
          src="/img/button/LayoutVideo.png"
          alt="Video Post"
          width={100} height={60}
          className={`cursor-pointer py-2 ${
            categoryPost === "video" ? "hover-category-active w-32" : "px-7"
          }`}
          title="video"
          onClick={handleActive}
        />
        <img
          src="/img/button/LayoutBlog.svg"
          alt="Blog Post"
          className={`cursor-pointer py-2 ${
            categoryPost === "blog" ? "hover-category-active" : "px-7"
          }`}
          title="blog"
          onClick={handleActive}
        />
      </div>
      <div className=""></div>
    </>
  );
};

export default ButtonSwitchPost;
