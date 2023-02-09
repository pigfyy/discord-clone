import Buttons from "./HeaderButtons";

import friendsIcon from "../../assets/imgs/friendsIcon.svg";

const VerticalDivider = () => {
  return <div className="h-6 w-[1px] bg-neutral-450"></div>;
};

export default () => {
  return (
    <header className="flex h-12 min-h-[3rem] items-center gap-4 shadow-inset">
      <div className="ml-3 flex gap-2">
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
