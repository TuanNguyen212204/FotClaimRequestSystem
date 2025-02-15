import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReactQueryProvider } from "./context/ReactQueryProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/index.ts";
import { BrowserRouter } from "react-router-dom";
import { ReactToastifyProvider } from "./context/ReactToastifyProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ReactToastifyProvider>
    <BrowserRouter>
      <Provider store={store}>
        <ReactQueryProvider>
          <App />
        </ReactQueryProvider>
      </Provider>
    </BrowserRouter>
  </ReactToastifyProvider>
);
