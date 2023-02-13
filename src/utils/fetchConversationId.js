import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
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
    if (
      !doc.data().participantIDs.includes(id1) ||
      !doc.data().participantIDs.includes(id2)
    ) {
      return;
    }
    conversationId.push(doc.id);
  });
  if (conversationId.length === 0) {
    const docRef = await addDoc(collection(db, "conversations"), {
      groupName: null,
      groupPfp: null,
      isDm: true,
      participantIDs: [id1, id2],
      lastMsgTimestamp: Timestamp.now(),
    });
    await setDoc(doc(db, "users", id1, "conversations", docRef.id), {
      conversationId: docRef.id,
    });
    await setDoc(doc(db, "users", id2, "conversations", docRef.id), {
      conversationId: docRef.id,
    });
    return docRef.id;
  }
  if (conversationId.length > 1) {
    console.log("error: multiple conversation ids found");
    return;
  }
  return conversationId[0];
};
