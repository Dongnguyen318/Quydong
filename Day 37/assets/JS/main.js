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
