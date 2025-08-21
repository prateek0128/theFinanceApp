import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgCommentIconLight = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke="#6B4EFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14 10.7-3 3m9.288-9.97a.535.535 0 0 1 .68.681l-5.924 16.93a.534.534 0 0 1-.994.04l-3.219-7.242a.54.54 0 0 0-.271-.27l-7.242-3.22a.535.535 0 0 1 .04-.994z"
    />
  </Svg>
);
export default SvgCommentIconLight;
