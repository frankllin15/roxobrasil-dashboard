interface IDefaultButton {
  className?: string;
  type: "submit" | "button";
  onClick?: () => void;
}

const DefaultButton: React.FC<IDefaultButton> = ({
  children,
  className = "bg-black text-neutral-100",
  type,
  onClick,
}) => (
  <button
    onClick={onClick}
    type={type}
    className={` h-12 max-w-[10rem] px-4 font-semibold justify-self-end  shadow-md bottom-0  hover:shadow-gray-300 shadow-gray-400 dark:shadow-none duration-500 text-md text-center  rounded-md ${className}`}
  >
    {children}
  </button>
);

export default DefaultButton;
