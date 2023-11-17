import { Provider } from "react-redux";
import apiClient from "../api";
import createStore from "./createStore";

export default function StoreWrapper({ children }) {


  const clientStore = createStore({
    apiClient,
    preloadedState: {},
  });

  return <Provider store={clientStore}>{children}</Provider>;
}
