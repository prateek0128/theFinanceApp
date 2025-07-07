import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgHomeIconFilledWhite = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M13.207 2.293a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 1 0 1.414 1.414l.293-.293V19a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-6.586l.293.293a1 1 0 0 0 1.414-1.414z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgHomeIconFilledWhite;
