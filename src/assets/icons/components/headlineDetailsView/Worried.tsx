import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgWorried = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={23}
    fill="none"
    {...props}
  >
    <Path fill="#fff" d="M0 22.239h22v-22H0z" />
  </Svg>
);
export default SvgWorried;
