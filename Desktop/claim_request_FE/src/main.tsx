import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReactQueryProvider } from "./context/ReactQueryProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/index.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </Provider>
  </BrowserRouter>
);
