import { useField, ErrorMessage } from "formik";

const Select = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="label" htmlFor={props.id}>
        {label}
      </label>
      <select
        className={`w-full ${meta.touched && meta.error ? "is-invalid" : ""}`}
        {...field}
        {...props}
      >
        <option value="" disabled hidden>
          Select
        </option>
        {children}
      </select>
      <ErrorMessage
        className={"text-xs text-red-600 font-medium"}
        name={field.name}
        component="div"
      />
    </div>
  );
};

export default Select;
