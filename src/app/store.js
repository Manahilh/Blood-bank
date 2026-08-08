import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import donorReducer from "../features/donors/donorSlice";
import requestReducer from "../features/requests/requestSlice";
import adminReducer from "../features/admin/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    donors: donorReducer,
    requests: requestReducer,
    admin: adminReducer,
  },
});

export default store;