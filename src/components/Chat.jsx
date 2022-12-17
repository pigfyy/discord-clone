import { FaAt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState } from "react";

export default () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
  };

  return (
    <div className="flex w-full flex-col">
      <header className="flex h-12 items-center border-b-[1px] border-neutral-950">
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
            CAMICSC
          </span>
        </div>
      </header>
      <main className="flex h-full w-full flex-col">
        <div className="h-full overflow-y-scroll px-3"></div>
        <form className="h-[68px] w-full px-3" onSubmit={handleSubmit}>
          <div className="flex h-[44px] items-center rounded-lg bg-neutral-500 px-4">
            <input
              type="text"
              className="w-full bg-neutral-500 text-base font-normal text-neutral-150 outline-none"
              placeholder="Message @CAMICSC"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </form>
      </main>
    </div>
  );
};
