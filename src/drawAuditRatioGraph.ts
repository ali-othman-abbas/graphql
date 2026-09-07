import { createSvg } from "./draw";
import { degreeToRadian, polarToCartesian } from "./utils";

function drawAuditRatioGraph(up: number, down: number) {
    const dTehta = (up / (up + down)) * degreeToRadian(360);
    const p1Theta = degreeToRadian(90);
    const p2Theta = p1Theta - dTehta;
    const p1 = polarToCartesian(dim.center.x, dim.center.y, dim.r, p1Theta);
    const p2 = polarToCartesian(dim.center.x, dim.center.y, dim.r, p2Theta);
    const bigArc = dTehta > 180 ? 1 : 0;

    const svg = createSvg({ height: 100, width: 100 });
}
