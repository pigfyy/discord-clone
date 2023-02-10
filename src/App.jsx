import LogIn from "./components/login/LogIn";
import Channels from "./components/channels/Channels";
import Chat from "./components/chat/Chat";
import Friends from "./components/friends/Friends";
import FriendsMenuEllipsis from "./components/menus/FriendsMenuEllipsis";

import { useEffect } from "react";
import { useMenuStore } from "./store";

import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const { menuOpen, menuXY, menuType, setMenuClosed } = useMenuStore();

  const [user] = useAuthState(auth);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const isOpenMenuBtn =
        e.target.getAttribute("does-open-menu") === "true" ||
        e.target.parentElement.getAttribute("does-open-menu") === "true";
      if (!isOpenMenuBtn) {
        menuOpen && setMenuClosed();
      }
    });

    return () => {
      window.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <>
      <div className="flex min-h-screen w-full bg-neutral-700">
        {!user ? (
          <LogIn />
        ) : (
          <>
            <Channels />
            {false ? <Chat /> : <Friends />}
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
