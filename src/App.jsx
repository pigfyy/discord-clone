import LogIn from "./components/login/LogIn";
import Channels from "./components/channels/Channels";
import Chat from "./components/chat/Chat";
import Friends from "./components/friends/Friends";
import FriendsMenuEllipsis from "./components/menus/FriendsMenuEllipsis";

import { useEffect } from "react";
import { useMenuStore, useAppStore } from "./store";

import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  const { menuOpen, menuXY, menuType } = useMenuStore();
  const { currentSection } = useAppStore();

  return (
    <>
      <div className="flex min-h-screen w-full bg-neutral-700">
        {!user ? (
          <LogIn />
        ) : (
          <>
            <Channels />
            {currentSection === "chat" && <Chat />}
            {currentSection === "friends" && <Friends />}
          </>
        )}
      </div>
      {menuOpen && menuType === "friendsMenuEllipsis" && (
        <FriendsMenuEllipsis x={menuXY.x} y={menuXY.y} />
      )}
    </>
  );
}

export default App;
