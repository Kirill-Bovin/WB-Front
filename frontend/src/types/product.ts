export interface Product {
  id: number;
  title: string;
  price: number;
  discounted_price: number;
  rating: number;
  reviews: number; // ✅ КАК В JSON
}