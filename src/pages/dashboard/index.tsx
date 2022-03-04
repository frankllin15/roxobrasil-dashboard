import { Layout } from "@/components/Layout";
import { RequireAuth } from "@/components/RequireAuth";
import { NewProductProvider } from "@/context/NewProductContext/NewProductProvider";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <RequireAuth>
      <Layout>
        <NewProductProvider>
          <Outlet />
        </NewProductProvider>
      </Layout>
    </RequireAuth>
  );
};

export default Dashboard;
