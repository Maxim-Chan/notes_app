import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import NotesPage from "./pages/NotesPage.tsx";

import NavBar from "./components/NavBar.tsx";

function App() {

  return (
    <>
      <div>
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Notes" element={<NotesPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
