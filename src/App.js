import { useState, useEffect, useContext } from "react";
import BackgroundContainer from "./components/background/BackgroundContainer";
import Login from "./components/login/Login";
import UserPage from "./components/pages/user/UserPage";
import AgentPage from "./components/pages/agent/AgentPage";
import AdminPage from "./components/pages/administrator/AdminPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  NavLink,
} from "react-router-dom";

function App() {
  const [componentToRender, setComponent] = useState(null);
  const [userData, setUserData] = useState(null);

  const getUserData = async (userData) => {
    setUserData(userData);
  };

  useEffect(() => {
    if (userData) {
      switch (userData.role) {
        case 0:
          setComponent(<UserPage userData={userData} />);
          break;
        case 1:
          setComponent(<AgentPage userData={userData} />);
          break;
        case 2:
          setComponent(<AdminPage userData={userData} />);
          break;
        default:
          setComponent(<Login onAuth={getUserData} />);
      }
    } else {
      setComponent(<Login onAuth={getUserData} />);
    }
  }, [userData]);

  return (
    <div>
      <BackgroundContainer>
        {/* <Background/> */}
        {componentToRender}
      </BackgroundContainer>
    </div>
  );
}

export default App;
