import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { getProductSizes } from "../features/product-sizes/productSizesSlice";
import {
  addProductDetail,
  updateProductDetail,
} from "../features/product-details/productDetailsSlice";
import TextField from "./TextField";
import Loader from "./Loader";
import Select from "./Select";

const categorySchema = Yup.object({
  productsize_id: Yup.string().nullable(),
  stock: Yup.number()
    .min(0, "Value must be greater than or equal to 0")
    .max(1000)
    .required("Stock is required."),
});

const ProductDetailForm = ({ isEditMode, closeModal, productDetail }) => {
  const dispatch = useDispatch();
  const { categoryId, productId } = useParams();
  const { productSizes } = useSelector((state) => state.productSizes);
  let initialValues = {
    stock: isEditMode ? productDetail.stock : "",
  };

  if (!isEditMode) {
    initialValues = { ...initialValues, productsize_id: "" };
  }

  const handleAddProductDetail = (values) => {
    dispatch(addProductDetail({ productId, values }));
    closeModal();
  };

  const handleUpdateProductDetail = (values) => {
    dispatch(
      updateProductDetail({
        productId,
        id: productDetail.id,
        values,
      })
    );
    closeModal();
  };

  useEffect(() => {
    dispatch(getProductSizes(categoryId));
  }, [dispatch, categoryId]);

  return (
    <>
      {isEditMode && !productDetail ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={categorySchema}
          onSubmit={(values, { resetForm }) => {
            if (isEditMode) {
              handleUpdateProductDetail(values);
            } else {
              handleAddProductDetail(values);
            }
            resetForm();
          }}
        >
          {(props) => (
            <Form className="space-y-3">
              {!isEditMode && (
                <Select label="Size" name="productsize_id" id="product-size">
                  {productSizes.map((productSize) => (
                    <option key={productSize.id} value={productSize.id}>
                      {productSize.name}
                    </option>
                  ))}
                </Select>
              )}
              <TextField label="Stock" name="stock" type="number" id="stock" />
              <button type="submit" className="btn">
                {isEditMode ? "Update" : "Add"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ProductDetailForm;
