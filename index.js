//Vowels
const shoroborno = {
  অ: "o",
  আ: "a",
  ই: "i",
  ঈ: "i",
  উ: "u",
  ঊ: "u",
  ঋ: "ri",
  এ: "e",
  ঐ: "oi",
  ও: "o",
  ঔ: "ou"
};
//Consonants
const byanjonborno = {
  ক: "k",
  খ: "kh",
  গ: "g",
  ঘ: "gh",
  ঙ: "ng",
  চ: "ch",
  ছ: "ch",
  জ: "j",
  ঝ: "jh",
  ঞ: "n",
  ট: "t",
  ঠ: "th",
  ড: "d",
  ঢ: "dh",
  ড়: "r",
  ঢ়: "r",
  ণ: "n",
  ত: "t",
  থ: "th",
  দ: "d",
  ধ: "dh",
  ন: "n",
  প: "p",
  ফ: "f",
  ব: "b",
  ভ: "v",
  ম: "m",
  য: "j",
  য়: "y",
  র: "r",
  ল: "l",
  শ: "sh",
  ষ: "sh",
  স: "sh",
  হ: "h",
  "ং": "ng",
  ৎ: "t"
};

const joiners = {
  "া": "a",
  "ি": "i",
  "ী": "i",
  "ে": "e",
  "ৈ": "oi",
  "ো": "o",
  "ৌ": "ou",
  "ৃ": "ri",
  "ু": "u",
  "ূ": "u",
  "্": "",
  "ঃ": "",
  "ঁ": "",
  "‍্য": "ya",
  "।": "." //It's a punctuation but I found it convenient to place it here.
};
const numbers = {
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
  "০": "0"
};
function charType(char) {
  if (Object.keys(shoroborno).includes(char)) {
    return "shoroborno";
  } else if (Object.keys(byanjonborno).includes(char)) {
    return "byanjonborno";
  } else if (Object.keys(joiners).includes(char)) {
    return ["া", "ি", "ী", "ে", "ৈ", "ো", "ৌ", "ৃ", "ু", "ূ"].includes(char)
      ? "kaar-joiner"
      : "joiner";
  } else if (Object.keys(numbers).includes(char)) {
    return "numbers";
  } else {
    return false;
  }
}
function muradTakla(string) {
  let banglaArray = string.split("");
  let taklaArray = [];
  banglaArray.forEach((char, index) => {
    switch (charType(char)) {
      case "shoroborno":
        taklaArray.push(shoroborno[char]);
        break;

      case "byanjonborno":
        let charVal = ["", "", ""];
        if (
          charType(char) === "byanjonborno" &&
          charType(banglaArray[index + 1]) === "byanjonborno" &&
          char !== "য়"
        ) {
          charVal[1] = byanjonborno[char];
          charVal[2] = "o";
        } else {
          charVal[1] = byanjonborno[char];
        }
        if (char === "স" && banglaArray[index + 1] === "্") {
          charVal[1] = "s";
        }
        if (
          (char === "য" && banglaArray[index - 1] === "্") ||
          char === "‍্য"
        ) {
          charVal[1] =
            banglaArray[index + 1] &&
            (charType(banglaArray[index + 1]) !== false ||
              charType(banglaArray[index + 1]) !== "joiner")
              ? "y"
              : "jy";
        }
        if (
          index !== 0 &&
          Object.keys(byanjonborno).includes(char) &&
          !["দ"].includes(char) &&
          charType(banglaArray[index + 1]) === "byanjonborno" &&
          charType(banglaArray[index + 2]) === "kaar-joiner" &&
          banglaArray[index - 1] !== "্"
        ) {
          charVal[2] = "";
        }
        if (
          banglaArray.length === 2 &&
          index === 1 &&
          charType(banglaArray[0]) === "byanjonborno" &&
          charType(banglaArray[1]) === "byanjonborno"
        ) {
          charVal[2] = "o";
        }
        if (
          (index === banglaArray.length - 1 &&
            banglaArray[index - 1] === "্") ||
          (index === banglaArray.length - 2 &&
            banglaArray[index - 1] === "্" &&
            (charType(banglaArray[index + 1]) === false ||
              banglaArray[index + 1] === "।"))
        ) {
          charVal[2] = "o";
        }

        if (
          char === "ষ" &&
          banglaArray[index - 1] === "্" &&
          banglaArray[index - 2] === "ক"
        ) {
          charVal[1] = "kh";
        }

        taklaArray.push(charVal.join(""));
        break;
      case "kaar-joiner":
        taklaArray.push(joiners[char]);
        break;
      case "joiner":
        taklaArray.push(joiners[char]);
        break;
      case "numbers":
        taklaArray.push(numbers[char]);
        break;
      default:
        taklaArray.push(char);
    }
  });

  return taklaArray.join("");
}
module.exports = function muradTaklaSentence(string) {
  const banglaWords = string.split(" ");
  const taklaWords = banglaWords.map(tWord => muradTakla(tWord));
  return taklaWords.join(" ");
};
