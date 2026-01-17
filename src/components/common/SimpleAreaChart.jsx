import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";


const SimpleAreaChart = ({data}) => {
  return (
    <AreaChart
    className="min-h-65"
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        interval={0} // 👈 show ALL labels (no skipping)
        tick={{ fontSize: 12 }} // 👈 reduce font size
        height={40}
      />
      <YAxis width="auto"  tick={{ fontSize: 12 }} />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#00c950" />
      <RechartsDevtools />
    </AreaChart>
  );
};

export default SimpleAreaChart;
