import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgLikeCommentIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <G clipPath="url(#likeCommentIcon_svg__a)">
      <Path
        fill="#4A709C"
        fillRule="evenodd"
        d="M18.281 6.76a1.88 1.88 0 0 0-1.406-.635H12.5v-1.25c0-1.726-1.4-3.125-3.125-3.125a.63.63 0 0 0-.56.345L5.866 8H2.5c-.69 0-1.25.56-1.25 1.25v6.875c0 .69.56 1.25 1.25 1.25h13.438c.945 0 1.742-.703 1.86-1.64l.938-7.5a1.88 1.88 0 0 0-.455-1.476M2.5 9.25h3.125v6.875H2.5zm14.995-1.172-.937 7.5a.625.625 0 0 1-.62.547H6.874V8.773l2.868-5.737a1.875 1.875 0 0 1 1.507 1.839V6.75c0 .345.28.625.625.625h5a.625.625 0 0 1 .62.703"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="likeCommentIcon_svg__a">
        <Path fill="#fff" d="M0 .5h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgLikeCommentIcon;
