export async function getUserData(data) {
  const test = await data;
  console.log(test);
  setUserData(test);
}

export async function setUserData(userData) {
  console.log(userData);
  return userData;
}
