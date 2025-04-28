import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateFormPage from "./pages/CandidateFormPage";
import Dashboard from "./pages/Dashboard";
import EvaluateCandidate from "./pages/EvaluateCandidate";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NewCandidate from "./pages/NewCandidate";
import NotFound from "./pages/NotFound";
import SubmissionSuccess from "./pages/SubmissionSuccess";

export const RouterApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/candidates/new" element={<NewCandidate />} />
        <Route
          path="/candidates/:id/evaluate"
          element={<EvaluateCandidate />}
        />
        <Route path="/candidate-form" element={<CandidateFormPage />} />
        <Route path="/submission-success" element={<SubmissionSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
