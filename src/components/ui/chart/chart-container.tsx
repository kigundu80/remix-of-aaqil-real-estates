
import React from "react";
import { ResponsiveContainer } from "recharts";
import { ChartContextProvider } from "./chart-context";
import { getTheme } from "./chart-style";
import type { ChartTheme } from "./types";

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
   * The theme of the chart. If not provided, the theme will be determined by the current theme.
   */
  theme?: ChartTheme;
  /**
   * The content of the chart.
   */
  children: React.ReactNode;
}

export function ChartContainer({
  aspect,
  width = "100%",
  height = 350,
  theme,
  children,
}: ChartContainerProps) {
  return (
    <ChartContextProvider theme={theme ?? getTheme()}>
      <ResponsiveContainer width={width} height={height} aspect={aspect}>
        {/* Removing React.Children.only to fix the type error */}
        {children}
      </ResponsiveContainer>
    </ChartContextProvider>
  );
}
