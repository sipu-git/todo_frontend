"use client";
import React from "react";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  thickness?: number;
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

const Divider = ({
  orientation = "horizontal",
  decorative = true,
  thickness = 1,
  color = "#6b6b6c",
  className = "",
  children,
  ...props
}: DividerProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={`flex items-center justify-center relative z-20 ${isHorizontal ? "w-full my-8" : "h-full mx-8 flex-col"} ${className}`}
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      {...props}
    >
      {children ? (
        <>
          <div
            className={`${isHorizontal ? "w-full" : "h-full"}`}
            style={{
              borderTop: isHorizontal ? `${thickness}px solid ${color}` : undefined,
              borderLeft: !isHorizontal ? `${thickness}px solid ${color}` : undefined,
              opacity: 0.6,
            }}
          ></div>
          <span className="px-4 text-sm text-gray-400 font-medium">{children}</span>
          <div
            className={`${isHorizontal ? "w-full" : "h-full"}`}
            style={{
              borderTop: isHorizontal ? `${thickness}px solid ${color}` : undefined,
              borderLeft: !isHorizontal ? `${thickness}px solid ${color}` : undefined,
              opacity: 0.6,
            }}
          ></div>
        </>
      ) : (
        <div
          className={`${isHorizontal ? "w-full" : "h-full"}`}
          style={{
            borderTop: isHorizontal ? `${thickness}px solid ${color}` : undefined,
            borderLeft: !isHorizontal ? `${thickness}px solid ${color}` : undefined,
            opacity: 0.6,
          }}
        ></div>
      )}
    </div>
  );
};

export default Divider;
