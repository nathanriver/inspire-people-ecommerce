import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router";
import {
  addProductSize,
  updateProductSize,
} from "../features/product-sizes/productSizesSlice";
import TextField from "./TextField";
import Loader from "./Loader";

const productSizeSchema = Yup.object({
  name: Yup.string()
    .max(5, "Please enter no more than 5 characters.")
    .required("Label is required."),
  width: Yup.number()
    .positive("Value must be a positive number.")
    .required("Width is required."),
  length: Yup.number()
    .positive("Value must be a positive number.")
    .required("Length is required."),
});

const ProductSizeForm = ({ isEditMode, closeModal, productSize }) => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const initialValues = {
    name: isEditMode ? productSize.name : "",
    width: isEditMode ? productSize.width : "",
    length: isEditMode ? productSize.length : "",
  };

  const handleAddProductSize = (values) => {
    dispatch(
      addProductSize({
        categoryId,
        values,
      })
    );
    closeModal();
  };

  const handleUpdateProductSize = (values) => {
    dispatch(
      updateProductSize({
        categoryId,
        id: productSize.id,
        values,
      })
    );
    closeModal();
  };

  return (
    <>
      {isEditMode && !productSize ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={productSizeSchema}
          onSubmit={(values, { resetForm }) => {
            if (isEditMode) {
              handleUpdateProductSize(values);
            } else {
              handleAddProductSize(values);
            }
            resetForm();
          }}
        >
          {(props) => (
            <Form className="space-y-3">
              <TextField label="Name" name="name" type="text" id="name" />
              <TextField label="Width" name="width" type="number" id="width" />
              <TextField
                label="Length"
                name="length"
                type="number"
                id="length"
              />
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

export default ProductSizeForm;
