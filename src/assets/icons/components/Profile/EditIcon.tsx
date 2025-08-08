import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgEditIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#303437"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 19v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8"
    />
  </Svg>
);
export default SvgEditIcon;
