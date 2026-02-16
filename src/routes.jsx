import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { CharacterDetail } from "./pages/CharacterDetail";
import { LocationDetail } from "./pages/LocationsDetail";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
            <Route index element={<Home />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/location/:id" element={<LocationDetail />} />
            <Route path="/single/:theId" element={<Single />} />
            <Route path="/demo" element={<Demo />} />
        </Route>
    )
);