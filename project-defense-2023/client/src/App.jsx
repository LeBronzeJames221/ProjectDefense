import { Route, Routes } from "react-router-dom";

import { Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/authContext.jsx";

import Home from "./components/home/Home.jsx";
import CarCreate from "./components/car-create/CarCreate.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import Logout from "./components/logout/Logout.jsx";
import CarEdit from "./components/car-edit/CarEdit.jsx";
import UserRouteGuard from "./components/guards/UserRouteGuard.jsx";
import GuestRouteGuard from "./components/guards/GuestRouteGuard.jsx";
import ErrorPage from "./components/error-page/ErrorPage.jsx";
import Header from "./components/header/Header.jsx";
import Garage from "./components/garage/Garage.jsx";
const CarDetails = lazy(() =>
  import("./components/car-details/CarDetails.jsx")
);

function App() {
  return (
    <AuthProvider>
      <>
        <Header />
        <Suspense fallback={<p>LOADING PLEASE WAIT....</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Garage />} />
            <Route path="/cars/:carId" element={<CarDetails />} />
            <Route path="*" element={<ErrorPage />} />

            <Route element={<UserRouteGuard />}>
              <Route path="/cars/create" element={<CarCreate />} />
              <Route path="/cars/:carId/edit" element={<CarEdit />} />
              <Route path="/logout" element={<Logout />} />
            </Route>

            <Route element={<GuestRouteGuard />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Suspense>
      </>
    </AuthProvider>
  );
}

export default App;
