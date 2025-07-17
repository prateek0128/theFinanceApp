import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgCommentsIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      stroke="#6C7072"
      d="M1.91 8.923c-.495-.644-.743-.967-.743-1.923s.248-1.278.743-1.923C2.9 3.792 4.56 2.335 7 2.335s4.1 1.458 5.09 2.743c.495.646.743.967.743 1.923s-.248 1.278-.743 1.923c-.99 1.286-2.65 2.744-5.09 2.744s-4.1-1.458-5.09-2.744Z"
    />
    <Path
      stroke="#6C7072"
      d="M8.75 7a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Z"
    />
  </Svg>
);
export default SvgCommentsIcon;
