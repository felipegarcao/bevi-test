import ReactDOM from "react-dom/client";
import Routes from "./main/routes/index.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./infra/redux-store/store.ts";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";
import { PersistStore } from "./main/infra/persistStore.tsx";
import { WatchVerifyExpiresToken } from "./presentation/components/WatchVerifyExpiresToken.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PersistStore>
      <Provider store={store}>
        <WatchVerifyExpiresToken>
          <Routes />
        </WatchVerifyExpiresToken>
      </Provider>
    </PersistStore>

    <ToastContainer
      limit={1}
      pauseOnFocusLoss={false}
      toastStyle={{
        fontSize: 14,
      }}
    />
  </BrowserRouter>
);
