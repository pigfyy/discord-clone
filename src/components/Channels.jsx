import { BsPlusLg } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { v4 as uuid } from "uuid";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default () => {
  const list = [
    {
      name: "User 1",
      pfp: "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/characterPfps%2F1.png?alt=media&token=6f6ceb75-e952-41c9-9902-5592fdbbc321",
      isSelected: true,
    },
    {
      name: "User 2",
      pfp: "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/characterPfps%2F2.png?alt=media&token=21b625bc-3167-4059-b3b9-e2e6d2ff049b",
      isSelected: false,
    },
    {
      name: "User 3",
      pfp: "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/characterPfps%2F3.png?alt=media&token=a1238c6d-f208-439a-9032-794dd0f7aa97",
      isSelected: false,
    },
    {
      name: "User 4",
      pfp: "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/characterPfps%2F4.png?alt=media&token=f722e2a5-f3f2-46ad-b310-937d8852b8c5",
      isSelected: false,
    },
  ];

  const users = list.map((user) => {
    return (
      <li className="px-1.5" key={uuid()}>
        <button
          className={`flex w-full items-center gap-[14px] rounded-[4px] p-1.5 ${
            user.isSelected ? "bg-neutral-600" : "group hover:bg-neutral-600"
          }`}
        >
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img src={user.pfp} alt="" />
          </div>
          <span
            className={`text-base font-medium leading-5 ${
              user.isSelected
                ? "text-neutral-100"
                : "text-neutral-300 group-hover:text-neutral-150"
            }`}
          >
            {user.name}
          </span>
        </button>
      </li>
    );
  });

  const logUserOut = () => {
    auth.signOut();
  };

  const [user] = useAuthState(auth);

  return (
    <div className="flex w-[240px] min-w-[240px] flex-col justify-between bg-neutral-800">
      <section>
        <div className="flex w-full items-center justify-between gap-[14px] px-3 pt-[6px] pr-4">
          <span className="text-xs font-semibold uppercase text-neutral-300">
            Direct Messages
          </span>
          <button>
            <IconContext.Provider
              value={{
                color: "white",
                size: "10px",
              }}
            >
              <BsPlusLg />
            </IconContext.Provider>
          </button>
        </div>
        <ul className="flex flex-col gap-[2px] py-1.5">{users}</ul>
      </section>
      <section className="flex flex-col gap-[2px] py-1.5">
        <div className="flex items-center justify-between px-1.5">
          <button className="flex w-full basis-3/4 items-center gap-[14px] rounded-[4px] hover:bg-neutral-500">
            <div className="flex gap-2 rounded-[4px] p-1">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img src={user.photoURL} alt="" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[14px] font-semibold leading-[18px] text-neutral-100">
                  {user.displayName}
                </span>
                <span className="text-xs font-normal leading-[13px] text-neutral-175">
                  #0000
                </span>
              </div>
            </div>
          </button>
          <button onClick={logUserOut}>
            <IconContext.Provider
              value={{
                color: "red",
                size: "20px",
              }}
            >
              <RiLogoutBoxRLine />
            </IconContext.Provider>
          </button>
        </div>
      </section>
    </div>
  );
};
