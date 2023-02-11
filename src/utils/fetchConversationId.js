import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async (id1, id2) => {
  const q = query(
    collection(db, "conversations"),
    where("participantIDs", "array-contains-any", [id1, id2]),
    where("isDm", "==", true)
  );
  const querySnapshot = await getDocs(q);

  const conversationId = [];
  querySnapshot.forEach((doc) => {
    conversationId.push(doc.id);
  });
  if (conversationId.length === 0) {
    console.log("error: no conversation id found");
    return;
  }
  if (conversationId.length > 1) {
    console.log("error: multiple conversation ids found");
    return;
  }
  return conversationId[0];
};
