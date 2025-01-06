var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// bop.js
var __require2 = /* @__PURE__ */ ((x) => __require)(function(x) {
  if (true)
    return __require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __require22 = /* @__PURE__ */ ((x) => __require2)(function(x) {
  if (true)
    return __require2.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var decoder = new TextDecoder;
var hexDigits = "0123456789abcdef";
var asciiToHex = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  10,
  11,
  12,
  13,
  14,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  10,
  11,
  12,
  13,
  14,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];
var guidDelimiter = "-";
var ticksBetweenEpochs = 621355968000000000n;
var dateMask = 0x3fffffffffffffffn;
var emptyByteArray = new Uint8Array(0);
var emptyString = "";
var byteToHex = [];
for (const x of hexDigits) {
  for (const y of hexDigits) {
    byteToHex.push(x + y);
  }
}
var hasCryptoGetRandomValues = typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function";
var BebopRuntimeError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "BebopRuntimeError";
  }
};
var Guid = class _Guid {
  constructor(value) {
    this.value = value;
  }
  static empty = new _Guid("00000000-0000-0000-0000-000000000000");
  toString() {
    return this.value;
  }
  isEmpty() {
    return this.value === _Guid.empty.value;
  }
  static isGuid(value) {
    return value instanceof _Guid;
  }
  static parseGuid(value) {
    let cleanedInput = "";
    let count = 0;
    for (let i = 0;i < value.length; i++) {
      let ch = value[i].toLowerCase();
      if (hexDigits.indexOf(ch) !== -1) {
        cleanedInput += ch;
        count++;
      } else if (ch !== "-") {
        throw new BebopRuntimeError(`Invalid GUID: ${value}`);
      }
    }
    if (count !== 32) {
      throw new BebopRuntimeError(`Invalid GUID: ${value}`);
    }
    const guidString = cleanedInput.slice(0, 8) + "-" + cleanedInput.slice(8, 12) + "-" + cleanedInput.slice(12, 16) + "-" + cleanedInput.slice(16, 20) + "-" + cleanedInput.slice(20);
    return new _Guid(guidString);
  }
  static newGuid() {
    let guid = "";
    const now = Date.now();
    for (let i = 0;i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        guid += "-";
      } else if (i === 14) {
        guid += "4";
      } else if (i === 19) {
        guid += Math.random() > 0.5 ? "a" : "b";
      } else {
        guid += hexDigits[(Math.random() * 16 + now) % 16 | 0];
      }
    }
    return new _Guid(guid);
  }
  static newSecureGuid() {
    if (!hasCryptoGetRandomValues) {
      throw new BebopRuntimeError("Crypto.getRandomValues is not available. Please include a polyfill or use in an environment that supports it.");
    }
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = bytes[6] & 15 | 64;
    bytes[8] = bytes[8] & 63 | 128;
    return _Guid.fromBytes(bytes, 0);
  }
  equals(other) {
    if (this === other) {
      return true;
    }
    if (!(other instanceof _Guid)) {
      return false;
    }
    for (let i = 0;i < this.value.length; i++) {
      if (this.value[i] !== other.value[i]) {
        return false;
      }
    }
    return true;
  }
  writeToView(view, length) {
    var p = 0, a = 0;
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    p += this.value.charCodeAt(p) === 45;
    view.setUint32(length, a, true);
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    p += this.value.charCodeAt(p) === 45;
    view.setUint16(length + 4, a, true);
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    p += this.value.charCodeAt(p) === 45;
    view.setUint16(length + 6, a, true);
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    p += this.value.charCodeAt(p) === 45;
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    view.setUint32(length + 8, a, false);
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    view.setUint32(length + 12, a, false);
  }
  static fromBytes(buffer, index) {
    var s = byteToHex[buffer[index + 3]];
    s += byteToHex[buffer[index + 2]];
    s += byteToHex[buffer[index + 1]];
    s += byteToHex[buffer[index]];
    s += guidDelimiter;
    s += byteToHex[buffer[index + 5]];
    s += byteToHex[buffer[index + 4]];
    s += guidDelimiter;
    s += byteToHex[buffer[index + 7]];
    s += byteToHex[buffer[index + 6]];
    s += guidDelimiter;
    s += byteToHex[buffer[index + 8]];
    s += byteToHex[buffer[index + 9]];
    s += guidDelimiter;
    s += byteToHex[buffer[index + 10]];
    s += byteToHex[buffer[index + 11]];
    s += byteToHex[buffer[index + 12]];
    s += byteToHex[buffer[index + 13]];
    s += byteToHex[buffer[index + 14]];
    s += byteToHex[buffer[index + 15]];
    return new _Guid(s);
  }
  [Symbol.toPrimitive](hint) {
    if (hint === "string" || hint === "default") {
      return this.toString();
    }
    throw new Error(`Guid cannot be converted to ${hint}`);
  }
};
var BebopView = class _BebopView {
  static textDecoder;
  static writeBuffer = new Uint8Array(256);
  static writeBufferView = new DataView(_BebopView.writeBuffer.buffer);
  static instance;
  static getInstance() {
    if (!_BebopView.instance) {
      _BebopView.instance = new _BebopView;
    }
    return _BebopView.instance;
  }
  minimumTextDecoderLength = 300;
  buffer;
  view;
  index;
  length;
  constructor() {
    this.buffer = _BebopView.writeBuffer;
    this.view = _BebopView.writeBufferView;
    this.index = 0;
    this.length = 0;
  }
  startReading(buffer) {
    this.buffer = buffer;
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
    this.index = 0;
    this.length = buffer.length;
  }
  startWriting() {
    this.buffer = _BebopView.writeBuffer;
    this.view = _BebopView.writeBufferView;
    this.index = 0;
    this.length = 0;
  }
  guaranteeBufferLength(length) {
    if (length > this.buffer.length) {
      const data = new Uint8Array(length << 1);
      data.set(this.buffer);
      this.buffer = data;
      this.view = new DataView(data.buffer);
    }
  }
  growBy(amount) {
    this.length += amount;
    this.guaranteeBufferLength(this.length);
  }
  skip(amount) {
    this.index += amount;
  }
  toArray() {
    return this.buffer.subarray(0, this.length);
  }
  readByte() {
    return this.buffer[this.index++];
  }
  readUint16() {
    const result = this.view.getUint16(this.index, true);
    this.index += 2;
    return result;
  }
  readInt16() {
    const result = this.view.getInt16(this.index, true);
    this.index += 2;
    return result;
  }
  readUint32() {
    const result = this.view.getUint32(this.index, true);
    this.index += 4;
    return result;
  }
  readInt32() {
    const result = this.view.getInt32(this.index, true);
    this.index += 4;
    return result;
  }
  readUint64() {
    const result = this.view.getBigUint64(this.index, true);
    this.index += 8;
    return result;
  }
  readInt64() {
    const result = this.view.getBigInt64(this.index, true);
    this.index += 8;
    return result;
  }
  readFloat32() {
    const result = this.view.getFloat32(this.index, true);
    this.index += 4;
    return result;
  }
  readFloat64() {
    const result = this.view.getFloat64(this.index, true);
    this.index += 8;
    return result;
  }
  writeByte(value) {
    const index = this.length;
    this.growBy(1);
    this.buffer[index] = value;
  }
  writeUint16(value) {
    const index = this.length;
    this.growBy(2);
    this.view.setUint16(index, value, true);
  }
  writeInt16(value) {
    const index = this.length;
    this.growBy(2);
    this.view.setInt16(index, value, true);
  }
  writeUint32(value) {
    const index = this.length;
    this.growBy(4);
    this.view.setUint32(index, value, true);
  }
  writeInt32(value) {
    const index = this.length;
    this.growBy(4);
    this.view.setInt32(index, value, true);
  }
  writeUint64(value) {
    const index = this.length;
    this.growBy(8);
    this.view.setBigUint64(index, value, true);
  }
  writeInt64(value) {
    const index = this.length;
    this.growBy(8);
    this.view.setBigInt64(index, value, true);
  }
  writeFloat32(value) {
    const index = this.length;
    this.growBy(4);
    this.view.setFloat32(index, value, true);
  }
  writeFloat64(value) {
    const index = this.length;
    this.growBy(8);
    this.view.setFloat64(index, value, true);
  }
  readBytes() {
    const length = this.readUint32();
    if (length === 0) {
      return emptyByteArray;
    }
    const start = this.index, end = start + length;
    this.index = end;
    return this.buffer.subarray(start, end);
  }
  writeBytes(value) {
    const byteCount = value.length;
    this.writeUint32(byteCount);
    if (byteCount === 0) {
      return;
    }
    const index = this.length;
    this.growBy(byteCount);
    this.buffer.set(value, index);
  }
  readString() {
    const lengthBytes = this.readUint32();
    if (lengthBytes === 0) {
      return emptyString;
    }
    if (lengthBytes >= this.minimumTextDecoderLength) {
      if (typeof __require22 !== "undefined") {
        if (typeof TextDecoder === "undefined") {
          throw new BebopRuntimeError("TextDecoder is not defined on 'global'. Please include a polyfill.");
        }
      }
      if (_BebopView.textDecoder === undefined) {
        _BebopView.textDecoder = new TextDecoder;
      }
      return _BebopView.textDecoder.decode(this.buffer.subarray(this.index, this.index += lengthBytes));
    }
    const end = this.index + lengthBytes;
    let result = "";
    let codePoint;
    while (this.index < end) {
      const a = this.buffer[this.index++];
      if (a < 192) {
        codePoint = a;
      } else {
        const b = this.buffer[this.index++];
        if (a < 224) {
          codePoint = (a & 31) << 6 | b & 63;
        } else {
          const c = this.buffer[this.index++];
          if (a < 240) {
            codePoint = (a & 15) << 12 | (b & 63) << 6 | c & 63;
          } else {
            const d = this.buffer[this.index++];
            codePoint = (a & 7) << 18 | (b & 63) << 12 | (c & 63) << 6 | d & 63;
          }
        }
      }
      if (codePoint < 65536) {
        result += String.fromCharCode(codePoint);
      } else {
        codePoint -= 65536;
        result += String.fromCharCode((codePoint >> 10) + 55296, (codePoint & (1 << 10) - 1) + 56320);
      }
    }
    this.index = end;
    return result;
  }
  writeString(value) {
    const stringLength = value.length;
    if (stringLength === 0) {
      this.writeUint32(0);
      return;
    }
    const maxBytes = 4 + stringLength * 3;
    this.guaranteeBufferLength(this.length + maxBytes);
    let w = this.length + 4;
    const start = w;
    let codePoint;
    for (let i = 0;i < stringLength; i++) {
      const a = value.charCodeAt(i);
      if (i + 1 === stringLength || a < 55296 || a >= 56320) {
        codePoint = a;
      } else {
        const b = value.charCodeAt(++i);
        codePoint = (a << 10) + b + (65536 - (55296 << 10) - 56320);
      }
      if (codePoint < 128) {
        this.buffer[w++] = codePoint;
      } else {
        if (codePoint < 2048) {
          this.buffer[w++] = codePoint >> 6 & 31 | 192;
        } else {
          if (codePoint < 65536) {
            this.buffer[w++] = codePoint >> 12 & 15 | 224;
          } else {
            this.buffer[w++] = codePoint >> 18 & 7 | 240;
            this.buffer[w++] = codePoint >> 12 & 63 | 128;
          }
          this.buffer[w++] = codePoint >> 6 & 63 | 128;
        }
        this.buffer[w++] = codePoint & 63 | 128;
      }
    }
    const written = w - start;
    this.view.setUint32(this.length, written, true);
    this.length += 4 + written;
  }
  readGuid() {
    const guid = Guid.fromBytes(this.buffer, this.index);
    this.index += 16;
    return guid;
  }
  writeGuid(value) {
    const i = this.length;
    this.growBy(16);
    value.writeToView(this.view, i);
  }
  readDate() {
    const ticks = this.readUint64() & dateMask;
    const ms = (ticks - ticksBetweenEpochs) / 10000n;
    return new Date(Number(ms));
  }
  writeDate(date) {
    const ms = BigInt(date.getTime());
    const ticks = ms * 10000n + ticksBetweenEpochs;
    this.writeUint64(ticks & dateMask);
  }
  reserveMessageLength() {
    const i = this.length;
    this.growBy(4);
    return i;
  }
  fillMessageLength(position, messageLength) {
    this.view.setUint32(position, messageLength, true);
  }
  readMessageLength() {
    const result = this.view.getUint32(this.index, true);
    this.index += 4;
    return result;
  }
};
var BEBOP_SCHEMA = new Uint8Array([
  3,
  3,
  0,
  0,
  0,
  70,
  117,
  110,
  99,
  0,
  4,
  0,
  251,
  255,
  255,
  255,
  0,
  4,
  0,
  0,
  0,
  1,
  76,
  111,
  103,
  105,
  110,
  0,
  0,
  1,
  0,
  0,
  0,
  82,
  101,
  113,
  0,
  1,
  0,
  0,
  5,
  0,
  0,
  0,
  1,
  2,
  102,
  117,
  110,
  99,
  0,
  0,
  0,
  0,
  0,
  0,
  97,
  114,
  103,
  115,
  0,
  254,
  255,
  255,
  255,
  0,
  82,
  101,
  113,
  76,
  105,
  0,
  1,
  0,
  0,
  4,
  0,
  0,
  0,
  0,
  1,
  108,
  105,
  0,
  242,
  255,
  255,
  255,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]);
var Func;
((Func2) => {
  Func2[Func2["Login"] = 1] = "Login";
})(Func ||= {});

class Req {
  func;
  args;
  constructor(record) {
    Object.assign(this, record);
  }
  encode() {
    return Req.encode(this);
  }
  static encode(record) {
    const view = BebopView.getInstance();
    view.startWriting();
    Req.encodeInto(record, view);
    return view.toArray();
  }
  static encodeInto(record, view) {
    const before = view.length;
    view.writeUint32(record.func);
    view.writeByte(record.args);
    const after = view.length;
    return after - before;
  }
  static decode(buffer) {
    const view = BebopView.getInstance();
    view.startReading(buffer);
    return Req.readFrom(view);
  }
  static readFrom(view) {
    let field0;
    field0 = view.readUint32();
    let field1;
    field1 = view.readByte();
    let message = {
      func: field0,
      args: field1
    };
    return new Req(message);
  }
}
export {
  Req
};
