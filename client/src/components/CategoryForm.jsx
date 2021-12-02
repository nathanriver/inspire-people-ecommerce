import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
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
  is_one_size: Yup.boolean(),
});

const CategoryForm = ({ isEditMode, closeModal, category }) => {
  const dispatch = useDispatch();
  const initialValues = {
    name: isEditMode ? category.name : "",
    is_one_size: isEditMode ? category.is_one_size : false,
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
              <div className="flex items-center space-x-1">
                <Field
                  className="rounded text-black focus:ring-0"
                  type="checkbox"
                  name="is_one_size"
                  id="is-one-size"
                />
                <label htmlFor="is-one-size">One Size</label>
              </div>
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
