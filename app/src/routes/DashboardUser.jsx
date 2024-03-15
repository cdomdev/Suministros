import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  HomeUser,
  Ofertas,
  Nosotros,
  Pinturas,
  CarShopInfo,
  RecoveryPage,
  DetallesProducto,
  Entrega,
  Espejos,
  Griferias,
  Lavaderos,
  Lavaplatos,
  Limpiadores,
  Paredes,
  Pegantes,
  Pisos,
  Sanitarios,
  BuscadorPage,
  PagoPage,
  Pedidos,
  FinnallyBuy,
  BañosCategoria,
  CocinasCategoria,
  ConstruccionCategoria,
  PisosParedesCategoria,
} from "../components/user/pages";

import { LoginModal } from "../components/user/autenticacion/LoginModal";
import { NavCustome } from "../components/user/Nav/NavCustome";
import {
  Profile,
  PedidosUser,
  DataUserUpdate,
} from "../components/user/pedidos/RutasPedido";
import { NotExisting } from "../components/admin/404-page/404";

export const DashboardUser = () => {
  return (
    <>
      <NavCustome />
      <Routes>
        <Route path="/suministros/baños/" element={<BañosCategoria />} />
        <Route path="/suministros/cocinas" element={<CocinasCategoria />} />
        <Route
          path="/suministros/construccionyremodelacion"
          element={<ConstruccionCategoria />}
        />
        <Route
          path="/suministros/pisosyparedes"
          element={<PisosParedesCategoria />}
        />
        <Route path="/suministros/ofertas" element={<Ofertas />} />
        <Route path="/suministros/nosotros" element={<Nosotros />} />
        <Route path="/suministros/sanitarios" element={<Sanitarios />} />
        <Route path="/suministros/griferias" element={<Griferias />} />
        <Route path="/suministros/espejos" element={<Espejos />} />
        <Route path="/suministros/pinturas" element={<Pinturas />} />
        <Route path="/suministros/pegantes" element={<Pegantes />} />
        <Route path="/suministros/limpiadores" element={<Limpiadores />} />
        <Route path="/suministros/lavaplatos" element={<Lavaplatos />} />
        <Route path="/suministros/lavaderos" element={<Lavaderos />} />
        <Route path="/suministros/pisos" element={<Pisos />} />
        <Route path="/suministros/paredes" element={<Paredes />} />
        <Route path="/suministros/categoria/pinturas" element={<Pinturas />} />
        <Route path="/suministros/categoria/pegantes" element={<Pegantes />} />
        <Route
          path="/suministros/categoria/limpiadores"
          element={<Limpiadores />}
        />

        {/* pages de productos*/}
        <Route index element={<HomeUser />} />
        <Route path="/suministros/home" element={<HomeUser />} />
        <Route
          path="/suministros/resultados-busqueda/:nombre"
          element={<BuscadorPage />}
        />
        <Route
          path="/suministros/categoria/limpiadores"
          element={<Limpiadores />}
        />

        {/* validacion */}
        <Route path="/suministros/login" element={<LoginModal />} />
        {/* recuperar contraseña */}
        <Route
          path="/suministros/recovery-password"
          element={<RecoveryPage />}
        />
        {/* pages de servicio  */}
        <Route path="/suministros/car" element={<CarShopInfo />} />
        <Route path="/suministros/entrega" element={<Entrega />} />
        <Route path="/suministros/pago" element={<PagoPage />} />

        <Route
          path="/suministros/details/:descripcion"
          element={<DetallesProducto />}
        />
        <Route
          path="/purchaseProcessCompleted/:detalles"
          element={<FinnallyBuy />}
        />

        {/* rutas anidadas */}
        <Route path="/suministros/user/" element={<Pedidos />}>
          <Route index element={<Profile />} />
          <Route path="details" element={<PedidosUser />} />
          <Route path="data" element={<DataUserUpdate />} />
        </Route>
        <Route path="*" element={<NotExisting />} />
      </Routes>
    </>
  );
};
