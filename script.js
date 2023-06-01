const notesContainer = document.querySelector(".notes-container");
const btn = document.querySelector(".submit");
let note = document.getElementById("words");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

btn.addEventListener("click", () => {
    if (note.value === "") {
        alert("Please enter a note in the text box");
    }
    else {
        let inputBox = document.createElement("p");
        inputBox.className = "input-box";
        inputBox.setAttribute("contenteditable", "true");
        inputBox.textContent = note.value;

        let img = document.createElement("img");
        img.src = "images/trash.png";
        notesContainer.appendChild(inputBox).appendChild(img);
        note.value = "";
        updateStorage();
    }
})

notesContainer.addEventListener("click", function (e) {
    //remove sticky note if delete is clicked
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
    else if (e.target.tagName === "P") {
        console.log(e.target.tagName)
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            }
        }
        )
    }
})

// saves notes to local memory
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// line break command
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})