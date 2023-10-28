import { client } from "./client";
import { requestRefresh } from "./token.js";

// Variables
let currentPage = 1;
let isFetching = false;
let hasMore = true;

// DOM Manipulation functions
const toggleClass = (selector, addClass, removeClass) => {
  const element = document.querySelector(selector);
  element.classList.add(addClass);
  element.classList.remove(removeClass);
};

const showLoading = () =>
  (document.getElementById("loading").style.display = "block");
const hideLoading = () =>
  (document.getElementById("loading").style.display = "none");

const changeTime = (timeDifference, formatForBlog = false) => {
  let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  let days = Math.floor((timeDifference / (1000 * 60 * 60 * 24)) % 30);
  let years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

  if (formatForBlog) {
    if (days > 0 && days < 31) {
      return `${days} ngày`;
    } else if (days === 0 && hours > 0) {
      return `${hours} giờ` + (minutes > 0 ? ` ${minutes} phút` : "");
    } else if (days === 0 && hours === 0 && minutes > 0) {
      return `${minutes} phút`;
    } else if (days === 0 && hours === 0 && minutes === 0) {
      return `vài giây`;
    } else {
      return years > 0 ? `${years} năm` : "";
    }
  } else {
    return (
      (years > 0 ? `${years} năm ` : "") +
      (days > 0 ? `${days} ngày ` : "") +
      (hours > 0 ? `${hours} giờ ` : "") +
      (minutes > 0 ? `${minutes} phút ` : "")
    );
  }
};

const fetchData = async () => {
  showLoading(); // Hiển thị trạng thái đang tải

  const list = document.querySelector(".block-list");
  isFetching = true;

  try {
    const { response, data: _data } = await client.get(
      `/blogs?page=${currentPage}`
    );
    currentPage++; // Tăng giá trị của currentPage
    const data = _data.data;

    if (data === undefined) {
      hasMore = false;
      hideLoading(); // Ẩn trạng thái đang tải
      return;
    }

    const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");
    for (let post of data) {
      const div = document.createElement("div");
      const separate = document.createElement("hr");
      const { createdAt } = post;
      const date = new Date(createdAt);
      const today = new Date();
      const timeDifference = today.getTime() - date.getTime();
      const timeUp = changeTime(timeDifference, true); // Sử dụng hàm changeTime đã được định nghĩa trước đó

      const dateString = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      const HoursString = `${date.getHours()} giờ ${
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      } phút`;

      div.innerHTML = `
                    <div class="container">
                         <div class="row">
                         <div class="col-3">
                              <div>${stripHtml(dateString)}</div>
                              <div>${stripHtml(HoursString)}</div>
                         </div>
                         <div class="col-9">
                              <h2>${stripHtml(post.userId.name)}</h2>
                              <h4>${stripHtml(post.title)}</h4>
                              <p>${stripHtml(post.content)}</p>
                              <p class="date">${timeUp} trước</p>
                         </div>
                         </div>
                    </div>`;
      list.appendChild(separate);
      list.appendChild(div);
    }

    hideLoading(); // Ẩn trạng thái đang tải

    // Bộ nghe sự kiện cuộn để tải thêm bài viết khi người dùng cuộn đến cuối trang
    window.addEventListener("scroll", () => {
      if (isFetching || !hasMore) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        fetchData();
      }
    });
  } catch {
    hideLoading(); // Ẩn trạng thái đang tải
  }
};

const renderDefault = () => {
  const root = document.querySelector("#root");
  root.innerHTML = `
          <div class="wrapper">
               <h1>Blogger</h1>
               <button type="submit" class="btn btn-primary">Đăng nhập</button>
          </div>
          <div class="block-list"></div>
     `;

  // Khởi tạo trang bài viết với số trang hiện tại
  currentPage = 1;
  fetchData();

  const btn = root.querySelector("button");
  btn.addEventListener("click", function () {
    renderLogin();
    app.eventLogin();
  });
};

const renderForm = (type = "login") => {
  const root = document.querySelector("#root");

  if (type === "login") {
    root.innerHTML = `
                    <div class="container py-3">
                         <div class="row justify-content-center">
                              <div class="col-7">
                              <form class="login">
                                   <div class="mb-3">
                                        <label for="">Email</label>
                                        <input
                                             type="email"
                                             class="form-control email"
                                             placeholder="Email..."
                                        />
                                        </div>
                                        <div class="mb-3">
                                        <label for="">Mật khẩu</label>
                                        <input
                                             type="password"
                                             class="form-control password"
                                             placeholder="Mật khẩu..."
                                        />
                                        </div>
                                        <div class="d-grid">
                                             <button type="submit" class="btn btn-primary">Đăng nhập</button>
                                        </div>
                              </form>
                              <div class ="msg text-danger"></div>
                              <div>
                                   <span>Tạo tài khoản?</span> <a class="register-button" href="#!">Đăng Ký</a>
                              </div>
                              <a class="default" href="#!">Quay lại trang chủ</a>
                              </div>
                         </div>
                    </div>`;

    const registerBtn = document.querySelector(".register-button");
    registerBtn.addEventListener("click", function (e) {
      e.preventDefault();
      renderForm("register");
    });
  } else if (type === "register") {
    root.innerHTML = `
                    <div class="container py-3">
                         <div class="row justify-content-center">
                              <div class="col-7">
                              <form class="register">
                                   <div class="mb-3">
                                        <label for="">Tên</label>
                                        <input
                                        type="text"
                                        class="form-control name"
                                        placeholder="Name..."
                                        />
                                   </div>
                                        <div class="mb-3">
                                        <label for="">Email</label>
                                        <input
                                             type="email"
                                             class="form-control email"
                                             placeholder="Email..."
                                        />
                                        </div>
                                        <div class="mb-3">
                                        <label for="">Mật khẩu</label>
                                        <input
                                             type="password"
                                             class="form-control password"
                                             placeholder="Mật khẩu..."
                                        />
                                        </div>
                                        <div class="d-grid">
                                        <button type="submit" class="btn btn-primary">Đăng kí</button>
                                        </div>
                              </form>
                              <div class ="msg text-danger"></div>
                              <div>
                                   <span>Bạn đã có tài khoản?</span> <a class="login-button" href="#!">Đăng nhập</a>
                              </div>
                              <a class="default" href="#!">Quay lại trang chủ</a>
                              </div>
                         </div>
                    </div>`;

    // Attach event listeners specific to the registration form
    const loginBtn = document.querySelector(".login-button");
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      renderForm("login");
    });
  }
};

// App logic
const app = {
  render: function () {
    const root = document.querySelector("#root");
    if (this.isLogin()) {
      root.innerHTML = `
                    <h1>Xin chào, [Tên người dùng]!</h1>
                    <button type="submit" class="btn btn-primary" id="logoutBtn">Đăng xuất</button>
                    <div class="block-list"></div>
               `;

      const logoutBtn = document.getElementById("logoutBtn");
      logoutBtn.addEventListener("click", () => {
        this.handleLogout();
      });
    } else {
      root.innerHTML = `
               <div class="wrapper">
                    <h1>Blogger</h1>    
                    <button type="submit" class="btn btn-primary">Đăng nhập</button>
               </div>    
               <div class="block-list"></div>
               `;

      // Khởi tạo trang bài viết với số trang hiện tại
      currentPage = 1;
      fetchData();

      const btn = root.querySelector("button");
      btn.addEventListener("click", function () {
        app.handleLogin();
        app.eventLogin();
      });
    }
  },

  isLogin: function () {
    return localStorage.getItem("login_tokens") !== null;
  },

  handleLogin: async function (credentials, msgElement) {
    // Hiển thị trạng thái đang tải
    this.addLoading();

    // Gửi yêu cầu đăng nhập đến server
    const { response, data: tokens } = await client.post(
      "/auth/login",
      credentials
    );

    // Xử lý phản hồi từ server
    if (!response.ok) {
      // Nếu có lỗi, hiển thị thông báo lỗi
      msgElement.innerText = tokens.message;
      this.removeLoading();
    } else {
      // Nếu thành công, lưu tokens vào localStorage và render lại ứng dụng
      localStorage.setItem("login_tokens", JSON.stringify(tokens));
      this.render();
    }
  },

  addLoading: function () {
    const form = document.querySelector(".login");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Loading`;
    btn.disabled = true;
  },

  removeLoading: function () {
    const form = document.querySelector(".login");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `Đăng nhập`;
    btn.disabled = false;
  },

  handleRegister: async function (userData, msgElement) {
    // Hiển thị trạng thái đang tải
    this.addLoadingRegister();

    // Gửi yêu cầu đăng ký đến server
    const { response, data: result } = await client.post(
      "/auth/register",
      userData
    );

    // Xử lý phản hồi từ server
    if (!response.ok) {
      // Nếu có lỗi, hiển thị thông báo lỗi
      msgElement.innerText = result.message;
      this.removeLoadingRegister();
    } else {
      // Nếu thành công, hiển thị thông báo và quay về trang đăng nhập
      msgElement.innerText =
        "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.";
      setTimeout(() => {
        this.renderForm("login");
        this.eventLogin();
      }, 2000);
    }
  },

  addLoadingRegister: function () {
    const form = document.querySelector(".register");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Đang đăng ký`;
    btn.disabled = true;
  },

  removeLoadingRegister: function () {
    const form = document.querySelector(".register");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `Đăng kí`;
    btn.disabled = false;
  },

  eventLogin: function () {
    const form = document.querySelector(".login"); // Lấy form đăng nhập
    const msg = document.querySelector(".msg"); // Lấy phần tử hiển thị thông báo

    // Thêm sự kiện "submit" cho form đăng nhập
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Ngăn sự kiện mặc định của form

      const emailEl = e.target.querySelector(".email");
      const passwordEl = e.target.querySelector(".password");
      const email = emailEl.value;
      const password = passwordEl.value;

      // Xử lý đăng nhập
      this.handleLogin({ email, password }, msg);
    });
  },

  getToken: function () {
    // Lấy chuỗi token từ localStorage
    const tokenString = localStorage.getItem("login_tokens");

    // Parse chuỗi token để lấy ra đối tượng token
    const tokens = tokenString ? JSON.parse(tokenString) : null;

    if (!tokens) {
      return null;
    }

    // Kiểm tra xem access token có hết hạn chưa
    const now = new Date().getTime();
    if (tokens.access_expiry && now > tokens.access_expiry) {
      // Nếu access token đã hết hạn, sử dụng refresh token để lấy lại access token mới
      return this.refreshAccessToken(tokens.refresh_token);
    }

    return tokens.access_token;
  },

  refreshAccessToken: async function (refreshToken) {
    try {
      // Gửi yêu cầu đến server để lấy lại access token mới
      const { response, data } = await requestRefresh(refreshToken);

      if (response.ok) {
        // Lưu access token mới và thời gian hết hạn vào localStorage
        const tokens = {
          access_token: data.access_token,
          refresh_token: refreshToken,
          access_expiry: new Date().getTime() + data.expires_in * 1000, // Giả sử "expires_in" là số giây cho đến khi token hết hạn
        };
        localStorage.setItem("login_tokens", JSON.stringify(tokens));
        return data.access_token;
      } else {
        // Nếu có lỗi, xóa token khỏi localStorage và yêu cầu người dùng đăng nhập lại
        localStorage.removeItem("login_tokens");
        app.render();
        throw new Error(data.message || "Error refreshing token");
      }
    } catch (error) {
      console.error("Failed to refresh access token:", error.message);
      return null;
    }
  },

  handleLogout: async function () {
    // Lấy refresh token từ localStorage (nếu cần)
    const tokens = JSON.parse(localStorage.getItem("login_tokens"));
    const refreshToken = tokens ? tokens.refresh_token : null;

    // Xóa tokens khỏi localStorage
    localStorage.removeItem("login_tokens");

    try {
      // Gửi yêu cầu đăng xuất đến server (tùy thuộc vào cơ chế xác thực của bạn)
      if (refreshToken) {
        const { response, data } = await client.post("/auth/logout", {
          refreshToken: refreshToken,
        });

        if (!response.ok) {
          console.error("Error during logout:", data.message);
        }
      }
    } catch (error) {
      console.error("Failed to logout:", error.message);
    } finally {
      app.render();
    }
  },

  handlePost: async function (postData) {
    // Lấy token từ localStorage
    const token = localStorage.getItem("login_tokens");

    if (!token) {
      // Người dùng chưa đăng nhập hoặc token đã hết hạn
      console.error("You must be logged in to create a post.");
      return;
    }

    // Thiết lập token cho client
    client.setToken(token);

    try {
      // Gửi yêu cầu POST để tạo mới bài viết
      const { response, data } = await client.post("/posts", postData);

      if (response.status !== 201) {
        // Một số lỗi xảy ra khi tạo mới bài viết
        console.error("Failed to create post.", data);
        return;
      }

      // Bài viết đã được tạo thành công
      console.log("Post created successfully!", data);
      return data;
    } catch (error) {
      console.error("An error occurred while creating the post.", error);
    }
  },

  initEventListeners: function () {
    // Sự kiện cuộn trang để tải thêm bài viết
    window.addEventListener("scroll", () => {
      if (isFetching || !hasMore) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        fetchData();
      }
    });

    // Sự kiện submit form đăng nhập
    const loginForm = document.querySelector(".login");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailEl = e.target.querySelector(".email");
        const passwordEl = e.target.querySelector(".password");
        const email = emailEl.value;
        const password = passwordEl.value;
        this.handleLogin({ email, password });
      });
    }

    // Sự kiện chuyển giữa form đăng nhập và đăng ký
    const registerBtn = document.querySelector(".register-button");
    const loginBtn = document.querySelector(".login-button");
    if (registerBtn) {
      registerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        renderForm("register");
      });
    }
    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        renderForm("login");
      });
    }

    // Sự kiện submit form đăng ký (nếu bạn muốn thêm tính năng này)
    const registerForm = document.querySelector(".register");
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameEl = e.target.querySelector(".name");
        const emailEl = e.target.querySelector(".email");
        const passwordEl = e.target.querySelector(".password");
        const name = nameEl.value;
        const email = emailEl.value;
        const password = passwordEl.value;
        this.handleRegister({ name, email, password });
      });
    }
  },
};

app.render();
