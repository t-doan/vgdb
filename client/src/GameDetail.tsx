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
        const response = await fetch(`/api/details/${gameId}`);
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

  return (
    <div className=" px-48 mt-11">
      <div className="row">
        <h1 className="text-white font-bold text-6xl mb-11">{game.name}</h1>
      </div>
      <div className="row flex">
        <div className="col-1 w-[762px] h-[428px]">
          <img
            className="w-[762px] h-[428px]"
            src={game.background_image}
            alt={game.name}
          />
        </div>
        <div className="col-2 flex flex-wrap justify-evenly content-between">
          <div>
            <Developers developersList={game.developers} />
          </div>
          <div>
            <Publishers publishersList={game.publishers} />
          </div>
          <div>
            <h1 className="text-white text-2xl font-semibold">Released:</h1>
            <h1 className="text-yellow-200 text-xl">{game.released}</h1>
          </div>
          <div>
            <Genres genresList={game.genres} />
          </div>
          <div>
            <Tags tagList={game.tags} />
          </div>
        </div>
      </div>
      <div className="pt-12">
        <h1 className="text-white text-2xl font-semibold">Description</h1>
        <h1 className="text-green-300 text-xl">{game.description_raw}</h1>
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
      <li key={tagList[i]['id']} className="text-pink-300 text-xl">
        {tagList[i]['name']}
      </li>
    );
  }
  return (
    <>
      <h1 className="text-white text-2xl font-semibold">Tags</h1>
      <ul className="columns-3">{tag}</ul>
    </>
  );
}

type GenreProps = {
  genresList: string[];
};
function Genres({ genresList }: GenreProps) {
  const genres: JSX.Element[] = [];
  for (let i = 0; i < genresList.length; i++) {
    genres.push(
      <li key={genresList[i]['id']} className="text-red-500 text-xl">
        {genresList[i]['name']}
      </li>
    );
  }
  return (
    <ul>
      <h1 className="text-white text-2xl font-semibold">Genres</h1>
      {genres}
    </ul>
  );
}

type DevelopersProps = {
  developersList: string[];
};
function Developers({ developersList }: DevelopersProps) {
  const developers: JSX.Element[] = [];
  for (let i = 0; i < developersList.length; i++) {
    developers.push(
      <li key={developersList[i]['id']} className="text-purple-400 text-xl">
        {developersList[i]['name']}
      </li>
    );
  }
  return (
    <ul>
      <h1 className="text-white text-2xl font-semibold">Developers:</h1>
      {developers}
    </ul>
  );
}

type PublishersProps = {
  publishersList: string[];
};
function Publishers({ publishersList }: PublishersProps) {
  const publishers: JSX.Element[] = [];
  for (let i = 0; i < publishersList.length; i++) {
    publishers.push(
      <li key={publishersList[i]['id']} className="text-orange-400 text-xl">
        {publishersList[i]['name']}
      </li>
    );
  }
  return (
    <ul>
      <h1 className="text-white text-2xl font-semibold"> Publishers:</h1>
      {publishers}
    </ul>
  );
}
