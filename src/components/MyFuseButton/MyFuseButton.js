import React, { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";
import styles from "./MyFuseButton.module.css";

const MyFuseButton = forwardRef(
  (
    { title, variant = "filled", onClick, className = "", animate = true },
    ref
  ) => {
    // Define custom colors
    const myFuseYellow = "#FDC460";
    const myFuseBlue = "#4D4DFF";

    // Memoized animation variants
    const variants = useMemo(() => {
      if (variant === "filled") {
        return {
          rest: {
            backgroundColor: myFuseBlue,
            color: "#ffffff",
            transition: { duration: 0.3 },
          },
          hover: animate
            ? {
                backgroundColor: myFuseYellow,
                color: myFuseBlue,
                transition: { duration: 0.3 },
              }
            : {
                filter: "brightness(0.8)",
                transition: { duration: 0.3 },
              },
        };
      } else {
        return {
          rest: {
            backgroundColor: "transparent",
            color: myFuseBlue,
            borderColor: myFuseBlue,
            transition: { duration: 0.6 },
          },
          hover: animate
            ? {
                backgroundColor: ["transparent", myFuseBlue, myFuseYellow],
                color: [myFuseBlue, "#ffffff", myFuseBlue],
                borderColor: myFuseBlue,
                transition: { duration: 0.6 },
              }
            : {
                filter: "brightness(0.8)",
                transition: { duration: 0.3 },
              },
        };
      }
    }, [variant, animate]);

    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={`${styles.button} ${
          variant === "filled" ? styles.filled : styles.ghost
        } ${className}`}
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={variants}
        style={variant === "filled" ? { border: "none" } : {}}
      >
        {title}
      </motion.button>
    );
  }
);

export default MyFuseButton;
