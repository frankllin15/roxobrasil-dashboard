interface IDefaultButton {
  className?: string;
  type: "submit" | "button";
}

const DefaultButton: React.FC<IDefaultButton> = ({
  children,
  className = "bg-black text-neutral-100 dark:bg-neutral-100",
  type,
}) => (
  <button
    type={type}
    className={`mt-4 h-12 w-28 font-semibold justify-self-end  shadow-md bottom-0  hover:shadow-gray-300 shadow-gray-400 dark:shadow-none duration-500 text-xl text-center  rounded-md ${className}`}
  >
    {children}
  </button>
);

export default DefaultButton;
