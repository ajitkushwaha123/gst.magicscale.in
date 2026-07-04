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

  // If isView is false, always show. If isView is true, wait for inView
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

      // Wait for fonts to fully load to prevent the left-shift offset bug
      document.fonts.ready.then(() => {
        // Small delay to let framer-motion layouts settle
        setTimeout(() => {
          if (!isMounted) return;
          draw(true);

          // Re-calculate bounding boxes silently on window resize or reflow
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
