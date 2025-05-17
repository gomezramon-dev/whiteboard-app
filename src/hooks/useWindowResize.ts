import { useState, useEffect } from "react";
import { resizeSubject } from "@utils/observer/ResizeSubject";
import { ResizeObserver } from "@utils/observer/ResizeObserver";

const useWindowResize = (): boolean => {
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(setIsResizing);
    resizeSubject.subscribe(resizeObserver);
    return () => {
      resizeSubject.unsubscribe(resizeObserver);
    };
  }, []);

  return isResizing;
};

export default useWindowResize;
