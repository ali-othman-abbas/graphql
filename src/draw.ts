import { degreeToRadian, polarToCartesian } from "./utils"

const SVG_NG = "http://www.w3.org/2000/svg"

type point = {
    x: number,
    y: number
}

type ArcSize = "large" | "small"
type Direction = "clockwise" | "counter-clockwise"

type ArcParams = {
    cx: number,
    cy: number
    r: number
    p1: point,
    p2: point,
    arcSize: ArcSize
    sweep: Direction
    fill: string
}

type RectParams = {
    x: number
    y: number
    width: number
    height: number
    fill: string
}


export function drawAuditRatioGraph({ up, down, upColor, downColor }: {
    up: number,
    down: number,
    upColor: string
    downColor: string
}) {
    const dim = {
        height: 100,
        width: 100,
        center: {
            x: 0,
            y: 0
        },
        r: 0,
    }
    dim.center = {
        x: dim.height / 2,
        y: dim.height / 2,
    }
    dim.r = (100 - 50) * 0.8
    
    const svg = createSvg()
    
    if (down === 0 && up === 0) {
        svg.replaceChildren(createCircle({
            cx: dim.center.x,
            cy: dim.center.y,
            fill: 'gray',
            r: dim.r
        }))
        return svg
    }
    if (down === 0) {
      svg.replaceChildren(createCircle({
          cx: dim.center.x,
          cy: dim.center.y,
          fill: upColor,
          r: dim.r
      }))
      return svg
    }
    const dTehta = (up / (up + down)) * 360
    const p1Degrees = 270
    const p2Degrees = p1Degrees + dTehta
    const p1 = polarToCartesian(dim.center.x, dim.center.y, dim.r, degreeToRadian(p1Degrees))
    const p2 = polarToCartesian(dim.center.x, dim.center.y, dim.r, degreeToRadian(p2Degrees))
    const arcSize: ArcSize = dTehta > 180 ? "large" : "small"

    svg.append(createCircle({
      cx: dim.center.x,
      cy: dim.center.y,
      r: dim.r,
      fill: downColor
    }))
    svg.append(createArc({
      cx: dim.center.x,
      cy: dim.center.y,
      r: dim.r,
      p1: p1,
      p2: p2,
      arcSize: arcSize,
      sweep: "clockwise",
      fill: upColor
    }))

    return svg
}


export function drawPassesVsFailGraph({ passes, fails, passesColor, failsColor }: {
    passes: number
    fails: number
    passesColor: string
    failsColor: string
}) {
  
    const svg = createSvg()
    const svgHeight = svg.viewBox.baseVal.height
    const svgWidth = svg.viewBox.baseVal.width
    const dim = {
        yi: 10,
        yf: svgHeight - 10,
        barWidth: 5,
        floorHeight: 2.5,
        pillerWidth: 2.5
    }

    const total = passes + fails
    const passesHeight = (dim.yf - dim.yi) * (passes / total)
    const passesBar: RectParams = {
        x: ((svgWidth / 2) / 2) - dim.barWidth / 2,
        y: dim.yf - passesHeight,
        height: passesHeight,
        width: dim.barWidth,
        fill: passesColor
    }
    const failsHeight = (dim.yf - dim.yi) * (fails / total)
    const failsBar: RectParams = {
        x: (svgWidth / 2) + (((svgWidth / 2) / 2) - dim.barWidth / 2),
        y: dim.yf - failsHeight,
        height: failsHeight,
        width: dim.barWidth,
        fill: failsColor
    }
    const baseLine: RectParams = {
        x: 0,
        y: dim.yf,
        height: dim.floorHeight,
        width: svgWidth,
        fill: 'gray'
    }
    const totalHeight = (dim.yf - dim.yi)
    const pillarLine: RectParams = {
        x: 0,
        y: dim.yi,
        height: totalHeight,
        width: dim.pillerWidth,
        fill: 'gray'
    }
    svg.append(createRectangle(baseLine))
    svg.append(createRectangle(passesBar))
    svg.append(createRectangle(failsBar))
    svg.append(createRectangle(pillarLine))
    return svg
}

function createSvg() {
  const svg = document.createElementNS(SVG_NG, "svg")
  svg.setAttribute('width', '400')
  svg.setAttribute('height', '400')
  svg.setAttribute('viewBox', `0 0 100 100`)
  return svg
}

function createArc({ cx, cy, r, p1, p2, arcSize, sweep, fill}: ArcParams)  {
  const d = [
    `M ${cx} ${cy}`,
    `L ${p1.x} ${p1.y}`,
    `A ${r} ${r} 0 ${arcSize === "large" ? 1 : 0} ${sweep === "clockwise" ? 1 : 0} ${p2.x} ${p2.y}`,
    `Z`
  ].join(' ')
  const pathEl = document.createElementNS(SVG_NG, "path")
  pathEl.setAttribute("d", d)
  pathEl.setAttribute("fill", fill)
  return pathEl
}


function createCircle({ cx, cy, r, fill }: {
    cx: number
    cy: number
    r: number
    fill: string
}) {
  const circle = document.createElementNS(SVG_NG, 'circle')
  circle.setAttribute("cx", `${cx}`)
  circle.setAttribute("cy", `${cy}`)
  circle.setAttribute("r", `${r}`)
  circle.setAttribute("fill", `${fill}`)
  return circle
}

function createRectangle({ x, y, width, height, fill }: RectParams) {
    const rect = document.createElementNS(SVG_NG, 'rect')
    rect.setAttribute('x', `${x}`)
    rect.setAttribute('y', `${y}`)
    rect.setAttribute('width', `${width}`)
    rect.setAttribute('height', `${height}`)
    rect.setAttribute('fill', `${fill}`)
    return rect
}