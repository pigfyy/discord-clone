import Header from "./Header";
import FriendsList from "./friendsList/FriendsList";
import AddFriend from "./addFriend/AddFriend";

import { useFriendsStore } from "../../store";

export default () => {
  const { currentPage } = useFriendsStore();

  return (
    <div className="flex max-h-screen w-full flex-col">
      <Header />
      {currentPage !== "Add Friend" ? (
        <div className="my-4">
          <span className="mx-[30px] text-xs font-semibold uppercase text-neutral-175">
            {currentPage}
          </span>
          <FriendsList />
        </div>
      ) : (
        <AddFriend />
      )}
    </div>
  );
};
