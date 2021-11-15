import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/product/productSlice";
import { useParams } from "react-router";
import currencyFormat from "../utils/currencyFormat";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Product = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector((state) => state.product);
  const { name, price, image_url, productDetails } = product;
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState(0);
  const [stock, setStock] = useState(null);

  const handleSizeChange = (e) => {
    const value = e.target.value;
    const productDetail = productDetails.find((p) => p.id === Number(value));
    if (productDetail) {
      setStock(productDetail.stock);
      setSize(value);
      setQuantity(0);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value > 0 && value <= stock) {
      setQuantity(e.target.value);
    }
  };

  const handleQuantityIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    dispatch(getProduct(slug));
  }, [dispatch, slug]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Error error={error} />
  ) : (
    <div className="flex flex-wrap justify-between text-black">
      <div className="w-full md:w-2/4 p-2">
        <img src={image_url} alt="tshirt1" className="md:w-80 mx-auto" />
      </div>
      <div className="w-full md:w-2/4 p-2">
        <p className="font-bold text-xl ">{name}</p>
        <p className="text-lg font-semibold mb-2 text-gray-600">
          {currencyFormat(price)}
        </p>
        <form className="space-y-3">
          <div>
            <label className="label" htmlFor="size">
              Size
            </label>
            <select
              className="w-24 py-1 px-3"
              name="size"
              id="size"
              value={size}
              onChange={(e) => handleSizeChange(e)}
            >
              <option value={0} disabled hidden>
                Select
              </option>
              {productDetails.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.productSize.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                className="btn-outline py-1 px-3"
                onClick={() => handleQuantityDecrement()}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <input
                className="w-16 py-1 px-3"
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(e)}
              />
              <button
                type="button"
                className="btn-outline py-1 px-3"
                onClick={() => handleQuantityIncrement()}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
          {stock ? <p className="text-sm">Stock: {stock}</p> : null}
          <button className="btn" disabled>
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default Product;
