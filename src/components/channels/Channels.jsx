import Header from "./Header";
import Footer from "./Footer";
import UserList from "./UserList";

export default () => {
  return (
    <div className="flex w-[240px] min-w-[240px] flex-col justify-between bg-neutral-800">
      <div>
        <Header />
        <UserList />
      </div>
      <Footer />
    </div>
  );
};
