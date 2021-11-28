import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  addCategory,
  updateCategory,
} from "../features/categories/categoriesSlice";
import TextField from "./TextField";
import Loader from "./Loader";

const categorySchema = Yup.object({
  name: Yup.string()
    .max(30, "Please enter no more than 30 characters.")
    .required("Label is required."),
});

const CategoryForm = ({ isEditMode, closeModal, category }) => {
  const dispatch = useDispatch();
  const initialValues = {
    name: isEditMode ? category.name : "",
  };

  const handleAddCategory = (values) => {
    dispatch(addCategory(values));
    closeModal();
  };

  const handleUpdateCategory = (values) => {
    dispatch(
      updateCategory({
        id: category.id,
        values,
      })
    );
    closeModal();
  };

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
