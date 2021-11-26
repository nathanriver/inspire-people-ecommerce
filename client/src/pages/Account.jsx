import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { API } from "../config";
import { updateProfile } from "../features/auth/authSlice";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import AccountLayout from "../layouts/AccountLayout";
import TextField from "../components/TextField";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);

  const profileSchema = Yup.object({
    name: Yup.string()
      .max(30, "Please enter no more than 30 characters.")
      .required("Name is required."),
  });

  const changePasswordSchema = Yup.object({
    old_password: Yup.string().required("Old password is required."),
    new_password: Yup.string()
      .min(6, "Please enter a value between 6 and 60 characters long.")
      .max(60, "Please enter a value between 6 and 60 characters long.")
      .required("New password is required."),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const handleUpdateProfile = (values) => {
    dispatch(
      updateProfile({
        name: values.name,
      })
    );
  };

  const handleChangePassword = (values) => {
    const changePassword = async () => {
      try {
        await API.put("/user/change-password", {
          old_password: values.old_password,
          new_password: values.new_password,
        });
        setError(null);
        dispatch(
          setSnackbar({
            isOpen: true,
            type: "Success",
            message: "Password changed successfully",
          })
        );
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    changePassword();
  };

  return (
    <AccountLayout title="Profile">
      {!user ? (
        <Loader />
      ) : (
        <>
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: user.name,
              email: user.email,
            }}
            validationSchema={profileSchema}
            onSubmit={(values) => handleUpdateProfile(values)}
          >
            {(props) => (
              <Form className="space-y-3 w-full sm:w-80 mb-4">
                <TextField label="Name" name="name" type="text" id="name" />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  id="email"
                  disabled
                />
                <button className="btn" type="submit">
                  Update
                </button>
              </Form>
            )}
          </Formik>
          <p className="font-bold mb-4">Change Password</p>
          {error && <Error error={error} />}
          <Formik
            initialValues={{
              old_password: "",
              new_password: "",
              confirm_password: "",
            }}
            validationSchema={changePasswordSchema}
            onSubmit={(values, { resetForm }) => {
              handleChangePassword(values);
              resetForm();
            }}
          >
            {(props) => (
              <Form className="space-y-3 w-full sm:w-80 mb-4">
                <TextField
                  label="Old Password"
                  name="old_password"
                  type="password"
                  autoComplete="off"
                  id="old-password"
                />
                <TextField
                  label="New Password"
                  name="new_password"
                  type="password"
                  autoComplete="off"
                  id="new-password"
                />
                <TextField
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  autoComplete="off"
                  id="confirm-password"
                />
                <button className="btn" type="submit">
                  Change
                </button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </AccountLayout>
  );
};

export default Account;
