const RANDOM_IMAGE = "https://dog.ceo/api/breeds/image/random";

const BEERS_LIST = "https://dog.ceo/api/breeds/list/all";

const dogLoader = document.getElementById("loader");

const imgWrapper = document.querySelector(".wrapper");

const selectList = document.querySelector("select");

let optionList = [];

function getInitialImage() {
  // get any random image

  fetch(RANDOM_IMAGE)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // create a new element and insert it inside the image container
      let img = document.createElement("img");
      img.src = data.message;
      img.alt = "a dog";

      // remove the loader
      dogLoader.classList.remove("show");

      // insert the new element
      imgWrapper.appendChild(img);
    });
}

function getOptionList(callback) {
  fetch(BEERS_LIST)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      optionList = Object.getOwnPropertyNames(data.message);

      // whenever you finish, insert options in the select menu
      callback();
    });
}

function setOptions() {
  for (let i = 0; i < optionList.length; i++) {
    //create a new option
    let option = document.createElement("option");
    option.innerText = optionList[i];
    selectList.appendChild(option);
  }
}

function getASpecificDog(beerName) {
  // prepare the url
  let dogURL = `https://dog.ceo/api/breed/${beerName}/images/random`;

  // fetch the image
  fetch(dogURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let img = document.createElement("img");
      img.src = data.message;
      img.alt = "a dog";

      // disable dog loader then insert the new image
      dogLoader.classList.remove("show");
      imgWrapper.appendChild(img);
    });
}

function init() {
  // get the initial dog image
  setTimeout(getInitialImage, 300);

  // fetch options
  getOptionList(setOptions);

  selectList.addEventListener("change", function (event) {
    // remove the current image
    document.querySelector(".wrapper img").remove();

    // enable dogLoader
    dogLoader.classList.add("show");

    // get the new image
    let beerName = event.target.value;
    setTimeout(getASpecificDog(beerName), 1000);
  });
}

init();
