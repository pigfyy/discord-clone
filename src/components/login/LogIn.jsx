import Button from "./Button";

function LogIn() {
  return (
    <div className="flex w-full items-center justify-center bg-[url('./assets/imgs/loginBg.png')] ">
      <div className="flex flex-col items-center gap-2 rounded-[5px] bg-neutral-500 p-8 shadow-[0_2px_10px_0px_rgba(0,0,0,0.2)]">
        <span className="text-center text-2xl font-semibold leading-[30px] text-neutral-100">
          Welcome back!
        </span>
        <span className="text-center text-base font-normal leading-5 text-neutral-175">
          We're so excited to see you again!
        </span>
        <Button />
      </div>
    </div>
  );
}

export default LogIn;
