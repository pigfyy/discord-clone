import { IconContext } from "react-icons";
import { BsPlusLg } from "react-icons/bs";

export default () => {
  return (
    <header>
      <div className="flex w-full items-center justify-between gap-[14px] px-3 pt-[6px] pr-4">
        <span className="text-xs font-semibold uppercase text-neutral-300">
          Direct Messages
        </span>
        <button>
          <IconContext.Provider
            value={{
              color: "white",
              size: "10px",
            }}
          >
            <BsPlusLg />
          </IconContext.Provider>
        </button>
      </div>
    </header>
  );
};
