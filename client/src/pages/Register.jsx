import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import TextField from "../components/TextField";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import Error from "../components/Error";
import { useHistory } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const registerSchema = Yup.object({
  name: Yup.string()
    .max(30, "Please enter no more than 30 characters.")
    .required("Name is required."),
  email: Yup.string()
    .max(64, "Please enter no more than 64 characters.")
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Please enter a value between 6 and 60 characters long.")
    .max(60, "Please enter a value between 6 and 60 characters long.")
    .required("Password is required."),
});

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const handleSubmit = (values) => {
    dispatch(register(values));
  };

  return (
    <>
      <div className="w-full sm:w-80 mx-auto p-2">
        <p className="font-bold text-xl mb-2">Sign Up</p>
        {error && <Error error={error} />}
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(props) => (
            <Form className="space-y-3">
              <TextField label="Name" name="name" type="text" id="name" />
              <TextField label="Email" name="email" type="email" id="email" />
              <TextField
                label="Password"
                name="password"
                type="password"
                id="password"
              />
              <p className="text-sm">
                Already have an account?
                <Link to="/login" className="font-bold">
                  {" "}
                  Login your account.
                </Link>
              </p>
              <button className="btn" type="submit">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
