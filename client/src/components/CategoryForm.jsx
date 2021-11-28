import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { API } from "../config";
import { addAddress, updateAddress } from "../features/address/addressSlice";
import TextField from "./TextField";
import Select from "./Select";
import Loader from "./Loader";

const categorySchema = Yup.object({
  name: Yup.string()
    .max(30, "Please enter no more than 30 characters.")
    .required("Label is required."),
});

const CategoryForm = ({ isEditMode, category }) => {
  const initialValues = {
    name: isEditMode ? category.name : "",
  };

  const handleAddCategory = () => {};

  const handleUpdateCategory = () => {};

  return (
    <>
      {isEditMode && !category ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={categorySchema}
          onSubmit={(values, { resetForm }) => {
            if (isEditMode) {
              handleUpdateCategory(values);
            } else {
              handleAddCategory(values);
            }
            resetForm();
          }}
        >
          {(props) => (
            <Form className="space-y-3">
              <TextField label="Name" name="name" type="text" id="name" />
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

export default CategoryForm;
