"use client";
import { useEffect, useRef } from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = false,
  isView = false
}) {
  const elementRef = useRef(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  const shouldShow = !isView || isInView

  useEffect(() => {
    const element = elementRef.current
    let annotation = null
    let resizeObserver = null
    let isMounted = true

    if (shouldShow && element) {
      const draw = (animate = true) => {
        if (!isMounted) return;
        if (annotation) {
          annotation.remove();
        }

        annotation = annotate(element, {
          type: action,
          color,
          strokeWidth,
          animationDuration: animate ? animationDuration : 0,
          iterations,
          padding,
          multiline,
        });

        annotation.show();
      };

      document.fonts.ready.then(() => {
        setTimeout(() => {
          if (!isMounted) return;
          draw(true);

          resizeObserver = new ResizeObserver(() => {
            draw(false);
          });
          resizeObserver.observe(element);
        }, 150);
      });
    }

    return () => {
      isMounted = false;
      if (annotation) {
        annotation.remove();
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  return (
    <span className="relative inline-block whitespace-nowrap">
      <span ref={elementRef} className="inline-block">
        {children}
      </span>
    </span>
  );
}
