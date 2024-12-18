import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import DragAndDropTasks from "./components/DragAndDropTasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/app/*"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <div style={{ flexGrow: 1, padding: "2rem" }}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="tasks" element={<TaskList />} />
                  <Route path="tasksList" element={<DragAndDropTasks />} />
                  <Route path="profile" element={<Profile />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
