import classNames from "classnames";
import styles from "./Container.module.css";

export default function Container({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <main className={classNames(styles.container, className)}>{children}</main>
  );
}
