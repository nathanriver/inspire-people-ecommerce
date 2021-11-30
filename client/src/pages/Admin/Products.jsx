import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
} from "../../features/products/productsSlice";
import currencyFormat from "../../utils/currencyFormat";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import FormModal from "../../components/FormModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import ProductForm from "../../components/ProductForm";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableBody from "../../components/Table/TableBody";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";

const Products = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { products, isLoading, error } = useSelector((state) => state.products);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct({ categoryId, id }));
  };

  useEffect(() => {
    dispatch(getProducts(categoryId));
  }, [dispatch, categoryId]);

  return (
    <AdminLayout>
      {error ? (
        <Error error={error} />
      ) : isLoading ? (
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
              <li>Products</li>
            </ol>
          </nav>
          <div className="flex justify-end mb-3">
            <FormModal
              triggerBtn={{
                type: "normal",
                text: "Add Product",
              }}
              title="Add Product"
            >
              <ProductForm isEditMode={false} />
            </FormModal>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, i) => (
                <TableRow key={product.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={product.image_url}
                    >
                      <img
                        className="max-w-none w-20"
                        src={product.image_url}
                        alt={product.name}
                      />
                    </a>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{currencyFormat(product.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Link
                        className="btn-outline py-1 px-3"
                        to={`products/${product.id}/stock`}
                      >
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
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          />
                        </svg>
                      </Link>
                      <FormModal
                        triggerBtn={{
                          type: "icon",
                          icon: (
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
                          ),
                        }}
                        title="Update Product"
                      >
                        <ProductForm isEditMode={true} product={product} />
                      </FormModal>
                      <ConfirmationModal
                        title="Confirm Delete Product"
                        triggerBtn={{
                          type: "icon",
                          icon: (
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
                          ),
                        }}
                        contentText="Are you sure want to delete the product?"
                        actionBtnText="Delete"
                        action={() => handleDeleteProduct(product.id)}
                      />
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

export default Products;
