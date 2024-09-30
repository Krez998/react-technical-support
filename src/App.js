import { useContext, useEffect, useState } from "react";
import { login } from "./services/LoginServices";
import { fetchRequests, createRequest } from "./services/RequestServices";
import Background from "./components/background/Background";
import BackgroundContainer from "./components/background/BackgroundContainer";
import CreateNewRequest from "./components/newRequest/CreateNewRequest";
import Login from "./components/login/login";
import UserPage from "./pages/UserPage";
import ExecutorPage from "./pages/ExecutorPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  NavLink
} from "react-router-dom";

function App() {

  useEffect(() => {
    const LOAD_DATA = async () => {
      await fetchRequests();
    };

    LOAD_DATA();
  }, []);

  // const createNewRequest = async (request) => {
  //   await createRequest(request);
  // };

  
  const [userData, setUserData] = useState(null);

  const getUserData = async (userData) => {
    setUserData(userData);
  }

  let componentToRender;

  if (userData && userData.userType === 0) {
    componentToRender = <UserPage userData={userData}/>;
  } else if (userData && userData.userType === 1) {
    componentToRender = <ExecutorPage userData={userData}/>;
  } else {
    componentToRender = <Login onAuth={getUserData} />;
  }

  return (
    <div>

      <BackgroundContainer>
        <Background/>

        {componentToRender}

        {/* <CreateNewRequest onCreate={createNewRequest}>
        </CreateNewRequest> */}

      </BackgroundContainer>   
    </div>
  );
}

export default App;
