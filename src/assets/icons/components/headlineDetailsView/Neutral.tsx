import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgNeutral = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}
  >
    <Path fill="#fff" d="M.333 22.239h22v-22h-22z" />
  </Svg>
);
export default SvgNeutral;
