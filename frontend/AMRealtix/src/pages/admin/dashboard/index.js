import SidebarLayout from "src/common/layouts/SidebarLayout";
import DashboardModule from "../../../modules/admin/dashboard"

function Dashboard() {

  return (
    <DashboardModule />
  )
}

Dashboard.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dashboard;
