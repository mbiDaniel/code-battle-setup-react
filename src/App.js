import { AppContextProvider } from "context";
import StoreWrapper from "./redux/storeWrapper";
import Router from "./routes";

function App() {
  return (
    <StoreWrapper>
      <AppContextProvider>
        <Router />
      </AppContextProvider>
    </StoreWrapper>
  );
}

export default App;
