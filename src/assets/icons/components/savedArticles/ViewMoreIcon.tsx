import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgViewMoreIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#090A0A"
      d="M11.563 12.125a.562.562 0 1 0 0-1.125.562.562 0 0 0 0 1.125M18.563 12.125a.562.562 0 1 0 0-1.125.562.562 0 0 0 0 1.125M4.563 12.125a.562.562 0 1 0 0-1.125.562.562 0 0 0 0 1.125"
    />
    <Path
      stroke="#090A0A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.563 12.125a.562.562 0 1 0 0-1.125.562.562 0 0 0 0 1.125M18.563 12.125a.562.562 0 1 0 0-1.125.562.562 0 0 0 0 1.125M4.563 12.125a.562.562 0 1 0 0-1.125.562.562 0 0 0 0 1.125"
    />
  </Svg>
);
export default SvgViewMoreIcon;
