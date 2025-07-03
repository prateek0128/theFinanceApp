import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgUnlikeCommentIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <G clipPath="url(#unlikeCommentIcon_svg__a)">
      <Path
        fill="#4A709C"
        fillRule="evenodd"
        d="m18.736 12.766-.938-7.5a1.875 1.875 0 0 0-1.86-1.641H2.5c-.69 0-1.25.56-1.25 1.25v6.875c0 .69.56 1.25 1.25 1.25h3.364l2.952 5.905a.63.63 0 0 0 .559.345c1.726 0 3.125-1.4 3.125-3.125v-1.25h4.375a1.875 1.875 0 0 0 1.86-2.11M5.625 11.75H2.5V4.875h3.125zm11.719 1.663a.62.62 0 0 1-.469.212h-5a.625.625 0 0 0-.625.625v1.875c0 .894-.63 1.664-1.507 1.84l-2.868-5.738V4.875h9.063c.315 0 .58.234.62.547l.937 7.5a.62.62 0 0 1-.151.491"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="unlikeCommentIcon_svg__a">
        <Path fill="#fff" d="M0 .5h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgUnlikeCommentIcon;
