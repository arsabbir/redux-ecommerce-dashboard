import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all permission

export const getAllPermission = createAsyncThunk(
  "user/getAllPermission",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/v1/permission",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Create a new permission
export const createPermission = createAsyncThunk(
  "user/createPermission",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/permission",
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Delete Permission
export const deletePermission = createAsyncThunk(
  "user/deletePermission",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/permission/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// update status permissions
export const updateStatusPermission = createAsyncThunk(
  "user/updateStatusPermission",
  async ({ status, id }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/permission/status/${id}`,
        { status },
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.respnse.data.message);
    }
  }
);

export const getAllRoles = createAsyncThunk("user/getAllRoles", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/role", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Create a new permission
export const createRole = createAsyncThunk("user/createRole", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/role",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// update status role
export const updateStatusRole = createAsyncThunk(
  "user/updateStatusRole",
  async ({ status, id }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/role/status/${id}`,
        { status },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Delete Permission
export const deleteRole = createAsyncThunk("user/deleteRole", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/role/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.respnse.data.message);
  }
});

// update  role
export const updateRole = createAsyncThunk("user/updateRole", async (data) => {
  try {
    const response = await axios.patch(
      `http://localhost:5050/api/v1/role/${data.id}`,
      data,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Create a new user
export const createUser = createAsyncThunk("user/createUser", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/user",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get all user
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/user", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Delete User
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/user/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.respnse.data.message);
  }
});

// update status user
export const updateStatusUser = createAsyncThunk(
  "user/updateStatusUser",
  async ({ status, id }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/user/status/${id}`,
        { status },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get all user
export const getAllBrands = createAsyncThunk("brand/getAllBrands", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/brand", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Create a new brand
export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/brand",
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// update  Brand
export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async (data) => {
    console.log(data);
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/brand/${data._id}`,
        data,
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);



// Delete Permission
export const deleteBrand = createAsyncThunk("brand/deleteBrand", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/brand/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.respnse.data.message);
  }
});





// update status brand
export const updateStatusBrand = createAsyncThunk(
  "brand/updateStatusBrand",
  async ({ status, id }) => {
    
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/brand/status/${id}`,
        { status },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);