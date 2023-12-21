import React from "react";
import { UserDataProvider } from "./hook/UserDataProvider";
import { BrowserRouter } from "react-router-dom";
import { DashboardUser } from "./routes/DashboardUser";


export const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <UserDataProvider>
            <DashboardUser />
          </UserDataProvider>
        </div>
      </BrowserRouter>
    </>
  );
};
