import { gl } from '@antv/l7-core';
import { createContext } from '@antv/l7-test-utils';
import regl from 'regl';
import quad from '../../../core/src/shaders/post-processing/quad.glsl';
import ReglAttribute from '../../src/regl/ReglAttribute';
import ReglBuffer from '../../src/regl/ReglBuffer';
import ReglModel from '../../src/regl/ReglModel';
import checkPixels from './utils/check-pixels';

describe('ReglAttribute', () => {
  let context;
  let reGL: regl.Regl;

  beforeEach(() => {
    context = createContext(1, 1);
    reGL = regl(context);
  });

  it('should initialize without `size`', () => {
    const attribute = new ReglAttribute(reGL, {
      buffer: new ReglBuffer(reGL, {
        data: [
          [-4, -4],
          [4, -4],
          [0, 4],
        ],
        type: gl.FLOAT,
      }),
    });
    const model = new ReglModel(reGL, {
      vs: quad,
      fs: 'void main() {gl_FragColor = vec4(1., 0., 0., 1.);}',
      attributes: {
        a_Position: attribute,
      },
      depth: {
        enable: false,
      },
      count: 3,
    });

    reGL.clear({
      color: [0, 0, 0, 0],
    });

    attribute.updateBuffer({
      data: [-4, -4, 4, -4, 0, 4],
      offset: 0,
    });

    model.draw({});

    attribute.destroy();

    expect(checkPixels(reGL, [255])).toBeTruthy();
  });

  it('should update buffer correctly', () => {
    const attribute = new ReglAttribute(reGL, {
      buffer: new ReglBuffer(reGL, {
        data: [-4, -4, 4, -4, 0, 4],
        type: gl.FLOAT,
      }),
      size: 2,
    });
    const model = new ReglModel(reGL, {
      vs: quad,
      fs: 'void main() {gl_FragColor = vec4(1., 0., 0., 1.);}',
      attributes: {
        a_Position: attribute,
      },
      depth: {
        enable: false,
      },
      count: 3,
    });

    reGL.clear({
      color: [0, 0, 0, 0],
    });

    attribute.updateBuffer({
      data: [-4, -4, 4, -4, 0, 4],
      offset: 0,
    });

    model.draw({});

    attribute.destroy();

    expect(checkPixels(reGL, [255])).toBeTruthy();
  });
});