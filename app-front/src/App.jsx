import React from "react";
import { UserRoleProvider } from "./hook/UserRoleProvider";
import { BrowserRouter } from "react-router-dom";
import { DashboardUser } from "./routes/DashboardUser";


export const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <UserRoleProvider>
            <DashboardUser />
          </UserRoleProvider>
        </div>
      </BrowserRouter>
    </>
  );
};
