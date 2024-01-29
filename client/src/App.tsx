import { ProfilePage } from './ProfilePage';
import './App.css';
import { Login } from './Login';
import { Home } from './HomePage';
import { Routes, Route } from 'react-router-dom';
import { GameDetail } from './GameDetail';
import { Header } from './Header';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details/:gameId" element={<GameDetail />} />
      </Route>
    </Routes>
  );
}
