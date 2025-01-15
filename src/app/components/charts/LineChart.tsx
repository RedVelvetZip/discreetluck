"use client";

import { ReactElement } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

interface DataPoint {
  [key: string]: number | string | Date;
}

interface LineChartProps<T extends DataPoint> {
  data: T[];
  xAxis: keyof T;
  yAxis: keyof T;
  title?: string;
  height?: number;
  color?: string;
  xAxisFormatter?: (value: T[keyof T]) => string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string | [string, string];
  tooltipLabelFormatter?: (label: T[keyof T]) => string;
  paperStyle?: React.CSSProperties;
  typographyStyle?: React.CSSProperties;
  chartMargin?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
}

const LineChart = <T extends DataPoint>({
  data,
  xAxis,
  yAxis,
  title = "Line Chart",
  height = 400,
  color = "#1976d2",
  xAxisFormatter = (value: T[keyof T]): string => String(value),
  yAxisFormatter = (value: number): string => value.toLocaleString(),
  tooltipFormatter = (value: number): string => value.toLocaleString(),
  tooltipLabelFormatter = (label: T[keyof T]): string => String(label),
  paperStyle = {},
  typographyStyle = {},
  chartMargin = { top: 5, right: 30, left: 20, bottom: 5 },
}: LineChartProps<T>): ReactElement => {
  if (!data || data.length === 0) {
    return (
      <Paper
        elevation={3}
        style={{
          padding: "1rem",
          maxWidth: "1000px",
          margin: "auto",
          ...paperStyle,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          style={typographyStyle}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          No data available to display.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      style={{
        padding: "1rem",
        maxWidth: "1000px",
        margin: "auto",
        ...paperStyle,
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        style={typographyStyle}
      >
        {title}
      </Typography>
      <Box sx={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={chartMargin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={String(xAxis)}
              tickFormatter={xAxisFormatter}
              padding={{ left: 30, right: 30 }}
            />
            <YAxis tickFormatter={yAxisFormatter} domain={["auto", "auto"]} />
            <Tooltip
              formatter={tooltipFormatter}
              labelFormatter={tooltipLabelFormatter}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={String(yAxis)}
              stroke={color}
              activeDot={{ r: 8 }}
              name={String(yAxis)}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default LineChart;
