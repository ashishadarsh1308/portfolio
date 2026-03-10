import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Project5G from './pages/Project5G';
import ProjectAIJobHunter from './pages/ProjectAIJobHunter';
import ProjectVisualCrypto from './pages/ProjectVisualCrypto';
import Resume from './pages/Resume';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/project/5g" element={<Project5G />} />
          <Route path="/project/ai-job-hunter" element={<ProjectAIJobHunter />} />
          <Route path="/project/visual-crypto" element={<ProjectVisualCrypto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// timer in landing page
// // comment 
// {
//         "institution": "St. Michael's High School",
//         "degree": "Higher Secondary (Class XII)",
//         "board": "CBSE",
//         "logo": "https://media.licdn.com/dms/image/v2/C560BAQExbzTH5Aw9WQ/company-logo_200_200/company-logo_200_200/0/1630648703658/stmichaelshighschool_logo?e=2147483647&v=beta&t=8XGDxnr2niwtjFrMz-kWR-2wynYHk8hVrskufz8IPzY",
//         "duration": "2019",
//         "location": "Patna, Bihar",
//         "percentage": "76%"
//     },
//     {
//         "institution": "Modern Public School",
//         "degree": "Secondary School (Class X)",
//         "board": "CBSE",
//         "logo": "https://lh4.googleusercontent.com/proxy/xgkK9L-NeMIRph2SSqfSxG5jBcJPa4GAOxxT1Bwg4gZqslPfwzVOluyn-gxSdwxNWaNcEKW3kx1sgMiMyagn4enRO3w",
//         "duration": "2017",
//         "location": "Motihari, Bihar",
//         "percentage": "95%"
//     }
