// import { AppDrawer, Game } from './HomePage';
// import { Link, Outlet } from 'react-router-dom';
// import { SearchBar } from './SearchBar';
// import { Dispatch, SetStateAction, useState } from 'react';
// import { User } from './ProfilePage';

// type HeaderProps = {
//   user?: User;
//   setUser: (user?: User) => void;
// };
// export function Header({ user, setUser }: HeaderProps) {
//   const [searchResults, setSearchResults] = useState([]);
//   const [showResults, setShowResults] = useState<boolean>(false);
//   const handleSearch = (results) => {
//     setSearchResults(results);
//     setShowResults(true);
//   };
//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(undefined);
//   };

//   return (
//     <>
//       <div className="Header w-[100%] h-[140px] bg-neutral-900 flex justify-evenly items-center relative">
//         <div className="Menu w-[140px] h-[63px] text-center text-white text-2xl font-normal flex justify-center items-center">
//           <div className="hover:text-red-600">
//             <AppDrawer />
//           </div>
//           <h1 className="Logo w-[140px] h-[63px] text-center text-white text-2xl font-normal flex justify-center items-center">
//             <Link to="/">VGDB</Link>
//           </h1>
//         </div>
//         <div className="SearchBar w-[720px] h-{63px] flex justify-center">
//           <h1 className="text-black text-opacity-40 text-[28px] font-bold">
//             <SearchBar onSearch={handleSearch} />
//             {showResults && (
//               <SearchResult
//                 list={searchResults}
//                 setShowResults={setShowResults}
//               />
//             )}
//           </h1>
//         </div>
//         <div className="UserCorner w-[264px] h-[63px] flex flex-wrap justify-around">
//           {user && (
//             <Link to="/user">
//               <div className="CornerPic w-[63px] h-[63px] bg-zinc-300 rounded-full">
//                 <img
//                   className="w-[63px] h-[63px] rounded-full"
//                   src={user?.profileImage}
//                   alt="placeholder"
//                 />
//               </div>
//             </Link>
//           )}
//           <div className="User w-[150px] h-[63px] flex flex-wrap justify-around">
//             {user && (
//               <>
//                 <Link to="/user">
//                   <h1 className="UserText w-[164px] h-[42px] text-white text-[28px] font-bold hover:underline">
//                     My profile
//                   </h1>
//                 </Link>
//                 <h1
//                   onClick={logout}
//                   className="LogOut w-[72.47px] h-[21px] text-white text-lg font-normal hover:underline cursor-pointer">
//                   Log Out
//                 </h1>
//               </>
//             )}
//             {!user && (
//               <div className="flex flex-col content-around items-center">
//                 <Link to="/signup">
//                   <h1 className="text-white text-xl hover:underline">
//                     Sign Up
//                   </h1>
//                 </Link>
//                 <Link to="/login">
//                   <h1 className="text-white text-xl hover:underline">
//                     Sign In
//                   </h1>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Outlet />
//     </>
//   );
// }

// type SearchResultsProps = {
//   list: Game[];
//   setShowResults: Dispatch<SetStateAction<boolean>>;
// };
// export function SearchResult({ list, setShowResults }: SearchResultsProps) {
//   const temp: JSX.Element[] = [];
//   for (let i = 0; i < list.length; i++) {
//     temp.push(
//       <Link
//         to={`/details/${list[i].id}`}
//         state={{ game: list[i] }}
//         key={list[i].id}>
//         <li className="hover:bg-yellow-200">{list[i].name}</li>
//       </Link>
//     );
//   }

//   return (
//     <div
//       className="flex justify-center fixed top-0 left-0 right-0 bottom-0 z-50"
//       onClick={() => setShowResults(false)}>
//       <div className="w-[37.5rem] relative top-[6rem] right-[7.5rem]">
//         <ul className="bg-zinc-100">{temp}</ul>
//       </div>
//     </div>
//   );
// }
