import { ProfilePage } from "./ProfilePage";
import './App.css'
import { Login } from "./Login";
import { Home } from "./HomePage";
import { Routes, Route } from 'react-router-dom';

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/user" element={<ProfilePage />}/>
      <Route path="/login" element={ <Login />}/>
    </Routes>
  );
}
