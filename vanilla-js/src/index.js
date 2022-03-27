import activityDropDown from "./activityDropDown";
import css from "../public/style.css";
let type = "";

const adviceText = document.getElementById("advice");
const adviceTypeText = document.getElementById("advice-type");
const boredomButton = document.getElementById("remove-boredom-button");
boredomButton.addEventListener("click", () => getSuggestion());
const spinner = document.getElementById("spinner");

const types = document.getElementById("types");
types.innerHTML = activityDropDown();
types.addEventListener("change", () => {
  type = types.value;
});

const number = document.getElementById("number");
let solo = number.checked;
number.addEventListener("change", () => {
  number.checked ? (solo = true) : (solo = false);
});

const cost = document.getElementById("cost");
let free = cost.checked;
cost.addEventListener("change", () => {
  cost.checked ? (free = true) : (free = false);
});

class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  get(endpoint) {
    return fetch(this.baseURL + endpoint).then((response) => response.json());
  }
}

function getSuggestion() {
  adviceText.textContent = "";
  adviceTypeText.textContent = "";
  document.getElementById("icon").src = `./images/null.png`;
  document.getElementById("link").textContent = "";
  spinner.innerHTML = "<img height='50px' src='./images/Gear-0.5s-91px.gif'>";
  const API = new FetchWrapper("https://www.boredapi.com/api/");
  let parameters = `?type=${type}`;
  solo ? (parameters += "&participants=1") : (parameters += "&participants=");
  free ? (parameters += "&price=0") : (parameters += "&price=");
  console.log(parameters);
  API.get("activity" + parameters).then((data) => {
    document.getElementById("icon").src = `./images/${data.type}.png`;
    adviceText.textContent = data.activity;
    adviceTypeText.textContent = data.type;
    if (data.link) {
      document.getElementById("link").textContent = "more info";
      document.getElementById("link").href = data.link;
    }
    console.log("activity" + parameters);
    console.log(data);
    spinner.innerHTML = "";
  });
}
