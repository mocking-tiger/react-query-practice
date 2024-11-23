import classNames from "classnames";
import styles from "./Button.module.css";

export default function Button({
  className,
  disabled,
  type = "button",
  children,
  onClick,
}: {
  className?: string;
  disabled?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={classNames(styles.button, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
