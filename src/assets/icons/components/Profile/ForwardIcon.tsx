import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgForwardIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#303437"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9 18 6-6-6-6"
    />
  </Svg>
);
export default SvgForwardIcon;
