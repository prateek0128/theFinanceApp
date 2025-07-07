import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgBookmarkIconWhite = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      d="M19 15.09v-4.992c0-4.29 0-6.433-1.318-7.766C16.364 1 14.242 1 10 1S3.636 1 2.318 2.332 1 5.81 1 10.098v4.993c0 3.096 0 4.645.734 5.321.35.323.792.526 1.263.58.987.113 2.14-.907 4.445-2.946 1.02-.901 1.529-1.352 2.118-1.47.29-.06.59-.06.88 0 .59.118 1.099.569 2.118 1.47 2.305 2.039 3.458 3.059 4.445 2.945.47-.053.913-.256 1.263-.579.734-.676.734-2.225.734-5.322Z"
    />
  </Svg>
);
export default SvgBookmarkIconWhite;
