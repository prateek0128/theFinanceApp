import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgHeartCommentIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      stroke="#72777A"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M10 5.282c-3.75-3.895-8.333-1.02-8.333 3.032s3.35 6.211 5.801 8.145c.865.68 1.699 1.323 2.532 1.323"
    />
    <Path
      stroke="#72777A"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M10 5.282c3.75-3.895 8.333-1.02 8.333 3.032s-3.35 6.211-5.801 8.145c-.865.68-1.699 1.323-2.532 1.323"
    />
  </Svg>
);
export default SvgHeartCommentIcon;
