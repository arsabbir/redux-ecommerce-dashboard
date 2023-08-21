import { createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  createPermission,
  createRole,
  createUser,
  deleteBrand,
  deletePermission,
  deleteRole,
  deleteUser,
  getAllBrands,
  getAllPermission,
  getAllRoles,
  getAllUsers,
  updateBrand,
  updateRole,
  updateStatusBrand,
  updateStatusPermission,
  updateStatusRole,
  updateStatusUser,
} from "./userApiSlice.js";
// create auth slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    permission: null,
    error: null,
    message: null,
    role: null,
    user: null,
    brand: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllPermission.fulfilled, (state, action) => {
        state.permission = action.payload;
      })
      // create permission
      .addCase(createPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permission = state.permission ?? [];
        state.message = action.payload.message;
        state.permission.push(action.payload.permission);
      })
      // delete permission
      .addCase(deletePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permission = state.permission.filter(
          (data) => data._id != action.payload._id
        );
      })
      // status update
      .addCase(updateStatusPermission.rejected, (state, action) => {
        state.error = action.payload.error;
      })

      .addCase(updateStatusPermission.fulfilled, (state, action) => {
        state.permission[
          state.permission.findIndex(
            (data) => data._id == action.payload.permission._id
          )
        ] = action.payload.permission;

        console.log(action.payload);
        state.message = action.payload.message;
      })

      // get roles
      .addCase(getAllRoles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.role = action.payload;
      })

      // create role
      .addCase(createRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.role = state.role ?? [];
        state.message = action.payload.message;
        state.role.push(action.payload.role);
      })
      // update status role
      .addCase(updateStatusRole.fulfilled, (state, action) => {
        state.role[
          state.role.findIndex((data) => data._id == action.payload.role._id)
        ] = action.payload.role;
        state.message = action.payload.message;
      })

      // delete role
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role = state.role.filter(
          (data) => data._id != action.payload._id
        );
      })
      // update role
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(updateRole.fulfilled, (state, action) => {
        state.role[
          state.role.findIndex((data) => data._id == action.payload.role._id)
        ] = action.payload.role;
        state.message = action.payload.message;
      })

      // create role
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = state.user ?? [];
        state.user.push(action.payload.user);
        state.message = action.payload.message;
      })
      // get all user
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // delete user
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = state.user.filter(
          (data) => data._id != action.payload._id
        );
        state.message = action.payload.message;
      })

      // update status user
      .addCase(updateStatusUser.fulfilled, (state, action) => {
        state.user[
          state.user.findIndex((data) => data._id == action.payload.user._id)
        ] = action.payload.user;
        state.message = action.payload.message;
      })

      // get all user
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.brand = action.payload;
      })

      // create role
      .addCase(createBrand.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brand = state.brand ?? [];
        state.brand.push(action.payload.brand);
        state.message = action.payload.message;
      })

      // update Brand
      .addCase(updateBrand.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(updateBrand.fulfilled, (state, action) => {
        state.brand[
          state.brand.findIndex((data) => data._id == action.payload.brand._id)
        ] = action.payload.brand;
        state.message = action.payload.message;
      })

      // delete user
      .addCase(deleteBrand.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brand = state.brand.filter(
          (data) => data._id != action.payload._id
        );
        state.message = action.payload.message;
      })

      // update status brand
      .addCase(updateStatusBrand.fulfilled, (state, action) => {

        
        state.brand[
          state.brand.findIndex((data) => data._id == action.payload.brand._id)
        ] = action.payload.brand;
        state.message = action.payload.message;
      });
  },
});

// export selector
export const getAllPermissionData = (state) => state.user;
// export actions
export const { setMessageEmpty } = userSlice.actions;

// export
export default userSlice.reducer;
