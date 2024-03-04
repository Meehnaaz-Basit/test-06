let clickCount = 0;
const spinnerDiv = document.createElement("div");
spinnerDiv.classList = "text-center mt-10";
spinnerDiv.innerHTML = `
    <span class="loading loading-ring loading-lg"></span>
  `;
const postContainer = document.getElementById("post-container");
// loading function
const showLoadingSpinner = () => {
  const spinnerDiv = document.createElement("div");
  const postContainer = document.getElementById("post-container");
  spinnerDiv.classList = "text-center mt-10";
  spinnerDiv.innerHTML = `
    <span class="loading loading-ring loading-lg"></span>
  `;
  postContainer.appendChild(spinnerDiv);
  return spinnerDiv;
};
//
const allPost = async () => {
  // loading show
  const spinner = showLoadingSpinner();
  const request = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await request.json();
  const posts = data.posts;
  const postContainer = document.getElementById("post-container");
  //
  setTimeout(() => {
    spinner.classList.add("hidden");
    //
    posts.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.classList = "bg-[#F3F3F5] lg:p-12 p-6 rounded-3xl my-4";
      postDiv.innerHTML = `
      <div class="flex lg:flex-row flex-col gap-5 ">
         
        <!-- left  -->
        <div class="w-24 h-20 rounded-lg relative">
          <img class="rounded-lg" src="${post.image}" alt="" />
          <div class="w-4 h-4 rounded-full border-white border-2 absolute -top-1 -right-1 ${
            post.isActive ? "bg-green-600" : "bg-red-600"
          }"></div>
          
           
        </div>
        <!-- right  -->
        <div class="w-[100%]">
          <!-- author -->
          <div class="space-x-6 font-inter text-[#12132DCC] font-semibold lg:mt-0 mt-2 ">
            <span># ${post.category}</span>
            <span>Author: ${post.author.name}</span>
          </div>
          <!-- title -->
          <div class="space-y-5 mt-3">
            <h3 class="font-mulish font-extrabold text-our-primary text-lg lg:text-xl">${
              post.title
            }</h3>
            <p class="font-inter text-[#12132D99]">${post.description}</p>
          </div>
          <!-- border -->
          <div class="border-2 border-dashed my-4"></div>
          <!-- view -->
          <div class="flex lg:flex-row md:flex-row flex-col justify-between font-inter text-[#12132D99]">
            <div class="flex lg:gap-12 md:gap-10 gap-6 ">
              <div class="flex items-center lg:gap-4 md:gap-4 gap-2">
                <div><img src="images/read.png" alt="" /></div>
                <span>${post.comment_count}</span>
              </div>
              <div class="flex items-center gap-4 ">
                <div><img src="images/view.png" alt="" /></div>
                <span>${post.view_count}</span>
              </div>
              <div class="flex items-center gap-4">
                <div><img src="images/time.png" alt="" /></div>
                <span>${post.posted_time} min</span>
              </div>
            </div>
            <div>
              <button class="lg:mt-0 mt-4" id="markReadBtn">
                <img src="images/message-btn.png" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

      postContainer.appendChild(postDiv);

      const markReadBtn = postDiv.querySelector("#markReadBtn");
      const postClickedList = document.getElementById("clicked-posts-list");
      const count = document.getElementById("count");

      markReadBtn.addEventListener("click", () => {
        const listPost = document.createElement("div");
        listPost.classList =
          "bg-white p-4 rounded-xl flex justify-between gap-5 my-3";
        listPost.innerHTML = `
        <p class="w-[85%] font-mulish font-bold text-our-primary">
          ${post.title}
        </p>
        <div class="flex items-center gap-2">
          <img src="images/view.png" alt="" />
          <span>${post.view_count}</span>
        </div>
      `;
        postClickedList.appendChild(listPost);
        clickCount = clickCount + 1;
        count.innerText = clickCount;
      });
    });
    //
  }, 3000);
  //
};

// latest post fetch
const latestPost = async () => {
  const request = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await request.json();
  const latestPost = document.getElementById("latest-post");

  data.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList = "card bg-base-100 shadow-xl";
    postDiv.innerHTML = `
      <figure class="p-5">
        <img src="${post.cover_image}" class="rounded-xl" />
      </figure>
      <div class="card-body space-y-2">
        <div class="flex gap-4">
          <img src="images/date.png" alt="" />
          <span>${
            post.author.posted_date
              ? post.author.posted_date
              : "No publish date"
          }</span>
        </div>
        <h2 class="card-title text-our-primary text-lg font-black">${
          post.title
        }</h2>
        <p class="text-[#12132D99]">${post.description}</p>
        <div class="flex gap-5 items-center">
          <div>
            <img class="w-16 h-16 rounded-full" src="${
              post.profile_image
            }" alt="" />
          </div>
          <div>
            <h3 class="text-our-primary font-extrabold">${post.author.name}</h3>
            <p class="text-[#12132D99]">${
              post.author.designation ? post.author.designation : "Unknown"
            }</p>
          </div>
        </div>
      </div>
    `;
    latestPost.appendChild(postDiv);
  });
};

// search functionality
const searchCategoryBtn = document.getElementById("searchCategory");
searchCategoryBtn.addEventListener("click", async () => {
  //

  //
  const searchInput = document.getElementById("searchInput");
  const searchInputValue = searchInput.value;
  const searchValueLowerCase = searchInputValue.toLowerCase();

  const request = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValueLowerCase}`
  );
  const data = await request.json();
  const searchPosts = data.posts;
  //   console.log(searchPosts);

  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = "";

  if (searchPosts.length > 0) {
    searchPosts.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.classList = "bg-[#F3F3F5] p-12 rounded-3xl my-4";
      postDiv.innerHTML = `
        <div class="flex gap-5">
          <!-- left  -->
          <div class="w-24 h-20 rounded-lg relative">
            <img class="rounded-lg" src="${post.image}" alt="" />
            <div class="w-4 h-4 rounded-full border-white border-2 absolute -top-1 -right-1 ${
              post.isActive ? "bg-green-600" : "bg-red-600"
            }"></div>
          </div>
          <!-- right  -->
          <div class="w-[100%]">
            <!-- author -->
            <div class="space-x-6 font-inter text-[#12132DCC] font-semibold">
              <span># ${post.category}</span>
              <span>Author: ${post.author.name}</span>
            </div>
            <!-- title -->
            <div class="space-y-5 mt-3">
              <h3 class="font-mulish font-extrabold text-our-primary text-xl">${
                post.title
              }</h3>
              <p class="font-inter text-[#12132D99]">${post.description}</p>
            </div>
            <!-- border -->
            <div class="border-2 border-dashed my-4"></div>
            <!-- view -->
            <div class="flex justify-between font-inter text-[#12132D99]">
              <div class="flex gap-12">
                <div class="flex items-center gap-4">
                  <div><img src="images/read.png" alt="" /></div>
                  <span>${post.comment_count}</span>
                </div>
                <div class="flex items-center gap-4">
                  <div><img src="images/view.png" alt="" /></div>
                  <span>${post.view_count}</span>
                </div>
                <div class="flex items-center gap-4">
                  <div><img src="images/time.png" alt="" /></div>
                  <span>${post.posted_time} min</span>
                </div>
              </div>
              <div>
                <button id="markReadBtn">
                  <img src="images/message-btn.png" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      postContainer.appendChild(postDiv);

      const markReadBtn = postDiv.querySelector("#markReadBtn");
      const postClickedList = document.getElementById("clicked-posts-list");
      const count = document.getElementById("count");

      markReadBtn.addEventListener("click", () => {
        const listPost = document.createElement("div");
        listPost.classList =
          "bg-white p-4 rounded-xl flex justify-between gap-5 my-3";
        listPost.innerHTML = `
          <p class="w-[85%] font-mulish font-bold text-our-primary">
            ${post.title}
          </p>
          <div class="flex items-center gap-2">
            <img src="images/view.png" alt="" />
            <span>${post.view_count}</span>
          </div>
        `;
        postClickedList.appendChild(listPost);
        clickCount = clickCount + 1;
        count.innerText = clickCount;
      });
    });
  } else {
    const noMatchedText = document.createElement("p");
    noMatchedText.classList = "mt-10";
    noMatchedText.textContent = `No matched "${searchValueLowerCase}" category found to show any post`;
    postContainer.appendChild(noMatchedText);
  }
});

allPost();
latestPost();
