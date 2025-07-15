import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgBackArrow = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#090A0A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="m15 18-6-6 6-6"
    />
  </Svg>
);
export default SvgBackArrow;
