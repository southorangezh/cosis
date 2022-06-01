import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
export default {
    input: "src/cosi.js",
    output: [
      {
        file: "lib/bundle.cjs.js",
        format: "cjs",
        sourcemap:true
      },
      {
        file: "lib/bundle.esm.js",
        format: "es",
        sourcemap:true
      }
    ],
    plugins:[
      
        json(),
        
        nodeResolve(),
        commonjs({
          strictRequires:"debug"
        }),
        babel()
      ]
  };