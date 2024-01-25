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
      <Modal/>
    </>
  );
}


function ListAllGame() {
  const [currentPage, setPage] = useState(1);
  const [currentGames, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/apiData/${currentPage}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const items = await response.json();
        setGames(items.results);
      } catch (error) {
        setError(error);
      }
      finally{
        setLoading(false)
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
      <Card GameList={currentGames} />
      <Pagination currentPage={currentPage} setPage={setPage} />
    </>
  );
}

type CardProp = {
  GameList:Game[]
}
function Card( {GameList}: CardProp){

  const temp:JSX.Element[] = [];
  for (let i = 0; i < GameList.length; i++) {
   temp.push(
     <li className="w-96 mb-11 hover:cursor-pointer" key={GameList[i].id}>
       <h1
         onClick={() => document.getElementById('my_modal_4').showModal()}
         className="text-white text-xl font-semibold hover:underline hover:text-yellow-200">
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
     </li>
   );
  }
  return (
    <>
      <div className="container mx-auto mt-11">
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
  currentPage:number;
  setPage:(x:number) => void;
}
function Pagination( {currentPage, setPage}: PaginationProps) {
  return (
    <div className="join flex justify-center">
      <PrevButton onPrev={() => {if(currentPage - 1 !== 0) setPage(currentPage - 1)}}/>
      <label className="join-item btn btn-ghost">Page {currentPage}</label>
      <NextButton onNext={() => setPage(currentPage + 1)} />
    </div>
  );
}

type PrevButtonProps = {
  onPrev:() => void;
}
function PrevButton({onPrev}: PrevButtonProps){
  return <button onClick={onPrev} className="join-item btn">Prev</button>;
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

function Modal(){
    const [currentCard, setCurrentCard] = useState<Game>();
    const [error, setError] = useState<unknown>();
    const [isLoading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/apiData/${currentCard}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const items = await response.json();
        setCurrentCard(items.results);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentCard]);

  console.log(currentCard);

  return (
    <dialog id="my_modal_4">
      <div className="w-[90vw] h-[85vh] z-50 bg-transparent transition-transform overscroll-contain">
        <div>
        </div>
      </div>
      <div className="modal-action">
        <form method="dialog">
          <button>Close</button>
        </form>
      </div>
    </dialog>
  );
}


      // <dialog id="my_modal_4" className="modal absolute z-10">
      //   <div className="modal-box">
      //     <h3 className="font-bold text-lg">Hello!</h3>
      //     <p className="py-4">Click the button below to close</p>
          // <div className="modal-action">
          //   <form method="dialog">
          //     {/* if there is a button, it will close the modal */}
          //     <button className="btn">Close</button>
          //   </form>
          // </div>
      //   </div>
      // </dialog>
