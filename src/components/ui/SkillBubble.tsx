const skills = [
    { name: 'JavaScript'},
    { name: 'React'},
    { name: 'Node.js'},
    { name: 'CSS' },
    { name: 'HTML'},
    ];

export default function SkillBubble() {
  return (
    <div className="flex flex-wrap justify-center gap-3 pl-2 pr-2">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="flex flex-col items-center justify-center w-25 h-25 rounded-full bg-primary shadow-lg mx-auto my-8"
        >
          <span className="text-white text-lg font-semibold text-center">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
}