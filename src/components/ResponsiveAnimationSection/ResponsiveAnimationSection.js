import React, { useState, useEffect, lazy, Suspense } from "react";

const VerticalAnimationSection = lazy(() =>
  import("./VerticalAnimationSection")
);
const AnimationSection = lazy(() => import("./AnimationSection"));

const ResponsiveAnimationSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Suspense
        fallback={<div>Loading...</div>}
        style={{ position: "relative" }}
      >
        {isMobile ? <VerticalAnimationSection /> : <AnimationSection />}
      </Suspense>
    </div>
  );
};

export default ResponsiveAnimationSection;
