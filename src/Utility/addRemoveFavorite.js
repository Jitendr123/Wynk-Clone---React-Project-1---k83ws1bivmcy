const token = localStorage.getItem("token");
const url = `https://academics.newtonschool.co/api/v1/music/favorites/like`;
async function addFavorite(songId) {
  const header = {
    projectId: "8nbih316dvO1",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      songId: songId,
    }),
  });
  const data = await response.json();
  console.log("Favorite songs ", data);
  return data;
}
async function removeFavorite(songId) {
  const header = {
    projectId: "8nbih316dvO1",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: "DELETE",
    headers: header,
    body: JSON.stringify({
      songId: songId,
    }),
  });
  const data = await response.json();
  console.log("remove", songId, " and ", data);
  return data;
}
export { addFavorite, removeFavorite };
