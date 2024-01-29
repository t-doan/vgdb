import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type GameEntry = {
  name: string;
  id: number;
  released: string;
  background_image: string;
  description_raw: string;
  developers: string[];
  publishers: string[];
  genres: string[];
  tags: string[];
};

export function GameDetail() {
  const { state } = useLocation();
  const gameId = state.game.id;
  const [game, onGame] = useState<GameEntry>();
  const [error, setError] = useState<unknown>();
  const [isLoading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${gameId}?key=4a4f8ba8aaa144ff98854ca97003b2e2`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const result = await response.json();
        onGame(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [gameId]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Game {gameId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  if (!game) return null;

  const developerName = game.developers[0]['name'];
  const publisherName = game.publishers[0]['name'];
  console.log(game.publishers);

  return (
    <div className=" px-48 mt-11">
      <div className="row">
        <h1 className="text-white font-bold text-6xl mb-11">{game.name}</h1>
      </div>
      <div className="row flex">
        <div className="col-1 w-[762px] h-[428px]">
          <img className="" src={game.background_image} alt={game.name} />
        </div>
        <div className="col-2 flex">
          <div>
            <h1>Developer: {developerName}</h1>
            <h1>Publisher: {publisherName}</h1>
            <h1 className="text-yellow-200">Released: {game.released}</h1>
          </div>
          <div>
            <h1>Genres</h1>
            <Genres genresList={game.genres} />
          </div>
          <div>
            <h1>Tags</h1>
            <Tags tagList={game.tags} />
          </div>
        </div>
      </div>
      <div className="">
        <h1>Description</h1>
        <h1 className="text-green-300">{game.description_raw}</h1>
      </div>
    </div>
  );
}

type TagsProps = {
  tagList: string[];
};
function Tags({ tagList }: TagsProps) {
  const tag: JSX.Element[] = [];
  for (let i = 0; i < tagList.length; i++) {
    tag.push(
      <li key={tagList[i]['id']} className="text-pink-300">
        {tagList[i]['name']}
      </li>
    );
  }
  return <ul className="columns-3">{tag}</ul>;
}

type GenreProps = {
  genresList: string[];
};
function Genres({ genresList }: GenreProps) {
  const genres: JSX.Element[] = [];
  for (let i = 0; i < genresList.length; i++) {
    genres.push(
      <li key={genresList[i]['id']} className="text-red-600">
        {genresList[i]['name']}
      </li>
    );
  }
  return <ul>{genres}</ul>;
}
