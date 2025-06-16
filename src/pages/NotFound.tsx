import Header from "../components/Header";

export default function NotFound() {
  return (
    <>
      <Header />

      {/* conteneur plein écran, flex col, centré */}
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-center text-7xl font-bold">
          La page recherchée n'existe pas
        </p>
      </div>
    </>
  )
}


// export const NotFound = () => {
//   return (
//     <>
//       <Header />

//       {/* conteneur plein écran, flex col, centré */}
//       <div className="flex min-h-screen flex-col items-center justify-center">
//         <p className="text-center text-7xl font-bold">
//           La page recherchée n'existe pas
//         </p>
//       </div>
//     </>
//   );
// };
