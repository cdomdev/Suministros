import React from "react";
import { RutasAside } from "../aside";

export const Layout = ({ component, title }) => {
  return (
    <div className="layout-body-admin">
      <div className="aside-admin">
        <aside>
          <RutasAside />
        </aside>
      </div>
      <div className="header-admin">
        <header>
          <h1>{title}</h1>
        </header>
      </div>
      <div className="body-content">
        <div>{component}</div>
      </div>
    </div>
  );
};
