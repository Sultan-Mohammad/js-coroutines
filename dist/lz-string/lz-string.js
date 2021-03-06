"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LZStringGenerator = void 0;
// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
//           (c) 2020 Mike Talbot (generator modifications)
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
var YIELD_MASK = 127;

var LZStringGenerator = function () {
  // private property
  var f = String.fromCharCode;
  var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
  var baseReverseDic = {};

  function getBaseValue(alphabet, character) {
    if (!baseReverseDic[alphabet]) {
      baseReverseDic[alphabet] = {};

      for (var i = 0; i < alphabet.length; i++) {
        baseReverseDic[alphabet][alphabet.charAt(i)] = i;
      }
    }

    return baseReverseDic[alphabet][character];
  }

  var LZString = {
    compressToBase64: /*#__PURE__*/regeneratorRuntime.mark(function compressToBase64(input) {
      var res;
      return regeneratorRuntime.wrap(function compressToBase64$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(input === null)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", "");

            case 2:
              return _context.delegateYield(LZString._compress(input, 6, function (a) {
                return keyStrBase64.charAt(a);
              }), "t0", 3);

            case 3:
              res = _context.t0;
              _context.t1 = res.length % 4;
              _context.next = _context.t1 === 0 ? 7 : _context.t1 === 1 ? 8 : _context.t1 === 2 ? 9 : _context.t1 === 3 ? 10 : 7 // To produce valid Base64
              ;
              break;

            case 7:
              return _context.abrupt("return", res);

            case 8:
              return _context.abrupt("return", res + "===");

            case 9:
              return _context.abrupt("return", res + "==");

            case 10:
              return _context.abrupt("return", res + "=");

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, compressToBase64);
    }),
    decompressFromBase64: /*#__PURE__*/regeneratorRuntime.mark(function decompressFromBase64(input) {
      return regeneratorRuntime.wrap(function decompressFromBase64$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(input === null)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", "");

            case 2:
              if (!(input === "")) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", null);

            case 4:
              return _context2.delegateYield(LZString._decompress(input.length, 32, function (index) {
                return getBaseValue(keyStrBase64, input.charAt(index));
              }), "t0", 5);

            case 5:
              return _context2.abrupt("return", _context2.t0);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, decompressFromBase64);
    }),
    compressToUTF16: /*#__PURE__*/regeneratorRuntime.mark(function compressToUTF16(input) {
      return regeneratorRuntime.wrap(function compressToUTF16$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(input === null)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", "");

            case 2:
              return _context3.delegateYield(LZString._compress(input, 15, function (a) {
                return f(a + 32);
              }) + " ", "t0", 3);

            case 3:
              return _context3.abrupt("return", _context3.t0);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, compressToUTF16);
    }),
    decompressFromUTF16: /*#__PURE__*/regeneratorRuntime.mark(function decompressFromUTF16(compressed) {
      return regeneratorRuntime.wrap(function decompressFromUTF16$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(compressed === null)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", "");

            case 2:
              if (!(compressed === "")) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt("return", null);

            case 4:
              return _context4.delegateYield(LZString._decompress(compressed.length, 16384, function (index) {
                return compressed.charCodeAt(index) - 32;
              }), "t0", 5);

            case 5:
              return _context4.abrupt("return", _context4.t0);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, decompressFromUTF16);
    }),
    //compress into uint8array (UCS-2 big endian format)
    compressToUint8Array: /*#__PURE__*/regeneratorRuntime.mark(function compressToUint8Array(uncompressed) {
      var compressed, buf, i, TotalLen, current_value;
      return regeneratorRuntime.wrap(function compressToUint8Array$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.delegateYield(LZString.compress(uncompressed), "t0", 1);

            case 1:
              compressed = _context5.t0;
              buf = new Uint8Array(compressed.length * 2); // 2 bytes per character

              _context5.next = 5;
              return;

            case 5:
              i = 0, TotalLen = compressed.length;

            case 6:
              if (!(i < TotalLen)) {
                _context5.next = 16;
                break;
              }

              if (!((i & YIELD_MASK) === 0)) {
                _context5.next = 10;
                break;
              }

              _context5.next = 10;
              return;

            case 10:
              current_value = compressed.charCodeAt(i);
              buf[i * 2] = current_value >>> 8;
              buf[i * 2 + 1] = current_value % 256;

            case 13:
              i++;
              _context5.next = 6;
              break;

            case 16:
              return _context5.abrupt("return", buf);

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, compressToUint8Array);
    }),
    //decompress from uint8array (UCS-2 big endian format)
    decompressFromUint8Array: /*#__PURE__*/regeneratorRuntime.mark(function decompressFromUint8Array(compressed) {
      var buf, i, TotalLen;
      return regeneratorRuntime.wrap(function decompressFromUint8Array$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(compressed === null || compressed === undefined)) {
                _context6.next = 5;
                break;
              }

              return _context6.delegateYield(LZString.decompress(compressed), "t0", 2);

            case 2:
              return _context6.abrupt("return", _context6.t0);

            case 5:
              buf = new Array(compressed.length / 2); // 2 bytes per character

              i = 0, TotalLen = buf.length;

            case 7:
              if (!(i < TotalLen)) {
                _context6.next = 15;
                break;
              }

              if (!((i & YIELD_MASK) === 0)) {
                _context6.next = 11;
                break;
              }

              _context6.next = 11;
              return;

            case 11:
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];

            case 12:
              i++;
              _context6.next = 7;
              break;

            case 15:
              _context6.next = 17;
              return;

            case 17:
              return _context6.delegateYield(LZString.decompress(buf.join("")), "t1", 18);

            case 18:
              return _context6.abrupt("return", _context6.t1);

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, decompressFromUint8Array);
    }),
    //compress into a string that is already URI encoded
    compressToEncodedURIComponent: /*#__PURE__*/regeneratorRuntime.mark(function compressToEncodedURIComponent(input) {
      return regeneratorRuntime.wrap(function compressToEncodedURIComponent$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(input === null)) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return", "");

            case 2:
              return _context7.delegateYield(LZString._compress(input, 6, function (a) {
                return keyStrUriSafe.charAt(a);
              }), "t0", 3);

            case 3:
              return _context7.abrupt("return", _context7.t0);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, compressToEncodedURIComponent);
    }),
    //decompress from an output of compressToEncodedURIComponent
    decompressFromEncodedURIComponent: /*#__PURE__*/regeneratorRuntime.mark(function decompressFromEncodedURIComponent(input) {
      return regeneratorRuntime.wrap(function decompressFromEncodedURIComponent$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(input === null)) {
                _context8.next = 2;
                break;
              }

              return _context8.abrupt("return", "");

            case 2:
              if (!(input === "")) {
                _context8.next = 4;
                break;
              }

              return _context8.abrupt("return", null);

            case 4:
              input = input.replace(/ /g, "+");
              return _context8.delegateYield(LZString._decompress(input.length, 32, function (index) {
                return getBaseValue(keyStrUriSafe, input.charAt(index));
              }), "t0", 6);

            case 6:
              return _context8.abrupt("return", _context8.t0);

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, decompressFromEncodedURIComponent);
    }),
    compress: /*#__PURE__*/regeneratorRuntime.mark(function compress(uncompressed) {
      return regeneratorRuntime.wrap(function compress$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.delegateYield(LZString._compress(uncompressed, 16, function (a) {
                return f(a);
              }), "t0", 1);

            case 1:
              return _context9.abrupt("return", _context9.t0);

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, compress);
    }),
    _compress: /*#__PURE__*/regeneratorRuntime.mark(function _compress(uncompressed, bitsPerChar, getCharFromInt) {
      var i, value, context_dictionary, context_dictionaryToCreate, context_c, context_wc, context_w, context_enlargeIn, context_dictSize, context_numBits, context_data, context_data_val, context_data_position, ii;
      return regeneratorRuntime.wrap(function _compress$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!(uncompressed === null)) {
                _context10.next = 2;
                break;
              }

              return _context10.abrupt("return", "");

            case 2:
              context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0;
              ii = 0;

            case 4:
              if (!(ii < uncompressed.length)) {
                _context10.next = 15;
                break;
              }

              if (!((ii & YIELD_MASK) === 0)) {
                _context10.next = 8;
                break;
              }

              _context10.next = 8;
              return;

            case 8:
              context_c = uncompressed.charAt(ii);

              if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                context_dictionary[context_c] = context_dictSize++;
                context_dictionaryToCreate[context_c] = true;
              }

              context_wc = context_w + context_c;

              if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                context_w = context_wc;
              } else {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                  if (context_w.charCodeAt(0) < 256) {
                    for (i = 0; i < context_numBits; i++) {
                      context_data_val = context_data_val << 1;

                      if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }
                    }

                    value = context_w.charCodeAt(0);

                    for (i = 0; i < 8; i++) {
                      context_data_val = context_data_val << 1 | value & 1;

                      if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }

                      value = value >> 1;
                    }
                  } else {
                    value = 1;

                    for (i = 0; i < context_numBits; i++) {
                      context_data_val = context_data_val << 1 | value;

                      if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }

                      value = 0;
                    }

                    value = context_w.charCodeAt(0);

                    for (i = 0; i < 16; i++) {
                      context_data_val = context_data_val << 1 | value & 1;

                      if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }

                      value = value >> 1;
                    }
                  }

                  context_enlargeIn--;

                  if (context_enlargeIn === 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                  }

                  delete context_dictionaryToCreate[context_w];
                } else {
                  value = context_dictionary[context_w];

                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value & 1;

                    if (context_data_position === bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }

                    value = value >> 1;
                  }
                }

                context_enlargeIn--;

                if (context_enlargeIn === 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                } // Add wc to the dictionary.


                context_dictionary[context_wc] = context_dictSize++;
                context_w = String(context_c);
              }

            case 12:
              ii += 1;
              _context10.next = 4;
              break;

            case 15:
              // Output the code for w.
              if (context_w !== "") {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                  if (context_w.charCodeAt(0) < 256) {
                    for (i = 0; i < context_numBits; i++) {
                      context_data_val = context_data_val << 1;

                      if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }
                    }

                    value = context_w.charCodeAt(0);

                    for (i = 0; i < 8; i++) {
                      context_data_val = context_data_val << 1 | value & 1;

                      if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }

                      value = value >> 1;
                    }
                  } else {
                    value = 1;

                    for (i = 0; i < context_numBits; i++) {
                      context_data_val = context_data_val << 1 | value;

                      if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }

                      value = 0;
                    }

                    value = context_w.charCodeAt(0);

                    for (i = 0; i < 16; i++) {
                      context_data_val = context_data_val << 1 | value & 1;

                      if (context_data_position === bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }

                      value = value >> 1;
                    }
                  }

                  context_enlargeIn--;

                  if (context_enlargeIn === 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                  }

                  delete context_dictionaryToCreate[context_w];
                } else {
                  value = context_dictionary[context_w];

                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value & 1;

                    if (context_data_position === bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }

                    value = value >> 1;
                  }
                }

                context_enlargeIn--;

                if (context_enlargeIn === 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
              } // Mark the end of the stream


              value = 2;

              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;

                if (context_data_position === bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }

                value = value >> 1;
              }

              _context10.next = 20;
              return;

            case 20:
              if (!true) {
                _context10.next = 30;
                break;
              }

              context_data_val = context_data_val << 1;

              if (!(context_data_position === bitsPerChar - 1)) {
                _context10.next = 27;
                break;
              }

              context_data.push(getCharFromInt(context_data_val));
              return _context10.abrupt("break", 30);

            case 27:
              context_data_position++;

            case 28:
              _context10.next = 20;
              break;

            case 30:
              _context10.next = 32;
              return;

            case 32:
              return _context10.abrupt("return", context_data.join(""));

            case 33:
            case "end":
              return _context10.stop();
          }
        }
      }, _compress);
    }),
    decompress: /*#__PURE__*/regeneratorRuntime.mark(function decompress(compressed) {
      return regeneratorRuntime.wrap(function decompress$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (!(compressed === null)) {
                _context11.next = 2;
                break;
              }

              return _context11.abrupt("return", "");

            case 2:
              if (!(compressed === "")) {
                _context11.next = 4;
                break;
              }

              return _context11.abrupt("return", null);

            case 4:
              return _context11.delegateYield(LZString._decompress(compressed.length, 32768, function (index) {
                return compressed.charCodeAt(index);
              }), "t0", 5);

            case 5:
              return _context11.abrupt("return", _context11.t0);

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, decompress);
    }),
    _decompress: /*#__PURE__*/regeneratorRuntime.mark(function _decompress(length, resetValue, getNextValue) {
      var dictionary, enlargeIn, dictSize, numBits, entry, result, i, w, bits, resb, maxpower, power, c, data, ic;
      return regeneratorRuntime.wrap(function _decompress$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], data = {
                val: getNextValue(0),
                position: resetValue,
                index: 1
              };

              for (i = 0; i < 3; i += 1) {
                dictionary[i] = i;
              }

              bits = 0;
              maxpower = Math.pow(2, 2);
              power = 1;

              while (power !== maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;

                if (data.position === 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }

                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }

              _context12.t0 = bits;
              _context12.next = _context12.t0 === 0 ? 9 : _context12.t0 === 1 ? 15 : _context12.t0 === 2 ? 21 : 22;
              break;

            case 9:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;

              while (power !== maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;

                if (data.position === 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }

                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }

              c = f(bits);
              return _context12.abrupt("break", 23);

            case 15:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;

              while (power !== maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;

                if (data.position === 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }

                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }

              c = f(bits);
              return _context12.abrupt("break", 23);

            case 21:
              return _context12.abrupt("return", "");

            case 22:
              return _context12.abrupt("break", 23);

            case 23:
              dictionary[3] = c;
              w = c;
              result.push(c);
              ic = 0;

            case 27:
              if (!true) {
                _context12.next = 75;
                break;
              }

              if (!((ic++ & YIELD_MASK) === 0)) {
                _context12.next = 31;
                break;
              }

              _context12.next = 31;
              return;

            case 31:
              if (!(data.index > length)) {
                _context12.next = 33;
                break;
              }

              return _context12.abrupt("return", "");

            case 33:
              bits = 0;
              maxpower = Math.pow(2, numBits);
              power = 1;

              while (power !== maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;

                if (data.position === 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }

                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }

              _context12.t1 = c = bits;
              _context12.next = _context12.t1 === 0 ? 40 : _context12.t1 === 1 ? 48 : _context12.t1 === 2 ? 56 : 57;
              break;

            case 40:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;

              while (power !== maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;

                if (data.position === 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }

                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }

              dictionary[dictSize++] = f(bits);
              c = dictSize - 1;
              enlargeIn--;
              return _context12.abrupt("break", 58);

            case 48:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;

              while (power !== maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;

                if (data.position === 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }

                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }

              dictionary[dictSize++] = f(bits);
              c = dictSize - 1;
              enlargeIn--;
              return _context12.abrupt("break", 58);

            case 56:
              return _context12.abrupt("return", result.join(""));

            case 57:
              return _context12.abrupt("break", 58);

            case 58:
              if (enlargeIn === 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
              }

              if (!dictionary[c]) {
                _context12.next = 63;
                break;
              }

              entry = dictionary[c];
              _context12.next = 68;
              break;

            case 63:
              if (!(c === dictSize)) {
                _context12.next = 67;
                break;
              }

              entry = w + w.charAt(0);
              _context12.next = 68;
              break;

            case 67:
              return _context12.abrupt("return", null);

            case 68:
              result.push(entry); // Add w+entry[0] to the dictionary.

              dictionary[dictSize++] = w + entry.charAt(0);
              enlargeIn--;
              w = entry;

              if (enlargeIn === 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
              }

              _context12.next = 27;
              break;

            case 75:
            case "end":
              return _context12.stop();
          }
        }
      }, _decompress);
    })
  };
  return LZString;
}();

exports.LZStringGenerator = LZStringGenerator;