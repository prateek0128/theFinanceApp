import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgBookmarkIconFilled = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M18 9.098v4.993c0 3.096 0 4.645-.734 5.321-.35.323-.792.526-1.263.58-.987.113-2.14-.907-4.445-2.946-1.02-.901-1.529-1.352-2.118-1.47-.29-.06-.59-.06-.88 0-.59.118-1.099.569-2.118 1.47-2.305 2.039-3.458 3.059-4.445 2.945a2.24 2.24 0 0 1-1.263-.579C0 18.736 0 17.188 0 14.091V9.097C0 4.81 0 2.666 1.318 1.333S4.758 0 9 0s6.364 0 7.682 1.332S18 4.81 18 9.098M5.25 4A.75.75 0 0 1 6 3.25h6a.75.75 0 1 1 0 1.5H6A.75.75 0 0 1 5.25 4"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgBookmarkIconFilled;
