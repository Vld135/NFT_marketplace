interface IButtonProps {
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  children: string;
  color?: "indigo" | "amber";
  disabled?: boolean;
}

const Button = ({
  onClick = () => {},
  children,
  type = "button",
  color = "indigo",
  disabled,
}: IButtonProps) => {
  const getClassNames = () => {
    const classNames = {
      indigo:
        "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600",
      amber: "bg-amber-600 hover:bg-amber-500 focus-visible:outline-amber-600",
    };

    return classNames[color];
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`${getClassNames()} flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-gray-400`}
    >
      {children}
    </button>
  );
};

export default Button;
