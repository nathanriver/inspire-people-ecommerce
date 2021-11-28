import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCategories,
  deleteCategory,
} from "../../features/categories/categoriesSlice";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/Loader";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableBody from "../../components/Table/TableBody";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";
import CategoryForm from "../../components/CategoryForm";
import FormModal from "../../components/FormModal";
import Error from "../../components/Error";
import ConfirmationModal from "../../components/ConfirmationModal";

const Category = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector(
    (state) => state.categories
  );

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <AdminLayout title="Categories">
      {error ? (
        <Error error={error} />
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <p className="font-bold mb-4">Categories</p>
          <div className="flex justify-end mb-3">
            <FormModal
              triggerBtn={{
                type: "normal",
                text: "Add Category",
              }}
              title="Add Category"
            >
              <CategoryForm isEditMode={false} />
            </FormModal>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, i) => (
                <TableRow key={category.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Link
                        className="btn-outline py-1 px-3"
                        to={`categories/${category.id}/sizes`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </Link>
                      <Link
                        className="btn-outline py-1 px-3"
                        to={`categories/${category.id}/products`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          />
                        </svg>
                      </Link>
                      <FormModal
                        triggerBtn={{
                          type: "icon",
                          icon: (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          ),
                        }}
                        title="Update Category"
                      >
                        <CategoryForm isEditMode={true} category={category} />
                      </FormModal>
                      <ConfirmationModal
                        title="Confirm Delete Category"
                        triggerBtn={{
                          type: "icon",
                          icon: (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          ),
                        }}
                        contentText="Are you sure want to delete the category?"
                        actionBtnText="Delete"
                        action={() => handleDeleteCategory(category.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </AdminLayout>
  );
};

export default Category;
