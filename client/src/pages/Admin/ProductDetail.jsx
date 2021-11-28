import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/Loader";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableBody from "../../components/Table/TableBody";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";

const ProductDetail = () => {
  const { categoryId, productId } = useParams();
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const getProductDetails = async () => {
      const { data } = await API.get(
        `/product-details?product_id=${productId}`
      );
      setProductDetails(data);
    };
    getProductDetails();
  }, [productId]);

  return (
    <AdminLayout>
      {!productDetails ? (
        <Loader />
      ) : (
        <>
          <nav className="bg-grey-light rounded font-sans w-full">
            <ol className="list-reset flex text-grey-dark">
              <li>
                <Link to="/admin/categories" className="font-bold">
                  Categories
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link
                  to={`/admin/categories/${categoryId}/products`}
                  className="font-bold"
                >
                  Products
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>Stock</li>
            </ol>
          </nav>
          <div className="flex justify-end">
            <button className="btn mb-3">Add Stock</button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productDetails.map((productDetail, i) => (
                <TableRow key={productDetail.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{productDetail.productSize.name}</TableCell>
                  <TableCell>{productDetail.stock}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <button className="btn-outline py-1 px-3">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button className="btn-outline py-1 px-3">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </AdminLayout>
  );
};

export default ProductDetail;
