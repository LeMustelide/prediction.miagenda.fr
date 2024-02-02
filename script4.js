let data; // Declare data as a global variable

fetch("data.json").then((response) => {
    response.json().then((jsonData) => {
        data = jsonData; // Assign the fetched data to the global variable
    });
});

let params = new URLSearchParams(window.location.search);

let className = params.get("class");

let shareableLink = "";

loadNotes();

function nextNum(object) {
    loadNotesFromCookiesAndDisplay();
    if (
        object.parentElement.parentElement
            .querySelector("#lock")
            .innerHTML.trim() == "lock_open"
    ) {
        lockNote(object.parentElement);
    }
    number = parseFloat(object.parentElement.querySelector(".input").value);
    const input = object.parentElement.querySelector(".input");
    const max = parseFloat(input.getAttribute("max"));
    if (number < max) {
        object.parentElement.querySelector(".input").value = number + 0.5;
    }
    calculate();
}

function prevNum(object) {
    loadNotesFromCookiesAndDisplay();
    if (
        object.parentElement.parentElement
            .querySelector("#lock")
            .innerHTML.trim() == "lock_open"
    ) {
        lockNote(object.parentElement);
    }
    number = parseFloat(object.parentElement.querySelector(".input").value);

    const input = object.parentElement.querySelector(".input");
    const min = parseFloat(input.getAttribute("min"));
    if (number > min) {
        object.parentElement.querySelector(".input").value = number - 0.5;
    }
    calculate();
}

function lockNote(object) {
    loadNotesFromCookiesAndDisplay();
    lock = object.parentElement.querySelector("#lock").innerHTML.trim();
    if (lock == "lock_open") {
        object.parentElement.querySelector("#lock").innerHTML = "lock";
        object.parentElement.querySelector(".input").style.color = "white";
    } else {
        object.parentElement.querySelector("#lock").innerHTML = "lock_open";
    }
    calculate();
}

function calculate() {
    const inputs = document.querySelectorAll(".input");
    let total = 0;
    let totalOpen = 0;
    for (const input of inputs) {
        if (
            input.parentElement.parentElement
                .querySelector("#lock")
                .innerHTML.trim() == "lock"
        ) {
            total += parseFloat(input.value);
        } else {
            totalOpen += parseFloat(input.value);
        }
    }

    console.log(getNotes());

    // Fetch the data.json file
    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            average = calculateAverage(data, className);
            if (average >= 10) {
                saveNotes(getNotes());
                document.querySelector(".title-resultat").innerHTML =
                    "VAMOS 🙏";
                document.querySelector(".resultat").innerHTML =
                    "Tu devrais valider ton semestre avec " +
                    average +
                    " de moyenne";
                document.querySelector(".resultat").style.color = "green";
            } else {
                saveNotes(getNotes());
                document.querySelector(".title-resultat").innerHTML =
                    "Désolé.e 😢";
                document.querySelector(".resultat").innerHTML =
                    "Tu devrais terminer avec " +
                    average +
                    " de moyenne, ça ne valide pas ton semestre...";
                document.querySelector(".resultat").style.color = "red";
                //updateNotes(data, average);
            }
        })
        .catch((error) => {
            console.error("Error reading data.json:", error);
        });
}

function calculateAverage(data, className) {
    let miageSum = 0;
    let miageCount = 0;
    let formule = "";
    let notes = {};

    if (data.hasOwnProperty(className)) {
        const classData = data[className];

        for (const key in classData) {
            const v = classData[key];

            if (v.hasOwnProperty("epreuve")) {
                let temp = 0;
                let tempCoef = 0;

                if (formule !== "") {
                    formule += " + ";
                }

                formule += "(";

                for (const epreuve in v["epreuve"]) {
                    if (temp !== 0) {
                        formule += " + ";
                    }

                    const coef = v["epreuve"][epreuve];
                    const inputValue = parseFloat(
                        document.querySelector(`[name="${key}.${epreuve}"]`)
                            .value
                    );

                    notes[`${key}.${epreuve}`] = inputValue;
                    temp += coef * inputValue;
                    tempCoef += coef;

                    formule += `${coef.toFixed(2)} * ${inputValue}`;
                }

                formule += `) * ${v["coef"]}`;

                miageSum += v["coef"] * (temp / tempCoef);
                miageCount += v["coef"];
            } else {
                const inputValue = parseFloat(
                    document.querySelector(`[name="${key}"]`).value
                );

                notes[`${key}`] = inputValue;
                miageSum += v["coef"] * inputValue;
                miageCount += v["coef"];

                if (formule !== "") {
                    formule += " + ";
                }

                formule += `${v["coef"]} * ${inputValue}`;
            }
        }

        const miageMean = miageSum / miageCount;
        const moyenne = miageMean.toFixed(2);

        formule += ` = (${miageSum} / ${miageCount})`;
        formule += ` = ${miageMean}`;

        // console.log(formule); // Afficher la formule de calcul (facultatif)
        document.querySelector(".formule").innerHTML =
            "La formule de calcul est : " + formule;
        shareableLink = generateShareableLink(notes);
        return moyenne;
    }
}

function getNotes() {
    const inputs = document.querySelectorAll(".input");
    let notes = {};
    for (const input of inputs) {
        notes[input.name] = input.value;
    }
    return notes;
}

function updateNotes(data) {
    averageTmp = calculateAverage(data, className);
    console.log(averageTmp);
    while (averageTmp < 10) {
        const lowestOpenNoteObj = findLowestOpenNoteObj();
        if (
            lowestOpenNoteObj == null ||
            parseFloat(lowestOpenNoteObj.value) >= 20
        ) {
            break;
        }
        const currentNote = parseFloat(lowestOpenNoteObj.value);
        lowestOpenNoteObj.value = currentNote + 0.5;
        lowestOpenNoteObj.parentElement.querySelector(".input").value =
            currentNote + 0.5;
        lowestOpenNoteObj.style.color = "yellow";
        averageTmp = calculateAverage(data, className);
        document.querySelector(".resultat2").value = averageTmp;
    }
}

function findLowestOpenNoteObj() {
    const inputs = document.querySelectorAll(".input");
    let lowest = 20;
    let lowestObj = null;
    for (const input of inputs) {
        if (
            input.parentElement.parentElement
                .querySelector("#lock")
                .innerHTML.trim() == "lock_open"
        ) {
            if (parseFloat(input.value) < lowest) {
                lowest = parseFloat(input.value);
                lowestObj = input;
            }
        }
    }
    return lowestObj;
}

function findHighestOpenNoteObj() {
    const inputs = document.querySelectorAll(".input");
    let highest = 0;
    let highestObj = null;
    for (const input of inputs) {
        if (
            input.parentElement.parentElement
                .querySelector("#lock")
                .innerHTML.trim() == "lock_open"
        ) {
            if (parseFloat(input.value) > highest) {
                highest = parseFloat(input.value);
                highestObj = input;
            }
        }
    }
    return highestObj;
}

function calculateMin() {
    while (averageTmp > 10) {
        const highestOpenNoteObj = findHighestOpenNoteObj();
        console.log(
            highestOpenNoteObj.parentElement.querySelector(".input").value
        );
        if (
            highestOpenNoteObj == null ||
            parseFloat(highestOpenNoteObj.value) <= 0
        ) {
            break;
        }
        const currentNote = parseFloat(highestOpenNoteObj.value);
        highestOpenNoteObj.value = currentNote - 0.5;
        highestOpenNoteObj.parentElement.querySelector(".input").value =
            currentNote - 0.5;
        averageTmp = calculateAverage(data, className);
        document.querySelector(".resultat2").value = averageTmp;
        if (averageTmp >= 10) {
            highestOpenNoteObj.style.color = "yellow";
        } else {
            highestOpenNoteObj.value = currentNote + 0.5;
            highestOpenNoteObj.parentElement.querySelector(".input").value =
                currentNote + 0.5;
            return;
        }
    }
}

function predict() {
    if (average < 10) {
        console.log("updateNotes");
        updateNotes(data);
    } else {
        console.log("calculateMin");
        calculateMin();
    }
}

function generateShareableLink(notes) {
    // Créez un nouvel objet URLSearchParams
    let params = new URLSearchParams();

    // Parcourez chaque note et ajoutez-la aux paramètres de l'URL
    params.append("class", className);
    for (let subject in notes) {
        params.append(subject, notes[subject]);
    }

    // Générez l'URL finale en ajoutant les paramètres de l'URL à l'URL de base
    let url =
        window.location.origin +
        window.location.pathname +
        "?" +
        params.toString();

    return url;
}

function loadNotes() {
    // Créez un nouvel objet URLSearchParams
    let params = new URLSearchParams(window.location.search);

    // Récupérez les notes
    let notes = {};
    for (let subject of params.keys()) {
        if (subject !== "class") {
            notes[subject] = params.get(subject);
        }
    }

    // Mettez à jour les notes
    for (let subject in notes) {
        document.querySelector(`[name="${subject}"]`).value = notes[subject];
    }

    // Calculez la moyenne
    calculate();
}

function copyLink() {
    // Copiez l'URL dans le presse-papiers
    navigator.clipboard.writeText(shareableLink).then(() => {
        // Affichez un message de succès
        document.querySelector(".copy-message").classList.add("show");
        document.querySelector(".copy-message").classList.remove("hide");
        setTimeout(() => {
            document.querySelector(".copy-message").classList.remove("show");
            document.querySelector(".copy-message").classList.add("hide");
        }, 4000);
    });
}

function verif(object) {
    const value = parseFloat(object.value);
    loadNotesFromCookiesAndDisplay();
    object.value = value;
    const min = parseFloat(object.getAttribute("min"));
    const max = parseFloat(object.getAttribute("max"));
    if (value < min) {
        object.value = min;
    } else if (value > max) {
        object.value = max;
    } else if (isNaN(object.value) && object.value != "") {
        object.value = 0;
    }
    calculate();
}

function verif2(object) {
    object.value = Math.round(object.value * 100) / 100;
    calculate();
}

// Sauvegarde les notes dans des cookies
function saveNotes(notes) {
    // Convert the data object to a JSON string
    const notesString = JSON.stringify(notes);

    // Save the JSON string in a cookie named "notes"
    document.cookie = `notes=${notesString}`;
}

// Charge les notes depuis les cookies
function loadNotesFromCookies() {
    // Get the notes string from the "notes" cookie
    const notesString = document.cookie.replace(
        /(?:(?:^|.*;\s*)notes\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );

    // Convert the notes string to a data object
    const notes = JSON.parse(notesString);

    // Return the notes object
    return notes;
}

// Charge les notes depuis les cookies et les affiche
function loadNotesFromCookiesAndDisplay() {
    // Load the notes from the cookies
    const notes = loadNotesFromCookies();

    // Display the notes
    for (const subject in notes) {
        document.querySelector(`[name="${subject}"]`).value = notes[subject];
        document.querySelector(`[name="${subject}"]`).style.color = "white";
    }
}
