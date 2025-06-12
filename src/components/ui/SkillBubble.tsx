const skills = [
  { name: "JavaScript" },
  { name: "React" },
  { name: "Node.js" },
  { name: "CSS" },
  { name: "HTML" },
  { name: "Python" },
];

export default function SkillBubble() {
  return (
    <div className="flex flex-wrap justify-center gap-5 p-8">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="flex flex-col items-center justify-center w-25 h-25 rounded-full border border-accent bg-primary shadow-lg"
        >
          <span className="text-white text-lg font-semibold text-center">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
}
