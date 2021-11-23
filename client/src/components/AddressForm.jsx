import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { API } from "../config";
import { addAddress, updateAddress } from "../features/address/addressSlice";
import TextField from "./TextField";
import Select from "./Select";
import Loader from "./Loader";

const addressSchema = Yup.object({
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

const AddAddressForm = ({ isEditMode, closeModal, address }) => {
  const dispatch = useDispatch();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const initialValues = {
    label: isEditMode ? address.label : "",
    recipient_name: isEditMode ? address.recipient_name : "",
    phone_number: isEditMode ? address.phone_number : "",
    province_id: isEditMode ? address.city.province_id : "",
    city_id: isEditMode ? address.city_id : "",
    subdistrict: isEditMode ? address.subdistrict : "",
    postal_code: isEditMode ? address.postal_code : "",
    full_address: isEditMode ? address.full_address : "",
  };

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    const getCities = async () => {
      const { data } = await API.get(`/cities?province_id=${provinceId}`);
      setCities(data);
    };
    getCities();
  };

  const handleAddAddress = (values) => {
    dispatch(addAddress(values));
    closeModal();
  };

  const handleUpdateAddress = (values) => {
    dispatch(
      updateAddress({
        id: address.uuid,
        updateData: values,
      })
    );
    closeModal();
  };

  useEffect(() => {
    const getCities = async () => {
      const { data } = await API.get(
        `/cities?province_id=${address.city.province_id}`
      );
      setCities(data);
    };

    const getProvinces = async () => {
      const { data } = await API.get("/provinces");
      setProvinces(data);
    };

    getProvinces();

    if (isEditMode) {
      getCities();
    }
  }, [isEditMode, address]);

  return (
    <>
      {isEditMode && !cities ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={addressSchema}
          onSubmit={(values, { resetForm }) => {
            if (isEditMode) {
              handleUpdateAddress(values);
            } else {
              handleAddAddress(values);
            }
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
                {isEditMode ? "Update" : "Add"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddAddressForm;
