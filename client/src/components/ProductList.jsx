import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { API } from "../config";
import Loader from "./Loader";
import Error from "./Error";

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <p className="text-xl mb-4 font-bold">Products</p>
      <div
        className={
          error || !products
            ? ""
            : "grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        }
      >
        {error ? (
          <Error error={error} />
        ) : !products ? (
          <Loader />
        ) : (
          products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default ProductList;
