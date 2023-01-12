import { FaAt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState } from "react";
import { auth } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuid } from "uuid";

export default () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
  };

  const message = (messageInfo) => {
    const { username, pfp, time, message } = messageInfo;
    return (
      <li className="flex flex-col gap-1">
        <div className="flex">
          <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
            <img src={pfp} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium leading-5 text-neutral-100">
                {username}
              </span>
              <span className="text-xs font-medium leading-[22px] text-neutral-200">
                {time}
              </span>
            </div>
            <ul>
              {message.map((msg) => {
                return (
                  <li key={uuid()}>
                    <p className="text-base font-normal text-neutral-150">
                      {msg.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </li>
    );
  };

  const [user] = useAuthState(auth);

  // TEMPORARY
  const getTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const hours12 = hours > 12 ? hours - 12 : hours;
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const time = `Today at ${hours12}:${minutes} ${ampm}`;
    return time;
  };

  return (
    <div className="flex w-full flex-col">
      <header className="flex h-12 items-center border-b-[1px] border-neutral-950">
        <div className="flex gap-2 px-3">
          <div className="px-1">
            <IconContext.Provider
              value={{
                color: "hsl(213, 4%, 57%)",
                size: "1.5rem",
              }}
            >
              <FaAt />
            </IconContext.Provider>
          </div>
          <span className="text-base font-semibold text-neutral-100">
            CAMICSC
          </span>
        </div>
      </header>
      <main className="flex h-full w-full flex-col">
        {/* chat */}
        <div className="h-full overflow-y-scroll px-3">
          <ul className="flex flex-col gap-3.5 py-3">
            {message({
              username: "User 1",
              pfp: "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/characterPfps%2F1.png?alt=media&token=6f6ceb75-e952-41c9-9902-5592fdbbc321",
              time: "Today at 12:00 AM",
              message: [{ text: "hi" }, { text: "hows your day" }],
            })}
            {message({
              username: user.displayName,
              pfp: user.photoURL,
              time: getTime(),
              message: [
                { text: "mines great" },
                { text: "wby" },
                { text: "hows the project been" },
                { text: "place holder text" },
              ],
            })}
          </ul>
        </div>
        {/* input box */}
        <form className="h-[68px] w-full px-3" onSubmit={handleSubmit}>
          <div className="flex h-[44px] items-center rounded-lg bg-neutral-500 px-4">
            <input
              type="text"
              className="w-full bg-neutral-500 text-base font-normal text-neutral-150 outline-none"
              placeholder="Message @CAMICSC"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </form>
      </main>
    </div>
  );
};
