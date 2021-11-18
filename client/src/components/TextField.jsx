import { useField, ErrorMessage } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="label" htmlFor={props.id}>
        {label}
      </label>
      <input
        className={`w-full ${meta.touched && meta.error ? "is-invalid" : ""}`}
        {...field}
        {...props}
      />
      <ErrorMessage
        className={"text-xs text-red-600 font-medium"}
        name={field.name}
        component="div"
      />
    </div>
  );
};

export default TextField;
