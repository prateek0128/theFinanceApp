import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgHomeIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#979C9E"
      d="M20.019 9.75a.75.75 0 1 0-1.5 0zm-14 0a.75.75 0 0 0-1.5 0zm14.72 2.53a.75.75 0 1 0 1.06-1.06zm-8.47-9.53.53-.53a.75.75 0 0 0-1.06 0zm-9.53 8.47a.75.75 0 1 0 1.06 1.06zm4.53 10.28h10V20h-10zm12.75-2.75v-9h-1.5v9zm-14 0v-9h-1.5v9zm15.78-7.53-9-9-1.06 1.06 9 9zm-10.06-9-9 9 1.06 1.06 9-9zm5.53 19.28a2.75 2.75 0 0 0 2.75-2.75h-1.5c0 .69-.56 1.25-1.25 1.25zm-10-1.5c-.69 0-1.25-.56-1.25-1.25h-1.5a2.75 2.75 0 0 0 2.75 2.75z"
    />
  </Svg>
);
export default SvgHomeIcon;
