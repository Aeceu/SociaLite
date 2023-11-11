import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, Dispatch, SetStateAction } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  setToggle: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
}

export default function SlideOut({ toggle, children, className }: Props) {
  const ref = useRef(null);
  const mainControls = useAnimation();
  useEffect(() => {
    if (toggle) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [mainControls, toggle]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: { height: "0", borderWidth: "0px" },
        visible: { height: "100%", borderWidth: "1px" },
      }}
      initial="hidden"
      animate={mainControls}
    >
      {children}
    </motion.div>
  );
}
