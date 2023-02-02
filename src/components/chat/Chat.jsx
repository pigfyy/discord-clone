import Header from "./Header";
import Messages from "./Messages";
import Input from "./Input";

export default () => {
  return (
    <div className="flex max-h-screen w-full flex-col">
      <Header />
      <Messages />
      <Input />
    </div>
  );
};
