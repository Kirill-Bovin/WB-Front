import React from "react";
import type { Product } from "@/types/product"
import { Card, CardContent } from "@/components/ui/card";
import PriceHistogram from "@/charts/PriceHistogram";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  paginated: Product[];
  sortedAndFiltered: Product[];
  page: number;
  pageSize: number;
  setPage: (page: number | ((prev: number) => number)) => void;
};

const Tables_and_Paginates: React.FC<Props> = ({
  paginated,
  sortedAndFiltered,
  page,
  pageSize,
  setPage,
}) => {
  return (
    <>
      {/* Таблица */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-black border-collapse text-sm text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-black px-4 py-2">Название</th>
                  <th className="border border-black px-4 py-2">Цена</th>
                  <th className="border border-black px-4 py-2">Цена со скидкой</th>
                  <th className="border border-black px-4 py-2">Рейтинг</th>
                  <th className="border border-black px-4 py-2">Отзывы</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="border border-black px-4 py-2">{p.title}</td>
                    <td className="border border-black px-4 py-2">{p.price}</td>
                    <td className="border border-black px-4 py-2">{p.discounted_price}</td>
                    <td className="border border-black px-4 py-2">{p.rating}</td>
                    <td className="border border-black px-4 py-2">{p.reviews}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Пагинация */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, typeof p === "number" ? p - 1 : 1))}
            >
              Назад
            </button>
            <span>
              {Math.min((page - 1) * pageSize + 1, sortedAndFiltered.length)} / {sortedAndFiltered.length}
            </span>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page * pageSize >= sortedAndFiltered.length}
              onClick={() => setPage((p) => (typeof p === "number" ? p + 1 : page + 1))}
            >
              Вперёд
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Графики */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardContent>
            <PriceHistogram products={sortedAndFiltered} />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-center font-semibold mb-2">Скидка vs Рейтинг</h3>
            <LineChart
              width={400}
              height={250}
              data={sortedAndFiltered.map((p) => ({
                rating: p.rating,
                discount: p.price - p.discounted_price,
                name: p.title,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="discount" stroke="#82ca9d" />
            </LineChart>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Tables_and_Paginates;