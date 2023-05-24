import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RegistrationPage from "./pages/RegistrationPage";
import AuthPage from "./pages/AuthPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
