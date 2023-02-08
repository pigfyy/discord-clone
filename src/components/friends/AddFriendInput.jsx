import { useState } from "react";

export default () => {
  const [input, setInput] = useState("");

  return (
    <form className="group flex w-full rounded-[9px] border-[1px] border-[#00000000] focus-within:border-primary-300">
      <input
        type="text"
        placeholder="Enter a Username#0000"
        className="h-12 w-full rounded-l-lg bg-neutral-900 px-3 text-base font-medium leading-[21px] tracking-[0.64px] text-neutral-150 placeholder-neutral-475 placeholder-opacity-100 outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="grid flex-shrink-0 place-items-center rounded-r-lg bg-neutral-900 px-4">
        <button
          className={`h-8 rounded-[3px] bg-primary-400 py-[2px] pl-4 pr-3 text-sm font-medium leading-4 text-neutral-100 ${
            !input.length && "cursor-not-allowed opacity-50"
          }`}
        >
          Send Friend Request
        </button>
      </div>
    </form>
  );
};
