export const isActionSuccess = (
  action = {},
  toast = () => {},
  errorText = "An error occured"
) => {
  if (action.meta.requestStatus === "fulfilled") {
    return true;
  } else {
    toast({ title: errorText, status: "error" });
    return false;
  }
};
