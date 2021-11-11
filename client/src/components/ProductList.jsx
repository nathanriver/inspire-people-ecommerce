import ProductCard from "./ProductCard";
import { productList } from "../data";

const ProductList = () => {
  return (
    <>
      <p className="text-xl mb-4 font-bold">Products</p>
      <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {productList.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
