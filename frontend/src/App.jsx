import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { logout, reset } from "./redux/authSlice"
import OngoingCampaigns from "./components/Admin/OngoingCampaigns";
import CampaignDetailsPage from "./pages/CampaignDetailsPage";
import ItemDonationPage from "./pages/ItemDonationPage";
import FoodDonationPage from "./pages/FoodDonationPage";
import MoneyDonationPage from "./pages/MoneyDonationPage";
import CreateFundraiserPage from "./pages/CreateFundraiserPage";
import FundraiserDetailsPage from "./pages/FundraiserDetailsPage";
import HelpFundraiserPage from "./pages/HelpFundraiserPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import CampaignsPage from "./pages/CampaignsPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./pages/RegisterPage";
import MyEventsPage from "./pages/user/MyEventsPage";
import MyDonationsPage from "./pages/user/MyDonationsPage";
import MyFundraisersPage from "./pages/user/MyFundraisersPage";

import FoodPageComponent from "./pages/FoodPageComponent";
import ItemPageComponent from "./pages/ItemPageComponent";
import ThankYouPage from "./pages/ThankYouPage";
import { useSelector } from "react-redux";
import UnverifiedFundraisers from "./components/Admin/UnverifiedFundraisers";
import { useState } from "react";
import DeleteFundRaiser from "./pages/user/DeleteFundRaiser";
import VerifiedFundraisers from "./components/Admin/VerifiedFundraisers";
import CreateCampaign from "./components/Admin/CreateCampaign";
import UserPage from "./components/Admin/UserPage";
export default function App() {
  const [admin, setAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  setInterval(function () {
    if (localStorage.getItem("user")) {
      const userData = JSON.parse(localStorage.getItem("user"));
      const expirationTime = userData.expDate;
      if (expirationTime < new Date().getTime()) {
        localStorage.removeItem("user");
        dispatch(logout());
        dispatch(reset());
        toast.info("Session has expired. Please Log in again.", {
          autoClose: 1500,
        });
      }
    }
  }, 2500);

  return (
    <>
      {" "}
      <Navbar />
      <ScrollToTop />
      <Chatbot />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/help-fundraiser" element={<HelpFundraiserPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/money-donate" element={<MoneyDonationPage />} />
        <Route path="/rsvp/:cid/:email" element={<ThankYouPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        {/* user protected routes */}
        <Route element={<ProtectedRoutes admin={false} />}>
          <Route path="/items-donate" element={<ItemDonationPage />} />
          <Route path="/food-donate" element={<FoodDonationPage />} />
          <Route path="/my-events" element={<MyEventsPage />} />
          <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />
          <Route path="/item/:pid" element={<ItemPageComponent />} />
          <Route path="/food/:pid" element={<FoodPageComponent />} />
          <Route path="/my-donations" element={<MyDonationsPage />} />
          <Route path="/my-fundraisers" element={<MyFundraisersPage />} />
          <Route path="/create-fundraiser" element={<CreateFundraiserPage />} />
          <Route
            path="/help-fundraiser/:id"
            element={<FundraiserDetailsPage />}
          />
          <Route path="/delete-fundraiser/:id" element={<DeleteFundRaiser />} />

        </Route>
        <Route element={<ProtectedRoutes admin={true} />}>
          <Route
            path="/admin/fundraisers/unverified"
            element={<UnverifiedFundraisers />}
          />
          <Route
            path="/admin/fundraisers/verified"
            element={<VerifiedFundraisers />}
          />
          <Route
            path="/admin/campaigns/ongoing"
            element={<OngoingCampaigns />}
          />
          <Route
            path="/admin/campaigns/create-new"
            element={<CreateCampaign />}
          />
          <Route path="/admin/users" element={<UserPage />} />
        </Route>
      </Routes>
      <ToastContainer />
      <ToastContainer />
      <Footer />
    </>
  );
}
``;
