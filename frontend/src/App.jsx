import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
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
import MyProfilePage from "./pages/user/MyProfilePage";
import FoodPageComponent from "./pages/FoodPageComponent";
import ItemPageComponent from "./pages/ItemPageComponent";
import ThankYouPage from "./pages/ThankYouPage";
import { useSelector } from "react-redux";
import UnverifiedFundraisers from "./components/Admin/UnverifiedFundraisers";
import { useState } from "react";
import { logout, reset } from "./redux/authSlice";
import DeleteFundRaiser from "./pages/user/DeleteFundRaiser";
import VerifiedFundraisers from "./components/Admin/VerifiedFundraisers";
import CreateCampaign from "./components/Admin/CreateCampaign";
import UserPage from "./components/Admin/UserPage";
export default function App() {
  const { user } = useSelector((state) => state.auth);
  const [admin, setAdmin] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      if (user.isAdmin) setAdmin(true);
      else if (!user.isAdmin) setAdmin(false);
    }
  }, [user]);
  // const checkCookieExpiration = () => {
  //   const cookieName = "access_token";

  //   const cookieValue = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith(`${cookieName}=`));

  //   if (!cookieValue) {
  //     dispatch(logout());
  //     dispatch(reset());
  //     return;
  //   }
  // };

  // setInterval(checkCookieExpiration, 2000);

  return (
    <>
      {" "}
      {(!admin || !user) && <Navbar />}
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
          <Route path="/my-profile" element={<MyProfilePage />} />
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
