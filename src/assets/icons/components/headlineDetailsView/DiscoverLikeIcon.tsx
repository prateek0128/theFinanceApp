import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgDiscoverLikeIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#64748B"
      fillRule="evenodd"
      d="M18.333 10A8.333 8.333 0 0 1 6.29 17.463a1.36 1.36 0 0 0-.958-.11l-1.855.496a1.083 1.083 0 0 1-1.325-1.327l.495-1.855c.081-.322.042-.662-.111-.956A8.3 8.3 0 0 1 1.666 10a8.333 8.333 0 1 1 16.667 0M6.25 9.257c0 1.14 1.1 2.337 2.107 3.194.686.584 1.03.876 1.643.876s.957-.291 1.643-.876c1.008-.858 2.107-2.054 2.107-3.194 0-2.231-2.062-3.064-3.75-1.34-1.688-1.724-3.75-.891-3.75 1.34"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgDiscoverLikeIcon;
