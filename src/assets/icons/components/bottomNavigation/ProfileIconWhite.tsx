import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgProfileIconWhite = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeWidth={1.5}
      d="M12.5 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20.5 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5 3.582-4.5 8-4.5 8 2.015 8 4.5Z"
    />
  </Svg>
);
export default SvgProfileIconWhite;
