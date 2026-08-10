import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import Challenges from './pages/Challenges';
import AI from './pages/AI';
import Projects from './pages/Projects';
import Roadmap from './pages/Roadmap';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/lessons" element={<Lessons/>} />
        <Route path="/lessons/:id" element={<LessonDetail />} />
        <Route path="/editor" element={<h1>المحرر</h1>} />
        <Route path="/challenges" element={<Challenges/>} />
        <Route path="/ai" element={<AI/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/roadmap" element={<Roadmap/>} />
        <Route path="/community" element={<h1>المجتمع</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;