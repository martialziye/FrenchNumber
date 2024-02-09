function convertNumberToFrench(number) {
    const units = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
    const exceptions = {
        71: "soixante-et-onze",
        81: "quatre-vingt-un",
        91: "quatre-vingt-onze"
    };

    if (number < 17) {
        return units[number];
    } else if (exceptions[number]) {
        return exceptions[number];
    }

    if (number < 100) {
        return handleTensAndBelow(number);
    } else if (number < 1000) {
        return handleHundreds(number);
    } else {
        return handleThousandsAndBeyond(number);
    }
}

function handleTensAndBelow(number) {
    const tens = ["dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];
    let tenBase = Math.floor(number / 10);
    let remainder = number % 10;
    let result = "";

    if (number < 17) {
        return tens[number - 10];
    } else if (number < 70 || (number >= 80 && number < 100)) {
        result = tens[tenBase - 1];
        if (remainder > 0) {
            result += remainder === 1 && number != 71 ? "-et-un" : "-" + convertNumberToFrench(remainder);
        }
    } else if (number >= 70 && number < 80) {
        result = "soixante-" + convertNumberToFrench(number - 60);
    } else if (number >= 90) {
        result = "quatre-vingt-" + convertNumberToFrench(number - 80);
    }

    return result;
}

function handleHundreds(number) {
    let hundredBase = Math.floor(number / 100);
    let remainder = number % 100;
    let result = hundredBase > 1 ? convertNumberToFrench(hundredBase) + "-cent" : "cent";

    if (remainder > 0) {
        result += "-" + convertNumberToFrench(remainder);
    } else if (hundredBase > 1) {
        result += "s"; // For plural
    }

    return result;
}

function handleThousandsAndBeyond(number) {
    let thousandBase = Math.floor(number / 1000);
    let remainder = number % 1000;
    let result = thousandBase > 1 ? convertNumberToFrench(thousandBase) + "-mille" : "mille";

    if (remainder > 0) {
        result += "-" + convertNumberToFrench(remainder);
    } else if (thousandBase > 1) {
        result += "s"; // For plural
    }

    return result;
}

// code test
const numbers = [0, 1, 5, 10, 11, 15, 20, 21, 30, 35, 50, 51, 68, 70, 75, 99, 100, 101, 105, 111, 123, 168, 171, 175, 199, 200, 201, 555, 999, 1000, 1001, 1111, 1199, 1234, 1999, 2000, 2001, 2020, 2021, 2345, 9999, 10000, 11111, 12345, 123456, 654321, 999999];
const frenchNumbers = numbers.map(convertNumberToFrench);
console.log(frenchNumbers);
