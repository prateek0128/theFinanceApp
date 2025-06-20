import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgMarketIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.5 6c.943 0 1.414 0 1.707.293S14.5 7.057 14.5 8v8c0 .943 0 1.414-.293 1.707S13.443 18 12.5 18m0-12c-.943 0-1.414 0-1.707.293S10.5 7.057 10.5 8v8c0 .943 0 1.414.293 1.707S11.557 18 12.5 18m0-12V3m0 15v3m7-16c.943 0 1.414 0 1.707.293S21.5 6.057 21.5 7v2c0 .943 0 1.414-.293 1.707S20.443 11 19.5 11m0-6c-.943 0-1.414 0-1.707.293S17.5 6.057 17.5 7v2c0 .943 0 1.414.293 1.707S18.557 11 19.5 11m0-6V3m0 8v2m-14-3c.943 0 1.414 0 1.707.293S7.5 11.057 7.5 12v2c0 .943 0 1.414-.293 1.707S6.443 16 5.5 16m0-6c-.943 0-1.414 0-1.707.293S3.5 11.057 3.5 12v2c0 .943 0 1.414.293 1.707S4.557 16 5.5 16m0-6V8m0 8v2"
    />
  </Svg>
);
export default SvgMarketIcon;
