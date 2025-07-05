import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgAppleIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#appleIcon_svg__a)">
      <Path
        fill="#000"
        d="M19.374 8.188c-1.64.988-2.651 2.683-2.651 4.565A5.25 5.25 0 0 0 20 17.6a12.5 12.5 0 0 1-1.687 3.388c-1.06 1.46-2.168 2.965-3.807 2.965s-2.12-.941-4.048-.941c-1.88 0-2.554.988-4.097.988-1.542 0-2.602-1.365-3.807-3.059C.964 18.588.048 15.86 0 12.988 0 8.33 3.084 5.835 6.169 5.835c1.638 0 2.988 1.036 4 1.036.963 0 2.506-1.083 4.337-1.083 1.928-.047 3.76.847 4.868 2.4m-5.735-4.376c.819-.941 1.253-2.118 1.3-3.341 0-.142 0-.33-.047-.471a5.59 5.59 0 0 0-3.615 1.835 5.07 5.07 0 0 0-1.35 3.247c0 .142 0 .283.049.424.096 0 .24.047.337.047 1.301-.094 2.506-.753 3.326-1.741"
      />
    </G>
    <Defs>
      <ClipPath id="appleIcon_svg__a">
        <Path fill="#fff" d="M0 0h20v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgAppleIcon;
