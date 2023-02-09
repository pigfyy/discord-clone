import FriendsListItem from "./ListItem";

import { useEffect } from "react";
import { useFriendsStore } from "../../../store";

import { db, auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, onSnapshot, where } from "firebase/firestore";

export default () => {
  const { userFriendIds, currentPage, setUserFriendIds } = useFriendsStore();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const queryRef = (() => {
      if (currentPage === "Online" || currentPage === "All")
        return where("relation", "==", "friend");
      if (currentPage === "Pending")
        return where("relation", "in", ["pending-in", "pending-out"]);
      if (currentPage === "Blocked") return where("relation", "==", "blocked");
    })();

    const q = query(collection(db, "users", user.uid, "friends"), queryRef);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const userFriendsIds = [];
      querySnapshot.forEach((doc) => {
        userFriendsIds.push(
          `${doc.id} ${
            doc.data().relation === "pending-in"
              ? "pending-in"
              : doc.data().relation === "pending-out"
              ? "pending-out"
              : ""
          }`
        );
      });
      setUserFriendIds(userFriendsIds);
    });

    return unsub;
  }, [currentPage]);

  const friends = userFriendIds.map((friendId) => {
    return <FriendsListItem key={friendId} friendId={friendId} />;
  });

  return <ul className="mx-[20px] mt-3">{friends}</ul>;
};
