import { useEffect, useState } from "react";

import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import useFormFields from "../../hooks/useFormFields.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice.js";
import { createToast } from "../../utils/toast.js";
import {
  createRole,
  deleteRole,
  updateRole,
  updateStatusRole,
} from "../../features/user/userApiSlice.js";
import { timeAgo } from "../../helper/helper.js";
import swal from "sweetalert";

const Role = () => {
  const dispatch = useDispatch();
  const { permission, error, message, role } =
    useSelector(getAllPermissionData);

  const { input, hanldeInputChange, resetForm } = useFormFields({
    name: "",
  });

  const [selected, setSelected] = useState([]);
  const [roleEdit, setRoleEdit] = useState({});

  // check box handle change
  const handleCheckboxChange = (e) => {
    const val = e.target.value;
    const updateList = [...selected];

    if (selected.includes(val)) {
      updateList.splice(selected.indexOf(val), 1);
    } else {
      updateList.push(val);
    }
    setSelected(updateList);
  };

  // hanldeRoleSubmit
  const hanldeRoleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    dispatch(
      createRole({
        name: input.name,
        permissions: [...selected],
      })
    );

    resetForm();
    setSelected([]);
  };

  // handle status update
  const handleStatusUpdate = (status, id) => {
    dispatch(updateStatusRole({ status, id }));
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
        dispatch(deleteRole(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // handle role edit
  const handleEditRole = (id) => {
    const editData = role.find((data) => data._id == id);
    setRoleEdit(editData);
    setSelected(editData.permissions);
  };
  const hanldeRoleEditChange = (e) => {
    e.preventDefault();
    setRoleEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
 
  // hanldeRoleUpdateSubmit
  const hanldeRoleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateRole({
        name: roleEdit.name,
        permissions:selected,
        id: roleEdit._id,
      })
    );
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
  }, [error, message, dispatch]);

  // data table setup
  useEffect(() => {
    new DataTable(".table");
  });
  return (
    <>
      <div className="page-header">
        <PageHeader title="Roles" />
      </div>

      {/* role add modal show  */}
      <ModalPopup target="roleModalPopup">
        <form onSubmit={hanldeRoleSubmit}>
          <div className="my-3">
            <label htmlFor="">Role Name</label>
            <input
              value={input.name}
              type="text"
              className="form-control"
              name="name"
              onChange={hanldeInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Permissions</label>
            {permission &&
              permission.map((item, index) => {
                return (
                  <label
                    htmlFor=""
                    style={{ display: "flex", gap: "10px" }}
                    key={index}
                  >
                    <input
                      value={item.name}
                      checked={selected?.includes(item.name)}
                      type="checkbox"
                      onChange={handleCheckboxChange}
                    />
                    {item.name}
                  </label>
                );
              })}
          </div>
          <div className="my-3">
            <button className="btn btn-primary" type="submit">
              Add new Role
            </button>
          </div>
        </form>
      </ModalPopup>

      {/* edit modal show */}
      <ModalPopup target="roleEdit">
        <form onSubmit={hanldeRoleUpdateSubmit}>
          <div className="my-3">
            <label htmlFor="">Role Name</label>
            <input
              value={roleEdit.name}
              type="text"
              className="form-control"
              name="name"
              onChange={hanldeRoleEditChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Permissions</label>
            {permission &&
              permission.map((item, index) => {
                return (
                  <label
                    htmlFor=""
                    style={{ display: "flex", gap: "10px" }}
                    key={index}
                  >
                    <input
                      value={item.name}
                      checked={selected.includes(item.name)}
                      type="checkbox"
                      onChange={handleCheckboxChange}
                    />
                    {item.name}
                  </label>
                );
              })}
          </div>
          <div className="my-3">
            <button className="btn btn-primary" type="submit">
              Add new Role
            </button>
          </div>
        </form>
      </ModalPopup>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <button
              className="btn btn-primary "
              data-target="#roleModalPopup"
              data-toggle="modal"
            >
              Add New Role
            </button>
            <div className="card-body">
              <div className="table-responsive">
                {role && (
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Role Name</th>
                        <th>Slug</th>
                        <th>Permission</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {role?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "50px" }}>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>
                              <ul>
                                {item.permissions.map((per, index) => {
                                  return <li key={index}>{per}</li>;
                                })}
                              </ul>
                            </td>
                            <td>{timeAgo(item.createdAt)}</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  // checked={item.status}
                                  checked={item.status ? true : false}
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
                                className="btn btn-warning btn-sm mr-1"
                                data-toggle="modal"
                                data-target="#roleEdit"
                                onClick={() => handleEditRole(item._id)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
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

export default Role;
