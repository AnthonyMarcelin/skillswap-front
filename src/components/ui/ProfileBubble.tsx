// const users = [
//   {
//     name: "Fakhri Labib",
//     url: "../../../public/fakhri-labib-ZhBGD4vykCU-unsplash.jpg",
//   },
//   {
//     name: "Jake Nackos",
//     url: "../../../public//jake-nackos-IF9TK5Uy-KI-unsplash.jpg",
//   },
//   {
//     name: "Vital Gariev",
//     url: "../../../public/vitaly-gariev-kjK9z5vayYg-unsplash.jpg",
//   },
// ];

interface ProfileBubbleProps {
  name: string;
  url: string;
}

export default function ProfileBubble({profiles = []}: {profiles: ProfileBubbleProps[]}) {

   if (!profiles.length) {
    return <div>Aucun profil trouvé.</div>;
  }
  return (
    <div className="flex flex-wrap pt-8 justify-center items-center gap-5 pl-2 pr-2">
      {profiles.map((user) => (
        <div key={user.name} className="flex flex-col items-center">
          <img
            src={user.url}
            alt={user.name}
            className="w-30 h-30 rounded-full object-cover mb-2"
          />
          <div className="text-secondary font-semibold text-center">
            {user.name}
          </div>
        </div>
      ))}
    </div>
  );
}
