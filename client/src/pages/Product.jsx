import { useParams } from "react-router";
import currencyFormat from "../utils/currencyFormat";
import { productList } from "../data";

const Product = () => {
  const { slug } = useParams();
  const product = productList.find((p) => p.slug === slug);
  const { name, price, image } = product;

  return (
    <div className="flex flex-wrap justify-between text-black">
      <div className="w-full md:w-2/4 p-2">
        <img src={image} alt="tshirt1" className="md:w-80 mx-auto" />
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
            <select className="w-16 py-1 px-3" name="size" id="size">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <div className="flex space-x-2">
              <button type="button" className="btn-outline py-1 px-3">
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
              <input className="w-16 py-1 px-3" type="number" />
              <button type="button" className="btn-outline py-1 px-3">
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
          <button className="btn">Add to Cart</button>
        </form>
      </div>
    </div>
  );
};

export default Product;
