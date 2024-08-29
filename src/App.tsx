import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./components/routes/MainRoutes.tsx";

function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;
