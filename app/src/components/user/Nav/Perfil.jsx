import React, { useEffect, useState } from "react";
import { UserProfile } from "../perfilUsuario/UserProfile";
import { LoginModal } from "../autenticacion/LoginModal";
import Avatar from "@mui/material/Avatar";
import { isAuthenticated } from "../../../auth";
import EventEmitter from "../../../hook/EventEmitter";

export const Perfil = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [isLoggedIn]);

  useEffect(() => {
    const authChangeCallback = (isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    };

    const unsubscribe = EventEmitter.subscribe(
      "authChange",
      authChangeCallback
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div>
        {isLoggedIn ? (
          <UserProfile setIsLoggedIn={() => setIsLoggedIn(!isLoggedIn)} />
        ) : (
          <>
            <LoginModal
              setIsLoggedIn={() => setIsLoggedIn(!isLoggedIn)}
              controlComponent={(handleShow) => (
                <>
                  <Avatar
                    src="/broken-image.jpg"
                    onClick={handleShow}
                    sx={{ cursor: "pointer" }}
                  />
                </>
              )}
            />
          </>
        )}
        <span className="profile">PERFIL</span>
      </div>
    </>
  );
};
