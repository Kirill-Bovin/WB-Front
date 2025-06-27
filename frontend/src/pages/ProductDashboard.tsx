import React, { useEffect, useMemo, useState } from "react";
import Filter_other from "@/components/Filter_other";
import Tables_and_Paginates from "@/components/Tables_and_Paginates";
import SearchForm from "@/components/SearchForm";
import type { Product } from "@/types/product";


const ProductDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [priceFilter, setPriceFilter] = useState(0);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [reviewFilter, setReviewFilter] = useState(0);

  const [sortField, setSortField] = useState<keyof Product | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(200);

  const handleSearch = () => {
  setLoading(true);

  fetch(
    `http://127.0.0.1:8000/api/products/fetch?query=${encodeURIComponent(
      searchQuery
    )}&limit=${limit}`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then(() => {
      const retries = 10;
      const delay = 2000; // 2 сек

      let attempts = 0;

      const pollData = () => {
        fetch("http://127.0.0.1:8000/api/products/")
          .then((res) => res.json())
          .then((data) => {
            if (data.length > products.length || attempts >= retries) {
              setProducts(data);
              setLoading(false);
              setPage(1);
            } else {
              attempts++;
              setTimeout(pollData, delay);
            }
          })
          .catch((err) => {
            console.error("Ошибка при обновлении данных:", err);
            setLoading(false);
          });
      };

      pollData();
    })
    .catch((err) => {
      console.error("Ошибка при запуске парсинга:", err);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Получены данные:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке:", err);
        setLoading(false);
      });
  }, []);

  const sortedAndFiltered = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        p.price >= priceFilter &&
        p.rating >= ratingFilter &&
        p.reviews >= reviewFilter
    );

    if (!sortField) return filtered;

    return [...filtered].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return sortOrder === "asc"
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    });
  }, [products, priceFilter, ratingFilter, reviewFilter, sortField, sortOrder]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedAndFiltered.slice(start, start + pageSize);
  }, [sortedAndFiltered, page]);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 0);
  }, [products]);

  if (loading) return <div className="text-center mt-10">Загрузка...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">WB Парсинг</h1>

      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        limit={limit}
        setLimit={setLimit}
        onSearch={handleSearch}
      />

      <Filter_other
        maxPrice={maxPrice}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        reviewFilter={reviewFilter}
        setReviewFilter={setReviewFilter}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <Tables_and_Paginates
        paginated={paginated}
        sortedAndFiltered={sortedAndFiltered}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
      />
    </div>
  );
};

export default ProductDashboard;