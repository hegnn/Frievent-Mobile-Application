import { Dimensions } from "react-native";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const ScreenSize = { height, width };

export { ScreenSize };
