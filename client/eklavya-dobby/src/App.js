import React, { createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";

const ApiContext = createContext();

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  return (
    <ApiContext.Provider value={API_URL}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
}

function useApiUrl() {
  return useContext(ApiContext);
}

export { useApiUrl, App as default };
