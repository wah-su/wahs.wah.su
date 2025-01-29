async function get(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return await res.json();
}

function random_five(type) {
  let _selection = [];
  let result = [];

  if (type == "images") {
    _selection = images;
  } else if (type == "videos") {
    _selection = videos;
  } else {
    console.error(`WRONG TYPE (${type})! @ function random_five!`);
  }

  const max = _selection.length - 1;

  for (let i = 0; i < 4; i++) {
    result.push(_selection[Math.floor(Math.random() * max)]);
  }

  return result;
}

// async function FetchData() {
//   let images = await get("./data/images.json");
//   let videos = await get("./data/videos.json");
//   console.log(images, videos);
// }
// window.onload = () => {
//     FetchData();
// }
