import classNames from "classnames";
import styles from "./Button.module.css";

export default function Button({
  className,
  disabled,
  type = "button",
  children,
  as,
}: {
  className?: string;
  disabled?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  children: React.ReactNode;
  as: string;
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={classNames(styles.button, className)}
    >
      {children}
    </button>
  );
}
