import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "../layouts/SiteLayout";
import { HomePage } from "../pages/HomePage";
import { PrivacyPage } from "../pages/PrivacyPage";
import { ScreenshotsPage } from "../pages/ScreenshotsPage";
import { SupportPage } from "../pages/SupportPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { DownloadPage } from "../pages/DownloadPage";
import { StreamDeckPage } from "../pages/StreamDeckPage";
import { AutomationPage } from "../pages/AutomationPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="download" element={<DownloadPage />} />
        <Route path="streamdeck" element={<StreamDeckPage />} />
        <Route path="automation" element={<AutomationPage />} />
        <Route path="screenshots" element={<ScreenshotsPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
