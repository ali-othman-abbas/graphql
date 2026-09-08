import { degreeToRadian, polarToCartesian } from "./utils"

const SVG_NG = "http://www.w3.org/2000/svg"
export const GREEN = '#3ddc84'
export const RED = `#ff5c5c`
const TEXT_COLOR = '#7ec4ff'
const TEXT_FONT_FAMILY = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'

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

type TextParams = {
    text: string
    x: number
    y: number
    xAlign: "middle" | undefined
    yAlign: "central" | undefined
    fontSize: number | undefined
    fontFamily: string | undefined
    fill: string | undefined
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
        yAxisTextXi: 2,
        tickCount: 6,
        yi: 10,
        yf: svgHeight - 10,
        xi: 10,
        barWidth: 5,
        floorHeight: 0.5,
        pillerWidth: 0.5,
        tickWidth: 3,
        tickHeight: 0.5,
        xAxisTextYi: 5,
        textFontSize: 3
    }

    const total = passes + fails
    const passesHeight = (dim.yf - dim.yi) * (passes / total)
    const passesBarCx = dim.xi + svgWidth / 2 / 2
    const failsBarCx = dim.xi + svgWidth / 2 + svgWidth / 2 / 2
    const passesBar: RectParams = {
        x: passesBarCx - dim.barWidth / 2,
        y: dim.yf - passesHeight,
        height: passesHeight,
        width: dim.barWidth,
        fill: passesColor
    }
    const failsHeight = (dim.yf - dim.yi) * (fails / total)
    const failsBar: RectParams = {
        x: failsBarCx - dim.barWidth / 2,
        y: dim.yf - failsHeight,
        height: failsHeight,
        width: dim.barWidth,
        fill: failsColor
    }
    const baseLine: RectParams = {
        x: dim.xi,
        y: dim.yf,
        height: dim.floorHeight,
        width: svgWidth,
        fill: 'gray'
    }
    const totalHeight = (dim.yf - dim.yi)
    const pillarLine: RectParams = {
        x: dim.xi,
        y: dim.yi,
        height: totalHeight,
        width: dim.pillerWidth,
        fill: 'gray'
    }

    const yTicks: number[] = []
    const dy = totalHeight/dim.tickCount
    for (let i = 1; i < dim.tickCount; i++) {
        yTicks.push(dim.yf - dy * i)
    }
    yTicks.push(dim.yi)
    const ticks = yTicks.map(val => {
        return createRectangle({
            fill: 'gray',
            x: dim.xi - dim.tickWidth + dim.pillerWidth,
            y: val - dim.tickHeight/2,
            height: dim.tickHeight,
            width: dim.tickWidth
        })
    })
    const textTicks = []
    const dy2 = total / dim.tickCount
    for (let i = 1; i < dim.tickCount; i++) {
        textTicks.push((dy2 * i).toFixed(1))
    }
    textTicks.push(`${total}`)
    const textSvgs = textTicks.map((val, idx) => {
        return createText({
            text: val,
            x: dim.yAxisTextXi,
            y: yTicks[idx],
            yAlign: "central",
            fontSize: dim.textFontSize,
            fontFamily: TEXT_FONT_FAMILY,
            fill: TEXT_COLOR
        } as TextParams)
    })

    
    svg.append(createRectangle(baseLine))
    svg.append(createRectangle(passesBar))
    svg.append(createRectangle(failsBar))
    svg.append(createRectangle(pillarLine))
    ticks.forEach(tick => {
        svg.append(tick)
    })
    textSvgs.forEach(textSvg => svg.append(textSvg))
    svg.append(createText({
        text: "pass",
        x: passesBarCx,
        y: svgWidth - dim.xAxisTextYi,
        xAlign: "middle",
        yAlign: "central",
        fontSize: dim.textFontSize,
        fontFamily: TEXT_FONT_FAMILY,
        fill: TEXT_COLOR
    } as TextParams))
    svg.append(createText({
        text: "fails",
        x: failsBarCx,
        y: svgWidth - dim.xAxisTextYi,
        xAlign: "middle",
        yAlign: "central",
        fontSize: dim.textFontSize,
        fontFamily: TEXT_FONT_FAMILY,
        fill: TEXT_COLOR
    } as TextParams))
    return svg
}

function createSvg() {
  const svg = document.createElementNS(SVG_NG, "svg")
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

function createText({ text, x, y, xAlign, yAlign, fontFamily, fontSize, fill }: TextParams) {
    const textSvg = document.createElementNS(SVG_NG, 'text')
    textSvg.textContent = text
    textSvg.setAttribute('x', `${x}`)
    textSvg.setAttribute('y', `${y}`)
    if (xAlign) {
      textSvg.setAttribute('text-anchor', `${xAlign}`)
    }
    if (yAlign) {
      textSvg.setAttribute('dominant-baseline', `${yAlign}`)
    }
    if (fontFamily) {
      textSvg.setAttribute('font-family', `${fontFamily}`)
    }
    if (fontSize) {
      textSvg.setAttribute('font-size', `${fontSize}`)
    }
    if (fill) {
      textSvg.setAttribute('fill', `${fill}`)
    }
    return textSvg
}