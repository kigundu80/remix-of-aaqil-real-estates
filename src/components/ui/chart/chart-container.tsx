
import React from "react";
import { ResponsiveContainer } from "recharts";

interface ChartContainerProps {
  /**
   * The aspect ratio of the chart. If not provided, the chart will fill the parent element.
   */
  aspect?: number;
  /**
   * The width of the chart in pixels or percentage.
   */
  width?: number | string;
  /**
   * The height of the chart in pixels.
   */
  height?: number | string;
  /**
   * The content of the chart.
   */
  children: React.ReactNode;
}

export function ChartContainer({
  aspect,
  width = "100%",
  height = 350,
  children,
}: ChartContainerProps) {
  return (
    <ResponsiveContainer width={width} height={height} aspect={aspect}>
      {/* We ensure children is a valid React element here */}
      {children}
    </ResponsiveContainer>
  );
}
