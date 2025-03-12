import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReactQueryProvider } from "./context/ReactQueryProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/index.ts";
import { BrowserRouter } from "react-router-dom";
import { ReactToastifyProvider } from "./context/ReactToastifyProvider.tsx";
import { NotificationProvider } from "./components/ui/Notification/NotificationContext.tsx";
import LoadingOverlay from "./components/ui/Loading/LoadingOverlay.tsx";
import { LoadingProvider } from "./components/ui/Loading/LoadingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ReactToastifyProvider>
    <BrowserRouter>
      <Provider store={store}>
        <ReactQueryProvider>
          <LoadingProvider>
            <NotificationProvider>
              <LoadingOverlay />
              <App />
            </NotificationProvider>
          </LoadingProvider>
        </ReactQueryProvider>
      </Provider>
    </BrowserRouter>
  </ReactToastifyProvider>
);
