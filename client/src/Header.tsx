import { AppDrawer } from "./HomePage";
import { Link, Outlet } from 'react-router-dom';

export function Header() {
  return (
    <div className="Header w-[100%] h-[140px] bg-neutral-900 flex justify-evenly items-center relative">
      <div className="Menu w-[140px] h-[63px] text-center text-white text-2xl font-normal flex justify-center items-center">
        <div className="hover:text-red-600">
          <AppDrawer />
        </div>
        <h1 className="Logo w-[140px] h-[63px] text-center text-white text-2xl font-normal flex justify-center items-center">
          <Link to="/">VGDB</Link>
        </h1>
      </div>
      <div className="SearchBar w-[720px] h-{63px] flex justify-center">
        <div className="Search w-[720px] h-[43px] bg-zinc-300 rounded-[26.25px] flex justify-center">
          <h1 className="text-black text-opacity-40 text-[28px] font-bold">
            Search
          </h1>
        </div>
      </div>
      <div className="UserCorner w-[264px] h-[63px] flex flex-wrap justify-around">
        <Link to="user">
          <div className="CornerPic w-[63px] h-[63px] bg-zinc-300 rounded-full">
            <img
              className="w-[63px] h-[63px] rounded-full"
              src="https://preview.redd.it/gbm183bedns71.jpg?auto=webp&s=61a8e7832f9e4d822af5d94ae8647a7070c65599"
              alt="placeholder"
            />
          </div>
        </Link>
        <div className="User w-[150px] h-[63px] flex flex-wrap justify-around">
          <h1 className="UserText w-[164px] h-[42px] text-white text-[28px] font-bold">
            Hello User
          </h1>
          <h2 className="LogOut w-[72.47px] h-[21px] text-white text-lg font-normal">
            Log Out
          </h2>
        </div>
      </div>
    </div>
  );
}
