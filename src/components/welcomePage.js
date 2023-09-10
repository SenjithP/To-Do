import React, { useState } from "react";

export const NameInputForm = ({ setName }) => {
  const [welcomeName, setWelcomeName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(welcomeName);

    // Store the name in localStorage
    localStorage.setItem("name", welcomeName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h1> What's Your Name? </h1>
        <input
          required
          placeholder="What's your name?"
          className="todo-input"
          type="text"
          value={welcomeName}
          onChange={(e) => setWelcomeName(e.target.value)}
        />
        <button className="todo-btn" type="submit">
          Submit
        </button>
      </label>
    </form>
  );
};
