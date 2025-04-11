
import { ReactNode } from "react";

// Format: { THEME_NAME: CSS_SELECTOR }
export const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

export type ChartContextProps = {
  config: ChartConfig;
};

export interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ReactNode;
}

export interface ChartStyleProps {
  id: string;
  config: ChartConfig;
}

export interface ChartTooltipContentProps 
  extends React.ComponentProps<"div"> {
  active?: boolean;
  payload?: any[];
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
  label?: string | ReactNode;
  labelFormatter?: (label: ReactNode, payload: any[]) => ReactNode;
  labelClassName?: string;
  formatter?: (value: any, name: string, item: any, index: number, payload: any) => ReactNode;
  color?: string;
}

export interface ChartLegendContentProps extends React.ComponentProps<"div"> {
  payload?: any[];
  verticalAlign?: "top" | "bottom";
  hideIcon?: boolean;
  nameKey?: string;
}
