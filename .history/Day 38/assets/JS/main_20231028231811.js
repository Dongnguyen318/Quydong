import { client } from "./client.js";
client.setUrl("https://api-auth-two.vercel.app");

const container = document.querySelector("#container");

const isSign_in = () => {
  const clickSign_in = sessionStorage.getItem("click-sign_in");
  if (clickSign_in) {
    return true;
  }
  return false;
};

const handleLogout = () => {
  localStorage.removeItem("status");
  localStorage.removeItem("login");
  sessionStorage.removeItem("click-sign_in");
  sessionStorage.removeItem("click-sign_up");
  render();
};

const renderBlogs = async () => {
  const { data: blogs } = await client.get("/blogs");
  const blog_post = document.querySelector(".blog-post");
  const htmlBlogs = blogs.data
    .map((blog) => {
      const timeMing = blog.createdAt;
      const createdAt = new Date(timeMing);
      const DayCreat = `${createdAt.getDate()}-${
        createdAt.getMonth() + 1
      }-${createdAt.getFullYear()} `;
      const timeCreat = `${createdAt.getHours()}:${
        createdAt.getMinutes() < 10
          ? "0" + createdAt.getMinutes()
          : createdAt.getMinutes()
      }`;
      return `
        <div class="post">
          <div class="inner-post">
            <div class="timming">
              <div>${DayCreat}</div>
              <div>${timeCreat}</div>
            </div>
            <div class="infor-post">
              <div class="infor-user-post">
                <div class="avatar-user">${blog.userId.name.trim()[0]}</div>
                <div class="name-user">${blog.userId.name}</div>
              </div>
              <div class="title-post">${blog.title}</div>
              <div class="content-post">${blog.content}</div>
            </div>
          </div>
          <hr />
        </div>`;
    })
    .join("");
  if (blog_post) {
    blog_post.innerHTML = htmlBlogs;
  }
};

// const postStatus = () => {
//   const create_post = document.querySelector(".create-post")
//   if(create_post) {
//     const handleContent = create_post.querySelector(".content").value
//     const handleTitle = create_post.querySelector(".title").value
//     create_post.addEventListener("submit", (e) => {
//       e.preventDefault()
//       console.log(handleTitle);
//       console.log(handleContent);
//     })
//   }
// }

const getProfile = async () => {
  const name_user = document.querySelector(".name-user");
  const avatar_user = document.querySelector(".avatar-user");

  const tokens = localStorage.getItem("login");
  if (tokens) {
    const profile = JSON.parse(tokens);
    if (profile.accessToken) {
      client.setToken(profile.accessToken);
      const { data: infor, response } = await client.get(`/users/profile`);
      if (response.status === 401) {
        // handleLogout()
        requestRefresh();
      }
      if (response.status === 200) {
        avatar_user.innerText = `${infor.data.name.charAt(0).toUpperCase()}`;
        name_user.innerText = `${infor.data.name}`;
        renderDatetimePicker();
      }
    }
  }
};

const eventSign_in = () => {
  const btn_SignIn = document.querySelector(".btn_sign-in");
  const goHome = document.querySelector(".go-home");
  btn_SignIn?.addEventListener("click", () => {
    sessionStorage.setItem("click-sign_in", "click");
    render();
  });
  goHome?.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("click-sign_in");
    sessionStorage.removeItem("click-sign_up");
    render();
  });
  const formSign_in = document.querySelector(".form-sign_in");
  if (formSign_in) {
    const btn_SignUp = formSign_in.querySelector(".btn-sign_up");
    formSign_in.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailEl = e.target.querySelector(".email");
      const passwordEl = e.target.querySelector(".password");

      const email = emailEl.value;
      const password = passwordEl.value;

      handleSignin({ email, password });
    });
    btn_SignUp.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("click-sign_up", "click");
      render();
      const formSign_up = document.querySelector(".form-sign_up");
      if (formSign_up) {
        // const btn_SignUp = formSign_up.querySelector(".btn-sign_up");
        formSign_up.addEventListener("submit", (e) => {
          e.preventDefault();
          const nameEl = e.target.querySelector(".name");
          const emailEl = e.target.querySelector(".email");
          const passwordEl = e.target.querySelector(".password");

          const name = nameEl.value;
          const email = emailEl.value;
          const password = passwordEl.value;

          handleSignup({ email, password, name });
        });
      }
      const btn_SignInn = formSign_up.querySelector(".btn-sign_in");
      btn_SignInn.addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.removeItem("click-sign_up");
        render();
      });
    });
  }
};

const eventLogout = () => {
  const logOut = document.querySelector(".btn_sign-out");
  if (logOut) {
    logOut.addEventListener("click", (e) => {
      e.preventDefault();
      handleLogout();
    });
  }
};

const render = () => {
  const clickSign_up = sessionStorage.getItem("click-sign_up");
  const status = localStorage.getItem("status");
  if (isSign_in()) {
    container.innerHTML = `<div id="sign-in">
    <div class="infor-left-sign_in">
      <h2 class="title-blog">Sign In</h2>
      <p class="request-title">Please enter your email and password.</p>
      <a class="go-home" href="#">Go to home</a>
    </div>
    <div class="infor-right-sign_in">
      <form action="" class="form form-sign_in">
        <label for="email">Enter Your email</label>
        <input class="email" type="email" id="email" placeholder="Please enter your email">
        <label for="password">Enter Your password</label>
        <input class="password" type="password" id="password" placeholder="Please enter your password">
        <div class="btn-control">
          <button class="btn btn-sign_in">Sign in</button>
          <button class="btn btn-sign_up">Sign up</button>
        </div>
      </form>
      <div class="msg"></div>
    </div>
  </div>
    `;
  }
  if (clickSign_up) {
    container.innerHTML = `<div id="sign-up">
    <div class="infor-left-sign_up">
      <h2 class="title-blog">Sign Up</h2>
      <p class="request-title">Please enter your name, email and password.</p>
      <a class = "go-home" href="#">Go to home</a>
    </div>
    <div class="infor-right-sign_up">
      <form action="" class="form form-sign_up">
        <label for="name">Enter Your email</label>
        <input class="name" type="text" id="name" placeholder="Please enter your name">
        <label for="email">Enter Your email</label>
        <input class="email" type="email" id="email" placeholder="Please enter your email">
        <label for="password">Enter Your email</label>
        <input class="password" type="password" id="password" placeholder="Please enter your password">
        <div class="btn-control">
          <button class="btn btn-sign_up">Sign up</button>
          <button class="btn btn-sign_in">Sign in</button>
        </div>
      </form>
      <div class="msg"></div>
    </div>
  </div>`;
  }
  if (!isSign_in()) {
    container.innerHTML = `<div class="header-blog">
    <h1>Welcom to my blog</h1>
    <div class="btn_sign-in">Sign-in</div>
  </div>
  <div class="main-blogs">
    <div class="blog-post">
    
    </div>
  </div>`;
  }
  if (status) {
    container.innerHTML = `
    <div id="ui-login">
      <div class="header-blog">
        <h1>bloger</h1>
        <div class="infor-user">
          <div class="infor-user-post">
            <div class="avatar-user"></div>
            <div class="name-user">loading ...</div>
        </div>
      </div>
      <div class="main-blogs">
        <form class="create-post">
          <label for="title">Enter your title</label>
          <input id="title" class="title" type="text" placeholder="Please enter the title">
          <label for="content">Enter your content</label>
          <textarea id="content" class="content" cols="30" rows="10" placeholder="Content here"></textarea>
          <label for="time">Set time to post</label>
          <input type="text" class="input-date" readonly="" value="27/10/2023">
          <div class="datetime-picker">
            <div class="wrapper">
              <div class="header">
                  <p class="current-date"></p>
                  <div class="icons">
                      <span id="prev" class="material-symbols-rounded">&lt</span>
                      <span id="next" class="material-symbols-rounded">&gt</span>
                  </div>
              </div>
              <div class="calendar">
                  <ul class="weeks">
                      <li>Sun</li>
                      <li>Mon</li>
                      <li>Tue</li>
                      <li>Wed</li>
                      <li>Thu</li>
                      <li>Fri</li>
                      <li>Sat</li>
                  </ul>
                  <ul class="days"></ul>
              </div>
            </div>
          </div>
          <button class="btn wirite">Wirite</button>
        </form>
        <div class="btn btn_sign-out">Sign-out</div>
        <div class="blog-post">
        </div>
      </div>
    </div>
    <div class="overlay"></div>`;
  }
  renderBlogs();
  getProfile();
  eventSign_in();
  eventLogout();
  // postStatus()
};

render();

const loading = (mode = "add") => {
  const formSign_in = document.querySelector(".form-sign_in");
  if (formSign_in) {
    const btn_SignIn = formSign_in.querySelector(".btn-sign_in");
    if (mode === "add") {
      btn_SignIn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading`;
      btn_SignIn.disabled = true;
    } else {
      btn_SignIn.innerText = "Sign in";
      btn_SignIn.disabled = false;
    }
  }

  const formSign_up = document.querySelector(".form-sign_up");
  if (formSign_up) {
    const btn_Signup = formSign_up.querySelector(".btn-sign_up");
    if (mode === "add") {
      btn_Signup.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading`;
      btn_Signup.disabled = true;
    } else {
      btn_Signup.innerText = "Sign up";
      btn_Signup.disabled = false;
    }
  }
};

const handleSignin = async ({ email, password }) => {
  const msg = document.querySelector(".msg");
  msg.innerText = ``;
  loading();
  const { data: infor, response } = await client.post("/auth/login", {
    email,
    password,
  });
  if (response.ok) {
    //Cập nhật vào Storage (localStorage)
    localStorage.setItem("status", "sucsess");
    const tokens = {
      accessToken: infor.data.accessToken,
      refreshToken: infor.data.refreshToken,
    };
    localStorage.setItem("login", JSON.stringify(tokens));
    render(); //Render lại giao diện
    renderDatetimePicker();
  } else {
    msg.innerText = `Information incorect`;
  }
  loading("remove");
};

const handleSignup = async ({ email, password, name }) => {
  const msg = document.querySelector(".msg");
  msg.innerText = ``;
  loading();
  const { response } = await client.post("/auth/register", {
    name,
    email,
    password,
  });

  if (response.ok) {
    sessionStorage.removeItem("click-sign_up");

    render(); //Render lại giao diện
    const formSign_in = document.querySelector(".form-sign_in");
    const emailEl = formSign_in.querySelector(".email");
    emailEl.value = email;
  } else {
    msg.innerText = `lỗi`;
  }
  loading("remove");
};

const requestRefresh = async () => {
  const login = localStorage.getItem("login");
  const tokens = JSON.parse(login);
  if (tokens) {
    if (tokens.refreshToken) {
      const { data, response } = await client.post("/auth/refresh-token", {
        refreshToken: tokens.refreshToken,
      });
      if (response.ok) {
        localStorage.setItem("login", JSON.stringify(data.data.token));
      } else {
        handleLogout();
        render();
      }
    }
  }
  // render()
};

const renderDatetimePicker = () => {
  const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");
  const input_date = document.querySelector(".input-date");
  // getting new date, current year and month
  let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    currDay = date.getDate();

  // const btn_wiritePost = document.querySelector(".wirite")
  const datetimePicker = document.querySelector(".datetime-picker");
  const overlay = document.querySelector(".overlay");

  if (input_date) {
    input_date.value = `${currYear}-${currMonth + 1}-${currDay}`;
    input_date.addEventListener("click", () => {
      datetimePicker.style.display = "block";
      if (overlay) {
        overlay.style.display = "block";
      }
    });
  }
  if (overlay) {
    overlay.addEventListener("click", () => {
      overlay.style.display = "none";
      datetimePicker.style.display = "none";
    });
  }

  const getValue = () => {
    const li = daysTag.querySelectorAll("li");
    const overlay = document.querySelector(".overlay");
    const datetimePicker = document.querySelector(".datetime-picker");

    li.forEach(function (item) {
      item.addEventListener("click", function () {
        if (daysTag.querySelector(".active")) {
          daysTag.querySelector(".active").classList.remove("active");
        }
        this.classList.add("active");
        input_date.value = `${currYear}-${currMonth + 1}-${this.innerText}`;
        overlay.style.display = "none";
        datetimePicker.style.display = "none";
      });
    });
    renderCalendar();
  };

  // storing full name of all months in array
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
  const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) {
      // creating li of previous month last days
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
      // creating li of all days of current month
      // adding active class to li if the current day, month, and year matched
      let isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? "active"
          : "";
      liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) {
      // creating li of next month first days
      liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
    getValue();
  };
  renderCalendar();
  prevNextIcon.forEach((icon) => {
    // getting prev and next icons
    icon.addEventListener("click", () => {
      // adding click event on both icons
      // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
      currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
      if (currMonth < 0 || currMonth > 11) {
        // if current month is less than 0 or greater than 11
        // creating a new date of current year & month and pass it as date value
        date = new Date(currYear, currMonth, new Date().getDate());
        currYear = date.getFullYear(); // updating current year with new date year
        currMonth = date.getMonth(); // updating current month with new date month
      } else {
        date = new Date(); // pass the current date as date value
      }
      renderCalendar(); // calling renderCalendar function
    });
  });
};

// const daysTag = document.querySelector(".days"),
// currentDate = document.querySelector(".current-date"),
// prevNextIcon = document.querySelectorAll(".icons span");
// // getting new date, current year and month
// let date = new Date(),
// currYear = date.getFullYear(),
// currMonth = date.getMonth();
// // storing full name of all months in array
// const months = ["January", "February", "March", "April", "May", "June", "July",
//               "August", "September", "October", "November", "December"];
// const renderCalendar = () => {
//     let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
//     lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
//     lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
//     lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
//     let liTag = "";
//     for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
//         liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
//     }
//     for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
//         // adding active class to li if the current day, month, and year matched
//         let isToday = i === date.getDate() && currMonth === new Date().getMonth()
//                      && currYear === new Date().getFullYear() ? "active" : "";
//         liTag += `<li class="${isToday}">${i}</li>`;
//     }
//     for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
//         liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
//     }
//     currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
//     daysTag.innerHTML = liTag;
// }
// renderCalendar();
// prevNextIcon.forEach(icon => { // getting prev and next icons
//     icon.addEventListener("click", () => { // adding click event on both icons
//         // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
//         currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
//         if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
//             // creating a new date of current year & month and pass it as date value
//             date = new Date(currYear, currMonth, new Date().getDate());
//             currYear = date.getFullYear(); // updating current year with new date year
//             currMonth = date.getMonth(); // updating current month with new date month
//         } else {
//             date = new Date(); // pass the current date as date value
//         }
//         renderCalendar(); // calling renderCalendar function
//     });
// });

// const hideDatetimePicker = () => {
//   const overlay = document.querySelector(".overlay")
//   const tableDateTime = document.querySelector(".datetime-picker")
//   if(overlay){
//     overlay.addEventListener("click",(e) => {
//       e.preventDefault()
//       overlay.style.display= "none"
//       console.log(tableDateTime);
//     })
//   }
// }

// const showDatetimePicker = () => {

// }
// hideDatetimePicker()
// showDatetimePicker()
