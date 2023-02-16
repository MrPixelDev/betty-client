import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { IStoresObject } from "./models/IStore";
import { initStores } from "./store/initStores";
import { SnackbarProvider } from "notistack";

const stores = initStores();

// Context API from react, to use init stores in any part of app
export const Context = createContext<IStoresObject>(stores);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Context Provider needs value that it provides to children */}
    <Context.Provider value={stores}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Context.Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
if (
  process.env.NODE_ENV === "development" ||
  process.env.REACT_APP_ENV === "DEV"
) {
  serviceWorkerRegistration.register();
} else {
  serviceWorkerRegistration.unregister();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
