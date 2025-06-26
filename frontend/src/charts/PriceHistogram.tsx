import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
};

const PriceHistogram: React.FC<Props> = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="text-center text-gray-500">Нет данных для гистограммы</div>;
  }

  const binSize = 1000;
  const histogramMap = new Map<string, number>();

  for (const product of products) {
    const price =
      typeof product.discounted_price === "number" && product.discounted_price > 0
        ? product.discounted_price
        : product.price;

    const binStart = Math.floor(price / binSize) * binSize;
    const binEnd = binStart + binSize - 1;
    const binLabel = `${binStart}–${binEnd}`;

    histogramMap.set(binLabel, (histogramMap.get(binLabel) || 0) + 1);
  }

  const histogramData = Array.from(histogramMap.entries())
    .map(([range, count]) => ({ range, count }))
    .sort((a, b) => parseInt(a.range.split("–")[0]) - parseInt(b.range.split("–")[0]));

  return (
    <div className="p-4" style={{ width: "100%", height: 300 }}>
      <h2 className="text-lg font-semibold mb-2">Гистограмма цен</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={histogramData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistogram;