import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addBanner } from "../features/banners/bannersSlice";
import TextField from "./TextField";
import Loader from "./Loader";

const bannerSchema = Yup.object({
  image: Yup.mixed().required("Image is required."),
});

const CategoryForm = ({ isEditMode, closeModal, banner }) => {
  const dispatch = useDispatch();
  const [previewSource, setPreviewSource] = useState(null);
  const initialValues = {
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

  const handleAddBanner = () => {
    dispatch(
      addBanner({
        image: previewSource,
      })
    );
    closeModal();
  };

  return (
    <>
      {isEditMode && !banner ? (
        <Loader />
      ) : (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={bannerSchema}
            onSubmit={(values, { resetForm }) => {
              handleAddBanner();
              resetForm();
            }}
          >
            {(props) => (
              <Form className="space-y-3 mb-3">
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

export default CategoryForm;
