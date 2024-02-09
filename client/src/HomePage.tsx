import { useEffect, useState } from 'react';
import { FaBars, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { User } from './ProfilePage';

export type Game = {
  id: number;
  name: string;
  background_image: string;
  released?: string;
};

export function Home() {
  return <ListAllGame />;
}

function ListAllGame() {
  const [currentPage, setPage] = useState(1);
  const [currentGames, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setLoading] = useState<boolean>();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/games/${currentPage}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const items = await response.json();
        setGames(items.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <>
      <Card GameList={currentGames} user={user} />
      <Pagination currentPage={currentPage} setPage={setPage} />
    </>
  );
}

type CardProp = {
  GameList: Game[];
  user?: User;
};
function Card({ GameList, user }: CardProp) {
  const temp: JSX.Element[] = [];
  for (let i = 0; i < GameList.length; i++) {
    temp.push(
      <li className="w-96 mb-11" key={GameList[i].id}>
        <Link to={`/details/${GameList[i].id}`} state={{ game: GameList[i] }}>
          <h1 className="text-white text-xl font-semibold hover:underline hover:text-yellow-200">
            {GameList[i].name}
            <img
              className="size-5/6"
              src={
                GameList[i].background_image ??
                'https://static.thenounproject.com/png/2932881-200.png'
              }
              alt={GameList[i].name}
            />
          </h1>
        </Link>
        {user && <AddFav />}
      </li>
    );
  }
  return (
    <>
      <div className="container mt-11">
        <ul className="flex flex-wrap justify-center">{temp}</ul>
      </div>
    </>
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

type PaginationProps = {
  currentPage: number;
  setPage: (x: number) => void;
};
function Pagination({ currentPage, setPage }: PaginationProps) {
  return (
    <div className="join flex justify-center">
      <PrevButton
        onPrev={() => {
          if (currentPage - 1 !== 0) setPage(currentPage - 1);
        }}
      />
      <label className="join-item btn btn-ghost">Page {currentPage}</label>
      <NextButton onNext={() => setPage(currentPage + 1)} />
    </div>
  );
}

type PrevButtonProps = {
  onPrev: () => void;
};
function PrevButton({ onPrev }: PrevButtonProps) {
  return (
    <button onClick={onPrev} className="join-item btn">
      Prev
    </button>
  );
}

type NextButtonProps = {
  onNext: () => void;
};
function NextButton({ onNext }: NextButtonProps) {
  return (
    <button onClick={onNext} className="join-item btn">
      Next
    </button>
  );
}

function AddFav() {
  const [, setError] = useState<unknown>();
  const [, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = await fetch(`api/addlist/1`);
        if (!api.ok) {
          throw new Error(`Error ${api.status}`);
        }
        return await api.json();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="text-yellow-100 hover:text-red-600 w-0 hover:cursor-pointer relative bottom-8 z-50 text-3xl">
      {<FaHeart />}
    </div>
  );
}
