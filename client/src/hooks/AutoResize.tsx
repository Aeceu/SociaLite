import { useEffect } from "react";

const AutoResize = (
  textref: HTMLTextAreaElement | HTMLInputElement | null,
  value: string | undefined
) => {
  useEffect(() => {
    if (textref) {
      textref.style.height = "100%";
      const scrollHeight = textref.scrollHeight;
      textref.style.height = scrollHeight + "px";
    }
  }, [textref, value]);
};

export default AutoResize;
