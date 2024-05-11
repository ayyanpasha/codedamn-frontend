import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CodeEditor from "./page/CodeEditor";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Containers from "./page/Containers";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/id/:projectId" element={<CodeEditor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Containers />} />
      </Routes>
    </Router>
  );
};

export default App;
