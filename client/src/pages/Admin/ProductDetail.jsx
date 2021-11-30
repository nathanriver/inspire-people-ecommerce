import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getProductDetails,
  deleteProductDetail,
} from "../../features/product-details/productDetailsSlice";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import FormModal from "../../components/FormModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import ProductDetailForm from "../../components/ProductDetailForm";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableBody from "../../components/Table/TableBody";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { categoryId, productId } = useParams();
  const { productDetails, isLoading, error } = useSelector(
    (state) => state.productDetails
  );

  const handleDeleteProductDetail = (id) => {
    dispatch(deleteProductDetail({ productId, id }));
  };

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

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
          <div className="flex justify-end mb-3">
            <FormModal
              triggerBtn={{
                type: "normal",
                text: "Add Stock",
              }}
              title="Add Stock"
            >
              <ProductDetailForm isEditMode={false} />
            </FormModal>
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
                  <TableCell>
                    {productDetail.productSize?.name || "No Size"}
                  </TableCell>
                  <TableCell>{productDetail.stock}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
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
                        title="Update Stock"
                      >
                        <ProductDetailForm
                          isEditMode={true}
                          productDetail={productDetail}
                        />
                      </FormModal>
                      <ConfirmationModal
                        title="Confirm Delete Stock"
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
                        contentText="Are you sure want to delete the stock?"
                        actionBtnText="Delete"
                        action={() =>
                          handleDeleteProductDetail(productDetail.id)
                        }
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

export default ProductDetail;
