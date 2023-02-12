import Header from "./Header";
import FriendsList from "./friendsList/FriendsList";
import AddFriend from "./addFriend/AddFriend";

import { useFriendsStore } from "../../store";

export default () => {
  const { currentPage } = useFriendsStore();

  return (
    <div className="flex max-h-screen w-full flex-col">
      <Header />
      {currentPage !== "Add Friend" ? <FriendsList /> : <AddFriend />}
    </div>
  );
};
