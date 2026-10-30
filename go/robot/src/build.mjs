// Builds go/robot.js (the robot's Web Worker) and dist/sections.cjs (for halve.py).
import { build } from 'esbuild';
await build({ entryPoints: ['web-katrain/src/robot/robotWorker.ts'], bundle: true, minify: true, format: 'iife', target: 'es2020',
  outfile: 'dist/robot.js', legalComments: 'none', alias: { '@tensorflow/tfjs': '@tensorflow/tfjs-core' },
  banner: { js: '// Go robot worker: KataGo human SL net via TensorFlow.js. Engine code from Web KaTrain (MIT, github.com/Sir-Teo/web-katrain); built from D:\Desktop\go-robot.' } });
await build({ entryPoints: ['web-katrain/src/robot/sections.ts'], bundle: true, platform: 'node', format: 'cjs', outfile: 'dist/sections.cjs', alias: { '@tensorflow/tfjs': '@tensorflow/tfjs-core' } });
console.log('built');
