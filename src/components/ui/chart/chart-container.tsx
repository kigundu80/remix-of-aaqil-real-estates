
import React from "react";
import { ResponsiveContainer } from "recharts";

interface ChartContainerProps {
  /**
   * The aspect ratio of the chart. If provided, the chart will maintain this aspect ratio regardless of the container size.
   */
  aspect?: number;
  /**
   * The width of the chart. This can be a number (pixels) or a string percentage.
   */
  width?: number | string;
  /**
   * The height of the chart. This can be a number (pixels) or a string percentage.
   */
  height?: number | string;
  /**
   * The content of the chart.
   */
  children: React.ReactElement;
}

export function ChartContainer({
  aspect,
  width = "100%",
  height = 350,
  children,
}: ChartContainerProps) {
  return (
    <ResponsiveContainer width={width} height={height} aspect={aspect}>
      {children}
    </ResponsiveContainer>
  );
}

export default ChartContainer;
