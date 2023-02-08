import AddFriendInput from "./AddFriendInput";

import wumpus from "../../assets/imgs/wumpusWaitingOnFriends.svg";

export default () => {
  return (
    <>
      <header className="flex flex-col gap-4 border-b-[1px] border-b-[#4f545c7a] px-[30px] py-5">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold uppercase leading-5 text-neutral-100">
            Add Friend
          </span>
          <span className="text-sm font-normal leading-5 text-neutral-175">
            You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!
          </span>
        </div>
        <AddFriendInput />
      </header>
      <main className="flex h-full flex-col items-center justify-center gap-12">
        <div>
          <img src={wumpus} alt="" />
        </div>
        <span className="text-base font-normal leading-5 text-neutral-200">
          Wumpus is waiting on friends. You don't have to though!
        </span>
      </main>
    </>
  );
};
