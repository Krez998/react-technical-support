import { useState, useEffect, useContext } from "react";
import { fetchRequests, createRequest } from "./services/RequestServices";
import Background from "./components/background/Background";
import BackgroundContainer from "./components/background/BackgroundContainer";
import CreateNewRequest from "./components/newRequest/CreateNewRequest";
import Login from "./components/login/login";
import UserPage from "./components/pages/user/UserPage"
import ExecutorPage from "./components/pages/executor/ExecutorPage";
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
      switch (userData.userType) {
        case 0:
          setComponent(<UserPage userData={userData} />);
          break;
        case 1:
          setComponent(<ExecutorPage userData={userData} />);
          break;
        case 2:
          setComponent(<AdminPage userData={userData} />);
          break;
        default:
          setComponent(<Login onAuth={getUserData} />);
      }
    }
    else {
      setComponent(<Login onAuth={getUserData} />);
    }
  }, [userData]);

  return (
    <div>
      <BackgroundContainer>
        <Background/>
        {componentToRender}
      </BackgroundContainer>
    </div>
  );
}

export default App;
