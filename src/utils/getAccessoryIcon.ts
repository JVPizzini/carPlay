import AudiobookSvg from "../assets/audiobook2.svg";
import BookSvg from "../assets/closedBook.svg";
import GameSvg from "../assets/game.svg";
import AppleSvg from "../assets/apple.svg";
import HomeSvg from "../assets/home.svg";
import OpenBookSvg from "../assets/openBook.svg";

export function getAccessoryIcon(type: string) {
  const icons = [AudiobookSvg,HomeSvg,OpenBookSvg,GameSvg];

  switch (type) {
    case "speed":
      return AudiobookSvg;
    case "acceleration":
      return BookSvg;
    case "turning_diameter":
      return GameSvg;
    case "gasoline_motor":
      return AppleSvg;
    case "exchange":
      return HomeSvg;
    case "seats":
      return OpenBookSvg;
    default:
      return icons[Math.floor(Math.random() * icons.length)];
  }
}
