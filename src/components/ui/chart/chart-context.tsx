
import * as React from "react";

// Create a simple default context value
export type ChartContextProps = {
  config?: Record<string, any>;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

export { ChartContext };
