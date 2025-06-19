import { useState, useEffect } from "react";

const styles = ["adventurer", "avataaars", "big-smile", "gridy", "personas"];

export default function AvatarPicker({
  selectedUrl,
  onSelect,
}: {
  selectedUrl: string | null;
  onSelect: (url: string) => void;
}) {
  const [avatars, setAvatars] = useState<
    { seed: string; style: string; url: string }[]
  >([]);

  useEffect(() => {
    const seeds = generateSeeds(8);
    const newAvatars = seeds.map((seed) => {
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      const url = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${encodeURIComponent(seed)}`;
      return { seed, style: randomStyle, url };
    });
    setAvatars(newAvatars);
  }, []);

  return (
    <div>
      <p>Choisis ton avatar :</p>
      <div style={{ display: "flex", gap: 10 }}>
        {avatars.map(({ seed, style, url }) => (
          <img
            key={`${style}-${seed}`}
            src={url}
            alt={`Avatar ${seed} style ${style}`}
            style={{
              width: 80,
              height: 80,
              cursor: "pointer",
              border: selectedUrl === url ? "3px solid blue" : "1px solid gray",
              borderRadius: 10,
            }}
            onClick={() => onSelect(url)}
          />
        ))}
      </div>
    </div>
  );
}

function generateRandomSeed(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateSeeds(count = 8) {
  const seeds: string[] = [];
  for (let i = 0; i < count; i++) {
    seeds.push(generateRandomSeed());
  }
  return seeds;
}
