import { Layout } from "@/components/Layout";
import { RequireAuth } from "@/components/RequireAuth";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <RequireAuth>
      <Layout>
        <Outlet />
      </Layout>
    </RequireAuth>
  );
};

export default Dashboard;
