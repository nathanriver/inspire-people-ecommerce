import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { login } from "../features/auth/authSlice";
import TextField from "../components/TextField";
import Error from "../components/Error";

const initialValues = {
  email: "",
  password: "",
};

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const Login = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <>
      <div className="w-full sm:w-80 mx-auto p-2">
        <p className="font-bold text-xl mb-2">Sign In</p>
        {error && <Error error={error} />}
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(props) => (
            <Form className="space-y-3">
              <TextField label="Email" name="email" type="email" id="email" />
              <TextField
                label="Password"
                name="password"
                type="password"
                id="password"
                autoComplete="off"
              />
              <button className="btn" type="submit">
                Sign In
              </button>
              <p className="text-sm">
                Don't have an account?
                <Link to="/register" className="font-bold">
                  {" "}
                  Create an account.
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
