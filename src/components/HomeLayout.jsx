import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between gap-6">
      <Header />
      <main className="mb-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
