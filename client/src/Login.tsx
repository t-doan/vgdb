import { Header } from "./ProfilePage";
import "./App.css"

export function Login(){
  return (
    <>
      <Header />
      <RegisterForm/>
    </>
  );
}

function RegisterForm(){
  return (
    <div className="container mx-auto mt-28 flex justify-center">
      <div className="w-96 h-60 bg-black ">
        <div className="row flex justify-between">
          <div>
            <h1 className="w-96 text-white text-2xl text-center">
              Register New User
            </h1>
            <form className="flex flex-col content-center flex-wrap p-4">
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
                <button className="text-black bg-white border-1 border-solid border-black p-[0.1rem]">
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

function LoginForm() {
  return (
    <div className="container mx-auto mt-28 flex justify-center">
      <div className="w-96 h-60 bg-black ">
        <div className="row flex justify-between">
          <div>
            <h1 className="w-96 text-white text-2xl text-center">
              Login
            </h1>
            <form className="flex flex-col content-center flex-wrap p-4">
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
                <button className="text-black bg-white border-1 border-solid border-black p-[0.1rem]">
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
