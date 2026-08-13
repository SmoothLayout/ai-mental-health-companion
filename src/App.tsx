import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import MoodTracker from "./pages/MoodTracker";
import Journal from "./pages/Journal";
import AIChat from "./pages/AIChat";
import Breathing from "./pages/Breathing";
import CBTActivities from "./pages/CBTActivities";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import About from "./pages/About";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/mood" element={<ProtectedRoute><Layout><MoodTracker /></Layout></ProtectedRoute>} />
          <Route path="/journal" element={<ProtectedRoute><Layout><Journal /></Layout></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Layout><AIChat /></Layout></ProtectedRoute>} />
          <Route path="/breathing" element={<ProtectedRoute><Layout><Breathing /></Layout></ProtectedRoute>} />
          <Route path="/cbt" element={<ProtectedRoute><Layout><CBTActivities /></Layout></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
