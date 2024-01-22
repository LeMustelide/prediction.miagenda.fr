let data; // Declare data as a global variable

fetch("data.json").then((response) => {
    response.json().then((jsonData) => {
        data = jsonData; // Assign the fetched data to the global variable
        console.log(data);
    });
});

function nextNum(object) {
  if (
    object.parentElement.parentElement
      .querySelector("#lock")
      .innerHTML.trim() == "lock_open"
  ) {
    lockNote(object.parentElement);
  }
  number = parseFloat(object.parentElement.querySelector(".box").innerHTML);
  const box = object.parentElement.querySelector(".box");
  const max = parseFloat(box.getAttribute("max"));
  if (number < max) {
    object.parentElement.querySelector(".box").innerHTML = number + 0.5;
    object.parentElement.querySelector(".input").value = number + 0.5;
  }
  calculate();
}

function prevNum(object) {
  if (
    object.parentElement.parentElement
      .querySelector("#lock")
      .innerHTML.trim() == "lock_open"
  ) {
    lockNote(object.parentElement);
  }
  number = parseFloat(object.parentElement.querySelector(".box").innerHTML);

  const box = object.parentElement.querySelector(".box");
  const min = parseFloat(box.getAttribute("min"));
  if (number > min) {
    object.parentElement.querySelector(".box").innerHTML = number - 0.5;
    object.parentElement.querySelector(".input").value = number - 0.5;
  }
  calculate();
}

function lockNote(object) {
  lock = object.parentElement.querySelector("#lock").innerHTML.trim();
  if (lock == "lock_open") {
    object.parentElement.querySelector("#lock").innerHTML = "lock";
    object.parentElement.querySelector(".box").style.color = "white";
  } else {
    object.parentElement.querySelector("#lock").innerHTML = "lock_open";
  }
}

function calculate() {
  const boxes = document.querySelectorAll(".box");
  let total = 0;
  let totalOpen = 0;
  for (const box of boxes) {
    if (
      box.parentElement.parentElement.querySelector("#lock").innerHTML.trim() ==
      "lock"
    ) {
      total += parseFloat(box.innerHTML);
    } else {
      totalOpen += parseFloat(box.innerHTML);
    }
  }

  // Fetch the data.json file
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      average = calculateAverage(data, "M1 MIAGE alt"); // Remplacer 'M1 MIAGE alt' par la classe de l'étudiant
      document.querySelector(".resultat").innerHTML = average;
      if (average >= 10) {
        document.querySelector(".resultat").style.color = "green";
      } else {
        document.querySelector(".resultat").style.color = "red";
        updateNotes(data, average);
      }
    })
    .catch((error) => {
      console.error("Error reading data.json:", error);
    });
}

function calculateAverage(data, className) {
  createShareableLink();
  let miageSum = 0;
  let miageCount = 0;
  let formule = "";

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
            document.querySelector(`[name="${key}.${epreuve}"]`).value
          );

          temp += coef * inputValue;
          tempCoef += coef;

          formule += `${coef} * ${inputValue}`;
        }

        formule += `) * ${v["coef"]}`;

        miageSum += v["coef"] * (temp / tempCoef);
        miageCount += v["coef"];
      } else {
        const inputValue = parseFloat(document.querySelector(`#${key}`).value);

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

    return moyenne;
  }
}

function updateNotes(data, average) {
  const boxes = document.querySelectorAll(".box");

  // boxes.forEach(box => {
  //     const lockElement = box.parentElement.parentElement.querySelector('#lock');
  //     const inputElement = box.parentElement.querySelector('.input');

  //     if (lockElement.innerHTML.trim() === 'lock_open') {
  //         const currentNote = parseFloat(box.innerHTML);
  //         if (average < 10 && currentNote < 20) {
  //             box.innerHTML = currentNote + 0.5;
  //             inputElement.value = currentNote + 0.5;
  //             box.style.color = 'yellow';
  //         } else {
  //             document.querySelector('.resultat2').innerHTML = average;
  //             return;
  //         }
  //     }

  // });

  while (average < 10) {
    const lowestOpenNoteObj = findLowestOpenNoteObj();
    if (
      lowestOpenNoteObj == null ||
      parseFloat(lowestOpenNoteObj.innerHTML) >= 20
    ) {
      break;
    }
    const currentNote = parseFloat(lowestOpenNoteObj.innerHTML);
    lowestOpenNoteObj.innerHTML = currentNote + 0.5;
    lowestOpenNoteObj.parentElement.querySelector(".input").value =
      currentNote + 0.5;
    lowestOpenNoteObj.style.color = "yellow";
    average = calculateAverage(data, "M1 MIAGE alt");
    document.querySelector(".resultat2").innerHTML = average;
  }
}

function findLowestOpenNoteObj() {
  const boxes = document.querySelectorAll(".box");
  let lowest = 20;
  let lowestObj = null;
  for (const box of boxes) {
    if (
      box.parentElement.parentElement.querySelector("#lock").innerHTML.trim() ==
      "lock_open"
    ) {
      if (parseFloat(box.innerHTML) < lowest) {
        lowest = parseFloat(box.innerHTML);
        lowestObj = box;
      }
    }
  }
  return lowestObj;
}

function findHighestOpenNoteObj() {
  const boxes = document.querySelectorAll(".box");
  let highest = 0;
  let highestObj = null;
  for (const box of boxes) {
    if (
      box.parentElement.parentElement.querySelector("#lock").innerHTML.trim() ==
      "lock_open"
    ) {
      if (parseFloat(box.innerHTML) > highest) {
        highest = parseFloat(box.innerHTML);
        highestObj = box;
      }
    }
  }
  return highestObj;
}

function calculateMin() {
  while (average > 10) {
      const highestOpenNoteObj = findHighestOpenNoteObj();
      console.log(highestOpenNoteObj.parentElement.querySelector(".input").value);
    if (
      highestOpenNoteObj == null ||
      parseFloat(highestOpenNoteObj.innerHTML) <= 0
    ) {
      break;
    }
    const currentNote = parseFloat(highestOpenNoteObj.innerHTML);
    highestOpenNoteObj.innerHTML = currentNote - 0.5;
    highestOpenNoteObj.parentElement.querySelector(".input").value =
      currentNote - 0.5;
    average = calculateAverage(data, "M1 MIAGE alt"); // Remplacer 'M1 MIAGE alt' par la classe de l'étudiant
    document.querySelector(".resultat2").innerHTML = average;
    if (average >= 10) {
        highestOpenNoteObj.style.color = "yellow";
    } else {
        highestOpenNoteObj.innerHTML = currentNote + 0.5;
        highestOpenNoteObj.parentElement.querySelector(".input").value =
          currentNote + 0.5;
        return;
    }
    console.log(average);
  }
}

function createShareableLink() {
    const boxes = document.querySelectorAll(".box");
    let link = window.location.href;
    for (const box of boxes) {
        const encodedBox = btoa(box.parentElement.parentElement.querySelector('#lock').innerHTML.trim() + box.innerHTML);
        link += `${encodedBox};`;
    }
    link += `${document.querySelector('.resultat').innerHTML}`;
    console.log(link);
    document.querySelector('.shareable-link').innerHTML = link;
    document.querySelector('.shareable-link').style.display = 'block';
}

function loadShareableLink() {
    const link = window.location.href;
    const boxes = document.querySelectorAll(".box");
    const linkBoxes = link.split(';');
    const average = linkBoxes[linkBoxes.length - 1];
    document.querySelector('.resultat').innerHTML = average;
    document.querySelector('.resultat2').innerHTML = average;
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        const lock = linkBoxes[i].substring(0, 9);
        const note = linkBoxes[i].substring(9);
        box.parentElement.parentElement.querySelector('#lock').innerHTML = lock;
        box.innerHTML = note;
        box.parentElement.querySelector('.input').value = note;
        if (lock == 'lock_open') {
            box.style.color = 'white';
        }
    }
}

