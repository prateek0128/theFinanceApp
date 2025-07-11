import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgNewsIconBlue = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#00f"
      fillRule="evenodd"
      d="M18.5 4v3h3a1 1 0 0 1 1 1v10a3 3 0 0 1-3 3h-14a3 3 0 0 1-3-3V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1m2 14a1 1 0 0 1-2 0V9h2zM6.5 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1m2 4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2h-4a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgNewsIconBlue;
