import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { DecodedJWT } from "../utils/DecodedJWT";
import { useNavigate } from "react-router-dom";
import { SaveStorage } from "../helper/SaveStorage";
import { useUserRole } from "../hook/UserRoleProvider";

const CLIENT_ID = import.meta.env.VITE_USER_ID_CLIENT;

export const BtnGoogle = ({ handleCloseModal, setIsLoggedIn }) => {
  const [email, setEmail] = useState(null);
  const [message, setMesage] = useState("");
  const { setUserRole } = useUserRole();
  const navigate = useNavigate();

  async function handleSuccess(credentialResponse) {
    if (credentialResponse.credential) {
      const { payload } = DecodedJWT(credentialResponse.credential);
      try {
        const URL = "http://localhost:3000/registro";
        const response = await axios.post(URL, {
          googleToken: credentialResponse.credential,
        });
        const { role, token } = response.data;

        SaveStorage("userSesionToken", token);
        if (response.status === 200 || response.status === 201) {
          setMesage("Inicio de sesion exitoso");
          handleCloseModal();
          setIsLoggedIn(true);
          setUserRole(role);
          if (role === "admin") {
            navigate("/admin");
            setEmail(true);
          } else {
            navigate("/home");
          }
        } else {
          setMesage("Hubo con problemas con el incio de sesion");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  function handleError() {
    console.log("error");
  }

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      {email === null && (
        <div className="container-btn-login">
          <GoogleLogin
            onError={handleError}
            onSuccess={handleSuccess}
            useOneTap
            setIsLoggedIn={setIsLoggedIn}
            handleCloseModal={handleCloseModal}
            locale="es"
            logo_alignment="center"
            size="large"
            theme="filled_blue"
            shape="circle"
            width='300'
          />
        </div>
      )}
      {email && <p>Email de usuario {email} </p>}
    </GoogleOAuthProvider>
  );
};
