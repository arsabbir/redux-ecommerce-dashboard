import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { timeAgo } from "../../helper/helper.js";
import useFormFields from "../../hooks/useFormFields.js";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  createUser,
  deleteBrand,
  updateBrand,
  updateStatusBrand,
  updateStatusUser,
} from "../../features/user/userApiSlice.js";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice.js";
import { createToast } from "../../utils/toast.js";
import swal from "sweetalert";

const Brand = () => {
  const dispatch = useDispatch();
  const { error, message, brand } = useSelector(getAllPermissionData);

  const [file, setFile] = useState([]);
  const [brandEdit, setBrandEdit] = useState({});
  const { input, setInput, resetForm, hanldeInputChange } = useFormFields({
    name: "",
    photo: "",
  });

  // user create submit
  const brandHandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);

    file.forEach((item) => {
      formData.append("brand-photo", item);
    });
    dispatch(createBrand(formData));
    setFile();
    resetForm();
  };

  const hanldeFileChange = (e) => {
    const preView = e.target.files;
    setFile((prevState) => [...prevState, ...preView]);
  };

  // handle role edit
  const handleEditBrand = (id) => {
    const editData = brand.find((data) => data._id == id);
    setBrandEdit(editData);
  };

  // hanldeRoleUpdateSubmit
  const brandHandleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBrand(brandEdit));
  };

  // handle status update
  const handleStatusUpdate = (status, id) => {
    swal({
      title: "Sure",
      text: "Are you sure you want to update the status",
      icon: "error",
      buttons: true,
      dangerMode: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        dispatch(updateStatusBrand({ status, id }));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // user delete hanlde
  const brandHandleDelete = (id) => {
    swal({
      title: "Sure",
      text: "Are you sure you want to delete",
      icon: "error",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteBrand(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const hanldeBrandEditChange = (e) => {
    e.preventDefault();
    setBrandEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, brand, dispatch]);

  useEffect(() => {
    new DataTable(".table");
  });
  return (
    <>
      <div className="page-header">
        <PageHeader title="Brands" />
      </div>
      <ModalPopup target="brandModalPopup">
        <form onSubmit={brandHandleSubmit}>
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              value={input.name}
              className="form-control"
              onChange={hanldeInputChange}
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Photo</label>
            <input
              type="file"
              className="form-control"
              onChange={hanldeFileChange}
            />
          </div>

          <div className="my-3">
            <button className="btn btn-primary" type="submit">
              Add New Brand
            </button>
          </div>
          {file?.length > 0 &&
            file.map((item, index) => {
              const imgUrl = URL.createObjectURL(item); // Corrected function name
              return (
                <div className="my-3" key={index}>
                  <img
                    style={{
                      height: "200px",
                      width: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    src={imgUrl}
                    alt=""
                  />
                </div>
              );
            })}
        </form>
      </ModalPopup>
      <ModalPopup target="brandEditModal">
        <form onSubmit={brandHandleUpdateSubmit}>
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              value={brandEdit.name}
              className="form-control"
              onChange={hanldeBrandEditChange}
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Photo</label>
            <input
              type="file"
              className="form-control"
              onChange={hanldeFileChange}
            />
          </div>

          <div className="my-3">
            <button className="btn btn-primary" type="submit">
              Update Brand
            </button>
          </div>
          {file &&
            file.map((item, index) => {
              const imgUrl = URL.createObjectURL(item); // Corrected function name
              return (
                <div className="my-3" key={index}>
                  <img
                    style={{
                      height: "200px",
                      width: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    src={imgUrl}
                    alt=""
                  />
                </div>
              );
            })}
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <button
              className="btn btn-primary "
              data-target="#brandModalPopup"
              data-toggle="modal"
            >
              Add New Brand
            </button>
            <div className="card-body">
              <div className="table-responsive">
                {brand && (
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Photo</th>
                        <th>Create At</th>
                        <th>status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brand?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.name}</td>

                            <td>{item?.slug}</td>
                            <td>
                              <img
                                className="img_con"
                                src={item?.photo}
                                alt=""
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                }}
                              />
                            </td>

                            <td>{timeAgo(item?.createdAt)}</td>

                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={item?.status ? true : false}
                                />
                                <label
                                  onClick={() =>
                                    handleStatusUpdate(item.status, item._id)
                                  }
                                  htmlFor="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="">
                              <button
                                className="btn btn-warning mr-1 btn-sm"
                                data-toggle="modal"
                                data-target="#brandEditModal"
                                onClick={() => handleEditBrand(item._id)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                onClick={() => brandHandleDelete(item._id)}
                                className="btn btn-danger  btn-sm"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brand;
