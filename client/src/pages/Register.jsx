import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="w-80 mx-auto p-2">
        <p className="font-bold text-xl mb-2">Sign Up</p>
        <form className="space-y-3">
          <div>
            <label className="label" htmlFor="name">
              Name
            </label>
            <input className="w-full" type="text" id="name" name="name" />
          </div>
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
          <button className="btn">Sign Up</button>
          <p className="text-sm">
            Already have an account?
            <Link to="/login" className="font-bold">
              {" "}
              Login your account.
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
