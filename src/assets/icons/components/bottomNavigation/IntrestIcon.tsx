import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgIntrestIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6M7 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6M14 14h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 4h6v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"
    />
  </Svg>
);
export default SvgIntrestIcon;
