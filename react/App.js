import "./App.css";
import { useState } from "react";
import activityDropDown from "./activityDropDown.js";
import faviconTitle from "./faviconTitle.js";
import favicon from "./images/favicon.png";
import Credits from "./Credits.js";
import gearSpinner from "./images/Gear-0.5s-91px.gif";

faviconTitle(favicon, "Remove Boredom!");

let type = "";
let solo = false;
let free = false;
function App() {
  const [suggestion, setSuggestion] = useState({ activity: "Click below to remove boredom", type: "all" });

  class FetchWrapper {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
    get(endpoint) {
      return fetch(this.baseURL + endpoint).then(response => response.json());
    }
  }

  function getSuggestion() {
    const spinner = document.getElementById("spinner");

    spinner.innerHTML = `<img height='50px' src=${gearSpinner} />`;
    setSuggestion({ activity: "" });
    const API = new FetchWrapper("https://www.boredapi.com/api/");
    let parameters = `?type=${type}`;
    solo ? (parameters += "&participants=1") : (parameters += "&participants=");
    free ? (parameters += "&price=0") : (parameters += "&price=");
    API.get("activity" + parameters).then(data => {
      setSuggestion(data);
      spinner.innerHTML = "";
    });
  }

  function suggestionType(s) {
    console.log(s);
    if (s === "all") {
      return "";
    } else return s;
  }

  return (
    <>
      <div className="App">
        <div className="card">
          <div className="card-content">
            <div className="advice-area">
              <div className="img-area">
                <img
                  className="icon"
                  src={require(`./images/${suggestion.type ? suggestion.type : "null"}.png`).default}
                  alt={suggestion.type + " icon"}
                />
              </div>
              <div className="advice-type">{suggestionType(suggestion.type)}</div>
              <div id="spinner"></div>
              <div className="advice">{suggestion.activity}</div>
              <div className="link">
                {suggestion.link ? (
                  <a target={"_blank"} rel="noreferrer" href={suggestion.link}>
                    more info
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
            <form>
              <select onChange={e => (type = e.target.value)}>{activityDropDown()}</select>
              <label htmlFor="number">
                <input
                  onChange={e => {
                    solo ? (solo = false) : (solo = true);
                    console.log(solo);
                  }}
                  type="checkbox"
                  id="number"
                  name="number"
                  value={false}
                />
                Solo activites only
              </label>
              <label htmlFor="cost">
                <input
                  onChange={e => {
                    free ? (free = false) : (free = true);
                    console.log("free " + free);
                  }}
                  type="checkbox"
                  id="cost"
                  name="cost"
                  value={false}
                />
                Free activites only
              </label>
            </form>
          </div>
        </div>
        <button className="remove-boredom-button" onClick={getSuggestion}>
          Remove Boredom!
        </button>
      </div>
      <div id="credits">
        <Credits />
      </div>
    </>
  );
}

export default App;
