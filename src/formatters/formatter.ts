import { effectReset, forgroundRGBColor } from "#/colors";
import { RGB, isInRGBRange, removeEscapeSequence } from "#/utils/color";
import { defaultRainbowStartColor } from "./formatter.const";
import { charIndexes, concatCharIndexes, linearGradientIndex, nextRGBValue } from "./formatter.util";

export const linearGradient = (message: string, start: RGB, end: RGB, ignoreSpaces = true): string => {
  message = removeEscapeSequence(message);

  const tempMessage = ignoreSpaces ? message.replaceAll(" ", "") : message;
  let newMessage: string[] = [];

  if (tempMessage.length <= 1) {
    newMessage.push(`${forgroundRGBColor(start)}${tempMessage}`);
  } else {
    for (let i = 0; i < tempMessage.length; i++) {
      if (tempMessage[i] === " ") {
        newMessage.push(tempMessage[i]);
        continue;
      }

      const color = linearGradientIndex(start, end, (i / (tempMessage.length - 1)));

      newMessage.push(`${forgroundRGBColor(color)}${tempMessage[i]}`);
    }
  }

  if (ignoreSpaces) {
    newMessage = concatCharIndexes(
      newMessage,
      charIndexes(message, " "),
      " "
    );
  }

  return `${newMessage.join("")}${effectReset.all}`;
};

export const matrix = (message: string, color: RGB, force = 100): string => {
  if (!isInRGBRange(force)) throw new Error(`Invalid force. Value must be in [0, 255]: force=\`${force}\``);

  message = removeEscapeSequence(message);

  let newMessage = "";

  for (let i = 0; i < message.length; i++) {
    const num = Math.floor(Math.random() * (force + 1)); // Random number between 0 and force
    // For each value cross-product
    const colorNuance: RGB = {
      red: Math.floor(color.red * ((255 - num) / 255)),
      green: Math.floor(color.green * ((255 - num) / 255)),
      blue: Math.floor(color.blue * ((255 - num) / 255))
    };

    newMessage += `${forgroundRGBColor(colorNuance)}${message[i]}`;
  }

  return `${newMessage}${effectReset.all}`;
};

export const rainbow = (message: string, start: RGB = defaultRainbowStartColor, step = 15, ignoreSpaces = true): string => {
  message = removeEscapeSequence(message);

  const tempMessage = ignoreSpaces ? message.replaceAll(" ", "") : message;
  let newMessage: string[] = [];
  let nextColor = start;

  for (let i = 0; i < tempMessage.length; i++) {
    if (tempMessage[i] === " ") {
      newMessage.push(tempMessage[i]);
    } else {
      newMessage.push(`${forgroundRGBColor(nextColor)}${tempMessage[i]}`);
    }

    nextColor = nextRGBValue(nextColor, step);
  }

  if (ignoreSpaces) {
    newMessage = concatCharIndexes(
      newMessage,
      charIndexes(message, " "),
      " "
    );
  }

  return `${newMessage.join("")}${effectReset.all}`;
};