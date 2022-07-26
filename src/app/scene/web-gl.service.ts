import { Injectable } from '@angular/core';

// @ts-ignore
import startVertexShader from '../../assets/star-vertex-shader.glsl';
// @ts-ignore
import startFragmentShader from '../../assets/star-fragment-shader.glsl';
// import * as matrix from 'gl-matrix';


@Injectable({
  providedIn: 'root',
})
export class WebGLService {
  /**
   * The underlying {@link RenderingContext}.
   */
  private renderingContext!: RenderingContext;

  /**
   * Gets the {@link renderingContext} as a {@link WebGLRenderingContext}.
   */
  private get gl(): WebGLRenderingContext {
    return this.renderingContext as WebGLRenderingContext;
  }

  /**
   * Gets the {@link gl.canvas} as a {@link Element} client.
   */
  private get clientCanvas(): HTMLCanvasElement {
    return this.gl.canvas as HTMLCanvasElement
  }

  private readonly FLOATS_PER_STAR = 3;

  private starVertexShader!: WebGLProgram;
  private starFragmentShader!: WebGLProgram;
  private starShaderProgram!: WebGLProgram;

  private starVertexData: any[] = [];
  private starVertexArray!: Float32Array;
  private starVertexBuffer!: WebGLBuffer;

  private starTimeUniform!: WebGLUniformLocation;
  private starSpeedUniform!: WebGLUniformLocation;
  private starTopBottomUniform!: WebGLUniformLocation;
  private starLeftRightUniform!: WebGLUniformLocation;
  private starPositionAttribute!: GLint;
  private starCenterAttribute!: GLint;
  private starProximityAttribute!: GLint;

  private shaderX!: WebGLUniformLocation;
  private shaderY!: WebGLUniformLocation;

  private animationStart = (new Date).getTime() / 1000;

  private mousePosition = {
    x: 0,
    y: 0,
  }

  constructor() { }

  initialiseWebGLContext(canvas: HTMLCanvasElement): WebGLRenderingContext | undefined {
    // Try to grab the standard context. If it fails, fallback to experimental.
    this.renderingContext =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;

    // If we don't have a GL context, give up now... only continue if WebGL is available and working...
    if (!this.gl) {
      alert('Unable to initialize WebGL. Your browser may not support it.');
      return;
    }

    this.starVertexBuffer = this.gl.createBuffer() as WebGLBuffer;

    this.renderingContext.enable(this.renderingContext.BLEND);
    this.renderingContext.blendFunc(this.renderingContext.SRC_ALPHA, this.renderingContext.ONE_MINUS_SRC_ALPHA);
    this.starVertexShader = this.gl.createShader(this.gl.VERTEX_SHADER) as WebGLProgram;
    this.gl.shaderSource(this.starVertexShader, startVertexShader);
    this.gl.compileShader(this.starVertexShader);

    this.starFragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER) as WebGLProgram;
    this.gl.shaderSource(this.starFragmentShader, startFragmentShader);
    this.gl.compileShader(this.starFragmentShader);

    this.starShaderProgram = this.gl.createProgram() as WebGLProgram;
    this.gl.attachShader(this.starShaderProgram, this.starVertexShader);
    this.gl.attachShader(this.starShaderProgram, this.starFragmentShader);
    this.gl.linkProgram(this.starShaderProgram);

    this.starTimeUniform = this.gl.getUniformLocation(this.starShaderProgram, "time") as WebGLUniformLocation;
    this.starSpeedUniform = this.gl.getUniformLocation(this.starShaderProgram, "starSpeed") as WebGLUniformLocation;
    this.starTopBottomUniform = this.gl.getUniformLocation(this.starShaderProgram, "starTopBottom") as WebGLUniformLocation;
    this.starLeftRightUniform = this.gl.getUniformLocation(this.starShaderProgram, "starLeftRight") as WebGLUniformLocation;
    this.starPositionAttribute = this.gl.getAttribLocation(this.starShaderProgram, "position");
    this.starCenterAttribute = this.gl.getAttribLocation(this.starShaderProgram, "starCenter");
    this.starProximityAttribute = this.gl.getAttribLocation(this.starShaderProgram, "starProximity");

    this.shaderX = this.gl.getUniformLocation(this.starShaderProgram, "red") as WebGLUniformLocation;
    this.shaderY = this.gl.getUniformLocation(this.starShaderProgram, "green") as WebGLUniformLocation;

     this.initialiseWebGLCanvas();

    return this.gl
  }

  initialiseWebGLCanvas() {
    this.clientCanvas.width = window.innerWidth;
    this.clientCanvas.height = window.innerHeight;
    this.clientCanvas.style.position = 'fixed';
    this.clientCanvas.style.left = this.clientCanvas.style.top = this.clientCanvas.style.right = this.clientCanvas.style.bottom = '0';
    this.clientCanvas.style.zIndex = '-1';
  }

  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.starShaderProgram);
    this.bindAndEnableStars();
    this.gl.uniform1f(this.starTimeUniform, (new Date).getTime() / 1000 - this.animationStart);
    this.gl.uniform1f(this.starSpeedUniform, (1440 / (this.clientCanvas.width)) / 8);
    this.gl.uniform1f(this.starTopBottomUniform, 0.0010 * this.mousePosition.y);
    this.gl.uniform1f(this.starLeftRightUniform, 0.00010 * this.mousePosition.x);
    this.gl.uniform1f(this.shaderY, 0.010 * this.mousePosition.y);
    this.gl.uniform1f(this.shaderX, 0.010 * this.mousePosition.x);

    this.gl.drawArrays(this.gl.POINTS, 0, this.starVertexData.length / this.FLOATS_PER_STAR);
    requestAnimationFrame(() => {
      this.render();
    });
  }

  setMousePosition(x: number, y: number) {
    this.mousePosition.x = x;
    this.mousePosition.y = y;
  }

  onResize() {
    this.gl.canvas.width = window.innerWidth;
    this.gl.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, window.innerWidth, window.innerHeight);

    this.gl.useProgram(this.starShaderProgram);
    this.gl.uniform1f(this.starSpeedUniform, (1440 / this.clientCanvas.width) / 8);

    let starCount = Math.floor(Math.sqrt(this.clientCanvas.width * this.clientCanvas.height) * 4);
    let currentStarCount = this.starVertexData.length / this.FLOATS_PER_STAR;
    if (currentStarCount < starCount) {
      for (let i = currentStarCount; i < starCount; i++) {
        let x = Math.random() * 2 - 1, y = Math.random() * 2 - 1;
        let proximity = Math.pow(Math.random(), 4);
        this.starVertexData.push(x, y);

        // how far are the stars (3rd dimension);
        this.starVertexData.push(proximity);
      }
    } else if (currentStarCount > starCount) {
      this.starVertexData.splice(starCount * this.FLOATS_PER_STAR);
    }

    this.starVertexArray = new Float32Array(this.starVertexData);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.starVertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.starVertexArray, this.gl.DYNAMIC_DRAW);

    this.bindAndEnableStars();
  }

  private bindAndEnableStars() {
    this.gl.enableVertexAttribArray(this.starCenterAttribute);
    this.gl.vertexAttribPointer(this.starCenterAttribute, 2, this.gl.FLOAT, false, 3 * 4, 0 * 4);

    this.gl.enableVertexAttribArray(this.starProximityAttribute);
    this.gl.vertexAttribPointer(this.starProximityAttribute, 1, this.gl.FLOAT, false, 3 * 4, 2 * 4);
  }
}
