precision mediump float;
uniform float red;
uniform float green;

void main()
{
    gl_FragColor = vec4(0.3588, 0.7044 + green + red, 0.1368, 1.0);
}
