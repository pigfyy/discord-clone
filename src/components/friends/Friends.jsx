import Header from "./Header";
import FriendsList from "./FriendsList";
import AddFriend from "./AddFriend";

export default () => {
  return (
    <div className="flex max-h-screen w-full flex-col">
      <Header />
      {true ? (
        <div className="my-4">
          <span className="mx-[30px] text-xs font-semibold uppercase text-neutral-175">
            Online — 15
          </span>
          <FriendsList />
        </div>
      ) : (
        <AddFriend />
      )}
    </div>
  );
};
