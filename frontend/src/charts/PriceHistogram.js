import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, } from "recharts";
const PriceHistogram = ({ products }) => {
    if (!products || products.length === 0) {
        return _jsx("div", { className: "text-center text-gray-500", children: "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u0433\u0438\u0441\u0442\u043E\u0433\u0440\u0430\u043C\u043C\u044B" });
    }
    const binSize = 1000;
    const histogramMap = new Map();
    for (const product of products) {
        const price = typeof product.discounted_price === "number" && product.discounted_price > 0
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
    return (_jsxs("div", { className: "p-4", style: { width: "100%", height: 300 }, children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "\u0413\u0438\u0441\u0442\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u0446\u0435\u043D" }), _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: histogramData, margin: { bottom: 30 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "range" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "count", fill: "#8884d8" })] }) })] }));
};
export default PriceHistogram;
