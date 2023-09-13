import Link from "next/link";
import React from "react";

const CardMenu = () => {
  return (
    <Link href={"/monthly"}>
      <div
        className="
      card card-compact 
      bg-base-100 shadow-xl
      cursor-pointer
      hover:bg-slate-200
      transition-all duration-500
      border border-slate-200 hover:border-primary
      flex justify-center items-center
      h-36 text-primary dark:text-base-content dark:hover:text-primary
      "
      >
        MENU 1
      </div>
    </Link>
  );
};

export default CardMenu;
