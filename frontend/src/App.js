import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import TopBar from "./component/TopBar";
import HomePage from "./pages/HomePage";
import SingUpPage from "./pages/SingUpPage";

function App() {
  const { isLoggedIn } = useSelector((store) => store);
  return (
    <Router>
      <TopBar />
      <Routes>
        {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
        <Route path="/signup" element={<SingUpPage />} />
        <Route path="/" element={<HomePage />} />
        <Route render={() => <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
