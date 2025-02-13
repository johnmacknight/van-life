import { BrowserRouter, Routes, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, } from "react-router-dom";
import Layout from "./components/Layout"
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import HostLayout from "./components/HostLayout"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans from "./pages/Host/HostVans"
import HostVanDetail from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import NotFound from "./pages/NotFound"

import "./server";





export default function App() {

  const router = createBrowserRouter(createRoutesFromElements(
<Route path="/" element={<Layout />}>
            <Route path="*" element={<NotFound />} />
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="vans">
              <Route index element={<Vans />} />
              <Route path=":id" element={<VanDetail />} />
            </Route>
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVanDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />
              </Route>
            </Route>
          </Route>
  ));

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

/*
Old way
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<NotFound />} />

            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            <Route path="vans">
              <Route index element={<Vans />} />
              <Route path=":id" element={<VanDetail />} />
            </Route>

            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVanDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
*/