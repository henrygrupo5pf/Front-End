import { Route, Routes } from "react-router-dom";
import { FirstComponent } from "../components/pruebas/PruebaReposAndGists";
import { Random } from "../components/pruebas/Random";
import { RandomWithQuery } from "../components/pruebas/RandomWithQuery";
import { UserAuth } from "../context/AuthContext";
import { ProtectedRoute } from "../hooks";
import { Home, Login } from "../pages/index";
// import { ProtectedRoute } from "../hooks/ProtectedRoute";

const MyRoutes = () => {
  const { user } = UserAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/random" element={<Random/>} />
      <Route path="/randomWithQuery" element={<RandomWithQuery/>} />
      <Route path="/reposGists" element={<FirstComponent/>} />
    </Routes>
  );
};

export default MyRoutes;
