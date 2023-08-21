import { useEffect, } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { generateRandomPassword, timeAgo } from "../../helper/helper.js";
import useFormFields from "../../hooks/useFormFields.js";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  updateStatusUser,
} from "../../features/user/userApiSlice.js";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice.js";
import { createToast } from "../../utils/toast.js";
import swal from "sweetalert";

const User = () => {
  const dispatch = useDispatch();
  const { error, message, user, role } = useSelector(getAllPermissionData);
  console.log(message);

  const { input, setInput, resetForm, hanldeInputChange } = useFormFields({
    name: "",
    email: "",
    password: "",
  });

  // hanldeRandPass
  const hanldeRandPass = () => {
    const random = generateRandomPassword();
    setInput((prevState) => ({ ...prevState, password: random }));
  };

  // user create submit
  const userHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(input));
    resetForm();
  };

  // handle status update
  const handleStatusUpdate = (status, id) => {
    dispatch(updateStatusUser({ status, id }));
  };

  // user delete hanlde
  const userHandleDelete = (id) => {
    swal({
      title: "Sure",
      text: "Are you sure you want to delete",
      icon: "error",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUser(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
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
  }, [error, message, user, dispatch]);

  useEffect(() => {
    new DataTable(".table");
  });
  return (
    <>
      <div className="page-header">
        <PageHeader title="Users" />
      </div>
      <ModalPopup target="userModalPopup">
        <form onSubmit={userHandleSubmit}>
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
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              value={input.email}
              className="form-control"
              onChange={hanldeInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Password</label>
            <input
              type="text"
              value={input.password}
              name="password"
              className="form-control"
              onChange={hanldeInputChange}
            />
            <a className="badge badge-info text-light" onClick={hanldeRandPass}>
              Generate Password
            </a>
          </div>

          <div className="my-3">
            <select onChange={hanldeInputChange} name="role" value={input.role}>
              <option value="">-select-</option>
              {role?.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-3">
            <button className="btn btn-primary" type="submit">
              Add New User
            </button>
          </div>
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <button
              className="btn btn-primary "
              data-target="#userModalPopup"
              data-toggle="modal"
            >
              Add New User
            </button>
            <div className="card-body">
              <div className="table-responsive">
                {user && (
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Create At</th>
                        <th>status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.name}</td>
                            <td>{item?.email}</td>
                            <td>{item?.role?.name}</td>
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
                              <button className="btn btn-warning mr-1 btn-sm">
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                onClick={() => userHandleDelete(item._id)}
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

export default User;
