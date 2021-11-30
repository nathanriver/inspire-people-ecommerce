import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addProduct, updateProduct } from "../features/products/productsSlice";
import TextField from "./TextField";
import Loader from "./Loader";

const ProductForm = ({ isEditMode, closeModal, product }) => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [previewSource, setPreviewSource] = useState(null);
  const productSchema = Yup.object({
    sku: Yup.string()
      .max(16, "Please enter no more than 16 characters.")
      .nullable(),
    slug: Yup.string()
      .max(255, "Please enter no more than 255 characters.")
      .required("Slug is required."),
    name: Yup.string()
      .max(150, "Please enter no more than 150 characters.")
      .required("Name is required."),
    color: Yup.string()
      .max(30, "Please enter no more than 30 characters.")
      .required("Color is required."),
    price: Yup.number()
      .positive("Value must be a positive number.")
      .required("Price is required."),
    weight: Yup.number()
      .positive("Value must be a positive number.")
      .required("Weight is required."),
    summary: Yup.string()
      .max(300, "Please enter no more than 300 characters.")
      .nullable(),
    image: isEditMode
      ? Yup.mixed().nullable()
      : Yup.mixed().required("Image is required."),
  });
  const initialValues = {
    sku: isEditMode ? product.sku || "" : "",
    slug: isEditMode ? product.slug : "",
    name: isEditMode ? product.name : "",
    color: isEditMode ? product.color : "",
    price: isEditMode ? product.price : "",
    weight: isEditMode ? product.weight : "",
    summary: isEditMode ? product.summary || "" : "",
    image: "",
  };

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      previewFile(file);
    } else {
      setPreviewSource(null);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleAddProduct = (values) => {
    dispatch(
      addProduct({ categoryId, values: { ...values, image: previewSource } })
    );
    closeModal();
  };

  const handleUpdateProduct = (values) => {
    dispatch(
      updateProduct({
        categoryId,
        id: product.id,
        values: { ...values, image: previewSource },
      })
    );
    closeModal();
  };

  return (
    <>
      {isEditMode && !product ? (
        <Loader />
      ) : (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            onSubmit={(values, { resetForm }) => {
              if (isEditMode) {
                handleUpdateProduct(values);
              } else {
                handleAddProduct(values);
              }
              resetForm();
            }}
          >
            {(props) => (
              <Form className="space-y-3 mb-3">
                <TextField label="SKU" name="sku" type="text" id="sku" />
                <TextField label="Slug" name="slug" type="text" id="slug" />
                <TextField label="Name" name="name" type="text" id="name" />
                <TextField label="Color" name="color" type="text" id="color" />
                <TextField
                  label="Price (Rupiah)"
                  name="price"
                  type="number"
                  id="price"
                />
                <TextField
                  label="Weight (Gram)"
                  name="weight"
                  type="number"
                  id="weight"
                />
                <TextField
                  label="Summary"
                  name="summary"
                  type="text"
                  id="summary"
                />
                <TextField
                  value={undefined}
                  label="Image"
                  name="image"
                  type="file"
                  id="image"
                  onChange={(e) => {
                    props.setFieldValue("image", e.currentTarget.files[0]);
                    handleImageChange(e);
                  }}
                />
                <button type="submit" className="btn">
                  {isEditMode ? "Update" : "Add"}
                </button>
              </Form>
            )}
          </Formik>
          {previewSource && <img src={previewSource} alt="preview" />}
        </>
      )}
    </>
  );
};

export default ProductForm;
