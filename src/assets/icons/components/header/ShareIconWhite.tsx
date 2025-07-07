import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgShareIconWhite = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeWidth={1.5}
      d="M9 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M14 6.5 9 10m5 7.5L9 14"
    />
    <Path
      stroke="#fff"
      strokeWidth={1.5}
      d="M19 18.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-13a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
    />
  </Svg>
);
export default SvgShareIconWhite;
