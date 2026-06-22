var __BUNDLE_START_TIME__=globalThis.nativePerformanceNow?nativePerformanceNow():Date.now(),__DEV__=false,process=globalThis.process||{},__METRO_GLOBAL_PREFIX__='';process.env=process.env||{};process.env.NODE_ENV=process.env.NODE_ENV||"production";
(function (global) {
  'use strict';

  if (!global[`${__METRO_GLOBAL_PREFIX__}__d`]) {
    global.__r = metroRequire;
    global[`${__METRO_GLOBAL_PREFIX__}__d`] = define;
    global.__c = clear;
    global.__registerSegment = registerSegment;
  }
  var modules = clear();
  const EMPTY = {};
  const CYCLE_DETECTED = {};
  const {
    hasOwnProperty
  } = {};
  function clear() {
    modules = new Map();
    return modules;
  }
  function define(factory, moduleId, dependencyMap) {
    if (modules.has(moduleId)) {
      return;
    }
    const mod = {
      dependencyMap,
      factory,
      hasError: false,
      importedAll: EMPTY,
      importedDefault: EMPTY,
      isInitialized: false,
      publicModule: {
        exports: {}
      }
    };
    modules.set(moduleId, mod);
  }
  function metroRequire(moduleId, moduleIdHint) {
    if (moduleId === null) {
      throw new Error('Cannot find module');
    }
    const module = modules.get(moduleId);
    return module && module.isInitialized ? module.publicModule.exports : guardedLoadModule(moduleId, module, moduleIdHint);
  }
  function metroImportDefault(moduleId, moduleIdHint) {
    var _modules_get;
    if (modules.has(moduleId) && ((_modules_get = modules.get(moduleId)) == null ? undefined : _modules_get.importedDefault) !== EMPTY) {
      return modules.get(moduleId).importedDefault;
    }
    const exports = metroRequire(moduleId, moduleIdHint);
    const importedDefault = exports && exports.__esModule ? exports.default : exports;
    return modules.get(moduleId).importedDefault = importedDefault;
  }
  metroRequire.importDefault = metroImportDefault;
  function metroImportAll(moduleId, moduleIdHint) {
    var _modules_get;
    if (modules.has(moduleId) && ((_modules_get = modules.get(moduleId)) == null ? undefined : _modules_get.importedAll) !== EMPTY) {
      return modules.get(moduleId).importedAll;
    }
    const exports = metroRequire(moduleId, moduleIdHint);
    let importedAll;
    if (exports && exports.__esModule) {
      importedAll = exports;
    } else {
      importedAll = {};
      if (exports) {
        for (const key in exports) {
          if (hasOwnProperty.call(exports, key)) {
            importedAll[key] = exports[key];
          }
        }
      }
      importedAll.default = exports;
    }
    return modules.get(moduleId).importedAll = importedAll;
  }
  metroRequire[Symbol.for('expo.require')] = true;
  metroRequire.importAll = metroImportAll;
  metroRequire.context = function fallbackRequireContext() {
    throw new Error('The experimental Metro feature `require.context` is not enabled in your project.');
  };
  metroRequire.resolveWeak = function fallbackRequireResolveWeak() {
    throw new Error('require.resolveWeak cannot be called dynamically.');
  };
  metroRequire.unguarded = function requireUnguarded(moduleId, moduleIdHint) {
    const module = modules.get(moduleId);
    return module && module.isInitialized ? module.publicModule.exports : loadModuleImplementation(moduleId, module, moduleIdHint);
  };
  let inGuard = false;
  function guardedLoadModule(moduleId, module, moduleIdHint) {
    if (!inGuard && global.ErrorUtils) {
      inGuard = true;
      let returnValue;
      try {
        returnValue = loadModuleImplementation(moduleId, module, moduleIdHint);
      } catch (e) {
        global.ErrorUtils.reportFatalError(e);
      }
      inGuard = false;
      return returnValue;
    } else {
      return loadModuleImplementation(moduleId, module, moduleIdHint);
    }
  }
  const ID_MASK_SHIFT = 16;
  const LOCAL_ID_MASK = 65535;
  function unpackModuleId(moduleId) {
    if (typeof moduleId !== 'number') {
      throw new Error('Module ID must be a number in unpackModuleId.');
    }
    const segmentId = moduleId >>> ID_MASK_SHIFT;
    const localId = moduleId & LOCAL_ID_MASK;
    return {
      segmentId,
      localId
    };
  }
  metroRequire.unpackModuleId = unpackModuleId;
  function packModuleId(value) {
    return (value.segmentId << ID_MASK_SHIFT) + value.localId;
  }
  metroRequire.packModuleId = packModuleId;
  const moduleDefinersBySegmentID = [];
  const definingSegmentByModuleID = new Map();
  function registerSegment(segmentId, moduleDefiner, moduleIds) {
    moduleDefinersBySegmentID[segmentId] = moduleDefiner;
    if (moduleIds) {
      moduleIds.forEach(moduleId => {
        if (!modules.has(moduleId) && !definingSegmentByModuleID.has(moduleId)) {
          definingSegmentByModuleID.set(moduleId, segmentId);
        }
      });
    }
  }
  function loadModuleImplementation(moduleId, module, moduleIdHint) {
    if (!module && moduleDefinersBySegmentID.length > 0) {
      const segmentId = definingSegmentByModuleID.get(moduleId) ?? 0;
      const definer = moduleDefinersBySegmentID[segmentId];
      if (definer != null) {
        definer(moduleId);
        module = modules.get(moduleId);
        definingSegmentByModuleID.delete(moduleId);
      }
    }
    if (!module) {
      throw unknownModuleError(moduleId, moduleIdHint);
    }
    if (module.hasError) {
      throw module.error;
    }
    module.isInitialized = true;
    const {
      factory,
      dependencyMap
    } = module;
    try {
      const moduleObject = module.publicModule;
      moduleObject.id = moduleId;
      factory == null ? undefined : factory(global, metroRequire, metroImportDefault, metroImportAll, moduleObject, moduleObject.exports, dependencyMap);
      {
        module.factory = undefined;
        module.dependencyMap = undefined;
      }
      return moduleObject.exports;
    } catch (e) {
      module.hasError = true;
      module.error = e;
      module.isInitialized = false;
      module.publicModule.exports = undefined;
      throw e;
    } finally {}
  }
  function unknownModuleError(id, moduleIdHint) {
    let message = 'Requiring unknown module "' + (id ?? moduleIdHint ?? `[unknown optional import]`) + '".';
    return Error(message);
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  global.$$require_external = typeof require !== "undefined" ? m => require(m) : () => null;
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * @format
   * 
   * @nolint
   * @polyfill
   */

  'use client';

  /* eslint-disable no-shadow, eqeqeq, no-unused-vars, no-control-regex  */

  /**
   * This pipes all of our console logging functions to native logging so that
   * JavaScript errors in required modules show up in Xcode via NSLog.
   */
  const inspect = function () {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    //
    // https://github.com/joyent/node/blob/master/lib/util.js

    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        formatValueCalls: 0,
        stylize: stylizeNoColor
      };
      return formatValue(ctx, obj, opts.depth);
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function (val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      ctx.formatValueCalls++;
      if (ctx.formatValueCalls > 200) {
        return `[TOO BIG formatValueCalls ${ctx.formatValueCalls} exceeded limit of 200]`;
      }

      // Primitive types cannot have properties
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }

      // Look up the keys of the object.
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);

      // IE doesn't make error fields non-enumerable
      // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
      if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
        return formatError(value);
      }

      // Some type of object without properties can be shortcutted.
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ': ' + value.name : '';
          return ctx.stylize('[Function' + name + ']', 'special');
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = '',
        array = false,
        braces = ['{', '}'];

      // Make Array say that they are Array
      if (isArray(value)) {
        array = true;
        braces = ['[', ']'];
      }

      // Make functions say that they are functions
      if (isFunction(value)) {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
      }

      // Make RegExps say that they are RegExps
      if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
      }

      // Make dates with properties first say the date
      if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
      }

      // Make error with message first say the error
      if (isError(value)) {
        base = ' ' + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
          return ctx.stylize('[Object]', 'special');
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function (key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, 'string');
      }
      if (isNumber(value)) return ctx.stylize('' + value, 'number');
      if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
      // For some reason typeof null is "object", so special case here.
      if (isNull(value)) return ctx.stylize('null', 'null');
    }
    function formatError(value) {
      return '[' + Error.prototype.toString.call(value) + ']';
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
        } else {
          output.push('');
        }
      }
      keys.forEach(function (key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || {
        value: value[key]
      };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
          str = ctx.stylize('[Getter]', 'special');
        }
      } else {
        if (desc.set) {
          str = ctx.stylize('[Setter]', 'special');
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (array) {
              str = str.split('\n').map(function (line) {
                return '  ' + line;
              }).join('\n').slice(2);
            } else {
              str = '\n' + str.split('\n').map(function (line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = ctx.stylize('[Circular]', 'special');
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.slice(1, name.length - 1);
          name = ctx.stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, 'string');
        }
      }
      return name + ': ' + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function (prev, cur) {
        numLinesEst++;
        if (cur.indexOf('\n') >= 0) numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
      }
      return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }

    // NOTE: These type checking functions intentionally don't use `instanceof`
    // because it is fragile and can be easily faked with `Object.create()`.
    function isArray(ar) {
      return Array.isArray(ar);
    }
    function isBoolean(arg) {
      return typeof arg === 'boolean';
    }
    function isNull(arg) {
      return arg === null;
    }
    function isNumber(arg) {
      return typeof arg === 'number';
    }
    function isString(arg) {
      return typeof arg === 'string';
    }
    function isUndefined(arg) {
      return arg === undefined;
    }
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === '[object RegExp]';
    }
    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }
    function isDate(d) {
      return isObject(d) && objectToString(d) === '[object Date]';
    }
    function isError(e) {
      return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
    }
    function isFunction(arg) {
      return typeof arg === 'function';
    }
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    return inspect;
  }();
  const INDEX_COLUMN_NAME = '(index)';
  const LOG_LEVELS = {
    trace: 0,
    info: 1,
    warn: 2,
    error: 3
  };
  function getNativeLogFunction(level) {
    return function () {
      let str;
      if (arguments.length === 1 && typeof arguments[0] === 'string') {
        str = arguments[0];
      } else {
        str = Array.prototype.map.call(arguments, function (arg) {
          return inspect(arg, {
            depth: 10
          });
        }).join(', ');
      }

      // TRICKY
      // If more than one argument is provided, the code above collapses them all
      // into a single formatted string. This transform wraps string arguments in
      // single quotes (e.g. "foo" -> "'foo'") which then breaks the "Warning:"
      // check below. So it's important that we look at the first argument, rather
      // than the formatted argument string.
      const firstArg = arguments[0];
      let logLevel = level;
      if (typeof firstArg === 'string' && firstArg.slice(0, 9) === 'Warning: ' && logLevel >= LOG_LEVELS.error) {
        // React warnings use console.error so that a stack trace is shown,
        // but we don't (currently) want these to show a redbox
        // (Note: Logic duplicated in ExceptionsManager.js.)
        logLevel = LOG_LEVELS.warn;
      }
      if (groupStack.length) {
        str = groupFormat('', str);
      }
      global.nativeLoggingHook(str, logLevel);
    };
  }
  function repeat(element, n) {
    return Array.apply(null, Array(n)).map(function () {
      return element;
    });
  }
  function formatCellValue(cell, key) {
    if (key === INDEX_COLUMN_NAME) {
      return cell[key];
    }
    if (cell.hasOwnProperty(key)) {
      var cellValue = cell[key];
      switch (typeof cellValue) {
        case 'function':
          return 'ƒ';
        case 'string':
          return "'" + cellValue + "'";
        case 'object':
          return cellValue == null ? 'null' : '{…}';
      }
      return String(cellValue);
    }
    return '';
  }
  function consoleTablePolyfill(data, columns) {
    var rows;

    // convert object -> array
    if (Array.isArray(data)) {
      rows = data.map((row, index) => {
        var processedRow = {};
        processedRow[INDEX_COLUMN_NAME] = String(index);
        Object.assign(processedRow, row);
        return processedRow;
      });
    } else {
      rows = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var processedRow = {};
          processedRow[INDEX_COLUMN_NAME] = key;
          Object.assign(processedRow, data[key]);
          rows.push(processedRow);
        }
      }
    }
    if (rows.length === 0) {
      global.nativeLoggingHook('', LOG_LEVELS.info);
      return;
    }
    if (Array.isArray(columns)) {
      columns = [INDEX_COLUMN_NAME].concat(columns);
    } else {
      columns = Array.from(rows.reduce((columnSet, row) => {
        Object.keys(row).forEach(key => columnSet.add(key));
        return columnSet;
      }, new Set()));
    }
    var stringRows = [];
    var columnWidths = [];

    // Convert each cell to a string. Also
    // figure out max cell width for each column
    columns.forEach(function (k, i) {
      columnWidths[i] = k.length;
      for (var j = 0; j < rows.length; j++) {
        var cellStr = formatCellValue(rows[j], k);
        stringRows[j] = stringRows[j] || [];
        stringRows[j][i] = cellStr;
        columnWidths[i] = Math.max(columnWidths[i], cellStr.length);
      }
    });

    // Join all elements in the row into a single string with | separators
    // (appends extra spaces to each cell to make separators  | aligned)
    function joinRow(row, space) {
      var cells = row.map(function (cell, i) {
        var extraSpaces = repeat(' ', columnWidths[i] - cell.length).join('');
        return cell + extraSpaces;
      });
      space = space || ' ';
      return '| ' + cells.join(space + '|' + space) + ' |';
    }
    var separators = columnWidths.map(function (columnWidth) {
      return repeat('-', columnWidth).join('');
    });
    var separatorRow = joinRow(separators);
    var header = joinRow(columns);
    var table = [header, separatorRow];
    for (var i = 0; i < rows.length; i++) {
      table.push(joinRow(stringRows[i]));
    }

    // Notice extra empty line at the beginning.
    // Native logging hook adds "RCTLog >" at the front of every
    // logged string, which would shift the header and screw up
    // the table
    global.nativeLoggingHook('\n' + table.join('\n'), LOG_LEVELS.info);
  }
  const GROUP_PAD = '\u2502'; // Box light vertical
  const GROUP_OPEN = '\u2510'; // Box light down+left
  const GROUP_CLOSE = '\u2518'; // Box light up+left

  const groupStack = [];
  function groupFormat(prefix, msg) {
    // Insert group formatting before the console message
    return groupStack.join('') + prefix + ' ' + (msg || '');
  }
  function consoleGroupPolyfill(label) {
    global.nativeLoggingHook(groupFormat(GROUP_OPEN, label), LOG_LEVELS.info);
    groupStack.push(GROUP_PAD);
  }
  function consoleGroupCollapsedPolyfill(label) {
    global.nativeLoggingHook(groupFormat(GROUP_CLOSE, label), LOG_LEVELS.info);
    groupStack.push(GROUP_PAD);
  }
  function consoleGroupEndPolyfill() {
    groupStack.pop();
    global.nativeLoggingHook(groupFormat(GROUP_CLOSE), LOG_LEVELS.info);
  }
  function consoleAssertPolyfill(expression, label) {
    if (!expression) {
      global.nativeLoggingHook('Assertion failed: ' + label, LOG_LEVELS.error);
    }
  }
  function stub() {}

  // https://developer.chrome.com/docs/devtools/console/api#createtask
  function consoleCreateTaskStub() {
    return {
      run: cb => cb()
    };
  }
  if (global.nativeLoggingHook) {
    const originalConsole = global.console;
    // Preserve the original `console` as `originalConsole`

    global.console = Object.assign({
      time: stub,
      timeEnd: stub,
      timeStamp: stub,
      count: stub,
      countReset: stub,
      createTask: consoleCreateTaskStub
    }, originalConsole ?? {}, {
      error: getNativeLogFunction(LOG_LEVELS.error),
      info: getNativeLogFunction(LOG_LEVELS.info),
      log: getNativeLogFunction(LOG_LEVELS.info),
      warn: getNativeLogFunction(LOG_LEVELS.warn),
      trace: getNativeLogFunction(LOG_LEVELS.trace),
      debug: getNativeLogFunction(LOG_LEVELS.trace),
      table: consoleTablePolyfill,
      group: consoleGroupPolyfill,
      groupEnd: consoleGroupEndPolyfill,
      groupCollapsed: consoleGroupCollapsedPolyfill,
      assert: consoleAssertPolyfill
    });

    // TODO(T206796580): This was copy-pasted from ExceptionsManager.js
    // Delete the copy there after the c++ pipeline is rolled out everywhere.
    if (global.RN$useAlwaysAvailableJSErrorHandling === true) {
      let originalConsoleError = console.error;
      function stringifySafe(arg) {
        return inspect(arg, {
          depth: 10
        }).replace(/\n\s*/g, ' ');
      }
      console.error = function (...args) {
        originalConsoleError.apply(this, args);
        if (console.reportErrorsAsExceptions === false) {
          return;
        }
        if (global.RN$inExceptionHandler?.()) {
          return;
        }
        let error;
        const firstArg = args[0];
        if (firstArg?.stack) {
          // RN$handleException will console.error this with high enough fidelity.
          error = firstArg;
        } else {
          if (typeof firstArg === 'string' && firstArg.startsWith('Warning: ')) {
            // React warnings use console.error so that a stack trace is shown, but
            // we don't (currently) want these to show a redbox
            return;
          }
          const message = args.map(arg => typeof arg === 'string' ? arg : stringifySafe(arg)).join(' ');
          error = new Error(message);
          error.name = 'console.error';
        }
        const isFatal = false;
        const reportToConsole = false;
        global.RN$handleException(error, isFatal, reportToConsole);
      };
    }
    Object.defineProperty(console, '_isPolyfilled', {
      value: true,
      enumerable: false
    });

    // If available, also call the original `console` method since that is
    // sometimes useful. Ex: on OS X, this will let you see rich output in
    // the Safari Web Inspector console.
  } else if (!global.console) {
    const log = global.print || stub;
    global.console = {
      debug: log,
      error: log,
      info: log,
      log: log,
      trace: log,
      warn: log,
      assert(expression, label) {
        if (!expression) {
          log('Assertion failed: ' + label);
        }
      },
      clear: stub,
      count: stub,
      countReset: stub,
      dir: stub,
      dirxml: stub,
      group: stub,
      groupCollapsed: stub,
      groupEnd: stub,
      profile: stub,
      profileEnd: stub,
      table: stub,
      time: stub,
      timeEnd: stub,
      timeStamp: stub,
      createTask: consoleCreateTaskStub
    };
    Object.defineProperty(console, '_isPolyfilled', {
      value: true,
      enumerable: false
    });
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  let _inGuard = 0;
  let _globalHandler = global.RN$useAlwaysAvailableJSErrorHandling === true ? global.RN$handleException : (e, isFatal) => {
    throw e;
  };
  const ErrorUtils = {
    setGlobalHandler(fun) {
      _globalHandler = fun;
    },
    getGlobalHandler() {
      return _globalHandler;
    },
    reportError(error) {
      _globalHandler && _globalHandler(error, false);
    },
    reportFatalError(error) {
      _globalHandler && _globalHandler(error, true);
    },
    applyWithGuard(fun, context, args, unused_onError, unused_name) {
      try {
        _inGuard++;
        return fun.apply(context, args);
      } catch (e) {
        ErrorUtils.reportError(e);
      } finally {
        _inGuard--;
      }
      return null;
    },
    applyWithGuardIfNeeded(fun, context, args) {
      if (ErrorUtils.inGuard()) {
        return fun.apply(context, args);
      } else {
        ErrorUtils.applyWithGuard(fun, context, args);
      }
      return null;
    },
    inGuard() {
      return !!_inGuard;
    },
    guard(fun, name, context) {
      if (typeof fun !== 'function') {
        console.warn('A function must be passed to ErrorUtils.guard, got ', fun);
        return null;
      }
      const guardName = name ?? fun.name ?? '<generated guard>';
      function guarded(...args) {
        return ErrorUtils.applyWithGuard(fun, context ?? this, args, null, guardName);
      }
      return guarded;
    }
  };
  global.ErrorUtils = ErrorUtils;
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return App;
    }
  });
  require(_dependencyMap[0]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[1]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeWebDistExportsText = require(_dependencyMap[2]);
  var Text = _interopDefault(_reactNativeWebDistExportsText);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[3]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[4]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsTouchableOpacity = require(_dependencyMap[5]);
  var TouchableOpacity = _interopDefault(_reactNativeWebDistExportsTouchableOpacity);
  var _reactNativeWebDistExportsStatusBar = require(_dependencyMap[6]);
  var StatusBar = _interopDefault(_reactNativeWebDistExportsStatusBar);
  var _reactJsxRuntime = require(_dependencyMap[7]);
  const COLORS = {
    primary: '#4CAF50',
    primaryLight: '#E8F5E9',
    accent: '#FF7043',
    bg: '#F5F5F5',
    card: '#FFFFFF',
    text: '#333333',
    textLight: '#999999',
    gold: '#FFB300'
  };
  const PET_NAME = '奶糖';
  const PET_SPECIES = '猫';
  const PET_BREED = '英短';
  const PET_AGE = '3岁';
  const HEALTH_SCORE = 92;
  function StatCard({
    icon,
    label,
    value
  }) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: styles.statCard,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
        style: styles.statIcon,
        children: icon
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
        style: styles.statValue,
        children: value
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
        style: styles.statLabel,
        children: label
      })]
    });
  }
  function MenuItem({
    icon,
    title,
    subtitle,
    color
  }) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(TouchableOpacity.default, {
      style: styles.menuItem,
      activeOpacity: 0.7,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: [styles.menuIconWrap, {
          backgroundColor: color + '20'
        }],
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
          style: styles.menuIcon,
          children: icon
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: styles.menuText,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
          style: styles.menuTitle,
          children: title
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
          style: styles.menuSubtitle,
          children: subtitle
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
        style: styles.menuArrow,
        children: "\u203A"
      })]
    });
  }
  function App() {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: styles.container,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(StatusBar.default, {
        barStyle: "dark-content",
        backgroundColor: COLORS.bg
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: styles.header,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
          style: styles.headerTitle,
          children: "\u5BA0\u5B89\xB7\u963F\u798F"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Text.default, {
          style: styles.headerSubtitle,
          children: [PET_NAME, "\u7684\u5065\u5EB7\u7BA1\u5BB6"]
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ScrollView.default, {
        style: styles.content,
        showsVerticalScrollIndicator: false,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          style: styles.petCard,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
            style: styles.petInfo,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: styles.avatar,
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
                style: styles.avatarText,
                children: PET_NAME[0]
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
                style: styles.petName,
                children: PET_NAME
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Text.default, {
                style: styles.petBreed,
                children: [PET_BREED, " \xB7 ", PET_AGE, " \xB7 ", PET_SPECIES]
              })]
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
            style: styles.healthScore,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
              style: styles.scoreLabel,
              children: "\u5065\u5EB7\u5206"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
              style: styles.scoreValue,
              children: HEALTH_SCORE
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: styles.scoreBar,
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
                style: [styles.scoreFill, {
                  width: `${HEALTH_SCORE}%`
                }]
              })
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          style: styles.statsRow,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(StatCard, {
            icon: "\uD83C\uDF21\uFE0F",
            label: "\u4F53\u6E29",
            value: "38.5\xB0C"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(StatCard, {
            icon: "\u2764\uFE0F",
            label: "\u5FC3\u7387",
            value: "120\u6B21/\u5206"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(StatCard, {
            icon: "\u2696\uFE0F",
            label: "\u4F53\u91CD",
            value: "4.2kg"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(StatCard, {
            icon: "\uD83E\uDDB7",
            label: "\u9A71\u866B",
            value: "\u5DF2\u505A"
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: styles.sectionHeader,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
            style: styles.sectionTitle,
            children: "\u5E38\u7528\u529F\u80FD"
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          style: styles.menuGrid,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\uD83D\uDCAC",
            title: "AI\u95EE\u8BCA",
            subtitle: "24\u5C0F\u65F6\u5728\u7EBF\u95EE\u8BCA",
            color: "#4CAF50"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\uD83C\uDFE5",
            title: "\u627E\u533B\u9662",
            subtitle: "\u9644\u8FD1\u5BA0\u7269\u533B\u9662",
            color: "#2196F3"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\uD83D\uDEE1\uFE0F",
            title: "\u5BA0\u7269\u4FDD\u9669",
            subtitle: "\u533B\u7597\u8D39\u7528\u62A5\u9500",
            color: "#FF7043"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\uD83D\uDCCB",
            title: "\u5065\u5EB7\u6863\u6848",
            subtitle: "\u75AB\u82D7\xB7\u4F53\u68C0\u8BB0\u5F55",
            color: "#9C27B0"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\uD83D\uDED2",
            title: "\u963F\u798F\u836F\u623F",
            subtitle: "\u5904\u65B9\u7CAE\xB7\u836F\u54C1",
            color: "#FF9800"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MenuItem, {
            icon: "\uD83D\uDC65",
            title: "\u6BDB\u5B69\u793E\u7FA4",
            subtitle: "\u4EA4\u6D41\xB7\u5206\u4EAB",
            color: "#00BCD4"
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          style: styles.insuranceCard,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
            style: styles.insuranceTitle,
            children: "\uD83D\uDEE1\uFE0F \u63A8\u8350\u4FDD\u9669\u65B9\u6848"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
            style: styles.insuranceRow,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
              style: styles.insuranceName,
              children: "\u57FA\u7840\u7248"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
              style: styles.insurancePrice,
              children: "\xA5299/\u5E74"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
            style: styles.insuranceDesc,
            children: "\u95E8\u8BCA+\u4F4F\u9662\u62A5\u9500\uFF0C\u5355\u6B21\u6700\u9AD8\xA51500"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TouchableOpacity.default, {
            style: styles.insuranceBtn,
            activeOpacity: 0.7,
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
              style: styles.insuranceBtnText,
              children: "\u4E86\u89E3\u8BE6\u60C5"
            })
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: {
            height: 30
          }
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: styles.bottomNav,
        children: [['🏠', '首页'], ['💬', '问诊'], ['📋', '档案'], ['👤', '我的']].map(([icon, label], i) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(TouchableOpacity.default, {
          style: styles.navItem,
          activeOpacity: 0.7,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
            style: [styles.navIcon, i === 0 && styles.navIconActive],
            children: icon
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
            style: [styles.navLabel, i === 0 && styles.navLabelActive],
            children: label
          })]
        }, i))
      })]
    });
  }
  const styles = StyleSheet.default.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.bg
    },
    header: {
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 15,
      backgroundColor: COLORS.primary
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff'
    },
    headerSubtitle: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.8)',
      marginTop: 4
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16
    },
    petCard: {
      backgroundColor: COLORS.card,
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      marginBottom: 16
    },
    petInfo: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: COLORS.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14
    },
    avatarText: {
      fontSize: 26,
      fontWeight: 'bold',
      color: COLORS.primary
    },
    petName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text
    },
    petBreed: {
      fontSize: 13,
      color: COLORS.textLight,
      marginTop: 3
    },
    healthScore: {
      alignItems: 'center'
    },
    scoreLabel: {
      fontSize: 11,
      color: COLORS.textLight
    },
    scoreValue: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLORS.primary
    },
    scoreBar: {
      width: 60,
      height: 4,
      backgroundColor: '#E0E0E0',
      borderRadius: 2,
      marginTop: 4,
      overflow: 'hidden'
    },
    scoreFill: {
      height: '100%',
      backgroundColor: COLORS.primary,
      borderRadius: 2
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    statCard: {
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 12,
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 3,
      elevation: 1,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4
    },
    statIcon: {
      fontSize: 20
    },
    statValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.text,
      marginTop: 6
    },
    statLabel: {
      fontSize: 11,
      color: COLORS.textLight,
      marginTop: 2
    },
    sectionHeader: {
      marginBottom: 12
    },
    sectionTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: COLORS.text
    },
    menuGrid: {
      marginBottom: 20
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      elevation: 1,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 4
    },
    menuIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14
    },
    menuIcon: {
      fontSize: 22
    },
    menuText: {
      flex: 1
    },
    menuTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.text
    },
    menuSubtitle: {
      fontSize: 12,
      color: COLORS.textLight,
      marginTop: 2
    },
    menuArrow: {
      fontSize: 24,
      color: COLORS.textLight
    },
    insuranceCard: {
      backgroundColor: COLORS.primaryLight,
      borderRadius: 16,
      padding: 18,
      marginBottom: 16,
      borderLeftWidth: 4,
      borderLeftColor: COLORS.primary
    },
    insuranceTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 10
    },
    insuranceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    insuranceName: {
      fontSize: 15,
      fontWeight: '600',
      color: COLORS.text
    },
    insurancePrice: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.primary
    },
    insuranceDesc: {
      fontSize: 13,
      color: COLORS.textLight,
      marginTop: 4,
      marginBottom: 12
    },
    insuranceBtn: {
      backgroundColor: COLORS.primary,
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: 'center'
    },
    insuranceBtnText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14
    },
    bottomNav: {
      flexDirection: 'row',
      backgroundColor: COLORS.card,
      paddingVertical: 8,
      paddingBottom: 20,
      borderTopWidth: 1,
      borderTopColor: '#E8E8E8'
    },
    navItem: {
      flex: 1,
      alignItems: 'center'
    },
    navIcon: {
      fontSize: 22,
      opacity: 0.5
    },
    navIconActive: {
      opacity: 1
    },
    navLabel: {
      fontSize: 11,
      color: COLORS.textLight,
      marginTop: 2
    },
    navLabelActive: {
      color: COLORS.primary,
      fontWeight: '600'
    }
  });
},0,[1,3,95,16,96,106,109,110]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  {
    module.exports = require(_dependencyMap[0]);
  }
},1,[2]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  "use strict";

  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
    REACT_PORTAL_TYPE = Symbol.for("react.portal"),
    REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
    REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
    REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
    REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
    REACT_CONTEXT_TYPE = Symbol.for("react.context"),
    REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
    REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
    REACT_MEMO_TYPE = Symbol.for("react.memo"),
    REACT_LAZY_TYPE = Symbol.for("react.lazy"),
    REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
    MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var ReactNoopUpdateQueue = {
      isMounted: function () {
        return false;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {}
    },
    assign = Object.assign,
    emptyObject = {};
  function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  Component.prototype.isReactComponent = {};
  Component.prototype.setState = function (partialState, callback) {
    if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, partialState, callback, "setState");
  };
  Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
  };
  function ComponentDummy() {}
  ComponentDummy.prototype = Component.prototype;
  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  pureComponentPrototype.constructor = PureComponent;
  assign(pureComponentPrototype, Component.prototype);
  pureComponentPrototype.isPureReactComponent = true;
  var isArrayImpl = Array.isArray;
  function noop() {}
  var ReactSharedInternals = {
      H: null,
      A: null,
      T: null,
      S: null
    },
    hasOwnProperty = Object.prototype.hasOwnProperty;
  function ReactElement(type, key, props) {
    var refProp = props.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key,
      ref: undefined !== refProp ? refProp : null,
      props: props
    };
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    return ReactElement(oldElement.type, newKey, oldElement.props);
  }
  function isValidElement(object) {
    return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function escape(key) {
    var escaperLookup = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + key.replace(/[=:]/g, function (match) {
      return escaperLookup[match];
    });
  }
  var userProvidedKeyEscapeRegex = /\/+/g;
  function getElementKey(element, index) {
    return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
  }
  function resolveThenable(thenable) {
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenable.reason;
      default:
        switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function (fulfilledValue) {
          "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
        }, function (error) {
          "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
        })), thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
        }
    }
    throw thenable;
  }
  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    var type = typeof children;
    if ("undefined" === type || "boolean" === type) children = null;
    var invokeCallback = false;
    if (null === children) invokeCallback = true;else switch (type) {
      case "bigint":
      case "string":
      case "number":
        invokeCallback = true;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
            break;
          case REACT_LAZY_TYPE:
            return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
        }
    }
    if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function (c) {
      return c;
    })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
    invokeCallback = 0;
    var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
    if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);else if ("object" === type) {
      if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
      array = String(children);
      throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
    }
    return invokeCallback;
  }
  function mapChildren(children, func, context) {
    if (null == children) return children;
    var result = [],
      count = 0;
    mapIntoArray(children, result, "", "", function (child) {
      return func.call(context, child, count++);
    });
    return result;
  }
  function lazyInitializer(payload) {
    if (-1 === payload._status) {
      var ctor = payload._result;
      ctor = ctor();
      ctor.then(function (moduleObject) {
        if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
      }, function (error) {
        if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
      });
      -1 === payload._status && (payload._status = 0, payload._result = ctor);
    }
    if (1 === payload._status) return payload._result.default;
    throw payload._result;
  }
  var reportGlobalError = "function" === typeof reportError ? reportError : function (error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error: error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    },
    Children = {
      map: mapChildren,
      forEach: function (children, forEachFunc, forEachContext) {
        mapChildren(children, function () {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      },
      count: function (children) {
        var n = 0;
        mapChildren(children, function () {
          n++;
        });
        return n;
      },
      toArray: function (children) {
        return mapChildren(children, function (child) {
          return child;
        }) || [];
      },
      only: function (children) {
        if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
        return children;
      }
    };
  exports.Activity = REACT_ACTIVITY_TYPE;
  exports.Children = Children;
  exports.Component = Component;
  exports.Fragment = REACT_FRAGMENT_TYPE;
  exports.Profiler = REACT_PROFILER_TYPE;
  exports.PureComponent = PureComponent;
  exports.StrictMode = REACT_STRICT_MODE_TYPE;
  exports.Suspense = REACT_SUSPENSE_TYPE;
  exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
  exports.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function (size) {
      return ReactSharedInternals.H.useMemoCache(size);
    }
  };
  exports.cache = function (fn) {
    return function () {
      return fn.apply(null, arguments);
    };
  };
  exports.cacheSignal = function () {
    return null;
  };
  exports.cloneElement = function (element, config, children) {
    if (null === element || undefined === element) throw Error("The argument must be a React element, but you passed " + element + ".");
    var props = assign({}, element.props),
      key = element.key;
    if (null != config) for (propName in undefined !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && undefined === config.ref || (props[propName] = config[propName]);
    var propName = arguments.length - 2;
    if (1 === propName) props.children = children;else if (1 < propName) {
      for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    return ReactElement(element.type, key, props);
  };
  exports.createContext = function (defaultValue) {
    defaultValue = {
      $$typeof: REACT_CONTEXT_TYPE,
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    defaultValue.Provider = defaultValue;
    defaultValue.Consumer = {
      $$typeof: REACT_CONSUMER_TYPE,
      _context: defaultValue
    };
    return defaultValue;
  };
  exports.createElement = function (type, config, children) {
    var propName,
      props = {},
      key = null;
    if (null != config) for (propName in undefined !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
    var childrenLength = arguments.length - 2;
    if (1 === childrenLength) props.children = children;else if (1 < childrenLength) {
      for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) undefined === props[propName] && (props[propName] = childrenLength[propName]);
    return ReactElement(type, key, props);
  };
  exports.createRef = function () {
    return {
      current: null
    };
  };
  exports.forwardRef = function (render) {
    return {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render
    };
  };
  exports.isValidElement = isValidElement;
  exports.lazy = function (ctor) {
    return {
      $$typeof: REACT_LAZY_TYPE,
      _payload: {
        _status: -1,
        _result: ctor
      },
      _init: lazyInitializer
    };
  };
  exports.memo = function (type, compare) {
    return {
      $$typeof: REACT_MEMO_TYPE,
      type: type,
      compare: undefined === compare ? null : compare
    };
  };
  exports.startTransition = function (scope) {
    var prevTransition = ReactSharedInternals.T,
      currentTransition = {};
    ReactSharedInternals.T = currentTransition;
    try {
      var returnValue = scope(),
        onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
    } catch (error) {
      reportGlobalError(error);
    } finally {
      null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
    }
  };
  exports.unstable_useCacheRefresh = function () {
    return ReactSharedInternals.H.useCacheRefresh();
  };
  exports.use = function (usable) {
    return ReactSharedInternals.H.use(usable);
  };
  exports.useActionState = function (action, initialState, permalink) {
    return ReactSharedInternals.H.useActionState(action, initialState, permalink);
  };
  exports.useCallback = function (callback, deps) {
    return ReactSharedInternals.H.useCallback(callback, deps);
  };
  exports.useContext = function (Context) {
    return ReactSharedInternals.H.useContext(Context);
  };
  exports.useDebugValue = function () {};
  exports.useDeferredValue = function (value, initialValue) {
    return ReactSharedInternals.H.useDeferredValue(value, initialValue);
  };
  exports.useEffect = function (create, deps) {
    return ReactSharedInternals.H.useEffect(create, deps);
  };
  exports.useEffectEvent = function (callback) {
    return ReactSharedInternals.H.useEffectEvent(callback);
  };
  exports.useId = function () {
    return ReactSharedInternals.H.useId();
  };
  exports.useImperativeHandle = function (ref, create, deps) {
    return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
  };
  exports.useInsertionEffect = function (create, deps) {
    return ReactSharedInternals.H.useInsertionEffect(create, deps);
  };
  exports.useLayoutEffect = function (create, deps) {
    return ReactSharedInternals.H.useLayoutEffect(create, deps);
  };
  exports.useMemo = function (create, deps) {
    return ReactSharedInternals.H.useMemo(create, deps);
  };
  exports.useOptimistic = function (passthrough, reducer) {
    return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
  };
  exports.useReducer = function (reducer, initialArg, init) {
    return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
  };
  exports.useRef = function (initialValue) {
    return ReactSharedInternals.H.useRef(initialValue);
  };
  exports.useState = function (initialState) {
    return ReactSharedInternals.H.useState(initialState);
  };
  exports.useSyncExternalStore = function (subscribe, getSnapshot, getServerSnapshot) {
    return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  };
  exports.useTransition = function () {
    return ReactSharedInternals.H.useTransition();
  };
  exports.version = "19.2.7";
},2,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Nicolas Gallagher.
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  'use client';
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _babelRuntimeHelpersObjectWithoutPropertiesLoose = require(_dependencyMap[0]);
  var _objectWithoutPropertiesLoose = _interopDefault(_babelRuntimeHelpersObjectWithoutPropertiesLoose);
  var _react = require(_dependencyMap[1]);
  var React = _interopNamespace(_react);
  var _createElement = require(_dependencyMap[2]);
  var createElement = _interopDefault(_createElement);
  var _modulesForwardedProps = require(_dependencyMap[3]);
  var forwardedProps = _interopNamespace(_modulesForwardedProps);
  var _modulesPick = require(_dependencyMap[4]);
  var pick = _interopDefault(_modulesPick);
  var _modulesUseElementLayout = require(_dependencyMap[5]);
  var useElementLayout = _interopDefault(_modulesUseElementLayout);
  var _modulesUseMergeRefs = require(_dependencyMap[6]);
  var useMergeRefs = _interopDefault(_modulesUseMergeRefs);
  var _modulesUsePlatformMethods = require(_dependencyMap[7]);
  var usePlatformMethods = _interopDefault(_modulesUsePlatformMethods);
  var _modulesUseResponderEvents = require(_dependencyMap[8]);
  var useResponderEvents = _interopDefault(_modulesUseResponderEvents);
  var _StyleSheet = require(_dependencyMap[9]);
  var StyleSheet = _interopDefault(_StyleSheet);
  var _TextTextAncestorContext = require(_dependencyMap[10]);
  var TextAncestorContext = _interopDefault(_TextTextAncestorContext);
  var _modulesUseLocale = require(_dependencyMap[11]);
  var _excluded = ["hrefAttrs", "onLayout", "onMoveShouldSetResponder", "onMoveShouldSetResponderCapture", "onResponderEnd", "onResponderGrant", "onResponderMove", "onResponderReject", "onResponderRelease", "onResponderStart", "onResponderTerminate", "onResponderTerminationRequest", "onScrollShouldSetResponder", "onScrollShouldSetResponderCapture", "onSelectionChangeShouldSetResponder", "onSelectionChangeShouldSetResponderCapture", "onStartShouldSetResponder", "onStartShouldSetResponderCapture"];
  var forwardPropsList = Object.assign({}, forwardedProps.defaultProps, forwardedProps.accessibilityProps, forwardedProps.clickProps, forwardedProps.focusProps, forwardedProps.keyboardProps, forwardedProps.mouseProps, forwardedProps.touchProps, forwardedProps.styleProps, {
    href: true,
    lang: true,
    onScroll: true,
    onWheel: true,
    pointerEvents: true
  });
  var pickProps = props => (0, pick.default)(props, forwardPropsList);
  var View = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
    var hrefAttrs = props.hrefAttrs,
      onLayout = props.onLayout,
      onMoveShouldSetResponder = props.onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture = props.onMoveShouldSetResponderCapture,
      onResponderEnd = props.onResponderEnd,
      onResponderGrant = props.onResponderGrant,
      onResponderMove = props.onResponderMove,
      onResponderReject = props.onResponderReject,
      onResponderRelease = props.onResponderRelease,
      onResponderStart = props.onResponderStart,
      onResponderTerminate = props.onResponderTerminate,
      onResponderTerminationRequest = props.onResponderTerminationRequest,
      onScrollShouldSetResponder = props.onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture = props.onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder = props.onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture = props.onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder = props.onStartShouldSetResponder,
      onStartShouldSetResponderCapture = props.onStartShouldSetResponderCapture,
      rest = (0, _objectWithoutPropertiesLoose.default)(props, _excluded);
    var hasTextAncestor = React.useContext(TextAncestorContext.default);
    var hostRef = React.useRef(null);
    var _useLocaleContext = (0, _modulesUseLocale.useLocaleContext)(),
      contextDirection = _useLocaleContext.direction;
    (0, useElementLayout.default)(hostRef, onLayout);
    (0, useResponderEvents.default)(hostRef, {
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture
    });
    var component = 'div';
    var langDirection = props.lang != null ? (0, _modulesUseLocale.getLocaleDirection)(props.lang) : null;
    var componentDirection = props.dir || langDirection;
    var writingDirection = componentDirection || contextDirection;
    var supportedProps = pickProps(rest);
    supportedProps.dir = componentDirection;
    supportedProps.style = [styles.view$raw, hasTextAncestor && styles.inline, props.style];
    if (props.href != null) {
      component = 'a';
      if (hrefAttrs != null) {
        var download = hrefAttrs.download,
          rel = hrefAttrs.rel,
          target = hrefAttrs.target;
        if (download != null) {
          supportedProps.download = download;
        }
        if (rel != null) {
          supportedProps.rel = rel;
        }
        if (typeof target === 'string') {
          supportedProps.target = target.charAt(0) !== '_' ? '_' + target : target;
        }
      }
    }
    var platformMethodsRef = (0, usePlatformMethods.default)(supportedProps);
    var setRef = (0, useMergeRefs.default)(hostRef, platformMethodsRef, forwardedRef);
    supportedProps.ref = setRef;
    return (0, createElement.default)(component, supportedProps, {
      writingDirection
    });
  });
  View.displayName = 'View';
  var styles = StyleSheet.default.create({
    view$raw: {
      alignContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: 'transparent',
      border: '0 solid black',
      boxSizing: 'border-box',
      display: 'flex',
      flexBasis: 'auto',
      flexDirection: 'column',
      flexShrink: 0,
      listStyle: 'none',
      margin: 0,
      minHeight: 0,
      minWidth: 0,
      padding: 0,
      position: 'relative',
      textDecoration: 'none',
      zIndex: 0
    },
    inline: {
      display: 'inline-flex'
    }
  });
  var _default = View;
},3,[4,1,5,74,75,76,83,85,87,16,94,72]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _objectWithoutPropertiesLoose;
    }
  });
  function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
      if (-1 !== e.indexOf(n)) continue;
      t[n] = r[n];
    }
    return t;
  }
},4,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  'use client';
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _modulesAccessibilityUtil = require(_dependencyMap[0]);
  var AccessibilityUtil = _interopDefault(_modulesAccessibilityUtil);
  var _modulesCreateDOMProps = require(_dependencyMap[1]);
  var createDOMProps = _interopDefault(_modulesCreateDOMProps);
  var _react = require(_dependencyMap[2]);
  var React = _interopDefault(_react);
  var _modulesUseLocale = require(_dependencyMap[3]);
  var createElement = (component, props, options) => {
    // Use equivalent platform elements where possible.
    var accessibilityComponent;
    if (component && component.constructor === String) {
      accessibilityComponent = AccessibilityUtil.default.propsToAccessibilityComponent(props);
    }
    var Component = accessibilityComponent || component;
    var domProps = (0, createDOMProps.default)(Component, props, options);
    var element = /*#__PURE__*/React.default.createElement(Component, domProps);

    // Update locale context if element's writing direction prop changes
    var elementWithLocaleProvider = domProps.dir ? /*#__PURE__*/React.default.createElement(_modulesUseLocale.LocaleProvider, {
      children: element,
      direction: domProps.dir,
      locale: domProps.lang
    }) : element;
    return elementWithLocaleProvider;
  };
  var _default = createElement;
},5,[6,10,1,72]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _isDisabled = require(_dependencyMap[0]);
  var isDisabled = _interopDefault(_isDisabled);
  var _propsToAccessibilityComponent = require(_dependencyMap[1]);
  var propsToAccessibilityComponent = _interopDefault(_propsToAccessibilityComponent);
  var _propsToAriaRole = require(_dependencyMap[2]);
  var propsToAriaRole = _interopDefault(_propsToAriaRole);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var AccessibilityUtil = {
    isDisabled: isDisabled.default,
    propsToAccessibilityComponent: propsToAccessibilityComponent.default,
    propsToAriaRole: propsToAriaRole.default
  };
  var _default = AccessibilityUtil;
},6,[7,8,9]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var isDisabled = props => props.disabled || Array.isArray(props.accessibilityStates) && props.accessibilityStates.indexOf('disabled') > -1;
  var _default = isDisabled;
},7,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _propsToAriaRole = require(_dependencyMap[0]);
  var propsToAriaRole = _interopDefault(_propsToAriaRole);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var roleComponents = {
    article: 'article',
    banner: 'header',
    blockquote: 'blockquote',
    button: 'button',
    code: 'code',
    complementary: 'aside',
    contentinfo: 'footer',
    deletion: 'del',
    emphasis: 'em',
    figure: 'figure',
    insertion: 'ins',
    form: 'form',
    list: 'ul',
    listitem: 'li',
    main: 'main',
    navigation: 'nav',
    paragraph: 'p',
    region: 'section',
    strong: 'strong'
  };
  var emptyObject = {};
  var propsToAccessibilityComponent = function propsToAccessibilityComponent(props) {
    if (props === undefined) {
      props = emptyObject;
    }
    var roleProp = props.role || props.accessibilityRole;
    // special-case for "label" role which doesn't map to an ARIA role
    if (roleProp === 'label') {
      return 'label';
    }
    var role = (0, propsToAriaRole.default)(props);
    if (role) {
      if (role === 'heading') {
        var level = props.accessibilityLevel || props['aria-level'];
        if (level != null) {
          return "h" + level;
        }
        return 'h1';
      }
      return roleComponents[role];
    }
  };
  var _default = propsToAccessibilityComponent;
},8,[9]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var accessibilityRoleToWebRole = {
    adjustable: 'slider',
    button: 'button',
    header: 'heading',
    image: 'img',
    imagebutton: null,
    keyboardkey: null,
    label: null,
    link: 'link',
    none: 'presentation',
    search: 'search',
    summary: 'region',
    text: null
  };
  var propsToAriaRole = _ref => {
    var accessibilityRole = _ref.accessibilityRole,
      role = _ref.role;
    var _role = role || accessibilityRole;
    if (_role) {
      var inferredRole = accessibilityRoleToWebRole[_role];
      if (inferredRole !== null) {
        // ignore roles that don't map to web
        return inferredRole || _role;
      }
    }
  };
  var _default = propsToAriaRole;
},9,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _babelRuntimeHelpersObjectSpread = require(_dependencyMap[0]);
  var _objectSpread = _interopDefault(_babelRuntimeHelpersObjectSpread);
  var _babelRuntimeHelpersObjectWithoutPropertiesLoose = require(_dependencyMap[1]);
  var _objectWithoutPropertiesLoose = _interopDefault(_babelRuntimeHelpersObjectWithoutPropertiesLoose);
  var _AccessibilityUtil = require(_dependencyMap[2]);
  var AccessibilityUtil = _interopDefault(_AccessibilityUtil);
  var _exportsStyleSheet = require(_dependencyMap[3]);
  var StyleSheet = _interopDefault(_exportsStyleSheet);
  var _warnOnce = require(_dependencyMap[4]);
  var _excluded = ["aria-activedescendant", "accessibilityActiveDescendant", "aria-atomic", "accessibilityAtomic", "aria-autocomplete", "accessibilityAutoComplete", "aria-busy", "accessibilityBusy", "aria-checked", "accessibilityChecked", "aria-colcount", "accessibilityColumnCount", "aria-colindex", "accessibilityColumnIndex", "aria-colspan", "accessibilityColumnSpan", "aria-controls", "accessibilityControls", "aria-current", "accessibilityCurrent", "aria-describedby", "accessibilityDescribedBy", "aria-details", "accessibilityDetails", "aria-disabled", "accessibilityDisabled", "aria-errormessage", "accessibilityErrorMessage", "aria-expanded", "accessibilityExpanded", "aria-flowto", "accessibilityFlowTo", "aria-haspopup", "accessibilityHasPopup", "aria-hidden", "accessibilityHidden", "aria-invalid", "accessibilityInvalid", "aria-keyshortcuts", "accessibilityKeyShortcuts", "aria-label", "accessibilityLabel", "aria-labelledby", "accessibilityLabelledBy", "aria-level", "accessibilityLevel", "aria-live", "accessibilityLiveRegion", "aria-modal", "accessibilityModal", "aria-multiline", "accessibilityMultiline", "aria-multiselectable", "accessibilityMultiSelectable", "aria-orientation", "accessibilityOrientation", "aria-owns", "accessibilityOwns", "aria-placeholder", "accessibilityPlaceholder", "aria-posinset", "accessibilityPosInSet", "aria-pressed", "accessibilityPressed", "aria-readonly", "accessibilityReadOnly", "aria-required", "accessibilityRequired", "role", "accessibilityRole", "aria-roledescription", "accessibilityRoleDescription", "aria-rowcount", "accessibilityRowCount", "aria-rowindex", "accessibilityRowIndex", "aria-rowspan", "accessibilityRowSpan", "aria-selected", "accessibilitySelected", "aria-setsize", "accessibilitySetSize", "aria-sort", "accessibilitySort", "aria-valuemax", "accessibilityValueMax", "aria-valuemin", "accessibilityValueMin", "aria-valuenow", "accessibilityValueNow", "aria-valuetext", "accessibilityValueText", "dataSet", "focusable", "id", "nativeID", "pointerEvents", "style", "tabIndex", "testID"];
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var emptyObject = {};
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var isArray = Array.isArray;
  var uppercasePattern = /[A-Z]/g;
  function toHyphenLower(match) {
    return '-' + match.toLowerCase();
  }
  function hyphenateString(str) {
    return str.replace(uppercasePattern, toHyphenLower);
  }
  function processIDRefList(idRefList) {
    return isArray(idRefList) ? idRefList.join(' ') : idRefList;
  }
  var pointerEventsStyles = StyleSheet.default.create({
    auto: {
      pointerEvents: 'auto'
    },
    'box-none': {
      pointerEvents: 'box-none'
    },
    'box-only': {
      pointerEvents: 'box-only'
    },
    none: {
      pointerEvents: 'none'
    }
  });
  var createDOMProps = (elementType, props, options) => {
    if (!props) {
      props = emptyObject;
    }
    var _props = props,
      ariaActiveDescendant = _props['aria-activedescendant'],
      accessibilityActiveDescendant = _props.accessibilityActiveDescendant,
      ariaAtomic = _props['aria-atomic'],
      accessibilityAtomic = _props.accessibilityAtomic,
      ariaAutoComplete = _props['aria-autocomplete'],
      accessibilityAutoComplete = _props.accessibilityAutoComplete,
      ariaBusy = _props['aria-busy'],
      accessibilityBusy = _props.accessibilityBusy,
      ariaChecked = _props['aria-checked'],
      accessibilityChecked = _props.accessibilityChecked,
      ariaColumnCount = _props['aria-colcount'],
      accessibilityColumnCount = _props.accessibilityColumnCount,
      ariaColumnIndex = _props['aria-colindex'],
      accessibilityColumnIndex = _props.accessibilityColumnIndex,
      ariaColumnSpan = _props['aria-colspan'],
      accessibilityColumnSpan = _props.accessibilityColumnSpan,
      ariaControls = _props['aria-controls'],
      accessibilityControls = _props.accessibilityControls,
      ariaCurrent = _props['aria-current'],
      accessibilityCurrent = _props.accessibilityCurrent,
      ariaDescribedBy = _props['aria-describedby'],
      accessibilityDescribedBy = _props.accessibilityDescribedBy,
      ariaDetails = _props['aria-details'],
      accessibilityDetails = _props.accessibilityDetails,
      ariaDisabled = _props['aria-disabled'],
      accessibilityDisabled = _props.accessibilityDisabled,
      ariaErrorMessage = _props['aria-errormessage'],
      accessibilityErrorMessage = _props.accessibilityErrorMessage,
      ariaExpanded = _props['aria-expanded'],
      accessibilityExpanded = _props.accessibilityExpanded,
      ariaFlowTo = _props['aria-flowto'],
      accessibilityFlowTo = _props.accessibilityFlowTo,
      ariaHasPopup = _props['aria-haspopup'],
      accessibilityHasPopup = _props.accessibilityHasPopup,
      ariaHidden = _props['aria-hidden'],
      accessibilityHidden = _props.accessibilityHidden,
      ariaInvalid = _props['aria-invalid'],
      accessibilityInvalid = _props.accessibilityInvalid,
      ariaKeyShortcuts = _props['aria-keyshortcuts'],
      accessibilityKeyShortcuts = _props.accessibilityKeyShortcuts,
      ariaLabel = _props['aria-label'],
      accessibilityLabel = _props.accessibilityLabel,
      ariaLabelledBy = _props['aria-labelledby'],
      accessibilityLabelledBy = _props.accessibilityLabelledBy,
      ariaLevel = _props['aria-level'],
      accessibilityLevel = _props.accessibilityLevel,
      ariaLive = _props['aria-live'],
      accessibilityLiveRegion = _props.accessibilityLiveRegion,
      ariaModal = _props['aria-modal'],
      accessibilityModal = _props.accessibilityModal,
      ariaMultiline = _props['aria-multiline'],
      accessibilityMultiline = _props.accessibilityMultiline,
      ariaMultiSelectable = _props['aria-multiselectable'],
      accessibilityMultiSelectable = _props.accessibilityMultiSelectable,
      ariaOrientation = _props['aria-orientation'],
      accessibilityOrientation = _props.accessibilityOrientation,
      ariaOwns = _props['aria-owns'],
      accessibilityOwns = _props.accessibilityOwns,
      ariaPlaceholder = _props['aria-placeholder'],
      accessibilityPlaceholder = _props.accessibilityPlaceholder,
      ariaPosInSet = _props['aria-posinset'],
      accessibilityPosInSet = _props.accessibilityPosInSet,
      ariaPressed = _props['aria-pressed'],
      accessibilityPressed = _props.accessibilityPressed,
      ariaReadOnly = _props['aria-readonly'],
      accessibilityReadOnly = _props.accessibilityReadOnly,
      ariaRequired = _props['aria-required'],
      accessibilityRequired = _props.accessibilityRequired,
      ariaRole = _props.role,
      accessibilityRole = _props.accessibilityRole,
      ariaRoleDescription = _props['aria-roledescription'],
      accessibilityRoleDescription = _props.accessibilityRoleDescription,
      ariaRowCount = _props['aria-rowcount'],
      accessibilityRowCount = _props.accessibilityRowCount,
      ariaRowIndex = _props['aria-rowindex'],
      accessibilityRowIndex = _props.accessibilityRowIndex,
      ariaRowSpan = _props['aria-rowspan'],
      accessibilityRowSpan = _props.accessibilityRowSpan,
      ariaSelected = _props['aria-selected'],
      accessibilitySelected = _props.accessibilitySelected,
      ariaSetSize = _props['aria-setsize'],
      accessibilitySetSize = _props.accessibilitySetSize,
      ariaSort = _props['aria-sort'],
      accessibilitySort = _props.accessibilitySort,
      ariaValueMax = _props['aria-valuemax'],
      accessibilityValueMax = _props.accessibilityValueMax,
      ariaValueMin = _props['aria-valuemin'],
      accessibilityValueMin = _props.accessibilityValueMin,
      ariaValueNow = _props['aria-valuenow'],
      accessibilityValueNow = _props.accessibilityValueNow,
      ariaValueText = _props['aria-valuetext'],
      accessibilityValueText = _props.accessibilityValueText,
      dataSet = _props.dataSet,
      focusable = _props.focusable,
      id = _props.id,
      nativeID = _props.nativeID,
      pointerEvents = _props.pointerEvents,
      style = _props.style,
      tabIndex = _props.tabIndex,
      testID = _props.testID,
      domProps = (0, _objectWithoutPropertiesLoose.default)(_props, _excluded);

    /*
    if (accessibilityDisabled != null) {
      warnOnce('accessibilityDisabled', `accessibilityDisabled is deprecated.`);
    }
    */
    var disabled = ariaDisabled || accessibilityDisabled;
    var role = AccessibilityUtil.default.propsToAriaRole(props);

    // ACCESSIBILITY
    /*
    if (accessibilityActiveDescendant != null) {
      warnOnce(
        'accessibilityActiveDescendant',
        `accessibilityActiveDescendant is deprecated. Use aria-activedescendant.`
      );
    }
    */
    var _ariaActiveDescendant = ariaActiveDescendant != null ? ariaActiveDescendant : accessibilityActiveDescendant;
    if (_ariaActiveDescendant != null) {
      domProps['aria-activedescendant'] = _ariaActiveDescendant;
    }

    /*
    if (accessibilityAtomic != null) {
      warnOnce(
        'accessibilityAtomic',
        `accessibilityAtomic is deprecated. Use aria-atomic.`
      );
    }
    */
    var _ariaAtomic = ariaAtomic != null ? ariaActiveDescendant : accessibilityAtomic;
    if (_ariaAtomic != null) {
      domProps['aria-atomic'] = _ariaAtomic;
    }

    /*
    if (accessibilityAutoComplete != null) {
      warnOnce(
        'accessibilityAutoComplete',
        `accessibilityAutoComplete is deprecated. Use aria-autocomplete.`
      );
    }
    */
    var _ariaAutoComplete = ariaAutoComplete != null ? ariaAutoComplete : accessibilityAutoComplete;
    if (_ariaAutoComplete != null) {
      domProps['aria-autocomplete'] = _ariaAutoComplete;
    }

    /*
    if (accessibilityBusy != null) {
      warnOnce(
        'accessibilityBusy',
        `accessibilityBusy is deprecated. Use aria-busy.`
      );
    }
    */
    var _ariaBusy = ariaBusy != null ? ariaBusy : accessibilityBusy;
    if (_ariaBusy != null) {
      domProps['aria-busy'] = _ariaBusy;
    }

    /*
    if (accessibilityChecked != null) {
      warnOnce(
        'accessibilityChecked',
        `accessibilityChecked is deprecated. Use aria-checked.`
      );
    }
    */
    var _ariaChecked = ariaChecked != null ? ariaChecked : accessibilityChecked;
    if (_ariaChecked != null) {
      domProps['aria-checked'] = _ariaChecked;
    }

    /*
    if (accessibilityColumnCount != null) {
      warnOnce(
        'accessibilityColumnCount',
        `accessibilityColumnCount is deprecated. Use aria-colcount.`
      );
    }
    */
    var _ariaColumnCount = ariaColumnCount != null ? ariaColumnCount : accessibilityColumnCount;
    if (_ariaColumnCount != null) {
      domProps['aria-colcount'] = _ariaColumnCount;
    }

    /*
    if (accessibilityColumnIndex != null) {
      warnOnce(
        'accessibilityColumnIndex',
        `accessibilityColumnIndex is deprecated. Use aria-colindex.`
      );
    }
    */
    var _ariaColumnIndex = ariaColumnIndex != null ? ariaColumnIndex : accessibilityColumnIndex;
    if (_ariaColumnIndex != null) {
      domProps['aria-colindex'] = _ariaColumnIndex;
    }

    /*
    if (accessibilityColumnSpan != null) {
      warnOnce(
        'accessibilityColumnSpan',
        `accessibilityColumnSpan is deprecated. Use aria-colspan.`
      );
    }
    */
    var _ariaColumnSpan = ariaColumnSpan != null ? ariaColumnSpan : accessibilityColumnSpan;
    if (_ariaColumnSpan != null) {
      domProps['aria-colspan'] = _ariaColumnSpan;
    }

    /*
    if (accessibilityControls != null) {
      warnOnce(
        'accessibilityControls',
        `accessibilityControls is deprecated. Use aria-controls.`
      );
    }
    */
    var _ariaControls = ariaControls != null ? ariaControls : accessibilityControls;
    if (_ariaControls != null) {
      domProps['aria-controls'] = processIDRefList(_ariaControls);
    }

    /*
    if (accessibilityCurrent != null) {
      warnOnce(
        'accessibilityCurrent',
        `accessibilityCurrent is deprecated. Use aria-current.`
      );
    }
    */
    var _ariaCurrent = ariaCurrent != null ? ariaCurrent : accessibilityCurrent;
    if (_ariaCurrent != null) {
      domProps['aria-current'] = _ariaCurrent;
    }

    /*
    if (accessibilityDescribedBy != null) {
      warnOnce(
        'accessibilityDescribedBy',
        `accessibilityDescribedBy is deprecated. Use aria-describedby.`
      );
    }
    */
    var _ariaDescribedBy = ariaDescribedBy != null ? ariaDescribedBy : accessibilityDescribedBy;
    if (_ariaDescribedBy != null) {
      domProps['aria-describedby'] = processIDRefList(_ariaDescribedBy);
    }

    /*
    if (accessibilityDetails != null) {
      warnOnce(
        'accessibilityDetails',
        `accessibilityDetails is deprecated. Use aria-details.`
      );
    }
    */
    var _ariaDetails = ariaDetails != null ? ariaDetails : accessibilityDetails;
    if (_ariaDetails != null) {
      domProps['aria-details'] = _ariaDetails;
    }
    if (disabled === true) {
      domProps['aria-disabled'] = true;
      // Enhance with native semantics
      if (elementType === 'button' || elementType === 'form' || elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
        domProps.disabled = true;
      }
    }

    /*
    if (accessibilityErrorMessage != null) {
      warnOnce(
        'accessibilityErrorMessage',
        `accessibilityErrorMessage is deprecated. Use aria-errormessage.`
      );
    }
    */
    var _ariaErrorMessage = ariaErrorMessage != null ? ariaErrorMessage : accessibilityErrorMessage;
    if (_ariaErrorMessage != null) {
      domProps['aria-errormessage'] = _ariaErrorMessage;
    }

    /*
    if (accessibilityExpanded != null) {
      warnOnce(
        'accessibilityExpanded',
        `accessibilityExpanded is deprecated. Use aria-expanded.`
      );
    }
    */
    var _ariaExpanded = ariaExpanded != null ? ariaExpanded : accessibilityExpanded;
    if (_ariaExpanded != null) {
      domProps['aria-expanded'] = _ariaExpanded;
    }

    /*
    if (accessibilityFlowTo != null) {
      warnOnce(
        'accessibilityFlowTo',
        `accessibilityFlowTo is deprecated. Use aria-flowto.`
      );
    }
    */
    var _ariaFlowTo = ariaFlowTo != null ? ariaFlowTo : accessibilityFlowTo;
    if (_ariaFlowTo != null) {
      domProps['aria-flowto'] = processIDRefList(_ariaFlowTo);
    }

    /*
    if (accessibilityHasPopup != null) {
      warnOnce(
        'accessibilityHasPopup',
        `accessibilityHasPopup is deprecated. Use aria-haspopup.`
      );
    }
    */
    var _ariaHasPopup = ariaHasPopup != null ? ariaHasPopup : accessibilityHasPopup;
    if (_ariaHasPopup != null) {
      domProps['aria-haspopup'] = _ariaHasPopup;
    }

    /*
    if (accessibilityHidden != null) {
      warnOnce(
        'accessibilityHidden',
        `accessibilityHidden is deprecated. Use aria-hidden.`
      );
    }
    */
    var _ariaHidden = ariaHidden != null ? ariaHidden : accessibilityHidden;
    if (_ariaHidden === true) {
      domProps['aria-hidden'] = _ariaHidden;
    }

    /*
    if (accessibilityInvalid != null) {
      warnOnce(
        'accessibilityInvalid',
        `accessibilityInvalid is deprecated. Use aria-invalid.`
      );
    }
    */
    var _ariaInvalid = ariaInvalid != null ? ariaInvalid : accessibilityInvalid;
    if (_ariaInvalid != null) {
      domProps['aria-invalid'] = _ariaInvalid;
    }

    /*
    if (accessibilityKeyShortcuts != null) {
      warnOnce(
        'accessibilityKeyShortcuts',
        `accessibilityKeyShortcuts is deprecated. Use aria-keyshortcuts.`
      );
    }
    */
    var _ariaKeyShortcuts = ariaKeyShortcuts != null ? ariaKeyShortcuts : accessibilityKeyShortcuts;
    if (_ariaKeyShortcuts != null) {
      domProps['aria-keyshortcuts'] = processIDRefList(_ariaKeyShortcuts);
    }

    /*
    if (accessibilityLabel != null) {
      warnOnce(
        'accessibilityLabel',
        `accessibilityLabel is deprecated. Use aria-label.`
      );
    }
    */
    var _ariaLabel = ariaLabel != null ? ariaLabel : accessibilityLabel;
    if (_ariaLabel != null) {
      domProps['aria-label'] = _ariaLabel;
    }

    /*
    if (accessibilityLabelledBy != null) {
      warnOnce(
        'accessibilityLabelledBy',
        `accessibilityLabelledBy is deprecated. Use aria-labelledby.`
      );
    }
    */
    var _ariaLabelledBy = ariaLabelledBy != null ? ariaLabelledBy : accessibilityLabelledBy;
    if (_ariaLabelledBy != null) {
      domProps['aria-labelledby'] = processIDRefList(_ariaLabelledBy);
    }

    /*
    if (accessibilityLevel != null) {
      warnOnce(
        'accessibilityLevel',
        `accessibilityLevel is deprecated. Use aria-level.`
      );
    }
    */
    var _ariaLevel = ariaLevel != null ? ariaLevel : accessibilityLevel;
    if (_ariaLevel != null) {
      domProps['aria-level'] = _ariaLevel;
    }

    /*
    if (accessibilityLiveRegion != null) {
      warnOnce(
        'accessibilityLiveRegion',
        `accessibilityLiveRegion is deprecated. Use aria-live.`
      );
    }
    */
    var _ariaLive = ariaLive != null ? ariaLive : accessibilityLiveRegion;
    if (_ariaLive != null) {
      domProps['aria-live'] = _ariaLive === 'none' ? 'off' : _ariaLive;
    }

    /*
    if (accessibilityModal != null) {
      warnOnce(
        'accessibilityModal',
        `accessibilityModal is deprecated. Use aria-modal.`
      );
    }
    */
    var _ariaModal = ariaModal != null ? ariaModal : accessibilityModal;
    if (_ariaModal != null) {
      domProps['aria-modal'] = _ariaModal;
    }

    /*
    if (accessibilityMultiline != null) {
      warnOnce(
        'accessibilityMultiline',
        `accessibilityMultiline is deprecated. Use aria-multiline.`
      );
    }
    */
    var _ariaMultiline = ariaMultiline != null ? ariaMultiline : accessibilityMultiline;
    if (_ariaMultiline != null) {
      domProps['aria-multiline'] = _ariaMultiline;
    }

    /*
    if (accessibilityMultiSelectable != null) {
      warnOnce(
        'accessibilityMultiSelectable',
        `accessibilityMultiSelectable is deprecated. Use aria-multiselectable.`
      );
    }
    */
    var _ariaMultiSelectable = ariaMultiSelectable != null ? ariaMultiSelectable : accessibilityMultiSelectable;
    if (_ariaMultiSelectable != null) {
      domProps['aria-multiselectable'] = _ariaMultiSelectable;
    }

    /*
    if (accessibilityOrientation != null) {
      warnOnce(
        'accessibilityOrientation',
        `accessibilityOrientation is deprecated. Use aria-orientation.`
      );
    }
    */
    var _ariaOrientation = ariaOrientation != null ? ariaOrientation : accessibilityOrientation;
    if (_ariaOrientation != null) {
      domProps['aria-orientation'] = _ariaOrientation;
    }

    /*
    if (accessibilityOwns != null) {
      warnOnce(
        'accessibilityOwns',
        `accessibilityOwns is deprecated. Use aria-owns.`
      );
    }
    */
    var _ariaOwns = ariaOwns != null ? ariaOwns : accessibilityOwns;
    if (_ariaOwns != null) {
      domProps['aria-owns'] = processIDRefList(_ariaOwns);
    }

    /*
    if (accessibilityPlaceholder != null) {
      warnOnce(
        'accessibilityPlaceholder',
        `accessibilityPlaceholder is deprecated. Use aria-placeholder.`
      );
    }
    */
    var _ariaPlaceholder = ariaPlaceholder != null ? ariaPlaceholder : accessibilityPlaceholder;
    if (_ariaPlaceholder != null) {
      domProps['aria-placeholder'] = _ariaPlaceholder;
    }

    /*
    if (accessibilityPosInSet != null) {
      warnOnce(
        'accessibilityPosInSet',
        `accessibilityPosInSet is deprecated. Use aria-posinset.`
      );
    }
    */
    var _ariaPosInSet = ariaPosInSet != null ? ariaPosInSet : accessibilityPosInSet;
    if (_ariaPosInSet != null) {
      domProps['aria-posinset'] = _ariaPosInSet;
    }

    /*
    if (accessibilityPressed != null) {
      warnOnce(
        'accessibilityPressed',
        `accessibilityPressed is deprecated. Use aria-pressed.`
      );
    }
    */
    var _ariaPressed = ariaPressed != null ? ariaPressed : accessibilityPressed;
    if (_ariaPressed != null) {
      domProps['aria-pressed'] = _ariaPressed;
    }

    /*
    if (accessibilityReadOnly != null) {
      warnOnce(
        'accessibilityReadOnly',
        `accessibilityReadOnly is deprecated. Use aria-readonly.`
      );
    }
    */
    var _ariaReadOnly = ariaReadOnly != null ? ariaReadOnly : accessibilityReadOnly;
    if (_ariaReadOnly != null) {
      domProps['aria-readonly'] = _ariaReadOnly;
      // Enhance with native semantics
      if (elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
        domProps.readOnly = true;
      }
    }

    /*
    if (accessibilityRequired != null) {
      warnOnce(
        'accessibilityRequired',
        `accessibilityRequired is deprecated. Use aria-required.`
      );
    }
    */
    var _ariaRequired = ariaRequired != null ? ariaRequired : accessibilityRequired;
    if (_ariaRequired != null) {
      domProps['aria-required'] = _ariaRequired;
      // Enhance with native semantics
      if (elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
        domProps.required = accessibilityRequired;
      }
    }

    /*
    if (accessibilityRole != null) {
      warnOnce('accessibilityRole', `accessibilityRole is deprecated. Use role.`);
    }
    */
    if (role != null) {
      // 'presentation' synonym has wider browser support
      domProps['role'] = role === 'none' ? 'presentation' : role;
    }

    /*
    if (accessibilityRoleDescription != null) {
      warnOnce(
        'accessibilityRoleDescription',
        `accessibilityRoleDescription is deprecated. Use aria-roledescription.`
      );
    }
    */
    var _ariaRoleDescription = ariaRoleDescription != null ? ariaRoleDescription : accessibilityRoleDescription;
    if (_ariaRoleDescription != null) {
      domProps['aria-roledescription'] = _ariaRoleDescription;
    }

    /*
    if (accessibilityRowCount != null) {
      warnOnce(
        'accessibilityRowCount',
        `accessibilityRowCount is deprecated. Use aria-rowcount.`
      );
    }
    */
    var _ariaRowCount = ariaRowCount != null ? ariaRowCount : accessibilityRowCount;
    if (_ariaRowCount != null) {
      domProps['aria-rowcount'] = _ariaRowCount;
    }

    /*
    if (accessibilityRowIndex != null) {
      warnOnce(
        'accessibilityRowIndex',
        `accessibilityRowIndex is deprecated. Use aria-rowindex.`
      );
    }
    */
    var _ariaRowIndex = ariaRowIndex != null ? ariaRowIndex : accessibilityRowIndex;
    if (_ariaRowIndex != null) {
      domProps['aria-rowindex'] = _ariaRowIndex;
    }

    /*
    if (accessibilityRowSpan != null) {
      warnOnce(
        'accessibilityRowSpan',
        `accessibilityRowSpan is deprecated. Use aria-rowspan.`
      );
    }
    */
    var _ariaRowSpan = ariaRowSpan != null ? ariaRowSpan : accessibilityRowSpan;
    if (_ariaRowSpan != null) {
      domProps['aria-rowspan'] = _ariaRowSpan;
    }

    /*
    if (accessibilitySelected != null) {
      warnOnce(
        'accessibilitySelected',
        `accessibilitySelected is deprecated. Use aria-selected.`
      );
    }
    */
    var _ariaSelected = ariaSelected != null ? ariaSelected : accessibilitySelected;
    if (_ariaSelected != null) {
      domProps['aria-selected'] = _ariaSelected;
    }

    /*
    if (accessibilitySetSize != null) {
      warnOnce(
        'accessibilitySetSize',
        `accessibilitySetSize is deprecated. Use aria-setsize.`
      );
    }
    */
    var _ariaSetSize = ariaSetSize != null ? ariaSetSize : accessibilitySetSize;
    if (_ariaSetSize != null) {
      domProps['aria-setsize'] = _ariaSetSize;
    }

    /*
    if (accessibilitySort != null) {
      warnOnce(
        'accessibilitySort',
        `accessibilitySort is deprecated. Use aria-sort.`
      );
    }
    */
    var _ariaSort = ariaSort != null ? ariaSort : accessibilitySort;
    if (_ariaSort != null) {
      domProps['aria-sort'] = _ariaSort;
    }

    /*
    if (accessibilityValueMax != null) {
      warnOnce(
        'accessibilityValueMax',
        `accessibilityValueMax is deprecated. Use aria-valuemax.`
      );
    }
    */
    var _ariaValueMax = ariaValueMax != null ? ariaValueMax : accessibilityValueMax;
    if (_ariaValueMax != null) {
      domProps['aria-valuemax'] = _ariaValueMax;
    }

    /*
    if (accessibilityValueMin != null) {
      warnOnce(
        'accessibilityValueMin',
        `accessibilityValueMin is deprecated. Use aria-valuemin.`
      );
    }
    */
    var _ariaValueMin = ariaValueMin != null ? ariaValueMin : accessibilityValueMin;
    if (_ariaValueMin != null) {
      domProps['aria-valuemin'] = _ariaValueMin;
    }

    /*
    if (accessibilityValueNow != null) {
      warnOnce(
        'accessibilityValueNow',
        `accessibilityValueNow is deprecated. Use aria-valuenow.`
      );
    }
    */
    var _ariaValueNow = ariaValueNow != null ? ariaValueNow : accessibilityValueNow;
    if (_ariaValueNow != null) {
      domProps['aria-valuenow'] = _ariaValueNow;
    }

    /*
    if (accessibilityValueText != null) {
      warnOnce(
        'accessibilityValueText',
        `accessibilityValueText is deprecated. Use aria-valuetext.`
      );
    }
    */
    var _ariaValueText = ariaValueText != null ? ariaValueText : accessibilityValueText;
    if (_ariaValueText != null) {
      domProps['aria-valuetext'] = _ariaValueText;
    }

    // "dataSet" replaced with "data-*"
    if (dataSet != null) {
      for (var dataProp in dataSet) {
        if (hasOwnProperty.call(dataSet, dataProp)) {
          var dataName = hyphenateString(dataProp);
          var dataValue = dataSet[dataProp];
          if (dataValue != null) {
            domProps["data-" + dataName] = dataValue;
          }
        }
      }
    }

    // FOCUS
    if (tabIndex === 0 || tabIndex === '0' || tabIndex === -1 || tabIndex === '-1') {
      domProps.tabIndex = tabIndex;
    } else {
      /*
      if (focusable != null) {
        warnOnce('focusable', `focusable is deprecated.`);
      }
      */

      // "focusable" indicates that an element may be a keyboard tab-stop.
      if (focusable === false) {
        domProps.tabIndex = '-1';
      }
      if (
      // These native elements are keyboard focusable by default
      elementType === 'a' || elementType === 'button' || elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
        if (focusable === false || accessibilityDisabled === true) {
          domProps.tabIndex = '-1';
        }
      } else if (
      // These roles are made keyboard focusable by default
      role === 'button' || role === 'checkbox' || role === 'link' || role === 'radio' || role === 'textbox' || role === 'switch') {
        if (focusable !== false) {
          domProps.tabIndex = '0';
        }
      } else {
        // Everything else must explicitly set the prop
        if (focusable === true) {
          domProps.tabIndex = '0';
        }
      }
    }

    // Resolve styles
    if (pointerEvents != null) {
      (0, _warnOnce.warnOnce)('pointerEvents', "props.pointerEvents is deprecated. Use style.pointerEvents");
    }
    var _StyleSheet = (0, StyleSheet.default)([style, pointerEvents && pointerEventsStyles[pointerEvents]], (0, _objectSpread.default)({
        writingDirection: 'ltr'
      }, options)),
      className = _StyleSheet[0],
      inlineStyle = _StyleSheet[1];
    if (className) {
      domProps.className = className;
    }
    if (inlineStyle) {
      domProps.style = inlineStyle;
    }

    // OTHER
    // Native element ID
    /*
    if (nativeID != null) {
      warnOnce('nativeID', `nativeID is deprecated. Use id.`);
    }
    */
    var _id = id != null ? id : nativeID;
    if (_id != null) {
      domProps.id = _id;
    }
    // Automated test IDs
    if (testID != null) {
      domProps['data-testid'] = testID;
    }
    if (domProps.type == null && elementType === 'button') {
      domProps.type = 'button';
    }
    return domProps;
  };
  var _default = createDOMProps;
},10,[11,4,6,16,64]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _objectSpread2;
    }
  });
  var _definePropertyJs = require(_dependencyMap[0]);
  var defineProperty = _interopDefault(_definePropertyJs);
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
        (0, defineProperty.default)(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
},11,[12]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _defineProperty;
    }
  });
  var _toPropertyKeyJs = require(_dependencyMap[0]);
  var toPropertyKey = _interopDefault(_toPropertyKeyJs);
  function _defineProperty(e, r, t) {
    return (r = (0, toPropertyKey.default)(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
},12,[13]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return toPropertyKey;
    }
  });
  var _typeofJs = require(_dependencyMap[0]);
  var _typeof = _interopDefault(_typeofJs);
  var _toPrimitiveJs = require(_dependencyMap[1]);
  var toPrimitive = _interopDefault(_toPrimitiveJs);
  function toPropertyKey(t) {
    var i = (0, toPrimitive.default)(t, "string");
    return "symbol" == (0, _typeof.default)(i) ? i : i + "";
  }
},13,[14,15]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _typeof;
    }
  });
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
},14,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return toPrimitive;
    }
  });
  var _typeofJs = require(_dependencyMap[0]);
  var _typeof = _interopDefault(_typeofJs);
  function toPrimitive(t, r) {
    if ("object" != (0, _typeof.default)(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (undefined !== e) {
      var i = e.call(t, r || "default");
      if ("object" != (0, _typeof.default)(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
},15,[14]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _babelRuntimeHelpersObjectSpread = require(_dependencyMap[0]);
  var _objectSpread = _interopDefault(_babelRuntimeHelpersObjectSpread);
  var _babelRuntimeHelpersObjectWithoutPropertiesLoose = require(_dependencyMap[1]);
  var _objectWithoutPropertiesLoose = _interopDefault(_babelRuntimeHelpersObjectWithoutPropertiesLoose);
  var _compiler = require(_dependencyMap[2]);
  var _dom = require(_dependencyMap[3]);
  var _styleqTransformLocalizeStyle = require(_dependencyMap[4]);
  var _preprocess = require(_dependencyMap[5]);
  var _styleq = require(_dependencyMap[6]);
  require(_dependencyMap[7]);
  var _modulesCanUseDom = require(_dependencyMap[8]);
  var canUseDOM = _interopDefault(_modulesCanUseDom);
  var _excluded = ["writingDirection"];
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var staticStyleMap = new WeakMap();
  var sheet = (0, _dom.createSheet)();
  var defaultPreprocessOptions = {
    shadow: true,
    textShadow: true
  };
  function customStyleq(styles, options) {
    if (options === undefined) {
      options = {};
    }
    var _options = options,
      writingDirection = _options.writingDirection,
      preprocessOptions = (0, _objectWithoutPropertiesLoose.default)(_options, _excluded);
    var isRTL = writingDirection === 'rtl';
    return _styleq.styleq.factory({
      transform(style) {
        var compiledStyle = staticStyleMap.get(style);
        if (compiledStyle != null) {
          return (0, _styleqTransformLocalizeStyle.localizeStyle)(compiledStyle, isRTL);
        }
        return (0, _preprocess.preprocess)(style, (0, _objectSpread.default)((0, _objectSpread.default)({}, defaultPreprocessOptions), preprocessOptions));
      }
    })(styles);
  }
  function insertRules(compiledOrderedRules) {
    compiledOrderedRules.forEach(_ref => {
      var rules = _ref[0],
        order = _ref[1];
      if (sheet != null) {
        rules.forEach(rule => {
          sheet.insert(rule, order);
        });
      }
    });
  }
  function compileAndInsertAtomic(style) {
    var _atomic = (0, _compiler.atomic)((0, _preprocess.preprocess)(style, defaultPreprocessOptions)),
      compiledStyle = _atomic[0],
      compiledOrderedRules = _atomic[1];
    insertRules(compiledOrderedRules);
    return compiledStyle;
  }
  function compileAndInsertReset(style, key) {
    var _classic = (0, _compiler.classic)(style, key),
      compiledStyle = _classic[0],
      compiledOrderedRules = _classic[1];
    insertRules(compiledOrderedRules);
    return compiledStyle;
  }

  /* ----- API ----- */

  var absoluteFillObject = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  };
  var absoluteFill = create({
    x: (0, _objectSpread.default)({}, absoluteFillObject)
  }).x;

  /**
   * create
   */
  function create(styles) {
    Object.keys(styles).forEach(key => {
      var styleObj = styles[key];
      // Only compile at runtime if the style is not already compiled
      if (styleObj != null && styleObj.$$css !== true) {
        var compiledStyles;
        if (key.indexOf('$raw') > -1) {
          compiledStyles = compileAndInsertReset(styleObj, key.split('$raw')[0]);
        } else {
          compiledStyles = compileAndInsertAtomic(styleObj);
        }
        staticStyleMap.set(styleObj, compiledStyles);
      }
    });
    return styles;
  }

  /**
   * compose
   */
  function compose(style1, style2) {
    return [style1, style2];
  }

  /**
   * flatten
   */
  function flatten() {
    for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }
    var flatArray = styles.flat(Infinity);
    var result = {};
    for (var i = 0; i < flatArray.length; i++) {
      var style = flatArray[i];
      if (style != null && typeof style === 'object') {
        // $FlowFixMe
        Object.assign(result, style);
      }
    }
    return result;
  }

  /**
   * getSheet
   */
  function getSheet() {
    return {
      id: sheet.id,
      textContent: sheet.getTextContent()
    };
  }

  /**
   * resolve
   */

  function StyleSheet(styles, options) {
    if (options === undefined) {
      options = {};
    }
    var isRTL = options.writingDirection === 'rtl';
    var styleProps = customStyleq(styles, options);
    if (Array.isArray(styleProps) && styleProps[1] != null) {
      styleProps[1] = (0, _compiler.inline)(styleProps[1], isRTL);
    }
    return styleProps;
  }
  StyleSheet.absoluteFill = absoluteFill;
  StyleSheet.absoluteFillObject = absoluteFillObject;
  StyleSheet.create = create;
  StyleSheet.compose = compose;
  StyleSheet.flatten = flatten;
  StyleSheet.getSheet = getSheet;
  // `hairlineWidth` is not implemented using screen density as browsers may
  // round sub-pixel values down to `0`, causing the line not to be rendered.
  StyleSheet.hairlineWidth = 1;
  if (canUseDOM.default && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = StyleSheet.flatten;
  }
  var stylesheet = StyleSheet;
  var _default = stylesheet;
},16,[11,4,17,58,61,63,65,66,25]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  exports.atomic = atomic;
  exports.classic = classic;
  exports.inline = inline;
  exports.stringifyValueWithProperty = stringifyValueWithProperty;
  var _babelRuntimeHelpersObjectSpread = require(_dependencyMap[0]);
  var _objectSpread = _interopDefault(_babelRuntimeHelpersObjectSpread);
  var _babelRuntimeHelpersObjectWithoutPropertiesLoose = require(_dependencyMap[1]);
  var _objectWithoutPropertiesLoose = _interopDefault(_babelRuntimeHelpersObjectWithoutPropertiesLoose);
  var _createReactDOMStyle = require(_dependencyMap[2]);
  var createReactDOMStyle = _interopDefault(_createReactDOMStyle);
  var _hash = require(_dependencyMap[3]);
  var hash = _interopDefault(_hash);
  var _hyphenateStyleName = require(_dependencyMap[4]);
  var hyphenateStyleName = _interopDefault(_hyphenateStyleName);
  var _normalizeValueWithProperty = require(_dependencyMap[5]);
  var normalizeValueWithProperty = _interopDefault(_normalizeValueWithProperty);
  var _modulesPrefixStyles = require(_dependencyMap[6]);
  var prefixStyles = _interopDefault(_modulesPrefixStyles);
  var _excluded = ["animationKeyframes"];
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var cache = new Map();
  var emptyObject = {};
  var classicGroup = 1;
  var atomicGroup = 3;
  var customGroup = {
    borderColor: 2,
    borderRadius: 2,
    borderStyle: 2,
    borderWidth: 2,
    display: 2,
    flex: 2,
    inset: 2,
    margin: 2,
    overflow: 2,
    overscrollBehavior: 2,
    padding: 2,
    insetBlock: 2.1,
    insetInline: 2.1,
    marginInline: 2.1,
    marginBlock: 2.1,
    paddingInline: 2.1,
    paddingBlock: 2.1,
    borderBlockStartColor: 2.2,
    borderBlockStartStyle: 2.2,
    borderBlockStartWidth: 2.2,
    borderBlockEndColor: 2.2,
    borderBlockEndStyle: 2.2,
    borderBlockEndWidth: 2.2,
    borderInlineStartColor: 2.2,
    borderInlineStartStyle: 2.2,
    borderInlineStartWidth: 2.2,
    borderInlineEndColor: 2.2,
    borderInlineEndStyle: 2.2,
    borderInlineEndWidth: 2.2,
    borderEndStartRadius: 2.2,
    borderEndEndRadius: 2.2,
    borderStartStartRadius: 2.2,
    borderStartEndRadius: 2.2,
    insetBlockEnd: 2.2,
    insetBlockStart: 2.2,
    insetInlineEnd: 2.2,
    insetInlineStart: 2.2,
    marginBlockStart: 2.2,
    marginBlockEnd: 2.2,
    marginInlineStart: 2.2,
    marginInlineEnd: 2.2,
    paddingBlockStart: 2.2,
    paddingBlockEnd: 2.2,
    paddingInlineStart: 2.2,
    paddingInlineEnd: 2.2
  };
  var borderTopLeftRadius = 'borderTopLeftRadius';
  var borderTopRightRadius = 'borderTopRightRadius';
  var borderBottomLeftRadius = 'borderBottomLeftRadius';
  var borderBottomRightRadius = 'borderBottomRightRadius';
  var borderLeftColor = 'borderLeftColor';
  var borderLeftStyle = 'borderLeftStyle';
  var borderLeftWidth = 'borderLeftWidth';
  var borderRightColor = 'borderRightColor';
  var borderRightStyle = 'borderRightStyle';
  var borderRightWidth = 'borderRightWidth';
  var right = 'right';
  var marginLeft = 'marginLeft';
  var marginRight = 'marginRight';
  var paddingLeft = 'paddingLeft';
  var paddingRight = 'paddingRight';
  var left = 'left';

  // Map of LTR property names to their BiDi equivalent.
  var PROPERTIES_FLIP = {
    [borderTopLeftRadius]: borderTopRightRadius,
    [borderTopRightRadius]: borderTopLeftRadius,
    [borderBottomLeftRadius]: borderBottomRightRadius,
    [borderBottomRightRadius]: borderBottomLeftRadius,
    [borderLeftColor]: borderRightColor,
    [borderLeftStyle]: borderRightStyle,
    [borderLeftWidth]: borderRightWidth,
    [borderRightColor]: borderLeftColor,
    [borderRightStyle]: borderLeftStyle,
    [borderRightWidth]: borderLeftWidth,
    [left]: right,
    [marginLeft]: marginRight,
    [marginRight]: marginLeft,
    [paddingLeft]: paddingRight,
    [paddingRight]: paddingLeft,
    [right]: left
  };

  // Map of I18N property names to their LTR equivalent.
  var PROPERTIES_I18N = {
    borderStartStartRadius: borderTopLeftRadius,
    borderStartEndRadius: borderTopRightRadius,
    borderEndStartRadius: borderBottomLeftRadius,
    borderEndEndRadius: borderBottomRightRadius,
    borderInlineStartColor: borderLeftColor,
    borderInlineStartStyle: borderLeftStyle,
    borderInlineStartWidth: borderLeftWidth,
    borderInlineEndColor: borderRightColor,
    borderInlineEndStyle: borderRightStyle,
    borderInlineEndWidth: borderRightWidth,
    insetInlineEnd: right,
    insetInlineStart: left,
    marginInlineStart: marginLeft,
    marginInlineEnd: marginRight,
    paddingInlineStart: paddingLeft,
    paddingInlineEnd: paddingRight
  };
  var PROPERTIES_VALUE = ['clear', 'float', 'textAlign'];
  function atomic(style) {
    var compiledStyle = {
      $$css: true
    };
    var compiledRules = [];
    function atomicCompile(srcProp, prop, value) {
      var valueString = stringifyValueWithProperty(value, prop);
      var cacheKey = prop + valueString;
      var cachedResult = cache.get(cacheKey);
      var identifier;
      if (cachedResult != null) {
        identifier = cachedResult[0];
        compiledRules.push(cachedResult[1]);
      } else {
        var v = srcProp !== prop ? cacheKey : valueString;
        identifier = createIdentifier('r', srcProp, v);
        var order = customGroup[srcProp] || atomicGroup;
        var rules = createAtomicRules(identifier, prop, value);
        var orderedRules = [rules, order];
        compiledRules.push(orderedRules);
        cache.set(cacheKey, [identifier, orderedRules]);
      }
      return identifier;
    }
    Object.keys(style).sort().forEach(srcProp => {
      var value = style[srcProp];
      if (value != null) {
        var localizeableValue;
        // BiDi flip values
        if (PROPERTIES_VALUE.indexOf(srcProp) > -1) {
          var _left = atomicCompile(srcProp, srcProp, 'left');
          var _right = atomicCompile(srcProp, srcProp, 'right');
          if (value === 'start') {
            localizeableValue = [_left, _right];
          } else if (value === 'end') {
            localizeableValue = [_right, _left];
          }
        }
        // BiDi flip properties
        var propPolyfill = PROPERTIES_I18N[srcProp];
        if (propPolyfill != null) {
          var ltr = atomicCompile(srcProp, propPolyfill, value);
          var rtl = atomicCompile(srcProp, PROPERTIES_FLIP[propPolyfill], value);
          localizeableValue = [ltr, rtl];
        }
        // BiDi flip transitionProperty value
        if (srcProp === 'transitionProperty') {
          var values = Array.isArray(value) ? value : [value];
          var polyfillIndices = [];
          for (var i = 0; i < values.length; i++) {
            var val = values[i];
            if (typeof val === 'string' && PROPERTIES_I18N[val] != null) {
              polyfillIndices.push(i);
            }
          }
          if (polyfillIndices.length > 0) {
            var ltrPolyfillValues = [...values];
            var rtlPolyfillValues = [...values];
            polyfillIndices.forEach(i => {
              var ltrVal = ltrPolyfillValues[i];
              if (typeof ltrVal === 'string') {
                var ltrPolyfill = PROPERTIES_I18N[ltrVal];
                var rtlPolyfill = PROPERTIES_FLIP[ltrPolyfill];
                ltrPolyfillValues[i] = ltrPolyfill;
                rtlPolyfillValues[i] = rtlPolyfill;
                var _ltr = atomicCompile(srcProp, srcProp, ltrPolyfillValues);
                var _rtl = atomicCompile(srcProp, srcProp, rtlPolyfillValues);
                localizeableValue = [_ltr, _rtl];
              }
            });
          }
        }
        if (localizeableValue == null) {
          localizeableValue = atomicCompile(srcProp, srcProp, value);
        } else {
          compiledStyle['$$css$localize'] = true;
        }
        compiledStyle[srcProp] = localizeableValue;
      }
    });
    return [compiledStyle, compiledRules];
  }

  /**
   * Compile simple style object to classic CSS rules.
   * No support for 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
   */
  function classic(style, name) {
    var compiledStyle = {
      $$css: true
    };
    var compiledRules = [];
    var animationKeyframes = style.animationKeyframes,
      rest = (0, _objectWithoutPropertiesLoose.default)(style, _excluded);
    var identifier = createIdentifier('css', name, JSON.stringify(style));
    var selector = "." + identifier;
    var animationName;
    if (animationKeyframes != null) {
      var _processKeyframesValu = processKeyframesValue(animationKeyframes),
        animationNames = _processKeyframesValu[0],
        keyframesRules = _processKeyframesValu[1];
      animationName = animationNames.join(',');
      compiledRules.push(...keyframesRules);
    }
    var block = createDeclarationBlock((0, _objectSpread.default)((0, _objectSpread.default)({}, rest), {}, {
      animationName
    }));
    compiledRules.push("" + selector + block);
    compiledStyle[identifier] = identifier;
    return [compiledStyle, [[compiledRules, classicGroup]]];
  }

  /**
   * Compile simple style object to inline DOM styles.
   * No support for 'animationKeyframes', 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
   */
  function inline(originalStyle, isRTL) {
    var style = originalStyle || emptyObject;
    var frozenProps = {};
    var nextStyle = {};
    var _loop = function _loop() {
      var originalValue = style[originalProp];
      var prop = originalProp;
      var value = originalValue;
      if (!Object.prototype.hasOwnProperty.call(style, originalProp) || originalValue == null) {
        return "continue";
      }

      // BiDi flip values
      if (PROPERTIES_VALUE.indexOf(originalProp) > -1) {
        if (originalValue === 'start') {
          value = isRTL ? 'right' : 'left';
        } else if (originalValue === 'end') {
          value = isRTL ? 'left' : 'right';
        }
      }
      // BiDi flip properties
      var propPolyfill = PROPERTIES_I18N[originalProp];
      if (propPolyfill != null) {
        prop = isRTL ? PROPERTIES_FLIP[propPolyfill] : propPolyfill;
      }
      // BiDi flip transitionProperty value
      if (originalProp === 'transitionProperty') {
        // $FlowFixMe
        var originalValues = Array.isArray(originalValue) ? originalValue : [originalValue];
        originalValues.forEach((val, i) => {
          if (typeof val === 'string') {
            var valuePolyfill = PROPERTIES_I18N[val];
            if (valuePolyfill != null) {
              originalValues[i] = isRTL ? PROPERTIES_FLIP[valuePolyfill] : valuePolyfill;
              value = originalValues.join(' ');
            }
          }
        });
      }

      // Create finalized style
      if (!frozenProps[prop]) {
        nextStyle[prop] = value;
      }
      if (prop === originalProp) {
        frozenProps[prop] = true;
      }

      //    if (PROPERTIES_I18N.hasOwnProperty(originalProp)) {
      //    frozenProps[prop] = true;
      //}
    };
    for (var originalProp in style) {
      var _ret = _loop();
      if (_ret === "continue") continue;
    }
    return (0, createReactDOMStyle.default)(nextStyle, true);
  }

  /**
   * Create a value string that normalizes different input values with a common
   * output.
   */
  function stringifyValueWithProperty(value, property) {
    // e.g., 0 => '0px', 'black' => 'rgba(0,0,0,1)'
    var normalizedValue = (0, normalizeValueWithProperty.default)(value, property);
    return typeof normalizedValue !== 'string' ? JSON.stringify(normalizedValue || '') : normalizedValue;
  }

  /**
   * Create the Atomic CSS rules needed for a given StyleSheet rule.
   * Translates StyleSheet declarations to CSS.
   */
  function createAtomicRules(identifier, property, value) {
    var rules = [];
    var selector = "." + identifier;

    // Handle non-standard properties and object values that require multiple
    // CSS rules to be created.
    switch (property) {
      case 'animationKeyframes':
        {
          var _processKeyframesValu2 = processKeyframesValue(value),
            animationNames = _processKeyframesValu2[0],
            keyframesRules = _processKeyframesValu2[1];
          var block = createDeclarationBlock({
            animationName: animationNames.join(',')
          });
          rules.push("" + selector + block, ...keyframesRules);
          break;
        }

      // Equivalent to using '::placeholder'
      case 'placeholderTextColor':
        {
          var _block = createDeclarationBlock({
            color: value,
            opacity: 1
          });
          rules.push(selector + "::-webkit-input-placeholder" + _block, selector + "::-moz-placeholder" + _block, selector + ":-ms-input-placeholder" + _block, selector + "::placeholder" + _block);
          break;
        }

      // Polyfill for additional 'pointer-events' values
      // See d13f78622b233a0afc0c7a200c0a0792c8ca9e58
      // See https://reactnative.dev/docs/view#pointerevents
      case 'pointerEvents':
        {
          var finalValue = value;
          if (value === 'auto') {
            finalValue = 'auto!important';
          } else if (value === 'none') {
            finalValue = 'none!important';
            var _block2 = createDeclarationBlock({
              pointerEvents: 'none'
            });
            rules.push(selector + ">* " + _block2);
          } else if (value === 'box-none') {
            finalValue = 'none!important';
            var _block3 = createDeclarationBlock({
              pointerEvents: 'auto'
            });
            rules.push(selector + ">* " + _block3);
          } else if (value === 'box-only') {
            finalValue = 'auto!important';
            var _block4 = createDeclarationBlock({
              pointerEvents: 'none'
            });
            rules.push(selector + ">* " + _block4);
          }
          var _block5 = createDeclarationBlock({
            pointerEvents: finalValue
          });
          rules.push("" + selector + _block5);
          break;
        }

      // Polyfill for draft spec
      // https://drafts.csswg.org/css-scrollbars-1/
      case 'scrollbarWidth':
        {
          if (value === 'none') {
            rules.push(selector + "::-webkit-scrollbar{display:none}");
          }
          var _block6 = createDeclarationBlock({
            scrollbarWidth: value
          });
          rules.push("" + selector + _block6);
          break;
        }
      default:
        {
          var _block7 = createDeclarationBlock({
            [property]: value
          });
          rules.push("" + selector + _block7);
          break;
        }
    }
    return rules;
  }

  /**
   * Creates a CSS declaration block from a StyleSheet object.
   */
  function createDeclarationBlock(style) {
    var domStyle = (0, prefixStyles.default)((0, createReactDOMStyle.default)(style));
    var declarationsString = Object.keys(domStyle).map(property => {
      var value = domStyle[property];
      var prop = (0, hyphenateStyleName.default)(property);
      // The prefixer may return an array of values:
      // { display: [ '-webkit-flex', 'flex' ] }
      // to represent "fallback" declarations
      // { display: -webkit-flex; display: flex; }
      if (Array.isArray(value)) {
        return value.map(v => prop + ":" + v).join(';');
      } else {
        return prop + ":" + value;
      }
    })
    // Once properties are hyphenated, this will put the vendor
    // prefixed and short-form properties first in the list.
    .sort().join(';');
    return "{" + declarationsString + ";}";
  }

  /**
   * An identifier is associated with a unique set of styles.
   */
  function createIdentifier(prefix, name, key) {
    var hashedString = (0, hash.default)(name + key);
    return prefix + "-" + hashedString;
  }

  /**
   * Create individual CSS keyframes rules.
   */
  function createKeyframes(keyframes) {
    var prefixes = ['-webkit-', ''];
    var identifier = createIdentifier('r', 'animation', JSON.stringify(keyframes));
    var steps = '{' + Object.keys(keyframes).map(stepName => {
      var rule = keyframes[stepName];
      var block = createDeclarationBlock(rule);
      return "" + stepName + block;
    }).join('') + '}';
    var rules = prefixes.map(prefix => {
      return "@" + prefix + "keyframes " + identifier + steps;
    });
    return [identifier, rules];
  }

  /**
   * Create CSS keyframes rules and names from a StyleSheet keyframes object.
   */
  function processKeyframesValue(keyframesValue) {
    if (typeof keyframesValue === 'number') {
      throw new Error("Invalid CSS keyframes type: " + typeof keyframesValue);
    }
    var animationNames = [];
    var rules = [];
    var value = Array.isArray(keyframesValue) ? keyframesValue : [keyframesValue];
    value.forEach(keyframes => {
      if (typeof keyframes === 'string') {
        // Support external animation libraries (identifiers only)
        animationNames.push(keyframes);
      } else {
        // Create rules for each of the keyframes
        var _createKeyframes = createKeyframes(keyframes),
          identifier = _createKeyframes[0],
          keyframesRules = _createKeyframes[1];
        animationNames.push(identifier);
        rules.push(...keyframesRules);
      }
    });
    return [animationNames, rules];
  }
},17,[11,4,18,26,27,19,28]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _normalizeValueWithProperty = require(_dependencyMap[0]);
  var normalizeValueWithProperty = _interopDefault(_normalizeValueWithProperty);
  var _modulesCanUseDom = require(_dependencyMap[1]);
  var canUseDOM = _interopDefault(_modulesCanUseDom);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  /**
   * The browser implements the CSS cascade, where the order of properties is a
   * factor in determining which styles to paint. React Native is different. It
   * gives giving precedence to the more specific style property. For example,
   * the value of `paddingTop` takes precedence over that of `padding`.
   *
   * This module creates mutally exclusive style declarations by expanding all of
   * React Native's supported shortform properties (e.g. `padding`) to their
   * longfrom equivalents.
   */

  var emptyObject = {};
  var supportsCSS3TextDecoration = !canUseDOM.default || window.CSS != null && window.CSS.supports != null && (window.CSS.supports('text-decoration-line', 'none') || window.CSS.supports('-webkit-text-decoration-line', 'none'));
  var MONOSPACE_FONT_STACK = 'monospace,monospace';
  var SYSTEM_FONT_STACK = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
  var STYLE_SHORT_FORM_EXPANSIONS = {
    borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
    borderBlockColor: ['borderTopColor', 'borderBottomColor'],
    borderInlineColor: ['borderRightColor', 'borderLeftColor'],
    borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],
    borderStyle: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
    borderBlockStyle: ['borderTopStyle', 'borderBottomStyle'],
    borderInlineStyle: ['borderRightStyle', 'borderLeftStyle'],
    borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
    borderBlockWidth: ['borderTopWidth', 'borderBottomWidth'],
    borderInlineWidth: ['borderRightWidth', 'borderLeftWidth'],
    insetBlock: ['top', 'bottom'],
    insetInline: ['left', 'right'],
    marginBlock: ['marginTop', 'marginBottom'],
    marginInline: ['marginRight', 'marginLeft'],
    paddingBlock: ['paddingTop', 'paddingBottom'],
    paddingInline: ['paddingRight', 'paddingLeft'],
    overflow: ['overflowX', 'overflowY'],
    overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
    borderBlockStartColor: ['borderTopColor'],
    borderBlockStartStyle: ['borderTopStyle'],
    borderBlockStartWidth: ['borderTopWidth'],
    borderBlockEndColor: ['borderBottomColor'],
    borderBlockEndStyle: ['borderBottomStyle'],
    borderBlockEndWidth: ['borderBottomWidth'],
    //borderInlineStartColor: ['borderLeftColor'],
    //borderInlineStartStyle: ['borderLeftStyle'],
    //borderInlineStartWidth: ['borderLeftWidth'],
    //borderInlineEndColor: ['borderRightColor'],
    //borderInlineEndStyle: ['borderRightStyle'],
    //borderInlineEndWidth: ['borderRightWidth'],
    borderEndStartRadius: ['borderBottomLeftRadius'],
    borderEndEndRadius: ['borderBottomRightRadius'],
    borderStartStartRadius: ['borderTopLeftRadius'],
    borderStartEndRadius: ['borderTopRightRadius'],
    insetBlockEnd: ['bottom'],
    insetBlockStart: ['top'],
    //insetInlineEnd: ['right'],
    //insetInlineStart: ['left'],
    marginBlockStart: ['marginTop'],
    marginBlockEnd: ['marginBottom'],
    //marginInlineStart: ['marginLeft'],
    //marginInlineEnd: ['marginRight'],
    paddingBlockStart: ['paddingTop'],
    paddingBlockEnd: ['paddingBottom']
    //paddingInlineStart: ['marginLeft'],
    //paddingInlineEnd: ['marginRight'],
  };

  /**
   * Reducer
   */

  var createReactDOMStyle = (style, isInline) => {
    if (!style) {
      return emptyObject;
    }
    var resolvedStyle = {};
    var _loop = function _loop() {
      var value = style[prop];
      if (
      // Ignore everything with a null value
      value == null) {
        return "continue";
      }
      if (prop === 'backgroundClip') {
        // TODO: remove once this issue is fixed
        // https://github.com/rofrischmann/inline-style-prefixer/issues/159
        if (value === 'text') {
          resolvedStyle.backgroundClip = value;
          resolvedStyle.WebkitBackgroundClip = value;
        }
      } else if (prop === 'flex') {
        if (value === -1) {
          resolvedStyle.flexGrow = 0;
          resolvedStyle.flexShrink = 1;
          resolvedStyle.flexBasis = 'auto';
        } else {
          resolvedStyle.flex = value;
        }
      } else if (prop === 'font') {
        resolvedStyle[prop] = value.replace('System', SYSTEM_FONT_STACK);
      } else if (prop === 'fontFamily') {
        if (value.indexOf('System') > -1) {
          var stack = value.split(/,\s*/);
          stack[stack.indexOf('System')] = SYSTEM_FONT_STACK;
          resolvedStyle[prop] = stack.join(',');
        } else if (value === 'monospace') {
          resolvedStyle[prop] = MONOSPACE_FONT_STACK;
        } else {
          resolvedStyle[prop] = value;
        }
      } else if (prop === 'textDecorationLine') {
        // use 'text-decoration' for browsers that only support CSS2
        // text-decoration (e.g., IE, Edge)
        if (!supportsCSS3TextDecoration) {
          resolvedStyle.textDecoration = value;
        } else {
          resolvedStyle.textDecorationLine = value;
        }
      } else if (prop === 'writingDirection') {
        resolvedStyle.direction = value;
      } else {
        var _value = (0, normalizeValueWithProperty.default)(style[prop], prop);
        var longFormProperties = STYLE_SHORT_FORM_EXPANSIONS[prop];
        if (isInline && prop === 'inset') {
          if (style.insetInline == null) {
            resolvedStyle.left = _value;
            resolvedStyle.right = _value;
          }
          if (style.insetBlock == null) {
            resolvedStyle.top = _value;
            resolvedStyle.bottom = _value;
          }
        } else if (isInline && prop === 'margin') {
          if (style.marginInline == null) {
            resolvedStyle.marginLeft = _value;
            resolvedStyle.marginRight = _value;
          }
          if (style.marginBlock == null) {
            resolvedStyle.marginTop = _value;
            resolvedStyle.marginBottom = _value;
          }
        } else if (isInline && prop === 'padding') {
          if (style.paddingInline == null) {
            resolvedStyle.paddingLeft = _value;
            resolvedStyle.paddingRight = _value;
          }
          if (style.paddingBlock == null) {
            resolvedStyle.paddingTop = _value;
            resolvedStyle.paddingBottom = _value;
          }
        } else if (longFormProperties) {
          longFormProperties.forEach((longForm, i) => {
            // The value of any longform property in the original styles takes
            // precedence over the shortform's value.
            if (style[longForm] == null) {
              resolvedStyle[longForm] = _value;
            }
          });
        } else {
          resolvedStyle[prop] = _value;
        }
      }
    };
    for (var prop in style) {
      var _ret = _loop();
      if (_ret === "continue") continue;
    }
    return resolvedStyle;
  };
  var _default = createReactDOMStyle;
},18,[19,25]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return normalizeValueWithProperty;
    }
  });
  var _unitlessNumbers = require(_dependencyMap[0]);
  var unitlessNumbers = _interopDefault(_unitlessNumbers);
  var _normalizeColor = require(_dependencyMap[1]);
  var normalizeColor = _interopDefault(_normalizeColor);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var colorProps = {
    backgroundColor: true,
    borderColor: true,
    borderTopColor: true,
    borderRightColor: true,
    borderBottomColor: true,
    borderLeftColor: true,
    color: true,
    shadowColor: true,
    textDecorationColor: true,
    textShadowColor: true
  };
  function normalizeValueWithProperty(value, property) {
    var returnValue = value;
    if ((property == null || !unitlessNumbers.default[property]) && typeof value === 'number') {
      returnValue = value + "px";
    } else if (property != null && colorProps[property]) {
      returnValue = (0, normalizeColor.default)(value);
    }
    return returnValue;
  }
},19,[20,21]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher.
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var unitlessNumbers = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexOrder: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    fontWeight: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowGap: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnGap: true,
    gridColumnStart: true,
    lineClamp: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    // SVG-related
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true,
    // transform types
    scale: true,
    scaleX: true,
    scaleY: true,
    scaleZ: true,
    // RN properties
    shadowOpacity: true
  };

  /**
   * Support style names that may come passed in prefixed by adding permutations
   * of vendor prefixes.
   */
  var prefixes = ['ms', 'Moz', 'O', 'Webkit'];
  var prefixKey = (prefix, key) => {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  };
  Object.keys(unitlessNumbers).forEach(prop => {
    prefixes.forEach(prefix => {
      unitlessNumbers[prefixKey(prefix, prop)] = unitlessNumbers[prop];
    });
  });
  var _default = unitlessNumbers;
},20,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _modulesIsWebColor = require(_dependencyMap[0]);
  var isWebColor = _interopDefault(_modulesIsWebColor);
  var _exportsProcessColor = require(_dependencyMap[1]);
  var processColor = _interopDefault(_exportsProcessColor);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var normalizeColor = function normalizeColor(color, opacity) {
    if (opacity === undefined) {
      opacity = 1;
    }
    if (color == null) return;
    if (typeof color === 'string' && (0, isWebColor.default)(color)) {
      return color;
    }
    var colorInt = (0, processColor.default)(color);
    if (colorInt != null) {
      var r = colorInt >> 16 & 255;
      var g = colorInt >> 8 & 255;
      var b = colorInt & 255;
      var a = (colorInt >> 24 & 255) / 255;
      var alpha = (a * opacity).toFixed(2);
      return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
    }
  };
  var _default = normalizeColor;
},21,[22,23]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var isWebColor = color => color === 'currentcolor' || color === 'currentColor' || color === 'inherit' || color.indexOf('var(') === 0;
  var _default = isWebColor;
},22,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _reactNativeNormalizeColors = require(_dependencyMap[0]);
  var normalizeColor = _interopDefault(_reactNativeNormalizeColors);
  /**
   * Copyright (c) Nicolas Gallagher.
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var processColor = color => {
    if (color === undefined || color === null) {
      return color;
    }

    // convert number and hex
    var int32Color = (0, normalizeColor.default)(color);
    if (int32Color === undefined || int32Color === null) {
      return undefined;
    }
    int32Color = (int32Color << 24 | int32Color >>> 8) >>> 0;
    return int32Color;
  };
  var _default = processColor;
},23,[24]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * @format
   * 
   */

  /* eslint no-bitwise: 0 */

  'use strict';

  function normalizeColor(color) {
    if (typeof color === 'number') {
      if (color >>> 0 === color && color >= 0 && color <= 0xffffffff) {
        return color;
      }
      return null;
    }
    if (typeof color !== 'string') {
      return null;
    }
    const matchers = getMatchers();
    let match;

    // Ordered based on occurrences on Facebook codebase
    if (match = matchers.hex6.exec(color)) {
      return parseInt(match[1] + 'ff', 16) >>> 0;
    }
    const colorFromKeyword = normalizeKeyword(color);
    if (colorFromKeyword != null) {
      return colorFromKeyword;
    }
    if (match = matchers.rgb.exec(color)) {
      return (parse255(match[1]) << 24 |
      // r
      parse255(match[2]) << 16 |
      // g
      parse255(match[3]) << 8 |
      // b
      0x000000ff) >>>
      // a
      0;
    }
    if (match = matchers.rgba.exec(color)) {
      // rgba(R G B / A) notation
      if (match[6] !== undefined) {
        return (parse255(match[6]) << 24 |
        // r
        parse255(match[7]) << 16 |
        // g
        parse255(match[8]) << 8 |
        // b
        parse1(match[9])) >>>
        // a
        0;
      }

      // rgba(R, G, B, A) notation
      return (parse255(match[2]) << 24 |
      // r
      parse255(match[3]) << 16 |
      // g
      parse255(match[4]) << 8 |
      // b
      parse1(match[5])) >>>
      // a
      0;
    }
    if (match = matchers.hex3.exec(color)) {
      return parseInt(match[1] + match[1] +
      // r
      match[2] + match[2] +
      // g
      match[3] + match[3] +
      // b
      'ff',
      // a
      16) >>> 0;
    }

    // https://drafts.csswg.org/css-color-4/#hex-notation
    if (match = matchers.hex8.exec(color)) {
      return parseInt(match[1], 16) >>> 0;
    }
    if (match = matchers.hex4.exec(color)) {
      return parseInt(match[1] + match[1] +
      // r
      match[2] + match[2] +
      // g
      match[3] + match[3] +
      // b
      match[4] + match[4],
      // a
      16) >>> 0;
    }
    if (match = matchers.hsl.exec(color)) {
      return (hslToRgb(parse360(match[1]),
      // h
      parsePercentage(match[2]),
      // s
      parsePercentage(match[3]) // l
      ) | 0x000000ff) >>>
      // a
      0;
    }
    if (match = matchers.hsla.exec(color)) {
      // hsla(H S L / A) notation
      if (match[6] !== undefined) {
        return (hslToRgb(parse360(match[6]),
        // h
        parsePercentage(match[7]),
        // s
        parsePercentage(match[8]) // l
        ) | parse1(match[9])) >>>
        // a
        0;
      }

      // hsla(H, S, L, A) notation
      return (hslToRgb(parse360(match[2]),
      // h
      parsePercentage(match[3]),
      // s
      parsePercentage(match[4]) // l
      ) | parse1(match[5])) >>>
      // a
      0;
    }
    if (match = matchers.hwb.exec(color)) {
      return (hwbToRgb(parse360(match[1]),
      // h
      parsePercentage(match[2]),
      // w
      parsePercentage(match[3]) // b
      ) | 0x000000ff) >>>
      // a
      0;
    }
    return null;
  }
  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 0.16666666666666666) {
      return p + (q - p) * 6 * t;
    }
    if (t < 0.5) {
      return q;
    }
    if (t < 0.6666666666666666) {
      return p + (q - p) * (0.6666666666666666 - t) * 6;
    }
    return p;
  }
  function hslToRgb(h, s, l) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 0.3333333333333333);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 0.3333333333333333);
    return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
  }
  function hwbToRgb(h, w, b) {
    if (w + b >= 1) {
      const gray = Math.round(w * 255 / (w + b));
      return gray << 24 | gray << 16 | gray << 8;
    }
    const red = hue2rgb(0, 1, h + 0.3333333333333333) * (1 - w - b) + w;
    const green = hue2rgb(0, 1, h) * (1 - w - b) + w;
    const blue = hue2rgb(0, 1, h - 0.3333333333333333) * (1 - w - b) + w;
    return Math.round(red * 255) << 24 | Math.round(green * 255) << 16 | Math.round(blue * 255) << 8;
  }
  const NUMBER = '[-+]?\\d*\\.?\\d+';
  const PERCENTAGE = "[-+]?\\d*\\.?\\d+%";
  function call(...args) {
    return '\\(\\s*(' + args.join(')\\s*,?\\s*(') + ')\\s*\\)';
  }
  function callWithSlashSeparator(...args) {
    return '\\(\\s*(' + args.slice(0, args.length - 1).join(')\\s*,?\\s*(') + ')\\s*/\\s*(' + args[args.length - 1] + ')\\s*\\)';
  }
  function commaSeparatedCall(...args) {
    return '\\(\\s*(' + args.join(')\\s*,\\s*(') + ')\\s*\\)';
  }
  let cachedMatchers;
  function getMatchers() {
    if (cachedMatchers === undefined) {
      cachedMatchers = {
        rgb: new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER)),
        rgba: new RegExp('rgba(' + commaSeparatedCall(NUMBER, NUMBER, NUMBER, NUMBER) + '|' + callWithSlashSeparator(NUMBER, NUMBER, NUMBER, NUMBER) + ')'),
        hsl: new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE)),
        hsla: new RegExp('hsla(' + commaSeparatedCall(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER) + '|' + callWithSlashSeparator(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER) + ')'),
        hwb: new RegExp('hwb' + call(NUMBER, PERCENTAGE, PERCENTAGE)),
        hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#([0-9a-fA-F]{6})$/,
        hex8: /^#([0-9a-fA-F]{8})$/
      };
    }
    return cachedMatchers;
  }
  function parse255(str) {
    const int = parseInt(str, 10);
    if (int < 0) {
      return 0;
    }
    if (int > 255) {
      return 255;
    }
    return int;
  }
  function parse360(str) {
    const int = parseFloat(str);
    return (int % 360 + 360) % 360 / 360;
  }
  function parse1(str) {
    const num = parseFloat(str);
    if (num < 0) {
      return 0;
    }
    if (num > 1) {
      return 255;
    }
    return Math.round(num * 255);
  }
  function parsePercentage(str) {
    // parseFloat conveniently ignores the final %
    const int = parseFloat(str);
    if (int < 0) {
      return 0;
    }
    if (int > 100) {
      return 1;
    }
    return int / 100;
  }
  function normalizeKeyword(name) {
    // prettier-ignore
    switch (name) {
      case 'transparent':
        return 0x00000000;
      // http://www.w3.org/TR/css3-color/#svg-color
      case 'aliceblue':
        return 0xf0f8ffff;
      case 'antiquewhite':
        return 0xfaebd7ff;
      case 'aqua':
        return 0x00ffffff;
      case 'aquamarine':
        return 0x7fffd4ff;
      case 'azure':
        return 0xf0ffffff;
      case 'beige':
        return 0xf5f5dcff;
      case 'bisque':
        return 0xffe4c4ff;
      case 'black':
        return 0x000000ff;
      case 'blanchedalmond':
        return 0xffebcdff;
      case 'blue':
        return 0x0000ffff;
      case 'blueviolet':
        return 0x8a2be2ff;
      case 'brown':
        return 0xa52a2aff;
      case 'burlywood':
        return 0xdeb887ff;
      case 'burntsienna':
        return 0xea7e5dff;
      case 'cadetblue':
        return 0x5f9ea0ff;
      case 'chartreuse':
        return 0x7fff00ff;
      case 'chocolate':
        return 0xd2691eff;
      case 'coral':
        return 0xff7f50ff;
      case 'cornflowerblue':
        return 0x6495edff;
      case 'cornsilk':
        return 0xfff8dcff;
      case 'crimson':
        return 0xdc143cff;
      case 'cyan':
        return 0x00ffffff;
      case 'darkblue':
        return 0x00008bff;
      case 'darkcyan':
        return 0x008b8bff;
      case 'darkgoldenrod':
        return 0xb8860bff;
      case 'darkgray':
        return 0xa9a9a9ff;
      case 'darkgreen':
        return 0x006400ff;
      case 'darkgrey':
        return 0xa9a9a9ff;
      case 'darkkhaki':
        return 0xbdb76bff;
      case 'darkmagenta':
        return 0x8b008bff;
      case 'darkolivegreen':
        return 0x556b2fff;
      case 'darkorange':
        return 0xff8c00ff;
      case 'darkorchid':
        return 0x9932ccff;
      case 'darkred':
        return 0x8b0000ff;
      case 'darksalmon':
        return 0xe9967aff;
      case 'darkseagreen':
        return 0x8fbc8fff;
      case 'darkslateblue':
        return 0x483d8bff;
      case 'darkslategray':
        return 0x2f4f4fff;
      case 'darkslategrey':
        return 0x2f4f4fff;
      case 'darkturquoise':
        return 0x00ced1ff;
      case 'darkviolet':
        return 0x9400d3ff;
      case 'deeppink':
        return 0xff1493ff;
      case 'deepskyblue':
        return 0x00bfffff;
      case 'dimgray':
        return 0x696969ff;
      case 'dimgrey':
        return 0x696969ff;
      case 'dodgerblue':
        return 0x1e90ffff;
      case 'firebrick':
        return 0xb22222ff;
      case 'floralwhite':
        return 0xfffaf0ff;
      case 'forestgreen':
        return 0x228b22ff;
      case 'fuchsia':
        return 0xff00ffff;
      case 'gainsboro':
        return 0xdcdcdcff;
      case 'ghostwhite':
        return 0xf8f8ffff;
      case 'gold':
        return 0xffd700ff;
      case 'goldenrod':
        return 0xdaa520ff;
      case 'gray':
        return 0x808080ff;
      case 'green':
        return 0x008000ff;
      case 'greenyellow':
        return 0xadff2fff;
      case 'grey':
        return 0x808080ff;
      case 'honeydew':
        return 0xf0fff0ff;
      case 'hotpink':
        return 0xff69b4ff;
      case 'indianred':
        return 0xcd5c5cff;
      case 'indigo':
        return 0x4b0082ff;
      case 'ivory':
        return 0xfffff0ff;
      case 'khaki':
        return 0xf0e68cff;
      case 'lavender':
        return 0xe6e6faff;
      case 'lavenderblush':
        return 0xfff0f5ff;
      case 'lawngreen':
        return 0x7cfc00ff;
      case 'lemonchiffon':
        return 0xfffacdff;
      case 'lightblue':
        return 0xadd8e6ff;
      case 'lightcoral':
        return 0xf08080ff;
      case 'lightcyan':
        return 0xe0ffffff;
      case 'lightgoldenrodyellow':
        return 0xfafad2ff;
      case 'lightgray':
        return 0xd3d3d3ff;
      case 'lightgreen':
        return 0x90ee90ff;
      case 'lightgrey':
        return 0xd3d3d3ff;
      case 'lightpink':
        return 0xffb6c1ff;
      case 'lightsalmon':
        return 0xffa07aff;
      case 'lightseagreen':
        return 0x20b2aaff;
      case 'lightskyblue':
        return 0x87cefaff;
      case 'lightslategray':
        return 0x778899ff;
      case 'lightslategrey':
        return 0x778899ff;
      case 'lightsteelblue':
        return 0xb0c4deff;
      case 'lightyellow':
        return 0xffffe0ff;
      case 'lime':
        return 0x00ff00ff;
      case 'limegreen':
        return 0x32cd32ff;
      case 'linen':
        return 0xfaf0e6ff;
      case 'magenta':
        return 0xff00ffff;
      case 'maroon':
        return 0x800000ff;
      case 'mediumaquamarine':
        return 0x66cdaaff;
      case 'mediumblue':
        return 0x0000cdff;
      case 'mediumorchid':
        return 0xba55d3ff;
      case 'mediumpurple':
        return 0x9370dbff;
      case 'mediumseagreen':
        return 0x3cb371ff;
      case 'mediumslateblue':
        return 0x7b68eeff;
      case 'mediumspringgreen':
        return 0x00fa9aff;
      case 'mediumturquoise':
        return 0x48d1ccff;
      case 'mediumvioletred':
        return 0xc71585ff;
      case 'midnightblue':
        return 0x191970ff;
      case 'mintcream':
        return 0xf5fffaff;
      case 'mistyrose':
        return 0xffe4e1ff;
      case 'moccasin':
        return 0xffe4b5ff;
      case 'navajowhite':
        return 0xffdeadff;
      case 'navy':
        return 0x000080ff;
      case 'oldlace':
        return 0xfdf5e6ff;
      case 'olive':
        return 0x808000ff;
      case 'olivedrab':
        return 0x6b8e23ff;
      case 'orange':
        return 0xffa500ff;
      case 'orangered':
        return 0xff4500ff;
      case 'orchid':
        return 0xda70d6ff;
      case 'palegoldenrod':
        return 0xeee8aaff;
      case 'palegreen':
        return 0x98fb98ff;
      case 'paleturquoise':
        return 0xafeeeeff;
      case 'palevioletred':
        return 0xdb7093ff;
      case 'papayawhip':
        return 0xffefd5ff;
      case 'peachpuff':
        return 0xffdab9ff;
      case 'peru':
        return 0xcd853fff;
      case 'pink':
        return 0xffc0cbff;
      case 'plum':
        return 0xdda0ddff;
      case 'powderblue':
        return 0xb0e0e6ff;
      case 'purple':
        return 0x800080ff;
      case 'rebeccapurple':
        return 0x663399ff;
      case 'red':
        return 0xff0000ff;
      case 'rosybrown':
        return 0xbc8f8fff;
      case 'royalblue':
        return 0x4169e1ff;
      case 'saddlebrown':
        return 0x8b4513ff;
      case 'salmon':
        return 0xfa8072ff;
      case 'sandybrown':
        return 0xf4a460ff;
      case 'seagreen':
        return 0x2e8b57ff;
      case 'seashell':
        return 0xfff5eeff;
      case 'sienna':
        return 0xa0522dff;
      case 'silver':
        return 0xc0c0c0ff;
      case 'skyblue':
        return 0x87ceebff;
      case 'slateblue':
        return 0x6a5acdff;
      case 'slategray':
        return 0x708090ff;
      case 'slategrey':
        return 0x708090ff;
      case 'snow':
        return 0xfffafaff;
      case 'springgreen':
        return 0x00ff7fff;
      case 'steelblue':
        return 0x4682b4ff;
      case 'tan':
        return 0xd2b48cff;
      case 'teal':
        return 0x008080ff;
      case 'thistle':
        return 0xd8bfd8ff;
      case 'tomato':
        return 0xff6347ff;
      case 'turquoise':
        return 0x40e0d0ff;
      case 'violet':
        return 0xee82eeff;
      case 'wheat':
        return 0xf5deb3ff;
      case 'white':
        return 0xffffffff;
      case 'whitesmoke':
        return 0xf5f5f5ff;
      case 'yellow':
        return 0xffff00ff;
      case 'yellowgreen':
        return 0x9acd32ff;
    }
    return null;
  }
  module.exports = normalizeColor;
},24,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  var _default = canUseDOM;
},25,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /* eslint-disable */

  /**
   * JS Implementation of MurmurHash2
   *
   * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
   * @see http://github.com/garycourt/murmurhash-js
   * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
   * @see http://sites.google.com/site/murmurhash/
   *
   * @param {string} str ASCII only
   * @param {number} seed Positive integer only
   * @return {number} 32-bit positive integer hash
   *
   * 
   */

  function murmurhash2_32_gc(str, seed) {
    var l = str.length,
      h = seed ^ l,
      i = 0,
      k;
    while (l >= 4) {
      k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
      k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
      k ^= k >>> 24;
      k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
      l -= 4;
      ++i;
    }
    switch (l) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
      case 2:
        h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
      case 1:
        h ^= str.charCodeAt(i) & 0xff;
        h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    }
    h ^= h >>> 13;
    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    h ^= h >>> 15;
    return h >>> 0;
  }
  var hash = str => murmurhash2_32_gc(str, 1).toString(36);
  var _default = hash;
},26,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var uppercasePattern = /[A-Z]/g;
  var msPattern = /^ms-/;
  var cache = {};
  function toHyphenLower(match) {
    return '-' + match.toLowerCase();
  }
  function hyphenateStyleName(name) {
    if (name in cache) {
      return cache[name];
    }
    var hName = name.replace(uppercasePattern, toHyphenLower);
    return cache[name] = msPattern.test(hName) ? '-' + hName : hName;
  }
  var _default = hyphenateStyleName;
},27,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _inlineStylePrefixerLibCreatePrefixer = require(_dependencyMap[0]);
  var createPrefixer = _interopDefault(_inlineStylePrefixerLibCreatePrefixer);
  var _static = require(_dependencyMap[1]);
  var staticData = _interopDefault(_static);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var prefixAll = (0, createPrefixer.default)(staticData.default);
  var _default = prefixAll;
},28,[29,35]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createPrefixer;
  var _prefixProperty = require(_dependencyMap[0]);
  var _prefixProperty2 = _interopRequireDefault(_prefixProperty);
  var _prefixValue = require(_dependencyMap[1]);
  var _prefixValue2 = _interopRequireDefault(_prefixValue);
  var _addNewValuesOnly = require(_dependencyMap[2]);
  var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);
  var _isObject = require(_dependencyMap[3]);
  var _isObject2 = _interopRequireDefault(_isObject);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function createPrefixer(_ref) {
    var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;
    return function prefix(style) {
      for (var property in style) {
        var value = style[property];

        // handle nested objects
        if ((0, _isObject2.default)(value)) {
          style[property] = prefix(value);
          // handle array values
        } else if (Array.isArray(value)) {
          var combinedValue = [];
          for (var i = 0, len = value.length; i < len; ++i) {
            var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
            (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
          }

          // only modify the value if it was touched
          // by any plugin to prevent unnecessary mutations
          if (combinedValue.length > 0) {
            style[property] = combinedValue;
          }
        } else {
          var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

          // only modify the value if it was touched
          // by any plugin to prevent unnecessary mutations
          if (_processedValue) {
            style[property] = _processedValue;
          }
          style = (0, _prefixProperty2.default)(prefixMap, property, style);
        }
      }
      return style;
    };
  }
},29,[30,32,33,34]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = prefixProperty;
  var _capitalizeString = require(_dependencyMap[0]);
  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function prefixProperty(prefixProperties, property, style) {
    var requiredPrefixes = prefixProperties[property];
    if (requiredPrefixes && style.hasOwnProperty(property)) {
      var capitalizedProperty = (0, _capitalizeString2.default)(property);
      for (var i = 0; i < requiredPrefixes.length; ++i) {
        var prefixedProperty = requiredPrefixes[i] + capitalizedProperty;
        if (!style[prefixedProperty]) {
          style[prefixedProperty] = style[property];
        }
      }
    }
    return style;
  }
},30,[31]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = capitalizeString;
  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
},31,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = prefixValue;
  function prefixValue(plugins, property, value, style, metaData) {
    for (var i = 0, len = plugins.length; i < len; ++i) {
      var processedValue = plugins[i](property, value, style, metaData);

      // we can stop processing if a value is returned
      // as all plugin criteria are unique
      if (processedValue) {
        return processedValue;
      }
    }
  }
},32,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addNewValuesOnly;
  function addIfNew(list, value) {
    if (list.indexOf(value) === -1) {
      list.push(value);
    }
  }
  function addNewValuesOnly(list, values) {
    if (Array.isArray(values)) {
      for (var i = 0, len = values.length; i < len; ++i) {
        addIfNew(list, values[i]);
      }
    } else {
      addIfNew(list, values);
    }
  }
},33,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isObject;
  function isObject(value) {
    return value instanceof Object && !Array.isArray(value);
  }
},34,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _inlineStylePrefixerLibPluginsCrossFade = require(_dependencyMap[0]);
  var crossFade = _interopDefault(_inlineStylePrefixerLibPluginsCrossFade);
  var _inlineStylePrefixerLibPluginsImageSet = require(_dependencyMap[1]);
  var imageSet = _interopDefault(_inlineStylePrefixerLibPluginsImageSet);
  var _inlineStylePrefixerLibPluginsLogical = require(_dependencyMap[2]);
  var logical = _interopDefault(_inlineStylePrefixerLibPluginsLogical);
  var _inlineStylePrefixerLibPluginsPosition = require(_dependencyMap[3]);
  var position = _interopDefault(_inlineStylePrefixerLibPluginsPosition);
  var _inlineStylePrefixerLibPluginsSizing = require(_dependencyMap[4]);
  var sizing = _interopDefault(_inlineStylePrefixerLibPluginsSizing);
  var _inlineStylePrefixerLibPluginsTransition = require(_dependencyMap[5]);
  var transition = _interopDefault(_inlineStylePrefixerLibPluginsTransition);
  var w = ['Webkit'];
  var m = ['Moz'];
  var wm = ['Webkit', 'Moz'];
  var wms = ['Webkit', 'ms'];
  var wmms = ['Webkit', 'Moz', 'ms'];
  var _default = {
    plugins: [crossFade.default, imageSet.default, logical.default, position.default, sizing.default, transition.default],
    prefixMap: {
      appearance: wmms,
      userSelect: wm,
      textEmphasisPosition: wms,
      textEmphasis: wms,
      textEmphasisStyle: wms,
      textEmphasisColor: wms,
      boxDecorationBreak: wms,
      clipPath: w,
      maskImage: wms,
      maskMode: wms,
      maskRepeat: wms,
      maskPosition: wms,
      maskClip: wms,
      maskOrigin: wms,
      maskSize: wms,
      maskComposite: wms,
      mask: wms,
      maskBorderSource: wms,
      maskBorderMode: wms,
      maskBorderSlice: wms,
      maskBorderWidth: wms,
      maskBorderOutset: wms,
      maskBorderRepeat: wms,
      maskBorder: wms,
      maskType: wms,
      textDecorationStyle: w,
      textDecorationSkip: w,
      textDecorationLine: w,
      textDecorationColor: w,
      filter: w,
      breakAfter: w,
      breakBefore: w,
      breakInside: w,
      columnCount: w,
      columnFill: w,
      columnGap: w,
      columnRule: w,
      columnRuleColor: w,
      columnRuleStyle: w,
      columnRuleWidth: w,
      columns: w,
      columnSpan: w,
      columnWidth: w,
      backdropFilter: w,
      hyphens: w,
      flowInto: w,
      flowFrom: w,
      regionFragment: w,
      textOrientation: w,
      tabSize: m,
      fontKerning: w,
      textSizeAdjust: w
    }
  };
},35,[36,51,53,54,55,56]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = crossFade;
  var _cssInJsUtils = require(_dependencyMap[0]);
  var CROSS_FADE_REGEX = /cross-fade\(/g;
  // http://caniuse.com/#search=cross-fade
  var prefixes = ['-webkit-', ''];
  function crossFade(property, value) {
    if (typeof value === 'string' && !(0, _cssInJsUtils.isPrefixedValue)(value) && value.indexOf('cross-fade(') !== -1) {
      return prefixes.map(function (prefix) {
        return value.replace(CROSS_FADE_REGEX, prefix + 'cross-fade(');
      });
    }
  }
},36,[37]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "assignStyle", {
    enumerable: true,
    get: function () {
      return assignStyle.default;
    }
  });
  Object.defineProperty(exports, "camelCaseProperty", {
    enumerable: true,
    get: function () {
      return camelCaseProperty.default;
    }
  });
  Object.defineProperty(exports, "cssifyDeclaration", {
    enumerable: true,
    get: function () {
      return cssifyDeclaration.default;
    }
  });
  Object.defineProperty(exports, "cssifyObject", {
    enumerable: true,
    get: function () {
      return cssifyObject.default;
    }
  });
  Object.defineProperty(exports, "hyphenateProperty", {
    enumerable: true,
    get: function () {
      return hyphenateProperty.default;
    }
  });
  Object.defineProperty(exports, "isPrefixedProperty", {
    enumerable: true,
    get: function () {
      return isPrefixedProperty.default;
    }
  });
  Object.defineProperty(exports, "isPrefixedValue", {
    enumerable: true,
    get: function () {
      return isPrefixedValue.default;
    }
  });
  Object.defineProperty(exports, "isUnitlessProperty", {
    enumerable: true,
    get: function () {
      return isUnitlessProperty.default;
    }
  });
  Object.defineProperty(exports, "normalizeProperty", {
    enumerable: true,
    get: function () {
      return normalizeProperty.default;
    }
  });
  Object.defineProperty(exports, "resolveArrayValue", {
    enumerable: true,
    get: function () {
      return resolveArrayValue.default;
    }
  });
  Object.defineProperty(exports, "unprefixProperty", {
    enumerable: true,
    get: function () {
      return unprefixProperty.default;
    }
  });
  Object.defineProperty(exports, "unprefixValue", {
    enumerable: true,
    get: function () {
      return unprefixValue.default;
    }
  });
  var _assignStyle = require(_dependencyMap[0]);
  var assignStyle = _interopDefault(_assignStyle);
  var _camelCaseProperty = require(_dependencyMap[1]);
  var camelCaseProperty = _interopDefault(_camelCaseProperty);
  var _cssifyDeclaration = require(_dependencyMap[2]);
  var cssifyDeclaration = _interopDefault(_cssifyDeclaration);
  var _cssifyObject = require(_dependencyMap[3]);
  var cssifyObject = _interopDefault(_cssifyObject);
  var _hyphenateProperty = require(_dependencyMap[4]);
  var hyphenateProperty = _interopDefault(_hyphenateProperty);
  var _isPrefixedProperty = require(_dependencyMap[5]);
  var isPrefixedProperty = _interopDefault(_isPrefixedProperty);
  var _isPrefixedValue = require(_dependencyMap[6]);
  var isPrefixedValue = _interopDefault(_isPrefixedValue);
  var _isUnitlessProperty = require(_dependencyMap[7]);
  var isUnitlessProperty = _interopDefault(_isUnitlessProperty);
  var _normalizeProperty = require(_dependencyMap[8]);
  var normalizeProperty = _interopDefault(_normalizeProperty);
  var _resolveArrayValue = require(_dependencyMap[9]);
  var resolveArrayValue = _interopDefault(_resolveArrayValue);
  var _unprefixProperty = require(_dependencyMap[10]);
  var unprefixProperty = _interopDefault(_unprefixProperty);
  var _unprefixValue = require(_dependencyMap[11]);
  var unprefixValue = _interopDefault(_unprefixValue);
},37,[38,39,40,43,41,44,45,46,47,49,48,50]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return assignStyle;
    }
  });
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }
    return _typeof(obj);
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function filterUniqueArray(arr) {
    return arr.filter(function (val, index) {
      return arr.lastIndexOf(val) === index;
    });
  }
  function assignStyle(base) {
    for (var i = 0, len = arguments.length <= 1 ? 0 : arguments.length - 1; i < len; ++i) {
      var style = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
      for (var property in style) {
        var value = style[property];
        var baseValue = base[property];
        if (baseValue && value) {
          if (Array.isArray(baseValue)) {
            base[property] = filterUniqueArray(baseValue.concat(value));
            continue;
          }
          if (Array.isArray(value)) {
            base[property] = filterUniqueArray([baseValue].concat(_toConsumableArray(value)));
            continue;
          }
          if (_typeof(value) === 'object') {
            base[property] = assignStyle({}, baseValue, value);
            continue;
          }
        }
        base[property] = value;
      }
    }
    return base;
  }
},38,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return camelCaseProperty;
    }
  });
  var DASH = /-([a-z])/g;
  var MS = /^Ms/g;
  var cache = {};
  function toUpper(match) {
    return match[1].toUpperCase();
  }
  function camelCaseProperty(property) {
    if (cache.hasOwnProperty(property)) {
      return cache[property];
    }
    var camelProp = property.replace(DASH, toUpper).replace(MS, 'ms');
    cache[property] = camelProp;
    return camelProp;
  }
},39,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return cssifyDeclaration;
    }
  });
  var _hyphenateProperty = require(_dependencyMap[0]);
  var hyphenateProperty = _interopDefault(_hyphenateProperty);
  function cssifyDeclaration(property, value) {
    return (0, hyphenateProperty.default)(property) + ':' + value;
  }
},40,[41]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return hyphenateProperty;
    }
  });
  var _hyphenateStyleName = require(_dependencyMap[0]);
  var hyphenateStyleName = _interopDefault(_hyphenateStyleName);
  function hyphenateProperty(property) {
    return (0, hyphenateStyleName.default)(property);
  }
},41,[42]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /* eslint-disable no-var, prefer-template */
  var uppercasePattern = /[A-Z]/g;
  var msPattern = /^ms-/;
  var cache = {};
  function toHyphenLower(match) {
    return '-' + match.toLowerCase();
  }
  function hyphenateStyleName(name) {
    if (cache.hasOwnProperty(name)) {
      return cache[name];
    }
    var hName = name.replace(uppercasePattern, toHyphenLower);
    return cache[name] = msPattern.test(hName) ? '-' + hName : hName;
  }
  var _default = hyphenateStyleName;
},42,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return cssifyObject;
    }
  });
  var _cssifyDeclaration = require(_dependencyMap[0]);
  var cssifyDeclaration = _interopDefault(_cssifyDeclaration);
  function cssifyObject(style) {
    var css = '';
    for (var property in style) {
      var value = style[property];
      if (typeof value !== 'string' && typeof value !== 'number') {
        continue;
      } // prevents the semicolon after
      // the last rule declaration

      if (css) {
        css += ';';
      }
      css += (0, cssifyDeclaration.default)(property, value);
    }
    return css;
  }
},43,[40]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return isPrefixedProperty;
    }
  });
  var RE = /^(Webkit|Moz|O|ms)/;
  function isPrefixedProperty(property) {
    return RE.test(property);
  }
},44,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return isPrefixedValue;
    }
  });
  var RE = /-webkit-|-moz-|-ms-/;
  function isPrefixedValue(value) {
    return typeof value === 'string' && RE.test(value);
  }
},45,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return isUnitlessProperty;
    }
  });
  var _hyphenateProperty = require(_dependencyMap[0]);
  var hyphenateProperty = _interopDefault(_hyphenateProperty);
  var unitlessProperties = {
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    fontWeight: true,
    lineHeight: true,
    opacity: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    // SVG-related properties
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  };
  var prefixedUnitlessProperties = ['animationIterationCount', 'boxFlex', 'boxFlexGroup', 'boxOrdinalGroup', 'columnCount', 'flex', 'flexGrow', 'flexPositive', 'flexShrink', 'flexNegative', 'flexOrder', 'gridColumn', 'gridColumnEnd', 'gridColumnStart', 'gridRow', 'gridRowEnd', 'gridRowStart', 'lineClamp', 'order'];
  var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
  function getPrefixedProperty(prefix, property) {
    return prefix + property.charAt(0).toUpperCase() + property.slice(1);
  } // add all prefixed properties to the unitless properties

  for (var i = 0, len = prefixedUnitlessProperties.length; i < len; ++i) {
    var property = prefixedUnitlessProperties[i];
    unitlessProperties[property] = true;
    for (var j = 0, jLen = prefixes.length; j < jLen; ++j) {
      unitlessProperties[getPrefixedProperty(prefixes[j], property)] = true;
    }
  } // add all hypenated properties as well

  for (var _property in unitlessProperties) {
    unitlessProperties[(0, hyphenateProperty.default)(_property)] = true;
  }
  function isUnitlessProperty(property) {
    return unitlessProperties.hasOwnProperty(property);
  }
},46,[41]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return normalizeProperty;
    }
  });
  var _camelCaseProperty = require(_dependencyMap[0]);
  var camelCaseProperty = _interopDefault(_camelCaseProperty);
  var _unprefixProperty = require(_dependencyMap[1]);
  var unprefixProperty = _interopDefault(_unprefixProperty);
  function normalizeProperty(property) {
    return (0, unprefixProperty.default)((0, camelCaseProperty.default)(property));
  }
},47,[39,48]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return unprefixProperty;
    }
  });
  var RE = /^(ms|Webkit|Moz|O)/;
  function unprefixProperty(property) {
    var propertyWithoutPrefix = property.replace(RE, '');
    return propertyWithoutPrefix.charAt(0).toLowerCase() + propertyWithoutPrefix.slice(1);
  }
},48,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return resolveArrayValue;
    }
  });
  var _hyphenateProperty = require(_dependencyMap[0]);
  var hyphenateProperty = _interopDefault(_hyphenateProperty);
  function resolveArrayValue(property, value) {
    return value.join(';' + (0, hyphenateProperty.default)(property) + ':');
  }
},49,[41]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return unprefixValue;
    }
  });
  var RE = /(-ms-|-webkit-|-moz-|-o-)/g;
  function unprefixValue(value) {
    if (typeof value === 'string') {
      return value.replace(RE, '');
    }
    return value;
  }
},50,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = imageSet;
  var _isPrefixedValue = require(_dependencyMap[0]);
  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // http://caniuse.com/#feat=css-image-set
  var prefixes = ['-webkit-', ''];
  function imageSet(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
      return prefixes.map(function (prefix) {
        return value.replace(/image-set\(/g, prefix + 'image-set(');
      });
    }
  }
},51,[52]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = isPrefixedValue;
  var RE = /-webkit-|-moz-|-ms-/;
  function isPrefixedValue(value) {
    return typeof value === 'string' && RE.test(value);
  }
},52,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = logical;
  var alternativeProps = {
    marginBlockStart: ['WebkitMarginBefore'],
    marginBlockEnd: ['WebkitMarginAfter'],
    marginInlineStart: ['WebkitMarginStart', 'MozMarginStart'],
    marginInlineEnd: ['WebkitMarginEnd', 'MozMarginEnd'],
    paddingBlockStart: ['WebkitPaddingBefore'],
    paddingBlockEnd: ['WebkitPaddingAfter'],
    paddingInlineStart: ['WebkitPaddingStart', 'MozPaddingStart'],
    paddingInlineEnd: ['WebkitPaddingEnd', 'MozPaddingEnd'],
    borderBlockStart: ['WebkitBorderBefore'],
    borderBlockStartColor: ['WebkitBorderBeforeColor'],
    borderBlockStartStyle: ['WebkitBorderBeforeStyle'],
    borderBlockStartWidth: ['WebkitBorderBeforeWidth'],
    borderBlockEnd: ['WebkitBorderAfter'],
    borderBlockEndColor: ['WebkitBorderAfterColor'],
    borderBlockEndStyle: ['WebkitBorderAfterStyle'],
    borderBlockEndWidth: ['WebkitBorderAfterWidth'],
    borderInlineStart: ['WebkitBorderStart', 'MozBorderStart'],
    borderInlineStartColor: ['WebkitBorderStartColor', 'MozBorderStartColor'],
    borderInlineStartStyle: ['WebkitBorderStartStyle', 'MozBorderStartStyle'],
    borderInlineStartWidth: ['WebkitBorderStartWidth', 'MozBorderStartWidth'],
    borderInlineEnd: ['WebkitBorderEnd', 'MozBorderEnd'],
    borderInlineEndColor: ['WebkitBorderEndColor', 'MozBorderEndColor'],
    borderInlineEndStyle: ['WebkitBorderEndStyle', 'MozBorderEndStyle'],
    borderInlineEndWidth: ['WebkitBorderEndWidth', 'MozBorderEndWidth']
  };
  function logical(property, value, style) {
    if (Object.prototype.hasOwnProperty.call(alternativeProps, property)) {
      var alternativePropList = alternativeProps[property];
      for (var i = 0, len = alternativePropList.length; i < len; ++i) {
        style[alternativePropList[i]] = value;
      }
    }
  }
},53,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = position;
  function position(property, value) {
    if (property === 'position' && value === 'sticky') {
      return ['-webkit-sticky', 'sticky'];
    }
  }
},54,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = sizing;
  var prefixes = ['-webkit-', '-moz-', ''];
  var properties = {
    maxHeight: true,
    maxWidth: true,
    width: true,
    height: true,
    columnWidth: true,
    minWidth: true,
    minHeight: true
  };
  var values = {
    'min-content': true,
    'max-content': true,
    'fill-available': true,
    'fit-content': true,
    'contain-floats': true
  };
  function sizing(property, value) {
    if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
      return prefixes.map(function (prefix) {
        return prefix + value;
      });
    }
  }
},55,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = transition;
  var _hyphenateProperty = require(_dependencyMap[0]);
  var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);
  var _isPrefixedValue = require(_dependencyMap[1]);
  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);
  var _capitalizeString = require(_dependencyMap[2]);
  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  var properties = {
    transition: true,
    transitionProperty: true,
    WebkitTransition: true,
    WebkitTransitionProperty: true,
    MozTransition: true,
    MozTransitionProperty: true
  };
  var prefixMapping = {
    Webkit: '-webkit-',
    Moz: '-moz-',
    ms: '-ms-'
  };
  function prefixValue(value, propertyPrefixMap) {
    if ((0, _isPrefixedValue2.default)(value)) {
      return value;
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);
    for (var i = 0, len = multipleValues.length; i < len; ++i) {
      var singleValue = multipleValues[i];
      var values = [singleValue];
      for (var property in propertyPrefixMap) {
        var dashCaseProperty = (0, _hyphenateProperty2.default)(property);
        if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
          var prefixes = propertyPrefixMap[property];
          for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
            // join all prefixes and create a new value
            values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
          }
        }
      }
      multipleValues[i] = values.join(',');
    }
    return multipleValues.join(',');
  }
  function transition(property, value, style, propertyPrefixMap) {
    // also check for already prefixed transitions
    if (typeof value === 'string' && properties.hasOwnProperty(property)) {
      var outputValue = prefixValue(value, propertyPrefixMap);
      // if the property is already prefixed
      var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
        return !/-moz-|-ms-/.test(val);
      }).join(',');
      if (property.indexOf('Webkit') > -1) {
        return webkitOutput;
      }
      var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
        return !/-webkit-|-ms-/.test(val);
      }).join(',');
      if (property.indexOf('Moz') > -1) {
        return mozOutput;
      }
      style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
      style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
      return outputValue;
    }
  }
},56,[57,52,31]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = hyphenateProperty;
  var _hyphenateStyleName = require(_dependencyMap[0]);
  var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  function hyphenateProperty(property) {
    return (0, _hyphenateStyleName2["default"])(property);
  }
},57,[42]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  exports.createSheet = createSheet;
  var _modulesCanUseDom = require(_dependencyMap[0]);
  var canUseDOM = _interopDefault(_modulesCanUseDom);
  var _createCSSStyleSheet = require(_dependencyMap[1]);
  var createCSSStyleSheet = _interopDefault(_createCSSStyleSheet);
  var _createOrderedCSSStyleSheet = require(_dependencyMap[2]);
  var createOrderedCSSStyleSheet = _interopDefault(_createOrderedCSSStyleSheet);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var defaultId = 'react-native-stylesheet';
  var roots = new WeakMap();
  var sheets = [];
  var initialRules = [
  // minimal top-level reset
  'html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}', 'body{margin:0;}',
  // minimal form pseudo-element reset
  'button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}', 'input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}'];
  function createSheet(root, id) {
    if (id === undefined) {
      id = defaultId;
    }
    var sheet;
    if (canUseDOM.default) {
      var rootNode = root != null ? root.getRootNode() : document;
      // Create the initial style sheet
      if (sheets.length === 0) {
        sheet = (0, createOrderedCSSStyleSheet.default)((0, createCSSStyleSheet.default)(id));
        initialRules.forEach(rule => {
          sheet.insert(rule, 0);
        });
        roots.set(rootNode, sheets.length);
        sheets.push(sheet);
      } else {
        var index = roots.get(rootNode);
        if (index == null) {
          var initialSheet = sheets[0];
          // If we're creating a new sheet, populate it with existing styles
          var textContent = initialSheet != null ? initialSheet.getTextContent() : '';
          // Cast rootNode to 'any' because Flow types for getRootNode are wrong
          sheet = (0, createOrderedCSSStyleSheet.default)((0, createCSSStyleSheet.default)(id, rootNode, textContent));
          roots.set(rootNode, sheets.length);
          sheets.push(sheet);
        } else {
          sheet = sheets[index];
        }
      }
    } else {
      // Create the initial style sheet
      if (sheets.length === 0) {
        sheet = (0, createOrderedCSSStyleSheet.default)((0, createCSSStyleSheet.default)(id));
        initialRules.forEach(rule => {
          sheet.insert(rule, 0);
        });
        sheets.push(sheet);
      } else {
        sheet = sheets[0];
      }
    }
    return {
      getTextContent() {
        return sheet.getTextContent();
      },
      id,
      insert(cssText, groupValue) {
        sheets.forEach(s => {
          s.insert(cssText, groupValue);
        });
      }
    };
  }
},58,[25,59,60]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return createCSSStyleSheet;
    }
  });
  var _modulesCanUseDom = require(_dependencyMap[0]);
  var canUseDOM = _interopDefault(_modulesCanUseDom);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  // $FlowFixMe: HTMLStyleElement is incorrectly typed - https://github.com/facebook/flow/issues/2696
  function createCSSStyleSheet(id, rootNode, textContent) {
    if (canUseDOM.default) {
      var root = rootNode != null ? rootNode : document;
      var element = root.getElementById(id);
      if (element == null) {
        element = document.createElement('style');
        element.setAttribute('id', id);
        if (typeof textContent === 'string') {
          element.appendChild(document.createTextNode(textContent));
        }
        if (root instanceof ShadowRoot) {
          root.insertBefore(element, root.firstChild);
        } else {
          var head = root.head;
          if (head) {
            head.insertBefore(element, head.firstChild);
          }
        }
      }
      // $FlowFixMe: HTMLElement is incorrectly typed
      return element.sheet;
    } else {
      return null;
    }
  }
},59,[25]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return createOrderedCSSStyleSheet;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var slice = Array.prototype.slice;

  /**
   * Order-based insertion of CSS.
   *
   * Each rule is associated with a numerically defined group.
   * Groups are ordered within the style sheet according to their number, with the
   * lowest first.
   *
   * Groups are implemented using marker rules. The selector of the first rule of
   * each group is used only to encode the group number for hydration. An
   * alternative implementation could rely on CSSMediaRule, allowing groups to be
   * treated as a sub-sheet, but the Edge implementation of CSSMediaRule is
   * broken.
   * https://developer.mozilla.org/en-US/docs/Web/API/CSSMediaRule
   * https://gist.github.com/necolas/aa0c37846ad6bd3b05b727b959e82674
   */
  function createOrderedCSSStyleSheet(sheet) {
    var groups = {};
    var selectors = {};

    /**
     * Hydrate approximate record from any existing rules in the sheet.
     */
    if (sheet != null) {
      var group;
      slice.call(sheet.cssRules).forEach((cssRule, i) => {
        var cssText = cssRule.cssText;
        // Create record of existing selectors and rules
        if (cssText.indexOf('stylesheet-group') > -1) {
          group = decodeGroupRule(cssRule);
          groups[group] = {
            start: i,
            rules: [cssText]
          };
        } else {
          var selectorText = getSelectorText(cssText);
          if (selectorText != null) {
            selectors[selectorText] = true;
            groups[group].rules.push(cssText);
          }
        }
      });
    }
    function sheetInsert(sheet, group, text) {
      var orderedGroups = getOrderedGroups(groups);
      var groupIndex = orderedGroups.indexOf(group);
      var nextGroupIndex = groupIndex + 1;
      var nextGroup = orderedGroups[nextGroupIndex];
      // Insert rule before the next group, or at the end of the stylesheet
      var position = nextGroup != null && groups[nextGroup].start != null ? groups[nextGroup].start : sheet.cssRules.length;
      var isInserted = insertRuleAt(sheet, text, position);
      if (isInserted) {
        // Set the starting index of the new group
        if (groups[group].start == null) {
          groups[group].start = position;
        }
        // Increment the starting index of all subsequent groups
        for (var i = nextGroupIndex; i < orderedGroups.length; i += 1) {
          var groupNumber = orderedGroups[i];
          var previousStart = groups[groupNumber].start || 0;
          groups[groupNumber].start = previousStart + 1;
        }
      }
      return isInserted;
    }
    var OrderedCSSStyleSheet = {
      /**
       * The textContent of the style sheet.
       */
      getTextContent() {
        return getOrderedGroups(groups).map(group => {
          var rules = groups[group].rules;
          // Sorting provides deterministic order of styles in group for
          // build-time extraction of the style sheet.
          var marker = rules.shift();
          rules.sort();
          rules.unshift(marker);
          return rules.join('\n');
        }).join('\n');
      },
      /**
       * Insert a rule into the style sheet
       */
      insert(cssText, groupValue) {
        var group = Number(groupValue);

        // Create a new group.
        if (groups[group] == null) {
          var markerRule = encodeGroupRule(group);
          // Create the internal record.
          groups[group] = {
            start: null,
            rules: [markerRule]
          };
          // Update CSSOM.
          if (sheet != null) {
            sheetInsert(sheet, group, markerRule);
          }
        }

        // selectorText is more reliable than cssText for insertion checks. The
        // browser excludes vendor-prefixed properties and rewrites certain values
        // making cssText more likely to be different from what was inserted.
        var selectorText = getSelectorText(cssText);
        if (selectorText != null && selectors[selectorText] == null) {
          // Update the internal records.
          selectors[selectorText] = true;
          groups[group].rules.push(cssText);
          // Update CSSOM.
          if (sheet != null) {
            var isInserted = sheetInsert(sheet, group, cssText);
            if (!isInserted) {
              // Revert internal record change if a rule was rejected (e.g.,
              // unrecognized pseudo-selector)
              groups[group].rules.pop();
            }
          }
        }
      }
    };
    return OrderedCSSStyleSheet;
  }

  /**
   * Helper functions
   */

  function encodeGroupRule(group) {
    return "[stylesheet-group=\"" + group + "\"]{}";
  }
  var groupPattern = /["']/g;
  function decodeGroupRule(cssRule) {
    return Number(cssRule.selectorText.split(groupPattern)[1]);
  }
  function getOrderedGroups(obj) {
    return Object.keys(obj).map(Number).sort((a, b) => a > b ? 1 : -1);
  }
  var selectorPattern = /\s*([,])\s*/g;
  function getSelectorText(cssText) {
    var selector = cssText.split('{')[0].trim();
    return selector !== '' ? selector.replace(selectorPattern, '$1') : null;
  }
  function insertRuleAt(root, cssText, position) {
    try {
      // $FlowFixMe: Flow is missing CSSOM types needed to type 'root'.
      root.insertRule(cssText, position);
      return true;
    } catch (e) {
      // JSDOM doesn't support `CSSSMediaRule#insertRule`.
      // Also ignore errors that occur from attempting to insert vendor-prefixed selectors.
      return false;
    }
  }
},60,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Nicolas Gallagher
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  module.exports = require(_dependencyMap[0]);
},61,[62]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Nicolas Gallagher
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.localizeStyle = localizeStyle;
  var cache = new WeakMap();
  var markerProp = '$$css$localize';
  /**
   * The compiler polyfills logical properties and values, generating a class
   * name for both writing directions. The style objects are annotated by
   * the compiler as needing this runtime transform. The results are memoized.
   *
   * { '$$css$localize': true, float: [ 'float-left', 'float-right' ] }
   * => { float: 'float-left' }
   */

  function compileStyle(style, isRTL) {
    // Create a new compiled style for styleq
    var compiledStyle = {};
    for (var prop in style) {
      if (prop !== markerProp) {
        var value = style[prop];
        if (Array.isArray(value)) {
          compiledStyle[prop] = isRTL ? value[1] : value[0];
        } else {
          compiledStyle[prop] = value;
        }
      }
    }
    return compiledStyle;
  }
  function localizeStyle(style, isRTL) {
    if (style[markerProp] != null) {
      var compiledStyleIndex = isRTL ? 1 : 0; // Check the cache in case we've already seen this object

      if (cache.has(style)) {
        var _cachedStyles = cache.get(style);
        var _compiledStyle = _cachedStyles[compiledStyleIndex];
        if (_compiledStyle == null) {
          // Update the missing cache entry
          _compiledStyle = compileStyle(style, isRTL);
          _cachedStyles[compiledStyleIndex] = _compiledStyle;
          cache.set(style, _cachedStyles);
        }
        return _compiledStyle;
      } // Create a new compiled style for styleq

      var compiledStyle = compileStyle(style, isRTL);
      var cachedStyles = new Array(2);
      cachedStyles[compiledStyleIndex] = compiledStyle;
      cache.set(style, cachedStyles);
      return compiledStyle;
    }
    return style;
  }
},62,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  Object.defineProperty(exports, "createBoxShadowValue", {
    enumerable: true,
    get: function () {
      return createBoxShadowValue;
    }
  });
  Object.defineProperty(exports, "createTextShadowValue", {
    enumerable: true,
    get: function () {
      return createTextShadowValue;
    }
  });
  Object.defineProperty(exports, "createBoxShadowArrayValue", {
    enumerable: true,
    get: function () {
      return createBoxShadowArrayValue;
    }
  });
  Object.defineProperty(exports, "createTransformValue", {
    enumerable: true,
    get: function () {
      return createTransformValue;
    }
  });
  Object.defineProperty(exports, "createTransformOriginValue", {
    enumerable: true,
    get: function () {
      return createTransformOriginValue;
    }
  });
  Object.defineProperty(exports, "preprocess", {
    enumerable: true,
    get: function () {
      return preprocess;
    }
  });
  var _compilerNormalizeColor = require(_dependencyMap[0]);
  var normalizeColor = _interopDefault(_compilerNormalizeColor);
  var _compilerNormalizeValueWithProperty = require(_dependencyMap[1]);
  var normalizeValueWithProperty = _interopDefault(_compilerNormalizeValueWithProperty);
  var _modulesWarnOnce = require(_dependencyMap[2]);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var emptyObject = {};

  /**
   * Shadows
   */

  var defaultOffset = {
    height: 0,
    width: 0
  };
  var createBoxShadowValue = style => {
    var shadowColor = style.shadowColor,
      shadowOffset = style.shadowOffset,
      shadowOpacity = style.shadowOpacity,
      shadowRadius = style.shadowRadius;
    var _ref = shadowOffset || defaultOffset,
      height = _ref.height,
      width = _ref.width;
    var offsetX = (0, normalizeValueWithProperty.default)(width);
    var offsetY = (0, normalizeValueWithProperty.default)(height);
    var blurRadius = (0, normalizeValueWithProperty.default)(shadowRadius || 0);
    var color = (0, normalizeColor.default)(shadowColor || 'black', shadowOpacity);
    if (color != null && offsetX != null && offsetY != null && blurRadius != null) {
      return offsetX + " " + offsetY + " " + blurRadius + " " + color;
    }
  };
  var createTextShadowValue = style => {
    var textShadowColor = style.textShadowColor,
      textShadowOffset = style.textShadowOffset,
      textShadowRadius = style.textShadowRadius;
    var _ref2 = textShadowOffset || defaultOffset,
      height = _ref2.height,
      width = _ref2.width;
    var radius = textShadowRadius || 0;
    var offsetX = (0, normalizeValueWithProperty.default)(width);
    var offsetY = (0, normalizeValueWithProperty.default)(height);
    var blurRadius = (0, normalizeValueWithProperty.default)(radius);
    var color = (0, normalizeValueWithProperty.default)(textShadowColor, 'textShadowColor');
    if (color && (height !== 0 || width !== 0 || radius !== 0) && offsetX != null && offsetY != null && blurRadius != null) {
      return offsetX + " " + offsetY + " " + blurRadius + " " + color;
    }
  };

  // { offsetX: 1, offsetY: 2, blurRadius: 3, spreadDistance: 4, color: 'rgba(255, 0, 0)', inset: true }
  // => 'rgba(255, 0, 0) 1px 2px 3px 4px inset'
  var mapBoxShadow = boxShadow => {
    if (typeof boxShadow === 'string') {
      return boxShadow;
    }
    var offsetX = (0, normalizeValueWithProperty.default)(boxShadow.offsetX) || 0;
    var offsetY = (0, normalizeValueWithProperty.default)(boxShadow.offsetY) || 0;
    var blurRadius = (0, normalizeValueWithProperty.default)(boxShadow.blurRadius) || 0;
    var spreadDistance = (0, normalizeValueWithProperty.default)(boxShadow.spreadDistance) || 0;
    var color = (0, normalizeColor.default)(boxShadow.color) || 'black';
    var position = boxShadow.inset ? 'inset ' : '';
    return "" + position + offsetX + " " + offsetY + " " + blurRadius + " " + spreadDistance + " " + color;
  };
  var createBoxShadowArrayValue = value => {
    return value.map(mapBoxShadow).join(', ');
  };

  // { scale: 2 } => 'scale(2)'
  // { translateX: 20 } => 'translateX(20px)'
  // { matrix: [1,2,3,4,5,6] } => 'matrix(1,2,3,4,5,6)'
  var mapTransform = transform => {
    var type = Object.keys(transform)[0];
    var value = transform[type];
    if (type === 'matrix' || type === 'matrix3d') {
      return type + "(" + value.join(',') + ")";
    } else {
      var normalizedValue = (0, normalizeValueWithProperty.default)(value, type);
      return type + "(" + normalizedValue + ")";
    }
  };
  var createTransformValue = value => {
    return value.map(mapTransform).join(' ');
  };

  // [2, '30%', 10] => '2px 30% 10px'
  var createTransformOriginValue = value => {
    return value.map(v => (0, normalizeValueWithProperty.default)(v)).join(' ');
  };
  var PROPERTIES_STANDARD = {
    borderBottomEndRadius: 'borderEndEndRadius',
    borderBottomStartRadius: 'borderEndStartRadius',
    borderTopEndRadius: 'borderStartEndRadius',
    borderTopStartRadius: 'borderStartStartRadius',
    borderEndColor: 'borderInlineEndColor',
    borderEndStyle: 'borderInlineEndStyle',
    borderEndWidth: 'borderInlineEndWidth',
    borderStartColor: 'borderInlineStartColor',
    borderStartStyle: 'borderInlineStartStyle',
    borderStartWidth: 'borderInlineStartWidth',
    end: 'insetInlineEnd',
    marginEnd: 'marginInlineEnd',
    marginHorizontal: 'marginInline',
    marginStart: 'marginInlineStart',
    marginVertical: 'marginBlock',
    paddingEnd: 'paddingInlineEnd',
    paddingHorizontal: 'paddingInline',
    paddingStart: 'paddingInlineStart',
    paddingVertical: 'paddingBlock',
    start: 'insetInlineStart'
  };
  var ignoredProps = {
    elevation: true,
    overlayColor: true,
    resizeMode: true,
    tintColor: true
  };

  /**
   * Preprocess styles
   */
  var preprocess = function preprocess(originalStyle, options) {
    if (options === undefined) {
      options = {};
    }
    var style = originalStyle || emptyObject;
    var nextStyle = {};

    // Convert shadow styles
    if (options.shadow === true, style.shadowColor != null || style.shadowOffset != null || style.shadowOpacity != null || style.shadowRadius != null) {
      (0, _modulesWarnOnce.warnOnce)('shadowStyles', "\"shadow*\" style props are deprecated. Use \"boxShadow\".");
      var boxShadowValue = createBoxShadowValue(style);
      if (boxShadowValue != null) {
        nextStyle.boxShadow = boxShadowValue;
      }
    }

    // Convert text shadow styles
    if (options.textShadow === true, style.textShadowColor != null || style.textShadowOffset != null || style.textShadowRadius != null) {
      (0, _modulesWarnOnce.warnOnce)('textShadowStyles', "\"textShadow*\" style props are deprecated. Use \"textShadow\".");
      var textShadowValue = createTextShadowValue(style);
      if (textShadowValue != null && nextStyle.textShadow == null) {
        var textShadow = style.textShadow;
        var value = textShadow ? textShadow + ", " + textShadowValue : textShadowValue;
        nextStyle.textShadow = value;
      }
    }
    for (var originalProp in style) {
      if (
      // Ignore some React Native styles
      ignoredProps[originalProp] != null || originalProp === 'shadowColor' || originalProp === 'shadowOffset' || originalProp === 'shadowOpacity' || originalProp === 'shadowRadius' || originalProp === 'textShadowColor' || originalProp === 'textShadowOffset' || originalProp === 'textShadowRadius') {
        continue;
      }
      var originalValue = style[originalProp];
      var prop = PROPERTIES_STANDARD[originalProp] || originalProp;
      var _value = originalValue;
      if (!Object.prototype.hasOwnProperty.call(style, originalProp) || prop !== originalProp && style[prop] != null) {
        continue;
      }
      if (prop === 'aspectRatio' && typeof _value === 'number') {
        nextStyle[prop] = _value.toString();
      } else if (prop === 'boxShadow') {
        if (Array.isArray(_value)) {
          _value = createBoxShadowArrayValue(_value);
        }
        var boxShadow = nextStyle.boxShadow;
        nextStyle.boxShadow = boxShadow ? _value + ", " + boxShadow : _value;
      } else if (prop === 'fontVariant') {
        if (Array.isArray(_value) && _value.length > 0) {
          /*
          warnOnce(
            'fontVariant',
            '"fontVariant" style array value is deprecated. Use space-separated values.'
          );
          */
          _value = _value.join(' ');
        }
        nextStyle[prop] = _value;
      } else if (prop === 'textAlignVertical') {
        /*
        warnOnce(
          'textAlignVertical',
          '"textAlignVertical" style is deprecated. Use "verticalAlign".'
        );
        */
        if (style.verticalAlign == null) {
          nextStyle.verticalAlign = _value === 'center' ? 'middle' : _value;
        }
      } else if (prop === 'transform') {
        if (Array.isArray(_value)) {
          _value = createTransformValue(_value);
        }
        nextStyle.transform = _value;
      } else if (prop === 'transformOrigin') {
        if (Array.isArray(_value)) {
          _value = createTransformOriginValue(_value);
        }
        nextStyle.transformOrigin = _value;
      } else {
        nextStyle[prop] = _value;
      }
    }

    // $FlowIgnore
    return nextStyle;
  };
  var _default = preprocess;
},63,[21,19,64]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.warnOnce = warnOnce;
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var warnedKeys = {};

  /**
   * A simple function that prints a warning message once per session.
   *
   * @param {string} key - The key used to ensure the message is printed once.
   *                       This should be unique to the callsite.
   * @param {string} message - The message to print
   */
  function warnOnce(key, message) {}
},64,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Nicolas Gallagher
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styleq = undefined;
  var cache = new WeakMap();
  var compiledKey = '$$css';
  function createStyleq(options) {
    var disableCache;
    var disableMix;
    var transform;
    if (options != null) {
      disableCache = options.disableCache === true;
      disableMix = options.disableMix === true;
      transform = options.transform;
    }
    return function styleq() {
      // Keep track of property commits to the className
      var definedProperties = []; // The className and inline style to build up

      var className = '';
      var inlineStyle = null; // The current position in the cache graph

      var nextCache = disableCache ? null : cache; // This way of creating an array from arguments is fastest

      var styles = new Array(arguments.length);
      for (var i = 0; i < arguments.length; i++) {
        styles[i] = arguments[i];
      } // Iterate over styles from last to first

      while (styles.length > 0) {
        var possibleStyle = styles.pop(); // Skip empty items

        if (possibleStyle == null || possibleStyle === false) {
          continue;
        } // Push nested styles back onto the stack to be processed

        if (Array.isArray(possibleStyle)) {
          for (var _i = 0; _i < possibleStyle.length; _i++) {
            styles.push(possibleStyle[_i]);
          }
          continue;
        } // Process an individual style object

        var style = transform != null ? transform(possibleStyle) : possibleStyle;
        if (style.$$css) {
          // Build up the class names defined by this object
          var classNameChunk = ''; // Check the cache to see if we've already done this work

          if (nextCache != null && nextCache.has(style)) {
            // Cache: read
            var cacheEntry = nextCache.get(style);
            if (cacheEntry != null) {
              classNameChunk = cacheEntry[0]; // $FlowIgnore

              definedProperties.push.apply(definedProperties, cacheEntry[1]);
              nextCache = cacheEntry[2];
            }
          } // Update the chunks with data from this object
          else {
            // The properties defined by this object
            var definedPropertiesChunk = [];
            for (var prop in style) {
              var value = style[prop];
              if (prop === compiledKey) continue; // Each property value is used as an HTML class name
              // { 'debug.string': 'debug.string', opacity: 's-jskmnoqp' }

              if (typeof value === 'string' || value === null) {
                // Only add to chunks if this property hasn't already been seen
                if (!definedProperties.includes(prop)) {
                  definedProperties.push(prop);
                  if (nextCache != null) {
                    definedPropertiesChunk.push(prop);
                  }
                  if (typeof value === 'string') {
                    classNameChunk += classNameChunk ? ' ' + value : value;
                  }
                }
              } // If we encounter a value that isn't a string or `null`
              else {
                console.error("styleq: ".concat(prop, " typeof ").concat(String(value), " is not \"string\" or \"null\"."));
              }
            } // Cache: write

            if (nextCache != null) {
              // Create the next WeakMap for this sequence of styles
              var weakMap = new WeakMap();
              nextCache.set(style, [classNameChunk, definedPropertiesChunk, weakMap]);
              nextCache = weakMap;
            }
          } // Order of classes in chunks matches property-iteration order of style
          // object. Order of chunks matches passed order of styles from first to
          // last (which we iterate over in reverse).

          if (classNameChunk) {
            className = className ? classNameChunk + ' ' + className : classNameChunk;
          }
        } // ----- DYNAMIC: Process inline style object -----
        else {
          if (disableMix) {
            if (inlineStyle == null) {
              inlineStyle = {};
            }
            inlineStyle = Object.assign({}, style, inlineStyle);
          } else {
            var subStyle = null;
            for (var _prop in style) {
              var _value = style[_prop];
              if (_value !== undefined) {
                if (!definedProperties.includes(_prop)) {
                  if (_value != null) {
                    if (inlineStyle == null) {
                      inlineStyle = {};
                    }
                    if (subStyle == null) {
                      subStyle = {};
                    }
                    subStyle[_prop] = _value;
                  }
                  definedProperties.push(_prop); // Cache is unnecessary overhead if results can't be reused.

                  nextCache = null;
                }
              }
            }
            if (subStyle != null) {
              inlineStyle = Object.assign(subStyle, inlineStyle);
            }
          }
        }
      }
      var styleProps = [className, inlineStyle];
      return styleProps;
    };
  }
  var styleq = createStyleq();
  exports.styleq = styleq;
  styleq.factory = createStyleq;
},65,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  exports.validate = validate;
  var _postcssValueParser = require(_dependencyMap[0]);
  var valueParser = _interopDefault(_postcssValueParser);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var invalidShortforms = {
    background: true,
    borderBottom: true,
    borderLeft: true,
    borderRight: true,
    borderTop: true,
    font: true,
    grid: true,
    outline: true,
    textDecoration: true
  };
  var invalidMultiValueShortforms = {
    flex: true,
    margin: true,
    padding: true,
    borderColor: true,
    borderRadius: true,
    borderStyle: true,
    borderWidth: true,
    inset: true,
    insetBlock: true,
    insetInline: true,
    marginBlock: true,
    marginInline: true,
    marginHorizontal: true,
    marginVertical: true,
    paddingBlock: true,
    paddingInline: true,
    paddingHorizontal: true,
    paddingVertical: true,
    overflow: true,
    overscrollBehavior: true,
    backgroundPosition: true
  };
  function error(message) {
    console.error(message);
  }
  function validate(obj) {
    for (var k in obj) {
      var prop = k.trim();
      var value = obj[prop];
      var isInvalid = false;
      if (value === null) {
        continue;
      }
      if (typeof value === 'string' && value.indexOf('!important') > -1) {
        error("Invalid style declaration \"" + prop + ":" + value + "\". Values cannot include \"!important\"");
        isInvalid = true;
      } else {
        var suggestion = '';
        if (prop === 'animation' || prop === 'animationName') {
          suggestion = 'Did you mean "animationKeyframes"?';
          isInvalid = true;
        } else if (prop === 'direction') {
          suggestion = 'Did you mean "writingDirection"?';
          isInvalid = true;
        } else if (invalidShortforms[prop]) {
          suggestion = 'Please use long-form properties.';
          isInvalid = true;
        } else if (invalidMultiValueShortforms[prop]) {
          if (typeof value === 'string' && (0, valueParser.default)(value).nodes.length > 1) {
            suggestion = "Value is \"" + value + "\" but only single values are supported.";
            isInvalid = true;
          }
        }
        if (suggestion !== '') {
          error("Invalid style property of \"" + prop + "\". " + suggestion);
        }
      }
      if (isInvalid) {
        delete obj[k];
      }
    }
  }
},66,[67]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var parse = require(_dependencyMap[0]);
  var walk = require(_dependencyMap[1]);
  var stringify = require(_dependencyMap[2]);
  function ValueParser(value) {
    if (this instanceof ValueParser) {
      this.nodes = parse(value);
      return this;
    }
    return new ValueParser(value);
  }
  ValueParser.prototype.toString = function () {
    return Array.isArray(this.nodes) ? stringify(this.nodes) : "";
  };
  ValueParser.prototype.walk = function (cb, bubble) {
    walk(this.nodes, cb, bubble);
    return this;
  };
  ValueParser.unit = require(_dependencyMap[3]);
  ValueParser.walk = walk;
  ValueParser.stringify = stringify;
  module.exports = ValueParser;
},67,[68,69,70,71]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var openParentheses = "(".charCodeAt(0);
  var closeParentheses = ")".charCodeAt(0);
  var singleQuote = "'".charCodeAt(0);
  var doubleQuote = '"'.charCodeAt(0);
  var backslash = "\\".charCodeAt(0);
  var slash = "/".charCodeAt(0);
  var comma = ",".charCodeAt(0);
  var colon = ":".charCodeAt(0);
  var star = "*".charCodeAt(0);
  var uLower = "u".charCodeAt(0);
  var uUpper = "U".charCodeAt(0);
  var plus = "+".charCodeAt(0);
  var isUnicodeRange = /^[a-f0-9?-]+$/i;
  module.exports = function (input) {
    var tokens = [];
    var value = input;
    var next, quote, prev, token, escape, escapePos, whitespacePos, parenthesesOpenPos;
    var pos = 0;
    var code = value.charCodeAt(pos);
    var max = value.length;
    var stack = [{
      nodes: tokens
    }];
    var balanced = 0;
    var parent;
    var name = "";
    var before = "";
    var after = "";
    while (pos < max) {
      // Whitespaces
      if (code <= 32) {
        next = pos;
        do {
          next += 1;
          code = value.charCodeAt(next);
        } while (code <= 32);
        token = value.slice(pos, next);
        prev = tokens[tokens.length - 1];
        if (code === closeParentheses && balanced) {
          after = token;
        } else if (prev && prev.type === "div") {
          prev.after = token;
          prev.sourceEndIndex += token.length;
        } else if (code === comma || code === colon || code === slash && value.charCodeAt(next + 1) !== star && (!parent || parent && parent.type === "function" && parent.value !== "calc")) {
          before = token;
        } else {
          tokens.push({
            type: "space",
            sourceIndex: pos,
            sourceEndIndex: next,
            value: token
          });
        }
        pos = next;

        // Quotes
      } else if (code === singleQuote || code === doubleQuote) {
        next = pos;
        quote = code === singleQuote ? "'" : '"';
        token = {
          type: "string",
          sourceIndex: pos,
          quote: quote
        };
        do {
          escape = false;
          next = value.indexOf(quote, next + 1);
          if (~next) {
            escapePos = next;
            while (value.charCodeAt(escapePos - 1) === backslash) {
              escapePos -= 1;
              escape = !escape;
            }
          } else {
            value += quote;
            next = value.length - 1;
            token.unclosed = true;
          }
        } while (escape);
        token.value = value.slice(pos + 1, next);
        token.sourceEndIndex = token.unclosed ? next : next + 1;
        tokens.push(token);
        pos = next + 1;
        code = value.charCodeAt(pos);

        // Comments
      } else if (code === slash && value.charCodeAt(pos + 1) === star) {
        next = value.indexOf("*/", pos);
        token = {
          type: "comment",
          sourceIndex: pos,
          sourceEndIndex: next + 2
        };
        if (next === -1) {
          token.unclosed = true;
          next = value.length;
          token.sourceEndIndex = next;
        }
        token.value = value.slice(pos + 2, next);
        tokens.push(token);
        pos = next + 2;
        code = value.charCodeAt(pos);

        // Operation within calc
      } else if ((code === slash || code === star) && parent && parent.type === "function" && parent.value === "calc") {
        token = value[pos];
        tokens.push({
          type: "word",
          sourceIndex: pos - before.length,
          sourceEndIndex: pos + token.length,
          value: token
        });
        pos += 1;
        code = value.charCodeAt(pos);

        // Dividers
      } else if (code === slash || code === comma || code === colon) {
        token = value[pos];
        tokens.push({
          type: "div",
          sourceIndex: pos - before.length,
          sourceEndIndex: pos + token.length,
          value: token,
          before: before,
          after: ""
        });
        before = "";
        pos += 1;
        code = value.charCodeAt(pos);

        // Open parentheses
      } else if (openParentheses === code) {
        // Whitespaces after open parentheses
        next = pos;
        do {
          next += 1;
          code = value.charCodeAt(next);
        } while (code <= 32);
        parenthesesOpenPos = pos;
        token = {
          type: "function",
          sourceIndex: pos - name.length,
          value: name,
          before: value.slice(parenthesesOpenPos + 1, next)
        };
        pos = next;
        if (name === "url" && code !== singleQuote && code !== doubleQuote) {
          next -= 1;
          do {
            escape = false;
            next = value.indexOf(")", next + 1);
            if (~next) {
              escapePos = next;
              while (value.charCodeAt(escapePos - 1) === backslash) {
                escapePos -= 1;
                escape = !escape;
              }
            } else {
              value += ")";
              next = value.length - 1;
              token.unclosed = true;
            }
          } while (escape);
          // Whitespaces before closed
          whitespacePos = next;
          do {
            whitespacePos -= 1;
            code = value.charCodeAt(whitespacePos);
          } while (code <= 32);
          if (parenthesesOpenPos < whitespacePos) {
            if (pos !== whitespacePos + 1) {
              token.nodes = [{
                type: "word",
                sourceIndex: pos,
                sourceEndIndex: whitespacePos + 1,
                value: value.slice(pos, whitespacePos + 1)
              }];
            } else {
              token.nodes = [];
            }
            if (token.unclosed && whitespacePos + 1 !== next) {
              token.after = "";
              token.nodes.push({
                type: "space",
                sourceIndex: whitespacePos + 1,
                sourceEndIndex: next,
                value: value.slice(whitespacePos + 1, next)
              });
            } else {
              token.after = value.slice(whitespacePos + 1, next);
              token.sourceEndIndex = next;
            }
          } else {
            token.after = "";
            token.nodes = [];
          }
          pos = next + 1;
          token.sourceEndIndex = token.unclosed ? next : pos;
          code = value.charCodeAt(pos);
          tokens.push(token);
        } else {
          balanced += 1;
          token.after = "";
          token.sourceEndIndex = pos + 1;
          tokens.push(token);
          stack.push(token);
          tokens = token.nodes = [];
          parent = token;
        }
        name = "";

        // Close parentheses
      } else if (closeParentheses === code && balanced) {
        pos += 1;
        code = value.charCodeAt(pos);
        parent.after = after;
        parent.sourceEndIndex += after.length;
        after = "";
        balanced -= 1;
        stack[stack.length - 1].sourceEndIndex = pos;
        stack.pop();
        parent = stack[balanced];
        tokens = parent.nodes;

        // Words
      } else {
        next = pos;
        do {
          if (code === backslash) {
            next += 1;
          }
          next += 1;
          code = value.charCodeAt(next);
        } while (next < max && !(code <= 32 || code === singleQuote || code === doubleQuote || code === comma || code === colon || code === slash || code === openParentheses || code === star && parent && parent.type === "function" && parent.value === "calc" || code === slash && parent.type === "function" && parent.value === "calc" || code === closeParentheses && balanced));
        token = value.slice(pos, next);
        if (openParentheses === code) {
          name = token;
        } else if ((uLower === token.charCodeAt(0) || uUpper === token.charCodeAt(0)) && plus === token.charCodeAt(1) && isUnicodeRange.test(token.slice(2))) {
          tokens.push({
            type: "unicode-range",
            sourceIndex: pos,
            sourceEndIndex: next,
            value: token
          });
        } else {
          tokens.push({
            type: "word",
            sourceIndex: pos,
            sourceEndIndex: next,
            value: token
          });
        }
        pos = next;
      }
    }
    for (pos = stack.length - 1; pos; pos -= 1) {
      stack[pos].unclosed = true;
      stack[pos].sourceEndIndex = value.length;
    }
    return stack[0].nodes;
  };
},68,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = function walk(nodes, cb, bubble) {
    var i, max, node, result;
    for (i = 0, max = nodes.length; i < max; i += 1) {
      node = nodes[i];
      if (!bubble) {
        result = cb(node, i, nodes);
      }
      if (result !== false && node.type === "function" && Array.isArray(node.nodes)) {
        walk(node.nodes, cb, bubble);
      }
      if (bubble) {
        cb(node, i, nodes);
      }
    }
  };
},69,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function stringifyNode(node, custom) {
    var type = node.type;
    var value = node.value;
    var buf;
    var customResult;
    if (custom && (customResult = custom(node)) !== undefined) {
      return customResult;
    } else if (type === "word" || type === "space") {
      return value;
    } else if (type === "string") {
      buf = node.quote || "";
      return buf + value + (node.unclosed ? "" : buf);
    } else if (type === "comment") {
      return "/*" + value + (node.unclosed ? "" : "*/");
    } else if (type === "div") {
      return (node.before || "") + value + (node.after || "");
    } else if (Array.isArray(node.nodes)) {
      buf = stringify(node.nodes, custom);
      if (type !== "function") {
        return buf;
      }
      return value + "(" + (node.before || "") + buf + (node.after || "") + (node.unclosed ? "" : ")");
    }
    return value;
  }
  function stringify(nodes, custom) {
    var result, i;
    if (Array.isArray(nodes)) {
      result = "";
      for (i = nodes.length - 1; ~i; i -= 1) {
        result = stringifyNode(nodes[i], custom) + result;
      }
      return result;
    }
    return stringifyNode(nodes, custom);
  }
  module.exports = stringify;
},70,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var minus = "-".charCodeAt(0);
  var plus = "+".charCodeAt(0);
  var dot = ".".charCodeAt(0);
  var exp = "e".charCodeAt(0);
  var EXP = "E".charCodeAt(0);

  // Check if three code points would start a number
  // https://www.w3.org/TR/css-syntax-3/#starts-with-a-number
  function likeNumber(value) {
    var code = value.charCodeAt(0);
    var nextCode;
    if (code === plus || code === minus) {
      nextCode = value.charCodeAt(1);
      if (nextCode >= 48 && nextCode <= 57) {
        return true;
      }
      var nextNextCode = value.charCodeAt(2);
      if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) {
        return true;
      }
      return false;
    }
    if (code === dot) {
      nextCode = value.charCodeAt(1);
      if (nextCode >= 48 && nextCode <= 57) {
        return true;
      }
      return false;
    }
    if (code >= 48 && code <= 57) {
      return true;
    }
    return false;
  }

  // Consume a number
  // https://www.w3.org/TR/css-syntax-3/#consume-number
  module.exports = function (value) {
    var pos = 0;
    var length = value.length;
    var code;
    var nextCode;
    var nextNextCode;
    if (length === 0 || !likeNumber(value)) {
      return false;
    }
    code = value.charCodeAt(pos);
    if (code === plus || code === minus) {
      pos++;
    }
    while (pos < length) {
      code = value.charCodeAt(pos);
      if (code < 48 || code > 57) {
        break;
      }
      pos += 1;
    }
    code = value.charCodeAt(pos);
    nextCode = value.charCodeAt(pos + 1);
    if (code === dot && nextCode >= 48 && nextCode <= 57) {
      pos += 2;
      while (pos < length) {
        code = value.charCodeAt(pos);
        if (code < 48 || code > 57) {
          break;
        }
        pos += 1;
      }
    }
    code = value.charCodeAt(pos);
    nextCode = value.charCodeAt(pos + 1);
    nextNextCode = value.charCodeAt(pos + 2);
    if ((code === exp || code === EXP) && (nextCode >= 48 && nextCode <= 57 || (nextCode === plus || nextCode === minus) && nextNextCode >= 48 && nextNextCode <= 57)) {
      pos += nextCode === plus || nextCode === minus ? 3 : 2;
      while (pos < length) {
        code = value.charCodeAt(pos);
        if (code < 48 || code > 57) {
          break;
        }
        pos += 1;
      }
    }
    return {
      number: value.slice(0, pos),
      unit: value.slice(pos)
    };
  };
},71,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  exports.getLocaleDirection = getLocaleDirection;
  exports.LocaleProvider = LocaleProvider;
  exports.useLocaleContext = useLocaleContext;
  var _react = require(_dependencyMap[0]);
  var React = _interopDefault(_react);
  var _isLocaleRTL = require(_dependencyMap[1]);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var defaultLocale = {
    direction: 'ltr',
    locale: 'en-US'
  };
  var LocaleContext = /*#__PURE__*/(0, _react.createContext)(defaultLocale);
  function getLocaleDirection(locale) {
    return (0, _isLocaleRTL.isLocaleRTL)(locale) ? 'rtl' : 'ltr';
  }
  function LocaleProvider(props) {
    var direction = props.direction,
      locale = props.locale,
      children = props.children;
    var needsContext = direction || locale;
    return needsContext ? /*#__PURE__*/React.default.createElement(LocaleContext.Provider, {
      children: children,
      value: {
        direction: locale ? getLocaleDirection(locale) : direction,
        locale
      }
    }) : children;
  }
  function useLocaleContext() {
    return (0, _react.useContext)(LocaleContext);
  }
},72,[1,73]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.isLocaleRTL = isLocaleRTL;
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var rtlScripts = new Set(['Arab', 'Syrc', 'Samr', 'Mand', 'Thaa', 'Mend', 'Nkoo', 'Adlm', 'Rohg', 'Hebr']);
  var rtlLangs = new Set(['ae',
  // Avestan
  'ar',
  // Arabic
  'arc',
  // Aramaic
  'bcc',
  // Southern Balochi
  'bqi',
  // Bakthiari
  'ckb',
  // Sorani
  'dv',
  // Dhivehi
  'fa', 'far',
  // Persian
  'glk',
  // Gilaki
  'he', 'iw',
  // Hebrew
  'khw',
  // Khowar
  'ks',
  // Kashmiri
  'ku',
  // Kurdish
  'mzn',
  // Mazanderani
  'nqo',
  // N'Ko
  'pnb',
  // Western Punjabi
  'ps',
  // Pashto
  'sd',
  // Sindhi
  'ug',
  // Uyghur
  'ur',
  // Urdu
  'yi' // Yiddish
  ]);
  var cache = new Map();

  /**
   * Determine the writing direction of a locale
   */
  function isLocaleRTL(locale) {
    var cachedRTL = cache.get(locale);
    if (cachedRTL) {
      return cachedRTL;
    }
    var isRTL = false;
    // $FlowFixMe
    if (Intl.Locale) {
      try {
        // $FlowFixMe
        var script = new Intl.Locale(locale).maximize().script;
        isRTL = rtlScripts.has(script);
      } catch (_unused) {
        // RangeError: Incorrect locale information provided
        // Fallback to inferring from language
        var lang = locale.split('-')[0];
        isRTL = rtlLangs.has(lang);
      }
    } else {
      // Fallback to inferring from language
      var _lang = locale.split('-')[0];
      isRTL = rtlLangs.has(_lang);
    }
    cache.set(locale, isRTL);
    return isRTL;
  }
},73,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "defaultProps", {
    enumerable: true,
    get: function () {
      return defaultProps;
    }
  });
  Object.defineProperty(exports, "accessibilityProps", {
    enumerable: true,
    get: function () {
      return accessibilityProps;
    }
  });
  Object.defineProperty(exports, "clickProps", {
    enumerable: true,
    get: function () {
      return clickProps;
    }
  });
  Object.defineProperty(exports, "focusProps", {
    enumerable: true,
    get: function () {
      return focusProps;
    }
  });
  Object.defineProperty(exports, "keyboardProps", {
    enumerable: true,
    get: function () {
      return keyboardProps;
    }
  });
  Object.defineProperty(exports, "mouseProps", {
    enumerable: true,
    get: function () {
      return mouseProps;
    }
  });
  Object.defineProperty(exports, "touchProps", {
    enumerable: true,
    get: function () {
      return touchProps;
    }
  });
  Object.defineProperty(exports, "styleProps", {
    enumerable: true,
    get: function () {
      return styleProps;
    }
  });
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var defaultProps = {
    children: true,
    dataSet: true,
    dir: true,
    id: true,
    ref: true,
    suppressHydrationWarning: true,
    tabIndex: true,
    testID: true,
    // @deprecated
    focusable: true,
    nativeID: true
  };
  var accessibilityProps = {
    'aria-activedescendant': true,
    'aria-atomic': true,
    'aria-autocomplete': true,
    'aria-busy': true,
    'aria-checked': true,
    'aria-colcount': true,
    'aria-colindex': true,
    'aria-colspan': true,
    'aria-controls': true,
    'aria-current': true,
    'aria-describedby': true,
    'aria-details': true,
    'aria-disabled': true,
    'aria-errormessage': true,
    'aria-expanded': true,
    'aria-flowto': true,
    'aria-haspopup': true,
    'aria-hidden': true,
    'aria-invalid': true,
    'aria-keyshortcuts': true,
    'aria-label': true,
    'aria-labelledby': true,
    'aria-level': true,
    'aria-live': true,
    'aria-modal': true,
    'aria-multiline': true,
    'aria-multiselectable': true,
    'aria-orientation': true,
    'aria-owns': true,
    'aria-placeholder': true,
    'aria-posinset': true,
    'aria-pressed': true,
    'aria-readonly': true,
    'aria-required': true,
    inert: true,
    role: true,
    'aria-roledescription': true,
    'aria-rowcount': true,
    'aria-rowindex': true,
    'aria-rowspan': true,
    'aria-selected': true,
    'aria-setsize': true,
    'aria-sort': true,
    'aria-valuemax': true,
    'aria-valuemin': true,
    'aria-valuenow': true,
    'aria-valuetext': true,
    // @deprecated
    accessibilityActiveDescendant: true,
    accessibilityAtomic: true,
    accessibilityAutoComplete: true,
    accessibilityBusy: true,
    accessibilityChecked: true,
    accessibilityColumnCount: true,
    accessibilityColumnIndex: true,
    accessibilityColumnSpan: true,
    accessibilityControls: true,
    accessibilityCurrent: true,
    accessibilityDescribedBy: true,
    accessibilityDetails: true,
    accessibilityDisabled: true,
    accessibilityErrorMessage: true,
    accessibilityExpanded: true,
    accessibilityFlowTo: true,
    accessibilityHasPopup: true,
    accessibilityHidden: true,
    accessibilityInvalid: true,
    accessibilityKeyShortcuts: true,
    accessibilityLabel: true,
    accessibilityLabelledBy: true,
    accessibilityLevel: true,
    accessibilityLiveRegion: true,
    accessibilityModal: true,
    accessibilityMultiline: true,
    accessibilityMultiSelectable: true,
    accessibilityOrientation: true,
    accessibilityOwns: true,
    accessibilityPlaceholder: true,
    accessibilityPosInSet: true,
    accessibilityPressed: true,
    accessibilityReadOnly: true,
    accessibilityRequired: true,
    accessibilityRole: true,
    accessibilityRoleDescription: true,
    accessibilityRowCount: true,
    accessibilityRowIndex: true,
    accessibilityRowSpan: true,
    accessibilitySelected: true,
    accessibilitySetSize: true,
    accessibilitySort: true,
    accessibilityValueMax: true,
    accessibilityValueMin: true,
    accessibilityValueNow: true,
    accessibilityValueText: true
  };
  var clickProps = {
    onClick: true,
    onAuxClick: true,
    onContextMenu: true,
    onGotPointerCapture: true,
    onLostPointerCapture: true,
    onPointerCancel: true,
    onPointerDown: true,
    onPointerEnter: true,
    onPointerMove: true,
    onPointerLeave: true,
    onPointerOut: true,
    onPointerOver: true,
    onPointerUp: true
  };
  var focusProps = {
    onBlur: true,
    onFocus: true
  };
  var keyboardProps = {
    onKeyDown: true,
    onKeyDownCapture: true,
    onKeyUp: true,
    onKeyUpCapture: true
  };
  var mouseProps = {
    onMouseDown: true,
    onMouseEnter: true,
    onMouseLeave: true,
    onMouseMove: true,
    onMouseOver: true,
    onMouseOut: true,
    onMouseUp: true
  };
  var touchProps = {
    onTouchCancel: true,
    onTouchCancelCapture: true,
    onTouchEnd: true,
    onTouchEndCapture: true,
    onTouchMove: true,
    onTouchMoveCapture: true,
    onTouchStart: true,
    onTouchStartCapture: true
  };
  var styleProps = {
    style: true
  };
},74,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return pick;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  function pick(obj, list) {
    var nextObj = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (list[key] === true) {
          nextObj[key] = obj[key];
        }
      }
    }
    return nextObj;
  }
},75,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return useElementLayout;
    }
  });
  var _useLayoutEffect = require(_dependencyMap[0]);
  var useLayoutEffect = _interopDefault(_useLayoutEffect);
  var _exportsUIManager = require(_dependencyMap[1]);
  var UIManager = _interopDefault(_exportsUIManager);
  var _canUseDom = require(_dependencyMap[2]);
  var canUseDOM = _interopDefault(_canUseDom);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var DOM_LAYOUT_HANDLER_NAME = '__reactLayoutHandler';
  var didWarn = !canUseDOM.default;
  var resizeObserver = null;
  function getResizeObserver() {
    if (canUseDOM.default && typeof window.ResizeObserver !== 'undefined') {
      if (resizeObserver == null) {
        resizeObserver = new window.ResizeObserver(function (entries) {
          entries.forEach(entry => {
            var node = entry.target;
            var onLayout = node[DOM_LAYOUT_HANDLER_NAME];
            if (typeof onLayout === 'function') {
              // We still need to measure the view because browsers don't yet provide
              // border-box dimensions in the entry
              UIManager.default.measure(node, (x, y, width, height, left, top) => {
                var event = {
                  // $FlowFixMe
                  nativeEvent: {
                    layout: {
                      x,
                      y,
                      width,
                      height,
                      left,
                      top
                    }
                  },
                  timeStamp: Date.now()
                };
                Object.defineProperty(event.nativeEvent, 'target', {
                  enumerable: true,
                  get: () => entry.target
                });
                onLayout(event);
              });
            }
          });
        });
      }
    } else if (!didWarn) {}
    return resizeObserver;
  }
  function useElementLayout(ref, onLayout) {
    var observer = getResizeObserver();
    (0, useLayoutEffect.default)(() => {
      var node = ref.current;
      if (node != null) {
        node[DOM_LAYOUT_HANDLER_NAME] = onLayout;
      }
    }, [ref, onLayout]);

    // Observing is done in a separate effect to avoid this effect running
    // when 'onLayout' changes.
    (0, useLayoutEffect.default)(() => {
      var node = ref.current;
      if (node != null && observer != null) {
        if (typeof node[DOM_LAYOUT_HANDLER_NAME] === 'function') {
          observer.observe(node);
        } else {
          observer.unobserve(node);
        }
      }
      return () => {
        if (node != null && observer != null) {
          observer.unobserve(node);
        }
      };
    }, [ref, observer]);
  }
},76,[77,78,25]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _canUseDom = require(_dependencyMap[1]);
  var canUseDOM = _interopDefault(_canUseDom);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * useLayoutEffect throws an error on the server. On the few occasions where is
   * problematic, use this hook.
   *
   * 
   */

  var useLayoutEffectImpl = canUseDOM.default ? _react.useLayoutEffect : _react.useEffect;
  var _default = useLayoutEffectImpl;
},77,[1,25]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _modulesGetBoundingClientRect = require(_dependencyMap[0]);
  var getBoundingClientRect = _interopDefault(_modulesGetBoundingClientRect);
  var _modulesSetValueForStyles = require(_dependencyMap[1]);
  var setValueForStyles = _interopDefault(_modulesSetValueForStyles);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var getRect = node => {
    var height = node.offsetHeight;
    var width = node.offsetWidth;
    var left = node.offsetLeft;
    var top = node.offsetTop;
    node = node.offsetParent;
    while (node && node.nodeType === 1 /* Node.ELEMENT_NODE */) {
      left += node.offsetLeft + node.clientLeft - node.scrollLeft;
      top += node.offsetTop + node.clientTop - node.scrollTop;
      node = node.offsetParent;
    }
    top -= window.scrollY;
    left -= window.scrollX;
    return {
      width,
      height,
      top,
      left
    };
  };
  var measureLayout = (node, relativeToNativeNode, callback) => {
    var relativeNode = relativeToNativeNode || node && node.parentNode;
    if (node && relativeNode) {
      setTimeout(() => {
        if (node.isConnected && relativeNode.isConnected) {
          var relativeRect = getRect(relativeNode);
          var _getRect = getRect(node),
            height = _getRect.height,
            left = _getRect.left,
            top = _getRect.top,
            width = _getRect.width;
          var x = left - relativeRect.left;
          var y = top - relativeRect.top;
          callback(x, y, width, height, left, top);
        }
      }, 0);
    }
  };
  var elementsToIgnore = {
    A: true,
    BODY: true,
    INPUT: true,
    SELECT: true,
    TEXTAREA: true
  };
  var UIManager = {
    blur(node) {
      try {
        node.blur();
      } catch (err) {}
    },
    focus(node) {
      try {
        var name = node.nodeName;
        // A tabIndex of -1 allows element to be programmatically focused but
        // prevents keyboard focus. We don't want to set the tabindex value on
        // elements that should not prevent keyboard focus.
        if (node.getAttribute('tabIndex') == null && node.isContentEditable !== true && elementsToIgnore[name] == null) {
          node.setAttribute('tabIndex', '-1');
        }
        node.focus();
      } catch (err) {}
    },
    measure(node, callback) {
      measureLayout(node, null, callback);
    },
    measureInWindow(node, callback) {
      if (node) {
        setTimeout(() => {
          var _getBoundingClientRec = (0, getBoundingClientRect.default)(node),
            height = _getBoundingClientRec.height,
            left = _getBoundingClientRec.left,
            top = _getBoundingClientRec.top,
            width = _getBoundingClientRec.width;
          callback(left, top, width, height);
        }, 0);
      }
    },
    measureLayout(node, relativeToNativeNode, onFail, onSuccess) {
      measureLayout(node, relativeToNativeNode, onSuccess);
    },
    updateView(node, props) {
      for (var prop in props) {
        if (!Object.prototype.hasOwnProperty.call(props, prop)) {
          continue;
        }
        var value = props[prop];
        switch (prop) {
          case 'style':
            {
              (0, setValueForStyles.default)(node, value);
              break;
            }
          case 'class':
          case 'className':
            {
              node.setAttribute('class', value);
              break;
            }
          case 'text':
          case 'value':
            // native platforms use `text` prop to replace text input value
            node.value = value;
            break;
          default:
            node.setAttribute(prop, value);
        }
      }
    },
    configureNextLayoutAnimation(config, onAnimationDidEnd) {
      onAnimationDidEnd();
    },
    // mocks
    setLayoutAnimationEnabledExperimental() {}
  };
  var _default = UIManager;
},78,[79,80]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var getBoundingClientRect = node => {
    if (node != null) {
      var isElement = node.nodeType === 1; /* Node.ELEMENT_NODE */
      if (isElement && typeof node.getBoundingClientRect === 'function') {
        return node.getBoundingClientRect();
      }
    }
  };
  var _default = getBoundingClientRect;
},79,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _dangerousStyleValue = require(_dependencyMap[0]);
  var dangerousStyleValue = _interopDefault(_dangerousStyleValue);
  /* eslint-disable */

  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * From React 16.3.0
   * 
   */

  /**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   */
  function setValueForStyles(node, styles) {
    var style = node.style;
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var isCustomProperty = styleName.indexOf('--') === 0;
      var styleValue = (0, dangerousStyleValue.default)(styleName, styles[styleName], isCustomProperty);
      if (styleName === 'float') {
        styleName = 'cssFloat';
      }
      if (isCustomProperty) {
        style.setProperty(styleName, styleValue);
      } else {
        style[styleName] = styleValue;
      }
    }
  }
  var _default = setValueForStyles;
},80,[81]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _unitlessNumbers = require(_dependencyMap[0]);
  var isUnitlessNumber = _interopDefault(_unitlessNumbers);
  /* eslint-disable */

  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * From React 16.0.0
   * 
   */

  /**
   * Convert a value into the proper css writable value. The style name `name`
   * should be logical (no hyphens), as specified
   * in `CSSProperty.isUnitlessNumber`.
   *
   * @param {string} name CSS property name such as `topMargin`.
   * @param {*} value CSS property value such as `10px`.
   * @return {string} Normalized style value with dimensions applied.
   */
  function dangerousStyleValue(name, value, isCustomProperty) {
    // Note that we've removed escapeTextForBrowser() calls here since the
    // whole string will be escaped when the attribute is injected into
    // the markup. If you provide unsafe user data here they can inject
    // arbitrary CSS which may be problematic (I couldn't repro this):
    // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
    // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
    // This is not an XSS hole but instead a potential CSS injection issue
    // which has lead to a greater discussion about how we're going to
    // trust URLs moving forward. See #2115901

    var isEmpty = value == null || typeof value === 'boolean' || value === '';
    if (isEmpty) {
      return '';
    }
    if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.default.hasOwnProperty(name) && isUnitlessNumber.default[name])) {
      return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
    }
    return ('' + value).trim();
  }
  var _default = dangerousStyleValue;
},81,[82]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher.
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var unitlessNumbers = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexOrder: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    fontWeight: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowGap: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnGap: true,
    gridColumnStart: true,
    lineClamp: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    // SVG-related
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true,
    // transform types
    scale: true,
    scaleX: true,
    scaleY: true,
    scaleZ: true,
    // RN properties
    shadowOpacity: true
  };

  /**
   * Support style names that may come passed in prefixed by adding permutations
   * of vendor prefixes.
   */
  var prefixes = ['ms', 'Moz', 'O', 'Webkit'];
  var prefixKey = (prefix, key) => {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  };
  Object.keys(unitlessNumbers).forEach(prop => {
    prefixes.forEach(prefix => {
      unitlessNumbers[prefixKey(prefix, prop)] = unitlessNumbers[prop];
    });
  });
  var _default = unitlessNumbers;
},82,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return useMergeRefs;
    }
  });
  var _react = require(_dependencyMap[0]);
  var React = _interopNamespace(_react);
  var _mergeRefs = require(_dependencyMap[1]);
  var mergeRefs = _interopDefault(_mergeRefs);
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  function useMergeRefs() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return React.useMemo(() => (0, mergeRefs.default)(...args),
    // eslint-disable-next-line
    [...args]);
  }
},83,[1,84]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return mergeRefs;
    }
  });
  require(_dependencyMap[0]);
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  function mergeRefs() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return function forwardRef(node) {
      args.forEach(ref => {
        if (ref == null) {
          return;
        }
        if (typeof ref === 'function') {
          ref(node);
          return;
        }
        if (typeof ref === 'object') {
          ref.current = node;
          return;
        }
        console.error("mergeRefs cannot handle Refs of type boolean, number or string, received ref " + String(ref));
      });
    };
  }
},84,[1]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return usePlatformMethods;
    }
  });
  var _exportsUIManager = require(_dependencyMap[0]);
  var UIManager = _interopDefault(_exportsUIManager);
  var _useStable = require(_dependencyMap[1]);
  var useStable = _interopDefault(_useStable);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  /**
   * Adds non-standard methods to the hode element. This is temporarily until an
   * API like `ReactNative.measure(hostRef, callback)` is added to React Native.
   */
  function usePlatformMethods(_ref) {
    var pointerEvents = _ref.pointerEvents,
      style = _ref.style;
    // Avoid creating a new ref on every render.
    var ref = (0, useStable.default)(() => hostNode => {
      if (hostNode != null) {
        hostNode.measure = callback => UIManager.default.measure(hostNode, callback);
        hostNode.measureLayout = (relativeToNode, success, failure) => UIManager.default.measureLayout(hostNode, relativeToNode, failure, success);
        hostNode.measureInWindow = callback => UIManager.default.measureInWindow(hostNode, callback);
      }
    });
    return ref;
  }
},85,[78,86]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return useStable;
    }
  });
  var _react = require(_dependencyMap[0]);
  var React = _interopNamespace(_react);
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var UNINITIALIZED = typeof Symbol === 'function' && typeof Symbol() === 'symbol' ? Symbol() : Object.freeze({});
  function useStable(getInitialValue) {
    var ref = React.useRef(UNINITIALIZED);
    if (ref.current === UNINITIALIZED) {
      ref.current = getInitialValue();
    }
    // $FlowFixMe (#64650789) Trouble refining types where `Symbol` is concerned.
    return ref.current;
  }
},86,[1]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return useResponderEvents;
    }
  });
  var _react = require(_dependencyMap[0]);
  var React = _interopNamespace(_react);
  var _ResponderSystem = require(_dependencyMap[1]);
  var ResponderSystem = _interopNamespace(_ResponderSystem);
  /**
   * Copyright (c) Nicolas Gallagher
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  /**
   * Hook for integrating the Responder System into React
   *
   *   function SomeComponent({ onStartShouldSetResponder }) {
   *     const ref = useRef(null);
   *     useResponderEvents(ref, { onStartShouldSetResponder });
   *     return <div ref={ref} />
   *   }
   */

  var emptyObject = {};
  var idCounter = 0;
  function useStable(getInitialValue) {
    var ref = React.useRef(null);
    if (ref.current == null) {
      ref.current = getInitialValue();
    }
    return ref.current;
  }
  function useResponderEvents(hostRef, config) {
    if (config === undefined) {
      config = emptyObject;
    }
    var id = useStable(() => idCounter++);
    var isAttachedRef = React.useRef(false);

    // This is a separate effects so it doesn't run when the config changes.
    // On initial mount, attach global listeners if needed.
    // On unmount, remove node potentially attached to the Responder System.
    React.useEffect(() => {
      ResponderSystem.attachListeners();
      return () => {
        ResponderSystem.removeNode(id);
      };
    }, [id]);

    // Register and unregister with the Responder System as necessary
    React.useEffect(() => {
      var _config = config,
        onMoveShouldSetResponder = _config.onMoveShouldSetResponder,
        onMoveShouldSetResponderCapture = _config.onMoveShouldSetResponderCapture,
        onScrollShouldSetResponder = _config.onScrollShouldSetResponder,
        onScrollShouldSetResponderCapture = _config.onScrollShouldSetResponderCapture,
        onSelectionChangeShouldSetResponder = _config.onSelectionChangeShouldSetResponder,
        onSelectionChangeShouldSetResponderCapture = _config.onSelectionChangeShouldSetResponderCapture,
        onStartShouldSetResponder = _config.onStartShouldSetResponder,
        onStartShouldSetResponderCapture = _config.onStartShouldSetResponderCapture;
      var requiresResponderSystem = onMoveShouldSetResponder != null || onMoveShouldSetResponderCapture != null || onScrollShouldSetResponder != null || onScrollShouldSetResponderCapture != null || onSelectionChangeShouldSetResponder != null || onSelectionChangeShouldSetResponderCapture != null || onStartShouldSetResponder != null || onStartShouldSetResponderCapture != null;
      var node = hostRef.current;
      if (requiresResponderSystem) {
        ResponderSystem.addNode(id, node, config);
        isAttachedRef.current = true;
      } else if (isAttachedRef.current) {
        ResponderSystem.removeNode(id);
        isAttachedRef.current = false;
      }
    }, [config, hostRef, id]);
    React.useDebugValue({
      isResponder: hostRef.current === ResponderSystem.getResponderNode()
    });
    React.useDebugValue(config);
  }
},87,[1,88]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  exports.attachListeners = attachListeners;
  exports.addNode = addNode;
  exports.removeNode = removeNode;
  exports.terminateResponder = terminateResponder;
  exports.getResponderNode = getResponderNode;
  var _createResponderEvent = require(_dependencyMap[0]);
  var createResponderEvent = _interopDefault(_createResponderEvent);
  var _ResponderEventTypes = require(_dependencyMap[1]);
  var _utils = require(_dependencyMap[2]);
  var _ResponderTouchHistoryStore = require(_dependencyMap[3]);
  var _canUseDom = require(_dependencyMap[4]);
  var canUseDOM = _interopDefault(_canUseDom);
  /**
   * Copyright (c) Nicolas Gallagher
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  /**
   * RESPONDER EVENT SYSTEM
   *
   * A single, global "interaction lock" on views. For a view to be the "responder" means
   * that pointer interactions are exclusive to that view and none other. The "interaction
   * lock" can be transferred (only) to ancestors of the current "responder" as long as
   * pointers continue to be active.
   *
   * Responder being granted:
   *
   * A view can become the "responder" after the following events:
   *  * "pointerdown" (implemented using "touchstart", "mousedown")
   *  * "pointermove" (implemented using "touchmove", "mousemove")
   *  * "scroll" (while a pointer is down)
   *  * "selectionchange" (while a pointer is down)
   *
   * If nothing is already the "responder", the event propagates to (capture) and from
   * (bubble) the event target until a view returns `true` for
   * `on*ShouldSetResponder(Capture)`.
   *
   * If something is already the responder, the event propagates to (capture) and from
   * (bubble) the lowest common ancestor of the event target and the current "responder".
   * Then negotiation happens between the current "responder" and a view that wants to
   * become the "responder": see the timing diagram below.
   *
   * (NOTE: Scrolled views either automatically become the "responder" or release the
   * "interaction lock". A native scroll view that isn't built on top of the responder
   * system must result in the current "responder" being notified that it no longer has
   * the "interaction lock" - the native system has taken over.
   *
   * Responder being released:
   *
   * As soon as there are no more active pointers that *started* inside descendants
   * of the *current* "responder", an `onResponderRelease` event is dispatched to the
   * current "responder", and the responder lock is released.
   *
   * Typical sequence of events:
   *  * startShouldSetResponder
   *  * responderGrant/Reject
   *  * responderStart
   *  * responderMove
   *  * responderEnd
   *  * responderRelease
   */

  /*                                             Negotiation Performed
                                               +-----------------------+
                                              /                         \
  Process low level events to    +     Current Responder      +   wantsResponderID
  determine who to perform negot-|   (if any exists at all)   |
  iation/transition              | Otherwise just pass through|
  -------------------------------+----------------------------+------------------+
  Bubble to find first ID        |                            |
  to return true:wantsResponderID|                            |
                                 |                            |
       +--------------+          |                            |
       | onTouchStart |          |                            |
       +------+-------+    none  |                            |
              |            return|                            |
  +-----------v-------------+true| +------------------------+ |
  |onStartShouldSetResponder|----->| onResponderStart (cur) |<-----------+
  +-----------+-------------+    | +------------------------+ |          |
              |                  |                            | +--------+-------+
              | returned true for|       false:REJECT +-------->|onResponderReject
              | wantsResponderID |                    |       | +----------------+
              | (now attempt     | +------------------+-----+ |
              |  handoff)        | | onResponder            | |
              +------------------->|    TerminationRequest  | |
                                 | +------------------+-----+ |
                                 |                    |       | +----------------+
                                 |         true:GRANT +-------->|onResponderGrant|
                                 |                            | +--------+-------+
                                 | +------------------------+ |          |
                                 | | onResponderTerminate   |<-----------+
                                 | +------------------+-----+ |
                                 |                    |       | +----------------+
                                 |                    +-------->|onResponderStart|
                                 |                            | +----------------+
  Bubble to find first ID        |                            |
  to return true:wantsResponderID|                            |
                                 |                            |
       +-------------+           |                            |
       | onTouchMove |           |                            |
       +------+------+     none  |                            |
              |            return|                            |
  +-----------v-------------+true| +------------------------+ |
  |onMoveShouldSetResponder |----->| onResponderMove (cur)  |<-----------+
  +-----------+-------------+    | +------------------------+ |          |
              |                  |                            | +--------+-------+
              | returned true for|       false:REJECT +-------->|onResponderReject
              | wantsResponderID |                    |       | +----------------+
              | (now attempt     | +------------------+-----+ |
              |  handoff)        | |   onResponder          | |
              +------------------->|      TerminationRequest| |
                                 | +------------------+-----+ |
                                 |                    |       | +----------------+
                                 |         true:GRANT +-------->|onResponderGrant|
                                 |                            | +--------+-------+
                                 | +------------------------+ |          |
                                 | |   onResponderTerminate |<-----------+
                                 | +------------------+-----+ |
                                 |                    |       | +----------------+
                                 |                    +-------->|onResponderMove |
                                 |                            | +----------------+
                                 |                            |
                                 |                            |
        Some active touch started|                            |
        inside current responder | +------------------------+ |
        +------------------------->|      onResponderEnd    | |
        |                        | +------------------------+ |
    +---+---------+              |                            |
    | onTouchEnd  |              |                            |
    +---+---------+              |                            |
        |                        | +------------------------+ |
        +------------------------->|     onResponderEnd     | |
        No active touches started| +-----------+------------+ |
        inside current responder |             |              |
                                 |             v              |
                                 | +------------------------+ |
                                 | |    onResponderRelease  | |
                                 | +------------------------+ |
                                 |                            |
                                 +                            + */

  /* ------------ TYPES ------------ */

  var emptyObject = {};

  /* ------------ IMPLEMENTATION ------------ */

  var startRegistration = ['onStartShouldSetResponderCapture', 'onStartShouldSetResponder', {
    bubbles: true
  }];
  var moveRegistration = ['onMoveShouldSetResponderCapture', 'onMoveShouldSetResponder', {
    bubbles: true
  }];
  var scrollRegistration = ['onScrollShouldSetResponderCapture', 'onScrollShouldSetResponder', {
    bubbles: false
  }];
  var shouldSetResponderEvents = {
    touchstart: startRegistration,
    mousedown: startRegistration,
    touchmove: moveRegistration,
    mousemove: moveRegistration,
    scroll: scrollRegistration
  };
  var emptyResponder = {
    id: null,
    idPath: null,
    node: null
  };
  var responderListenersMap = new Map();
  var isEmulatingMouseEvents = false;
  var trackedTouchCount = 0;
  var currentResponder = {
    id: null,
    node: null,
    idPath: null
  };
  var responderTouchHistoryStore = new _ResponderTouchHistoryStore.ResponderTouchHistoryStore();
  function changeCurrentResponder(responder) {
    currentResponder = responder;
  }
  function getResponderConfig(id) {
    var config = responderListenersMap.get(id);
    return config != null ? config : emptyObject;
  }

  /**
   * Process native events
   *
   * A single event listener is used to manage the responder system.
   * All pointers are tracked in the ResponderTouchHistoryStore. Native events
   * are interpreted in terms of the Responder System and checked to see if
   * the responder should be transferred. Each host node that is attached to
   * the Responder System has an ID, which is used to look up its associated
   * callbacks.
   */
  function eventListener(domEvent) {
    var eventType = domEvent.type;
    var eventTarget = domEvent.target;

    /**
     * Manage emulated events and early bailout.
     * Since PointerEvent is not used yet (lack of support in older Safari), it's
     * necessary to manually manage the mess of browser touch/mouse events.
     * And bailout early for termination events when there is no active responder.
     */

    // Flag when browser may produce emulated events
    if (eventType === 'touchstart') {
      isEmulatingMouseEvents = true;
    }
    // Remove flag when browser will not produce emulated events
    if (eventType === 'touchmove' || trackedTouchCount > 1) {
      isEmulatingMouseEvents = false;
    }
    // Ignore various events in particular circumstances
    if (
    // Ignore browser emulated mouse events
    eventType === 'mousedown' && isEmulatingMouseEvents || eventType === 'mousemove' && isEmulatingMouseEvents ||
    // Ignore mousemove if a mousedown didn't occur first
    eventType === 'mousemove' && trackedTouchCount < 1) {
      return;
    }
    // Remove flag after emulated events are finished
    if (isEmulatingMouseEvents && eventType === 'mouseup') {
      if (trackedTouchCount === 0) {
        isEmulatingMouseEvents = false;
      }
      return;
    }
    var isStartEvent = (0, _ResponderEventTypes.isStartish)(eventType) && (0, _utils.isPrimaryPointerDown)(domEvent);
    var isMoveEvent = (0, _ResponderEventTypes.isMoveish)(eventType);
    var isEndEvent = (0, _ResponderEventTypes.isEndish)(eventType);
    var isScrollEvent = (0, _ResponderEventTypes.isScroll)(eventType);
    var isSelectionChangeEvent = (0, _ResponderEventTypes.isSelectionChange)(eventType);
    var responderEvent = (0, createResponderEvent.default)(domEvent, responderTouchHistoryStore);

    /**
     * Record the state of active pointers
     */

    if (isStartEvent || isMoveEvent || isEndEvent) {
      if (domEvent.touches) {
        trackedTouchCount = domEvent.touches.length;
      } else {
        if (isStartEvent) {
          trackedTouchCount = 1;
        } else if (isEndEvent) {
          trackedTouchCount = 0;
        }
      }
      responderTouchHistoryStore.recordTouchTrack(eventType, responderEvent.nativeEvent);
    }

    /**
     * Responder System logic
     */

    var eventPaths = (0, _utils.getResponderPaths)(domEvent);
    var wasNegotiated = false;
    var wantsResponder;

    // If an event occured that might change the current responder...
    if (isStartEvent || isMoveEvent || isScrollEvent && trackedTouchCount > 0) {
      // If there is already a responder, prune the event paths to the lowest common ancestor
      // of the existing responder and deepest target of the event.
      var currentResponderIdPath = currentResponder.idPath;
      var eventIdPath = eventPaths.idPath;
      if (currentResponderIdPath != null && eventIdPath != null) {
        var lowestCommonAncestor = (0, _utils.getLowestCommonAncestor)(currentResponderIdPath, eventIdPath);
        if (lowestCommonAncestor != null) {
          var indexOfLowestCommonAncestor = eventIdPath.indexOf(lowestCommonAncestor);
          // Skip the current responder so it doesn't receive unexpected "shouldSet" events.
          var index = indexOfLowestCommonAncestor + (lowestCommonAncestor === currentResponder.id ? 1 : 0);
          eventPaths = {
            idPath: eventIdPath.slice(index),
            nodePath: eventPaths.nodePath.slice(index)
          };
        } else {
          eventPaths = null;
        }
      }
      if (eventPaths != null) {
        // If a node wants to become the responder, attempt to transfer.
        wantsResponder = findWantsResponder(eventPaths, domEvent, responderEvent);
        if (wantsResponder != null) {
          // Sets responder if none exists, or negotates with existing responder.
          attemptTransfer(responderEvent, wantsResponder);
          wasNegotiated = true;
        }
      }
    }

    // If there is now a responder, invoke its callbacks for the lifecycle of the gesture.
    if (currentResponder.id != null && currentResponder.node != null) {
      var _currentResponder = currentResponder,
        id = _currentResponder.id,
        node = _currentResponder.node;
      var _getResponderConfig = getResponderConfig(id),
        onResponderStart = _getResponderConfig.onResponderStart,
        onResponderMove = _getResponderConfig.onResponderMove,
        onResponderEnd = _getResponderConfig.onResponderEnd,
        onResponderRelease = _getResponderConfig.onResponderRelease,
        onResponderTerminate = _getResponderConfig.onResponderTerminate,
        onResponderTerminationRequest = _getResponderConfig.onResponderTerminationRequest;
      responderEvent.bubbles = false;
      responderEvent.cancelable = false;
      responderEvent.currentTarget = node;

      // Start
      if (isStartEvent) {
        if (onResponderStart != null) {
          responderEvent.dispatchConfig.registrationName = 'onResponderStart';
          onResponderStart(responderEvent);
        }
      }
      // Move
      else if (isMoveEvent) {
        if (onResponderMove != null) {
          responderEvent.dispatchConfig.registrationName = 'onResponderMove';
          onResponderMove(responderEvent);
        }
      } else {
        var isTerminateEvent = (0, _ResponderEventTypes.isCancelish)(eventType) ||
        // native context menu
        eventType === 'contextmenu' ||
        // window blur
        eventType === 'blur' && eventTarget === window ||
        // responder (or ancestors) blur
        eventType === 'blur' && eventTarget.contains(node) && domEvent.relatedTarget !== node ||
        // native scroll without using a pointer
        isScrollEvent && trackedTouchCount === 0 ||
        // native scroll on node that is parent of the responder (allow siblings to scroll)
        isScrollEvent && eventTarget.contains(node) && eventTarget !== node ||
        // native select/selectionchange on node
        isSelectionChangeEvent && (0, _utils.hasValidSelection)(domEvent);
        var isReleaseEvent = isEndEvent && !isTerminateEvent && !(0, _utils.hasTargetTouches)(node, domEvent.touches);

        // End
        if (isEndEvent) {
          if (onResponderEnd != null) {
            responderEvent.dispatchConfig.registrationName = 'onResponderEnd';
            onResponderEnd(responderEvent);
          }
        }
        // Release
        if (isReleaseEvent) {
          if (onResponderRelease != null) {
            responderEvent.dispatchConfig.registrationName = 'onResponderRelease';
            onResponderRelease(responderEvent);
          }
          changeCurrentResponder(emptyResponder);
        }
        // Terminate
        if (isTerminateEvent) {
          var shouldTerminate = true;

          // Responders can still avoid termination but only for these events.
          if (eventType === 'contextmenu' || eventType === 'scroll' || eventType === 'selectionchange') {
            // Only call this function is it wasn't already called during negotiation.
            if (wasNegotiated) {
              shouldTerminate = false;
            } else if (onResponderTerminationRequest != null) {
              responderEvent.dispatchConfig.registrationName = 'onResponderTerminationRequest';
              if (onResponderTerminationRequest(responderEvent) === false) {
                shouldTerminate = false;
              }
            }
          }
          if (shouldTerminate) {
            if (onResponderTerminate != null) {
              responderEvent.dispatchConfig.registrationName = 'onResponderTerminate';
              onResponderTerminate(responderEvent);
            }
            changeCurrentResponder(emptyResponder);
            isEmulatingMouseEvents = false;
            trackedTouchCount = 0;
          }
        }
      }
    }
  }

  /**
   * Walk the event path to/from the target node. At each node, stop and call the
   * relevant "shouldSet" functions for the given event type. If any of those functions
   * call "stopPropagation" on the event, stop searching for a responder.
   */
  function findWantsResponder(eventPaths, domEvent, responderEvent) {
    var shouldSetCallbacks = shouldSetResponderEvents[domEvent.type]; // for Flow

    if (shouldSetCallbacks != null) {
      var idPath = eventPaths.idPath,
        nodePath = eventPaths.nodePath;
      var shouldSetCallbackCaptureName = shouldSetCallbacks[0];
      var shouldSetCallbackBubbleName = shouldSetCallbacks[1];
      var bubbles = shouldSetCallbacks[2].bubbles;
      var check = function check(id, node, callbackName) {
        var config = getResponderConfig(id);
        var shouldSetCallback = config[callbackName];
        if (shouldSetCallback != null) {
          responderEvent.currentTarget = node;
          if (shouldSetCallback(responderEvent) === true) {
            // Start the path from the potential responder
            var prunedIdPath = idPath.slice(idPath.indexOf(id));
            return {
              id,
              node,
              idPath: prunedIdPath
            };
          }
        }
      };

      // capture
      for (var i = idPath.length - 1; i >= 0; i--) {
        var id = idPath[i];
        var node = nodePath[i];
        var result = check(id, node, shouldSetCallbackCaptureName);
        if (result != null) {
          return result;
        }
        if (responderEvent.isPropagationStopped() === true) {
          return;
        }
      }

      // bubble
      if (bubbles) {
        for (var _i = 0; _i < idPath.length; _i++) {
          var _id = idPath[_i];
          var _node = nodePath[_i];
          var _result = check(_id, _node, shouldSetCallbackBubbleName);
          if (_result != null) {
            return _result;
          }
          if (responderEvent.isPropagationStopped() === true) {
            return;
          }
        }
      } else {
        var _id2 = idPath[0];
        var _node2 = nodePath[0];
        var target = domEvent.target;
        if (target === _node2) {
          return check(_id2, _node2, shouldSetCallbackBubbleName);
        }
      }
    }
  }

  /**
   * Attempt to transfer the responder.
   */
  function attemptTransfer(responderEvent, wantsResponder) {
    var _currentResponder2 = currentResponder,
      currentId = _currentResponder2.id,
      currentNode = _currentResponder2.node;
    var id = wantsResponder.id,
      node = wantsResponder.node;
    var _getResponderConfig2 = getResponderConfig(id),
      onResponderGrant = _getResponderConfig2.onResponderGrant,
      onResponderReject = _getResponderConfig2.onResponderReject;
    responderEvent.bubbles = false;
    responderEvent.cancelable = false;
    responderEvent.currentTarget = node;

    // Set responder
    if (currentId == null) {
      if (onResponderGrant != null) {
        responderEvent.currentTarget = node;
        responderEvent.dispatchConfig.registrationName = 'onResponderGrant';
        onResponderGrant(responderEvent);
      }
      changeCurrentResponder(wantsResponder);
    }
    // Negotiate with current responder
    else {
      var _getResponderConfig3 = getResponderConfig(currentId),
        onResponderTerminate = _getResponderConfig3.onResponderTerminate,
        onResponderTerminationRequest = _getResponderConfig3.onResponderTerminationRequest;
      var allowTransfer = true;
      if (onResponderTerminationRequest != null) {
        responderEvent.currentTarget = currentNode;
        responderEvent.dispatchConfig.registrationName = 'onResponderTerminationRequest';
        if (onResponderTerminationRequest(responderEvent) === false) {
          allowTransfer = false;
        }
      }
      if (allowTransfer) {
        // Terminate existing responder
        if (onResponderTerminate != null) {
          responderEvent.currentTarget = currentNode;
          responderEvent.dispatchConfig.registrationName = 'onResponderTerminate';
          onResponderTerminate(responderEvent);
        }
        // Grant next responder
        if (onResponderGrant != null) {
          responderEvent.currentTarget = node;
          responderEvent.dispatchConfig.registrationName = 'onResponderGrant';
          onResponderGrant(responderEvent);
        }
        changeCurrentResponder(wantsResponder);
      } else {
        // Reject responder request
        if (onResponderReject != null) {
          responderEvent.currentTarget = node;
          responderEvent.dispatchConfig.registrationName = 'onResponderReject';
          onResponderReject(responderEvent);
        }
      }
    }
  }

  /* ------------ PUBLIC API ------------ */

  /**
   * Attach Listeners
   *
   * Use native events as ReactDOM doesn't have a non-plugin API to implement
   * this system.
   */
  var documentEventsCapturePhase = ['blur', 'scroll'];
  var documentEventsBubblePhase = [
  // mouse
  'mousedown', 'mousemove', 'mouseup', 'dragstart',
  // touch
  'touchstart', 'touchmove', 'touchend', 'touchcancel',
  // other
  'contextmenu', 'select', 'selectionchange'];
  function attachListeners() {
    if (canUseDOM.default && window.__reactResponderSystemActive == null) {
      window.addEventListener('blur', eventListener);
      documentEventsBubblePhase.forEach(eventType => {
        document.addEventListener(eventType, eventListener);
      });
      documentEventsCapturePhase.forEach(eventType => {
        document.addEventListener(eventType, eventListener, true);
      });
      window.__reactResponderSystemActive = true;
    }
  }

  /**
   * Register a node with the ResponderSystem.
   */
  function addNode(id, node, config) {
    (0, _utils.setResponderId)(node, id);
    responderListenersMap.set(id, config);
  }

  /**
   * Unregister a node with the ResponderSystem.
   */
  function removeNode(id) {
    if (currentResponder.id === id) {
      terminateResponder();
    }
    if (responderListenersMap.has(id)) {
      responderListenersMap.delete(id);
    }
  }

  /**
   * Allow the current responder to be terminated from within components to support
   * more complex requirements, such as use with other React libraries for working
   * with scroll views, input views, etc.
   */
  function terminateResponder() {
    var _currentResponder3 = currentResponder,
      id = _currentResponder3.id,
      node = _currentResponder3.node;
    if (id != null && node != null) {
      var _getResponderConfig4 = getResponderConfig(id),
        onResponderTerminate = _getResponderConfig4.onResponderTerminate;
      if (onResponderTerminate != null) {
        var event = (0, createResponderEvent.default)({}, responderTouchHistoryStore);
        event.currentTarget = node;
        onResponderTerminate(event);
      }
      changeCurrentResponder(emptyResponder);
    }
    isEmulatingMouseEvents = false;
    trackedTouchCount = 0;
  }

  /**
   * Allow unit tests to inspect the current responder in the system.
   * FOR TESTING ONLY.
   */
  function getResponderNode() {
    return currentResponder.node;
  }
},88,[89,90,91,93,25]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return createResponderEvent;
    }
  });
  var _modulesGetBoundingClientRect = require(_dependencyMap[0]);
  var getBoundingClientRect = _interopDefault(_modulesGetBoundingClientRect);
  /**
   * Copyright (c) Nicolas Gallagher
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var emptyFunction = () => {};
  var emptyObject = {};
  var emptyArray = [];

  /**
   * Safari produces very large identifiers that would cause the `touchBank` array
   * length to be so large as to crash the browser, if not normalized like this.
   * In the future the `touchBank` should use an object/map instead.
   */
  function normalizeIdentifier(identifier) {
    return identifier > 20 ? identifier % 20 : identifier;
  }

  /**
   * Converts a native DOM event to a ResponderEvent.
   * Mouse events are transformed into fake touch events.
   */
  function createResponderEvent(domEvent, responderTouchHistoryStore) {
    var rect;
    var propagationWasStopped = false;
    var changedTouches;
    var touches;
    var domEventChangedTouches = domEvent.changedTouches;
    var domEventType = domEvent.type;
    var metaKey = domEvent.metaKey === true;
    var shiftKey = domEvent.shiftKey === true;
    var force = domEventChangedTouches && domEventChangedTouches[0].force || 0;
    var identifier = normalizeIdentifier(domEventChangedTouches && domEventChangedTouches[0].identifier || 0);
    var clientX = domEventChangedTouches && domEventChangedTouches[0].clientX || domEvent.clientX;
    var clientY = domEventChangedTouches && domEventChangedTouches[0].clientY || domEvent.clientY;
    var pageX = domEventChangedTouches && domEventChangedTouches[0].pageX || domEvent.pageX;
    var pageY = domEventChangedTouches && domEventChangedTouches[0].pageY || domEvent.pageY;
    var preventDefault = typeof domEvent.preventDefault === 'function' ? domEvent.preventDefault.bind(domEvent) : emptyFunction;
    var timestamp = domEvent.timeStamp;
    function normalizeTouches(touches) {
      return Array.prototype.slice.call(touches).map(touch => {
        return {
          force: touch.force,
          identifier: normalizeIdentifier(touch.identifier),
          get locationX() {
            return locationX(touch.clientX);
          },
          get locationY() {
            return locationY(touch.clientY);
          },
          pageX: touch.pageX,
          pageY: touch.pageY,
          target: touch.target,
          timestamp
        };
      });
    }
    if (domEventChangedTouches != null) {
      changedTouches = normalizeTouches(domEventChangedTouches);
      touches = normalizeTouches(domEvent.touches);
    } else {
      var emulatedTouches = [{
        force,
        identifier,
        get locationX() {
          return locationX(clientX);
        },
        get locationY() {
          return locationY(clientY);
        },
        pageX,
        pageY,
        target: domEvent.target,
        timestamp
      }];
      changedTouches = emulatedTouches;
      touches = domEventType === 'mouseup' || domEventType === 'dragstart' ? emptyArray : emulatedTouches;
    }
    var responderEvent = {
      bubbles: true,
      cancelable: true,
      // `currentTarget` is set before dispatch
      currentTarget: null,
      defaultPrevented: domEvent.defaultPrevented,
      dispatchConfig: emptyObject,
      eventPhase: domEvent.eventPhase,
      isDefaultPrevented() {
        return domEvent.defaultPrevented;
      },
      isPropagationStopped() {
        return propagationWasStopped;
      },
      isTrusted: domEvent.isTrusted,
      nativeEvent: {
        altKey: false,
        ctrlKey: false,
        metaKey,
        shiftKey,
        changedTouches,
        force,
        identifier,
        get locationX() {
          return locationX(clientX);
        },
        get locationY() {
          return locationY(clientY);
        },
        pageX,
        pageY,
        target: domEvent.target,
        timestamp,
        touches,
        type: domEventType
      },
      persist: emptyFunction,
      preventDefault,
      stopPropagation() {
        propagationWasStopped = true;
      },
      target: domEvent.target,
      timeStamp: timestamp,
      touchHistory: responderTouchHistoryStore.touchHistory
    };

    // Using getters and functions serves two purposes:
    // 1) The value of `currentTarget` is not initially available.
    // 2) Measuring the clientRect may cause layout jank and should only be done on-demand.
    function locationX(x) {
      rect = rect || (0, getBoundingClientRect.default)(responderEvent.currentTarget);
      if (rect) {
        return x - rect.left;
      }
    }
    function locationY(y) {
      rect = rect || (0, getBoundingClientRect.default)(responderEvent.currentTarget);
      if (rect) {
        return y - rect.top;
      }
    }
    return responderEvent;
  }
},89,[79]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "BLUR", {
    enumerable: true,
    get: function () {
      return BLUR;
    }
  });
  Object.defineProperty(exports, "CONTEXT_MENU", {
    enumerable: true,
    get: function () {
      return CONTEXT_MENU;
    }
  });
  Object.defineProperty(exports, "FOCUS_OUT", {
    enumerable: true,
    get: function () {
      return FOCUS_OUT;
    }
  });
  Object.defineProperty(exports, "MOUSE_DOWN", {
    enumerable: true,
    get: function () {
      return MOUSE_DOWN;
    }
  });
  Object.defineProperty(exports, "MOUSE_MOVE", {
    enumerable: true,
    get: function () {
      return MOUSE_MOVE;
    }
  });
  Object.defineProperty(exports, "MOUSE_UP", {
    enumerable: true,
    get: function () {
      return MOUSE_UP;
    }
  });
  Object.defineProperty(exports, "MOUSE_CANCEL", {
    enumerable: true,
    get: function () {
      return MOUSE_CANCEL;
    }
  });
  Object.defineProperty(exports, "TOUCH_START", {
    enumerable: true,
    get: function () {
      return TOUCH_START;
    }
  });
  Object.defineProperty(exports, "TOUCH_MOVE", {
    enumerable: true,
    get: function () {
      return TOUCH_MOVE;
    }
  });
  Object.defineProperty(exports, "TOUCH_END", {
    enumerable: true,
    get: function () {
      return TOUCH_END;
    }
  });
  Object.defineProperty(exports, "TOUCH_CANCEL", {
    enumerable: true,
    get: function () {
      return TOUCH_CANCEL;
    }
  });
  Object.defineProperty(exports, "SCROLL", {
    enumerable: true,
    get: function () {
      return SCROLL;
    }
  });
  Object.defineProperty(exports, "SELECT", {
    enumerable: true,
    get: function () {
      return SELECT;
    }
  });
  Object.defineProperty(exports, "SELECTION_CHANGE", {
    enumerable: true,
    get: function () {
      return SELECTION_CHANGE;
    }
  });
  exports.isStartish = isStartish;
  exports.isMoveish = isMoveish;
  exports.isEndish = isEndish;
  exports.isCancelish = isCancelish;
  exports.isScroll = isScroll;
  exports.isSelectionChange = isSelectionChange;
  /**
   * Copyright (c) Nicolas Gallagher
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var BLUR = 'blur';
  var CONTEXT_MENU = 'contextmenu';
  var FOCUS_OUT = 'focusout';
  var MOUSE_DOWN = 'mousedown';
  var MOUSE_MOVE = 'mousemove';
  var MOUSE_UP = 'mouseup';
  var MOUSE_CANCEL = 'dragstart';
  var TOUCH_START = 'touchstart';
  var TOUCH_MOVE = 'touchmove';
  var TOUCH_END = 'touchend';
  var TOUCH_CANCEL = 'touchcancel';
  var SCROLL = 'scroll';
  var SELECT = 'select';
  var SELECTION_CHANGE = 'selectionchange';
  function isStartish(eventType) {
    return eventType === TOUCH_START || eventType === MOUSE_DOWN;
  }
  function isMoveish(eventType) {
    return eventType === TOUCH_MOVE || eventType === MOUSE_MOVE;
  }
  function isEndish(eventType) {
    return eventType === TOUCH_END || eventType === MOUSE_UP || isCancelish(eventType);
  }
  function isCancelish(eventType) {
    return eventType === TOUCH_CANCEL || eventType === MOUSE_CANCEL;
  }
  function isScroll(eventType) {
    return eventType === SCROLL;
  }
  function isSelectionChange(eventType) {
    return eventType === SELECT || eventType === SELECTION_CHANGE;
  }
},90,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  exports.setResponderId = setResponderId;
  exports.getResponderPaths = getResponderPaths;
  exports.getLowestCommonAncestor = getLowestCommonAncestor;
  exports.hasTargetTouches = hasTargetTouches;
  exports.hasValidSelection = hasValidSelection;
  exports.isPrimaryPointerDown = isPrimaryPointerDown;
  var _modulesIsSelectionValid = require(_dependencyMap[0]);
  var isSelectionValid = _interopDefault(_modulesIsSelectionValid);
  /**
   * Copyright (c) Nicolas Gallagher
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var keyName = '__reactResponderId';
  function getEventPath(domEvent) {
    // The 'selectionchange' event always has the 'document' as the target.
    // Use the anchor node as the initial target to reconstruct a path.
    // (We actually only need the first "responder" node in practice.)
    if (domEvent.type === 'selectionchange') {
      var target = window.getSelection().anchorNode;
      return composedPathFallback(target);
    } else {
      var path = domEvent.composedPath != null ? domEvent.composedPath() : composedPathFallback(domEvent.target);
      return path;
    }
  }
  function composedPathFallback(target) {
    var path = [];
    while (target != null && target !== document.body) {
      path.push(target);
      target = target.parentNode;
    }
    return path;
  }

  /**
   * Retrieve the responderId from a host node
   */
  function getResponderId(node) {
    if (node != null) {
      return node[keyName];
    }
    return null;
  }

  /**
   * Store the responderId on a host node
   */
  function setResponderId(node, id) {
    if (node != null) {
      node[keyName] = id;
    }
  }

  /**
   * Filter the event path to contain only the nodes attached to the responder system
   */
  function getResponderPaths(domEvent) {
    var idPath = [];
    var nodePath = [];
    var eventPath = getEventPath(domEvent);
    for (var i = 0; i < eventPath.length; i++) {
      var node = eventPath[i];
      var id = getResponderId(node);
      if (id != null) {
        idPath.push(id);
        nodePath.push(node);
      }
    }
    return {
      idPath,
      nodePath
    };
  }

  /**
   * Walk the paths and find the first common ancestor
   */
  function getLowestCommonAncestor(pathA, pathB) {
    var pathALength = pathA.length;
    var pathBLength = pathB.length;
    if (
    // If either path is empty
    pathALength === 0 || pathBLength === 0 ||
    // If the last elements aren't the same there can't be a common ancestor
    // that is connected to the responder system
    pathA[pathALength - 1] !== pathB[pathBLength - 1]) {
      return null;
    }
    var itemA = pathA[0];
    var indexA = 0;
    var itemB = pathB[0];
    var indexB = 0;

    // If A is deeper, skip indices that can't match.
    if (pathALength - pathBLength > 0) {
      indexA = pathALength - pathBLength;
      itemA = pathA[indexA];
      pathALength = pathBLength;
    }

    // If B is deeper, skip indices that can't match
    if (pathBLength - pathALength > 0) {
      indexB = pathBLength - pathALength;
      itemB = pathB[indexB];
      pathBLength = pathALength;
    }

    // Walk in lockstep until a match is found
    var depth = pathALength;
    while (depth--) {
      if (itemA === itemB) {
        return itemA;
      }
      itemA = pathA[indexA++];
      itemB = pathB[indexB++];
    }
    return null;
  }

  /**
   * Determine whether any of the active touches are within the current responder.
   * This cannot rely on W3C `targetTouches`, as neither IE11 nor Safari implement it.
   */
  function hasTargetTouches(target, touches) {
    if (!touches || touches.length === 0) {
      return false;
    }
    for (var i = 0; i < touches.length; i++) {
      var node = touches[i].target;
      if (node != null) {
        if (target.contains(node)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Ignore 'selectionchange' events that don't correspond with a person's intent to
   * select text.
   */
  function hasValidSelection(domEvent) {
    if (domEvent.type === 'selectionchange') {
      return (0, isSelectionValid.default)();
    }
    return domEvent.type === 'select';
  }

  /**
   * Events are only valid if the primary button was used without specific modifier keys.
   */
  function isPrimaryPointerDown(domEvent) {
    var altKey = domEvent.altKey,
      button = domEvent.button,
      buttons = domEvent.buttons,
      ctrlKey = domEvent.ctrlKey,
      type = domEvent.type;
    var isTouch = type === 'touchstart' || type === 'touchmove';
    var isPrimaryMouseDown = type === 'mousedown' && (button === 0 || buttons === 1);
    var isPrimaryMouseMove = type === 'mousemove' && buttons === 1;
    var noModifiers = altKey === false && ctrlKey === false;
    if (isTouch || isPrimaryMouseDown && noModifiers || isPrimaryMouseMove && noModifiers) {
      return true;
    }
    return false;
  }
},91,[92]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return isSelectionValid;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  function isSelectionValid() {
    var selection = window.getSelection();
    var string = selection.toString();
    var anchorNode = selection.anchorNode;
    var focusNode = selection.focusNode;
    var isTextNode = anchorNode && anchorNode.nodeType === window.Node.TEXT_NODE || focusNode && focusNode.nodeType === window.Node.TEXT_NODE;
    return string.length >= 1 && string !== '\n' && isTextNode;
  }
},92,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "ResponderTouchHistoryStore", {
    enumerable: true,
    get: function () {
      return ResponderTouchHistoryStore;
    }
  });
  var _ResponderEventTypes = require(_dependencyMap[0]);
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  /**
   * Tracks the position and time of each active touch by `touch.identifier`. We
   * should typically only see IDs in the range of 1-20 because IDs get recycled
   * when touches end and start again.
   */

  var __DEV__ = false;
  var MAX_TOUCH_BANK = 20;
  function timestampForTouch(touch) {
    // The legacy internal implementation provides "timeStamp", which has been
    // renamed to "timestamp".
    return touch.timeStamp || touch.timestamp;
  }

  /**
   * TODO: Instead of making gestures recompute filtered velocity, we could
   * include a built in velocity computation that can be reused globally.
   */
  function createTouchRecord(touch) {
    return {
      touchActive: true,
      startPageX: touch.pageX,
      startPageY: touch.pageY,
      startTimeStamp: timestampForTouch(touch),
      currentPageX: touch.pageX,
      currentPageY: touch.pageY,
      currentTimeStamp: timestampForTouch(touch),
      previousPageX: touch.pageX,
      previousPageY: touch.pageY,
      previousTimeStamp: timestampForTouch(touch)
    };
  }
  function resetTouchRecord(touchRecord, touch) {
    touchRecord.touchActive = true;
    touchRecord.startPageX = touch.pageX;
    touchRecord.startPageY = touch.pageY;
    touchRecord.startTimeStamp = timestampForTouch(touch);
    touchRecord.currentPageX = touch.pageX;
    touchRecord.currentPageY = touch.pageY;
    touchRecord.currentTimeStamp = timestampForTouch(touch);
    touchRecord.previousPageX = touch.pageX;
    touchRecord.previousPageY = touch.pageY;
    touchRecord.previousTimeStamp = timestampForTouch(touch);
  }
  function getTouchIdentifier(_ref) {
    var identifier = _ref.identifier;
    if (identifier == null) {
      console.error('Touch object is missing identifier.');
    }
    return identifier;
  }
  function recordTouchStart(touch, touchHistory) {
    var identifier = getTouchIdentifier(touch);
    var touchRecord = touchHistory.touchBank[identifier];
    if (touchRecord) {
      resetTouchRecord(touchRecord, touch);
    } else {
      touchHistory.touchBank[identifier] = createTouchRecord(touch);
    }
    touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
  }
  function recordTouchMove(touch, touchHistory) {
    var touchRecord = touchHistory.touchBank[getTouchIdentifier(touch)];
    if (touchRecord) {
      touchRecord.touchActive = true;
      touchRecord.previousPageX = touchRecord.currentPageX;
      touchRecord.previousPageY = touchRecord.currentPageY;
      touchRecord.previousTimeStamp = touchRecord.currentTimeStamp;
      touchRecord.currentPageX = touch.pageX;
      touchRecord.currentPageY = touch.pageY;
      touchRecord.currentTimeStamp = timestampForTouch(touch);
      touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
    } else {
      console.warn('Cannot record touch move without a touch start.\n', "Touch Move: " + printTouch(touch) + "\n", "Touch Bank: " + printTouchBank(touchHistory));
    }
  }
  function recordTouchEnd(touch, touchHistory) {
    var touchRecord = touchHistory.touchBank[getTouchIdentifier(touch)];
    if (touchRecord) {
      touchRecord.touchActive = false;
      touchRecord.previousPageX = touchRecord.currentPageX;
      touchRecord.previousPageY = touchRecord.currentPageY;
      touchRecord.previousTimeStamp = touchRecord.currentTimeStamp;
      touchRecord.currentPageX = touch.pageX;
      touchRecord.currentPageY = touch.pageY;
      touchRecord.currentTimeStamp = timestampForTouch(touch);
      touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
    } else {
      console.warn('Cannot record touch end without a touch start.\n', "Touch End: " + printTouch(touch) + "\n", "Touch Bank: " + printTouchBank(touchHistory));
    }
  }
  function printTouch(touch) {
    return JSON.stringify({
      identifier: touch.identifier,
      pageX: touch.pageX,
      pageY: touch.pageY,
      timestamp: timestampForTouch(touch)
    });
  }
  function printTouchBank(touchHistory) {
    var touchBank = touchHistory.touchBank;
    var printed = JSON.stringify(touchBank.slice(0, MAX_TOUCH_BANK));
    if (touchBank.length > MAX_TOUCH_BANK) {
      printed += ' (original size: ' + touchBank.length + ')';
    }
    return printed;
  }
  class ResponderTouchHistoryStore {
    constructor() {
      this._touchHistory = {
        touchBank: [],
        //Array<TouchRecord>
        numberActiveTouches: 0,
        // If there is only one active touch, we remember its location. This prevents
        // us having to loop through all of the touches all the time in the most
        // common case.
        indexOfSingleActiveTouch: -1,
        mostRecentTimeStamp: 0
      };
    }
    recordTouchTrack(topLevelType, nativeEvent) {
      var touchHistory = this._touchHistory;
      if ((0, _ResponderEventTypes.isMoveish)(topLevelType)) {
        nativeEvent.changedTouches.forEach(touch => recordTouchMove(touch, touchHistory));
      } else if ((0, _ResponderEventTypes.isStartish)(topLevelType)) {
        nativeEvent.changedTouches.forEach(touch => recordTouchStart(touch, touchHistory));
        touchHistory.numberActiveTouches = nativeEvent.touches.length;
        if (touchHistory.numberActiveTouches === 1) {
          touchHistory.indexOfSingleActiveTouch = nativeEvent.touches[0].identifier;
        }
      } else if ((0, _ResponderEventTypes.isEndish)(topLevelType)) {
        nativeEvent.changedTouches.forEach(touch => recordTouchEnd(touch, touchHistory));
        touchHistory.numberActiveTouches = nativeEvent.touches.length;
        if (touchHistory.numberActiveTouches === 1) {
          var touchBank = touchHistory.touchBank;
          for (var i = 0; i < touchBank.length; i++) {
            var touchTrackToCheck = touchBank[i];
            if (touchTrackToCheck != null && touchTrackToCheck.touchActive) {
              touchHistory.indexOfSingleActiveTouch = i;
              break;
            }
          }
        }
      }
    }
    get touchHistory() {
      return this._touchHistory;
    }
  }
},93,[90]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  'use client';
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _react = require(_dependencyMap[0]);
  var TextAncestorContext = /*#__PURE__*/(0, _react.createContext)(false);
  var _default = TextAncestorContext;
},94,[1]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Nicolas Gallagher.
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  'use client';
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _babelRuntimeHelpersObjectSpread = require(_dependencyMap[0]);
  var _objectSpread = _interopDefault(_babelRuntimeHelpersObjectSpread);
  var _babelRuntimeHelpersObjectWithoutPropertiesLoose = require(_dependencyMap[1]);
  var _objectWithoutPropertiesLoose = _interopDefault(_babelRuntimeHelpersObjectWithoutPropertiesLoose);
  var _react = require(_dependencyMap[2]);
  var React = _interopNamespace(_react);
  var _createElement = require(_dependencyMap[3]);
  var createElement = _interopDefault(_createElement);
  var _modulesForwardedProps = require(_dependencyMap[4]);
  var forwardedProps = _interopNamespace(_modulesForwardedProps);
  var _modulesPick = require(_dependencyMap[5]);
  var pick = _interopDefault(_modulesPick);
  var _modulesUseElementLayout = require(_dependencyMap[6]);
  var useElementLayout = _interopDefault(_modulesUseElementLayout);
  var _modulesUseMergeRefs = require(_dependencyMap[7]);
  var useMergeRefs = _interopDefault(_modulesUseMergeRefs);
  var _modulesUsePlatformMethods = require(_dependencyMap[8]);
  var usePlatformMethods = _interopDefault(_modulesUsePlatformMethods);
  var _modulesUseResponderEvents = require(_dependencyMap[9]);
  var useResponderEvents = _interopDefault(_modulesUseResponderEvents);
  var _StyleSheet = require(_dependencyMap[10]);
  var StyleSheet = _interopDefault(_StyleSheet);
  var _TextAncestorContext = require(_dependencyMap[11]);
  var TextAncestorContext = _interopDefault(_TextAncestorContext);
  var _modulesUseLocale = require(_dependencyMap[12]);
  var _excluded = ["hrefAttrs", "numberOfLines", "onClick", "onLayout", "onPress", "onMoveShouldSetResponder", "onMoveShouldSetResponderCapture", "onResponderEnd", "onResponderGrant", "onResponderMove", "onResponderReject", "onResponderRelease", "onResponderStart", "onResponderTerminate", "onResponderTerminationRequest", "onScrollShouldSetResponder", "onScrollShouldSetResponderCapture", "onSelectionChangeShouldSetResponder", "onSelectionChangeShouldSetResponderCapture", "onStartShouldSetResponder", "onStartShouldSetResponderCapture", "selectable"];
  //import { warnOnce } from '../../modules/warnOnce';

  var forwardPropsList = Object.assign({}, forwardedProps.defaultProps, forwardedProps.accessibilityProps, forwardedProps.clickProps, forwardedProps.focusProps, forwardedProps.keyboardProps, forwardedProps.mouseProps, forwardedProps.touchProps, forwardedProps.styleProps, {
    href: true,
    lang: true,
    pointerEvents: true
  });
  var pickProps = props => (0, pick.default)(props, forwardPropsList);
  var Text = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
    var hrefAttrs = props.hrefAttrs,
      numberOfLines = props.numberOfLines,
      onClick = props.onClick,
      onLayout = props.onLayout,
      onPress = props.onPress,
      onMoveShouldSetResponder = props.onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture = props.onMoveShouldSetResponderCapture,
      onResponderEnd = props.onResponderEnd,
      onResponderGrant = props.onResponderGrant,
      onResponderMove = props.onResponderMove,
      onResponderReject = props.onResponderReject,
      onResponderRelease = props.onResponderRelease,
      onResponderStart = props.onResponderStart,
      onResponderTerminate = props.onResponderTerminate,
      onResponderTerminationRequest = props.onResponderTerminationRequest,
      onScrollShouldSetResponder = props.onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture = props.onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder = props.onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture = props.onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder = props.onStartShouldSetResponder,
      onStartShouldSetResponderCapture = props.onStartShouldSetResponderCapture,
      selectable = props.selectable,
      rest = (0, _objectWithoutPropertiesLoose.default)(props, _excluded);

    /*
    if (selectable != null) {
      warnOnce(
        'selectable',
        'selectable prop is deprecated. Use styles.userSelect.'
      );
    }
    */

    var hasTextAncestor = React.useContext(TextAncestorContext.default);
    var hostRef = React.useRef(null);
    var _useLocaleContext = (0, _modulesUseLocale.useLocaleContext)(),
      contextDirection = _useLocaleContext.direction;
    (0, useElementLayout.default)(hostRef, onLayout);
    (0, useResponderEvents.default)(hostRef, {
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture
    });
    var handleClick = React.useCallback(e => {
      if (onClick != null) {
        onClick(e);
      } else if (onPress != null) {
        e.stopPropagation();
        onPress(e);
      }
    }, [onClick, onPress]);
    var component = hasTextAncestor ? 'span' : 'div';
    var langDirection = props.lang != null ? (0, _modulesUseLocale.getLocaleDirection)(props.lang) : null;
    var componentDirection = props.dir || langDirection;
    var writingDirection = componentDirection || contextDirection;
    var supportedProps = pickProps(rest);
    supportedProps.dir = componentDirection;
    // 'auto' by default allows browsers to infer writing direction (root elements only)
    if (!hasTextAncestor) {
      supportedProps.dir = componentDirection != null ? componentDirection : 'auto';
    }
    if (onClick || onPress) {
      supportedProps.onClick = handleClick;
    }
    supportedProps.style = [numberOfLines != null && numberOfLines > 1 && {
      WebkitLineClamp: numberOfLines
    }, hasTextAncestor === true ? styles.textHasAncestor$raw : styles.text$raw, numberOfLines === 1 && styles.textOneLine, numberOfLines != null && numberOfLines > 1 && styles.textMultiLine, props.style, selectable === true && styles.selectable, selectable === false && styles.notSelectable, onPress && styles.pressable];
    if (props.href != null) {
      component = 'a';
      if (hrefAttrs != null) {
        var download = hrefAttrs.download,
          rel = hrefAttrs.rel,
          target = hrefAttrs.target;
        if (download != null) {
          supportedProps.download = download;
        }
        if (rel != null) {
          supportedProps.rel = rel;
        }
        if (typeof target === 'string') {
          supportedProps.target = target.charAt(0) !== '_' ? '_' + target : target;
        }
      }
    }
    var platformMethodsRef = (0, usePlatformMethods.default)(supportedProps);
    var setRef = (0, useMergeRefs.default)(hostRef, platformMethodsRef, forwardedRef);
    supportedProps.ref = setRef;
    var element = (0, createElement.default)(component, supportedProps, {
      writingDirection
    });
    return hasTextAncestor ? element : /*#__PURE__*/React.createElement(TextAncestorContext.default.Provider, {
      value: true
    }, element);
  });
  Text.displayName = 'Text';
  var textStyle = {
    backgroundColor: 'transparent',
    border: '0 solid black',
    boxSizing: 'border-box',
    color: 'black',
    display: 'inline',
    font: '14px System',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative',
    textAlign: 'start',
    textDecoration: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  };
  var styles = StyleSheet.default.create({
    text$raw: textStyle,
    textHasAncestor$raw: (0, _objectSpread.default)((0, _objectSpread.default)({}, textStyle), {}, {
      color: 'inherit',
      font: 'inherit',
      textAlign: 'inherit',
      whiteSpace: 'inherit'
    }),
    textOneLine: {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      wordWrap: 'normal'
    },
    // See #13
    textMultiLine: {
      display: '-webkit-box',
      maxWidth: '100%',
      overflow: 'clip',
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical'
    },
    notSelectable: {
      userSelect: 'none'
    },
    selectable: {
      userSelect: 'text'
    },
    pressable: {
      cursor: 'pointer'
    }
  });
  var _default = Text;
},95,[11,4,1,5,74,75,76,83,85,87,16,94,72]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Nicolas Gallagher.
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  'use client';
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _babelRuntimeHelpersObjectSpread = require(_dependencyMap[0]);
  var _objectSpread = _interopDefault(_babelRuntimeHelpersObjectSpread);
  var _babelRuntimeHelpersExtends = require(_dependencyMap[1]);
  var _extends = _interopDefault(_babelRuntimeHelpersExtends);
  var _babelRuntimeHelpersObjectWithoutPropertiesLoose = require(_dependencyMap[2]);
  var _objectWithoutPropertiesLoose = _interopDefault(_babelRuntimeHelpersObjectWithoutPropertiesLoose);
  var _Dimensions = require(_dependencyMap[3]);
  var Dimensions = _interopDefault(_Dimensions);
  var _modulesDismissKeyboard = require(_dependencyMap[4]);
  var dismissKeyboard = _interopDefault(_modulesDismissKeyboard);
  var _fbjsLibInvariant = require(_dependencyMap[5]);
  var invariant = _interopDefault(_fbjsLibInvariant);
  var _modulesMergeRefs = require(_dependencyMap[6]);
  var mergeRefs = _interopDefault(_modulesMergeRefs);
  require(_dependencyMap[7]);
  var _ScrollViewBase = require(_dependencyMap[8]);
  var ScrollViewBase = _interopDefault(_ScrollViewBase);
  var _StyleSheet = require(_dependencyMap[9]);
  var StyleSheet = _interopDefault(_StyleSheet);
  var _modulesTextInputState = require(_dependencyMap[10]);
  var TextInputState = _interopDefault(_modulesTextInputState);
  var _UIManager = require(_dependencyMap[11]);
  var UIManager = _interopDefault(_UIManager);
  var _View = require(_dependencyMap[12]);
  var View = _interopDefault(_View);
  var _react = require(_dependencyMap[13]);
  var React = _interopDefault(_react);
  var _fbjsLibWarning = require(_dependencyMap[14]);
  var warning = _interopDefault(_fbjsLibWarning);
  var _excluded = ["contentContainerStyle", "horizontal", "onContentSizeChange", "refreshControl", "stickyHeaderIndices", "pagingEnabled", "forwardedRef", "keyboardDismissMode", "onScroll", "centerContent"];
  var emptyObject = {};
  var IS_ANIMATING_TOUCH_START_THRESHOLD_MS = 16;
  class ScrollView extends React.default.Component {
    constructor() {
      super(...arguments);
      this._scrollNodeRef = null;
      this._innerViewRef = null;
      this.isTouching = false;
      this.lastMomentumScrollBeginTime = 0;
      this.lastMomentumScrollEndTime = 0;
      this.observedScrollSinceBecomingResponder = false;
      this.becameResponderWhileAnimating = false;
      this.scrollResponderHandleScrollShouldSetResponder = () => {
        return this.isTouching;
      };
      this.scrollResponderHandleStartShouldSetResponderCapture = e => {
        // First see if we want to eat taps while the keyboard is up
        // var currentlyFocusedTextInput = TextInputState.currentlyFocusedField();
        // if (!this.props.keyboardShouldPersistTaps &&
        //   currentlyFocusedTextInput != null &&
        //   e.target !== currentlyFocusedTextInput) {
        //   return true;
        // }
        return this.scrollResponderIsAnimating();
      };
      this.scrollResponderHandleTerminationRequest = () => {
        return !this.observedScrollSinceBecomingResponder;
      };
      this.scrollResponderHandleTouchEnd = e => {
        var nativeEvent = e.nativeEvent;
        this.isTouching = nativeEvent.touches.length !== 0;
        this.props.onTouchEnd && this.props.onTouchEnd(e);
      };
      this.scrollResponderHandleResponderRelease = e => {
        this.props.onResponderRelease && this.props.onResponderRelease(e);

        // By default scroll views will unfocus a textField
        // if another touch occurs outside of it
        var currentlyFocusedTextInput = TextInputState.default.currentlyFocusedField();
        if (!this.props.keyboardShouldPersistTaps && currentlyFocusedTextInput != null && e.target !== currentlyFocusedTextInput && !this.observedScrollSinceBecomingResponder && !this.becameResponderWhileAnimating) {
          this.props.onScrollResponderKeyboardDismissed && this.props.onScrollResponderKeyboardDismissed(e);
          TextInputState.default.blurTextInput(currentlyFocusedTextInput);
        }
      };
      this.scrollResponderHandleScroll = e => {
        this.observedScrollSinceBecomingResponder = true;
        this.props.onScroll && this.props.onScroll(e);
      };
      this.scrollResponderHandleResponderGrant = e => {
        this.observedScrollSinceBecomingResponder = false;
        this.props.onResponderGrant && this.props.onResponderGrant(e);
        this.becameResponderWhileAnimating = this.scrollResponderIsAnimating();
      };
      this.scrollResponderHandleScrollBeginDrag = e => {
        this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e);
      };
      this.scrollResponderHandleScrollEndDrag = e => {
        this.props.onScrollEndDrag && this.props.onScrollEndDrag(e);
      };
      this.scrollResponderHandleMomentumScrollBegin = e => {
        this.lastMomentumScrollBeginTime = Date.now();
        this.props.onMomentumScrollBegin && this.props.onMomentumScrollBegin(e);
      };
      this.scrollResponderHandleMomentumScrollEnd = e => {
        this.lastMomentumScrollEndTime = Date.now();
        this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e);
      };
      this.scrollResponderHandleTouchStart = e => {
        this.isTouching = true;
        this.props.onTouchStart && this.props.onTouchStart(e);
      };
      this.scrollResponderHandleTouchMove = e => {
        this.props.onTouchMove && this.props.onTouchMove(e);
      };
      this.scrollResponderIsAnimating = () => {
        var now = Date.now();
        var timeSinceLastMomentumScrollEnd = now - this.lastMomentumScrollEndTime;
        var isAnimating = timeSinceLastMomentumScrollEnd < IS_ANIMATING_TOUCH_START_THRESHOLD_MS || this.lastMomentumScrollEndTime < this.lastMomentumScrollBeginTime;
        return isAnimating;
      };
      this.scrollResponderScrollTo = (x, y, animated) => {
        if (typeof x === 'number') {
          console.warn('`scrollResponderScrollTo(x, y, animated)` is deprecated. Use `scrollResponderScrollTo({x: 5, y: 5, animated: true})` instead.');
        } else {
          var _ref = x || emptyObject;
          x = _ref.x;
          y = _ref.y;
          animated = _ref.animated;
        }
        var node = this.getScrollableNode();
        var left = x || 0;
        var top = y || 0;
        if (node != null) {
          if (typeof node.scroll === 'function') {
            node.scroll({
              top,
              left,
              behavior: !animated ? 'auto' : 'smooth'
            });
          } else {
            node.scrollLeft = left;
            node.scrollTop = top;
          }
        }
      };
      this.scrollResponderZoomTo = (rect, animated) => {
        {
          (0, invariant.default)('zoomToRect is not implemented');
        }
      };
      this.scrollResponderScrollNativeHandleToKeyboard = (nodeHandle, additionalOffset, preventNegativeScrollOffset) => {
        this.additionalScrollOffset = additionalOffset || 0;
        this.preventNegativeScrollOffset = !!preventNegativeScrollOffset;
        UIManager.default.measureLayout(nodeHandle, this.getInnerViewNode(), this.scrollResponderTextInputFocusError, this.scrollResponderInputMeasureAndScrollToKeyboard);
      };
      this.scrollResponderInputMeasureAndScrollToKeyboard = (left, top, width, height) => {
        var keyboardScreenY = Dimensions.default.get('window').height;
        if (this.keyboardWillOpenTo) {
          keyboardScreenY = this.keyboardWillOpenTo.endCoordinates.screenY;
        }
        var scrollOffsetY = top - keyboardScreenY + height + this.additionalScrollOffset;

        // By default, this can scroll with negative offset, pulling the content
        // down so that the target component's bottom meets the keyboard's top.
        // If requested otherwise, cap the offset at 0 minimum to avoid content
        // shifting down.
        if (this.preventNegativeScrollOffset) {
          scrollOffsetY = Math.max(0, scrollOffsetY);
        }
        this.scrollResponderScrollTo({
          x: 0,
          y: scrollOffsetY,
          animated: true
        });
        this.additionalOffset = 0;
        this.preventNegativeScrollOffset = false;
      };
      this.scrollResponderKeyboardWillShow = e => {
        this.keyboardWillOpenTo = e;
        this.props.onKeyboardWillShow && this.props.onKeyboardWillShow(e);
      };
      this.scrollResponderKeyboardWillHide = e => {
        this.keyboardWillOpenTo = null;
        this.props.onKeyboardWillHide && this.props.onKeyboardWillHide(e);
      };
      this.scrollResponderKeyboardDidShow = e => {
        // TODO(7693961): The event for DidShow is not available on iOS yet.
        // Use the one from WillShow and do not assign.
        if (e) {
          this.keyboardWillOpenTo = e;
        }
        this.props.onKeyboardDidShow && this.props.onKeyboardDidShow(e);
      };
      this.scrollResponderKeyboardDidHide = e => {
        this.keyboardWillOpenTo = null;
        this.props.onKeyboardDidHide && this.props.onKeyboardDidHide(e);
      };
      this.flashScrollIndicators = () => {
        this.scrollResponderFlashScrollIndicators();
      };
      this.getScrollResponder = () => {
        return this;
      };
      this.getScrollableNode = () => {
        return this._scrollNodeRef;
      };
      this.getInnerViewRef = () => {
        return this._innerViewRef;
      };
      this.getInnerViewNode = () => {
        return this._innerViewRef;
      };
      this.getNativeScrollRef = () => {
        return this._scrollNodeRef;
      };
      this.scrollTo = (y, x, animated) => {
        if (typeof y === 'number') {
          console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
        } else {
          var _ref2 = y || emptyObject;
          x = _ref2.x;
          y = _ref2.y;
          animated = _ref2.animated;
        }
        this.scrollResponderScrollTo({
          x: x || 0,
          y: y || 0,
          animated: animated !== false
        });
      };
      this.scrollToEnd = options => {
        // Default to true
        var animated = (options && options.animated) !== false;
        var horizontal = this.props.horizontal;
        var scrollResponderNode = this.getScrollableNode();
        var x = horizontal ? scrollResponderNode.scrollWidth : 0;
        var y = horizontal ? 0 : scrollResponderNode.scrollHeight;
        this.scrollResponderScrollTo({
          x,
          y,
          animated
        });
      };
      this._handleContentOnLayout = e => {
        var _e$nativeEvent$layout = e.nativeEvent.layout,
          width = _e$nativeEvent$layout.width,
          height = _e$nativeEvent$layout.height;
        this.props.onContentSizeChange(width, height);
      };
      this._handleScroll = e => {
        if (this.props.keyboardDismissMode === 'on-drag') {
          (0, dismissKeyboard.default)();
        }
        this.scrollResponderHandleScroll(e);
      };
      this._setInnerViewRef = node => {
        this._innerViewRef = node;
      };
      this._setScrollNodeRef = node => {
        this._scrollNodeRef = node;
        // ScrollView needs to add more methods to the hostNode in addition to those
        // added by `usePlatformMethods`. This is temporarily until an API like
        // `ScrollView.scrollTo(hostNode, { x, y })` is added to React Native.
        if (node != null) {
          node.getScrollResponder = this.getScrollResponder;
          node.getInnerViewNode = this.getInnerViewNode;
          node.getInnerViewRef = this.getInnerViewRef;
          node.getNativeScrollRef = this.getNativeScrollRef;
          node.getScrollableNode = this.getScrollableNode;
          node.scrollTo = this.scrollTo;
          node.scrollToEnd = this.scrollToEnd;
          node.flashScrollIndicators = this.flashScrollIndicators;
          node.scrollResponderZoomTo = this.scrollResponderZoomTo;
          node.scrollResponderScrollNativeHandleToKeyboard = this.scrollResponderScrollNativeHandleToKeyboard;
        }
        var ref = (0, mergeRefs.default)(this.props.forwardedRef);
        ref(node);
      };
    }
    /**
     * ------------------------------------------------------
     * START SCROLLRESPONDER
     * ------------------------------------------------------
     */
    // Reset to false every time becomes responder. This is used to:
    // - Determine if the scroll view has been scrolled and therefore should
    // refuse to give up its responder lock.
    // - Determine if releasing should dismiss the keyboard when we are in
    // tap-to-dismiss mode (!this.props.keyboardShouldPersistTaps).
    /**
     * Invoke this from an `onScroll` event.
     */
    /**
     * Merely touch starting is not sufficient for a scroll view to become the
     * responder. Being the "responder" means that the very next touch move/end
     * event will result in an action/movement.
     *
     * Invoke this from an `onStartShouldSetResponder` event.
     *
     * `onStartShouldSetResponder` is used when the next move/end will trigger
     * some UI movement/action, but when you want to yield priority to views
     * nested inside of the view.
     *
     * There may be some cases where scroll views actually should return `true`
     * from `onStartShouldSetResponder`: Any time we are detecting a standard tap
     * that gives priority to nested views.
     *
     * - If a single tap on the scroll view triggers an action such as
     *   recentering a map style view yet wants to give priority to interaction
     *   views inside (such as dropped pins or labels), then we would return true
     *   from this method when there is a single touch.
     *
     * - Similar to the previous case, if a two finger "tap" should trigger a
     *   zoom, we would check the `touches` count, and if `>= 2`, we would return
     *   true.
     *
     */
    scrollResponderHandleStartShouldSetResponder() {
      return false;
    }

    /**
     * There are times when the scroll view wants to become the responder
     * (meaning respond to the next immediate `touchStart/touchEnd`), in a way
     * that *doesn't* give priority to nested views (hence the capture phase):
     *
     * - Currently animating.
     * - Tapping anywhere that is not the focused input, while the keyboard is
     *   up (which should dismiss the keyboard).
     *
     * Invoke this from an `onStartShouldSetResponderCapture` event.
     */

    /**
     * Invoke this from an `onResponderReject` event.
     *
     * Some other element is not yielding its role as responder. Normally, we'd
     * just disable the `UIScrollView`, but a touch has already began on it, the
     * `UIScrollView` will not accept being disabled after that. The easiest
     * solution for now is to accept the limitation of disallowing this
     * altogether. To improve this, find a way to disable the `UIScrollView` after
     * a touch has already started.
     */
    scrollResponderHandleResponderReject() {
      (0, warning.default)(false, "ScrollView doesn't take rejection well - scrolls anyway");
    }

    /**
     * We will allow the scroll view to give up its lock iff it acquired the lock
     * during an animation. This is a very useful default that happens to satisfy
     * many common user experiences.
     *
     * - Stop a scroll on the left edge, then turn that into an outer view's
     *   backswipe.
     * - Stop a scroll mid-bounce at the top, continue pulling to have the outer
     *   view dismiss.
     * - However, without catching the scroll view mid-bounce (while it is
     *   motionless), if you drag far enough for the scroll view to become
     *   responder (and therefore drag the scroll view a bit), any backswipe
     *   navigation of a swipe gesture higher in the view hierarchy, should be
     *   rejected.
     */

    /**
     * Invoke this from an `onTouchEnd` event.
     *
     * @param {SyntheticEvent} e Event.
     */

    /**
     * Invoke this from an `onResponderRelease` event.
     */

    /**
     * Invoke this from an `onResponderGrant` event.
     */

    /**
     * Unfortunately, `onScrollBeginDrag` also fires when *stopping* the scroll
     * animation, and there's not an easy way to distinguish a drag vs. stopping
     * momentum.
     *
     * Invoke this from an `onScrollBeginDrag` event.
     */

    /**
     * Invoke this from an `onScrollEndDrag` event.
     */

    /**
     * Invoke this from an `onMomentumScrollBegin` event.
     */

    /**
     * Invoke this from an `onMomentumScrollEnd` event.
     */

    /**
     * Invoke this from an `onTouchStart` event.
     *
     * Since we know that the `SimpleEventPlugin` occurs later in the plugin
     * order, after `ResponderEventPlugin`, we can detect that we were *not*
     * permitted to be the responder (presumably because a contained view became
     * responder). The `onResponderReject` won't fire in that case - it only
     * fires when a *current* responder rejects our request.
     *
     * @param {SyntheticEvent} e Touch Start event.
     */

    /**
     * Invoke this from an `onTouchMove` event.
     *
     * Since we know that the `SimpleEventPlugin` occurs later in the plugin
     * order, after `ResponderEventPlugin`, we can detect that we were *not*
     * permitted to be the responder (presumably because a contained view became
     * responder). The `onResponderReject` won't fire in that case - it only
     * fires when a *current* responder rejects our request.
     *
     * @param {SyntheticEvent} e Touch Start event.
     */

    /**
     * A helper function for this class that lets us quickly determine if the
     * view is currently animating. This is particularly useful to know when
     * a touch has just started or ended.
     */

    /**
     * A helper function to scroll to a specific point in the scrollview.
     * This is currently used to help focus on child textviews, but can also
     * be used to quickly scroll to any element we want to focus. Syntax:
     *
     * scrollResponderScrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
     *
     * Note: The weird argument signature is due to the fact that, for historical reasons,
     * the function also accepts separate arguments as as alternative to the options object.
     * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
     */

    /**
     * A helper function to zoom to a specific rect in the scrollview. The argument has the shape
     * {x: number; y: number; width: number; height: number; animated: boolean = true}
     *
     * @platform ios
     */

    /**
     * Displays the scroll indicators momentarily.
     */
    scrollResponderFlashScrollIndicators() {}

    /**
     * This method should be used as the callback to onFocus in a TextInputs'
     * parent view. Note that any module using this mixin needs to return
     * the parent view's ref in getScrollViewRef() in order to use this method.
     * @param {any} nodeHandle The TextInput node handle
     * @param {number} additionalOffset The scroll view's top "contentInset".
     *        Default is 0.
     * @param {bool} preventNegativeScrolling Whether to allow pulling the content
     *        down to make it meet the keyboard's top. Default is false.
     */

    /**
     * The calculations performed here assume the scroll view takes up the entire
     * screen - even if has some content inset. We then measure the offsets of the
     * keyboard, and compensate both for the scroll view's "contentInset".
     *
     * @param {number} left Position of input w.r.t. table view.
     * @param {number} top Position of input w.r.t. table view.
     * @param {number} width Width of the text input.
     * @param {number} height Height of the text input.
     */

    scrollResponderTextInputFocusError(e) {
      console.error('Error measuring text field: ', e);
    }

    /**
     * Warning, this may be called several times for a single keyboard opening.
     * It's best to store the information in this method and then take any action
     * at a later point (either in `keyboardDidShow` or other).
     *
     * Here's the order that events occur in:
     * - focus
     * - willShow {startCoordinates, endCoordinates} several times
     * - didShow several times
     * - blur
     * - willHide {startCoordinates, endCoordinates} several times
     * - didHide several times
     *
     * The `ScrollResponder` providesModule callbacks for each of these events.
     * Even though any user could have easily listened to keyboard events
     * themselves, using these `props` callbacks ensures that ordering of events
     * is consistent - and not dependent on the order that the keyboard events are
     * subscribed to. This matters when telling the scroll view to scroll to where
     * the keyboard is headed - the scroll responder better have been notified of
     * the keyboard destination before being instructed to scroll to where the
     * keyboard will be. Stick to the `ScrollResponder` callbacks, and everything
     * will work.
     *
     * WARNING: These callbacks will fire even if a keyboard is displayed in a
     * different navigation pane. Filter out the events to determine if they are
     * relevant to you. (For example, only if you receive these callbacks after
     * you had explicitly focused a node etc).
     */

    /**
     * ------------------------------------------------------
     * END SCROLLRESPONDER
     * ------------------------------------------------------
     */

    /**
     * Returns a reference to the underlying scroll responder, which supports
     * operations like `scrollTo`. All ScrollView-like components should
     * implement this method so that they can be composed while providing access
     * to the underlying scroll responder's methods.
     */

    /**
     * Scrolls to a given x, y offset, either immediately or with a smooth animation.
     * Syntax:
     *
     * scrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
     *
     * Note: The weird argument signature is due to the fact that, for historical reasons,
     * the function also accepts separate arguments as as alternative to the options object.
     * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
     */

    /**
     * If this is a vertical ScrollView scrolls to the bottom.
     * If this is a horizontal ScrollView scrolls to the right.
     *
     * Use `scrollToEnd({ animated: true })` for smooth animated scrolling,
     * `scrollToEnd({ animated: false })` for immediate scrolling.
     * If no options are passed, `animated` defaults to true.
     */

    render() {
      var _this$props = this.props,
        contentContainerStyle = _this$props.contentContainerStyle,
        horizontal = _this$props.horizontal,
        onContentSizeChange = _this$props.onContentSizeChange,
        refreshControl = _this$props.refreshControl,
        stickyHeaderIndices = _this$props.stickyHeaderIndices,
        pagingEnabled = _this$props.pagingEnabled,
        forwardedRef = _this$props.forwardedRef,
        keyboardDismissMode = _this$props.keyboardDismissMode,
        onScroll = _this$props.onScroll,
        centerContent = _this$props.centerContent,
        other = (0, _objectWithoutPropertiesLoose.default)(_this$props, _excluded);
      var contentSizeChangeProps = {};
      if (onContentSizeChange) {
        contentSizeChangeProps = {
          onLayout: this._handleContentOnLayout
        };
      }
      var hasStickyHeaderIndices = !horizontal && Array.isArray(stickyHeaderIndices);
      var children = hasStickyHeaderIndices || pagingEnabled ? React.default.Children.map(this.props.children, (child, i) => {
        var isSticky = hasStickyHeaderIndices && stickyHeaderIndices.indexOf(i) > -1;
        if (child != null && (isSticky || pagingEnabled)) {
          return /*#__PURE__*/React.default.createElement(View.default, {
            style: [isSticky && styles.stickyHeader, pagingEnabled && styles.pagingEnabledChild]
          }, child);
        } else {
          return child;
        }
      }) : this.props.children;
      var contentContainer = /*#__PURE__*/React.default.createElement(View.default, (0, _extends.default)({}, contentSizeChangeProps, {
        children: children,
        collapsable: false,
        ref: this._setInnerViewRef,
        style: [horizontal && styles.contentContainerHorizontal, centerContent && styles.contentContainerCenterContent, contentContainerStyle]
      }));
      var baseStyle = horizontal ? styles.baseHorizontal : styles.baseVertical;
      var pagingEnabledStyle = horizontal ? styles.pagingEnabledHorizontal : styles.pagingEnabledVertical;
      var props = (0, _objectSpread.default)((0, _objectSpread.default)({}, other), {}, {
        style: [baseStyle, pagingEnabled && pagingEnabledStyle, this.props.style],
        onTouchStart: this.scrollResponderHandleTouchStart,
        onTouchMove: this.scrollResponderHandleTouchMove,
        onTouchEnd: this.scrollResponderHandleTouchEnd,
        onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
        onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
        onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
        onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
        onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
        onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
        onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
        onScroll: this._handleScroll,
        onResponderGrant: this.scrollResponderHandleResponderGrant,
        onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
        onResponderTerminate: this.scrollResponderHandleTerminate,
        onResponderRelease: this.scrollResponderHandleResponderRelease,
        onResponderReject: this.scrollResponderHandleResponderReject
      });
      var ScrollViewClass = ScrollViewBase.default;
      (0, invariant.default)(ScrollViewClass !== undefined, 'ScrollViewClass must not be undefined');
      var scrollView = /*#__PURE__*/React.default.createElement(ScrollViewClass, (0, _extends.default)({}, props, {
        ref: this._setScrollNodeRef
      }), contentContainer);
      if (refreshControl) {
        return /*#__PURE__*/React.default.cloneElement(refreshControl, {
          style: props.style
        }, scrollView);
      }
      return scrollView;
    }
  }
  var commonStyle = {
    flexGrow: 1,
    flexShrink: 1,
    // Enable hardware compositing in modern browsers.
    // Creates a new layer with its own backing surface that can significantly
    // improve scroll performance.
    transform: 'translateZ(0)',
    // iOS native scrolling
    WebkitOverflowScrolling: 'touch'
  };
  var styles = StyleSheet.default.create({
    baseVertical: (0, _objectSpread.default)((0, _objectSpread.default)({}, commonStyle), {}, {
      flexDirection: 'column',
      overflowX: 'hidden',
      overflowY: 'auto'
    }),
    baseHorizontal: (0, _objectSpread.default)((0, _objectSpread.default)({}, commonStyle), {}, {
      flexDirection: 'row',
      overflowX: 'auto',
      overflowY: 'hidden'
    }),
    contentContainerHorizontal: {
      flexDirection: 'row'
    },
    contentContainerCenterContent: {
      justifyContent: 'center',
      flexGrow: 1
    },
    stickyHeader: {
      position: 'sticky',
      top: 0,
      zIndex: 10
    },
    pagingEnabledHorizontal: {
      scrollSnapType: 'x mandatory'
    },
    pagingEnabledVertical: {
      scrollSnapType: 'y mandatory'
    },
    pagingEnabledChild: {
      scrollSnapAlign: 'start'
    }
  });
  var ForwardedScrollView = /*#__PURE__*/React.default.forwardRef((props, forwardedRef) => {
    return /*#__PURE__*/React.default.createElement(ScrollView, (0, _extends.default)({}, props, {
      forwardedRef: forwardedRef
    }));
  });
  ForwardedScrollView.displayName = 'ScrollView';
  var _default = ForwardedScrollView;
},96,[11,97,4,98,100,99,84,102,103,16,101,78,3,1,104]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _extends;
    }
  });
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }
},97,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Nicolas Gallagher.
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  'use client';
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return Dimensions;
    }
  });
  var _fbjsLibInvariant = require(_dependencyMap[0]);
  var invariant = _interopDefault(_fbjsLibInvariant);
  var _modulesCanUseDom = require(_dependencyMap[1]);
  var canUseDOM = _interopDefault(_modulesCanUseDom);
  var dimensions = {
    window: {
      fontScale: 1,
      height: 0,
      scale: 1,
      width: 0
    },
    screen: {
      fontScale: 1,
      height: 0,
      scale: 1,
      width: 0
    }
  };
  var listeners = {};
  var shouldInit = canUseDOM.default;
  function update() {
    if (!canUseDOM.default) {
      return;
    }
    var win = window;
    var height;
    var width;

    /**
     * iOS does not update viewport dimensions on keyboard open/close.
     * window.visualViewport(https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport)
     * is used instead of document.documentElement.clientHeight (which remains as a fallback)
     */
    if (win.visualViewport) {
      var visualViewport = win.visualViewport;
      /**
       * We are multiplying by scale because height and width from visual viewport
       * also react to pinch zoom, and become smaller when zoomed. But it is not desired
       * behaviour, since originally documentElement client height and width were used,
       * and they do not react to pinch zoom.
       */
      height = Math.round(visualViewport.height * visualViewport.scale);
      width = Math.round(visualViewport.width * visualViewport.scale);
    } else {
      var docEl = win.document.documentElement;
      height = docEl.clientHeight;
      width = docEl.clientWidth;
    }
    dimensions.window = {
      fontScale: 1,
      height,
      scale: win.devicePixelRatio || 1,
      width
    };
    dimensions.screen = {
      fontScale: 1,
      height: win.screen.height,
      scale: win.devicePixelRatio || 1,
      width: win.screen.width
    };
  }
  function handleResize() {
    update();
    if (Array.isArray(listeners['change'])) {
      listeners['change'].forEach(handler => handler(dimensions));
    }
  }
  class Dimensions {
    static get(dimension) {
      if (shouldInit) {
        shouldInit = false;
        update();
      }
      (0, invariant.default)(dimensions[dimension], "No dimension set for key " + dimension);
      return dimensions[dimension];
    }
    static set(initialDimensions) {
      if (initialDimensions) {
        if (canUseDOM.default) {
          (0, invariant.default)(false, 'Dimensions cannot be set in the browser');
        } else {
          if (initialDimensions.screen != null) {
            dimensions.screen = initialDimensions.screen;
          }
          if (initialDimensions.window != null) {
            dimensions.window = initialDimensions.window;
          }
        }
      }
    }
    static addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
      return {
        remove: () => {
          this.removeEventListener(type, handler);
        }
      };
    }
    static removeEventListener(type, handler) {
      if (Array.isArray(listeners[type])) {
        listeners[type] = listeners[type].filter(_handler => _handler !== handler);
      }
    }
  }
  if (canUseDOM.default) {
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize, false);
    } else {
      window.addEventListener('resize', handleResize, false);
    }
  }
},98,[99,25]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */
  'use strict';

  var validateFormat = function (format) {};
  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments to provide
   * information about what broke and what you were expecting.
   *
   * The invariant message will be stripped in production, but the invariant will
   * remain to ensure logic does not differ in production.
   */

  function invariant(condition, format) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    validateFormat(format);
    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      } else {
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function () {
          return String(args[argIndex++]);
        }));
        error.name = 'Invariant Violation';
      }
      error.framesToPop = 1; // Skip invariant's own stack frame.

      throw error;
    }
  }
  module.exports = invariant;
},99,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _TextInputState = require(_dependencyMap[0]);
  var TextInputState = _interopDefault(_TextInputState);
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var dismissKeyboard = () => {
    TextInputState.default.blurTextInput(TextInputState.default.currentlyFocusedField());
  };
  var _default = dismissKeyboard;
},100,[101]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _exportsUIManager = require(_dependencyMap[0]);
  var UIManager = _interopDefault(_exportsUIManager);
  /**
   * Copyright (c) Nicolas Gallagher.
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  /**
   * This class is responsible for coordinating the "focused"
   * state for TextInputs. All calls relating to the keyboard
   * should be funneled through here
   */
  var TextInputState = {
    /**
     * Internal state
     */
    _currentlyFocusedNode: null,
    /**
     * Returns the ID of the currently focused text field, if one exists
     * If no text field is focused it returns null
     */
    currentlyFocusedField() {
      if (document.activeElement !== this._currentlyFocusedNode) {
        this._currentlyFocusedNode = null;
      }
      return this._currentlyFocusedNode;
    },
    /**
     * @param {Object} TextInputID id of the text field to focus
     * Focuses the specified text field
     * noop if the text field was already focused
     */
    focusTextInput(textFieldNode) {
      if (textFieldNode !== null) {
        this._currentlyFocusedNode = textFieldNode;
        if (document.activeElement !== textFieldNode) {
          UIManager.default.focus(textFieldNode);
        }
      }
    },
    /**
     * @param {Object} textFieldNode id of the text field to focus
     * Unfocuses the specified text field
     * noop if it wasn't focused
     */
    blurTextInput(textFieldNode) {
      if (textFieldNode !== null) {
        this._currentlyFocusedNode = null;
        if (document.activeElement === textFieldNode) {
          UIManager.default.blur(textFieldNode);
        }
      }
    }
  };
  var _default = TextInputState;
},101,[78]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher.
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var Platform = {
    OS: 'web',
    select: obj => 'web' in obj ? obj.web : obj.default,
    get isTesting() {
      return false;
    },
    get Version() {
      return '0.0.0';
    }
  };
  var _default = Platform;
},102,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _babelRuntimeHelpersExtends = require(_dependencyMap[0]);
  var _extends = _interopDefault(_babelRuntimeHelpersExtends);
  var _babelRuntimeHelpersObjectWithoutPropertiesLoose = require(_dependencyMap[1]);
  var _objectWithoutPropertiesLoose = _interopDefault(_babelRuntimeHelpersObjectWithoutPropertiesLoose);
  var _react = require(_dependencyMap[2]);
  var React = _interopNamespace(_react);
  var _StyleSheet = require(_dependencyMap[3]);
  var StyleSheet = _interopDefault(_StyleSheet);
  var _View = require(_dependencyMap[4]);
  var View = _interopDefault(_View);
  var _modulesUseMergeRefs = require(_dependencyMap[5]);
  var useMergeRefs = _interopDefault(_modulesUseMergeRefs);
  var _excluded = ["onScroll", "onTouchMove", "onWheel", "scrollEnabled", "scrollEventThrottle", "showsHorizontalScrollIndicator", "showsVerticalScrollIndicator", "style"];
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  function normalizeScrollEvent(e) {
    return {
      nativeEvent: {
        contentOffset: {
          get x() {
            return e.target.scrollLeft;
          },
          get y() {
            return e.target.scrollTop;
          }
        },
        contentSize: {
          get height() {
            return e.target.scrollHeight;
          },
          get width() {
            return e.target.scrollWidth;
          }
        },
        layoutMeasurement: {
          get height() {
            return e.target.offsetHeight;
          },
          get width() {
            return e.target.offsetWidth;
          }
        }
      },
      timeStamp: Date.now()
    };
  }
  function shouldEmitScrollEvent(lastTick, eventThrottle) {
    var timeSinceLastTick = Date.now() - lastTick;
    return eventThrottle > 0 && timeSinceLastTick >= eventThrottle;
  }

  /**
   * Encapsulates the Web-specific scroll throttling and disabling logic
   */
  var ScrollViewBase = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
    var onScroll = props.onScroll,
      onTouchMove = props.onTouchMove,
      onWheel = props.onWheel,
      _props$scrollEnabled = props.scrollEnabled,
      scrollEnabled = _props$scrollEnabled === undefined ? true : _props$scrollEnabled,
      _props$scrollEventThr = props.scrollEventThrottle,
      scrollEventThrottle = _props$scrollEventThr === undefined ? 0 : _props$scrollEventThr,
      showsHorizontalScrollIndicator = props.showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator = props.showsVerticalScrollIndicator,
      style = props.style,
      rest = (0, _objectWithoutPropertiesLoose.default)(props, _excluded);
    var scrollState = React.useRef({
      isScrolling: false,
      scrollLastTick: 0
    });
    var scrollTimeout = React.useRef(null);
    var scrollRef = React.useRef(null);
    function createPreventableScrollHandler(handler) {
      return e => {
        if (scrollEnabled) {
          if (handler) {
            handler(e);
          }
        }
      };
    }
    function handleScroll(e) {
      e.stopPropagation();
      if (e.target === scrollRef.current) {
        e.persist();
        // A scroll happened, so the scroll resets the scrollend timeout.
        if (scrollTimeout.current != null) {
          clearTimeout(scrollTimeout.current);
        }
        scrollTimeout.current = setTimeout(() => {
          handleScrollEnd(e);
        }, 100);
        if (scrollState.current.isScrolling) {
          // Scroll last tick may have changed, check if we need to notify
          if (shouldEmitScrollEvent(scrollState.current.scrollLastTick, scrollEventThrottle)) {
            handleScrollTick(e);
          }
        } else {
          // Weren't scrolling, so we must have just started
          handleScrollStart(e);
        }
      }
    }
    function handleScrollStart(e) {
      scrollState.current.isScrolling = true;
      handleScrollTick(e);
    }
    function handleScrollTick(e) {
      scrollState.current.scrollLastTick = Date.now();
      if (onScroll) {
        onScroll(normalizeScrollEvent(e));
      }
    }
    function handleScrollEnd(e) {
      scrollState.current.isScrolling = false;
      if (onScroll) {
        onScroll(normalizeScrollEvent(e));
      }
    }
    var hideScrollbar = showsHorizontalScrollIndicator === false || showsVerticalScrollIndicator === false;
    return /*#__PURE__*/React.createElement(View.default, (0, _extends.default)({}, rest, {
      onScroll: handleScroll,
      onTouchMove: createPreventableScrollHandler(onTouchMove),
      onWheel: createPreventableScrollHandler(onWheel),
      ref: (0, useMergeRefs.default)(scrollRef, forwardedRef),
      style: [style, !scrollEnabled && styles.scrollDisabled, hideScrollbar && styles.hideScrollbar]
    }));
  });

  // Chrome doesn't support e.preventDefault in this case; touch-action must be
  // used to disable scrolling.
  // https://developers.google.com/web/updates/2017/01/scrolling-intervention
  var styles = StyleSheet.default.create({
    scrollDisabled: {
      overflowX: 'hidden',
      overflowY: 'hidden',
      touchAction: 'none'
    },
    hideScrollbar: {
      scrollbarWidth: 'none'
    }
  });
  var _default = ScrollViewBase;
},103,[97,4,1,16,3,83]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */
  'use strict';

  var emptyFunction = require(_dependencyMap[0]);
  /**
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var warning = emptyFunction;
  module.exports = warning;
},104,[105]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */
  function makeEmptyFunction(arg) {
    return function () {
      return arg;
    };
  }
  /**
   * This function accepts and discards inputs; it has no side effects. This is
   * primarily useful idiomatically for overridable function endpoints which
   * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
   */

  var emptyFunction = function emptyFunction() {};
  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function () {
    return this;
  };
  emptyFunction.thatReturnsArgument = function (arg) {
    return arg;
  };
  module.exports = emptyFunction;
},105,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   * @format
   */

  'use client';
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _babelRuntimeHelpersExtends = require(_dependencyMap[0]);
  var _extends = _interopDefault(_babelRuntimeHelpersExtends);
  var _babelRuntimeHelpersObjectWithoutPropertiesLoose = require(_dependencyMap[1]);
  var _objectWithoutPropertiesLoose = _interopDefault(_babelRuntimeHelpersObjectWithoutPropertiesLoose);
  var _react = require(_dependencyMap[2]);
  var React = _interopNamespace(_react);
  var _modulesUseMergeRefs = require(_dependencyMap[3]);
  var useMergeRefs = _interopDefault(_modulesUseMergeRefs);
  var _modulesUsePressEvents = require(_dependencyMap[4]);
  var usePressEvents = _interopDefault(_modulesUsePressEvents);
  var _StyleSheet = require(_dependencyMap[5]);
  var StyleSheet = _interopDefault(_StyleSheet);
  var _View = require(_dependencyMap[6]);
  var View = _interopDefault(_View);
  var _excluded = ["activeOpacity", "delayPressIn", "delayPressOut", "delayLongPress", "disabled", "focusable", "onLongPress", "onPress", "onPressIn", "onPressOut", "rejectResponderTermination", "style"];
  //import { warnOnce } from '../../modules/warnOnce';

  /**
   * A wrapper for making views respond properly to touches.
   * On press down, the opacity of the wrapped view is decreased, dimming it.
   */
  function TouchableOpacity(props, forwardedRef) {
    /*
    warnOnce(
      'TouchableOpacity',
      'TouchableOpacity is deprecated. Please use Pressable.'
    );
    */

    var activeOpacity = props.activeOpacity,
      delayPressIn = props.delayPressIn,
      delayPressOut = props.delayPressOut,
      delayLongPress = props.delayLongPress,
      disabled = props.disabled,
      focusable = props.focusable,
      onLongPress = props.onLongPress,
      onPress = props.onPress,
      onPressIn = props.onPressIn,
      onPressOut = props.onPressOut,
      rejectResponderTermination = props.rejectResponderTermination,
      style = props.style,
      rest = (0, _objectWithoutPropertiesLoose.default)(props, _excluded);
    var hostRef = (0, _react.useRef)(null);
    var setRef = (0, useMergeRefs.default)(forwardedRef, hostRef);
    var _useState = (0, _react.useState)('0s'),
      duration = _useState[0],
      setDuration = _useState[1];
    var _useState2 = (0, _react.useState)(null),
      opacityOverride = _useState2[0],
      setOpacityOverride = _useState2[1];
    var setOpacityTo = (0, _react.useCallback)((value, duration) => {
      setOpacityOverride(value);
      setDuration(duration ? duration / 1000 + "s" : '0s');
    }, [setOpacityOverride, setDuration]);
    var setOpacityActive = (0, _react.useCallback)(duration => {
      setOpacityTo(activeOpacity !== null && activeOpacity !== undefined ? activeOpacity : 0.2, duration);
    }, [activeOpacity, setOpacityTo]);
    var setOpacityInactive = (0, _react.useCallback)(duration => {
      setOpacityTo(null, duration);
    }, [setOpacityTo]);
    var pressConfig = (0, _react.useMemo)(() => ({
      cancelable: !rejectResponderTermination,
      disabled,
      delayLongPress,
      delayPressStart: delayPressIn,
      delayPressEnd: delayPressOut,
      onLongPress,
      onPress,
      onPressStart(event) {
        var isGrant = event.dispatchConfig != null ? event.dispatchConfig.registrationName === 'onResponderGrant' : event.type === 'keydown';
        setOpacityActive(isGrant ? 0 : 150);
        if (onPressIn != null) {
          onPressIn(event);
        }
      },
      onPressEnd(event) {
        setOpacityInactive(250);
        if (onPressOut != null) {
          onPressOut(event);
        }
      }
    }), [delayLongPress, delayPressIn, delayPressOut, disabled, onLongPress, onPress, onPressIn, onPressOut, rejectResponderTermination, setOpacityActive, setOpacityInactive]);
    var pressEventHandlers = (0, usePressEvents.default)(hostRef, pressConfig);
    return /*#__PURE__*/React.createElement(View.default, (0, _extends.default)({}, rest, pressEventHandlers, {
      accessibilityDisabled: disabled,
      focusable: !disabled && focusable !== false,
      pointerEvents: disabled ? 'box-none' : undefined,
      ref: setRef,
      style: [styles.root, !disabled && styles.actionable, style, opacityOverride != null && {
        opacity: opacityOverride
      }, {
        transitionDuration: duration
      }]
    }));
  }
  var styles = StyleSheet.default.create({
    root: {
      transitionProperty: 'opacity',
      transitionDuration: '0.15s',
      userSelect: 'none'
    },
    actionable: {
      cursor: 'pointer',
      touchAction: 'manipulation'
    }
  });
  var MemoedTouchableOpacity = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(TouchableOpacity));
  MemoedTouchableOpacity.displayName = 'TouchableOpacity';
  var _default = MemoedTouchableOpacity;
},106,[97,4,1,83,107,16,3]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   * @format
   */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return usePressEvents;
    }
  });
  var _PressResponder = require(_dependencyMap[0]);
  var PressResponder = _interopDefault(_PressResponder);
  var _react = require(_dependencyMap[1]);
  function usePressEvents(hostRef, config) {
    var pressResponderRef = (0, _react.useRef)(null);
    if (pressResponderRef.current == null) {
      pressResponderRef.current = new PressResponder.default(config);
    }
    var pressResponder = pressResponderRef.current;

    // Re-configure to use the current node and configuration.
    (0, _react.useEffect)(() => {
      pressResponder.configure(config);
    }, [config, pressResponder]);

    // Reset the `pressResponder` when cleanup needs to occur. This is
    // a separate effect because we do not want to rest the responder when `config` changes.
    (0, _react.useEffect)(() => {
      return () => {
        pressResponder.reset();
      };
    }, [pressResponder]);
    (0, _react.useDebugValue)(config);
    return pressResponder.getEventHandlers();
  }
},107,[108,1]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   * @format
   */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return PressResponder;
    }
  });
  var DELAY = 'DELAY';
  var ERROR = 'ERROR';
  var LONG_PRESS_DETECTED = 'LONG_PRESS_DETECTED';
  var NOT_RESPONDER = 'NOT_RESPONDER';
  var RESPONDER_ACTIVE_LONG_PRESS_START = 'RESPONDER_ACTIVE_LONG_PRESS_START';
  var RESPONDER_ACTIVE_PRESS_START = 'RESPONDER_ACTIVE_PRESS_START';
  var RESPONDER_INACTIVE_PRESS_START = 'RESPONDER_INACTIVE_PRESS_START';
  var RESPONDER_GRANT = 'RESPONDER_GRANT';
  var RESPONDER_RELEASE = 'RESPONDER_RELEASE';
  var RESPONDER_TERMINATED = 'RESPONDER_TERMINATED';
  var Transitions = Object.freeze({
    NOT_RESPONDER: {
      DELAY: ERROR,
      RESPONDER_GRANT: RESPONDER_INACTIVE_PRESS_START,
      RESPONDER_RELEASE: ERROR,
      RESPONDER_TERMINATED: ERROR,
      LONG_PRESS_DETECTED: ERROR
    },
    RESPONDER_INACTIVE_PRESS_START: {
      DELAY: RESPONDER_ACTIVE_PRESS_START,
      RESPONDER_GRANT: ERROR,
      RESPONDER_RELEASE: NOT_RESPONDER,
      RESPONDER_TERMINATED: NOT_RESPONDER,
      LONG_PRESS_DETECTED: ERROR
    },
    RESPONDER_ACTIVE_PRESS_START: {
      DELAY: ERROR,
      RESPONDER_GRANT: ERROR,
      RESPONDER_RELEASE: NOT_RESPONDER,
      RESPONDER_TERMINATED: NOT_RESPONDER,
      LONG_PRESS_DETECTED: RESPONDER_ACTIVE_LONG_PRESS_START
    },
    RESPONDER_ACTIVE_LONG_PRESS_START: {
      DELAY: ERROR,
      RESPONDER_GRANT: ERROR,
      RESPONDER_RELEASE: NOT_RESPONDER,
      RESPONDER_TERMINATED: NOT_RESPONDER,
      LONG_PRESS_DETECTED: RESPONDER_ACTIVE_LONG_PRESS_START
    },
    ERROR: {
      DELAY: NOT_RESPONDER,
      RESPONDER_GRANT: RESPONDER_INACTIVE_PRESS_START,
      RESPONDER_RELEASE: NOT_RESPONDER,
      RESPONDER_TERMINATED: NOT_RESPONDER,
      LONG_PRESS_DETECTED: NOT_RESPONDER
    }
  });
  var getElementRole = element => element.getAttribute('role');
  var getElementType = element => element.tagName.toLowerCase();
  var isActiveSignal = signal => signal === RESPONDER_ACTIVE_PRESS_START || signal === RESPONDER_ACTIVE_LONG_PRESS_START;
  var isButtonRole = element => getElementRole(element) === 'button';
  var isPressStartSignal = signal => signal === RESPONDER_INACTIVE_PRESS_START || signal === RESPONDER_ACTIVE_PRESS_START || signal === RESPONDER_ACTIVE_LONG_PRESS_START;
  var isTerminalSignal = signal => signal === RESPONDER_TERMINATED || signal === RESPONDER_RELEASE;
  var isValidKeyPress = event => {
    var key = event.key,
      target = event.target;
    var isSpacebar = key === ' ' || key === 'Spacebar';
    var isButtonish = getElementType(target) === 'button' || isButtonRole(target);
    return key === 'Enter' || isSpacebar && isButtonish;
  };
  var DEFAULT_LONG_PRESS_DELAY_MS = 450; // 500 - 50
  var DEFAULT_PRESS_DELAY_MS = 50;

  /**
   * =========================== PressResponder Tutorial ===========================
   *
   * The `PressResponder` class helps you create press interactions by analyzing the
   * geometry of elements and observing when another responder (e.g. ScrollView)
   * has stolen the touch lock. It offers hooks for your component to provide
   * interaction feedback to the user:
   *
   * - When a press has activated (e.g. highlight an element)
   * - When a press has deactivated (e.g. un-highlight an element)
   * - When a press sould trigger an action, meaning it activated and deactivated
   *   while within the geometry of the element without the lock being stolen.
   *
   * A high quality interaction isn't as simple as you might think. There should
   * be a slight delay before activation. Moving your finger beyond an element's
   * bounds should trigger deactivation, but moving the same finger back within an
   * element's bounds should trigger reactivation.
   *
   * In order to use `PressResponder`, do the following:
   *
   *     const pressResponder = new PressResponder(config);
   *
   * 2. Choose the rendered component who should collect the press events. On that
   *    element, spread `pressability.getEventHandlers()` into its props.
   *
   *    return (
   *      <View {...this.state.pressResponder.getEventHandlers()} />
   *    );
   *
   * 3. Reset `PressResponder` when your component unmounts.
   *
   *    componentWillUnmount() {
   *      this.state.pressResponder.reset();
   *    }
   *
   * ==================== Implementation Details ====================
   *
   * `PressResponder` only assumes that there exists a `HitRect` node. The `PressRect`
   * is an abstract box that is extended beyond the `HitRect`.
   *
   * # Geometry
   *
   *  ┌────────────────────────┐
   *  │  ┌──────────────────┐  │ - Presses start anywhere within `HitRect`.
   *  │  │  ┌────────────┐  │  │
   *  │  │  │ VisualRect │  │  │
   *  │  │  └────────────┘  │  │ - When pressed down for sufficient amount of time
   *  │  │    HitRect       │  │   before letting up, `VisualRect` activates.
   *  │  └──────────────────┘  │
   *  │       Out Region   o   │
   *  └────────────────────│───┘
   *                       └────── When the press is released outside the `HitRect`,
   *                               the responder is NOT eligible for a "press".
   *
   * # State Machine
   *
   * ┌───────────────┐ ◀──── RESPONDER_RELEASE
   * │ NOT_RESPONDER │
   * └───┬───────────┘ ◀──── RESPONDER_TERMINATED
   *     │
   *     │ RESPONDER_GRANT (HitRect)
   *     │
   *     ▼
   * ┌─────────────────────┐          ┌───────────────────┐              ┌───────────────────┐
   * │ RESPONDER_INACTIVE_ │  DELAY   │ RESPONDER_ACTIVE_ │  T + DELAY   │ RESPONDER_ACTIVE_ │
   * │ PRESS_START         ├────────▶ │ PRESS_START       ├────────────▶ │ LONG_PRESS_START  │
   * └─────────────────────┘          └───────────────────┘              └───────────────────┘
   *
   * T + DELAY => LONG_PRESS_DELAY + DELAY
   *
   * Not drawn are the side effects of each transition. The most important side
   * effect is the invocation of `onLongPress`. Only when the browser produces a
   * `click` event is `onPress` invoked.
   */
  class PressResponder {
    constructor(config) {
      this._eventHandlers = null;
      this._isPointerTouch = false;
      this._longPressDelayTimeout = null;
      this._longPressDispatched = false;
      this._pressDelayTimeout = null;
      this._pressOutDelayTimeout = null;
      this._touchState = NOT_RESPONDER;
      this._responderElement = null;
      this.configure(config);
    }
    configure(config) {
      this._config = config;
    }

    /**
     * Resets any pending timers. This should be called on unmount.
     */
    reset() {
      this._cancelLongPressDelayTimeout();
      this._cancelPressDelayTimeout();
      this._cancelPressOutDelayTimeout();
    }

    /**
     * Returns a set of props to spread into the interactive element.
     */
    getEventHandlers() {
      if (this._eventHandlers == null) {
        this._eventHandlers = this._createEventHandlers();
      }
      return this._eventHandlers;
    }
    _createEventHandlers() {
      var start = (event, shouldDelay) => {
        event.persist();
        this._cancelPressOutDelayTimeout();
        this._longPressDispatched = false;
        this._selectionTerminated = false;
        this._touchState = NOT_RESPONDER;
        this._isPointerTouch = event.nativeEvent.type === 'touchstart';
        this._receiveSignal(RESPONDER_GRANT, event);
        var delayPressStart = normalizeDelay(this._config.delayPressStart, 0, DEFAULT_PRESS_DELAY_MS);
        if (shouldDelay !== false && delayPressStart > 0) {
          this._pressDelayTimeout = setTimeout(() => {
            this._receiveSignal(DELAY, event);
          }, delayPressStart);
        } else {
          this._receiveSignal(DELAY, event);
        }
        var delayLongPress = normalizeDelay(this._config.delayLongPress, 10, DEFAULT_LONG_PRESS_DELAY_MS);
        this._longPressDelayTimeout = setTimeout(() => {
          this._handleLongPress(event);
        }, delayLongPress + delayPressStart);
      };
      var end = event => {
        this._receiveSignal(RESPONDER_RELEASE, event);
      };
      var keyupHandler = event => {
        var onPress = this._config.onPress;
        var target = event.target;
        if (this._touchState !== NOT_RESPONDER && isValidKeyPress(event)) {
          end(event);
          document.removeEventListener('keyup', keyupHandler);
          var role = target.getAttribute('role');
          var elementType = getElementType(target);
          var isNativeInteractiveElement = role === 'link' || elementType === 'a' || elementType === 'button' || elementType === 'input' || elementType === 'select' || elementType === 'textarea';
          var isActiveElement = this._responderElement === target;
          if (onPress != null && !isNativeInteractiveElement && isActiveElement) {
            onPress(event);
          }
          this._responderElement = null;
        }
      };
      return {
        onStartShouldSetResponder: event => {
          var disabled = this._config.disabled;
          if (disabled && isButtonRole(event.currentTarget)) {
            event.stopPropagation();
          }
          if (disabled == null) {
            return true;
          }
          return !disabled;
        },
        onKeyDown: event => {
          var disabled = this._config.disabled;
          var key = event.key,
            target = event.target;
          if (!disabled && isValidKeyPress(event)) {
            if (this._touchState === NOT_RESPONDER) {
              start(event, false);
              this._responderElement = target;
              // Listen to 'keyup' on document to account for situations where
              // focus is moved to another element during 'keydown'.
              document.addEventListener('keyup', keyupHandler);
            }
            var isSpacebarKey = key === ' ' || key === 'Spacebar';
            var role = getElementRole(target);
            var isButtonLikeRole = role === 'button' || role === 'menuitem';
            if (isSpacebarKey && isButtonLikeRole && getElementType(target) !== 'button') {
              // Prevent spacebar scrolling the window if using non-native button
              event.preventDefault();
            }
            event.stopPropagation();
          }
        },
        onResponderGrant: event => start(event),
        onResponderMove: event => {
          if (this._config.onPressMove != null) {
            this._config.onPressMove(event);
          }
          var touch = getTouchFromResponderEvent(event);
          if (this._touchActivatePosition != null) {
            var deltaX = this._touchActivatePosition.pageX - touch.pageX;
            var deltaY = this._touchActivatePosition.pageY - touch.pageY;
            if (Math.hypot(deltaX, deltaY) > 10) {
              this._cancelLongPressDelayTimeout();
            }
          }
        },
        onResponderRelease: event => end(event),
        onResponderTerminate: event => {
          if (event.nativeEvent.type === 'selectionchange') {
            this._selectionTerminated = true;
          }
          this._receiveSignal(RESPONDER_TERMINATED, event);
        },
        onResponderTerminationRequest: event => {
          var _this$_config = this._config,
            cancelable = _this$_config.cancelable,
            disabled = _this$_config.disabled,
            onLongPress = _this$_config.onLongPress;
          // If `onLongPress` is provided, don't terminate on `contextmenu` as default
          // behavior will be prevented for non-mouse pointers.
          if (!disabled && onLongPress != null && this._isPointerTouch && event.nativeEvent.type === 'contextmenu') {
            return false;
          }
          if (cancelable == null) {
            return true;
          }
          return cancelable;
        },
        // NOTE: this diverges from react-native in 3 significant ways:
        // * The `onPress` callback is not connected to the responder system (the native
        //  `click` event must be used but is dispatched in many scenarios where no pointers
        //   are on the screen.) Therefore, it's possible for `onPress` to be called without
        //   `onPress{Start,End}` being called first.
        // * The `onPress` callback is only be called on the first ancestor of the native
        //   `click` target that is using the PressResponder.
        // * The event's `nativeEvent` is a `MouseEvent` not a `TouchEvent`.
        onClick: event => {
          var _this$_config2 = this._config,
            disabled = _this$_config2.disabled,
            onPress = _this$_config2.onPress;
          if (!disabled) {
            // If long press dispatched, cancel default click behavior.
            // If the responder terminated because text was selected during the gesture,
            // cancel the default click behavior.
            event.stopPropagation();
            if (this._longPressDispatched || this._selectionTerminated) {
              event.preventDefault();
            } else if (onPress != null && event.altKey === false) {
              onPress(event);
            }
          } else {
            if (isButtonRole(event.currentTarget)) {
              event.stopPropagation();
            }
          }
        },
        // If `onLongPress` is provided and a touch pointer is being used, prevent the
        // default context menu from opening.
        onContextMenu: event => {
          var _this$_config3 = this._config,
            disabled = _this$_config3.disabled,
            onLongPress = _this$_config3.onLongPress;
          if (!disabled) {
            if (onLongPress != null && this._isPointerTouch && !event.defaultPrevented) {
              event.preventDefault();
              event.stopPropagation();
            }
          } else {
            if (isButtonRole(event.currentTarget)) {
              event.stopPropagation();
            }
          }
        }
      };
    }

    /**
     * Receives a state machine signal, performs side effects of the transition
     * and stores the new state. Validates the transition as well.
     */
    _receiveSignal(signal, event) {
      var prevState = this._touchState;
      var nextState = null;
      if (Transitions[prevState] != null) {
        nextState = Transitions[prevState][signal];
      }
      if (this._touchState === NOT_RESPONDER && signal === RESPONDER_RELEASE) {
        return;
      }
      if (nextState == null || nextState === ERROR) {
        console.error("PressResponder: Invalid signal " + signal + " for state " + prevState + " on responder");
      } else if (prevState !== nextState) {
        this._performTransitionSideEffects(prevState, nextState, signal, event);
        this._touchState = nextState;
      }
    }

    /**
     * Performs a transition between touchable states and identify any activations
     * or deactivations (and callback invocations).
     */
    _performTransitionSideEffects(prevState, nextState, signal, event) {
      if (isTerminalSignal(signal)) {
        // Pressable suppression of contextmenu on windows.
        // On Windows, the contextmenu is displayed after pointerup.
        // https://github.com/necolas/react-native-web/issues/2296
        setTimeout(() => {
          this._isPointerTouch = false;
        }, 0);
        this._touchActivatePosition = null;
        this._cancelLongPressDelayTimeout();
      }
      if (isPressStartSignal(prevState) && signal === LONG_PRESS_DETECTED) {
        var onLongPress = this._config.onLongPress;
        // Long press is not supported for keyboards because 'click' can be dispatched
        // immediately (and multiple times) after 'keydown'.
        if (onLongPress != null && event.nativeEvent.key == null) {
          onLongPress(event);
          this._longPressDispatched = true;
        }
      }
      var isPrevActive = isActiveSignal(prevState);
      var isNextActive = isActiveSignal(nextState);
      if (!isPrevActive && isNextActive) {
        this._activate(event);
      } else if (isPrevActive && !isNextActive) {
        this._deactivate(event);
      }
      if (isPressStartSignal(prevState) && signal === RESPONDER_RELEASE) {
        var _this$_config4 = this._config,
          _onLongPress = _this$_config4.onLongPress,
          onPress = _this$_config4.onPress;
        if (onPress != null) {
          var isPressCanceledByLongPress = _onLongPress != null && prevState === RESPONDER_ACTIVE_LONG_PRESS_START;
          if (!isPressCanceledByLongPress) {
            // If we never activated (due to delays), activate and deactivate now.
            if (!isNextActive && !isPrevActive) {
              this._activate(event);
              this._deactivate(event);
            }
          }
        }
      }
      this._cancelPressDelayTimeout();
    }
    _activate(event) {
      var _this$_config5 = this._config,
        onPressChange = _this$_config5.onPressChange,
        onPressStart = _this$_config5.onPressStart;
      var touch = getTouchFromResponderEvent(event);
      this._touchActivatePosition = {
        pageX: touch.pageX,
        pageY: touch.pageY
      };
      if (onPressStart != null) {
        onPressStart(event);
      }
      if (onPressChange != null) {
        onPressChange(true);
      }
    }
    _deactivate(event) {
      var _this$_config6 = this._config,
        onPressChange = _this$_config6.onPressChange,
        onPressEnd = _this$_config6.onPressEnd;
      function end() {
        if (onPressEnd != null) {
          onPressEnd(event);
        }
        if (onPressChange != null) {
          onPressChange(false);
        }
      }
      var delayPressEnd = normalizeDelay(this._config.delayPressEnd);
      if (delayPressEnd > 0) {
        this._pressOutDelayTimeout = setTimeout(() => {
          end();
        }, delayPressEnd);
      } else {
        end();
      }
    }
    _handleLongPress(event) {
      if (this._touchState === RESPONDER_ACTIVE_PRESS_START || this._touchState === RESPONDER_ACTIVE_LONG_PRESS_START) {
        this._receiveSignal(LONG_PRESS_DETECTED, event);
      }
    }
    _cancelLongPressDelayTimeout() {
      if (this._longPressDelayTimeout != null) {
        clearTimeout(this._longPressDelayTimeout);
        this._longPressDelayTimeout = null;
      }
    }
    _cancelPressDelayTimeout() {
      if (this._pressDelayTimeout != null) {
        clearTimeout(this._pressDelayTimeout);
        this._pressDelayTimeout = null;
      }
    }
    _cancelPressOutDelayTimeout() {
      if (this._pressOutDelayTimeout != null) {
        clearTimeout(this._pressOutDelayTimeout);
        this._pressOutDelayTimeout = null;
      }
    }
  }
  function normalizeDelay(delay, min, fallback) {
    if (min === undefined) {
      min = 0;
    }
    if (fallback === undefined) {
      fallback = 0;
    }
    return Math.max(min, delay !== null && delay !== undefined ? delay : fallback);
  }
  function getTouchFromResponderEvent(event) {
    var _event$nativeEvent = event.nativeEvent,
      changedTouches = _event$nativeEvent.changedTouches,
      touches = _event$nativeEvent.touches;
    if (touches != null && touches.length > 0) {
      return touches[0];
    }
    if (changedTouches != null && changedTouches.length > 0) {
      return changedTouches[0];
    }
    return event.nativeEvent;
  }
},108,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var emptyFunction = () => {};
  function StatusBar() {
    return null;
  }
  StatusBar.setBackgroundColor = emptyFunction;
  StatusBar.setBarStyle = emptyFunction;
  StatusBar.setHidden = emptyFunction;
  StatusBar.setNetworkActivityIndicatorVisible = emptyFunction;
  StatusBar.setTranslucent = emptyFunction;
  var _default = StatusBar;
},109,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  {
    module.exports = require(_dependencyMap[0]);
  }
},110,[111]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  "use strict";

  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
    REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    undefined !== maybeKey && (key = "" + maybeKey);
    undefined !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key,
      ref: undefined !== config ? config : null,
      props: maybeKey
    };
  }
  exports.Fragment = REACT_FRAGMENT_TYPE;
  exports.jsx = jsxProd;
  exports.jsxs = jsxProd;
},111,[]);
__r(0);