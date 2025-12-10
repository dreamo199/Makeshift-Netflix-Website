import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    login(username, password);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        className="bg-dark-100 p-8 rounded-xl w-[350px]"
        onSubmit={submit}
      >
        <h1 className="text-3xl mb-6 text-center font-bold">Sign In</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 rounded bg-gray-800"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-3 bg-red-600 hover:bg-red-700 rounded font-bold"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
