#!/usr/bin/env coffee

> ./api.js > writeEntity readEntity

r = writeEntity({
  x:1,y:2
}).getUint8Array()

console.log r

console.log readEntity r
