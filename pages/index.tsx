import CardMenu from "@/components/CardMenu";
import React from "react";

const index = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <h1 className="text-sm">
          <small>Welcome,</small> sola
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <CardMenu />
        <CardMenu />
        <CardMenu />
        <CardMenu />
      </div>
      {/* <div className="mockup-phone">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1">Hi.</div>
        </div>
      </div> */}
      {/* <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button> */}
    </div>
  );
};

export default index;
