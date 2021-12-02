import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { updateOrder } from "../features/orders/ordersSlice";
import TextField from "./TextField";
import Loader from "./Loader";
import Select from "./Select";

const statuses = ["Pending", "Processing", "Complete", "Canceled"];

const orderSchema = Yup.object({
  status: Yup.string()
    .max(30, "Please enter no more than 30 characters.")
    .required("Status is required."),
  tracking_number: Yup.string()
    .max(15, "Please enter no more than 15 characters.")
    .nullable(),
});

const OrderForm = ({ isEditMode, closeModal, order }) => {
  const dispatch = useDispatch();
  const initialValues = {
    status: isEditMode ? order.status : "",
    tracking_number: isEditMode ? order.tracking_number || "" : "",
  };

  const handleAddOrder = (values) => {
    closeModal();
  };

  const handleUpdateOrder = (values) => {
    dispatch(
      updateOrder({
        id: order.id,
        values,
      })
    );
    closeModal();
  };

  return (
    <>
      {isEditMode && !order ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={orderSchema}
          onSubmit={(values, { resetForm }) => {
            if (isEditMode) {
              handleUpdateOrder(values);
            } else {
              handleAddOrder(values);
            }
            resetForm();
          }}
        >
          {(props) => (
            <Form className="space-y-3">
              <Select label="Status" name="status" id="status">
                {statuses.map((status, i) => (
                  <option key={i} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
              <TextField
                label="Tracking Number"
                name="tracking_number"
                type="text"
                id="tracking-number"
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

export default OrderForm;
