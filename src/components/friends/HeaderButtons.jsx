import { useFriendsStore } from "../../store";

export default () => {
  const { currentPage, setCurrentPage } = useFriendsStore();

  return ["Online", "All", "Pending", "Blocked", "Add Friend"].map((button) => {
    const handleClick = () => {
      setCurrentPage(button);
    };

    const isAddFriend = button === "Add Friend";
    const isCurrentPage = button === currentPage;

    return (
      <button
        className={`flex items-center gap-4 rounded px-[8px] py-[2px] ${(() => {
          if (isAddFriend && !isCurrentPage) return "bg-green-400";
          if (isAddFriend && isCurrentPage) return "";
          if (!isCurrentPage) return "hover:bg-neutral-500";
          return "bg-[#4f545c99]";
        })()}`}
        key={crypto.randomUUID()}
        onClick={handleClick}
      >
        <span
          className={`text-[16px] font-medium leading-5 ${(() => {
            if (isAddFriend && isCurrentPage) return "text-green-200";
            if (isAddFriend || isCurrentPage) return "text-neutral-100";
            return "text-neutral-175 hover:text-neutral-150 active:text-neutral-100";
          })()}`}
        >
          {button}
        </span>
      </button>
    );
  });
};
