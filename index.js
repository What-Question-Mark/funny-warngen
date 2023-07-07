import { generateWarningText } from "./src/generateWarning.js";
import {
    hazards,
    sources,
    impacts,
    precautions,
    GetMaxHailSize,
    GetMaxWindGust,
    GetTorTag,
    AddNewLine,
    Add2NewLines,
    SetTime,
} from "./src/config.js";

const atDate =
    new Date()
        .toLocaleTimeString("en-US", {
            timeZone: "America/Chicago",
            hour: "2-digit",
            minute: "2-digit",
        })
        .toString() + " CDT";

const untilDate =
    SetTime(
        new Date(new Date().setMinutes(0)),
        document.getElementById("until-minutes").value,
        document.getElementById("until-hours").value
    )
        .toLocaleTimeString("en-US", {
            timeZone: "America/Chicago",
            hour: "2-digit",
            minute: "2-digit",
        })
        .toString() + " CDT";

const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    try {
        const hazard =
            hazards.svr.wind.hundred + " and " + hazards.svr.hail.softball;
    
        const hail = GetMaxHailSize(hazard);
        const wind = GetMaxWindGust(hazard);
    
        alert("Generating text...");
        generateWarningText(
            document.getElementById("type").value,
            document.getElementById("office-code").value,
            document.getElementById("office").value,
            document.getElementById("office-short").value,
            document.getElementById("state-code").value,
            document.getElementById("event-type").value,
            hail.tag || wind.tag,
            hail.size,
            document.getElementById("source").value,
            wind.gust,
            document.getElementById("source").value,
            JSON.parse(document.getElementById("counties").value),
            untilDate,
            atDate,
            document.getElementById("description").value,
            hazard,
            document.getElementById("source").value,
            document.getElementById("impact").value,
            JSON.parse(document.getElementById("impacted").value),
            precautions.svr.default +
                Add2NewLines +
                precautions.svr.destructive_wind_hail +
                Add2NewLines +
                precautions.svr.extremely_dangerousLine +
                Add2NewLines +
                precautions.svr.gust_frontLine +
                Add2NewLines +
                precautions.svr.lightningLine +
                Add2NewLines +
                precautions.svr.torrential_rainfallLine +
                Add2NewLines +
                document.getElementById("instructions").value +
                Add2NewLines +
                precautions.svr.deadly_storms,
            document.getElementById("tornado-possible").value,
            document.getElementById("issuer").value,
            document.getElementById("toa-in-effect").value,
            document.getElementById("tornado-threat").value,
            document.getElementById("tornado").value
        );
    } catch (e) {
        alert(e)
        console.error(e)
    }
});
