import { FormEvent, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { User } from './ProfilePage';

type LoginProp = {
  setLogin: (user?: User) => void;
};
export function Login({ setLogin }: LoginProp) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      localStorage.setItem('token', token);
      console.log('Signed In', user, '; received token:', token);
      setLogin(user);
      navigate('/');
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="container mx-auto mt-28 flex justify-center">
      <div className="w-96 h-60 bg-black ">
        <div className="row flex justify-between">
          <div>
            <h1 className="w-96 text-white text-2xl text-center">Login</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col content-center flex-wrap p-4">
              <div>
                <label className="text-white text-2xl">Username</label>
              </div>
              <div>
                <input required name="username" type="text" />
              </div>
              <div>
                <label className="text-white text-2xl">Password</label>
              </div>
              <div>
                <input required name="password" type="password" />
              </div>
              <div className="p-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-black bg-white border-1 border-solid border-black p-[0.1rem]">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
