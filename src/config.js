export function Add2NewLines() {
    return "\n\n";
}
export function AddNewLine() {
    return "\n";
}

export function SetTime(date, minutes, hours) {
    date.setMinutes(date.getMinutes() + minutes);
    date.setHours(date.getHours() + hours);

    if (date < Date.now())
        return console.log(
            "A warning expire time cannot be below the issuance time."
        );
    return date;
}

export function GetTorTag(hazard) {
    let tornado;
    let tag;

    function findTerm(term) {
        if (hazard.includes(term)) return hazard;
    }

    switch (hazard) {
        case findTerm(hazards.tor.normal):
            tag = "INDICATED";
            break;
        case findTerm(hazards.tor.confirmed):
            tag = "OBSERVED";
            break;
        case findTerm(hazards.tor.pds):
            tornado = "OBSERVED";
            tag = "CONSIDERABLE";
            break;
        case findTerm(hazards.tor.emergency):
            tornado = "OBSERVED";
            tag = "CATASTROPHIC";
            break;
        default:
            tornado = null;
            tag = "POSSIBLE";
            break;
    }

    return { tornado: tornado, tag: tag };
}

export function GetMaxHailSize(hazard) {
    let size;
    let tag;

    function findTerm(term) {
        if (hazard.includes(term)) return hazard;
    }

    switch (hazard) {
        case findTerm(hazards.svr.hail.quarter):
            size = "1.00";
            break;
        case findTerm(hazards.svr.hail.half_dollar):
            size = "1.25";
            break;
        case findTerm(hazards.svr.hail.ping_pong):
            size = "1.50";
            break;
        case findTerm(hazards.svr.hail.golf_ball):
            size = "1.75";
            tag = "CONSIDERABLE";
            if (
                findTerm(hazards.svr.wind.eighty) ||
                findTerm(hazards.svr.wind.ninety) ||
                findTerm(hazards.svr.wind.hundred)
            )
                tag = "DESTRUCTIVE";
            break;
        case findTerm(hazards.svr.hail.two_inch):
            size = "2.00";
            tag = "CONSIDERABLE";
            if (
                findTerm(hazards.svr.wind.eighty) ||
                findTerm(hazards.svr.wind.ninety) ||
                findTerm(hazards.svr.wind.hundred)
            )
                tag = "DESTRUCTIVE";
            break;
        case findTerm(hazards.svr.hail.tennis_ball):
            size = "2.50";
            tag = "CONSIDERABLE";
            if (
                findTerm(hazards.svr.wind.eighty) ||
                findTerm(hazards.svr.wind.ninety) ||
                findTerm(hazards.svr.wind.hundred)
            )
                tag = "DESTRUCTIVE";
            break;
        case findTerm(hazards.svr.hail.baseball):
            size = "2.75";
            tag = "DESTRUCTIVE";
            break;
        case findTerm(hazards.svr.hail.three_inch):
            size = "3.00";
            tag = "DESTRUCTIVE";
            break;
        case findTerm(hazards.svr.hail.softball):
            size = "3.50";
            tag = "DESTRUCTIVE";
            break;
        case findTerm(hazards.svr.hail.grapefruit):
            size = "4.00";
            tag = "DESTRUCTIVE";
            break;
        default:
            size = "1.00";
            break;
    }

    return { size: size, tag: tag };
}

export function GetMaxWindGust(hazard) {
    let gust;
    let tag;

    function findTerm(term) {
        if (hazard.includes(term)) return hazard;
    }

    switch (hazard) {
        case findTerm(hazards.svr.wind.sixty):
            gust = "60";
            break;
        case findTerm(hazards.svr.wind.seventy):
            gust = "70";
            tag = "CONSIDERABLE";
            if (
                findTerm(hazards.svr.hail.baseball) ||
                findTerm(hazards.svr.hail.three_inch) ||
                findTerm(hazards.svr.hail.softball) ||
                findTerm(hazards.svr.hail.grapefruit)
            )
                tag = "DESTRUCTIVE";
            break;
        case findTerm(hazards.svr.wind.eighty):
            gust = "80";
            tag = "DESTRUCTIVE";
            break;
        case findTerm(hazards.svr.wind.ninety):
            gust = "90";
            tag = "DESTRUCTIVE";
            break;
        case findTerm(hazards.svr.wind.hundred):
            gust = "100";
            tag = "DESTRUCTIVE";
            break;
        default:
            gust = "60";
            break;
    }

    return { gust: gust, tag: tag };
}

export const hazards = {
    tor: {
        normal: "tornado",
        confirmed: "damaging tornado",
        pds: "damaging tornado",
        emergency: "deadly tornado",
        hail: {
            quarter: "quarter size hail",
            half_dollar: "half dollar size hail",
            ping_pong: "ping pong ball size hail",
            golf_ball: "Golf ball size hail",
            two_inch: "two inch hail",
            tennis_ball: "tennis ball size hail",
            baseball: "baseball size hail",
            three_inch: "three inch hail",
            grapefruit: "grapefruit size hail",
        },
    },
    svr: {
        wind: {
            sixty: "60 mph wind gusts",
            seventy: "70 mph wind gusts",
            eighty: "80 mph wind gusts",
            ninety: "90 mph wind gusts",
            hundred: "100 mph wind gusts",
        },
        hail: {
            quarter: "quarter size hail",
            half_dollar: "half dollar size hail",
            ping_pong: "ping pong ball size hail",
            golf_ball: "golf ball size hail",
            two_inch: "two inch hail",
            tennis_ball: "tennis ball size hail",
            baseball: "baseball size hail",
            three_inch: "three inch hail",
            softball: "softball size hail",
            grapefruit: "grapefruit size hail",
        },
    },
    ffw: {
        normal: "Flash flooding caused by thunderstorms",
        pds: "Life threatening flash flooding. Heavy rain producing flash flooding",
    },
};

export const sources = {
    tor: {
        radar: "radar indicated rotation",
        confirmed: {
            radar: "radar confirmed tornado",
            public: "public confirmed tornado",
            ema: "emergency management confirmed tornado",
            law: "law enforcement confirmed tornado",
            chasers: "storm spotters confirmed tornado",
            broadcast: "broadcast media confirmed tornado",
        },
    },
    svr: {
        radar: "radar indicated",
        spotters: "trained weather spotters",
        broadcast: "broadcast media",
        ema: "emergency management",
        public: "public",
        law: "law enforcement",
    },
    ffw: {
        default: "radar",
        law: "law enforcement reported",
        ema: "emergency management reported",
        public: "public reported",
        spotters: "weather spotters reported",
        broadcast: "broadcast media reported",
    },
};

export const impacts = {
    tor: {
        normal: "flying debris will be dangeous to those caught without shelter. Mobile homes will be damaged or destoryed. Damage to roofs, windows, and vehicles will occur. Tree damage is likely",
        pds: "YOU ARE IN A LIFE-THREATENING SITUATION. Flying debris may be deadly to those caught without shelter. Mobile homes will be destroyed. Considerable damage to homes, buisnesses, and vehicles is likely and compelete destruction is possible",
    },
    svr: {
        wind: {
            sixty: "Expect wind damage to roofs, siding, and trees.",
            seventy:
                "Expect considerable tree damage. Damage is likely to mobile homes, roofs, and outbuildings.",
            eighty: "Flying debris will be dangerous to those caught without shelter. Mobile homes will be heavily damaged. Expect considerable damage to roofs, windows, and vehicles. Extensive tree damage and power outages are likely.",
            ninety: "You are in a life-threatening situation. Flying debris may be deadly to those caught without shelter. Mobile homes will be heavily damaged or destroyed. Homes and businesses will have substantial roof and window damage. Expect extensive tree damage and power outages.",
            hundred:
                "You are in a life-threatening situation. Flying debris may be deadly to those caught without shelter. Mobile homes will be destroyed. Expect considerable damage to homes and businesses. Expect extensive tree damage and power outages.",
        },
        hail: {
            quarter: "Hail damage to vehicles is expected.",
            half_dollar: "Hail damage to vehicles is expected.",
            ping_pong:
                "People and animals outdoors will be injured. Expect hail damage to roofs, siding, windows, and vehicles.",
            golf_ball:
                "People and animals outdoors will be injured. Expect hail damage to roofs, siding, windows, and vehicles.",
            two_inch:
                "People and animals outdoors will be injured. Expect hail damage to roofs, siding, windows, and vehicles.",
            tennis_ball:
                "People and animals outdoors will be injured. Expect hail damage to roofs, siding, windows, and vehicles.",
            baseball:
                "People and animals outdoors will be severely injured. Expect shattered windows, extensive damage to roofs, siding, and vehicles.",
            three_inch:
                "People and animals outdoors will be severely injured. Expect shattered windows, extensive damage to roofs, siding, and vehicles.",
            softball:
                "People and animals outdoors will be severely injured. Expect shattered windows, extensive damage to roofs, siding, and vehicles.",
            grapefruit:
                "People and animals outdoors will be severely injured. Expect shattered windows, extensive damage to roofs, siding, and vehicles.",
        },
    },
    ffw: {
        normal: "Flash flooding of small creeks and streams, urban areas, highways, streets and underpasses as well as other poor drainage and low-lying areas.",
        pds: "This is a PARTICULARLY DANGEROUS SITUATION. SEEK HIGHER GROUND NOW! Life threatening flash flooding of low water crossings, small creeks and streams, urban areas, highways, streets and underpasses.",
    },
};

export const precautions = {
    tor: {
        normal: "TAKE COVER NOW! Move to a basement or an interior room on the lowest floor of a sturdy building. Avoid windows. If you are outdoors, in a mobile home, or in a vehicle, move to the closest substantial shelter and protect yourself from flying debris.",
        pds: "To repeat, a large, extremely dangerous and potentially deadly tornado is on the ground. To protect your life, TAKE COVER NOW! Move to an interior room on the lowest floor of a sturdy building. Avoid windows. If in a mobile home, a vehicle or outdoors, move to the closest substantial shelter and protect yourself from flying debris.",
    },
    svr: {
        default:
            "For your protection move to an interior room on the lowest floor of a building.",
        pds_one: "This is a very dangerous storm.",
        pds_two: "These are very dangerous storms.",
        tor_possible:
            "Remain alert for a possible tornado! Tornadoes can develop quickly from severe thunderstorms. If you spot a tornado go at once into the basement or small central room in a sturdy structure.",
        tor_possible_toa:
            "A Tornado Watch remains in effect for the warned area. Tornadoes can develop quickly from severe thunderstorms. Although a tornado is not immediately likely, if one is spotted, act quickly and move to a place of safety inside a sturdy structure such as a basement or small interior room.",
        large_hail:
            "This storm is producing large hail. SEEK SHELTER NOW inside a sturdy structure and stay away from windows!",
        large_hail_wind:
            "Prepare immediately for large hail and damaging winds. People outside should move immediately to shelter inside a strong building. Stay away from windows.",
        large_hailLine:
            "These storms are producing large hail. SEEK SHELTER NOW inside a sturdy structure and stay away from windows!",
        large_hail_windLine: "text",
        dangerous_line:
            "These are dangerous storms. Prepare immediately for large destructive hail capable of producing significant damage. People outside should move to shelter inside a strong building,  and stay away from windows.",
        dangerous_storm:
            "This is a dangerous storm. Prepare immediately for large destructive hail capable of producing significant damage. People outside should move to shelter inside a strong building,  and stay away from windows.",
        destructive_wind_hailLine:
            "These storms are producing destructive winds and large damaging hail. SEEK SHELTER NOW inside a sturdy structure and stay away from windows!",
        destructive_wind_hail:
            "This storm is producing destructive winds and large damaging hail. SEEK SHELTER NOW inside a sturdy structure and stay away from windows!",
        extremely_dangerousLine:
            "This is an EXTREMELY DANGEROUS SITUATION with tornado like wind speeds expected. Mobile homes and high profile vehicles are especially susceptible to winds of this magnitude and may be overturned. For your protection move to an interior room on the lowest floor of a building. These storms have the potential to cause serious injury and significant property damage.",
        extremely_dangerous:
            "This is an EXTREMELY DANGEROUS SITUATION with tornado like wind speeds expected. Mobile homes and high profile vehicles are especially susceptible to winds of this magnitude and may be overturned. For your protection move to an interior room on the lowest floor of a building. This storm has the potential to cause serious injury and significant property damage.",
        deadly_storms:
            "These are potentially deadly storms. Seek shelter in an interior room on the lowest floor of a well-built structure. Abandon vehicles in search of a more substantial permanent structure. Stay away from windows.",
        deadly_storm:
            "This is a potentially deadly storm. Seek shelter in an interior room on the lowest floor of a well-built structure. Abandon vehicles in search of a more substantial permanent structure. Stay away from windows.",
        gust_frontLine:
            "Wind damage with these storms will occur before any rain or lightning. Do not wait for the sound of thunder before taking cover. SEEK SHELTER IMMEDIATELY inside a sturdy structure and stay away from windows.",
        gust_front:
            "Wind damage with this storm will occur before any rain or lightning. Do not wait for the sound of thunder before taking cover. SEEK SHELTER IMMEDIATELY inside a sturdy structure and stay away from windows.",
        squall_line:
            "Intense thunderstorm lines can produce brief tornadoes and widespread significant wind damage. Although a tornado is not immediately likely, it is best to move to an interior room on the lowest floor of a building. These storms may cause serious injury and significant property damage.",
        wind_driven_hailLine:
            "These are dangerous storms, producing large hail driven by severe winds! SEEK SHELTER NOW inside a sturdy structure and stay away from windows! If you are caught outdoors, cover your head and neck",
        wind_driven_hail:
            "This is a dangerous storm, producing large hail driven by severe winds! SEEK SHELTER NOW inside a sturdy structure and stay away from windows! If you are caught outdoors, cover your head and neck",
        supercellLine:
            "These thunderstorms are capable of producing all types of severe weather including extremely large hail, destructive straight line winds and tornadoes. Move quickly to a safe shelter such as an interior room, a bathroom, closet or basement.",
        supercell:
            "This thunderstorm is capable of producing all types of severe weather including extremely large hail, destructive straight line winds and tornadoes. Move quickly to a safe shelter such as an interior room, a bathroom, closet or basement.",
        lightningLine:
            "Large hail and damaging winds and continuous cloud to ground lightning is occurring with these storms. Move indoors immediately. Lightning is one of nature's leading killers. Remember, if you can hear thunder, you are close enough to be struck by lightning.",
        lightning:
            "Large hail and damaging winds and continuous cloud to ground lightning is occurring with this storm. Move indoors immediately. Lightning is one of nature's leading killers. Remember, if you can hear thunder, you are close enough to be struck by lightning.",
        torrential_rainfallLine:
            "Torrential rainfall is occurring with these storms, and may lead to flash flooding. Do not drive your vehicle through flooded roadways.",
        torrential_rainfall:
            "Torrential rainfall is occurring with this storm, and may lead to flash flooding. Do not drive your vehicle through flooded roadways.",
        boaters:
            "If on or near !**NAME OF LAKE**!, get away from the water and move indoors or inside a vehicle. Remember, lightning can strike out to 15 miles from the parent thunderstorm. If you can hear thunder, you are close enough to be struck by lightning. Move to safe shelter now!  Do not be caught on the water in a thunderstorm.",
        law_enforcement:
            "To report severe weather, contact your nearest law enforcement agency. They will send your report to the National Weather Service office in OFFICE.",
    },
    ffw: {
        default:
            "Turn around, don't drown when encountering flooded roads. Most flood deaths occur in vehicles.",
        pds: "Move to higher ground now! This is an extremely dangerous and life-threatening situation. Do not attempt to travel unless you are fleeing an area subject to flooding or under an evacuation order.",
    },
};
