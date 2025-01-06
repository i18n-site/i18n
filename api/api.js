// api.ts
var Func;
((Func2) => {
  Func2[Func2["SignIn"] = 1] = "SignIn";
})(Func ||= {});
function writeFunc(value, sinkOrBuf) {
  const sink = Sink.create(sinkOrBuf);
  switch (value) {
    case 1:
      writeU32(0, sink);
      break;
    default:
      throw new Error(`'${value}' is invalid value for enum 'Func'`);
  }
  return sink;
}
function readFunc(sinkOrBuf) {
  const sink = Sink.create(sinkOrBuf);
  const value = readU32(sink);
  switch (value) {
    case 0:
      return 1;
    default:
      throw new Error(`'${value}' is invalid value for enum 'Func'`);
  }
}

class Sink {
  view;
  position;
  constructor(input) {
    this.view = new DataView(input);
    this.position = 0;
  }
  reserve(extra) {
    if (this.position + extra <= this.view.buffer.byteLength) {
      return;
    }
    const newBuffer = new ArrayBuffer((this.view.buffer.byteLength + extra) * 2);
    new Uint8Array(newBuffer).set(new Uint8Array(this.view.buffer));
    this.view = new DataView(newBuffer);
  }
  static create(input) {
    if (input == undefined) {
      return new Sink(new ArrayBuffer(0));
    }
    if (input instanceof Sink) {
      return input;
    }
    if (input instanceof ArrayBuffer) {
      return new Sink(input);
    }
    if (input instanceof Uint8Array) {
      return new Sink(input.buffer);
    }
    throw new Error(`'input' was of incorrect type. Expected 'Sink | ArrayBuffer | Uint8Array'`);
  }
  getUint8Array() {
    return new Uint8Array(this.view.buffer.slice(0, this.position));
  }
}
var BIG_32 = BigInt(32);
var BIG_64 = BigInt(64);
var BIG_32Fs = BigInt("4294967295");
var BIG_64Fs = BigInt("18446744073709551615");
var textEncoder = new TextEncoder;
var textDecoder = new TextDecoder;
function readU32(sink) {
  const value = sink.view.getUint32(sink.position, true);
  sink.position += 4;
  return value;
}
function writeU32(value, sink) {
  sink.reserve(4);
  sink.view.setUint32(sink.position, value, true);
  sink.position += 4;
  return sink;
}
export {
  writeFunc,
  readFunc,
  Sink,
  Func
};
