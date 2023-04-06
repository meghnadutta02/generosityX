import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CampaignDetailsPage from "./CampaignDetailsPage";
import ItemDonationPage from "./pages/ItemDonationPage";
import MoneyDonationPage from "./pages/MoneyDonationPage";
import CreateFundraiserPage from "./pages/CreateFundraiserPage";
import FundraiserDetailsPage from "./FundraiserDetailsPage";
import HelpFundraiserPage from "./pages/HelpFundraiserPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CampaignsPage from "./pages/CampaignsPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./pages/RegisterPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* <Route element={<ProtectedRoutes admin={false} />}> */}
        <Route path="/items-donate" element={<ItemDonationPage />} />
        <Route path="/money-donate" element={<MoneyDonationPage />} />
        <Route path="/create-fundraiser" element={<CreateFundraiserPage />} />
        <Route path="/help-fundraiser" element={<HelpFundraiserPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        {/*         </Route> */}
        <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />
        <Route
          path="/help-fundraiser/:id"
          element={<FundraiserDetailsPage />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer/>
      <Footer />
    </>
  );
}
``;
