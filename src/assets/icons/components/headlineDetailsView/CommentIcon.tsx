import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgCommentIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m12 8-3 3m9.288-9.969a.535.535 0 0 1 .68.681l-5.924 16.93a.535.535 0 0 1-.994.04L8.831 11.44a.54.54 0 0 0-.271-.27L1.318 7.95a.535.535 0 0 1 .04-.994z"
    />
  </Svg>
);
export default SvgCommentIcon;
