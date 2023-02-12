import FriendsListItem from "./ListItem";

import { useEffect, useState } from "react";
import { useFriendsStore } from "../../../store";

import { db, auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, onSnapshot, where, doc } from "firebase/firestore";

export default () => {
  const [user] = useAuthState(auth);

  const { userFriendIds, currentPage, setUserFriendIds } = useFriendsStore();
  const [shownFriends, setShownFriends] = useState([]);

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
        const pendingStr =
          doc.data().relation === "pending-in"
            ? "pending-in"
            : doc.data().relation === "pending-out"
            ? "pending-out"
            : "";
        userFriendsIds.push(`${doc.id}` + (pendingStr ? ` ${pendingStr}` : ""));
      });
      setUserFriendIds(userFriendsIds);
    });

    return unsub;
  }, [currentPage]);

  useEffect(() => {
    setShownFriends([]);
    const unsubFunctions = [];
    userFriendIds.forEach((friendId) => {
      const uid = friendId.split(" ")[0];
      const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        if (currentPage === "Online" && doc.data().status !== "Online") {
          setShownFriends((prev) => {
            return prev.filter((friend) => friend.id !== doc.id);
          });
        } else {
          setShownFriends((prev) => {
            return [
              ...prev.filter((friend) => friend.id !== doc.id),
              {
                displayName: doc.data().displayName,
                pfp: doc.data().photoURL,
                status: doc.data().status,
                id: friendId,
              },
            ];
          });
        }
      });
      unsubFunctions.push(unsub);
    });

    return () => {
      unsubFunctions.forEach((unsub) => unsub());
    };
  }, [userFriendIds]);

  const friends = shownFriends.map((friend) => {
    return <FriendsListItem key={crypto.randomUUID()} friendData={friend} />;
  });

  return <ul className="mx-[20px] mt-3">{friends}</ul>;
};
