import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgMyIntrestIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke="#303437"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6M4 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6M11 11h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM1 1h6v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"
    />
  </Svg>
);
export default SvgMyIntrestIcon;
