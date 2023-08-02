import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState<string>("");

  return (
    <div id="app">
      <label htmlFor="username-input">Username</label>
      <input
        id="username-input"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <button>Imprimir Username</button>
      <div>
        <p>Resultado:</p>
        <p>{username}</p>
      </div>
    </div>
  );
}
