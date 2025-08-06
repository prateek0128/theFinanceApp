import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgSavedIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#979C9E"
      strokeWidth={1.5}
      d="M21.5 16.09v-4.992c0-4.29 0-6.433-1.318-7.766C18.864 2 16.742 2 12.5 2S6.136 2 4.818 3.332 3.5 6.81 3.5 11.098v4.993c0 3.096 0 4.645.734 5.321.35.323.792.526 1.263.58.987.113 2.14-.907 4.445-2.946 1.02-.901 1.529-1.352 2.118-1.47.29-.06.59-.06.88 0 .59.118 1.099.569 2.118 1.47 2.305 2.039 3.458 3.059 4.445 2.945.47-.053.913-.256 1.263-.579.734-.676.734-2.225.734-5.322Z"
    />
    <Path
      stroke="#979C9E"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M15.5 6h-6"
    />
  </Svg>
);
export default SvgSavedIcon;
