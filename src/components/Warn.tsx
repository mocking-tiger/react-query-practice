import { LoadingNErrorType } from "../types";
import classNames from "classnames";
import styles from "./Warn.module.css";
import warnIcon from "../assets/warn.svg";

export default function Warn({
  className,
  variant = "",
  title = "",
  description = "",
}: LoadingNErrorType) {
  return (
    <div className={classNames(styles.warn, styles[variant], className)}>
      <img className={styles.icon} src={warnIcon} alt="경고" />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
