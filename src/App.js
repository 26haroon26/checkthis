import "./App.css";
import { useEffect, useContext } from "react";
import { GlobalContext } from "./context/Context";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import loaderImg from "./img/loader.webp";
import Home from "./components/home";
import SignIn from "./components/signin";
import Signup from "./components/signup";
import axios from "axios";

function App() {
  let { state, dispatch } = useContext(GlobalContext);

  // const [fullName, setFullName] = useState("");

  const logoutHandler = async () => {
    try {
      let response = await axios.post(`${state.baseUrl}/logout`,{
        withCredentials:true
      });
      dispatch({
        type: "USER_LOGOUT",
      });
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
    const getProfile = async () => {
      try {
        let response = await axios.get(`${state.baseUrl}/products`, {
          withCredentials: true,
        });

        dispatch({
          type: "USER_LOGIN",
        });
      } catch (error) {
        dispatch({
          type: "USER_LOGOUT",
        });
        console.log("axios error: ", error);

      }
    };

    getProfile();
  }, []);

  return (
    <div>
      {state?.isLogin === true ? (
        <ul className="navBar">
          <li>
            {" "}
            <Link to={`/`}>Home</Link>{" "}
          </li>
          <li>
            {" "}
            <button onClick={logoutHandler}>Logout</button>{" "}
          </li>
        </ul>
      ) : null}
      {state?.isLogin === false ? (
        <ul className="navBar">
          <li>
            {" "}
            <Link to={`/`}>Signin</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to={`/signup`}>Signup</Link>{" "}
          </li>
        </ul>
      ) : null}

      {state?.isLogin === true ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      ) : null}

      {state?.isLogin === false ? (
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      ) : null}

      {state?.isLogin === null ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <img width={300} src={loaderImg} alt="" />
        </div>
      ) : null}
    </div>
  );
}

export default App;
