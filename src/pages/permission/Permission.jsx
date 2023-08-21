import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
  createPermission,
  deletePermission,
  updateStatusPermission,
} from "../../features/user/userApiSlice.js";
import { createToast } from "../../utils/toast.js";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice.js";
import { timeAgo } from "../../helper/helper.js";
const Permission = () => {
  const { permission } = useSelector(getAllPermissionData);

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
  });
  const { error, message } = useSelector((state) => state.user);
  const hanldeInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
// 
  const hanldeFormSubmit = (e) => {
    e.preventDefault();
    if (!input.name) {
      createToast("Permission name is required", "error");
      dispatch(setMessageEmpty());
    } else {
      dispatch(createPermission(input));
    }
  };

  // hanlde delete permission
  const hanldeDelete = (id) => {
    swal({
      title: "Sure",
      text: "Are you sure you want to delete",
      icon: "error",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePermission(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // handle status update
  const handleStatusUpdate = (status, id) => {
    dispatch(updateStatusPermission({ status, id }));
  };
  useEffect(() => {
    if (error && permission) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, permission, dispatch]);

  useEffect(() => {
    new DataTable(".table");
  });
  return (
    <>
      <div className="page-header">
        <PageHeader title="Permission" />
      </div>
      <ModalPopup target="permissionModalPopup">
        <form onSubmit={hanldeFormSubmit}>
          <div className="my-3">
            <label htmlFor="">Permission Name</label>
            <input
              value={input.name}
              onChange={hanldeInputChange}
              type="text"
              className="form-control"
              name="name"
            />
          </div>
          <div className="my-3">
            <button className="btn btn-primary" type="submit">
              Add new Permission
            </button>
          </div>
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <button
              className="btn btn-primary "
              data-target="#permissionModalPopup"
              data-toggle="modal"
            >
              Add New Permission
            </button>
            <div className="card-body">
              <div className="table-responsive">
                {permission && (
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Created</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...permission].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "50px" }}>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>{timeAgo(item.createdAt)}</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={item.status ? true : false}
                                  // checked={item.status}
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
                                onClick={() => hanldeDelete(item._id)}
                                className="btn btn-danger btn-sm"
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

export default Permission;
