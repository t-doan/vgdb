import { useLocation, useParams } from "react-router-dom";
import { Game } from "./HomePage";
import { useEffect, useState } from "react";

export function GameDetail(){
  const {state} = useLocation();
  // const {gameId} = useParams();
  // const [game, setGame] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<unknown>();

//   useEffect(()=> {
//     async function loadGame(gameId: number){
//       try{
//         const game = await fetch(`/apiData/${gameId}`)
//         setGame(game);
//       }
//       catch (err) {
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     if (gameId) {
//       setIsLoading(true);
//       loadGame(+gameId);
//     }
// }, [gameId]);

//  if (isLoading) return <div>Loading...</div>;
//   if (error)
//     return (
//       <div>
//         Error Loading Game {gameId}:{' '}
//         {error instanceof Error ? error.message : 'Unknown Error'}
//       </div>
//     );
//   if (!game) return null;

  return(
    console.log(state)
  );
}
