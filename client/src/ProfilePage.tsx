import { FaChevronDown, FaChevronUp, FaThumbsUp, FaThumbsDown, FaBars} from 'react-icons/fa';
import './ProfilePage.css'
import { Header } from './Header';

export function ProfilePage() {
  return (
    <div className="container mx-auto flex">
      <div className="ProfilePage w-[100vw] h-[100vh] bg-neutral-700 flex flex-wrap">
        <Header />
        <div className="UserProfile w-[100vw] flex px-48 justify-between flex-wrap">
          <AddList />
          <ProfileBanner />
          <div className="ProfileBody">
            <UserCollection />
            <Review/>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileBanner(){
  return (
    <div className="ProfileBanner w-[371px] h-[775px]">
      <div className="BannerContainer w-[371px] h-[775px] bg-gray-600 rounded-[42px] flex flex-col justify-evenly items-center">
        <div className="Ellipse2 w-[252.95px] h-[252.95px] bg-zinc-300 rounded-full">
          <img
            className="profileImage w-[252.95px] h-[252.95px] rounded-full"
            src="https://preview.redd.it/gbm183bedns71.jpg?auto=webp&s=61a8e7832f9e4d822af5d94ae8647a7070c65599"
            alt="placeholder"
          />
        </div>
        <div className="Username w-[252.95px] h-[53.98px] text-center text-white text-[33.73px] font-bold ">
          <h1>My Name</h1>
        </div>
        <div className="DateJoin w-[310.29px] h-[48.90px] text-center text-white text-xl font-normal">
          <h1>Date Joined</h1>
        </div>
        <div className="GamesPlayed20 w-[258.01px] h-[37.10px] text-center text-white text-xl font-normal">
          <h1>Games Played</h1>
        </div>
        <div className="Bio w-[306.92px] h-[120.62px] bg-gray-700 rounded-[16.86px] text-center text-white text-[14.92px]">
          <h1>Bio</h1>
        </div>
        <div className="CurrentGames w-[306.92px] h-[142.62px] bg-gray-700 rounded-[16.86px] text-center text-white text-[18.92px] font-bold">
          <h1>Currently Playing</h1>
          <ul>
            <li>Tetris</li>
            <li>Baldur's Gate 3</li>
            <li>Candy Crush</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function UserPlaylist(){
  return (
    <li className="FavoriteCollection w-[982px] h-[447.93px] mb-8">
      <div className="w-[982px] h-[60.30px]  bg-zinc-900 rounded-lg flex p-4 justify-between items-center">
        <h1 className="text-white text-xl text-center p-[12px]">Favorite</h1>
        <FaChevronDown size="1.5rem" color="white" />
      </div>
      <ListGames/>
    </li>
  );
}

function ListGames(){
  return (
    <div className="CollectionBox w-[982px] h-[406.58px] bg-zinc-800 rounded-[17.23px] pl-10 pr-6 pt-4 pb-4">
      <ul className="playList flex flex-wrap overflow-y-scroll h-[375px] ">
        <GameCard />
      </ul>
    </div>
  );
}

function GameCard(){
  return (
    <li className='block p-[1rem] float-left'>
      <div className="w-[94.75px] h-[156.78px]">
        <img
          className="Rectangle5 w-[94.75px] h-[129.21px] bg-zinc-300"
          src="https://image.api.playstation.com/vulcan/img/cfn/11307uYG0CXzRuA9aryByTHYrQLFz-HVQ3VVl7aAysxK15HMpqjkAIcC_R5vdfZt52hAXQNHoYhSuoSq_46_MT_tDBcLu49I.png"
          alt="placeholder"
        />
        <h1 className="GameTitle w-[64.36px] h-[13.78px] text-white text-xl font-bold">
          Minecraft
        </h1>
      </div>
    </li>
  );
}

function AddList(){
  return (
    <div className="w-[100%] h-[5rem] flex justify-end items-center">
      <button
        className="text-black bg-white border-2 border-solid border-black rounded-xl text-2xl p-[0.25rem]"
        type="button">
        Add new list
      </button>
    </div>
  );
}

function UserCollection(){
  return (
    <div className="userCollection">
      <ul>
        <UserPlaylist />
      </ul>
    </div>
  );
}

function Review(){
  return (
    <div className="ReviewList">
      <h1 className="w-[267.04px] h-[60.30px] text-white text-[34.46px] font-bold">
        Reviews
      </h1>
      <div className="w-[982px] h-[220.89px] bg-zinc-800 rounded-lg px-5">
        <div className="ReviewHeader flex justify-between items-center">
          <h1 className="w-[222.24px] h-[51.68px] text-white text-[27.56px] font-bold">
            Game Title
          </h1>
          <FaThumbsUp color="green" size={'2rem'} />
        </div>
        <div className="ReviewBody flex justify-around">
          <img
            className="Rectangle5 w-[94.75px] h-[129.21px] bg-zinc-300"
            src="https://image.api.playstation.com/vulcan/img/cfn/11307uYG0CXzRuA9aryByTHYrQLFz-HVQ3VVl7aAysxK15HMpqjkAIcC_R5vdfZt52hAXQNHoYhSuoSq_46_MT_tDBcLu49I.png"
            alt="placeholder"
          />
          <p className="ReviewText w-[752.87px] h-[130.91px] text-white text-lg font-normal overflow-y-scroll"></p>
        </div>
      </div>
    </div>
  );
}
