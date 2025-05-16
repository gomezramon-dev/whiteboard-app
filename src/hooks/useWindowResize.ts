import { useState, useEffect } from "react";
import { resizeSubject } from "@utils/observer/resizeSubject";
import { ResizeObserver } from "@utils/observer/resizeObserver";

const useWindowResize = (): boolean => {
  const [isResizing, setIsResizing] = useState(false);
  const resizeObserver = new ResizeObserver(setIsResizing);

  useEffect(() => {
    resizeSubject.subscribe(resizeObserver);
    return () => {
      resizeSubject.unsubscribe(resizeObserver);
    };
  }, []);

  return isResizing;
};

export default useWindowResize;
