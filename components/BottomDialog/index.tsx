import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";

interface BottomDialogType {
  children?: JSX.Element;
  isShown: boolean;
  hide: () => void;
  title?: string;
}

const BottomDialog: FC<BottomDialogType> = ({
  children,
  isShown,
  hide,
  title,
}) => {
  return (
    <>
      <div
        onClick={() => hide()}
        className={`
        bg-black bg-opacity-25
        absolute left-0 top-0 right-0 bottom-0 z-[999]
        ${
          isShown
            ? "visible opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        `}
        style={{
          transitionDuration: "0.2s",
          transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          transitionProperty: "transform, opacity, visibility",
        }}
      />
      <div
        className={`bg-base-100 w-full px-4 py-4 md:px-6 md:py-6
          rounded-t-2xl z-[1000]
          absolute left-0 right-0
          ${!isShown ? "-bottom-[100vh]" : "bottom-0"}
          transition-all duration-300 ease-in-out
          pb-[80px] md:pb-6
        `}
      >
        <div className="font-semibold flex items-center justify-between mb-2">
          <h2>{title || "Dialog Title"}</h2>
          <button
            onClick={() => hide()}
            className="btn btn-circle btn-ghost btn-sm"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default BottomDialog;
