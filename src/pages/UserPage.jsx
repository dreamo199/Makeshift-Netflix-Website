import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UserPage() {
  const { user, logout } = useContext(AuthContext);
  console.log(user)

  return (
    <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6 items-center">
            <img src={user?.avatar} alt="" className="w-28 h-28 object-cover rounded-full border-2 border-white/10"/>
            <div>
                <h2 className="text-3xl font-bold">Welcome, {user?.username} 👋</h2>
                <p>{user.email}</p>
            </div>
        </div>
      

      <button onClick={logout}>Logout</button>
    </div>
  );
}
