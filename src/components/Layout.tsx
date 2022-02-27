import { Aside } from "./Aside";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="w-full">
      <Header />
      <div className="grid grid-cols-[230px_1fr] md:grid-cols-[0px_1fr] min-h-screen max-w-full">
        <Aside />
        {children}
      </div>
    </div>
  );
};
