import React from "react";

function Button() {
  const logUserIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <button className="mt-3" onClick={logUserIn}>
      <div className="flex items-center gap-2 rounded-sm bg-neutral-100 p-3 py-2">
        <div className="h-[22px] w-[22px]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt=""
          />
        </div>
        <span className="text-[14px] font-medium text-neutral-450">
          Sign in with Google
        </span>
      </div>
    </button>
  );
}

export default Button;
