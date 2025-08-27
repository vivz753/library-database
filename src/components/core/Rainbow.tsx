import "./Arc"
import Arc from "./Arc"

const Rainbow: React.FC = (props) => {
  const pathLength = 314

  const height = 50

  const viewBox = "25 40 250 100"
  const center = 150
  const r = 100
  const lArcAngle = 270
  const rArcAngle = 90

  return (
    <div className="flex h-auto w-auto justify-center">
      <style>
        {`
          .animate {
            stroke-dasharray: ${pathLength};
            animation: strokeDash 2s infinite alternate ease;
          }

          @keyframes strokeDash {
            to {
                stroke-dashoffset: ${pathLength};
            }
          }
        `}
      </style>
			<div className="relative">
        <div className="">
          <Arc
            viewBox={viewBox}
            height={height}
            x={center}
            y={center}
            radius={r}
            startAngle={lArcAngle}
            endAngle={rArcAngle}
            css={{ stroke: `#FF1B8D` }}
            className="animate"
          />
        </div>
        <div className="absolute bottom-0">
          <Arc
            viewBox={viewBox}
            height={height}
            x={center}
            y={center}
            radius={r - 20}
            startAngle={lArcAngle}
            endAngle={rArcAngle}
            css={{ stroke: `#FFDA00` }}
            className="animate"
          />
        </div>
        <div className="absolute bottom-0">
          <Arc
            viewBox={viewBox}
            height={height}
            x={center}
            y={center}
            radius={r - 40}
            startAngle={lArcAngle}
            endAngle={rArcAngle}
            css={{ stroke: `#1BB3FF` }}
            className="animate"
          />
        </div>
      </div>
    </div>
  )
}

export default Rainbow
