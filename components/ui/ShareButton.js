"use client";

import React from "react";

const ShareIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="18"
      height="18"
      fill="currentColor"
      viewBox="0 0 30 30">
      <path d="M 23 3 C 20.791 3 19 4.791 19 7 C 19 7.2869826 19.034351 7.5660754 19.091797 7.8359375 L 10 12.380859 C 9.2667379 11.541629 8.2018825 11 7 11 C 4.791 11 3 12.791 3 15 C 3 17.209 4.791 19 7 19 C 8.2018825 19 9.2667379 18.458371 10 17.619141 L 19.091797 22.164062 C 19.034351 22.433925 19 22.713017 19 23 C 19 25.209 20.791 27 23 27 C 25.209 27 27 25.209 27 23 C 27 20.791 25.209 19 23 19 C 21.798117 19 20.733262 19.541629 20 20.380859 L 10.908203 15.835938 C 10.965649 15.566075 11 15.286983 11 15 C 11 14.713017 10.965649 14.433925 10.908203 14.164062 L 20 9.6191406 C 20.733262 10.458371 21.798117 11 23 11 C 25.209 11 27 9.209 27 7 C 27 4.791 25.209 3 23 3 z"></path>
    </svg>
  );
};

const ShareArticleButton = ({ post }) => {
  const shareArticle = async () => {
    const data = {
      title: post.title,
      url: post?.slug?.current,
      text: post?.excerpt || ""
    };
    await navigator.share(data);
  };

  return (
    <button
      onClick={shareArticle}
      className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-fit items-center justify-center space-x-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-900 dark:text-gray-50">
      <ShareIcon />
      <span>Share</span>
    </button>
  );
};

export default ShareArticleButton;
