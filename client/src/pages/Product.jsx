import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { API } from "../config";
import currencyFormat from "../utils/currencyFormat";
import { addToCart } from "../features/cart/cartSlice";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Product = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [isOneSize, setIsOneSize] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState("");
  const [stock, setStock] = useState(null);

  const handleSizeChange = (e) => {
    if (!isOneSize) {
      const value = Number(e.target.value);
      const productDetail = product.productDetails.find((p) => p.id === value);
      if (productDetail) {
        setStock(productDetail.stock);
        setSize(value);
        setQuantity(1);
      }
    }
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0 && value <= stock) {
      setQuantity(value);
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

  const handleAddToCart = () => {
    if (!size) {
      dispatch(
        setSnackbar({
          isOpen: true,
          type: "Error",
          message: "Please select a size",
        })
      );
    }
    if (size && quantity > 0) {
      dispatch(
        addToCart({
          productDetailId: size,
          quantity,
        })
      );
      dispatch(
        setSnackbar({
          isOpen: true,
          type: "Success",
          message: "Added to cart",
        })
      );
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await API.get(`/products/${slug}`);
        setProduct(data);
        setIsOneSize(data.category.is_one_size);
        if (data.category.is_one_size) {
          setSize(data.productDetails[0].id);
          setStock(data.productDetails[0].stock);
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    getProduct();
  }, [slug]);

  return error ? (
    <Error error={error} />
  ) : !product ? (
    <Loader />
  ) : (
    <div className="flex flex-wrap justify-between text-black">
      <div className="w-full md:w-2/4 p-2">
        <img
          src={product.image_url}
          alt="tshirt1"
          className="md:w-80 mx-auto"
        />
      </div>
      <div className="w-full md:w-2/4 p-2">
        <p className="font-bold text-xl ">{product.name}</p>
        <p className="text-lg font-semibold mb-2 text-gray-600">
          {currencyFormat(product.price)}
        </p>
        {!product.productDetails.length ? (
          <p className="text-red-700">
            Product out of stock.&nbsp;
            <Link to="/" className="font-medium">
              Go Back
            </Link>
          </p>
        ) : (
          <div className="space-y-3">
            {!isOneSize && (
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
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {product.productDetails.map((p, i) => (
                    <option key={i} value={p.id}>
                      {p.productSize?.name || "No Size"}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="label" htmlFor="quantity">
                Quantity
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="btn-outline py-1 px-3"
                  onClick={handleQuantityDecrement}
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
                  onClick={handleQuantityIncrement}
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
            <button className="btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
