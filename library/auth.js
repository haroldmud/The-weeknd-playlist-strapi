export function setToken(data) {
  // Replace 'your-storage-key' with the actual key you want to use.
  console.log(data.jwt, "data.jwt ---");
  localStorage.setItem("token", data.jwt);
}

export function unsetToken() {
  // Replace 'your-storage-key' with the actual key you used.
  localStorage.removeItem("token");
}
