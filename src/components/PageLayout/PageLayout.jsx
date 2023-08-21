import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
const PageLayout = () => {
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <Sidebar />

        <div className="page-wrapper">
          <div className="content container-fluid">

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
