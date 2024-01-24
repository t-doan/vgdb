import { useEffect, useState } from "react";
import { Header } from "./ProfilePage";

export function Home(){
  const [games, setGames] = useState([]);
  const [error, setError] = useState<unknown>();

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await fetch("/apiData");
        if(!response.ok){
          throw new Error(`Error ${response.status}`);
        }
        const items = await response.json();
        console.log(items.results);
        setGames(items);
      }
      catch(e){
        setError(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Api test</h1>
      {games ? (<pre className="text-white">{JSON.stringify(games, null, 2)}</pre>): (<p>Loading</p>)}
    </div>
  );
}
