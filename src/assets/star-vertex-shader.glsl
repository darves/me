uniform float time;
uniform float starSpeed;
attribute vec2 starCenter;
attribute float starProximity;
void main()
{
    float effectiveTime = time * starSpeed * 2.0 * starProximity;
    vec2 calculatedCenter = vec2(mod(1.0 + (starCenter.x + effectiveTime), 2.0) - 1.0, starCenter.y);
    gl_PointSize = max(4.0 * starProximity, 0.75);
    gl_Position = vec4(calculatedCenter, 1.0 - starProximity, 1.0);
}
