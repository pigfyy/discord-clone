import { FaAt } from "react-icons/fa";
import { IconContext } from "react-icons";

export default () => {
  return (
    <header className="flex h-12 min-h-[3rem] items-center shadow-inset">
      <div className="flex gap-2 px-3">
        <div className="px-1">
          <IconContext.Provider
            value={{
              color: "hsl(213, 4%, 57%)",
              size: "1.5rem",
            }}
          >
            <FaAt />
          </IconContext.Provider>
        </div>
        <span className="text-base font-semibold text-neutral-100">
          All Chat
        </span>
      </div>
    </header>
  );
};
