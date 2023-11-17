import { removeLocalUser, setLocalUser } from "helper/auth";
import createApiRequestAction from "redux/createApiRequestAction";

const loginUser = createApiRequestAction(
  "auth/loginUser",
  async ({ apiClient }, data) => {
    const response = await apiClient("/auth/loginAdmin", "post", data);
    if (response.status === "01") {
      setLocalUser(response)
      return {
        redirectUrl: "/admin/dashboard"
      }
    }
    return response
  }
);
const logoutUser = createApiRequestAction(
  "auth/logoutUser",
  async () => {
    removeLocalUser();
    return {
      redirectUrl: "/auth/sign-in"
    }
  }
);

const authActions = {
  loginUser,
  logoutUser
};

export default authActions