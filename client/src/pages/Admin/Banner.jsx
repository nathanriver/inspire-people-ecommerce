import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/Loader";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableBody from "../../components/Table/TableBody";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";

const Banner = () => {
  const [banners, setBanners] = useState(null);

  useEffect(() => {
    const getBanners = async () => {
      const { data } = await API.get("/banners");
      setBanners(data);
    };
    getBanners();
  }, []);

  return (
    <AdminLayout>
      {!banners ? (
        <Loader />
      ) : (
        <>
          <p className="font-bold mb-4">Banners</p>
          <div className="flex justify-end">
            <button className="btn mb-3">Add Banner</button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Is Active</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banners.map((banner, i) => (
                <TableRow key={banner.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={banner.image_url}
                    >
                      <img
                        className="max-w-none w-52"
                        src={banner.image_url}
                        alt={`banner-${i}`}
                      />
                    </a>
                  </TableCell>
                  <TableCell>{banner.is_active ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <button className="btn-outline py-1 px-3">
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
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </button>
                      <button className="btn-outline py-1 px-3">
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
                      </button>
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

export default Banner;
