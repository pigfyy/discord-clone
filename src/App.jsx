import "./App.css";
import Channels from "./components/channels/Channels";
import Chat from "./components/chat/Chat";
import LogIn from "./components/login/LogIn";

function App() {
  const user = "3";

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
