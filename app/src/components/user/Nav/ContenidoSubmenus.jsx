import React from "react";
import { SubMenu } from "./Submenu";

export const ContenidoSubmenus = () => {
  return (
    <>
      <div>
        <SubMenu
          link={"/suministros/baños"}
          className="submenu"
          label={"Baños"}
          items={[
            {
              label: "Sanitarios",
              to: "/suministros/sanitarios",
            },
            { label: "Griferias", to: "/suministros/griferias" },
            { label: "Espejos", to: "/suministros/espejos" },
          ]}
        />
      </div>
      <div>
        <SubMenu
          link={"/suministros/cocinas"}
          className="submenu submenu2"
          label={"Cocinas"}
          items={[
            {
              label: "Lavaplatos",
              to: "/suministros/lavaplatos",
            },
            { label: "Lavaderos", to: "/suministros/lavaderos" },
          ]}
        />
      </div>
      <div>
        <SubMenu
          link={"/suministros/construccion-remodelacion"}
          className="submenu submenu3"
          label={"Construccion y remodelacion"}
          items={[
            { label: "Pinturas", to: "/suministros/pinturas" },
            { label: "Pegantes", to: "/suministros/pegantes" },
            {
              label: "Limpiadores",
              to: "/suministros/limpiadores",
            },
          ]}
        />
      </div>
      <div>
        <SubMenu
          link={"/suministros/pisos-paredes"}
          className="submenu submenu4"
          label={"Pisos y paredes"}
          items={[
            {
              label: "Pisos ceramicos",
              to: "/suministros/pisos",
            },
            { label: "Paredes", to: "/suministros/paredes" },
          ]}
        />
      </div>
    </>
  );
};
