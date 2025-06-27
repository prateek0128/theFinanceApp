import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgNewsIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.5 4v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8h-4"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.5 4h14v14a2 2 0 0 0 2 2m-6-12h-6m6 4h-4"
    />
  </Svg>
);
export default SvgNewsIcon;
