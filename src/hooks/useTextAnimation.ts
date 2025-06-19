"use client";

import { animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

let delimiter = "";

export default function useAnimatedText(text: string) {
  try {
    const animatedCursor = useMotionValue(0);
    const [cursor, setCursor] = useState(0);
    const [prevText, setPrevText] = useState(text);
    const [isSameText, setIsSameText] = useState(true);

    if (prevText !== text) {
      setPrevText(text);
      setIsSameText(typeof text === "string" && text.startsWith(prevText));

      if (!(typeof text === "string" && text.startsWith(prevText))) {
        setCursor(0);
      }
    }

    useEffect(() => {
      if (!isSameText) {
        animatedCursor.jump(0);
      }

      const controls = animate(animatedCursor, text.split(delimiter).length, {
        duration: 3,
        ease: "easeOut",
        onUpdate(latest) {
          setCursor(Math.floor(latest));
        },
      });

      return () => controls.stop();
    }, [animatedCursor, isSameText, text]);

    return text.split(delimiter).slice(0, cursor).join(delimiter);
  } catch (err) {
    console.error("❌ useAnimatedText error:", err);
    toast.error("AI 응답을 표시하는데 실패했습니다");
    return text; // fallback: show full text if animation fails
  }
}
