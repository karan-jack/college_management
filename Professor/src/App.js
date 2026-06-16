import React, { useState } from "react";
import ProfessorDashboard from "./Project/ProfessorDashboard";
import AcademicRecords from "./Project/AcademicRecords";
import UploadMarks from "./Project/UploadMarks";
import AssignedCourses from "./Project/AssignedCourses";
import ResourcesPage from "./Project/ResourcesPage";
import ModulesPage from "./Project/ModulesPage";

export default function App() {
  const [page, setPage] = useState("dashboard");

  if (page === "academic-records") {
    return <AcademicRecords onNavigate={setPage} />;
  }

  if (page === "upload-marks") {
    return <UploadMarks onNavigate={setPage} />;
  }

  if (page === "resources") {
    return <ResourcesPage onNavigate={setPage} />;
  }

  if (page === "assigned-courses") {
    return <AssignedCourses onNavigate={setPage} />;
  }


  if (page === "modules") {
    return <ModulesPage onNavigate={setPage} />;
  }

  return <ProfessorDashboard currentPage={page} onNavigate={setPage} />;
}