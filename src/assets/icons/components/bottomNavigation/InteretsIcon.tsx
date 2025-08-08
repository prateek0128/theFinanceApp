import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgInteretsIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#979C9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6M7.5 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6M14.5 14h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4.5 4h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"
    />
  </Svg>
);
export default SvgInteretsIcon;
