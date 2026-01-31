import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/Loading";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const HomePage = lazy(() => import("../pages/LandingPage/HomePage"));
const IndustriesPage = lazy(
  () => import("../pages/LandingPage/IndustriesPages"),
);
const AutomotiveRepairPage = lazy(
  () => import("../pages/LandingPage/IndustriesPages/AutomotiveRepairPage"),
);
const HomeServicePage = lazy(
  () => import("../pages/LandingPage/IndustriesPages/HomeServicePage"),
);
const LegalPracticesPage = lazy(
  () => import("../pages/LandingPage/IndustriesPages/LegalPracticesPage"),
);
const RealEstatePage = lazy(
  () => import("../pages/LandingPage/IndustriesPages/RealEstatePage"),
);
const SalonPage = lazy(
  () => import("../pages/LandingPage/IndustriesPages/SalonPage"),
);
const SmallBusinessPage = lazy(
  () => import("../pages/LandingPage/IndustriesPages/SmallBusinessPage"),
);

const LandingRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<HomePage />} />
          <Route path="industries" element={<IndustriesPage />}>
            <Route path="salon" element={<SalonPage />} />
            <Route path="home-service" element={<HomeServicePage />} />
            <Route path="legal-practices" element={<LegalPracticesPage />} />
            <Route
              path="automotive-repair"
              element={<AutomotiveRepairPage />}
            />
            <Route path="small-business" element={<SmallBusinessPage />} />
            <Route path="real-estate" element={<RealEstatePage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default LandingRoutes;
