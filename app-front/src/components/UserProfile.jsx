
import '../styles/App.css'
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


export const UserProfile = ({ username, email, avatarUrl, setIsLoggedIn}) => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("userSesionToken");
    localStorage.removeItem('userRole')
    setIsLoggedIn(false);
    navigate("/home");
  };

  return (
    <>
      {['bottom'].map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`popover-positioned-${placement}`}>
              <Popover.Body>
                <p>infromacion de usuario</p>
                <Button variant="primary" onClick={logout}>Cerrar sesion</Button>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">Profile</Button>
        </OverlayTrigger>
      ))}
    </>
  );
};

