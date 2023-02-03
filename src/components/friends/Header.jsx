import friendsIcon from "../../assets/imgs/friendsIcon.svg";

const VerticalDivider = () => {
  return <div className="w-[1px] h-6 bg-neutral-450"></div>;
};

const Buttons = () => {
  return ["Online", "All", "Pending", "Blocked", "Add Friend"].map((button) => {
    const isAddFriend = button === "Add Friend";
    return (
      <button
        className={`flex items-center gap-4 px-[8px] py-[2px] rounded ${
          !isAddFriend ? "hover:bg-neutral-500" : "bg-green-400"
        }`}
        key={crypto.randomUUID()}
      >
        <span
          className={`text-[16px] font-medium leading-5 ${
            !isAddFriend
              ? "text-neutral-175 hover:text-neutral-150 active:text-neutral-100"
              : "text-neutral-100"
          }`}
        >
          {button}
        </span>
      </button>
    );
  });
};

export default () => {
  return (
    <header className="flex h-12 min-h-[3rem] items-center shadow-inset gap-4">
      <div className="flex gap-2 ml-3">
        <div className="px-1">
          <img src={friendsIcon} alt="" />
        </div>
        <span className="text-base font-semibold text-neutral-100">
          Friends
        </span>
      </div>
      <VerticalDivider />
      <Buttons />
    </header>
  );
};
