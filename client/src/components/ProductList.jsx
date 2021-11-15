import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/productList/productListSlice";
import Loader from "./Loader";
import Error from "./Error";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <p className="text-xl mb-4 font-bold">Products</p>
      <div
        className={
          isLoading || error
            ? ""
            : "grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        }
      >
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error error={error} />
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
