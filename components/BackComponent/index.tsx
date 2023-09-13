import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface BackComponentInteface {
  to?: string;
  from?: string;
}

const BackComponent: FC<BackComponentInteface> = ({ from, to }) => {
  const router = useRouter();
  const handleClick = () => {
    // if (from && to) {
    //   router.push(to, { query: { from } });
    //   return;
    // }
    router.back();
  };
  return (
    <button
      className="btn btn-primary btn-ghost btn-circle btn-sm"
      onClick={() => handleClick()}
    >
      <FontAwesomeIcon icon={faArrowLeftLong} />
    </button>
  );
};

export default BackComponent;
