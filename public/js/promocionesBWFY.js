(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * Compressor.js v1.0.6
 * https://fengyuanchen.github.io/compressorjs
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-11-23T04:43:12.442Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Compressor = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var canvasToBlob = createCommonjsModule(function (module) {
    if (typeof window === 'undefined') {
      return;
    }

    (function (window) {

      var CanvasPrototype = window.HTMLCanvasElement && window.HTMLCanvasElement.prototype;

      var hasBlobConstructor = window.Blob && function () {
        try {
          return Boolean(new Blob());
        } catch (e) {
          return false;
        }
      }();

      var hasArrayBufferViewSupport = hasBlobConstructor && window.Uint8Array && function () {
        try {
          return new Blob([new Uint8Array(100)]).size === 100;
        } catch (e) {
          return false;
        }
      }();

      var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
      var dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;

      var dataURLtoBlob = (hasBlobConstructor || BlobBuilder) && window.atob && window.ArrayBuffer && window.Uint8Array && function (dataURI) {
        var matches, mediaType, isBase64, dataString, byteString, arrayBuffer, intArray, i, bb; // Parse the dataURI components as per RFC 2397

        matches = dataURI.match(dataURIPattern);

        if (!matches) {
          throw new Error('invalid data URI');
        } // Default to text/plain;charset=US-ASCII


        mediaType = matches[2] ? matches[1] : 'text/plain' + (matches[3] || ';charset=US-ASCII');
        isBase64 = !!matches[4];
        dataString = dataURI.slice(matches[0].length);

        if (isBase64) {
          // Convert base64 to raw binary data held in a string:
          byteString = atob(dataString);
        } else {
          // Convert base64/URLEncoded data component to raw binary:
          byteString = decodeURIComponent(dataString);
        } // Write the bytes of the string to an ArrayBuffer:


        arrayBuffer = new ArrayBuffer(byteString.length);
        intArray = new Uint8Array(arrayBuffer);

        for (i = 0; i < byteString.length; i += 1) {
          intArray[i] = byteString.charCodeAt(i);
        } // Write the ArrayBuffer (or ArrayBufferView) to a blob:


        if (hasBlobConstructor) {
          return new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], {
            type: mediaType
          });
        }

        bb = new BlobBuilder();
        bb.append(arrayBuffer);
        return bb.getBlob(mediaType);
      };

      if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
        if (CanvasPrototype.mozGetAsFile) {
          CanvasPrototype.toBlob = function (callback, type, quality) {
            var self = this;
            setTimeout(function () {
              if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
                callback(dataURLtoBlob(self.toDataURL(type, quality)));
              } else {
                callback(self.mozGetAsFile('blob', type));
              }
            });
          };
        } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
          CanvasPrototype.toBlob = function (callback, type, quality) {
            var self = this;
            setTimeout(function () {
              callback(dataURLtoBlob(self.toDataURL(type, quality)));
            });
          };
        }
      }

      if ( module.exports) {
        module.exports = dataURLtoBlob;
      } else {
        window.dataURLtoBlob = dataURLtoBlob;
      }
    })(window);
  });

  var isBlob = function isBlob(input) {
    if (typeof Blob === 'undefined') {
      return false;
    }

    return input instanceof Blob || Object.prototype.toString.call(input) === '[object Blob]';
  };

  var DEFAULTS = {
    /**
     * Indicates if output the original image instead of the compressed one
     * when the size of the compressed image is greater than the original one's
     * @type {boolean}
     */
    strict: true,

    /**
     * Indicates if read the image's Exif Orientation information,
     * and then rotate or flip the image automatically.
     * @type {boolean}
     */
    checkOrientation: true,

    /**
     * The max width of the output image.
     * @type {number}
     */
    maxWidth: Infinity,

    /**
     * The max height of the output image.
     * @type {number}
     */
    maxHeight: Infinity,

    /**
     * The min width of the output image.
     * @type {number}
     */
    minWidth: 0,

    /**
     * The min height of the output image.
     * @type {number}
     */
    minHeight: 0,

    /**
     * The width of the output image.
     * If not specified, the natural width of the source image will be used.
     * @type {number}
     */
    width: undefined,

    /**
     * The height of the output image.
     * If not specified, the natural height of the source image will be used.
     * @type {number}
     */
    height: undefined,

    /**
     * The quality of the output image.
     * It must be a number between `0` and `1`,
     * and only available for `image/jpeg` and `image/webp` images.
     * Check out {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob canvas.toBlob}.
     * @type {number}
     */
    quality: 0.8,

    /**
     * The mime type of the output image.
     * By default, the original mime type of the source image file will be used.
     * @type {string}
     */
    mimeType: 'auto',

    /**
     * PNG files over this value (5 MB by default) will be converted to JPEGs.
     * To disable this, just set the value to `Infinity`.
     * @type {number}
     */
    convertSize: 5000000,

    /**
     * The hook function to execute before draw the image into the canvas for compression.
     * @type {Function}
     * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
     * @param {HTMLCanvasElement} canvas - The canvas for compression.
     * @example
     * function (context, canvas) {
     *   context.fillStyle = '#fff';
     * }
     */
    beforeDraw: null,

    /**
     * The hook function to execute after drew the image into the canvas for compression.
     * @type {Function}
     * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
     * @param {HTMLCanvasElement} canvas - The canvas for compression.
     * @example
     * function (context, canvas) {
     *   context.filter = 'grayscale(100%)';
     * }
     */
    drew: null,

    /**
     * The hook function to execute when success to compress the image.
     * @type {Function}
     * @param {File} file - The compressed image File object.
     * @example
     * function (file) {
     *   console.log(file);
     * }
     */
    success: null,

    /**
     * The hook function to execute when fail to compress the image.
     * @type {Function}
     * @param {Error} err - An Error object.
     * @example
     * function (err) {
     *   console.log(err.message);
     * }
     */
    error: null
  };

  var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  var WINDOW = IS_BROWSER ? window : {};

  var slice = Array.prototype.slice;
  /**
   * Convert array-like or iterable object to an array.
   * @param {*} value - The value to convert.
   * @returns {Array} Returns a new array.
   */

  function toArray(value) {
    return Array.from ? Array.from(value) : slice.call(value);
  }
  var REGEXP_IMAGE_TYPE = /^image\/.+$/;
  /**
   * Check if the given value is a mime type of image.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given is a mime type of image, else `false`.
   */

  function isImageType(value) {
    return REGEXP_IMAGE_TYPE.test(value);
  }
  /**
   * Convert image type to extension.
   * @param {string} value - The image type to convert.
   * @returns {boolean} Returns the image extension.
   */

  function imageTypeToExtension(value) {
    var extension = isImageType(value) ? value.substr(6) : '';

    if (extension === 'jpeg') {
      extension = 'jpg';
    }

    return ".".concat(extension);
  }
  var fromCharCode = String.fromCharCode;
  /**
   * Get string from char code in data view.
   * @param {DataView} dataView - The data view for read.
   * @param {number} start - The start index.
   * @param {number} length - The read length.
   * @returns {string} The read result.
   */

  function getStringFromCharCode(dataView, start, length) {
    var str = '';
    var i;
    length += start;

    for (i = start; i < length; i += 1) {
      str += fromCharCode(dataView.getUint8(i));
    }

    return str;
  }
  var btoa = WINDOW.btoa;
  /**
   * Transform array buffer to Data URL.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
   * @param {string} mimeType - The mime type of the Data URL.
   * @returns {string} The result Data URL.
   */

  function arrayBufferToDataURL(arrayBuffer, mimeType) {
    var chunks = [];
    var chunkSize = 8192;
    var uint8 = new Uint8Array(arrayBuffer);

    while (uint8.length > 0) {
      // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
      // eslint-disable-next-line prefer-spread
      chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
      uint8 = uint8.subarray(chunkSize);
    }

    return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join('')));
  }
  /**
   * Get orientation value from given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
   * @returns {number} The read orientation value.
   */

  function resetAndGetOrientation(arrayBuffer) {
    var dataView = new DataView(arrayBuffer);
    var orientation; // Ignores range error when the image does not have correct Exif information

    try {
      var littleEndian;
      var app1Start;
      var ifdStart; // Only handle JPEG image (start by 0xFFD8)

      if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
        var length = dataView.byteLength;
        var offset = 2;

        while (offset + 1 < length) {
          if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
            app1Start = offset;
            break;
          }

          offset += 1;
        }
      }

      if (app1Start) {
        var exifIDCode = app1Start + 4;
        var tiffOffset = app1Start + 10;

        if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
          var endianness = dataView.getUint16(tiffOffset);
          littleEndian = endianness === 0x4949;

          if (littleEndian || endianness === 0x4D4D
          /* bigEndian */
          ) {
              if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
                var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

                if (firstIFDOffset >= 0x00000008) {
                  ifdStart = tiffOffset + firstIFDOffset;
                }
              }
            }
        }
      }

      if (ifdStart) {
        var _length = dataView.getUint16(ifdStart, littleEndian);

        var _offset;

        var i;

        for (i = 0; i < _length; i += 1) {
          _offset = ifdStart + i * 12 + 2;

          if (dataView.getUint16(_offset, littleEndian) === 0x0112
          /* Orientation */
          ) {
              // 8 is the offset of the current tag's value
              _offset += 8; // Get the original orientation value

              orientation = dataView.getUint16(_offset, littleEndian); // Override the orientation with its default value

              dataView.setUint16(_offset, 1, littleEndian);
              break;
            }
        }
      }
    } catch (e) {
      orientation = 1;
    }

    return orientation;
  }
  /**
   * Parse Exif Orientation value.
   * @param {number} orientation - The orientation to parse.
   * @returns {Object} The parsed result.
   */

  function parseOrientation(orientation) {
    var rotate = 0;
    var scaleX = 1;
    var scaleY = 1;

    switch (orientation) {
      // Flip horizontal
      case 2:
        scaleX = -1;
        break;
      // Rotate left 180°

      case 3:
        rotate = -180;
        break;
      // Flip vertical

      case 4:
        scaleY = -1;
        break;
      // Flip vertical and rotate right 90°

      case 5:
        rotate = 90;
        scaleY = -1;
        break;
      // Rotate right 90°

      case 6:
        rotate = 90;
        break;
      // Flip horizontal and rotate right 90°

      case 7:
        rotate = 90;
        scaleX = -1;
        break;
      // Rotate left 90°

      case 8:
        rotate = -90;
        break;
    }

    return {
      rotate: rotate,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }
  var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
  /**
   * Normalize decimal number.
   * Check out {@link https://0.30000000000000004.com/}
   * @param {number} value - The value to normalize.
   * @param {number} [times=100000000000] - The times for normalizing.
   * @returns {number} Returns the normalized number.
   */

  function normalizeDecimalNumber(value) {
    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;
    return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
  }

  var ArrayBuffer$1 = WINDOW.ArrayBuffer,
      FileReader = WINDOW.FileReader;
  var URL = WINDOW.URL || WINDOW.webkitURL;
  var REGEXP_EXTENSION = /\.\w+$/;
  var AnotherCompressor = WINDOW.Compressor;
  /**
   * Creates a new image compressor.
   * @class
   */

  var Compressor =
  /*#__PURE__*/
  function () {
    /**
     * The constructor of Compressor.
     * @param {File|Blob} file - The target image file for compressing.
     * @param {Object} [options] - The options for compressing.
     */
    function Compressor(file, options) {
      _classCallCheck(this, Compressor);

      this.file = file;
      this.image = new Image();
      this.options = _objectSpread2({}, DEFAULTS, {}, options);
      this.aborted = false;
      this.result = null;
      this.init();
    }

    _createClass(Compressor, [{
      key: "init",
      value: function init() {
        var _this = this;

        var file = this.file,
            options = this.options;

        if (!isBlob(file)) {
          this.fail(new Error('The first argument must be a File or Blob object.'));
          return;
        }

        var mimeType = file.type;

        if (!isImageType(mimeType)) {
          this.fail(new Error('The first argument must be an image File or Blob object.'));
          return;
        }

        if (!URL || !FileReader) {
          this.fail(new Error('The current browser does not support image compression.'));
          return;
        }

        if (!ArrayBuffer$1) {
          options.checkOrientation = false;
        }

        if (URL && !options.checkOrientation) {
          this.load({
            url: URL.createObjectURL(file)
          });
        } else {
          var reader = new FileReader();
          var checkOrientation = options.checkOrientation && mimeType === 'image/jpeg';
          this.reader = reader;

          reader.onload = function (_ref) {
            var target = _ref.target;
            var result = target.result;
            var data = {};

            if (checkOrientation) {
              // Reset the orientation value to its default value 1
              // as some iOS browsers will render image with its orientation
              var orientation = resetAndGetOrientation(result);

              if (orientation > 1 || !URL) {
                // Generate a new URL which has the default orientation value
                data.url = arrayBufferToDataURL(result, mimeType);

                if (orientation > 1) {
                  _extends(data, parseOrientation(orientation));
                }
              } else {
                data.url = URL.createObjectURL(file);
              }
            } else {
              data.url = result;
            }

            _this.load(data);
          };

          reader.onabort = function () {
            _this.fail(new Error('Aborted to read the image with FileReader.'));
          };

          reader.onerror = function () {
            _this.fail(new Error('Failed to read the image with FileReader.'));
          };

          reader.onloadend = function () {
            _this.reader = null;
          };

          if (checkOrientation) {
            reader.readAsArrayBuffer(file);
          } else {
            reader.readAsDataURL(file);
          }
        }
      }
    }, {
      key: "load",
      value: function load(data) {
        var _this2 = this;

        var file = this.file,
            image = this.image;

        image.onload = function () {
          _this2.draw(_objectSpread2({}, data, {
            naturalWidth: image.naturalWidth,
            naturalHeight: image.naturalHeight
          }));
        };

        image.onabort = function () {
          _this2.fail(new Error('Aborted to load the image.'));
        };

        image.onerror = function () {
          _this2.fail(new Error('Failed to load the image.'));
        }; // Match all browsers that use WebKit as the layout engine in iOS devices,
        // such as Safari for iOS, Chrome for iOS, and in-app browsers.


        if (WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent)) {
          // Fix the `The operation is insecure` error (#57)
          image.crossOrigin = 'anonymous';
        }

        image.alt = file.name;
        image.src = data.url;
      }
    }, {
      key: "draw",
      value: function draw(_ref2) {
        var _this3 = this;

        var naturalWidth = _ref2.naturalWidth,
            naturalHeight = _ref2.naturalHeight,
            _ref2$rotate = _ref2.rotate,
            rotate = _ref2$rotate === void 0 ? 0 : _ref2$rotate,
            _ref2$scaleX = _ref2.scaleX,
            scaleX = _ref2$scaleX === void 0 ? 1 : _ref2$scaleX,
            _ref2$scaleY = _ref2.scaleY,
            scaleY = _ref2$scaleY === void 0 ? 1 : _ref2$scaleY;
        var file = this.file,
            image = this.image,
            options = this.options;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var aspectRatio = naturalWidth / naturalHeight;
        var is90DegreesRotated = Math.abs(rotate) % 180 === 90;
        var maxWidth = Math.max(options.maxWidth, 0) || Infinity;
        var maxHeight = Math.max(options.maxHeight, 0) || Infinity;
        var minWidth = Math.max(options.minWidth, 0) || 0;
        var minHeight = Math.max(options.minHeight, 0) || 0;
        var width = Math.max(options.width, 0) || naturalWidth;
        var height = Math.max(options.height, 0) || naturalHeight;

        if (is90DegreesRotated) {
          var _ref3 = [maxHeight, maxWidth];
          maxWidth = _ref3[0];
          maxHeight = _ref3[1];
          var _ref4 = [minHeight, minWidth];
          minWidth = _ref4[0];
          minHeight = _ref4[1];
          var _ref5 = [height, width];
          width = _ref5[0];
          height = _ref5[1];
        }

        if (maxWidth < Infinity && maxHeight < Infinity) {
          if (maxHeight * aspectRatio > maxWidth) {
            maxHeight = maxWidth / aspectRatio;
          } else {
            maxWidth = maxHeight * aspectRatio;
          }
        } else if (maxWidth < Infinity) {
          maxHeight = maxWidth / aspectRatio;
        } else if (maxHeight < Infinity) {
          maxWidth = maxHeight * aspectRatio;
        }

        if (minWidth > 0 && minHeight > 0) {
          if (minHeight * aspectRatio > minWidth) {
            minHeight = minWidth / aspectRatio;
          } else {
            minWidth = minHeight * aspectRatio;
          }
        } else if (minWidth > 0) {
          minHeight = minWidth / aspectRatio;
        } else if (minHeight > 0) {
          minWidth = minHeight * aspectRatio;
        }

        if (height * aspectRatio > width) {
          height = width / aspectRatio;
        } else {
          width = height * aspectRatio;
        }

        width = Math.floor(normalizeDecimalNumber(Math.min(Math.max(width, minWidth), maxWidth)));
        height = Math.floor(normalizeDecimalNumber(Math.min(Math.max(height, minHeight), maxHeight)));
        var destX = -width / 2;
        var destY = -height / 2;
        var destWidth = width;
        var destHeight = height;

        if (is90DegreesRotated) {
          var _ref6 = [height, width];
          width = _ref6[0];
          height = _ref6[1];
        }

        canvas.width = width;
        canvas.height = height;

        if (!isImageType(options.mimeType)) {
          options.mimeType = file.type;
        }

        var fillStyle = 'transparent'; // Converts PNG files over the `convertSize` to JPEGs.

        if (file.size > options.convertSize && options.mimeType === 'image/png') {
          fillStyle = '#fff';
          options.mimeType = 'image/jpeg';
        } // Override the default fill color (#000, black)


        context.fillStyle = fillStyle;
        context.fillRect(0, 0, width, height);

        if (options.beforeDraw) {
          options.beforeDraw.call(this, context, canvas);
        }

        if (this.aborted) {
          return;
        }

        context.save();
        context.translate(width / 2, height / 2);
        context.rotate(rotate * Math.PI / 180);
        context.scale(scaleX, scaleY);
        context.drawImage(image, destX, destY, destWidth, destHeight);
        context.restore();

        if (options.drew) {
          options.drew.call(this, context, canvas);
        }

        if (this.aborted) {
          return;
        }

        var done = function done(result) {
          if (!_this3.aborted) {
            _this3.done({
              naturalWidth: naturalWidth,
              naturalHeight: naturalHeight,
              result: result
            });
          }
        };

        if (canvas.toBlob) {
          canvas.toBlob(done, options.mimeType, options.quality);
        } else {
          done(canvasToBlob(canvas.toDataURL(options.mimeType, options.quality)));
        }
      }
    }, {
      key: "done",
      value: function done(_ref7) {
        var naturalWidth = _ref7.naturalWidth,
            naturalHeight = _ref7.naturalHeight,
            result = _ref7.result;
        var file = this.file,
            image = this.image,
            options = this.options;

        if (URL && !options.checkOrientation) {
          URL.revokeObjectURL(image.src);
        }

        if (result) {
          // Returns original file if the result is greater than it and without size related options
          if (options.strict && result.size > file.size && options.mimeType === file.type && !(options.width > naturalWidth || options.height > naturalHeight || options.minWidth > naturalWidth || options.minHeight > naturalHeight)) {
            result = file;
          } else {
            var date = new Date();
            result.lastModified = date.getTime();
            result.lastModifiedDate = date;
            result.name = file.name; // Convert the extension to match its type

            if (result.name && result.type !== file.type) {
              result.name = result.name.replace(REGEXP_EXTENSION, imageTypeToExtension(result.type));
            }
          }
        } else {
          // Returns original file if the result is null in some cases.
          result = file;
        }

        this.result = result;

        if (options.success) {
          options.success.call(this, result);
        }
      }
    }, {
      key: "fail",
      value: function fail(err) {
        var options = this.options;

        if (options.error) {
          options.error.call(this, err);
        } else {
          throw err;
        }
      }
    }, {
      key: "abort",
      value: function abort() {
        if (!this.aborted) {
          this.aborted = true;

          if (this.reader) {
            this.reader.abort();
          } else if (!this.image.complete) {
            this.image.onload = null;
            this.image.onabort();
          } else {
            this.fail(new Error('The compression process has been aborted.'));
          }
        }
      }
      /**
       * Get the no conflict compressor class.
       * @returns {Compressor} The compressor class.
       */

    }], [{
      key: "noConflict",
      value: function noConflict() {
        window.Compressor = AnotherCompressor;
        return Compressor;
      }
      /**
       * Change the default options.
       * @param {Object} options - The new default options.
       */

    }, {
      key: "setDefaults",
      value: function setDefaults(options) {
        _extends(DEFAULTS, options);
      }
    }]);

    return Compressor;
  }();

  return Compressor;

})));

},{}],2:[function(require,module,exports){
const compressor = require('compressorjs');
const btnBack = document.querySelector('.btn-back')
const btnEstabelecimientos = document.querySelector('.btn-establecimientos')
const btnPromociones = document.querySelector('.btn-promociones')
const btnLista = document.querySelector('.btn-lista')
const btnLogout = document.querySelector('.btn-logout')
const elems = document.querySelector('.drop-down-categories')
var establishment = document.querySelector('.drop-down-establishments')
const db = firebase.firestore()
const storage = firebase.storage().ref();
const promosList = document.querySelector('.promos-list')
const unavailablePromosList = document.querySelector('.unavailable-promos-list')
const alertContainer = document.querySelector('.alert-container')
const editContainer = document.getElementById("edit-container")
const editChartContainer = document.getElementById('edit-chart-container')
const deleteChartContainer = document.getElementById('delete-chart-container')
const closeButton = document.getElementById('close-button')
const closeAlert = document.querySelector('.close-alert-button')
const modifyButton = document.querySelector('.modify-button')
const promoTitle2 = document.getElementById('new-promo-title')
const promoDescription = document.getElementById('new-promo-description')
const modificationFilePath = document.getElementById('modification-file-path')
const closeDeleteChart = document.querySelector('.close-delete-chart')
const lockPromo = document.querySelector('.lock-promo')
var filePath = document.querySelector('.file-path')
var description = document.getElementById("promo-description")
var title = document.getElementById("promo-title")
const addPromotion = document.querySelector('.add-promotion')
const imageSubmit = document.querySelector('.image-submit')
let globalPromo;
var unavailableStatement = document.querySelector('.unavailable-statement')
var selectedCategory = document.getElementById("selected-category")
var selectedEstablishment = document.getElementById("selected-establishment")

const confirmPromo = document.querySelector('.confirm-promo')
const closeConfirmationChart = document.querySelector('.close-confirmation-chart')

const confirmationContainer = document.querySelector('.confirmation-container')

const titleContainer = document.querySelector('.title-container')

var promoId = []


const modificationPromoSubmit = document.querySelector('.modification-promo-submit')
let collectionPath
let subCollectionPath

let setColor;
let companyImage;
const colorRequest = document.querySelectorAll('.color')


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      emailAddress = user.email;
      console.log(emailAddress)
      if(emailAddress.includes("credicomer")){
          collectionPath="alliance";
          subCollectionPath="promotions"; 
          setColor = 'green'
          companyImage = "img/Logo_Credicomer.svg"

      }
      else{
          collectionPath='alliance_unicomer';
          subCollectionPath="promotions_unicomer";  
          setColor = '#2271B3'
          companyImage = "img/logo_unicomer.svg"
      }
  }
  else{
      window.location.href = "index.html";
  }
  getCategories()
  console.log(collectionPath)
  console.log(subCollectionPath)
  changeColor(setColor)
  setImage(companyImage)
});

function setImage(image){
  var companyLogo = document.querySelector('.company-logo')
  companyLogo.src = image
}


function changeColor(color){
  colorRequest.forEach(e => {
    e.style.backgroundColor = color
  })
}


    btnLogout.addEventListener('click', e => {
      logout()
    })

    function logout(){
      firebase.auth().signOut();
      window.location.href = "index.html";
    };


    btnBack.addEventListener('click', e =>{
           window.location.href = "prueba.html"
    });

    btnEstabelecimientos.addEventListener('click', e =>{
        window.location.href = "establecimientos.html"
    });

    btnPromociones.addEventListener('click', e =>{
        window.location.href = "promociones.html"
    });

    btnLista.addEventListener('click', e =>{
        window.location.href = "lista.html"
    });

    document.addEventListener('DOMContentLoaded', e => {
        var elements = document.querySelectorAll('select');
        var options = document.querySelectorAll('option')
        M.FormSelect.init(elements);
    });

    function getCategories(){
      db.collection(collectionPath).get().then((query) =>{
        query.forEach((element) => {
            console.log(element.id)
            fillDropDown(element.id)
            var elements = document.querySelectorAll('select');
            var options = document.querySelectorAll('option')
            M.FormSelect.init(elements, options);
        });
    });
    }

    function getEstablishment(category){
        establishment.innerHTML = ''
        db.collection(collectionPath).doc(category).collection("establishments").get().then(query => {
            query.forEach(element =>{
                var obj = element.data()
                if(obj.estado){
                  fillDropDownEstablishment(obj.establishment, element.id)
                  var elements = document.querySelectorAll('select');
                  var options = document.querySelectorAll('option')
                  M.FormSelect.init(elements, options);
                }
            })
        })
    }

    function getPromos(category, establishmentId){
      promoId = []
        db.collection(collectionPath).doc(category).collection('establishments').doc(establishmentId).collection(subCollectionPath).get().then(query =>{
            promosList.innerHTML = ""
            var i = 0
            query.forEach(docData =>{

                var doc = docData.data();
                var description = doc.description
                promoId.push(doc.promotion_id)
                fillPromos(doc.promotion_name, description, doc.rating_avg, doc.image)
                actionsDelete = document.querySelectorAll('.actions-delete')
                actionEdit = document.querySelectorAll('.actions-edit')
                console.log(i)
                console.log(doc.estado)
                
                if(doc.estado){       
                  actionsDelete[i].defaultChecked = true;
                  console.log(actionsDelete[i].checked) 
                }
                else{
                  actionEdit[i].disabled = true 
                  actionEdit[i].style.border = '1px gray solid'
                }
                promoTitle = document.querySelectorAll('.promo-title');
                promoDescrip = document.querySelectorAll('.promo-description')
                actionEdit.forEach((element, index) => {
                  element.addEventListener('click', e => {    
                      promoId = promoId[index]      
                      console.log(promoTitle[index])
                      console.log('edit: '+ promoTitle[index].textContent)
                      promoTitle2.value = promoTitle[index].textContent
                      promoDescription.value = promoDescrip[index].textContent
                      editContainer.style.display = "block"
                      editChartContainer.style.display = "block"
                  })
                })
                actionsDelete.forEach((actionDelete, index) =>{
                  actionDelete.addEventListener('change', e => {
                    if(actionDelete.defaultChecked) {
                      lockPromotion(promoId[index])
                      
                    } else {
                      unlockPromotion(promoId[index]) 
                    }
                  })
                })
              i++
            })
        });
    }

    function fillPromos(name, description, rating, imageUrl){
        promosList.innerHTML += 
        `<div class="col l12 m6 s6" style="padding-left: 50px; padding-right: 50px;">
          <div class="row card-panel">
          <div class="col s12" style="height: 200px; background-color: cadetblue; background-image: url(${imageUrl}); background-size: cover;">
          </div>
            <div class="col s12" style="border-bottom: black 1px solid;">
                <p style="color: black; font-weight: bold; font-size: 20px; margin-top:30px;" class="promo-title">${name}</p>
                <p style="color: ${setColor}; margin-top:10px; margin-bottom:10px;" class="promo-description">${description}</p>
                <div class="col s12" style="padding: 0px; margin-bottom:10px;">
                  <i class="material-icons prefix col s1" style="color: ${setColor};">star</i>
                  <p style="color: ${setColor};" class="col s2" href="">${rating}</p>
                  <a class="col s9" href="" style="color: ${setColor};">Ver comentarios...</a>
                </div>
            </div>
            <div class="col s12" style="padding-top: 20px;">
                <div class="col s5">
                    <div class="switch">
                        <label>
                          <!--Inactive-->
                          <input type="checkbox" class="actions-delete">
                          <span class="lever" ></span>
                          <!--Active-->
                        </label>
                      </div>
                </div>
                <div class="col s5 offset-s2">
                    <button class="waves-effect btn-flat actions-edit" style="border: #110256 1px solid; background-color: white; color: #110256;">Modificar</button>
                </div>
            </div>
          </div>                      
        </div>`
    }

    function fillUnavailablePromos(name, description){
        unavailablePromosList.innerHTML += 
        `<div class="col l12 m12 s12 establishment-item" style="border-left:black 3px solid; background-color: #FFFF;">
            <div class="col l6 ">
                <div class="promo-title" style="color: gray;">${name}</div>
            </div>
            <div class="offset-l2 col l2 actions-icons">
                <i class="actions-enable material-icons" style="height: 15px; line-height:15px; color: black;">lock_open</i>
            </div> 
            <div class="col l12"><div style="color: ${setColor};">${description}</div></div>
        </div>`
    }

 

    function fillDropDown(item){
        elems.innerHTML += `<option value=${item}>${item}</option>`;
    };

    function fillDropDownEstablishment(item, id){
        establishment.innerHTML += `<option value=${id}>${item}</option>`;
        console.log(elems.value)
        console.log(establishment.value)
        getPromos(elems.value, establishment.value)
    };

    elems.addEventListener('change', e=>{
        console.log(elems.value)
        getEstablishment(elems.value)
        console.log(elems.value)
        console.log(establishment.value)
    });

    establishment.addEventListener('change', e => {
        getPromos(elems.value, establishment.value)
        console.log(collectionPath)
    });

    closeButton.addEventListener('click', e => {
        editContainer.style.display = 'none'
        editChartContainer.style.display = 'none'
        modificationFilePath.value = ''

    })

    closeDeleteChart.addEventListener('click', e => {
        console.log('click')
        editContainer.style.display = 'none'
        deleteChartContainer.style.display = 'none'
    })

    lockPromo.addEventListener('click', e => {
        
    })

    function lockPromotion(id){
      console.log(id)
        var promRef = db.collection(collectionPath).doc(elems.value).collection('establishments').doc(establishment.value).collection(subCollectionPath).doc(id)
        return promRef.update({
            estado: false
        })
        .then(e => {
            console.log('la promocion fue desactivada exitosamente')
            alert('la promocion fue desactivada exitosamente')
            getPromos(elems.value, establishment.value)
        })
        .catch(error => {
          alert('something went wrong: ' + error)
          console.log('something went wrong: ' + error)
          getPromos(elems.value, establishment.value)
        })
      }

    function unlockPromotion(id){
      console.log(id)
      var promRef = db.collection(collectionPath).doc(elems.value).collection('establishments').doc(establishment.value).collection(subCollectionPath).doc(id)
      return promRef.update({
        estado: true
      })
      .then(e => {
        console.log('la promocion fue activada exitosamente')
        getPromos(elems.value, establishment.value)
        alert('la promocion fue activada exitosamente')
      })
      .catch(error => {
        getPromos(elems.value, establishment.value)
        alert('something went wrong: ' + error)
        console.log('something went wrong: ' + error)
      })
    }

    modificationPromoSubmit.addEventListener('change', e => {
        const reader = new FileReader();
        const file = e.target.files[0]
        globalPromo = file
        reader.readAsDataURL(file);
        console.log(globalPromo)
        console.log(reader)
    })

    
    modifyButton.addEventListener('click', e => {
        if(modificationFilePath == ''){
            loader.style.display = 'block'
            loaderBackground.style.display = 'block' 
            var newTitle = document.getElementById('new-promo-title')
            var newDescription = document.getElementById('new-promo-description')
            console.log(globalPromo)
            console.log(elems.value)
            console.log(establishment.value)
            console.log(promoId)
            const ref = storage.child('alliance-image/promotions/' + globalPromo.name)
            ref.put(globalPromo).then((snap) => {
                console.log("uploaded success");
                snap.ref.getDownloadURL().then(imageUrl =>{
                console.log(imageUrl)
                var promRef = db.collection(collectionPath).doc(elems.value).collection('establishments').doc(establishment.value).collection(subCollectionPath).doc(promoId)
                return promRef.update({
                    description: newDescription.value,
                    promotion_name: newTitle.value,
                    image:imageUrl
                })
                .then(e =>{
                    modificationFilePath = ''
                    loader.style.display = 'none'
                    loaderBackground.style.display = 'none'
                    console.log('the element was succesfully modified')
                    editContainer.style.display = 'none'
                    editChartContainer.style.display = 'none'
                    modificationFilePath.value = ''
                    alert('Actualizacion exitosa')
                    getPromos(elems.value, establishment.value)

                })
                .catch(error => {
                    modificationFilePath = ''
                    loader.style.display = 'none'
                    loaderBackground.style.display = 'none'
                    alert('UPSSS, something went wrong!' + error)
                })
            })
        })
        }
        else{
            loader.style.display = 'block'
            loaderBackground.style.display = 'block' 
            var newTitle = document.getElementById('new-promo-title')
            var newDescription = document.getElementById('new-promo-description')
            var promRef = db.collection(collectionPath).doc(elems.value).collection('establishments').doc(establishment.value).collection(subCollectionPath).doc(promoId)
            return promRef.update({
                description: newDescription.value,
                promotion_name: newTitle.value, 
            })
            .then(e =>{
                loader.style.display = 'none'
                loaderBackground.style.display = 'none'
                console.log('the element was succesfully modified')
                editContainer.style.display = 'none'
                editChartContainer.style.display = 'none'
                modificationFilePath.value = ''
                alert('Actualizacion exitosa')
                getPromos(elems.value, establishment.value)

            })
            .catch(error => {
                loader.style.display = 'none'
                loaderBackground.style.display = 'none'
                alert('UPSSS, something went wrong!' + error)
            })
        }
    });

    
   imageSubmit.addEventListener('change', e => {
        const reader = new FileReader();
        const file = e.target.files[0]
        globalPromo = file
        reader.readAsDataURL(file);
        console.log(globalPromo)
        console.log(reader)
       
    })

    

    addPromotion.addEventListener('click', e => {
        console.log(title.value)
        console.log(description.value)
        console.log(filePath.value)
        if(title.value != '' && description.value != '' && filePath.value != ''){
            selectedCategory.textContent = elems.value
            selectedEstablishment.textContent = establishment.value
            confirmationContainer.style.display = 'block'
            editContainer.style.display = 'block'
        }
        else{
            alertContainer.style.display = 'block'
            editContainer.style.display = 'block'
        }
    });

    closeAlert.addEventListener('click', e => {
        alertContainer.style.display = 'none'
            editContainer.style.display = 'none'
    })

    function addPromo(){

        loader.style.display = 'block'
        loaderBackground.style.display = 'block'
        const rating = {
            five: 0,
            four: 0,
            three: 0,
            two: 0,
            one: 0
        }
        const ref = storage.child('alliance-image/promotions/' + globalPromo.name)

        new compressor(globalPromo,{
            quality: 0.6,
            success(compressedImage) {
                console.log(`the result is -> ${JSON.stringify( compressedImage)}`);
                console.log(`the result size is -> ${compressedImage.size}`);
                ref.put(compressedImage).then((snap) => {
                    console.log("uploaded success");
                    snap.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        let promotion = {
                            estado: true,
                            date: new Date(),
                            description: description.value,
                            image: downloadURL,
                            rating: rating,
                            promotion_name: title.value,
                            rating_avg: 0
                        }
                        const requestJson = {
                            promotion: promotion,
                            category: elems.value,
                            establishment_id: establishment.value,
                            collectionPath:collectionPath,
                            subCollectionPath:subCollectionPath
                        }
                        console.log(promotion);
                        console.log(requestJson);
        
                        var addPromotion = firebase.functions().httpsCallable('callAddPromotion');
                        addPromotion(requestJson)
                        .then(function (result) {
                            loader.style.display = 'none'
                            loaderBackground.style.display = 'none'    
                            getPromos(elems.value, establishment.value)
                            description.value = ''
                            title.value = ''
                            filePath.value = ''
                            // Read result of the Cloud Function.
                            console.log("function called");
                            
                            alert("La Promocion fue agregada exitosamente")
                            // ...
                        })
                        .catch(error =>{
                            description = ''
                            title = ''
                            filePath = ''
                            alert('something went wrong: ' + error)
                            loader.style.display = 'none'
                            loaderBackground.style.display = 'none'
                        });
                    });
                });
             
            }

        });
   
    }

    closeConfirmationChart.addEventListener('click', e => {
        confirmationContainer.style.display = 'none'
        editContainer.style.display = 'none'
    })

    confirmPromo.addEventListener('click', e => {
      confirmationContainer.style.display = 'none'
      editContainer.style.display = 'none'
      addPromo()
    })
  const loader = document.querySelector('.loader')
  const loaderBackground = document.querySelector('.loader-background')
},{"compressorjs":1}]},{},[2]);
