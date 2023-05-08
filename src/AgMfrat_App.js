/**
 * @property {HTMLInputElement} html_input_Location
 */
class AgMfrat_App {
    constructor() {

        //HTML Elements

        this.sideNaveInstance = null;

        //main display divs
        this._html_div_Loader = document.getElementById("div_Loader");
        this._html_div_MainMenu = document.getElementById("div_MainMenu");
        this._html_div_MfratForm = document.getElementById("div_MfratForm");
        this._html_div_NoAuthError = document.getElementById("div_NoAuthError");
        this._html_div_MfratList = document.getElementById("div_MfratList");
        this._html_div_MfratDisplay = document.getElementById("div_MfratDisplay");

        this._mainDisplayDivs = [
            this._html_div_Loader,
            this._html_div_MainMenu,
            this._html_div_MfratForm,
            this._html_div_NoAuthError,
            this._html_div_MfratList,
            this._html_div_MfratDisplay
        ];

        this.html_input_Location =document.getElementById("input_Location");

        this._html_field_Airplane = document.getElementById("field_Airplane");

        this._html_btn_Weather_ADD = document.getElementById("btn_Weather_ADD");
        this._html_btn_Weather_SUB = document.getElementById("btn_Weather_SUB");
        this._html_field_Value_Weather = document.getElementById("field_Value_Weather");
        //
        this._html_btn_AircraftCondition_SUB = document.getElementById("btn_AircraftCondition_SUB");
        this._html_btn_AircraftCondition_ADD = document.getElementById("btn_AircraftCondition_ADD");
        this._html_field_Value_AircraftCondition = document.getElementById("field_Value_AircraftCondition");
        //
        this._html_btn_AircraftPerformance_SUB = document.getElementById("btn_AircraftPerformance_SUB");
        this._html_btn_AircraftPerformance_ADD = document.getElementById("btn_AircraftPerformance_ADD");
        this._html_field_Value_AircraftPerformance = document.getElementById("field_Value_AircraftPerformance");
        //
        this._html_btn_MissionEnvironment_SUB = document.getElementById("btn_MissionEnvironment_SUB");
        this._html_btn_MissionEnvironment_ADD = document.getElementById("btn_MissionEnvironment_ADD");
        this._html_field_Value_MissionEnvironment = document.getElementById("field_Value_MissionEnvironment");
        //
        this._html_btn_HumanFactors_SUB = document.getElementById("btn_HumanFactors_SUB");
        this._html_btn_HumanFactors_ADD = document.getElementById("btn_HumanFactors_ADD");
        this._html_field_Value_HumanFactors = document.getElementById("field_Value_HumanFactors");
        //

        this._html_field_TotalScore = document.getElementById("field_TotalScore");

        this._html_input_Remarks = document.getElementById("input_Remarks");
        this._html_a_SaveButton = document.getElementById("a_SaveButton");

        this.MfratFormObj = new MfratData();

        /**@type {LocalStorageFormat} */
        this._localStorageObj = null;

        /**@type {AgMfratEntries_DbData[]} */
        this.MfratListFromDb = [];

        /**@type {ContinueToMfratObj} */
        this._localStorageConinueObj = null;
    }

    Run = () => {
        this._ShowLoader();
        this._SetupNav();
        this._HookupPlusMinusHandlers();
        this._HookupOtherHandlers();

        if (this._getLocalStorage()) {
            this._InitializeFieldsAndData();
            this._ShowMainMenu();
            this._GetFromDb();

            this._getLocalStorageContinuation();

            //Continuation from w&b
            let urlParams = new URLSearchParams(window.location.search);
            let contUrlParam = urlParams.get("continue");
            if (contUrlParam === "TRUE" && this._localStorageConinueObj) {
                if (this._localStorageConinueObj.perfEntry) {
                    /**@type {number} */
                    let deltaTime = new Date().valueOf() - new Date(this._localStorageConinueObj.continueTime).valueOf();
                    deltaTime = deltaTime / (60 * 1000);//convert to minutes
                    if (deltaTime < 5.0) {
                        
                        this.html_input_Location.value = this._localStorageConinueObj.perfEntry.location;
                        this._ShowMfratForm();
                    }

                }
            }
        }
        else {
            this._ShowNoAuthError();
        }
    }

    _SetupNav = () => {
        let sideNavOptions = {};
        var elem = document.getElementById("sidenav");
        //@ts-ignore
        this.sideNaveInstance = M.Sidenav.init(elem, sideNavOptions);

        document.getElementById("switchable_NavLogo").onclick = () => {
            window.location.href = "./AgDashboard.aspx";
        }

        document.getElementById("a_nav_Dashboard").onclick = () => {
            window.location.href = "./AgDashboard.aspx";
        }
        document.getElementById("a_sidenav_Dashboard").onclick = () => {
            this.sideNaveInstance.close();
            window.location.href = "./AgDashboard.aspx";
        }
        document.getElementById("a_nav_Menu").onclick = () => {
            this._ShowMainMenu();
        }
        document.getElementById("a_sidenav_Menu").onclick = () => {
            this._ShowMainMenu();

            this.sideNaveInstance.close();
        }


        document.getElementById("a_Goto_EntryForm").onclick = () => {
            this._ShowMfratForm();
        }

        document.getElementById("a_Goto_ReviewRecords").onclick = () => {
            this._ShowMfratList();
        }

        document.getElementById("a_MfratList_BackBtn").onclick = () => {
            this._ShowMainMenu();
        }

    }

    _HookupPlusMinusHandlers = () => {

        this._html_btn_Weather_ADD.onclick = () => {
            this.MfratFormObj.mfratItem_Weather.Add1();
            this._RecalcAndUpdateDisplay();
        }

        this._html_btn_Weather_SUB.onclick = () => {
            this.MfratFormObj.mfratItem_Weather.Subtract1();
            this._RecalcAndUpdateDisplay();
        }

        this._html_btn_AircraftCondition_ADD.onclick = () => {
            this.MfratFormObj.mfratItem_AircraftCondition.Add1();
            this._RecalcAndUpdateDisplay();
        }

        this._html_btn_AircraftCondition_SUB.onclick = () => {
            this.MfratFormObj.mfratItem_AircraftCondition.Subtract1();
            this._RecalcAndUpdateDisplay();
        }

        this._html_btn_AircraftPerformance_ADD.onclick = () => {
            this.MfratFormObj.mfratItem_AircraftPerformance.Add1();
            this._RecalcAndUpdateDisplay();
        }

        this._html_btn_AircraftPerformance_SUB.onclick = () => {
            this.MfratFormObj.mfratItem_AircraftPerformance.Subtract1();
            this._RecalcAndUpdateDisplay();
        }

        this._html_btn_MissionEnvironment_ADD.onclick = () => {
            this.MfratFormObj.mfratItem_MissionEnvironment.Add1();
            this._RecalcAndUpdateDisplay();
        }

        this._html_btn_MissionEnvironment_SUB.onclick = () => {
            this.MfratFormObj.mfratItem_MissionEnvironment.Subtract1();
            this._RecalcAndUpdateDisplay();
        }

        this._html_btn_HumanFactors_ADD.onclick = () => {
            this.MfratFormObj.mfratItem_HumanFactors.Add1();
            this._RecalcAndUpdateDisplay();
        }

        this._html_btn_HumanFactors_SUB.onclick = () => {
            this.MfratFormObj.mfratItem_HumanFactors.Subtract1();
            this._RecalcAndUpdateDisplay();
        }
    }

    _HookupOtherHandlers = () => {
        this.MfratFormObj.Recalc();

        this._html_input_Remarks.onchange = () => {
            this.MfratFormObj.Remarks = this._html_input_Remarks.value;
        }

        this._html_a_SaveButton.onclick = this._SaveBtnClicked;
    }

    _RecalcAndUpdateDisplay = () => {
        this.MfratFormObj.Recalc();
        this.UpdateFormDisplay();
    }

    UpdateFormDisplay = () => {
        this._html_field_Value_Weather.innerText = this.MfratFormObj.mfratItem_Weather.CurrentValue.toFixed();
        this._html_field_Value_AircraftCondition.innerText = this.MfratFormObj.mfratItem_AircraftCondition.CurrentValue.toFixed();
        this._html_field_Value_AircraftPerformance.innerText = this.MfratFormObj.mfratItem_AircraftPerformance.CurrentValue.toFixed();
        this._html_field_Value_MissionEnvironment.innerText = this.MfratFormObj.mfratItem_MissionEnvironment.CurrentValue.toFixed();
        this._html_field_Value_HumanFactors.innerText = this.MfratFormObj.mfratItem_HumanFactors.CurrentValue.toFixed();


        this._html_field_TotalScore.innerText = this.MfratFormObj.totalValue.toFixed();


        let scorePercent = Math.round((this.MfratFormObj.totalValue / 25)*100);
        if(scorePercent < 1){
            scorePercent = 1;
        }
        let totalBar_Inner = document.getElementById("totalBar_Inner");
        totalBar_Inner.style.width = scorePercent + "%";
        if(this.MfratFormObj.totalValue < 16){
            totalBar_Inner.style.backgroundColor = "lightgreen";
        }
        else if(this.MfratFormObj.totalValue < 21){
            totalBar_Inner.style.backgroundColor = "gold";
        }
        else{
            totalBar_Inner.style.backgroundColor = "red";
        }
        if(scorePercent < 15){
            totalBar_Inner.innerText = this.MfratFormObj.totalValue.toFixed();
        }
        else{
            totalBar_Inner.innerText = "Total: " + this.MfratFormObj.totalValue.toFixed();
        }
        if(this.MfratFormObj.totalValue >= 21){
            totalBar_Inner.style.color = "white";
        }
        else{
            totalBar_Inner.style.color = "black";
        }
        

    }

    _HideAllMainDisplayDivs = () => {
        for (let i = 0; i < this._mainDisplayDivs.length; i++) {
            this._mainDisplayDivs[i].style.display = "none";
        }
    }

    _ShowLoader = () => {
        this._HideAllMainDisplayDivs();
        this._html_div_Loader.style.display = "inherit";
    }

    _ShowNoAuthError = () => {
        this._HideAllMainDisplayDivs();
        this._html_div_NoAuthError.style.display = "inherit";
    }

    _ShowMainMenu = () => {
        this._HideAllMainDisplayDivs();
        this._html_div_MainMenu.style.display = "inherit";
    }

    _ShowMfratForm = () => {
        this._HideAllMainDisplayDivs();
        this._html_div_MfratForm.style.display = "inherit";
    }

    _ShowMfratList = () => {
        this._HideAllMainDisplayDivs();
        this._html_div_MfratList.style.display = "inherit";
    }

    /**
     * @param {MfratData} mfrat;
     */
    _ShowMfratDisplay = (mfrat) => {
        this._HideAllMainDisplayDivs();
        document.getElementById("field_MfratDisplay_Location").innerText = mfrat.Location;
        document.getElementById("field_MfratDisplay_Date").innerText = mfrat.RecordDateTime.toLocaleString();
        document.getElementById("field_MfratDisplay_Airplane").innerText = mfrat.Airplane.AirplaneName + "  " + mfrat.Airplane.RegistrationNumber + " - " + mfrat.Airplane.SerialNumber;
        document.getElementById("field_MfratDisplay_Weather").innerText = mfrat.mfratItem_Weather.CurrentValue.toFixed();
        document.getElementById("field_MfratDisplay_AircraftCondition").innerText = mfrat.mfratItem_AircraftCondition.CurrentValue.toFixed();
        document.getElementById("field_MfratDisplay_AircraftPerformance").innerText = mfrat.mfratItem_AircraftPerformance.CurrentValue.toFixed();
        document.getElementById("field_MfratDisplay_MissionEnvironment").innerText = mfrat.mfratItem_MissionEnvironment.CurrentValue.toFixed();
        document.getElementById("field_MfratDisplay_HumanFactors").innerText = mfrat.mfratItem_HumanFactors.CurrentValue.toFixed();

        if (mfrat.Remarks && mfrat.Remarks !== "") {
            document.getElementById("field_MfratDisplay_Remarks").innerText = mfrat.Remarks;
        }
        else {
            document.getElementById("field_MfratDisplay_Remarks").innerText = "None.";
        }

        document.getElementById("field_MfratDisplay_TotalScore").innerText = "Total Risk Score: " + mfrat.totalValue.toFixed();



        document.getElementById("a_MfratDisplay_BackBtn").onclick = () => {
            this._ShowMfratList();
        }




        this._html_div_MfratDisplay.style.display = "inherit";
    }

    /**
     * @summary Gets local storage object and parses it.  Data is saved to _localStorageObj if successful
     * @returns {boolean} Storage Result, true if no problems encountered and storage data was loaded.
     */
    _getLocalStorage = () => {

        this._localStorageObj = null;

        var storageResult = false;
        if (typeof Storage !== "undefined") {

            var localStorageStuff = localStorage.getItem("AgMfrat");
            if (localStorageStuff && localStorageStuff !== "undefined") {
                var storageObj = JSON.parse(localStorageStuff);

                if (storageObj !== undefined && storageObj !== null && storageObj.passwordHash !== "" && storageObj.accountEmail !== "") {
                    //try to login with the local storage's email and password hash
                    this._localStorageObj = storageObj;
                    storageResult = true;
                }
                else {
                    //There was data but it was an empty object
                    storageResult = false;
                }
            }
            else {
                // Sorry! No Web Storage support..
                storageResult = false;
            }


        } else {
            // Sorry! No Web Storage support..
            storageResult = false;
        }

        return storageResult;
    }

    _getLocalStorageContinuation = () => {

        this._localStorageConinueObj = null;

        var storageResult = false;
        if (typeof Storage !== "undefined") {

            var localStorageStuff = localStorage.getItem("AgMfratContinue");
            if (localStorageStuff && localStorageStuff !== "undefined") {
                var storageObj = JSON.parse(localStorageStuff);

                if (storageObj !== undefined && storageObj !== null) {
                    //try to login with the local storage's email and password hash
                    this._localStorageConinueObj = storageObj;
                    storageResult = true;
                }
                else {
                    //There was data but it was an empty object
                    storageResult = false;
                }
            }
            else {
                // Sorry! No Web Storage support..
                storageResult = false;
            }


        } else {
            // Sorry! No Web Storage support..
            storageResult = false;
        }

        return storageResult;
    }

    _InitializeFieldsAndData = () => {
        this.MfratFormObj = new MfratData();
        this.MfratFormObj.Airplane = this._localStorageObj.airplane;
        this.MfratFormObj.EnteredBy = this._localStorageObj.accountEmail;

        this.html_input_Location.value = "";
        this._html_input_Remarks.value = "";

        this._RecalcAndUpdateDisplay();

        this._html_field_Airplane.innerText = "Airplane: " + this._localStorageObj.airplane.SerialNumber + " - " + this._localStorageObj.airplane.RegistrationNumber;

    }

    _SaveBtnClicked = () => {
        let Location = this.html_input_Location.value;
        if (Location && Location !== "") {
            this.MfratFormObj.Location = Location;
        }
        else {
            //@ts-ignore
            M.toast({ html: "Invalid Location" });
            return;
        }

        if (this.MfratFormObj.totalValue >= 16) {
            if (!this.MfratFormObj.Remarks || this.MfratFormObj.Remarks === "") {
                //@ts-ignore
                M.toast({ html: "Remarks are required if risk score is greater than 15." });
                return;
            }
        }

        //good otherwise.
        //show loader and try to save
        this._ShowLoader();

        this._SaveToDb();
    }

    _SaveToDb = () => {
        /*
            public string AirplaneUniqueId;
            public string CreatedBy;
            public string JsonData;
        */
        let PostData = {
            AirplaneUniqueId: this._localStorageObj.airplane.AirplaneUniqueId,
            CreatedBy: this._localStorageObj.accountEmail,
            JsonData: JSON.stringify(this.MfratFormObj),

        };

        let Post = {
            postType: "SAVE_MFRAT",
            postData: JSON.stringify(PostData)
        };

        let req = new XMLHttpRequest();
        req.open("POST", "./AgAppInterface1.aspx", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200 || req.status === 0) {
                    var resp = req.responseText;
                    try {
                        var responseData = JSON.parse(resp);
                        if (responseData.noErrors) {

                            this._SaveToDb_Success(responseData);
                        }
                        else {

                            this._SaveToDb_Failure(responseData);
                        }
                    }
                    catch (ex) {

                        this._SaveToDb_Failure();
                    }
                }
            }
            else if (req.readyState === 2 || req.readyState === 4) {
                if (req.status === 502 || req.status === 500 || req.status === 404 || req.status === 403 || req.status === 400) {
                    // @ts-ignore
                    this.onErrorFunction();
                }
            }
        };
        req.send(JSON.stringify(Post));
    }

    /**
     * @param {SaveToDbResponseFormat} resp
     */
    _SaveToDb_Success = (resp) => {
        //@ts-ignore
        M.toast({ html: "Saved." });

        this._ShowMainMenu();

        //create a fake entry in the MfratListFromDb for the display
        let fakeMfratDbRecord = new AgMfratEntries_DbData();
        fakeMfratDbRecord.AirplaneUniqueId = this._localStorageObj.airplane.AirplaneUniqueId;
        fakeMfratDbRecord.CreatedBy = this._localStorageObj.accountEmail;
        fakeMfratDbRecord.ID = 99999;
        fakeMfratDbRecord.JsonData = JSON.stringify(this.MfratFormObj);
        fakeMfratDbRecord.SavedDateTime = new Date();
        this.MfratListFromDb.push(fakeMfratDbRecord);
        this.RenderMfratList();

        this._InitializeFieldsAndData();//clear everything to start over if desired
    }

    /**
     * @param {SaveToDbResponseFormat} [resp]
     */
    _SaveToDb_Failure = (resp) => {
        //@ts-ignore
        M.toast({ html: "An Error Occurred." });

        this._ShowMfratForm();
    }

    _GetFromDb = () => {

        let PostData = {
            AirplaneUniqueId: this._localStorageObj.airplane.AirplaneUniqueId,
            CreatedBy: this._localStorageObj.accountEmail
        };

        let Post = {
            postType: "GET_USERS_MFRATS",
            postData: JSON.stringify(PostData)
        };

        let req = new XMLHttpRequest();
        req.open("POST", "./AgAppInterface1.aspx", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200 || req.status === 0) {
                    var resp = req.responseText;
                    try {
                        var responseData = JSON.parse(resp);
                        if (responseData.noErrors) {

                            this._GetFromDb_Success(responseData);
                        }
                        else {

                            this._GetFromDb_Failure(responseData);
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                        this._SaveToDb_Failure();
                    }
                }
            }
            else if (req.readyState === 2 || req.readyState === 4) {
                if (req.status === 502 || req.status === 500 || req.status === 404 || req.status === 403 || req.status === 400) {
                    // @ts-ignore
                    this.onErrorFunction();
                }
            }
        };
        req.send(JSON.stringify(Post));
    }


    /**
     * @param {GetUsersMfratsResults} resp
     */
    _GetFromDb_Success = (resp) => {

        if (resp && resp.noErrors) {
            this.MfratListFromDb = resp.Mfrats;

            this.RenderMfratList();
        }
        else {
            //@ts-ignore
            M.toast({ html: "An error occurred while trying to retrieve your saved data." })
        }

    }

    /**
     * @param {GetUsersMfratsResults} resp
     */
    _GetFromDb_Failure = (resp) => {
        //@ts-ignore
        M.toast({ html: "An error occurred while trying to retrieve your saved data." })
    }

    RenderMfratList = () => {

        document.getElementById("div_SavedRecordsTable").innerHTML = "";

        if (this.MfratListFromDb.length > 0) {

            let table = document.createElement("table");
            table.className = "table";
            document.getElementById("div_SavedRecordsTable")

            let thead = document.createElement("thead");
            table.appendChild(thead);
            thead.innerHTML = "<tr><th>Date</th><th>Airplane</th><th>Total Risk Score</th></tr>";

            let tbody = document.createElement("tbody");
            table.append(tbody);
            for (let i = 0; i < this.MfratListFromDb.length; i++) {

                let mfratData = new MfratData();
                mfratData.ParseFromJsonString(this.MfratListFromDb[i].JsonData);

                if(!mfratData.Airplane){
                    continue;
                }

                let row = document.createElement("tr");

                let c1 = document.createElement("td");
                c1.innerText = mfratData.RecordDateTime.toLocaleString();
                row.appendChild(c1);

                let c2 = document.createElement("td");
                let displayText = "";
                if(mfratData.Airplane.AirplaneName){
                    displayText = mfratData.Airplane.AirplaneName;
                }
                displayText += "  " + mfratData.Airplane.SerialNumber + " - " + mfratData.Airplane.RegistrationNumber;
                c2.innerText = displayText;
                row.appendChild(c2);

                let c3 = document.createElement("td");
                c3.innerText = mfratData.totalValue.toFixed();
                row.appendChild(c3);

                //@ts-ignore
                row.mfratData = mfratData;

                row.onclick = (e) => {
                    /**@type {MfratData} */
                    let mfrat = null;

                    //@ts-ignore
                    if (e.target.mfratData) {
                        //@ts-ignore
                        mfrat = e.target.mfratData;
                    }
                    else {
                        //@ts-ignore
                        mfrat = e.target.parentElement.mfratData;
                    }

                    this._ShowMfratDisplay(mfrat);
                }

                tbody.append(row);
            }

            document.getElementById("div_SavedRecordsTable").appendChild(table);
        }
        else {
            document.getElementById("div_SavedRecordsTable").innerText = "No Records";
        }
    }

}


class MfratData {
    constructor() {

        this.totalValue = 0;

        this.mfratItem_Weather = new MfratItem();
        this.mfratItem_AircraftCondition = new MfratItem();
        this.mfratItem_AircraftPerformance = new MfratItem();
        this.mfratItem_MissionEnvironment = new MfratItem();
        this.mfratItem_HumanFactors = new MfratItem();

        this.mfratItems = [
            this.mfratItem_Weather,
            this.mfratItem_AircraftCondition,
            this.mfratItem_AircraftPerformance,
            this.mfratItem_MissionEnvironment,
            this.mfratItem_HumanFactors
        ];

        this.Location = "";
        this.Remarks = "";

        this.RecordDateTime = new Date();

        /**@type {AirplaneFormat} */
        this.Airplane = null;

        this.EnteredBy = "";
    }


    /**
     * @param {string} JsonStr
     */
    ParseFromJsonString = (JsonStr) => {
        let jsonObj = JSON.parse(JsonStr);

        Object.assign(this, jsonObj);

        this.RecordDateTime = new Date(this.RecordDateTime);
    }

    Recalc = () => {
        this.totalValue = 0;
        for (let i = 0; i < this.mfratItems.length; i++) {
            this.totalValue += this.mfratItems[i].CurrentValue;
        }
    }


}

class MfratItem {
    constructor() {
        this.CurrentValue = 0;
        this.MaxValue = 5;
    }

    Add1 = () => {
        if (this.CurrentValue < this.MaxValue) {
            this.CurrentValue = this.CurrentValue + 1;
        }
    }

    Subtract1 = () => {
        if (this.CurrentValue > 0) {
            this.CurrentValue = this.CurrentValue - 1;
        }
    }

}

class MfratListRow {
    constructor() {

    }
}

class LocalStorageFormat {
    constructor() {
        /**@type {string} */
        this.accountEmail = "";

        /**@type {AirplaneFormat} */
        this.airplane = null;

        /**@type {string} */
        this.passwordHash = "";
    }
}

class AirplaneFormat {
    constructor() {
        this.AircraftType = "";
        this.AirplaneName = "";
        this.AirplaneUniqueId = "";
        this.DisplayColor = "";
        this.EngineType = "";
        this.LiquidUnits = "";
        this.RegistrationNumber = "";
        this.SerialNumber = "";
    }
}

class SaveToDbResponseFormat {
    constructor() {
        /*
            public bool noErrors;
        */
        this.noErrors = false;
    }
}

class GetUsersMfratsResults {
    constructor() {
        /*
            public bool noErrors;
            public List<AgDb_MfratEntries.AgMfratEntries_DbData> Mfrats;       
        */

        this.noErrors = false;

        /**@type {AgMfratEntries_DbData[]} */
        this.Mfrats = [];
    }
}


class AgMfratEntries_DbData {
    constructor() {
        /*
            public int ID;
            public string AirplaneUniqueId;
            public DateTime SavedDateTime;
            public string JsonData;
            public string CreatedBy;
        */

        this.ID = -1;
        this.AirplaneUniqueId = "";
        this.SavedDateTime = new Date();
        this.JsonData = "";
        this.CreatedBy = "";

    }
}

class ContinueToMfratObj {
    /**
     * @param {object} perfEntry
     * @param {string} perfEntry.location
     */
    constructor(perfEntry) {
        this.continueTime = new Date();
        this.perfEntry = perfEntry;
    }
}



