import { useRootContext } from "@/context/context";
import { useEffect, useRef } from "react";
import useScroll from "./useScroll";

const useActive = (id = "", increment = 100) => {
  const ref = useRef();
  const { setCurrentActive } = useRootContext();
  const { scroll } = useScroll();

  useEffect(() => {
    if (id && ref.current) {
      if (ref.current.offsetTop <= scroll + increment) {
        setCurrentActive(`#${id}`);
      }
    }
  }, [scroll, setCurrentActive, id, increment]);

  return ref;
};

export default useActive;
