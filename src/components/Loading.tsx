import { LoadingNErrorType } from "../types";
import classNames from "classnames";
import styles from "./Loading.module.css";

export default function Loading({
  className,
  variant = "",
  title = "",
  description = "",
}: LoadingNErrorType) {
  return (
    <div className={classNames(styles.loading, styles[variant], className)}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
