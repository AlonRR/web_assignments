let my_name = "";

window.onload = () => {
    addName();
    initSongs();
}

function enableButtons() {
    document.getElementById("add").addEventListener("click", addRectangle);
    document.getElementById("subtract").addEventListener("click", subtractRectangle);
}

function disableButtons() {
    document.getElementById("add").removeEventListener("click", addRectangle);
    document.getElementById("subtract").removeEventListener("click", subtractRectangle);
}

function addName() {
    let button = document.querySelector("header > div > button");
    button.addEventListener("click", inputName);
}

function inputName() {
    my_name = document.getElementsByTagName("input")[0].value;
    document.querySelector("header > div").remove();
    initRectangles();
    enableButtons();
    document.getElementById("switch").addEventListener("click", switchRectanglesSongs);
}

function initRectangles() {
    let rectangles = document.createElement("div");
    rectangles.setAttribute("id", "rectangles");
    document.getElementById("wrapper").appendChild(rectangles);
    for (let i = 0; i < my_name.length; i++) {
        let rectangle = document.createElement("div");
        rectangle.setAttribute("class", "rectangle");
        rectangle.innerHTML = my_name[i];
        rectangle.style.backgroundColor = chooseRectangleColor(i);
        rectangles.appendChild(rectangle);
    }
}

function initSongs() {
    let songs = document.createElement("div");
    let ul = document.createElement("ul");
    let h1 = document.createElement("h1");
    ul.style.listStyleType = "none";
    h1.style.textAlign = "center";
    songs.setAttribute("id", "song_list");
    songs.appendChild(h1);
    songs.appendChild(ul);
    songs.style.display = "none";
    wrapper.appendChild(songs);
    fetch("data/music.json")
        .then(response => response.json())
        .then(data => populateSongsInList(data))
        .catch(error => console.error('Error cant retrive song list ', error));
}

function chooseRectangleColor(count) {
    const colors = ["#94C1DE", "#abc2d0", "#C2C2C2", "#537299", "#6D7286", "#47363A", "#3A2120"];
    return colors[count % colors.length];
}

function addRectangle() {
    let rectangles = document.getElementById("rectangles");
    let count = document.getElementsByClassName("rectangle").length;
    let color = chooseRectangleColor(count);
    let rectangle = document.createElement("div");
    rectangle.setAttribute("class", "rectangle");
    rectangle.innerHTML = my_name[count % my_name.length];
    rectangle.style.backgroundColor = color;
    rectangles.appendChild(rectangle);
}

function subtractRectangle() {
    let len = document.getElementsByClassName("rectangle").length;
    if (len === 0) {
        return;
    }
    document.getElementsByClassName("rectangle")[len - 1].remove();
}

function switchRectanglesSongs() {
    let rectangles = document.getElementById("rectangles");
    let songs = document.getElementById("song_list");
    let switch_button = document.getElementById("switch").querySelector("span");
    if (song_list.style.display === "none") {
        rectangles.style.display = "none";
        songs.style.display = "block";
        switch_button.innerText = switch_button.innerText.replace("songs", "rectangles");
        disableButtons();
    } else {
        songs.style.display = "none";
        rectangles.style.display = "flex";
        switch_button.innerText = switch_button.innerText.replace("rectangles", "songs");
        enableButtons();
    }
}

function populateSongsInList(data) {
    let fragment = document.createDocumentFragment();
    let list_title = data["title"] || "Songs";
    let song_list = document.getElementById("song_list");
    song_list.querySelector("h1").innerText = list_title;
    for (let song of data["songs"]) {
        let li = document.createElement("li");
        li.style.margin = "10px";
        li.innerText = `${song.id}: ${song.title} - ${song.artist}`;
        fragment.appendChild(li);
    }
    song_list.querySelector("ul").appendChild(fragment);
}
