import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getProductSizes,
  deleteProductSize,
} from "../../features/product-sizes/productSizesSlice";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableBody from "../../components/Table/TableBody";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";
import FormModal from "../../components/FormModal";
import ProductSizeForm from "../../components/ProductSizeForm";
import ConfirmationModal from "../../components/ConfirmationModal";

const ProductSize = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { productSizes, isLoading, error } = useSelector(
    (state) => state.productSizes
  );

  const handleDeleteProductSize = (id) => {
    dispatch(
      deleteProductSize({
        categoryId,
        id,
      })
    );
  };

  useEffect(() => {
    dispatch(getProductSizes(categoryId));
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
              <li>Product Sizes</li>
            </ol>
          </nav>
          <div className="flex justify-end mb-3">
            <FormModal
              triggerBtn={{
                type: "normal",
                text: "Add Product Size",
              }}
              title="Add Product Size"
            >
              <ProductSizeForm isEditMode={false} />
            </FormModal>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Width</TableCell>
                <TableCell>Length</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productSizes.map((productSize, i) => (
                <TableRow key={productSize.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{productSize.name}</TableCell>
                  <TableCell>{productSize.width}</TableCell>
                  <TableCell>{productSize.length}</TableCell>
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
                        title="Update Product Size"
                      >
                        <ProductSizeForm
                          isEditMode={true}
                          productSize={productSize}
                        />
                      </FormModal>
                      <ConfirmationModal
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
                        title="Confirm Delete Product Size"
                        contentText="Are you sure want to delete the product size?"
                        actionBtnText="Delete"
                        action={() => handleDeleteProductSize(productSize.id)}
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

export default ProductSize;
