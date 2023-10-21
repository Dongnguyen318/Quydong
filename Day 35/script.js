import { client } from "./API/client.js";

const container = document.querySelector(".container");
const posts = container.querySelector(".posts");
const overlay = document.querySelector(".load-overlay");
let isloading = false;

window.addEventListener("load", () => {
  setTimeout(() => {
    overlay.style.display = "none";
  }, 2000);
});

const getUserHTML = async (post) => {
  let html = await client
    .get(`/users/${post.userID}`)
    .then(({ data }) => data)
    .then(
      ({ name, avatar }) =>
        `
        <div class="user">
            <img
              src="${avatar}"
              alt=""
            />
            <p>${name}</p>
          </div>
        `
    )
    .catch((err) => err);
  return html;
};

const getContentHTML = async (post) => `
<div class="body">
          <h3 class="title">${post.title.toUpperCase()}</h3>
          <div class="content">
            <p>
              ${post.body.content}
            </p>
          </div>
          <figcaption>
            <img
              src="${post.body.image.url}"
            />
            <p>
              ${post.body.image.name}
            </p>
          </figcaption>
        </div>
`;

const getPosts = async () => {
  // Start load
  isloading = true;

  //Loading ...
  await client.get("/posts").then(({ data }) => {
    data.forEach(async (post) => {
      let userHTML = await getUserHTML(post);
      let contentHTML = await getContentHTML(post);
      let postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = userHTML + contentHTML;
      posts.append(postDiv);
    });
  });
  // Done
  isloading = false;
};
getPosts();

window.addEventListener("scroll", async (e) => {
  if (
    window.innerHeight + window.scrollY >=
      (document.body.offsetHeight * 80) / 100 &&
    !isloading
  ) {
    getPosts();
  }
});