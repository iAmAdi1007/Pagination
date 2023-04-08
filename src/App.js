import "./styles.css";
import { useState, useEffect } from "react";

const API_ENDPOINT = "https://dummyjson.com/products?limit=99";
const MAX_PER_PAGE = 9;
export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch(API_ENDPOINT);
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <div className="product__container">
        {products
          .slice(page * MAX_PER_PAGE - MAX_PER_PAGE, page * MAX_PER_PAGE)
          .map((product) => {
            return (
              <div className="product__card" key={product.id}>
                <img
                  src={product?.thumbnail}
                  alt={product.title}
                  className="product__image"
                />
                <span className="product__title">{product.title}</span>
              </div>
            );
          })}
      </div>
      <div className="page__navigation">
        <span
          className={`${page === 1 ? "hidden" : ""}`}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </span>
        {[...Array(Math.ceil(products.length / 9))].map((_, index) => {
          return (
            <span
              className={`${page === index + 1 ? "selected" : ""}`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </span>
          );
        })}
        <span
          className={`${
            page === Math.ceil(products.length / 9) ? "hidden" : ""
          }`}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </span>
      </div>
    </div>
  );
}
