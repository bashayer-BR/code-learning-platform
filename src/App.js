import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import Challenges from './pages/Challenges';
import AI from './pages/AI';
import Projects from './pages/Projects';
import Roadmap from './pages/Roadmap';
import Community from './pages/Community';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Certificates from './pages/Certificates';
import Leaderboard from './pages/Leaderboard';


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/lessons" element={<Lessons/>} />
        <Route path="/lessons/:id" element={<LessonDetail />} />
        <Route path="/editor" element={<h1>المحرر</h1>} />
        <Route path="/challenges" element={<Challenges/>} />
        <Route path="/ai" element={<AI/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/roadmap" element={<Roadmap/>} />
        <Route path="/community" element={<Community/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;