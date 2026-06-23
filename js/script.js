// LOAD ALL STATIONS ARRAY
import { allStations } from "./stream.js";

//LOADING SCREEN
window.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");

  setTimeout(() => {
    loadingScreen.classList.add("fade-out");
  }, 1000);
});

//NAVIGATION

//MENU ICON
const menuIcon = document.getElementById("menu-icon");
const menuBarContainer = document.getElementById("menu-bar-container");

menuIcon.addEventListener("click", function (e) {
  e.stopPropagation();

  if (menuBarContainer.style.display === "flex") {
    menuBarContainer.style.display = "none";
  } else {
    menuBarContainer.style.display = "flex";
  }
});

menuBarContainer.addEventListener("click", function (e) {
  if (e.target === menuBarContainer) {
    menuBarContainer.style.display = "none";
  }
});

//MENU BAR
const NavBtns = document.querySelectorAll(".nav button");

NavBtns.forEach((button) => {
  button.addEventListener("click", () => {
    //REMOVES ACTIVES STATES
    document.querySelector(".nav button.active")?.classList.remove("active");
    document.querySelector(".all-content.active")?.classList.remove("active");

    //ADDS ACTIVE STATES
    button.classList.add("active");

    const targetId = button.getAttribute("data-target");
    document.getElementById(targetId)?.classList.add("active");

    if (window.innerWidth < 576) {
      menuBarContainer.style.display = "none";
    }
  });
});

//MAIN

//SEARCH A STATION
const searchInput = document.getElementById("search-input");
const displaySearched = document.getElementById("display-searched");

document.getElementById("clear-search-input").addEventListener("click", () => {
  searchInput.value = "";
  displaySearched.innerHTML = "";
});

window.addEventListener("DOMContentLoaded", () => {
  searchInput.value = "";
  displaySearched.innerHTML = "";
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  const inputFilteredArray = allStations.filter((station) => {
    const matchesName = station.name.toLowerCase().includes(query);
    const matchesFrequency = station.frequency
      .toString()
      .toLowerCase()
      .includes(query);

    return matchesName || matchesFrequency;
  });

  loadSearch(inputFilteredArray);
});

function loadSearch(inputFilteredArray) {
  displaySearched.innerHTML = "";

  const query = searchInput.value.trim();
  if (query === "") {
    return;
  }

  inputFilteredArray.forEach((station) => {
    const stationDiv = document.createElement("div");

    stationDiv.className = "station-card";
    stationDiv.innerHTML = ` 
    <div class= "each-station">
    <p class="dont-display">${station.id}</p>
    <h3>${station.name}</h3>
    <p>${station.frequency}</p> 
    <p>${station.region}</p>
    <p class = 'dont-display' id = 'play-audio'>
    ${station.audio} </p>
    </div>
    `;

    stationDiv.querySelector(".each-station").addEventListener("click", () => {
      loadPlaylist(allStations, station.id);
    });

    displaySearched.appendChild(stationDiv);
  });
}

//DISPLAY LIST OF ALL STATIONS
function loadAllStations() {
  const ListOfAllStations = document.getElementById("list-of-all-stations");

  allStations.forEach((station) => {
    const stationDiv = document.createElement("div");

    stationDiv.className = "station-card";
    stationDiv.innerHTML = ` 
    <div class= "each-station">
    <p class="dont-display">${station.id}</p>
    <h3>${station.name}</h3>
    <p>${station.frequency}</p> 
    <p>${station.region}</p>
    <p class = 'dont-display' id = 'play-audio'>
    ${station.audio} </p>
    </div>
    `;

    stationDiv.querySelector(".each-station").addEventListener("click", () => {
      loadPlaylist(allStations, station.id);
    });

    ListOfAllStations.appendChild(stationDiv);
  });
}

loadAllStations();

//LOAD THE AUDIO THE PLAYER
function playStation(station) {
  audioPlayer.src = station.audio;

  document.getElementById("station-name").textContent = station.name;

  document.getElementById("station-frequency").textContent = station.frequency;

  document.getElementById("station-location").textContent = station.region;

  audioPlayer.play();
  document.getElementById("audio-play").style.display = "none";
  document.getElementById("audio-stop").style.display = "flex";
  document.querySelector(".audio-animation")?.classList.add("active");
}

//AUDIO PLAYER METHOD
const audioPlayer = new Audio();

//PLAYING STATIONS ARRAY
let PlayingStations = [];

let CurrentPlayingIndex = 0;

//PLAYING STATIONS LIST FUNCTION
function loadPlaylist(stations, stationId) {
  PlayingStations = [...stations];

  CurrentPlayingIndex = PlayingStations.findIndex(
    (station) => station.id === stationId,
  );

  playStation(PlayingStations[CurrentPlayingIndex]);
}

//AUDIO CONTROLS
const PlayBtn = document.getElementById("audio-play");
const StopBtn = document.getElementById("audio-stop");

//PLAY BUTTON
PlayBtn.addEventListener("click", () => {
  if (PlayingStations.length === 0) {
    window.alert("Please select a station to start streaming");
    return;
  }

  audioPlayer.load();
  audioPlayer.play();

  PlayBtn.style.display = "none";
  StopBtn.style.display = "flex";
  document.querySelector(".audio-animation")?.classList.add("active");
});

//STOP BUTTON
StopBtn.addEventListener("click", () => {
  audioPlayer.pause();

  const crtPlayingSrc = audioPlayer.src;

  function playStation(station) {
    audioPlayer.src = "";
    audioPlayer.src = crtPlayingSrc;

    document.getElementById("station-name").textContent = station.name;

    document.getElementById("station-frequency").textContent =
      station.frequency;

    document.getElementById("station-location").textContent = station.region;
  }

  StopBtn.style.display = "none";
  PlayBtn.style.display = "flex";
  document.querySelector(".audio-animation")?.classList.remove("active");
});

//NEXT BUTTON
const NextBtn = document.getElementById("next-audio");
NextBtn.addEventListener("click", () => {
  if (PlayingStations.length === 0) return;

  CurrentPlayingIndex++;

  if (CurrentPlayingIndex >= PlayingStations.length) {
    CurrentPlayingIndex = 0;
  }

  playStation(PlayingStations[CurrentPlayingIndex]);
});

//PRECIOUS BUTTON
const PreviousBtn = document.getElementById("previous-audio");
PreviousBtn.addEventListener("click", () => {
  if (PlayingStations.length === 0) return;

  CurrentPlayingIndex--;

  if (CurrentPlayingIndex < 0) {
    CurrentPlayingIndex = PlayingStations.length - 1;
  }

  playStation(PlayingStations[CurrentPlayingIndex]);
});

//CATEGORIES

//CATEGORIES ARRAY
const categories = [
  "Ahafo",
  "Kumasi",
  "Bono",
  "Bono East",
  "Central",
  "Eastern",
  "Accra",
  "North East",
  "Northern",
  "Oti",
  "Savannah",
  "Upper East",
  "Upper West",
  "Volta",
  "Western",
  "Western North",
  "Online",
];

const categoriesBtn = document.getElementById("categories-btn");
const frequencyBtn = document.getElementById("frequency");
const nameBtn = document.getElementById("name");
const categoriesOptions = document.querySelector(".categories-options");

//LOAD BY FREQUENCY
frequencyBtn.addEventListener("click", () => {
  const filteredStations = document.querySelector(".filtered-station");

  filteredStations.innerHTML = "";

  const filteredStationsArray = allStations.sort(
    (a, b) => a.frequency - b.frequency,
  );

  if (filteredStationsArray.length === 0) {
    filteredStations.innerHTML = `<p class = "not-found"> No Stations Found</p>`;
    return;
  }

  filteredStations.innerHTML = `<p class = "found">List of Frequency in Order </p>`;

  filteredStationsArray.forEach((station) => {
    const stationDiv = document.createElement("div");

    stationDiv.className = "station-card";
    stationDiv.innerHTML = ` 
    <div class= "each-station">
    <p class="dont-display">${station.id}</p>
    <p>${station.frequency}</p> 
    <h3>${station.name}</h3>
    <p>${station.region}</p>
    <p class = 'dont-display' id = 'play-audio'>
    ${station.audio} </p>
    </div>
    `;

    stationDiv.querySelector(".each-station").addEventListener("click", () => {
      loadPlaylist(allStations, station.id);
    });

    filteredStations.appendChild(stationDiv);
  });
});

// LOAD CATEGORIES BY NAME
nameBtn.addEventListener("click", () => {
  const filteredStations = document.querySelector(".filtered-station");

  filteredStations.innerHTML = "";

  const filteredStationsArray = allStations.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  if (filteredStationsArray.length === 0) {
    filteredStations.innerHTML = `<p class = "not-found"> No Stations Found</p>`;
    return;
  }

  filteredStations.innerHTML = `<p class = "found">Listed in Alphabetically Order </p>`;

  filteredStationsArray.forEach((station) => {
    const stationDiv = document.createElement("div");

    stationDiv.className = "station-card";
    stationDiv.innerHTML = ` 
    <div class= "each-station">
    <p class="dont-display">${station.id}</p>
    <h3>${station.name}</h3>
    <p>${station.frequency}</p> 
    <p>${station.region}</p>
    <p class = 'dont-display' id = 'play-audio'>
    ${station.audio} </p>
    </div>
    `;

    stationDiv.querySelector(".each-station").addEventListener("click", () => {
      loadPlaylist(allStations, station.id);
    });

    filteredStations.appendChild(stationDiv);
  });
});

//LOAD OPTIONS TO SELECT A CATEGORY
function loadCategotoriesOptions() {
  categories.forEach((theCategory) => {
    const aCategory = document.createElement("div");
    aCategory.className = "select-category";
    aCategory.innerHTML = `
    <p>${theCategory}</p>
    `;

    categoriesOptions.appendChild(aCategory);
    aCategory.addEventListener("click", () => {
      loadCategotories(theCategory);
      categoriesOptions.classList.remove("active");
    });
  });
}

loadCategotoriesOptions();

//DISPLAY THE CATEGORIES AT IT'S SECTION
function loadCategotories(theCategory) {
  if (!theCategory) return;

  const filteredStations = document.querySelector(".filtered-station");

  filteredStations.innerHTML = "";

  const filteredStationsArray = allStations.filter(
    (station) =>
      station.region.toLowerCase() === theCategory.trim().toLowerCase(),
  );

  if (filteredStationsArray.length === 0) {
    filteredStations.innerHTML = `<p class = "not-found"> No Stations Found</p>`;
    return;
  }

  filteredStations.innerHTML = `<p class = "found">Stations From: ${theCategory}</p>`;

  filteredStationsArray.forEach((station) => {
    const stationDiv = document.createElement("div");

    stationDiv.className = "station-card";
    stationDiv.innerHTML = ` 
    <div class= "each-station">
    <p class="dont-display">${station.id}</p>
    <h3>${station.name}</h3>
    <p>${station.frequency}</p> 
    <p>${station.region}</p>
    <p class = 'dont-display' id = 'play-audio'>
    ${station.audio} </p>
    </div>
    `;

    stationDiv.querySelector(".each-station").addEventListener("click", () => {
      loadPlaylist(allStations, station.id);
    });

    filteredStations.appendChild(stationDiv);
  });
}

categoriesBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  categoriesOptions.classList.toggle("active");
});

window.addEventListener("click", (event) => {
  if (
    !categoriesOptions.contains(event.target) &&
    event.target !== categoriesBtn
  ) {
    categoriesOptions.classList.remove("active");
  }
});

// ALL MODALS
// ALERT
const AlertBtn = document.getElementById("alert-btn");
const AlertModal = document.getElementById("alert-modal");
const CloseAlertModal = document.getElementById("close-alert-modal");

// Open Modal
AlertBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  AlertModal.style.display = "flex";
});

CloseAlertModal.addEventListener("click", (e) => {
  e.stopPropagation();
  AlertModal.style.display = "none";
});

//ABOUT US
const AboutUsBtn = document.getElementById("about-us-btn");
const AboutUSModal = document.getElementById("about-us-modal");
const CloseAboutUSModal = document.getElementById("close-about-us-modal");

// Open Modal
AboutUsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  AboutUSModal.style.display = "flex";
});

CloseAboutUSModal.addEventListener("click", (e) => {
  e.stopPropagation();
  AboutUSModal.style.display = "none";
});
