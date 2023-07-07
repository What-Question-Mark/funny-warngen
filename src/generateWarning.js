import { precautions } from "../src/config.js";

const credit = `\n\nGenerated using https://what-question-mark.github.io/funny-warngen/`

export async function generateWarningText(
    type,
    officeCode,
    office,
    officeShort,
    stateCode,
    eventCode,
    tag,
    maxHailSize,
    hailThreat,
    maxWindGust,
    windThreat,
    counties,
    until,
    at,
    description,
    hazard,
    source,
    impacts,
    impacted,
    instructions,
    torPossible,
    issuer,
    toaInEffect,
    damageThreat,
    tornado
) {
    let lastLocationImpactedIncluded = impacted[impacted.length - 1];
    let phonemes = [
        {
            thunderstorm:
                '<vtml_phoneme alphabet="x-cmu" ph="TH AH1 N D ER0 S T OW0 R M"></vtml_phoneme>',
            thunderstorms:
                '<vtml_phoneme alphabet="x-cmu" ph="TH AH1 N D ER0 S T OW0 R M Z"></vtml_phoneme>',
        },
    ];
    let event;

    switch (officeCode) {
        case "HUN":
            phonemes.push({
                arab: "Ay-rab",
                ne_smith: "Northeast Smith",
                blount: "Blunt",
                meridianville: "Mur-rid-e-an ville",
            });
            break;
        case "BMX":
            phonemes.push({
                in: "ihn",
                blount: "Blunt",
                calera: '<vtml_phoneme alphabet="x-cmu" ph="K AH L IH1 R AH0"></vtml_phoneme>',
                mobile: '<vtml_phoneme alphabet="x-cmu" ph="M OW1 B IY0 AH0 L"> </vtml_phoneme>',
            });
    }

    switch (eventCode) {
        case "TOR":
            event = "Tornado Warning";
            break;
        case "SVR":
            event = "Severe Thunderstorm Warning";
            break;
        case "FFW":
            event = "Flash Flood Warning";
            break;
        default:
            event = "Unreconized Warning";
    }

    const rawResult = `${eventCode}${officeCode}${
        type === "ISSUE" ? "" : "UPDATE"
    }\n\nBULLETIN\n${event}\nNational Weather Service ${officeShort} ${stateCode}\n${at}\n\nThe National Weather Service in ${office} has issued a\n\n* ${event} for...\n${
        Array.isArray(counties)
            ? counties.join(",\n")
            : counties
    }\n\n* Until ${until.replace(":", "")}.\n\n* At ${at.replace(
        ":",
        ""
    )}, ${description}\n\nHAZARD...${
        hazard.charAt(0).toUpperCase() + hazard.slice(1)
    }.\n\nSOURCE...${
        source.charAt(0).toUpperCase() + source.slice(1)
    }.\n\nIMPACT...${impacts}\n\n* Locations impacted include...\n${
        Array.isArray(impacted)
            ? impacted.length > 1
                ? impacted.slice(0, -1).sort().join(", ") +
                  " and " +
                  lastLocationImpactedIncluded
                : impacted
            : impacted
    }.\n\nPRECAUTIONARY/PREPAREDNESS ACTIONS...\n\n${instructions}${
        torPossible === "POSSIBLE" && eventCode === "SVR"
            ? "\n\n" + precautions.svr.tor_possible
            : ""
    }${
        toaInEffect === "YES" && eventCode === "SVR"
            ? "\n\n" + precautions.svr.tor_possible_toa
            : ""
    }\n\n&&\n\n${
        torPossible === "POSSIBLE" && eventCode === "SVR"
            ? "TORNADO...POSSIBLE\n"
            : ""
    }${torPossible === "INDICATED" ? "TORNADO...RADAR INDICATED\n" : ""}${
        eventCode === "TOR" ? "TORNADO..." + tornado + "\n" : ""
    }${
        damageThreat && eventCode === "TOR"
            ? "DAMAGE THREAT..." + damageThreat + "\n"
            : ""
    }${
        tag && eventCode === "SVR"
            ? tag === "DESTRUCTIVE"
                ? "DAMAGE THREAT...DESTRUCTIVE\n"
                : tag === "CONSIDERABLE"
                ? "DAMAGE THREAT...CONSIDERABLE\n"
                : ""
            : ""
    }${
        eventCode === "SVR" || eventCode === "TOR"
            ? `HAIL THREAT...${hailThreat}\nMAX HAIL SIZE...${maxHailSize} IN`
            : ""
    }${
        eventCode === "SVR"
            ? `\nWIND THREAT...${windThreat}\nMAX WIND GUST...${maxWindGust} MPH\n\n`
            : ""
    }${eventCode === "FFW" ? `FLASH FLOOD...${tag}\n\n` : ""}${"$$"}\n\n${
        issuer ? issuer : ""
    }`+credit;

    const vtResult = `The National Weather Service in ${office} has issued a ${event.replace(
        "Thunderstorm",
        '<vtml_phoneme alphabet="x-cmu" ph="TH AH1 N D ER0 S T OW0 R M"></vtml_phoneme>'
    )} for, ${
        Array.isArray(counties) ? counties.join(", ") + "," : counties + ","
    } Until ${until
        .replace("PDT", "Pacific Daylight Time")
        .replace("MDT", "Mountain Daylight Time")
        .replace("CDT", "Central Daylight Time")
        .replace("EDT", "Eastern Daylight Time")}.\n\n At ${at
        .replace("PDT", "Pacific Daylight Time")
        .replace("MDT", "Mountain Daylight Time")
        .replace("CDT", "Central Daylight Time")
        .replace("EDT", "Eastern Daylight Time")}, ${description
        .replace("mph", "Miles Per Hour")
        .replace(
            "thunderstorm",
            '<vtml_phoneme alphabet="x-cmu" ph="TH AH1 N D ER0 S T OW0 R M"></vtml_phoneme>'
        )
        .replace(
            "thunderstorms",
            '<vtml_phoneme alphabet="x-cmu" ph="TH AH1 N D ER0 S T OW0 R M Z"></vtml_phoneme>'
        )}\n\nHAZARD, ${hazard.replace(
        "mph",
        "Miles Per Hour"
    )}.\n\nSOURCE, ${source}.\n\nIMPACT, ${impacts}\n\nLocations impacted include,\n${
        Array.isArray(impacted)
            ? impacted.length > 1
                ? impacted.slice(0, -1).sort().join(", ") +
                  " and " +
                  lastLocationImpactedIncluded
                : impacted
            : impacted
    }.\n\n${instructions}${
        torPossible === "POSSIBLE" ? "\n\n" + precautions.svr.tor_possible : ""
    }${
        toaInEffect === "YES" ? "\n\n" + precautions.svr.tor_possible_toa : ""
    }\n\nAVAILABLE PHONEMES TO USE...${JSON.stringify(phonemes.map((p) => p))}`+credit;

    document.getElementById(
        "generated-text-raw"
    ).innerHTML = `Generated at ${new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Chicago",
        hour: "2-digit",
        minute: "2-digit",
    })} CDT\n${rawResult}`;

    document.getElementById(
        "generated-text-vt"
    ).innerHTML = `Generated at ${new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Chicago",
        hour: "2-digit",
        minute: "2-digit",
    })} CDT\n${vtResult}`;

    return console.log(rawResult);
}
