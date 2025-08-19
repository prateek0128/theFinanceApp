import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const SvgBackArrowDetailsLight = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G
      stroke="#404446"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#backArrowDetailsLight_svg__a)"
    >
      <Path d="M16.875 10H3.125M8.75 4.375 3.125 10l5.625 5.625" />
    </G>
    <Defs>
      <ClipPath id="backArrowDetailsLight_svg__a">
        <Rect width={20} height={20} fill="#fff" rx={10} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgBackArrowDetailsLight;
