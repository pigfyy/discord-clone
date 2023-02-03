import LogIn from "./components/login/LogIn";
import Channels from "./components/channels/Channels";
import Chat from "./components/chat/Chat";
import Friends from "./components/friends/Friends";

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
            {false ? <Chat /> : <Friends />}
          </>
        )}
      </div>
    </>
  );
}

export default App;
