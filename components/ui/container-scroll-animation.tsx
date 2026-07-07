"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utilts";

type ContainerScrollProps = {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function ContainerScroll({
  titleComponent,
  children,
  className,
}: ContainerScrollProps) {
  return (
    <>
      <MobileHeroLayout className={className} titleComponent={titleComponent}>
        {children}
      </MobileHeroLayout>
      <DesktopScrollLayout className={className} titleComponent={titleComponent}>
        {children}
      </DesktopScrollLayout>
    </>
  );
}

function MobileHeroLayout({
  titleComponent,
  children,
  className,
}: ContainerScrollProps) {
  return (
    <div className={cn("md:hidden", className)}>
      <div className="mx-auto max-w-4xl px-4 pb-6 text-center sm:px-5">
        {titleComponent}
      </div>
      <div
        className={cn(
          "mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-hairline bg-surface-card p-1.5 shadow-[0_16px_48px_-20px_rgba(0,0,0,0.25)] sm:p-2",
          "dark:shadow-[0_16px_48px_-20px_rgba(0,0,0,0.5)]",
        )}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-surface-soft sm:aspect-video">
          {children}
        </div>
      </div>
      <div className="h-8 sm:h-10" aria-hidden />
    </div>
  );
}

function DesktopScrollLayout({
  titleComponent,
  children,
  className,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1]);
  const translate = useTransform(scrollYProgress, [0, 0.6], [0, -48]);

  return (
    <div
      ref={containerRef}
      className={cn("relative hidden h-288 md:block", className)}
    >
      <div
        className="sticky top-24 w-full"
        style={{ perspective: "1200px" }}
      >
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
}

function ScrollHeader({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="relative z-20 mx-auto max-w-4xl px-5 pb-10 text-center sm:px-6 sm:pb-12"
    >
      {titleComponent}
    </motion.div>
  );
}

function ScrollCard({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformOrigin: "bottom center",
      }}
      className={cn(
        "relative z-10 mx-auto h-136 w-full max-w-5xl border border-hairline bg-surface-card p-3",
        "rounded-2xl shadow-[0_24px_64px_-24px_rgba(0,0,0,0.28)] dark:shadow-[0_24px_64px_-24px_rgba(0,0,0,0.55)]",
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-surface-soft">
        {children}
      </div>
    </motion.div>
  );
}
