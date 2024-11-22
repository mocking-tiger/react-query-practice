import { Outlet } from "react-router-dom";
import { LoginContextProvider } from "../context/LoginContext";
import styles from "./App.module.css";
import Navigation from "./Navigation";
import "react-toastify/dist/ReactToastify.css";
import "./App.font.css";

function App() {
  return (
    <>
      <LoginContextProvider>
        <Navigation />
        <div className={styles.body}>
          <Outlet />
        </div>
      </LoginContextProvider>
    </>
  );
}

export default App;
