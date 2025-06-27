import React from "react";
import { Svg, Defs, Rect, ClipPath, G } from "react-native-svg";

type ClippedSVGProps = {
  width: number;
  height: number;
  radius: number;
  ImageComponent?: React.ComponentType<{ width?: number; height?: number }>;
};

const ClippedSVG: React.FC<ClippedSVGProps> = ({
  width,
  height,
  radius,
  ImageComponent,
}) => {
  return (
    <Svg width={width} height={height}>
      <Defs>
        <ClipPath id="clip">
          <Rect
            x="0"
            y="0"
            width={width}
            height={height}
            rx={radius}
            ry={radius}
          />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip)">
        {ImageComponent && <ImageComponent width={width} height={height} />}
      </G>
    </Svg>
  );
};

export default ClippedSVG;
