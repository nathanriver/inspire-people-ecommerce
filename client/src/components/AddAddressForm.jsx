import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getProvinces } from "../features/province/provinceSlice";
import { getCities } from "../features/city/cityReducer";
import { addAddress } from "../features/address/addressSlice";
import TextField from "../components/TextField";
import Select from "../components/Select";

const initialValues = {
  label: "",
  recipient_name: "",
  phone_number: "",
  province_id: "",
  city_id: "",
  subdistrict: "",
  postal_code: "",
  full_address: "",
};

const addAddressSchema = Yup.object({
  label: Yup.string()
    .max(30, "Please enter no more than 30 characters.")
    .required("Label is required."),
  recipient_name: Yup.string()
    .max(100, "Please enter no more than 100 characters.")
    .required("Recipient is required."),
  phone_number: Yup.string()
    .min(8, "Please enter a value between 8 and 12 characters long.")
    .max(12, "Please enter a value between 8 and 12 characters long.")
    .required("Phone number is required."),
  province_id: Yup.string().required("Province is required."),
  city_id: Yup.string().required("City is required."),
  subdistrict: Yup.string()
    .max(100, "Please enter no more than 100 characters.")
    .required("Subdistrict is required."),
  postal_code: Yup.string()
    .max(10, "Please enter no more than 10 characters.")
    .required("Postal code is required."),
  full_address: Yup.string()
    .max(255, "Please enter no more than 255 characters.")
    .required("Full address is required."),
});

const AddAddressForm = ({ toggle }) => {
  const dispatch = useDispatch();
  const {
    province: { provinces },
    city: { cities },
  } = useSelector((state) => state);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    dispatch(getCities(provinceId));
  };

  const handleSubmit = (values) => {
    dispatch(addAddress(values));
    toggle();
  };

  useEffect(() => {
    dispatch(getProvinces());
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addAddressSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      {(props) => (
        <Form className="space-y-3">
          <TextField label="Label" name="label" type="text" id="label" />
          <TextField
            label="Recipient"
            name="recipient_name"
            type="text"
            id="recipient-name"
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            type="text"
            id="phone-number"
          />
          <Select
            label="Province"
            name="province_id"
            id="province-id"
            onChange={(e) => {
              props.handleChange(e);
              handleProvinceChange(e);
            }}
          >
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </Select>
          <Select label="City" name="city_id" id="city-id">
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {`${city.type} ${city.name}`}
              </option>
            ))}
          </Select>
          <TextField
            label="Subdistrict"
            name="subdistrict"
            type="text"
            id="subdistrict"
          />
          <TextField
            label="Postal Code"
            name="postal_code"
            type="text"
            id="postal-code"
          />
          <TextField
            label="Full Address"
            name="full_address"
            type="text"
            id="full-address"
          />
          <button type="submit" className="btn">
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddAddressForm;
