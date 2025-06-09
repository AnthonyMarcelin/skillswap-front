import React from "react";

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <h1>Welcome to the Homepage</h1>
      <p>This is a simple homepage component.</p>
      <button onClick={() => alert("Button clicked!")}>Click Me</button>
    </div>
  );
};

export default Homepage;