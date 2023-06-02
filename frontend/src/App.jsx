import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CampaignDetailsPage from "./pages/CampaignDetailsPage";
import ItemDonationPage from "./pages/ItemDonationPage";
import MoneyDonationPage from "./pages/MoneyDonationPage";
import CreateFundraiserPage from "./pages/CreateFundraiserPage";
import FundraiserDetailsPage from "./pages/FundraiserDetailsPage";
import HelpFundraiserPage from "./pages/HelpFundraiserPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import HomePage from "./pages/HomePage";
import CampaignsPage from "./pages/CampaignsPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

import Register from "./pages/RegisterPage";
import MyEventsPage from "./pages/user/MyEventsPage";
import MyDonationsPage from "./pages/user/MyDonationsPage";
import MyFundraisersPage from "./pages/user/MyFundraisersPage";

export default function App() {
  return (
    <>
      {" "}
      <Navbar />
      <Chatbot />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/help-fundraiser" element={<HelpFundraiserPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        {/*         </Route> */}
        <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        {/* user protected routes */}
        <Route element={<ProtectedRoutes admin={false} />}>
          <Route path="/items-donate" element={<ItemDonationPage />} />
          <Route path="/my-events" element={<MyEventsPage />} />
          <Route path="/my-donations" element={<MyDonationsPage />} />
          <Route path="/my-fundraisers" element={<MyFundraisersPage />} />

          <Route path="/money-donate" element={<MoneyDonationPage />} />

          <Route path="/create-fundraiser" element={<CreateFundraiserPage />} />
        </Route>
        {/* <Route element={<ProtectedRoutes admin={true} />}> */}
        <Route
          path="/help-fundraiser/:id"
          element={<FundraiserDetailsPage />}
        />
        {/* </Route> */}
      </Routes>
      <ToastContainer />
      <ToastContainer />
      <Footer />
    </>
  );
}
``;
