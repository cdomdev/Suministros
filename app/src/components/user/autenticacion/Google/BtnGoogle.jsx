import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { DecodedJWT } from "../../../../utils/DecodedJWT";
import { useNavigate } from "react-router-dom";
import EventEmitter from "../../../../hook/EventEmitter";
import { useUser } from "../../../../hook/UserDataProvider";
import { SaveStorage } from "../../../../utils";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export const BtnGoogle = ({ handleCloseModal, handleLoginSuccess }) => {
  const [email, setEmail] = useState(null);
  const [message, setMesage] = useState("");
  const navigate = useNavigate();

  const { login, setUser, setIsLoggedIn } = useUser();

  useEffect(() => {
    const authChangeCallback = (isLoggedIn) => {
      if (isLoggedIn) {
      }
    };
    const unsubscribe = EventEmitter.subscribe(
      "authChange",
      authChangeCallback
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const notifyAuthChange = (isLoggedIn) => {
    EventEmitter.emit("authChange", isLoggedIn);
  };

  async function handleSuccess(credentialResponse) {
    if (credentialResponse.credential) {
      const { payload } = DecodedJWT(credentialResponse.credential);

      try {
        const URL = "http://localhost:3000/registro";
        const response = await axios.post(URL, {
          googleToken: credentialResponse.credential,
        });
        const { role, token, name, email, picture } = response.data;
        const dataUserSesion = {
          role: role,
          name: name,
          email: email,
          picture: picture,
        };

        SaveStorage("userSesionToken", JSON.stringify(dataUserSesion));

        // localStorage.setItem("userSesionToken", JSON.stringify(dataUserSesion));
        const previousLocation = sessionStorage.getItem("previousLocation");

        if (response.status === 200 || response.status === 201) {
          console.log(response);
          login(response.data);
          handleLoginSuccess("actualizado", true);
          notifyAuthChange(true);
          setMesage("Inicio de sesion exitoso");
          handleCloseModal();
          if (role === "admin") {
            navigate("/admin");
            setEmail(true);
          } else {
            navigate(previousLocation || "/");
          }
        } else {
          setMesage("Hubo problemas con el incio de sesion");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  function handleError() {
    setMesage("Hubo un problema durante la autenticación");
    console.error("Error durante la autenticación:", error.message);
  }

  return (
    <div className="container-btn-login">
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        {email === null && (
          <>
            <GoogleLogin
              onError={handleError}
              onSuccess={handleSuccess}
              useOneTap
              setIsLoggedIn={setIsLoggedIn}
              handleCloseModal={handleCloseModal}
              locale="es"
              logo_alignment="center"
              size="large"
              theme="outline"
              shape="circle"
              width="300"
            />
          </>
        )}
        {email && <p>Email de usuario {email} </p>}
      </GoogleOAuthProvider>
    </div>
  );
};

