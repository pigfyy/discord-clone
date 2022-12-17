import "./App.css";
import Channels from "./components/Channels";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <div className="flex min-h-screen w-full justify-center bg-neutral-700">
        <Channels />
        <Chat />
      </div>
    </>
  );
}

export default App;
