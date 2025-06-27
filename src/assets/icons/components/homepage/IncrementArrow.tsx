import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgIncrementArrow = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#4CAF50"
      d="M16 3v5h-1V4.71l-6 6-3-3-5.273 5.267-.704-.704L6 6.29l3 3L14.29 4H11V3z"
    />
  </Svg>
);
export default SvgIncrementArrow;
