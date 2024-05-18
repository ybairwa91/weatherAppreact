import { useState } from "react";
import "./index.css";

function App() {
  const [input, setInput] = useState("");
  return (
    <div className="App">
      <h1 className="app-name">Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter city Name.."
          name="query"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
