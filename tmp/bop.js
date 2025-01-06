var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// bop.js
var __require2 = /* @__PURE__ */ ((x) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof __require !== "undefined" ? __require : a)[b]
}) : x)(function(x) {
  if (typeof __require !== "undefined")
    return __require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __require22 = /* @__PURE__ */ ((x) => __require2)(function(x) {
  if (true)
    return __require2.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var decoder = new TextDecoder();
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
    for (let i = 0; i < value.length; i++) {
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
    for (let i = 0; i < 36; i++) {
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
    for (let i = 0; i < this.value.length; i++) {
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
var GuidMap = class _GuidMap {
  map;
  constructor(entries) {
    if (entries instanceof Map) {
      this.map = new Map(entries);
    } else if (entries && typeof entries[Symbol.iterator] === "function") {
      this.map = new Map([...entries].map(([key, value]) => [key.toString(), value]));
    } else {
      this.map = /* @__PURE__ */ new Map();
    }
  }
  set(key, value) {
    this.map.set(key.toString(), value);
    return this;
  }
  get(key) {
    return this.map.get(key.toString());
  }
  delete(key) {
    return this.map.delete(key.toString());
  }
  has(key) {
    return this.map.has(key.toString());
  }
  clear() {
    this.map.clear();
  }
  get size() {
    return this.map.size;
  }
  forEach(callbackFn) {
    this.map.forEach((value, keyString) => {
      callbackFn(value, Guid.parseGuid(keyString), this);
    });
  }
  *entries() {
    for (const [keyString, value] of this.map.entries()) {
      yield [Guid.parseGuid(keyString), value];
    }
  }
  *keys() {
    for (const keyString of this.map.keys()) {
      yield Guid.parseGuid(keyString);
    }
  }
  *values() {
    yield* this.map.values();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get [Symbol.species]() {
    return _GuidMap;
  }
};
var BebopView = class _BebopView {
  static textDecoder;
  static writeBuffer = new Uint8Array(256);
  static writeBufferView = new DataView(_BebopView.writeBuffer.buffer);
  static instance;
  static getInstance() {
    if (!_BebopView.instance) {
      _BebopView.instance = new _BebopView();
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
      if (_BebopView.textDecoder === void 0) {
        _BebopView.textDecoder = new TextDecoder();
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
    for (let i = 0; i < stringLength; i++) {
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
var typeMarker = "#btype";
var keyMarker = "#ktype";
var mapTag = 1;
var dateTag = 2;
var uint8ArrayTag = 3;
var bigIntTag = 4;
var guidTag = 5;
var mapGuidTag = 6;
var boolTag = 7;
var stringTag = 8;
var numberTag = 9;
var castScalarByTag = (value, tag) => {
  switch (tag) {
    case bigIntTag:
      return BigInt(value);
    case boolTag:
      return Boolean(value);
    case stringTag:
      return value;
    case numberTag:
      return Number(value);
    default:
      throw new BebopRuntimeError(`Unknown scalar tag: ${tag}`);
  }
};
var getMapKeyTag = (map) => {
  if (map.size === 0) {
    throw new BebopRuntimeError("Cannot determine key type of an empty map.");
  }
  const keyType = typeof map.keys().next().value;
  let keyTag;
  switch (keyType) {
    case "string":
      keyTag = stringTag;
      break;
    case "number":
      keyTag = numberTag;
      break;
    case "boolean":
      keyTag = boolTag;
      break;
    case "bigint":
      keyTag = bigIntTag;
      break;
    default:
      throw new BebopRuntimeError(`Not suitable map type tag found. Keys must be strings, numbers, booleans, or BigInts: ${keyType}`);
  }
  return keyTag;
};
var replacer = (_key, value) => {
  if (value === null)
    return value;
  switch (typeof value) {
    case "bigint":
      return { [typeMarker]: bigIntTag, value: value.toString() };
    case "string":
    case "number":
    case "boolean":
      return value;
  }
  if (value instanceof Date) {
    const ms = BigInt(value.getTime());
    const ticks = ms * 10000n + ticksBetweenEpochs;
    return { [typeMarker]: dateTag, value: (ticks & dateMask).toString() };
  }
  if (value instanceof Uint8Array) {
    return { [typeMarker]: uint8ArrayTag, value: Array.from(value) };
  }
  if (value instanceof Guid) {
    return { [typeMarker]: guidTag, value: value.toString() };
  }
  if (value instanceof GuidMap) {
    const obj = {};
    for (let [k, v] of value.entries()) {
      obj[k.toString()] = replacer(_key, v);
    }
    return { [typeMarker]: mapGuidTag, value: obj };
  }
  if (value instanceof Map) {
    const obj = {};
    let keyTag = getMapKeyTag(value);
    if (keyTag === void 0) {
      throw new BebopRuntimeError("Not suitable map key type tag found.");
    }
    for (let [k, v] of value.entries()) {
      obj[k] = replacer(_key, v);
    }
    return { [typeMarker]: mapTag, [keyMarker]: keyTag, value: obj };
  }
  if (Array.isArray(value)) {
    return value.map((v, i) => replacer(i, v));
  }
  if (typeof value === "object") {
    const newObj = {};
    for (let k in value) {
      newObj[k] = replacer(k, value[k]);
    }
    return newObj;
  }
  return value;
};
var reviver = (_key, value) => {
  if (_key === "__proto__" || _key === "prototype" || _key === "constructor")
    throw new BebopRuntimeError("potential prototype pollution");
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if (value[typeMarker]) {
      switch (value[typeMarker]) {
        case bigIntTag:
          return BigInt(value.value);
        case dateTag:
          const ticks = BigInt(value.value) & dateMask;
          const ms = (ticks - ticksBetweenEpochs) / 10000n;
          return new Date(Number(ms));
        case uint8ArrayTag:
          return new Uint8Array(value.value);
        case mapTag:
          const keyTag = value[keyMarker];
          if (keyTag === void 0 || keyTag === null) {
            throw new BebopRuntimeError("Map key type tag not found.");
          }
          const map = /* @__PURE__ */ new Map();
          for (let k in value.value) {
            const trueKey = castScalarByTag(k, keyTag);
            map.set(trueKey, reviver(k, value.value[k]));
          }
          return map;
        case guidTag:
          return Guid.parseGuid(value.value);
        case mapGuidTag:
          const guidMap = new GuidMap();
          for (let k in value.value) {
            guidMap.set(Guid.parseGuid(k), reviver(k, value.value[k]));
          }
          return guidMap;
        default:
          throw new BebopRuntimeError(`Unknown type marker: ${value[typeMarker]}`);
      }
    }
  }
  return value;
};
var BebopJson = {
  replacer,
  reviver
};
var ensureBoolean = (value) => {
  if (!(value === false || value === true || value instanceof Boolean || typeof value === "boolean")) {
    throw new BebopRuntimeError(`Invalid value for Boolean: ${value} / typeof ${typeof value}`);
  }
};
var ensureUint8 = (value) => {
  if (!Number.isInteger(value) || value < 0 || value > 255) {
    throw new BebopRuntimeError(`Invalid value for Uint8: ${value}`);
  }
};
var ensureInt16 = (value) => {
  if (!Number.isInteger(value) || value < -32768 || value > 32767) {
    throw new BebopRuntimeError(`Invalid value for Int16: ${value}`);
  }
};
var ensureUint16 = (value) => {
  if (!Number.isInteger(value) || value < 0 || value > 65535) {
    throw new BebopRuntimeError(`Invalid value for Uint16: ${value}`);
  }
};
var ensureInt32 = (value) => {
  if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647) {
    throw new BebopRuntimeError(`Invalid value for Int32: ${value}`);
  }
};
var ensureUint32 = (value) => {
  if (!Number.isInteger(value) || value < 0 || value > 4294967295) {
    throw new BebopRuntimeError(`Invalid value for Uint32: ${value}`);
  }
};
var ensureInt64 = (value) => {
  const min = BigInt("-9223372036854775808");
  const max = BigInt("9223372036854775807");
  value = BigInt(value);
  if (value < min || value > max) {
    throw new BebopRuntimeError(`Invalid value for Int64: ${value}`);
  }
};
var ensureUint64 = (value) => {
  const max = BigInt("18446744073709551615");
  value = BigInt(value);
  if (value < BigInt(0) || value > max) {
    throw new BebopRuntimeError(`Invalid value for Uint64: ${value}`);
  }
};
var ensureBigInt = (value) => {
  if (typeof value !== "bigint") {
    throw new BebopRuntimeError(`Invalid value for BigInt: ${value}`);
  }
};
var ensureFloat = (value) => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new BebopRuntimeError(`Invalid value for Float: ${value}`);
  }
};
var ensureMap = (value, keyTypeValidator, valueTypeValidator) => {
  if (!(value instanceof Map || value instanceof GuidMap)) {
    throw new BebopRuntimeError(`Invalid value for Map: ${value}`);
  }
  for (let [k, v] of value) {
    keyTypeValidator(k);
    valueTypeValidator(v);
  }
};
var ensureArray = (value, elementTypeValidator) => {
  if (!Array.isArray(value)) {
    throw new BebopRuntimeError(`Invalid value for Array: ${value}`);
  }
  for (let element of value) {
    elementTypeValidator(element);
  }
};
var ensureDate = (value) => {
  if (!(value instanceof Date)) {
    throw new BebopRuntimeError(`Invalid value for Date: ${value}`);
  }
};
var ensureUint8Array = (value) => {
  if (!(value instanceof Uint8Array)) {
    throw new BebopRuntimeError(`Invalid value for Uint8Array: ${value}`);
  }
};
var ensureString = (value) => {
  if (typeof value !== "string") {
    throw new BebopRuntimeError(`Invalid value for String: ${value}`);
  }
};
var ensureEnum = (value, enumValue) => {
  if (!Number.isInteger(value)) {
    throw new BebopRuntimeError(`Invalid value for enum, not an int: ${value}`);
  }
  if (!(value in enumValue)) {
    throw new BebopRuntimeError(`Invalid value for enum, not in enum: ${value}`);
  }
};
var ensureGuid = (value) => {
  if (!(value instanceof Guid)) {
    throw new BebopRuntimeError(`Invalid value for Guid: ${value}`);
  }
};
var BebopTypeGuard = {
  ensureBoolean,
  ensureUint8,
  ensureInt16,
  ensureUint16,
  ensureInt32,
  ensureUint32,
  ensureInt64,
  ensureUint64,
  ensureBigInt,
  ensureFloat,
  ensureMap,
  ensureArray,
  ensureDate,
  ensureUint8Array,
  ensureString,
  ensureEnum,
  ensureGuid
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
var Req = class _Req {
  func;
  args;
  constructor(record) {
    this.func = record.func;
    this.args = record.args;
  }
  stringify() {
    return _Req.encodeToJSON(this);
  }
  static encodeToJSON(record) {
    return JSON.stringify(record, BebopJson.replacer);
  }
  validateTypes() {
    _Req.validateCompatibility(this);
  }
  static validateCompatibility(record) {
    BebopTypeGuard.ensureEnum(record.func, Func);
    BebopTypeGuard.ensureUint8(record.args);
  }
  static unsafeCast(record) {
    return new _Req(record);
  }
  static fromJSON(json) {
    if (typeof json !== "string" || json.trim().length === 0) {
      throw new BebopRuntimeError(`Req.fromJSON: expected string`);
    }
    const parsed = JSON.parse(json, BebopJson.reviver);
    _Req.validateCompatibility(parsed);
    return _Req.unsafeCast(parsed);
  }
  encode() {
    return _Req.encode(this);
  }
  static encode(record) {
    const view = BebopView.getInstance();
    view.startWriting();
    _Req.encodeInto(record, view);
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
    return _Req.readFrom(view);
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
    return new _Req(message);
  }
};
export {
  Req
};
