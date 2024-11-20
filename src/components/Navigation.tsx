import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import styles from "./Navigation.module.css";

function getLinkStyle({ isActive }: { isActive: boolean }) {
  return {
    textDecoration: isActive ? "underline" : "",
    color: isActive ? "#4cafc8" : "",
  };
}

export default function Navigation() {
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/">코드 스터딧</Link>
        <ul className={styles.menu}>
          <li>
            <NavLink style={getLinkStyle} to="/">
              홈
            </NavLink>
          </li>
          <li>
            <NavLink style={getLinkStyle} to="/my-feed">
              내 피드
            </NavLink>
          </li>
        </ul>
      </Container>
    </div>
  );
}
