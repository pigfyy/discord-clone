import Header from "./Header";
import FriendsList from "./FriendsList";

export default () => {
  return (
    <div className="flex max-h-screen w-full flex-col">
      <Header />
      <FriendsList />
    </div>
  );
};
