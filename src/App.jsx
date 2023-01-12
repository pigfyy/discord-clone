import "./App.css";
import Channels from "./components/Channels";
import Chat from "./components/Chat";
import LogIn from "./components/login/LogIn";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <div className="flex min-h-screen w-full justify-center bg-neutral-700">
        {!user ? (
          <LogIn />
        ) : (
          <>
            <Channels />
            <Chat />
          </>
        )}
      </div>
    </>
  );
}

export default App;
