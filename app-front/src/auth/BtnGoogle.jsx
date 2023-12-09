import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { DecodedJWT } from "../utils/DecodedJWT";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { SaveStorage } from "../helper/SaveStorage";

const CLIENT_ID = import.meta.env.VITE_USER_ID_CLIENT;

export const BtnGoogle = ({handleCloseModal,  setIsLoggedIn}) => {
  const [email, setEmail] = useState(null);
  const [message, setMesage] = useState("");
  const navigate = useNavigate();

  async function handleSuccess(credentialResponse) {
    if (credentialResponse.credential) {
      const { payload } = DecodedJWT(credentialResponse.credential);
      try {
        const URL = "http://localhost:3000/registro";
        const response = await axios.post(URL, {
          googleToken: credentialResponse.credential,
        });
        const {role, token} = response.data;
        SaveStorage('userSesionToken', token)
        SaveStorage('userRole', role)
        if (response.status === 200 || response.status === 201) {
          setMesage("Inicio de sesion exitoso");
          handleCloseModal();
          setIsLoggedIn(true)
          if(role === 'admin'){
            navigate('/admin')
          }else{
            navigate("/home");
          }
        }else{
          setMesage('Hubo con problemas con el incio de sesion')
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
        <GoogleLogin
          onError={handleError}
          onSuccess={handleSuccess}
          useOneTap
          setIsLoggedIn={setIsLoggedIn}
          handleCloseModal={handleCloseModal}
          width='700'
          logo_alignment="center"
          size="medium"
          theme="outline"
        />
      )}
      {email && <p>Email de usuario {email} </p>}
    </GoogleOAuthProvider>
  );
};
