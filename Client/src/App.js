import Sidenav from "./components/Sidenav";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthTabs from "../src/pages/authentication/authTab";
import Login from "../src/pages/authentication/Login";
import ForgotPassword from "../src/pages/authentication/ForgotPassword";
import Settings from "./pages/Settings";
import ProtectedRoute from "./pages/authentication/ProtectedRoute";

import CashierDashboard from "./pages/Cashier";
import WaiterDashboard from "./pages/Waiters";
import kitchenDashboard from "./pages/Kitchen";
import BaristaDashboard from "./pages/Barista";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthTabs />} exact />
          <Route
            path="/waiters"
            element={<ProtectedRoute element={WaiterDashboard} />}
            exact
          />

          <Route
            path="/cashier"
            element={<ProtectedRoute element={CashierDashboard} />}
            exact
          />

          <Route
            path="/kitchen"
            element={<ProtectedRoute element={kitchenDashboard} />}
            exact
          />

          <Route
            path="/barista"
            element={<ProtectedRoute element={BaristaDashboard} />}
            exact
          />

          <Route
            path="/settings"
            element={<ProtectedRoute element={Settings} />}
            exact
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
