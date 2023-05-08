document.getElementById("add-category").addEventListener("click", addCategory);

function addCategory() {
    const categoryTable = document.getElementById("category-table");
    
    const row = document.createElement("tr");

    const categoryNameCell = document.createElement("td");
    const categoryInput = document.createElement("input");
    categoryInput.setAttribute("type", "text");
    categoryInput.setAttribute("placeholder", "Category Name");
    categoryInput.required = true;
    categoryNameCell.appendChild(categoryInput);
    row.appendChild(categoryNameCell);

    const subcategoryCell = document.createElement("td");
    const subcategoryTable = document.createElement("table");
    subcategoryTable.classList.add("subcategory-table");
    subcategoryCell.appendChild(subcategoryTable);
    row.appendChild(subcategoryCell);

    const addSubcategoryBtn = document.createElement("button");
    addSubcategoryBtn.type = "button";
    addSubcategoryBtn.textContent = "Add Subcategory";
    addSubcategoryBtn.classList.add("btn", "btn-small");
    addSubcategoryBtn.onclick = () => addSubcategory(subcategoryTable);
    row.appendChild(addSubcategoryBtn);

    categoryTable.appendChild(row);
}

function addSubcategory(subcategoryTable) {
    const row = document.createElement("tr");

    const subcategoryNameCell = document.createElement("td");
    const subcategoryInput = document.createElement("input");
    subcategoryInput.setAttribute("type", "text");
    subcategoryInput.setAttribute("placeholder", "Subcategory Name");
    subcategoryInput.required = true;
    subcategoryNameCell.appendChild(subcategoryInput);
    row.appendChild(subcategoryNameCell);

    const weightCell = document.createElement("td");
    const weightInput = document.createElement("input");
    weightInput.setAttribute("type", "number");
    weightInput.setAttribute("placeholder", "Weight (1-5)");
    weightInput.setAttribute("min", "1");
    weightInput.setAttribute("max", "5");
    weightInput.required = true;
    weightCell.appendChild(weightInput);
    row.appendChild(weightCell);

    subcategoryTable.appendChild(row);
}

document.getElementById("mfrat-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const categories = [];

    // Select top-level category rows
    const categoryRows = Array.from(document.querySelectorAll("#category-table >  tr"));

    categoryRows.forEach(categoryRow => {
        
        const categoryName = categoryRow.querySelector("input[type=text]").value;
        const subcategories = [];

        // Select subcategory rows within this category row
        const subcategoryRows = Array.from(categoryRow.querySelectorAll(".subcategory-table > tr"));

        subcategoryRows.forEach(subcategoryRow => {
            const subcategoryName = subcategoryRow.querySelector("input[type=text]").value;
            const weight = parseFloat(subcategoryRow.querySelector("input[type=number]").value);
            subcategories.push({ name: subcategoryName, weight: weight });
        });

        categories.push({ name: categoryName, subcategories: subcategories });
    });
    
    sessionStorage.setItem("mfratFormData", JSON.stringify(categories));
    window.location.href = "data_entry.html";
});