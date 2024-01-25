import { useEffect, useState } from "react";
import { Header } from "./Header";
import { FaBars } from 'react-icons/fa';

type Game = {
  id: number;
  name: string;
  description ?: string;
  background_image: string;
  released ?: string;
};

export function Home(){
  return (
    <>
      <Header />
      <ListAllGame />
      <Pagination/>
    </>
  );
}


function ListAllGame() {
  const [page, setPage] = useState(1);
  const [games, setGames] = useState<Game>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/apiData/${page}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const items = await response.json();
        setGames(items.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [page]);

  const temp:JSX.Element[] = [];
  for (let i = 0; i < games.length; i++) {
   temp.push(
     <li className="w-96 mb-11 hover:cursor-pointer" key={games[i].id}>
       <h1 className="text-white text-xl font-semibold hover:underline hover:text-yellow-200">
         {games[i].name}
         <img
           className="size-5/6"
           src={
             games[i].background_image ??
             'https://static.thenounproject.com/png/2932881-200.png'
           }
           alt={games[i].name}
         />
       </h1>
     </li>
   );
  }

  return (
    <div className="container mx-auto mt-11">
      <ul className="flex flex-wrap justify-center">{temp}</ul>
    </div>
  );
}

export function AppDrawer() {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="drawer-button cursor-pointer">
          <FaBars />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <label htmlFor="my-drawer" className="hover:text-yellow-300">
              <a>Sidebar Item 1</a>
            </label>
          </li>
          <li>
            <label htmlFor="my-drawer" className="hover:text-yellow-300">
              <a>Sidebar Item 2</a>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

// function PrevButton(){

// }

// function NextButton(){

// }

// function PageNumber(){

// }

function Pagination(){
  return (
    <div className="join flex justify-center">
      <button className="join-item btn">Prev</button>
      <button className="join-item btn">Page 01</button>
      <button className="join-item btn">Next</button>
    </div>
  );
}
