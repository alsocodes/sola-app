import React, { FC, useEffect, useState } from "react";

interface MyProgressInterface {
  show: boolean;
}
const MyProgress: FC<MyProgressInterface> = ({ show }) => {
  const [isShowing, setIsShowing] = useState(show);
  const [progressValue, setProgressValue] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (show) {
      setIsShowing(true);
      setProgressValue(undefined);
    } else {
      setProgressValue("80");
      const sto = setTimeout(() => {
        setIsShowing(false);
      }, 300);
      return () => clearTimeout(sto);
    }
  }, [show]);

  return (
    <progress
      value={progressValue}
      className={`
      ${!isShowing && "hidden"}
      absolute top-0 -right-[1px] -left-[1px]
      progress progress-info w-[calc(100%+8px)] h-[5px]`}
    />
  );
};

export default MyProgress;
