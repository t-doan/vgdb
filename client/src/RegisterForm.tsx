import { FormEvent, useState } from 'react';
import './App.css';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);

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
      const res = await fetch('/api/auth/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = await res.json();
      console.log('Registered', user);
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mt-28 flex justify-center">
      <div className="w-96 h-96 bg-black ">
        <div className="row flex justify-between">
          <div>
            <h1 className="w-96 text-white text-2xl text-center">
              Register New User
            </h1>
            <form
              className="flex flex-col content-center flex-wrap p-4"
              onSubmit={handleSubmit}>
              <div>
                <label className="text-white text-2xl">Image Url</label>
              </div>
              <div>
                <input required name="profileImage" type="text" />
              </div>
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
              <div>
                <label className="text-white text-2xl">Bio</label>
              </div>
              <div>
                <input required name="bio" type="text" />
              </div>
              <div className="p-4 flex justify-center">
                <button
                  className="text-black bg-white border-1 border-solid border-black p-[0.1rem]"
                  disabled={isLoading}>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
