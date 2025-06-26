import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/types/product"

type Props = {
  maxPrice: number
  priceFilter: number
  setPriceFilter: (v: number) => void
  ratingFilter: number
  setRatingFilter: (v: number) => void
  reviewFilter: number
  setReviewFilter: (v: number) => void
  sortField: keyof Product | ""
  setSortField: (v: keyof Product | "") => void
  sortOrder: "asc" | "desc"
  setSortOrder: (v: "asc" | "desc") => void
}

export default function Filter_other({
  maxPrice,
  priceFilter,
  setPriceFilter,
  ratingFilter,
  setRatingFilter,
  reviewFilter,
  setReviewFilter,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}: Props) {
  return (
    <Card className="mb-6">
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Минимальная цена: {priceFilter}</label>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceFilter}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Минимальный рейтинг: {ratingFilter}</label>
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={ratingFilter}
              onChange={(e) => setRatingFilter(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Минимум отзывов: {reviewFilter}</label>
            <input
              type="range"
              min={0}
              max={3000}
              step={10}
              value={reviewFilter}
              onChange={(e) => setReviewFilter(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm mb-1">Сортировать по:</label>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as keyof Product)}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="">-- не выбрано --</option>
              <option value="title">Название</option>
              <option value="price">Цена</option>
              <option value="discounted_price">Цена со скидкой</option>
              <option value="rating">Рейтинг</option>
              <option value="reviews">Отзывы</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Порядок:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="asc">по возрастанию</option>
              <option value="desc">по убыванию</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}