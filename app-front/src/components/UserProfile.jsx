
import '../styles/App.css'
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useUserData } from '../hook/UserDataProvider';
import Avatar from "@mui/material/Avatar";
import { AiOutlinePoweroff } from "react-icons/ai";



export const UserProfile = ({ setIsLoggedIn}) => {
  const navigate = useNavigate()

  const {user} = useUserData()


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
            <Popover id={`popover-positioned-${placement}`}style={{width: '270px'}}>
              <Popover.Body className='popover-user-profile'>
                <span className='name-user-profile'>{user.name}</span>
                <Button className='btn-profile-users' onClick={logout}><AiOutlinePoweroff className='icon-btn-off'/>Cerrar sesion</Button>
              </Popover.Body>
            </Popover>
          }
        >
          <Avatar alt={user.name} src={user.picture} sx={{ cursor: 'pointer' }} />
        </OverlayTrigger>
      ))}
    </>
  );
};

