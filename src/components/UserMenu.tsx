import {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS, USERNAMES } from "../value";
import { getUserInfo } from "../api";
import { LoginContext } from "../context/LoginContext";
import anonymousUserIcon from "../assets/person.png";
import styles from "./UserMenu.module.css";
import ProfilePhoto from "./ProfilePhoto";

export default function UserMenu() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { currentUsername, setCurrentUsername } = useContext(LoginContext);
  const { data: currentUserInfo } = useQuery({
    queryKey: [QUERY_KEYS.USER_INFO, currentUsername],
    queryFn: () => getUserInfo(currentUsername),
    staleTime: 60 * 1000 * 60,
    enabled: !!currentUsername,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userPhoto = currentUserInfo ? currentUserInfo.photo : anonymousUserIcon;
  const userName = currentUserInfo ? currentUserInfo.name : "로그인";
  const usernames = USERNAMES;

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutsideMenu = () => setIsMenuOpen(false);
    window.addEventListener("click", handleClickOutsideMenu);

    return () => {
      window.removeEventListener("click", handleClickOutsideMenu);
    };
  }, [isMenuOpen]);

  const handleLoginClick = (username: string) => {
    setCurrentUsername(username);
    navigate("/");
  };

  const handleLogoutClick = () => {
    queryClient.removeQueries({
      queryKey: [QUERY_KEYS.USER_INFO, currentUsername],
    });
    setCurrentUsername("");
    navigate("/");
  };

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpen((nextIsOpen) => !nextIsOpen);
  }, []);

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleButtonClick}>
        <ProfilePhoto photo={userPhoto} name={userName} />
        <div className={styles.userName}>{userName}</div>
      </button>
      {isMenuOpen && (
        <ul className={styles.popup}>
          {currentUsername ? (
            <li onClick={() => handleLogoutClick()}>로그아웃</li>
          ) : (
            usernames.map((username) => (
              <li key={username} onClick={() => handleLoginClick(username)}>
                {username}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
