import { BsPlusLg } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { v4 as uuid } from "uuid";
import { auth } from "../firebase";

export default () => {
  const list = [
    {
      name: "PIGFY",
      pfp: "https://i.pinimg.com/564x/84/a9/fe/84a9fe8be533e59a67eb9a30541c2cd6.jpg",
      isSelected: false,
    },
    {
      name: "CAMICSC",
      pfp: "https://archive.org/download/discordprofilepictures/discordgrey.png",
      isSelected: false,
    },
    {
      name: "Johnny",
      pfp: "https://cdn.discordapp.com/avatars/366070970139672577/3d7c731434c0529f78fba09e1e4a5ff4.png?size=4096",
      isSelected: true,
    },
    {
      name: "yourmommy123",
      pfp: "https://i.pinimg.com/736x/1e/e6/92/1ee692eb92a6ca019ca2c3d5bd9f1464.jpg",
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
                <img
                  src="https://cdn.discordapp.com/avatars/368167875740958721/36a8b24e792f03e2c0d037c9e1016600.png?size=4096"
                  alt=""
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[14px] font-semibold leading-[18px] text-neutral-100">
                  PIGFY
                </span>
                <span className="text-xs font-normal leading-[13px] text-neutral-175">
                  #3243
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
