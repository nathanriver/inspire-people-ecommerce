import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="w-80 mx-auto p-2">
        <p className="font-bold text-xl mb-2">Sign In</p>
        <form className="space-y-3">
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="w-full" type="email" id="email" name="email" />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="w-full"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <button className="btn">Sign In</button>
          <p className="text-sm">
            Don't have an account?
            <Link to="/register" className="font-bold">
              {" "}
              Create an account.
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
