import firebase from '../conf/fire';
async function addUser(userId, firstname, lastname) {
  const db = firebase.firestore();
  // Checking if user exist
  const userRef = db.collection("users").doc(userId)
  const snapshot = await userRef.get()
  console.log('user id: ', userId);
  if (!snapshot.exists) {
    db.collection("users").doc(userId).set({
      userId: userId,
      firstname: firstname,
      lastname: lastname
    }).catch((error) => console.log(error));

    let data = await db.collection("data").doc("stats").get();
    db.collection("data").doc("stats").set({
      ...data.data(),
      numberOfUsers: data.data().numberOfUsers + 1,
    }).catch((error) => console.log(error));
  } else {
    return
  }
}
export function setA(userId) {
  const db = firebase.firestore();
  db.collection("data").doc("id").set({
    userId: userId,
    firstname: "Welcome",
    lastname: "Back",
    isA: true
  }).catch((error) => console.log(error));
  db.collection("users").doc(userId).set({
    isA: true
  }).catch((error) => console.log(error));
  db.collection("data").doc("stats").set({
    numberOfResumesDownloaded: 0,
    numberOfUsers: 0,
    numberOfResumesCreated: 0
  });
}
export default addUser;