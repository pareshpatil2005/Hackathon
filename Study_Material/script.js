// document.addEventListener("DOMContentLoaded", loadMaterials);

// function addMaterial() {
//     let title = document.getElementById("title").value;
//     let category = document.getElementById("category").value;
//     let link = document.getElementById("link").value;
//     let fileInput = document.getElementById("fileUpload");
//     let file = fileInput.files[0];

//     if (!title) {
//         alert("Please enter title!");
//         return;
//     }

//     let material = { title, category, link: link || "", fileName: "", fileURL: "" };

//     if (file) {
//         let reader = new FileReader();
//         reader.onload = function (event) {
//             material.fileName = file.name;
//             material.fileURL = event.target.result;
//             saveMaterial(material);
//         };
//         reader.readAsDataURL(file);
//     } else {
//         saveMaterial(material);
//     }
// }

// function saveMaterial(material) {
//     let materials = JSON.parse(localStorage.getItem("materials")) || [];
//     materials.push(material);
//     localStorage.setItem("materials", JSON.stringify(materials));

//     document.getElementById("title").value = "";
//     document.getElementById("link").value = "";
//     document.getElementById("fileUpload").value = "";

//     loadMaterials();
// }

// function loadMaterials() {
//     let materials = JSON.parse(localStorage.getItem("materials")) || [];

//     let booksList = document.getElementById("books-list");
//     let notesList = document.getElementById("notes-list");
//     let assignmentsList = document.getElementById("assignments-list");
//     let othersList = document.getElementById("others-list");

//     booksList.innerHTML = "";
//     notesList.innerHTML = "";
//     assignmentsList.innerHTML = "";
//     othersList.innerHTML = "";

//     materials.forEach((material, index) => {
//         let item = document.createElement("div");
//         item.classList.add("material-item");

//         let content = `<strong>${material.title}</strong>`;

//         if (material.link) {
//             content += ` <a href="${material.link}" target="_blank">[View]</a>`;
//         }

//         if (material.fileName) {
//             content += ` <a href="${material.fileURL}" download="${material.fileName}">[Download ${material.fileName}]</a>`;
//         }

//         item.innerHTML = `${content} <button class="delete-btn" onclick="deleteMaterial(${index})">❌</button>`;

//         if (material.category === "Books") booksList.appendChild(item);
//         else if (material.category === "Notes") notesList.appendChild(item);
//         else if (material.category === "Assignments") assignmentsList.appendChild(item);
//         else othersList.appendChild(item);
//     });
// }

// function deleteMaterial(index) {
//     let materials = JSON.parse(localStorage.getItem("materials")) || [];
//     materials.splice(index, 1);
//     localStorage.setItem("materials", JSON.stringify(materials));
//     loadMaterials();
// }


// Function to add materials
function addMaterial() {
    let type = document.getElementById("materialType").value;
    let fileName = document.getElementById("fileName").value;
    let fileInput = document.getElementById("fileInput");

    if (fileName.trim() === "" || !fileInput.files[0]) {
        alert("Please enter a file name and select a file.");
        return;
    }

    let fileUrl = URL.createObjectURL(fileInput.files[0]);

    let materials = JSON.parse(localStorage.getItem(type)) || [];
    materials.push({ name: fileName, url: fileUrl });
    localStorage.setItem(type, JSON.stringify(materials));

    document.getElementById("fileName").value = "";
    fileInput.value = "";
    alert("File added successfully!");
}

// Function to toggle preview section
function togglePreview(type) {
    let section = document.getElementById(type);
    let materials = JSON.parse(localStorage.getItem(type)) || [];

    if (materials.length === 0) {
        alert("No files added in this section.");
        return;
    }

    // Hide all sections except the one being clicked
    document.querySelectorAll('.materials').forEach(div => {
        if (div.id !== type) {
            div.style.display = "none";
        }
    });

    // Toggle only the clicked section
    section.style.display = section.style.display === "block" ? "none" : "block";
    loadMaterials(type);
}


// Function to load materials from localStorage
function loadMaterials(type) {
    let materials = JSON.parse(localStorage.getItem(type)) || [];
    let section = document.getElementById(type);
    section.innerHTML = "";

    materials.forEach((material, index) => {
        let div = document.createElement("div");
        div.classList.add("material-item");
        div.innerHTML = `
            <a href="${material.url}" target="_blank">${material.name}</a>
            <button class="delete-btn" onclick="deleteMaterial('${type}', ${index})">❌</button>
        `;
        section.appendChild(div);
    });
}

// Function to delete materials
function deleteMaterial(type, index) {
    let materials = JSON.parse(localStorage.getItem(type));
    materials.splice(index, 1);
    localStorage.setItem(type, JSON.stringify(materials));
    loadMaterials(type);
}

// Load materials when page loads
window.onload = function () {
    ["books", "assignments", "notes", "other"].forEach(type => {
        loadMaterials(type);
    });
};




// Function to toggle preview section properly


