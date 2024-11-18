import classNames from "classnames";
import styles from "./Card.module.css";

export default function Card({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <div className={classNames(styles.card, className)}>{children}</div>;
}
