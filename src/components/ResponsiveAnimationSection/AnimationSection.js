"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import animationData from "../../assets/MyFuse Animation Sparky.json";
import styles from "./AnimationSection.module.css";
import { buttonData } from "../../constants/buttons";
import { sections } from "../../constants/animationText";
import MyFuseButton from "../MyFuseButton/MyFuseButton";

gsap.registerPlugin(ScrollTrigger);

export default function AnimationSection() {
  const containerRef = useRef(null);
  const textContentRef = useRef(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1) Let container grow naturally (left text is tall).
    // 2) We'll create a ScrollTrigger that spans from top to bottom of container.
    //    This drives the Lottie frames. No pin needed - the right column is sticky in CSS.

    // The "end" is the bottom of the container. As we scroll from top -> bottom,
    // we progress the Lottie frames from 0 to ~95%.
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalFrames = 1380;
        const effectiveFrames = totalFrames * 1.1;
        const currentFrame = effectiveFrames * progress;
        lottieRef.current?.goToAndStop(currentFrame, true);
      },
      onLeave: () => {
        const totalFrames = 1380;
        const effectiveFrames = totalFrames * 1.1;
        lottieRef.current?.goToAndStop(effectiveFrames - 10, true);
      },
      onLeaveBack: () => {
        lottieRef.current?.goToAndStop(0, true);
      },
    });
  }, []);

  return (
    <div className={styles.root} ref={containerRef}>
      <div className={styles.gridWrapper}>
        {/* Left Column: normal scrolling content */}
        <div className={styles.leftColumn}>
          <div ref={textContentRef} className={styles.textContent}>
            {sections.map((item, index) => (
              <div
                key={index}
                className={`${styles.sectionItem} ${
                  index === 3 ? styles.sectionItemLast : ""
                }`}
              >
                <div className={styles.sectionTextWrapper}>
                  <div className={styles.subtitle}>{item.subtitle}</div>
                  <h2 className={styles.title}>{item.title}</h2>
                  <p className={styles.description}>{item.text}</p>
                </div>
                <MyFuseButton
                  className={styles.sectionButton}
                  onClick={buttonData.animationSection[index].onClick}
                  variant={buttonData.animationSection[index].variant}
                  title={item.buttonText}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: sticky in CSS, Lottie frames driven by GSAP. */}
        <div className={styles.rightColumn}>
          <div className={styles.lottieWrapper}>
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoPlay={false}
              className={styles.lottieAnimation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
