import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import Login from "./pages/login/Login";
import CollegeHome from "./pages/college/CollegeHome";
import AdminHome from "./pages/admin/AdminHome";
import ProfessorUnverified from "./pages/professor/ProfessorUnverified";
import ProfessorVerified from "./pages/professor/ProfessorVerified";
import ProfessorAllocated from "./pages/professor/ProfessorAllocated";
import EvaluatorsList from "./pages/college/EvaluatorsList";

import AdminEvaluatorsList from "./pages/admin/AdminEvaluatorsList";
import CollegeEvaluatorsList from "./pages/college/CollegeEvaluatorsList";
import AdminAccreditationVisits from "./pages/admin/AdminAccreditationVisits";
import CollegeAccreditationVisits from "./pages/college/CollegeAccreditationVisits";
import ProfessorHome from "./pages/professor/ProfessorHomeOld";

function App() {
  const role = Cookies.get("role");

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/professor" element={<ProfessorVerified />} />
          <Route path="/professor/unverified" element={<ProfessorUnverified />} />
          <Route path="/professor/allocated" element={<ProfessorAllocated />} />
          <Route path="/professor/submit/:id" element={<ProfessorHome />} />
          <Route path="/college" element={<CollegeHome />} />
          <Route path="/college/evaluators" element={<EvaluatorsList />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />

          <Route path="/admin/evaluators_list" element={<AdminEvaluatorsList />} />
          <Route path="/college/evaluators_list" element={<CollegeEvaluatorsList />} />
          <Route path="/admin/accreditation_visits" element={<AdminAccreditationVisits />} />
          <Route path="/college/accreditation_visits" element={<CollegeAccreditationVisits />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
