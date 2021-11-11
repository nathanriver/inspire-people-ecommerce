import AccountLayout from "../layouts/AccountLayout";

const Account = () => {
  return (
    <AccountLayout title="Profile">
      <form className="space-y-3">
        <div>
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            className="w-80"
            type="text"
            name="name"
            id="name"
            value="Nate River"
          />
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            className="w-80"
            disabled
            type="email"
            name="email"
            id="email"
            value="nateriver@email.com"
          />
        </div>
        <div>
          <label htmlFor="email" className="label">
            Phone Number
          </label>
          <input
            className="w-80"
            type="text"
            name="phone_number"
            id="phone_number"
            value="+62873474886969"
          />
        </div>
        <button className="btn">Update</button>
      </form>
    </AccountLayout>
  );
};

export default Account;
