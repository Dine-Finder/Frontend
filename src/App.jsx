import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignInAndSignUp from "./Components/SignInAndSignUp";
import Homepage from "./pages/Homepage";
import Layout from "./pages/Layout";
import RequireAuth from "./pages/RequireAuth";
import UserMap from "./Components/UserMap";
import AdminHome from "./pages/AdminHome";
export default function App() {
  const ROLES = {
    User: "User",
    Admin: "Admin",
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Here enter public Routes */}
          <Route path="" element={<Homepage />} />
          <Route path="/login" element={<SignInAndSignUp />} />

          {/* Enter Admin Routes here */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<AdminHome />}></Route>
          </Route>

          {/* Here Enter User Routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="user" element={<UserMap />}></Route>
          </Route>

          {/* catch All Page Not foud Route */}
          {/* <Route path="unauthorised" element={<UnauthorisedPage />} /> */}
        </Route>
      </Routes>
    </>
  );
}
