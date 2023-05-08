
const riskCategories = [
    {id : 'Weather', max : 5},
    {id : 'Aircraft Condition', max :5 },
    {id : 'Aircraft Performance', max : 5},
    {id : 'Mission Environment', max : 5},
    {id : 'Human Factors', max : 5},
];

function buildRiskTable(){

    const riskTableBody = document.getElementById('risk-table-body');

    riskCategories.forEach((category)=>{
        const tr = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.style.textAlign = "center";
        nameCell.textContent = category.id;
        tr.appendChild(nameCell);

        const categoryNameNoSpaces = category.id.replace(" ", "");

        const scoreCell = document.createElement("td");
        scoreCell.style.textAlign = "center";
        scoreCell.innerHTML = `
        <a id="btn_${categoryNameNoSpaces}_SUB" class="btn-floating btn-small waves-effect waves-light green white-text"><i class="material-icons">remove</i></a>
        <span id="field_Value_${categoryNameNoSpaces}" style="margin-left: 10px; margin-right: 10px; font-weight: bold;">0</span>
        <a id="btn_${categoryNameNoSpaces}_ADD" class="btn-floating btn-small waves-effect waves-light red white-text"><i class="material-icons">add</i></a>
        `
        tr.appendChild(scoreCell);
        

        const maxCell = document.createElement("td");
        maxCell.style.textAlign = "center";
        maxCell.textContent = category.max;
        tr.appendChild(maxCell);

        riskTableBody.appendChild(tr);
    });

}


function buildDisplayTable(){
    
    const displayTableBody = document.getElementById('display-table-body');

    riskCategories.forEach((category)=>{
        const tr = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.style.textAlign = "center";
        nameCell.textContent = category.id;

        const categoryNameNoSpaces = category.id.replace(" ", "");

        const scoreCell = document.createElement("td");
        scoreCell.id = `field_MfratDisplay_${categoryNameNoSpaces}`;

        const outOf = document.createElement("td");
        outOf.style.textAlign = "center";
        outOf.textContent = 5;
        
        tr.appendChild(nameCell);
        tr.appendChild(scoreCell);
        tr.appendChild(outOf);

        displayTableBody.appendChild(tr);
    });

}

