const categories = JSON.parse(sessionStorage.getItem("mfratFormData"));
console.log(categories);
const categoryTable = document.getElementById("category-table");

// Create the header row with titles
const headerRow = document.createElement("tr");
const categoryHeader = document.createElement("th");
const categoryTitle = document.createTextNode("Category");
categoryHeader.appendChild(categoryTitle);

headerRow.appendChild(categoryHeader);
const subcategoryHeader = document.createElement("th");
const subcategoryTitle = document.createTextNode("Subcategory");
subcategoryHeader.appendChild(subcategoryTitle);
headerRow.appendChild(subcategoryHeader);

const weightHeader = document.createElement("th");
const weightTitle = document.createTextNode("Score");
weightHeader.appendChild(weightTitle);
headerRow.appendChild(weightHeader);
categoryTable.appendChild(headerRow);

categories.forEach(category => {
    const row = document.createElement("tr");

    const categoryNameCell = document.createElement("td");
    const categoryName = document.createTextNode(category.name);
    categoryNameCell.appendChild(categoryName);
    row.appendChild(categoryNameCell);

    const subcategoryCell = document.createElement("td");
    const subcategoryTable = document.createElement("table");
    subcategoryTable.classList.add("subcategory-table");
    subcategoryCell.appendChild(subcategoryTable);
    row.appendChild(subcategoryCell);

    category.subcategories.forEach(subcategory => {
        const subRow = document.createElement("tr");

        const subcategoryNameCell = document.createElement("td");
        const subcategoryName = document.createTextNode(subcategory.name);
        subcategoryNameCell.appendChild(subcategoryName);
        subRow.appendChild(subcategoryNameCell);

        const weightCell = document.createElement("td");

        const weightInput = document.createElement("input");
        weightInput.setAttribute("type", "number");
        weightInput.setAttribute("value", subcategory.weight);
        weightInput.setAttribute("min", "1");
        weightInput.setAttribute("max", "5");
        weightInput.required = true;
        weightCell.appendChild(weightInput);
        subRow.appendChild(weightCell);

        subcategoryTable.appendChild(subRow);
    });

    categoryTable.appendChild(row);
});