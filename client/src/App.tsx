import { ProfilePage, User } from './ProfilePage';
import './App.css';
import { Register } from './RegisterForm';
import { Home } from './HomePage';
import { Routes, Route } from 'react-router-dom';
import { GameDetail } from './GameDetail';
import { Header } from './Header';
import { Login } from './LoginForm';
import { useEffect, useState } from 'react';

export default function App() {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    async function load() {
      if (!localStorage.getItem('token')) {
        setUser(undefined);
        return;
      }
      const req = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const res = await fetch(`/api/user`, req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const temp = await res.json();
      setUser(temp);
    }
    load();
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Header user={user} setUser={setUser} />}>
        <Route index element={<Home />} />
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login setLogin={setUser} />} />
        <Route path="/details/:gameId" element={<GameDetail />} />
      </Route>
    </Routes>
  );
}
