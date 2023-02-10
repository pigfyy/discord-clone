import { db } from "../firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export const setAsFriends = async (id1, id2) => {
  await setDoc(doc(db, "users", id1, "friends", id2), {
    relation: "friend",
    uid: id2,
  });
  await setDoc(doc(db, "users", id2, "friends", id1), {
    relation: "friend",
    uid: id1,
  });
};

export const setAsPending = async (inId, outId) => {
  await setDoc(doc(db, "users", outId, "friends", inId), {
    relation: "pending-in",
    uid: inId,
  });
  await setDoc(doc(db, "users", inId, "friends", outId), {
    relation: "pending-out",
    uid: outId,
  });
};

export const setAsStrangers = async (id1, id2) => {
  await deleteDoc(doc(db, "users", id1, "friends", id2));
  await deleteDoc(doc(db, "users", id2, "friends", id1));
};

export const removeRequest = async (inId, outId) => {
  await deleteDoc(doc(db, "users", inId, "friends", outId));
};
