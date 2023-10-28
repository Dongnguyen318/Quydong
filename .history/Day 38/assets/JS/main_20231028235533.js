import { client } from "./client.js";
import { requestRefresh } from "./token.js";

const root = document.querySelector(".root");
let pages = 1;
let loadingFlag = false;
let done = false;

const blog = {
  isLogin: function () {
    if (localStorage.getItem("login_tokens")) return true;
    else return false;
  },

  render: function () {
    if (!this.isLogin()) {
      root.innerHTML = `
            <div class="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
                <h2 class="heading text-center mb-5">Chào mừng bạn đến với blog</h2>
                <div class="action-btn w-100">
                    <div class="row">
                        <div class="btn-form-login col-6 d-grid">
                            <button class="btn btn-primary">Đăng nhập</button>
                        </div>
                        <div class="btn-form-register col-6 d-grid">
                            <button class="btn btn-primary">Đăng ký</button>
                        </div> 
                    </div>
                </div>
            </div>
            `;

      this.formLogin();
      this.formRegister();
    } else {
      root.innerHTML = `
            <div class="container py-3">
                <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
                <hr />
                <ul class="list-unstyled d-flex gap-3 profile">
                    <li>Chào bạn: <b class="name">Unknown Person</b></li>
                    <li><a href="#!" class="logout">Đăng xuất</a></li>
                </ul>

                <form class="form-post">
                    <h3 class="post-heading mb-3 mt-4">Đăng bài viết mới</h3>
                    <div class="row align-items-center justify-content-between">
                        <div class="form-group mb-3 col-6">
                            <label class="label-title mb-2">Tiêu đề:</label>
                            <input type="text" class="input-title form-control" placeholder="Title">
                        </div>
                        <div class="form-group form-group-calendar mb-3 col-6">
                            <label class="label-calendar mb-2">Ngày đăng:</label>
                            <input class="input-calendar form-control" placeholder="MM/DD/YYYY" readonly>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label class="label-content mb-2">Nội dung:</label>
                        <textarea class="textarea-content form-control" style="resize: none; height: 150px;" placeholder="Content"></textarea>
                    </div>

                    <div class="btn-post d-flex align-items-center justify-content-between">
                        <button class="btn btn-primary">Đăng bài</button>
                        <p class="notify-post"></p>
                    </div>
                </form>

                <hr />

                <h3 class="posts-heading mb-4">Các bài viết</h3>
                <div class="posts"></div>
                <p class="text-loading text-center fw-bold fs-2">Loading ...</p>
            </div>
            `;

      const textLoading = root.querySelector(".text-loading");
      textLoading.style.display = "none";

      this.getProfile();
      this.eventLogout();
      this.getBlogs();
      this.loadMoreBlogs();
      this.addBlog();
      this.renderCalendar();
    }
  },

  formLogin: function () {
    const btnFormLogin = root.querySelector(".btn-form-login");
    btnFormLogin.addEventListener("click", () => {
      root.innerHTML = `
            <div class="container">
                <haeder class="header">
                    <div class="row mt-5 mb-5 justify-content-center">
                        <div class="col-7">
                            <div class="row">
                                <h2 class="login-heading col-6">Vui lòng đăng nhập.</h2>
                                <div class="btn-return col-6 text-end">
                                    <button class="btn btn-primary">Quay lại</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </haeder>

                <form class="form-login">
                    <div class="row justify-content-center">
                        <div class="col-7">
                            <div class="form-group mb-4">
                                <label class="label-email mb-1">Nhập email:</label>
                                <input type="email" class="input-email form-control" placeholder="Email...">
                            </div>

                            <div class="form-group mb-4">
                                <label class="label-password mb-1">Nhập password:</label>
                                <input type="password" class="input-password form-control" placeholder="Password...">
                            </div>

                            <div class="btn-login d-grid">
                                <button class="btn btn-primary">Đăng nhập</button>
                            </div>

                            <div class="msg text-danger"></div>
                        </div>
                    </div>
                </form>
            </div>
            `;

      const btnReturn = root.querySelector(".btn-return button");
      btnReturn.addEventListener("click", () => {
        this.render();
      });

      this.evenLogin();
    });
  },

  formRegister: function () {
    const btnFormRegister = root.querySelector(".btn-form-register");
    btnFormRegister.addEventListener("click", () => {
      root.innerHTML = `
            <div class="container">
                <haeder class="header">
                    <div class="row mt-5 mb-5 justify-content-center">
                        <div class="col-7">
                            <div class="row">
                                <h2 class="register-heading col-6">Vui lòng đăng ký.</h2>
                                <div class="btn-return col-6 text-end">
                                    <button class="btn btn-primary">Quay lại</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </haeder>

                <form class="form-register">
                    <div class="row justify-content-center">
                        <div class="col-7">
                            <div class="form-group mb-4">
                                <label class="label-name mb-1">Nhập tên:</label>
                                <input type="text" class="input-name form-control" placeholder="Name...">
                            </div>

                            <div class="form-group mb-4">
                                <label class="label-email mb-1">Nhập email:</label>
                                <input type="email" class="input-email form-control" placeholder="Email...">
                            </div>

                            <div class="form-group mb-4">
                                <label class="label-password mb-1">Nhập password:</label>
                                <input type="password" class="input-password form-control" placeholder="Password...">
                            </div>

                            <div class="btn-register d-grid mb-5">
                                <button class="btn btn-primary">Đăng ký</button>
                            </div>
                            
                            <div class="alert" role="alert"></div>
                        </div>
                    </div>
                </form>
            </div>
            `;

      const btnReturn = root.querySelector(".btn-return button");
      btnReturn.addEventListener("click", () => {
        this.render();
      });

      this.evenRegister();
    });
  },

  evenRegister: function () {
    const formRegister = root.querySelector(".form-register");
    const alert = root.querySelector(".alert");

    formRegister.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameElement = formRegister.querySelector(".input-name");
      const emailElement = formRegister.querySelector(".input-email");
      const passwordElement = formRegister.querySelector(".input-password");
      const name = nameElement.value;
      const email = emailElement.value;
      const password = passwordElement.value;

      if (name && email && password)
        this.handleRegister({ name, email, password }, alert);
    });
  },

  handleRegister: async function (body, alert) {
    const btnRegister = root.querySelector(".btn-register button");

    this.addLoading(btnRegister);
    const { response, data } = await client.post("/auth/register", body);
    this.removeLoading(btnRegister);

    if (response.ok) {
      alert.classList.add("alert-success");
      alert.innerHTML = "Đăng ký thành công!";
      setTimeout(function () {
        alert.classList.remove("alert-success");
        alert.innerHTML = "";
      }, 4000);
    } else {
      alert.classList.add("alert-danger");
      alert.innerHTML = "Đăng ký thất bại!";
      setTimeout(function () {
        alert.classList.remove("alert-danger");
        alert.innerHTML = "";
      }, 4000);
    }
  },

  evenLogin: function () {
    const formLogin = root.querySelector(".form-login");
    const msg = root.querySelector(".msg");

    const emailElement = formLogin.querySelector(".input-email");
    const passwordElement = formLogin.querySelector(".input-password");
    emailElement.value = "phivanduc@gmail.com";
    passwordElement.value = "phivanduc";

    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailElement.value;
      const password = passwordElement.value;

      this.handleLogin({ email, password }, msg);
    });
  },

  handleLogin: async function (body, msg) {
    const btnLogin = root.querySelector(".btn-login button");

    this.addLoading(btnLogin);
    const { response, data } = await client.post("/auth/login", body);
    this.removeLoading(btnLogin);

    if (!response.ok) msg.innerHTML = "Đăng nhập thất bại!";
    else {
      const tokens = {
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      };
      localStorage.setItem("login_tokens", JSON.stringify(tokens));
      this.render();
    }
  },

  getProfile: async function () {
    const nameProfile = root.querySelector(".name");

    let oldTokens = localStorage.getItem("login_tokens");
    if (!oldTokens) {
      this.handleLogout();
      return;
    }
    oldTokens = JSON.parse(oldTokens);
    const { accessToken, refreshToken } = oldTokens;
    client.setToken(accessToken);

    const { response, data } = await client.get("/users/profile");
    if (!response.ok) {
      const newTokens = await requestRefresh(refreshToken);
      if (newTokens) {
        localStorage.setItem(
          "login_tokens",
          JSON.stringify(newTokens.data.token)
        );
        this.render();
      } else {
        this.handleLogout();
      }
    } else {
      nameProfile.innerText = data.data.name;
    }
  },

  eventLogout: function () {
    const btnLogout = root.querySelector(".logout");
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleLogout();
    });
  },

  handleLogout: async function () {
    if (localStorage.getItem("login_tokens"))
      localStorage.removeItem("login_tokens");
    this.render();
  },

  getBlogs: async function () {
    if (loadingFlag) return;
    loadingFlag = true;

    const posts = root.querySelector(".posts");
    const textLoading = root.querySelector(".text-loading");
    const { response, data: infoBlogs } = await client.get(
      `/blogs?page=${pages}`
    );
    loadingFlag = false;
    if (textLoading) textLoading.style.display = "none";

    if (response.ok) {
      if (!infoBlogs.data[0].userId) {
        textLoading.innerText = "Hết bài viết!";
        done = true;
        return;
      }
      infoBlogs.data.forEach((blog) => {
        if (!blog.createdAt) return;
        const { date, time } = this.getDateAndTime(blog.createdAt);
        const content = this.handleLink(blog.content);

        posts.innerHTML += `
                <div class="post-block">
                    <div class="post-content-wrap">
                        <p class="username">User: <span>${
                          blog.userId.name
                        }</span></p>
                        <h4 class="post-block-title">Title: ${blog.title}</h4>
                        <p class="post-block-content d-flex align-items-center">Content: <span class="ms-1">${content}</span></p>
                    </div>  
    
                    <div class="post-time-wrap text-end">
                        <p class="post-date mb-2">${date}</p>
                        <p class="post-time mb-2">${time}</p>
                        <p class="post-time-passed">Đã đăng: ${this.calcTimePassed(
                          date,
                          time
                        )}</p>
                    </div>
                </div>
                `;
      });
      pages++;
    }
  },

  getDateAndTime: function (data) {
    if (!data) return;
    const stringDate = new Date(data);
    const option = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
    };

    const formattedStringDate = stringDate.toLocaleString("en-US", option);
    let date = formattedStringDate.split(",")[0];
    let time = formattedStringDate.split(",")[1].trim();
    let amOrPm;

    if (+time.slice(0, 2) === 24) {
      time = "0" + time.slice(2);
    }

    if (+time.match(/^([^:]+)/)[1] >= 0 && +time.match(/^([^:]+)/)[1] <= 9)
      amOrPm = "Sáng";
    else if (
      +time.match(/^([^:]+)/)[1] >= 10 &&
      +time.match(/^([^:]+)/)[1] <= 11
    )
      amOrPm = "Trưa";
    else if (
      +time.match(/^([^:]+)/)[1] >= 12 &&
      +time.match(/^([^:]+)/)[1] <= 17
    )
      amOrPm = "Chiều";
    else if (
      +time.match(/^([^:]+)/)[1] >= 18 &&
      +time.match(/^([^:]+)/)[1] <= 21
    )
      amOrPm = "Tối";
    else amOrPm = "Đêm";
    time = time + " " + amOrPm;

    return { date, time };
  },

  handleLink: function (dataString) {
    const urlHomePageG =
      /^(http|https)?(?:\:\/\/)?([\w\-\.])*youtu(be|\.be)(\.com)?\/?$/;
    const urlVideoG =
      /(https\:\/\/|http\:\/\/)?[\w\-\.]*youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}/g;
    const urlVideo =
      /(?:https\:\/\/|http\:\/\/)?[\w\-\.]*youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
    const urlShareG =
      /(https\:\/\/|http\:\/\/)?youtu\.be\/[a-zA-Z0-9_-]{11}\?si=[a-zA-Z0-9_-]+/g;
    const urlShare =
      /(?:https\:\/\/|http\:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11}\?si=[a-zA-Z0-9_-]+)/;
    const sdt = /((0|\+84)\d{9})/g;
    const email = /([\w.-]+@[\w.-]+\.\w+)/g;

    if (dataString.match(urlVideoG)) {
      let i = 0;
      const result = dataString.match(urlVideoG);
      while (i < result.length) {
        const path = result[i].match(urlVideo)[1];
        dataString = dataString.replace(
          urlVideo,
          `
                <div>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${path}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                `
        );
        i++;
      }
    }
    if (dataString.match(urlShareG)) {
      let i = 0;
      const result = dataString.match(urlShareG);
      while (i < result.length) {
        const path = result[i].match(urlShare)[1];
        dataString = dataString.replace(
          urlShare,
          `
                <div>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${path}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                `
        );
        i++;
      }
    }
    if (dataString.match(sdt))
      dataString = dataString.replace(sdt, `<a href="tel:$1">$1</a>`);
    if (dataString.match(email))
      dataString = dataString.replace(email, `<a href="mailto:$1">$1</a>`);

    const saveArr = dataString.split(" ");
    for (let i = 0; i < saveArr.length; i++) {
      if (urlHomePageG.test(saveArr[i]))
        saveArr[i] = `<div><a href="${saveArr[i]}">${saveArr[i]}</a></div>`;
    }
    dataString = saveArr.join(" ");
    dataString.replace(/\s+/, " ");

    return dataString;
  },

  loadMoreBlogs: function () {
    window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        const textLoading = root.querySelector(".text-loading");
        if (textLoading) textLoading.style.display = "block";
        if (done) return;
        this.getBlogs();
      }
    });
  },

  addBlog: function () {
    const formPost = root.querySelector(".form-post");
    const inputCalendarElement = root.querySelector(".input-calendar");
    const objDate = new Date();
    const { date: saveCurrentDate } = this.getDateAndTime(objDate);
    const arrCurrentDate = saveCurrentDate.split("/");

    const stripHtml = (html) => html.replace(/<([^>]+)>/gi, "");
    formPost.addEventListener("submit", async (e) => {
      e.preventDefault();
      const titleElement = formPost.querySelector(".input-title");
      const contentElement = formPost.querySelector(".textarea-content");
      const posts = root.querySelector(".posts");

      let loginTokens = localStorage.getItem("login_tokens");
      loginTokens = JSON.parse(loginTokens);
      const { accessToken, refreshToken } = loginTokens;
      client.setToken(accessToken);

      const { data, response } = await client.post("/blogs", {
        title: stripHtml(titleElement.value),
        content: stripHtml(contentElement.value),
      });

      let arrInputCalendar;
      if (inputCalendarElement.value)
        arrInputCalendar = inputCalendarElement.value.split("/");
      if (
        !inputCalendarElement.value ||
        inputCalendarElement.value === saveCurrentDate
      ) {
        if (response.ok) {
          this.add(data, posts);
        } else {
          const newTokens = await requestRefresh(refreshToken);
          if (newTokens) {
            localStorage.setItem(
              "login_tokens",
              JSON.stringify(newTokens.data.token)
            );
            loginTokens = localStorage.getItem("login_tokens");
            loginTokens = JSON.parse(loginTokens);
            const { accessToken } = loginTokens;
            client.setToken(accessToken);

            const { data } = await client.post("/blogs", {
              title: stripHtml(titleElement.value),
              content: stripHtml(contentElement.value),
            });

            this.add(data, posts);
          } else {
            this.handleLogout();
          }
        }
        inputCalendarElement.value = "";
      } else if (
        (arrCurrentDate[1] < arrInputCalendar[1] &&
          arrCurrentDate[0] === arrInputCalendar[0]) ||
        (arrCurrentDate[1] !== arrInputCalendar[1] &&
          arrCurrentDate[0] < arrInputCalendar[0])
      ) {
        const notifyPost = root.querySelector(".notify-post");
        let today = new Date();
        let targetDate = new Date(inputCalendarElement.value);
        let timeDiff = targetDate.getTime() - today.getTime();

        let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        if (days > 0)
          notifyPost.innerText =
            "Bài viết sẽ đăng sau: " + days + " ngày và " + hours + " giờ.";
        else
          notifyPost.innerText =
            "Bài viết sẽ đăng sau: " +
            hours +
            " giờ, " +
            minutes +
            " phút, và " +
            seconds +
            " giây.";
      }
    });
  },

  add: function (mainData, postsElement) {
    if (!mainData.data.createdAt) return;
    const { date, time } = this.getDateAndTime(mainData.data.createdAt);
    const content = this.handleLink(mainData.data.content);

    const postBlock = document.createElement("div");
    postBlock.classList.add("post-block");
    postBlock.innerHTML = `
        <div class="post-content-wrap">
            <p class="username">User: <span>${mainData.data.userId.name}</span></p>
            <h4 class="post-block-title">Title: ${mainData.data.title}</h4>
            <p class="post-block-content">Content: <span>${content}</span></p>
        </div>

        <div class="post-time-wrap text-end">
            <p class="post-date mb-3">${date}</p>
            <p class="post-time">${time}</p>
        </div>
        `;

    postsElement.prepend(postBlock);
  },

  renderCalendar: function () {
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let day, current, calendarIcons;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    document.addEventListener("click", (e) => {
      if (e.target.closest(".calendar-container")) {
        if (e.target.closest(".calendar-dates")) {
          const calendarContainer = root.querySelector(".calendar-container");
          const activeDate = calendarContainer.querySelector(".active");
          let chooseDate = calendarContainer.querySelector(".choose");
          let chooseMonth = month + 1;
          let chooseYear = year;

          if (chooseDate) {
            if (activeDate) {
              if (chooseDate.classList.contains("inactive")) {
                chooseMonth++;
                if (chooseMonth > 12) {
                  chooseMonth = 0;
                  chooseYear++;
                }
              } else if (
                chooseDate.classList.contains("prev-month") ||
                +chooseDate.innerText < +activeDate.innerText
              )
                chooseDate = activeDate;
            } else if (!activeDate) {
              if (chooseDate.classList.contains("prev-month")) chooseMonth--;
              else if (chooseDate.classList.contains("inactive")) {
                chooseMonth++;
                if (chooseMonth > 12) chooseMonth = 1;
              }
            }
            inputCalendarElement.value = `${chooseMonth}/${chooseDate.innerText}/${chooseYear}`;
          }

          if (
            formGroup.lastElementChild.classList.contains("calendar-container")
          )
            formGroup.lastElementChild.remove();
        }
      } else if (e.target.classList.contains("input-calendar")) return;
      else {
        if (
          formGroup.lastElementChild.classList.contains("calendar-container")
        ) {
          formGroup.lastElementChild.remove();
        }
      }
    });
  },

  addLoading: function (btnElement) {
    btnElement.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading`;
  },

  removeLoading: function (btnElement) {
    if (btnElement.parentElement.classList.contains("btn-register"))
      btnElement.innerHTML = "Đăng ký";
    else btnElement.innerHTML = "Đăng nhập";
  },
};
blog.render();
