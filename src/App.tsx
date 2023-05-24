import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RegistrationPage from "./pages/RegistrationPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </>
  )
}

export default App
