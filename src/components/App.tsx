import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Navigation from "./Navigation";
import "react-toastify/dist/ReactToastify.css";
import "./App.font.css";

function App() {
  return (
    <>
      <Navigation />
      <div className={styles.body}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
