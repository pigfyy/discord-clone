import Header from "./Header";
import UserList from "./UserList";
import Footer from "./Footer";

import friendsIcon from "../../assets/imgs/friendsIcon.svg";

const FriendsItem = () => {
  return (
    <div className="px-1.5 my-2">
      <button
        className={`flex w-full items-center gap-[14px] rounded-[4px] p-1.5 ${
          false ? "bg-neutral-600" : "group hover:bg-neutral-600"
        }`}
      >
        <div className="h-8 w-8 overflow-hidden grid place-items-center">
          <img src={friendsIcon} alt="" />
        </div>
        <span
          className={`text-base font-medium leading-5 ${
            false
              ? "text-neutral-100"
              : "text-neutral-300 group-hover:text-neutral-150"
          }`}
        >
          Friends
        </span>
      </button>
    </div>
  );
};

export default () => {
  return (
    <div className="flex w-[240px] min-w-[240px] flex-col justify-between bg-neutral-800">
      <div>
        <FriendsItem />
        <Header />
        <UserList />
      </div>
      <Footer />
    </div>
  );
};
