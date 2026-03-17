import { createBrowserRouter, Navigate, redirect } from "react-router";
import { SignUpPage } from "./pages/SignUpPage";
import { SurveyIntroPage } from "./pages/SurveyIntroPage";
import { SurveyStepPage } from "./pages/SurveyStepPage";
import { SurveySuccessPage } from "./pages/SurveySuccessPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminPage } from "./pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/signup")
  },
  {
    path: "/signup",
    Component: SignUpPage
  },
  {
    path: "/survey/intro",
    Component: SurveyIntroPage
  },
  {
    path: "/survey/step/:step",
    Component: SurveyStepPage
  },
  {
    path: "/survey/success",
    Component: SurveySuccessPage
  },
  {
    path: "/dashboard",
    Component: DashboardPage
  },
  {
    path: "/admin",
    Component: AdminPage
  }
]);