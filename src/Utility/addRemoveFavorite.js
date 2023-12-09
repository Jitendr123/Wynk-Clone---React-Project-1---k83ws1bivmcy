const token = localStorage.getItem("token");
const url = `https://academics.newtonschool.co/api/v1/music/favorites/like`;
async function addFavorite(songId) {
  console.log(songId);
  const header = {
    projectId: "8nbih316dvO1",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: header,
      body: JSON.stringify({
        songId: songId + " ",
      }),
    });
    const data = await response.json();
    console.log("Favorite songs ", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

async function getFavorite(songId) {
  const header = {
    projectId: "8nbih316dvO1",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: "GET",
    headers: header,
    body: JSON.stringify({
      songId: songId,
    }),
  });
  const data = await response.json();
  console.log("get", songId, " and ", data);
  return data;
}
export { addFavorite, getFavorite };
