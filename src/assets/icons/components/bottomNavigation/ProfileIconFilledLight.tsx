import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgProfileIconFilledLight = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#6B4EFF"
      stroke="#6B4EFF"
      d="M12 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7ZM12 13.5c2.14 0 4.051.49 5.411 1.254 1.376.774 2.089 1.764 2.089 2.746 0 1.286-.027 2.151-.815 2.794-.414.337-1.078.643-2.16.862-1.08.219-2.542.344-4.525.344s-3.446-.125-4.525-.344c-1.082-.219-1.746-.525-2.16-.862-.788-.643-.815-1.508-.815-2.794 0-.982.713-1.972 2.089-2.746C7.949 13.989 9.86 13.5 12 13.5Z"
    />
  </Svg>
);
export default SvgProfileIconFilledLight;
