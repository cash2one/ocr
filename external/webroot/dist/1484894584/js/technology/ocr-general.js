duAI([52],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(283);


/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ejs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	/*
	 * EJS Embedded JavaScript templates
	 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *         http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	*/

	'use strict';

	/**
	 * @file Embedded JavaScript templating engine.
	 * @author Matthew Eernisse <mde@fleegix.org>
	 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
	 * @project EJS
	 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
	 */

	/**
	 * EJS internal functions.
	 *
	 * Technically this "module" lies in the same file as {@link module:ejs}, for
	 * the sake of organization all the private functions re grouped into this
	 * module.
	 *
	 * @module ejs-internal
	 * @private
	 */

	/**
	 * Embedded JavaScript templating engine.
	 *
	 * @module ejs
	 * @public
	 */

	var fs = require('fs');
	var path = require('path');
	var utils = require('./utils');

	var scopeOptionWarned = false;
	var _VERSION_STRING = require('../package.json').version;
	var _DEFAULT_DELIMITER = '%';
	var _DEFAULT_LOCALS_NAME = 'locals';
	var _NAME = 'ejs';
	var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
	var _OPTS = ['delimiter', 'scope', 'context', 'debug', 'compileDebug',
	  'client', '_with', 'rmWhitespace', 'strict', 'filename'];
	var _BOM = /^\uFEFF/;

	/**
	 * EJS template function cache. This can be a LRU object from lru-cache NPM
	 * module. By default, it is {@link module:utils.cache}, a simple in-process
	 * cache that grows continuously.
	 *
	 * @type {Cache}
	 */

	exports.cache = utils.cache;

	/**
	 * Name of the object containing the locals.
	 *
	 * This variable is overridden by {@link Options}`.localsName` if it is not
	 * `undefined`.
	 *
	 * @type {String}
	 * @public
	 */

	exports.localsName = _DEFAULT_LOCALS_NAME;

	/**
	 * Get the path to the included file from the parent file path and the
	 * specified path.
	 *
	 * @param {String}  name     specified path
	 * @param {String}  filename parent file path
	 * @param {Boolean} isDir    parent file path whether is directory
	 * @return {String}
	 */
	exports.resolveInclude = function(name, filename, isDir) {
	  var dirname = path.dirname;
	  var extname = path.extname;
	  var resolve = path.resolve;
	  var includePath = resolve(isDir ? filename : dirname(filename), name);
	  var ext = extname(name);
	  if (!ext) {
	    includePath += '.ejs';
	  }
	  return includePath;
	};

	/**
	 * Get the path to the included file by Options
	 *
	 * @param  {String}  path    specified path
	 * @param  {Options} options compilation options
	 * @return {String}
	 */
	function getIncludePath(path, options){
	  var includePath;
	  if (path.charAt(0) == '/') {
	    includePath = exports.resolveInclude(path.replace(/^\/*/,''), options.root || '/', true);
	  }
	  else {
	    if (!options.filename) {
	      throw new Error('`include` use relative path requires the \'filename\' option.');
	    }
	    includePath = exports.resolveInclude(path, options.filename);
	  }
	  return includePath;
	}

	/**
	 * Get the template from a string or a file, either compiled on-the-fly or
	 * read from cache (if enabled), and cache the template if needed.
	 *
	 * If `template` is not set, the file specified in `options.filename` will be
	 * read.
	 *
	 * If `options.cache` is true, this function reads the file from
	 * `options.filename` so it must be set prior to calling this function.
	 *
	 * @memberof module:ejs-internal
	 * @param {Options} options   compilation options
	 * @param {String} [template] template source
	 * @return {(TemplateFunction|ClientFunction)}
	 * Depending on the value of `options.client`, either type might be returned.
	 * @static
	 */

	function handleCache(options, template) {
	  var func;
	  var filename = options.filename;
	  var hasTemplate = arguments.length > 1;

	  if (options.cache) {
	    if (!filename) {
	      throw new Error('cache option requires a filename');
	    }
	    func = exports.cache.get(filename);
	    if (func) {
	      return func;
	    }
	    if (!hasTemplate) {
	      template = fs.readFileSync(filename).toString().replace(_BOM, '');
	    }
	  }
	  else if (!hasTemplate) {
	    // istanbul ignore if: should not happen at all
	    if (!filename) {
	      throw new Error('Internal EJS error: no file name or template '
	                    + 'provided');
	    }
	    template = fs.readFileSync(filename).toString().replace(_BOM, '');
	  }
	  func = exports.compile(template, options);
	  if (options.cache) {
	    exports.cache.set(filename, func);
	  }
	  return func;
	}

	/**
	 * Get the template function.
	 *
	 * If `options.cache` is `true`, then the template is cached.
	 *
	 * @memberof module:ejs-internal
	 * @param {String}  path    path for the specified file
	 * @param {Options} options compilation options
	 * @return {(TemplateFunction|ClientFunction)}
	 * Depending on the value of `options.client`, either type might be returned
	 * @static
	 */

	function includeFile(path, options) {
	  var opts = utils.shallowCopy({}, options);
	  opts.filename = getIncludePath(path, opts);
	  return handleCache(opts);
	}

	/**
	 * Get the JavaScript source of an included file.
	 *
	 * @memberof module:ejs-internal
	 * @param {String}  path    path for the specified file
	 * @param {Options} options compilation options
	 * @return {Object}
	 * @static
	 */

	function includeSource(path, options) {
	  var opts = utils.shallowCopy({}, options);
	  var includePath;
	  var template;
	  includePath = getIncludePath(path,opts);
	  template = fs.readFileSync(includePath).toString().replace(_BOM, '');
	  opts.filename = includePath;
	  var templ = new Template(template, opts);
	  templ.generateSource();
	  return {
	    source: templ.source,
	    filename: includePath,
	    template: template
	  };
	}

	/**
	 * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
	 * `lineno`.
	 *
	 * @implements RethrowCallback
	 * @memberof module:ejs-internal
	 * @param {Error}  err      Error object
	 * @param {String} str      EJS source
	 * @param {String} filename file name of the EJS file
	 * @param {String} lineno   line number of the error
	 * @static
	 */

	function rethrow(err, str, flnm, lineno){
	  var lines = str.split('\n');
	  var start = Math.max(lineno - 3, 0);
	  var end = Math.min(lines.length, lineno + 3);
	  var filename = utils.escapeXML(flnm);
	  // Error context
	  var context = lines.slice(start, end).map(function (line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? ' >> ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'ejs') + ':'
	    + lineno + '\n'
	    + context + '\n\n'
	    + err.message;

	  throw err;
	}

	function stripSemi(str) {
	  return str.replace(/;(\s*$)/, '$1');
	}

	/**
	 * Compile the given `str` of ejs into a template function.
	 *
	 * @param {String}  template EJS template
	 *
	 * @param {Options} opts     compilation options
	 *
	 * @return {(TemplateFunction|ClientFunction)}
	 * Depending on the value of `opts.client`, either type might be returned.
	 * @public
	 */

	exports.compile = function compile(template, opts) {
	  var templ;

	  // v1 compat
	  // 'scope' is 'context'
	  // FIXME: Remove this in a future version
	  if (opts && opts.scope) {
	    if (!scopeOptionWarned){
	      console.warn('`scope` option is deprecated and will be removed in EJS 3');
	      scopeOptionWarned = true;
	    }
	    if (!opts.context) {
	      opts.context = opts.scope;
	    }
	    delete opts.scope;
	  }
	  templ = new Template(template, opts);
	  return templ.compile();
	};

	/**
	 * Render the given `template` of ejs.
	 *
	 * If you would like to include options but not data, you need to explicitly
	 * call this function with `data` being an empty object or `null`.
	 *
	 * @param {String}   template EJS template
	 * @param {Object}  [data={}] template data
	 * @param {Options} [opts={}] compilation and rendering options
	 * @return {String}
	 * @public
	 */

	exports.render = function (template, d, o) {
	  var data = d || {};
	  var opts = o || {};

	  // No options object -- if there are optiony names
	  // in the data, copy them to options
	  if (arguments.length == 2) {
	    utils.shallowCopyFromList(opts, data, _OPTS);
	  }

	  return handleCache(opts, template)(data);
	};

	/**
	 * Render an EJS file at the given `path` and callback `cb(err, str)`.
	 *
	 * If you would like to include options but not data, you need to explicitly
	 * call this function with `data` being an empty object or `null`.
	 *
	 * @param {String}             path     path to the EJS file
	 * @param {Object}            [data={}] template data
	 * @param {Options}           [opts={}] compilation and rendering options
	 * @param {RenderFileCallback} cb callback
	 * @public
	 */

	exports.renderFile = function () {
	  var args = Array.prototype.slice.call(arguments);
	  var filename = args.shift();
	  var cb = args.pop();
	  var data = args.shift() || {};
	  var opts = args.pop() || {};
	  var optsKeys =_OPTS.slice();
	  var result;

	  // Don't pollute passed in opts obj with new vals
	  opts = utils.shallowCopy({}, opts);

	  // We don't allow 'cache' option to be passed in the data obj
	  // for the normal `render` call, but this is where Expres puts it
	  // so we make an exception for `renderFile`
	  optsKeys.push('cache');

	  // No options object -- if there are optiony names
	  // in the data, copy them to options
	  if (arguments.length == 3) {
	    // Express 4
	    if (data.settings && data.settings['view options']) {
	      utils.shallowCopyFromList(opts, data.settings['view options'], optsKeys);
	    }
	    // Express 3 and lower
	    else {
	      utils.shallowCopyFromList(opts, data, optsKeys);
	    }
	  }
	  opts.filename = filename;

	  try {
	    result = handleCache(opts)(data);
	  }
	  catch(err) {
	    return cb(err);
	  }
	  return cb(null, result);
	};

	/**
	 * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
	 * @public
	 */

	exports.clearCache = function () {
	  exports.cache.reset();
	};

	function Template(text, opts) {
	  opts = opts || {};
	  var options = {};
	  this.templateText = text;
	  this.mode = null;
	  this.truncate = false;
	  this.currentLine = 1;
	  this.source = '';
	  this.dependencies = [];
	  options.client = opts.client || false;
	  options.escapeFunction = opts.escape || utils.escapeXML;
	  options.compileDebug = opts.compileDebug !== false;
	  options.debug = !!opts.debug;
	  options.filename = opts.filename;
	  options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
	  options.strict = opts.strict || false;
	  options.context = opts.context;
	  options.cache = opts.cache || false;
	  options.rmWhitespace = opts.rmWhitespace;
	  options.root = opts.root;
	  options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;

	  if (options.strict) {
	    options._with = false;
	  }
	  else {
	    options._with = typeof opts._with != 'undefined' ? opts._with : true;
	  }

	  this.opts = options;

	  this.regex = this.createRegex();
	}

	Template.modes = {
	  EVAL: 'eval',
	  ESCAPED: 'escaped',
	  RAW: 'raw',
	  COMMENT: 'comment',
	  LITERAL: 'literal'
	};

	Template.prototype = {
	  createRegex: function () {
	    var str = _REGEX_STRING;
	    var delim = utils.escapeRegExpChars(this.opts.delimiter);
	    str = str.replace(/%/g, delim);
	    return new RegExp(str);
	  },

	  compile: function () {
	    var src;
	    var fn;
	    var opts = this.opts;
	    var prepended = '';
	    var appended = '';
	    var escape = opts.escapeFunction;

	    if (!this.source) {
	      this.generateSource();
	      prepended += '  var __output = [], __append = __output.push.bind(__output);' + '\n';
	      if (opts._with !== false) {
	        prepended +=  '  with (' + opts.localsName + ' || {}) {' + '\n';
	        appended += '  }' + '\n';
	      }
	      appended += '  return __output.join("");' + '\n';
	      this.source = prepended + this.source + appended;
	    }

	    if (opts.compileDebug) {
	      src = 'var __line = 1' + '\n'
	          + '  , __lines = ' + JSON.stringify(this.templateText) + '\n'
	          + '  , __filename = ' + (opts.filename ?
	                JSON.stringify(opts.filename) : 'undefined') + ';' + '\n'
	          + 'try {' + '\n'
	          + this.source
	          + '} catch (e) {' + '\n'
	          + '  rethrow(e, __lines, __filename, __line);' + '\n'
	          + '}' + '\n';
	    }
	    else {
	      src = this.source;
	    }

	    if (opts.debug) {
	      console.log(src);
	    }

	    if (opts.client) {
	      src = 'escape = escape || ' + escape.toString() + ';' + '\n' + src;
	      if (opts.compileDebug) {
	        src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
	      }
	    }

	    if (opts.strict) {
	      src = '"use strict";\n' + src;
	    }

	    try {
	      fn = new Function(opts.localsName + ', escape, include, rethrow', src);
	    }
	    catch(e) {
	      // istanbul ignore else
	      if (e instanceof SyntaxError) {
	        if (opts.filename) {
	          e.message += ' in ' + opts.filename;
	        }
	        e.message += ' while compiling ejs\n\n';
	        e.message += 'If the above error is not helpful, you may want to try EJS-Lint:\n';
	        e.message += 'https://github.com/RyanZim/EJS-Lint';
	      }
	      throw e;
	    }

	    if (opts.client) {
	      fn.dependencies = this.dependencies;
	      return fn;
	    }

	    // Return a callable function which will execute the function
	    // created by the source-code, with the passed data as locals
	    // Adds a local `include` function which allows full recursive include
	    var returnedFn = function (data) {
	      var include = function (path, includeData) {
	        var d = utils.shallowCopy({}, data);
	        if (includeData) {
	          d = utils.shallowCopy(d, includeData);
	        }
	        return includeFile(path, opts)(d);
	      };
	      return fn.apply(opts.context, [data || {}, escape, include, rethrow]);
	    };
	    returnedFn.dependencies = this.dependencies;
	    return returnedFn;
	  },

	  generateSource: function () {
	    var opts = this.opts;

	    if (opts.rmWhitespace) {
	      // Have to use two separate replace here as `^` and `$` operators don't
	      // work well with `\r`.
	      this.templateText =
	        this.templateText.replace(/\r/g, '').replace(/^\s+|\s+$/gm, '');
	    }

	    // Slurp spaces and tabs before <%_ and after _%>
	    this.templateText =
	      this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');

	    var self = this;
	    var matches = this.parseTemplateText();
	    var d = this.opts.delimiter;

	    if (matches && matches.length) {
	      matches.forEach(function (line, index) {
	        var opening;
	        var closing;
	        var include;
	        var includeOpts;
	        var includeObj;
	        var includeSrc;
	        // If this is an opening tag, check for closing tags
	        // FIXME: May end up with some false positives here
	        // Better to store modes as k/v with '<' + delimiter as key
	        // Then this can simply check against the map
	        if ( line.indexOf('<' + d) === 0        // If it is a tag
	          && line.indexOf('<' + d + d) !== 0) { // and is not escaped
	          closing = matches[index + 2];
	          if (!(closing == d + '>' || closing == '-' + d + '>' || closing == '_' + d + '>')) {
	            throw new Error('Could not find matching close tag for "' + line + '".');
	          }
	        }
	        // HACK: backward-compat `include` preprocessor directives
	        if ((include = line.match(/^\s*include\s+(\S+)/))) {
	          opening = matches[index - 1];
	          // Must be in EVAL or RAW mode
	          if (opening && (opening == '<' + d || opening == '<' + d + '-' || opening == '<' + d + '_')) {
	            includeOpts = utils.shallowCopy({}, self.opts);
	            includeObj = includeSource(include[1], includeOpts);
	            if (self.opts.compileDebug) {
	              includeSrc =
	                  '    ; (function(){' + '\n'
	                  + '      var __line = 1' + '\n'
	                  + '      , __lines = ' + JSON.stringify(includeObj.template) + '\n'
	                  + '      , __filename = ' + JSON.stringify(includeObj.filename) + ';' + '\n'
	                  + '      try {' + '\n'
	                  + includeObj.source
	                  + '      } catch (e) {' + '\n'
	                  + '        rethrow(e, __lines, __filename, __line);' + '\n'
	                  + '      }' + '\n'
	                  + '    ; }).call(this)' + '\n';
	            }else{
	              includeSrc = '    ; (function(){' + '\n' + includeObj.source +
	                  '    ; }).call(this)' + '\n';
	            }
	            self.source += includeSrc;
	            self.dependencies.push(exports.resolveInclude(include[1],
	                includeOpts.filename));
	            return;
	          }
	        }
	        self.scanLine(line);
	      });
	    }

	  },

	  parseTemplateText: function () {
	    var str = this.templateText;
	    var pat = this.regex;
	    var result = pat.exec(str);
	    var arr = [];
	    var firstPos;

	    while (result) {
	      firstPos = result.index;

	      if (firstPos !== 0) {
	        arr.push(str.substring(0, firstPos));
	        str = str.slice(firstPos);
	      }

	      arr.push(result[0]);
	      str = str.slice(result[0].length);
	      result = pat.exec(str);
	    }

	    if (str) {
	      arr.push(str);
	    }

	    return arr;
	  },

	  scanLine: function (line) {
	    var self = this;
	    var d = this.opts.delimiter;
	    var newLineCount = 0;

	    function _addOutput() {
	      if (self.truncate) {
	        // Only replace single leading linebreak in the line after
	        // -%> tag -- this is the single, trailing linebreak
	        // after the tag that the truncation mode replaces
	        // Handle Win / Unix / old Mac linebreaks -- do the \r\n
	        // combo first in the regex-or
	        line = line.replace(/^(?:\r\n|\r|\n)/, '');
	        self.truncate = false;
	      }
	      else if (self.opts.rmWhitespace) {
	        // rmWhitespace has already removed trailing spaces, just need
	        // to remove linebreaks
	        line = line.replace(/^\n/, '');
	      }
	      if (!line) {
	        return;
	      }

	      // Preserve literal slashes
	      line = line.replace(/\\/g, '\\\\');

	      // Convert linebreaks
	      line = line.replace(/\n/g, '\\n');
	      line = line.replace(/\r/g, '\\r');

	      // Escape double-quotes
	      // - this will be the delimiter during execution
	      line = line.replace(/"/g, '\\"');
	      self.source += '    ; __append("' + line + '")' + '\n';
	    }

	    newLineCount = (line.split('\n').length - 1);

	    switch (line) {
	    case '<' + d:
	    case '<' + d + '_':
	      this.mode = Template.modes.EVAL;
	      break;
	    case '<' + d + '=':
	      this.mode = Template.modes.ESCAPED;
	      break;
	    case '<' + d + '-':
	      this.mode = Template.modes.RAW;
	      break;
	    case '<' + d + '#':
	      this.mode = Template.modes.COMMENT;
	      break;
	    case '<' + d + d:
	      this.mode = Template.modes.LITERAL;
	      this.source += '    ; __append("' + line.replace('<' + d + d, '<' + d) + '")' + '\n';
	      break;
	    case d + d + '>':
	      this.mode = Template.modes.LITERAL;
	      this.source += '    ; __append("' + line.replace(d + d + '>', d + '>') + '")' + '\n';
	      break;
	    case d + '>':
	    case '-' + d + '>':
	    case '_' + d + '>':
	      if (this.mode == Template.modes.LITERAL) {
	        _addOutput();
	      }

	      this.mode = null;
	      this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
	      break;
	    default:
	        // In script mode, depends on type of tag
	      if (this.mode) {
	          // If '//' is found without a line break, add a line break.
	        switch (this.mode) {
	        case Template.modes.EVAL:
	        case Template.modes.ESCAPED:
	        case Template.modes.RAW:
	          if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
	            line += '\n';
	          }
	        }
	        switch (this.mode) {
	            // Just executing code
	        case Template.modes.EVAL:
	          this.source += '    ; ' + line + '\n';
	          break;
	            // Exec, esc, and output
	        case Template.modes.ESCAPED:
	          this.source += '    ; __append(escape(' + stripSemi(line) + '))' + '\n';
	          break;
	            // Exec and output
	        case Template.modes.RAW:
	          this.source += '    ; __append(' + stripSemi(line) + ')' + '\n';
	          break;
	        case Template.modes.COMMENT:
	              // Do nothing
	          break;
	            // Literal <%% mode, append as raw output
	        case Template.modes.LITERAL:
	          _addOutput();
	          break;
	        }
	      }
	        // In string mode, just add the output
	      else {
	        _addOutput();
	      }
	    }

	    if (self.opts.compileDebug && newLineCount) {
	      this.currentLine += newLineCount;
	      this.source += '    ; __line = ' + this.currentLine + '\n';
	    }
	  }
	};

	/**
	 * Escape characters reserved in XML.
	 *
	 * This is simply an export of {@link module:utils.escapeXML}.
	 *
	 * If `markup` is `undefined` or `null`, the empty string is returned.
	 *
	 * @param {String} markup Input string
	 * @return {String} Escaped string
	 * @public
	 * @func
	 * */
	exports.escapeXML = utils.escapeXML;

	/**
	 * Express.js support.
	 *
	 * This is an alias for {@link module:ejs.renderFile}, in order to support
	 * Express.js out-of-the-box.
	 *
	 * @func
	 */

	exports.__express = exports.renderFile;

	// Add require support
	/* istanbul ignore else */
	if (require.extensions) {
	  require.extensions['.ejs'] = function (module, flnm) {
	    var filename = flnm || /* istanbul ignore next */ module.filename;
	    var options = {
	      filename: filename,
	      client: true
	    };
	    var template = fs.readFileSync(filename).toString();
	    var fn = exports.compile(template, options);
	    module._compile('module.exports = ' + fn.toString() + ';', filename);
	  };
	}

	/**
	 * Version of EJS.
	 *
	 * @readonly
	 * @type {String}
	 * @public
	 */

	exports.VERSION = _VERSION_STRING;

	/**
	 * Name for detection of EJS.
	 *
	 * @readonly
	 * @type {String}
	 * @public
	 */

	exports.name = _NAME;

	/* istanbul ignore if */
	if (typeof window != 'undefined') {
	  window.ejs = exports;
	}

	},{"../package.json":6,"./utils":2,"fs":3,"path":4}],2:[function(require,module,exports){
	/*
	 * EJS Embedded JavaScript templates
	 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *         http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	*/

	/**
	 * Private utility functions
	 * @module utils
	 * @private
	 */

	'use strict';

	var regExpChars = /[|\\{}()[\]^$+*?.]/g;

	/**
	 * Escape characters reserved in regular expressions.
	 *
	 * If `string` is `undefined` or `null`, the empty string is returned.
	 *
	 * @param {String} string Input string
	 * @return {String} Escaped string
	 * @static
	 * @private
	 */
	exports.escapeRegExpChars = function (string) {
	  // istanbul ignore if
	  if (!string) {
	    return '';
	  }
	  return String(string).replace(regExpChars, '\\$&');
	};

	var _ENCODE_HTML_RULES = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&#34;',
	  "'": '&#39;'
	};
	var _MATCH_HTML = /[&<>\'"]/g;

	function encode_char(c) {
	  return _ENCODE_HTML_RULES[c] || c;
	}

	/**
	 * Stringified version of constants used by {@link module:utils.escapeXML}.
	 *
	 * It is used in the process of generating {@link ClientFunction}s.
	 *
	 * @readonly
	 * @type {String}
	 */

	var escapeFuncStr =
	  'var _ENCODE_HTML_RULES = {\n'
	+ '      "&": "&amp;"\n'
	+ '    , "<": "&lt;"\n'
	+ '    , ">": "&gt;"\n'
	+ '    , \'"\': "&#34;"\n'
	+ '    , "\'": "&#39;"\n'
	+ '    }\n'
	+ '  , _MATCH_HTML = /[&<>\'"]/g;\n'
	+ 'function encode_char(c) {\n'
	+ '  return _ENCODE_HTML_RULES[c] || c;\n'
	+ '};\n';

	/**
	 * Escape characters reserved in XML.
	 *
	 * If `markup` is `undefined` or `null`, the empty string is returned.
	 *
	 * @implements {EscapeCallback}
	 * @param {String} markup Input string
	 * @return {String} Escaped string
	 * @static
	 * @private
	 */

	exports.escapeXML = function (markup) {
	  return markup == undefined
	    ? ''
	    : String(markup)
	        .replace(_MATCH_HTML, encode_char);
	};
	exports.escapeXML.toString = function () {
	  return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
	};

	/**
	 * Naive copy of properties from one object to another.
	 * Does not recurse into non-scalar properties
	 * Does not check to see if the property has a value before copying
	 *
	 * @param  {Object} to   Destination object
	 * @param  {Object} from Source object
	 * @return {Object}      Destination object
	 * @static
	 * @private
	 */
	exports.shallowCopy = function (to, from) {
	  from = from || {};
	  for (var p in from) {
	    to[p] = from[p];
	  }
	  return to;
	};

	/**
	 * Naive copy of a list of key names, from one object to another.
	 * Only copies property if it is actually defined
	 * Does not recurse into non-scalar properties
	 *
	 * @param  {Object} to   Destination object
	 * @param  {Object} from Source object
	 * @param  {Array} list List of properties to copy
	 * @return {Object}      Destination object
	 * @static
	 * @private
	 */
	exports.shallowCopyFromList = function (to, from, list) {
	  list.forEach(function (p) {
	    if (typeof from[p] != 'undefined') {
	      to[p] = from[p];
	    }
	  });
	  return to;
	};

	/**
	 * Simple in-process cache implementation. Does not implement limits of any
	 * sort.
	 *
	 * @implements Cache
	 * @static
	 * @private
	 */
	exports.cache = {
	  _data: {},
	  set: function (key, val) {
	    this._data[key] = val;
	  },
	  get: function (key) {
	    return this._data[key];
	  },
	  reset: function () {
	    this._data = {};
	  }
	};

	},{}],3:[function(require,module,exports){

	},{}],4:[function(require,module,exports){
	(function (process){
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

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	}).call(this,require('_process'))
	},{"_process":5}],5:[function(require,module,exports){
	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };

	},{}],6:[function(require,module,exports){
	module.exports={
	  "name": "ejs",
	  "description": "Embedded JavaScript templates",
	  "keywords": [
	    "template",
	    "engine",
	    "ejs"
	  ],
	  "version": "2.5.4",
	  "author": "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
	  "contributors": [
	    "Timothy Gu <timothygu99@gmail.com> (https://timothygu.github.io)"
	  ],
	  "license": "Apache-2.0",
	  "main": "./lib/ejs.js",
	  "repository": {
	    "type": "git",
	    "url": "git://github.com/mde/ejs.git"
	  },
	  "bugs": "https://github.com/mde/ejs/issues",
	  "homepage": "https://github.com/mde/ejs",
	  "dependencies": {},
	  "devDependencies": {
	    "browserify": "^13.0.1",
	    "eslint": "^3.0.0",
	    "git-directory-deploy": "^1.5.1",
	    "istanbul": "~0.4.3",
	    "jake": "^8.0.0",
	    "jsdoc": "^3.4.0",
	    "lru-cache": "^4.0.1",
	    "mocha": "^3.0.2",
	    "uglify-js": "^2.6.2"
	  },
	  "engines": {
	    "node": ">=0.10.0"
	  },
	  "scripts": {
	    "test": "mocha",
	    "lint": "eslint \"**/*.js\" Jakefile",
	    "coverage": "istanbul cover node_modules/mocha/bin/_mocha",
	    "doc": "jake doc",
	    "devdoc": "jake doc[dev]"
	  }
	}

	},{}]},{},[1])(1)
	});

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @file 基础模态框容器
	 * @author shiliang@baidu.com
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _modal = __webpack_require__(25);

	var _ejs = __webpack_require__(20);

	var _ejs2 = _interopRequireDefault(_ejs);

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Modal = function () {
	    function Modal() {
	        var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
	        var id = arguments[1];
	        var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	        _classCallCheck(this, Modal);

	        this.container = container;
	        this.id = id || 'modal-' + new Date().getTime();
	        this.title = title;
	        this.isOpen = false;
	    }

	    _createClass(Modal, [{
	        key: 'init',
	        value: function init() {
	            var html = _ejs2.default.render(_modal.MODAL_TMPL, { id: this.id, title: this.title });
	            (0, _jquery2.default)(this.container).append(html);
	            this.bindEvent();
	        }
	    }, {
	        key: 'setContent',
	        value: function setContent(html) {
	            this.getModal().find('.modal-content').html(html);
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            this.isOpen = true;
	            this.getModal().show();
	            (0, _jquery2.default)('body').addClass('modal-show');
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.isOpen = false;
	            this.getModal().hide();
	            (0, _jquery2.default)('body').removeClass('modal-show');
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.hide();
	            this.getModal().remove();
	        }
	    }, {
	        key: 'getModal',
	        value: function getModal() {
	            return (0, _jquery2.default)('#' + this.id);
	        }
	    }, {
	        key: 'bindEvent',
	        value: function bindEvent() {
	            var _this = this;

	            this.getModal().on('click', '.modal-x', function () {
	                _this.hide();
	            });

	            this.getModal().on('click', function (e) {
	                e.stopPropagation();
	            });

	            this.getModal().on('close', function () {
	                if (_this.isOpen) {
	                    _this.hide();
	                }
	            });

	            function close() {
	                (0, _jquery2.default)('.ai-modal').trigger('close');
	            }

	            (0, _jquery2.default)('body').off('close', close).on('click', close);
	        }
	    }]);

	    return Modal;
	}();

	exports.default = Modal;

/***/ },

/***/ 25:
/***/ function(module, exports) {

	/**
	 * @file 基本模态框模板
	 * @author shiliang@baidu.com
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var MODAL_TMPL = exports.MODAL_TMPL = ['<div class="ai-modal" id="<%= id %>">', '<header class="modal-header">', '<h3><%= title %></h3>', '<a class="modal-x"></a>', '</header>', '<section class="modal-content">', '</section>', '</div>'].join('');

	var ALERT_MODAL_TMPL = exports.ALERT_MODAL_TMPL = ['<div class="ai-modal alert" id="<%= id %>">', '<header class="modal-header">', '<h3><%= title %></h3>', '<a class="modal-x"></a>', '</header>', '<section class="modal-content">', '<div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;"><%=content%></div>', '<div style="text-align: center;">', '<button type="button" class="btn-normal cancel">确定</button>', '</div>', '</section>', '</div>'].join('');

	var CONFIRM_MODAL_TMPL = exports.CONFIRM_MODAL_TMPL = ['<div class="ai-modal alert" id="<%= id %>">', '<header class="modal-header">', '<h3><%= title %></h3>', '<a class="modal-x"></a>', '</header>', '<section class="modal-content">', '<div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;"><%=content%></div>', '<div style="text-align: center;">', '<button type="button" class="btn-primary submit">确定</button>', '<button type="button" class="btn-normal cancel" style="margin-left: 15px;">取消</button>', '</div>', '</section>', '</div>'].join('');

/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @file 用于绘制根据图片识别返回数据绘制图片的插件
	 * @author shiliang@baidu.com
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _demoAPI = __webpack_require__(130);

	var _alertModal = __webpack_require__(131);

	var _alertModal2 = _interopRequireDefault(_alertModal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* eslint-disable */
	var notFoundImg = __webpack_require__(132);
	var formatImg = __webpack_require__(133);
	var tooLargeImg = __webpack_require__(134);
	/* eslint-enable */

	var DemoCanvas = function () {
	    function DemoCanvas(_ref) {
	        var _this = this;

	        var selector = _ref.selector,
	            image = _ref.image,
	            type = _ref.type,
	            apiType = _ref.apiType,
	            _ref$toCheck = _ref.toCheck,
	            toCheck = _ref$toCheck === undefined ? true : _ref$toCheck,
	            _ref$scale = _ref.scale,
	            scale = _ref$scale === undefined ? 1 : _ref$scale,
	            success = _ref.success,
	            fail = _ref.fail;

	        _classCallCheck(this, DemoCanvas);

	        if (!(0, _jquery2.default)(selector).context) {
	            throw 'DemoCanvas：未寻找到容器!';
	        }
	        this.container = (0, _jquery2.default)(selector);
	        this.type = type;
	        this.scale = scale;
	        this.apiType = apiType;
	        this.image = new Image();
	        this.success = success || _jquery2.default.noop;
	        this.fail = fail || _jquery2.default.noop;

	        this.image.onerror = function () {
	            _this.fail();
	            new _alertModal2.default('图片加载失败，请重试');
	        };

	        if (toCheck) {
	            var promise = {
	                'url': this.checkByUrl,
	                'stream': this.checkByStream
	            }[this.type](image, apiType);

	            _jquery2.default.when(promise).then(function (resultImg) {
	                _this.image.onload = function () {
	                    _this.render(true);
	                };
	                _this.image.src = resultImg;
	            }, function (errorImg) {
	                _this.image.onload = function () {
	                    _this.render(false);
	                };
	                _this.image.src = errorImg;
	            });
	        } else {
	            this.image.onload = function () {
	                _this.render(true);
	            };
	            this.image.src = image;
	        }
	    }

	    _createClass(DemoCanvas, [{
	        key: 'checkByUrl',
	        value: function checkByUrl(image, apiType) {
	            var dfd = _jquery2.default.Deferred();
	            (0, _demoAPI.getHeader)({
	                imageUrl: image,
	                type: apiType,
	                success: function success(res) {
	                    var contentType = res.data['Content-Type'];
	                    var contentSize = res.data['Content-Length'];
	                    if (!contentType && !contentSize || res.errno !== 0) {
	                        // console.error('此错误可能是由于图片的同源策略造成的!');
	                        dfd.reject(notFoundImg);
	                        return;
	                    }
	                    if (!/image\/(png|bmp|jpg|jpeg)/.test(contentType)) {
	                        dfd.reject(formatImg);
	                        return;
	                    }
	                    if (contentSize > 2 * 1024 * 1024) {
	                        dfd.reject(tooLargeImg);
	                        return;
	                    }
	                    dfd.resolve(res.data.image_data);
	                },
	                fail: function fail() {
	                    dfd.reject(notFoundImg);
	                }
	            });
	            return dfd.promise();
	        }
	    }, {
	        key: 'checkByStream',
	        value: function checkByStream(image) {
	            var dfd = _jquery2.default.Deferred();
	            var reader = new FileReader();
	            if (!image) {
	                dfd.reject(notFoundImg);
	                return dfd.promise();
	            }
	            reader.readAsDataURL(image);
	            reader.onload = function (e) {
	                if (!/image\/(png|bmp|jpeg)/.test(image.type)) {
	                    dfd.reject(formatImg);
	                    return false;
	                }
	                if (image.size > 2 * 1024 * 1024) {
	                    dfd.reject(tooLargeImg);
	                    return false;
	                }
	                dfd.resolve(e.target.result);
	            };
	            reader.onerror = function () {
	                dfd.reject(notFoundImg);
	            };
	            return dfd.promise();
	        }
	    }, {
	        key: 'render',
	        value: function render(isSuccessful) {
	            var cWidth = this.container.width();
	            var cHeight = this.container.height();
	            var iWidth = this.image.width;
	            var iHeight = this.image.height;

	            var canvas = (0, _jquery2.default)('<canvas>您的浏览器暂时不支持canvas，请选用现代浏览器！</canvas>').attr('width', iWidth).attr('height', iHeight);
	            var ctx = canvas[0].getContext('2d');
	            ctx.drawImage(this.image, 0, 0);

	            var wRatio = iWidth / cWidth;
	            var hRatio = iHeight / cHeight;

	            var scaleRatio = this.scale * (wRatio > 1 || hRatio > 1 ? 1 / (wRatio >= hRatio ? wRatio : hRatio) : 1);

	            canvas.css({
	                'position': 'relative',
	                'left': '50%',
	                'top': '50%',
	                '-webkit-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
	                '-moz-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
	                '-o-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
	                'transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')'
	            });
	            canvas.attr('data-scale', scaleRatio);
	            this.container.empty().append(canvas);
	            if (isSuccessful) {
	                this.success(this.image.src);
	            } else {
	                this.fail();
	            }
	        }
	    }]);

	    return DemoCanvas;
	}();

	exports.default = DemoCanvas;

/***/ },

/***/ 130:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @file demo API接口定义
	 * @author shiliang@baidu.com
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.scanIDCard = scanIDCard;
	exports.scanBankCard = scanBankCard;
	exports.scanGeneralText = scanGeneralText;
	exports.scanFace = scanFace;
	exports.scanPornography = scanPornography;
	exports.getHeader = getHeader;
	exports.evaluateWakeWords = evaluateWakeWords;
	exports.exportWakeWords = exportWakeWords;
	exports.synthesizeSpeech = synthesizeSpeech;

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function scanIDCard(_ref) {
	    var _ref$image = _ref.image,
	        image = _ref$image === undefined ? null : _ref$image,
	        _ref$imageUrl = _ref.imageUrl,
	        imageUrl = _ref$imageUrl === undefined ? null : _ref$imageUrl,
	        _ref$success = _ref.success,
	        success = _ref$success === undefined ? _jquery2.default.noop : _ref$success,
	        _ref$fail = _ref.fail,
	        fail = _ref$fail === undefined ? _jquery2.default.noop : _ref$fail;

	    _jquery2.default.post('/aidemo', {
	        type: 'idcard',
	        image: image,
	        'image_url': imageUrl
	    }).success(success).fail(fail);
	}

	function scanBankCard(_ref2) {
	    var _ref2$image = _ref2.image,
	        image = _ref2$image === undefined ? null : _ref2$image,
	        _ref2$imageUrl = _ref2.imageUrl,
	        imageUrl = _ref2$imageUrl === undefined ? null : _ref2$imageUrl,
	        _ref2$success = _ref2.success,
	        success = _ref2$success === undefined ? _jquery2.default.noop : _ref2$success,
	        _ref2$fail = _ref2.fail,
	        fail = _ref2$fail === undefined ? _jquery2.default.noop : _ref2$fail;

	    _jquery2.default.post('/aidemo', {
	        type: 'bankcard',
	        image: image,
	        'image_url': imageUrl
	    }).success(success).fail(fail);
	}

	function scanGeneralText(_ref3) {
	    var _ref3$image = _ref3.image,
	        image = _ref3$image === undefined ? null : _ref3$image,
	        _ref3$imageUrl = _ref3.imageUrl,
	        imageUrl = _ref3$imageUrl === undefined ? null : _ref3$imageUrl,
	        _ref3$success = _ref3.success,
	        success = _ref3$success === undefined ? _jquery2.default.noop : _ref3$success,
	        _ref3$fail = _ref3.fail,
	        fail = _ref3$fail === undefined ? _jquery2.default.noop : _ref3$fail;

	    _jquery2.default.post('/aidemo', {
	        type: 'commontext',
	        image: image,
	        'image_url': imageUrl
	    }).success(success).fail(fail);
	}

	function scanFace(_ref4) {
	    var _ref4$image = _ref4.image,
	        image = _ref4$image === undefined ? null : _ref4$image,
	        _ref4$imageUrl = _ref4.imageUrl,
	        imageUrl = _ref4$imageUrl === undefined ? null : _ref4$imageUrl,
	        _ref4$success = _ref4.success,
	        success = _ref4$success === undefined ? _jquery2.default.noop : _ref4$success,
	        _ref4$fail = _ref4.fail,
	        fail = _ref4$fail === undefined ? _jquery2.default.noop : _ref4$fail;

	    _jquery2.default.post('/aidemo', {
	        type: 'face',
	        image: image,
	        'image_url': imageUrl
	    }).success(success).fail(fail);
	}

	function scanPornography(_ref5) {
	    var _ref5$image = _ref5.image,
	        image = _ref5$image === undefined ? null : _ref5$image,
	        _ref5$imageUrl = _ref5.imageUrl,
	        imageUrl = _ref5$imageUrl === undefined ? null : _ref5$imageUrl,
	        _ref5$success = _ref5.success,
	        success = _ref5$success === undefined ? _jquery2.default.noop : _ref5$success,
	        _ref5$fail = _ref5.fail,
	        fail = _ref5$fail === undefined ? _jquery2.default.noop : _ref5$fail;

	    _jquery2.default.post('/aidemo', {
	        type: 'pornography',
	        image: image,
	        'image_url': imageUrl
	    }).success(success).fail(fail);
	}

	function getHeader(_ref6) {
	    var _ref6$imageUrl = _ref6.imageUrl,
	        imageUrl = _ref6$imageUrl === undefined ? null : _ref6$imageUrl,
	        type = _ref6.type,
	        _ref6$success = _ref6.success,
	        success = _ref6$success === undefined ? _jquery2.default.noop : _ref6$success,
	        _ref6$fail = _ref6.fail,
	        fail = _ref6$fail === undefined ? _jquery2.default.noop : _ref6$fail;

	    _jquery2.default.post('/aidemo', {
	        action: 'getHeader',
	        type: type,
	        'image_url': imageUrl
	    }).success(success).fail(fail);
	}

	function evaluateWakeWords(_ref7) {
	    var _ref7$words = _ref7.words,
	        words = _ref7$words === undefined ? null : _ref7$words,
	        _ref7$success = _ref7.success,
	        success = _ref7$success === undefined ? _jquery2.default.noop : _ref7$success,
	        _ref7$fail = _ref7.fail,
	        fail = _ref7$fail === undefined ? _jquery2.default.noop : _ref7$fail;

	    _jquery2.default.post('/aidemo', {
	        type: 'wakescore',
	        kw: words
	    }).success(success).fail(fail);
	}

	function exportWakeWords(_ref8) {
	    var _ref8$words = _ref8.words,
	        words = _ref8$words === undefined ? null : _ref8$words,
	        _ref8$success = _ref8.success,
	        success = _ref8$success === undefined ? _jquery2.default.noop : _ref8$success;

	    window.open('/aidemo?type=wakedownload&kw=' + words, '_blank');
	    success();
	}

	function synthesizeSpeech(_ref9) {
	    var _ref9$data = _ref9.data,
	        data = _ref9$data === undefined ? {} : _ref9$data,
	        _ref9$success = _ref9.success,
	        success = _ref9$success === undefined ? _jquery2.default.noop : _ref9$success,
	        _ref9$fail = _ref9.fail,
	        fail = _ref9$fail === undefined ? _jquery2.default.noop : _ref9$fail;

	    _jquery2.default.post('/aidemo', {
	        type: 'tts',
	        speed: data.speed,
	        vol: data.vol,
	        person: data.person,
	        text: data.text
	    }).success(success).fail(fail);
	}

/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @file 提示模态框容器
	 * @author shiliang@baidu.com
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _ejs = __webpack_require__(20);

	var _ejs2 = _interopRequireDefault(_ejs);

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _modal = __webpack_require__(24);

	var _modal2 = _interopRequireDefault(_modal);

	var _modal3 = __webpack_require__(25);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AlertModal = function (_Modal) {
	    _inherits(AlertModal, _Modal);

	    function AlertModal(content) {
	        _classCallCheck(this, AlertModal);

	        var _this = _possibleConstructorReturn(this, (AlertModal.__proto__ || Object.getPrototypeOf(AlertModal)).call(this));

	        _this.title = '提示';
	        _this.content = content || '';
	        _this.init();
	        return _this;
	    }

	    _createClass(AlertModal, [{
	        key: 'init',
	        value: function init() {
	            var html = _ejs2.default.render(_modal3.ALERT_MODAL_TMPL, {
	                id: this.id,
	                title: this.title,
	                content: this.content
	            });
	            (0, _jquery2.default)(this.container).append(html);
	            this.bindEvent();
	            _get(AlertModal.prototype.__proto__ || Object.getPrototypeOf(AlertModal.prototype), 'show', this).call(this);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.getModal().hide().remove();
	            (0, _jquery2.default)('body').removeClass('modal-show');
	        }
	    }, {
	        key: 'bindEvent',
	        value: function bindEvent() {
	            var _this2 = this;

	            _get(AlertModal.prototype.__proto__ || Object.getPrototypeOf(AlertModal.prototype), 'bindEvent', this).call(this);
	            var modal = this.getModal();

	            modal.on('click', 'button.cancel', function (e) {
	                e.preventDefault();
	                _this2.hide();
	            });
	        }
	    }]);

	    return AlertModal;
	}(_modal2.default);

	exports.default = AlertModal;

/***/ },

/***/ 132:
/***/ function(module, exports) {

	module.exports = "/ai_dist/1484894584/ai_images/error/not-found.png";

/***/ },

/***/ 133:
/***/ function(module, exports) {

	module.exports = "/ai_dist/1484894584/ai_images/error/image-format.png";

/***/ },

/***/ 134:
/***/ function(module, exports) {

	module.exports = "/ai_dist/1484894584/ai_images/error/too-large.png";

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @file ocr-通用印刷文字识别脚本入口
	 * @author shiliang@baidu.com
	 */
	'use strict';

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _demoCanvas = __webpack_require__(129);

	var _demoCanvas2 = _interopRequireDefault(_demoCanvas);

	var _demoAPI = __webpack_require__(130);

	var _alertModal = __webpack_require__(131);

	var _alertModal2 = _interopRequireDefault(_alertModal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable */
	var demoImgPath = [__webpack_require__(284), __webpack_require__(285), __webpack_require__(286), __webpack_require__(287), __webpack_require__(288), __webpack_require__(289), __webpack_require__(290), __webpack_require__(291)];
	/* eslint-enable */

	(0, _jquery2.default)(document).ready(function () {
	    // case点击效果
	    (0, _jquery2.default)('.case-indicator > li').click(function () {
	        var _this = this;

	        (0, _jquery2.default)('.case-indicator > li').each(function (i, e) {
	            (0, _jquery2.default)(e).toggleClass('active', i === (0, _jquery2.default)(_this).index());
	        });
	        (0, _jquery2.default)('.case-item').each(function (i, e) {
	            (0, _jquery2.default)(e).toggleClass('active', i === (0, _jquery2.default)(_this).index());
	        });
	    });

	    // 触发功能介绍动画
	    (0, _jquery2.default)(window).scroll(function () {
	        if ((0, _jquery2.default)(document).scrollTop() >= 100) {
	            (0, _jquery2.default)('.tech-intro-detail').trigger('demo');
	        }
	    });

	    // 绑定功能介绍动画
	    (0, _jquery2.default)('.tech-intro-detail').one('demo', function () {
	        (0, _jquery2.default)('.original-card').addClass('scanning');
	        setTimeout(function () {
	            (0, _jquery2.default)('.original-card').removeClass('scanning').addClass('scanned');
	            (0, _jquery2.default)('.scan-result').addClass('scanned');
	        }, 3000);
	    });

	    // 线上demo开始
	    var isScanning = false;

	    var resetDemo = function resetDemo() {
	        (0, _jquery2.default)('#demo-json > p').empty();
	        (0, _jquery2.default)('#demo-result .result-background').attr('class', 'result-background');
	        (0, _jquery2.default)('#demo-photo-upload, #scan-photo').removeClass('disabled');
	        (0, _jquery2.default)('#demo-photo-upload  > input').val('');
	        isScanning = false;
	    };

	    var startScan = function startScan(type, imgSrc, url) {
	        (0, _jquery2.default)('#demo-result .result-background').attr('class', 'result-background loading');
	        (0, _jquery2.default)('#demo-result tbody').empty();
	        var options = {
	            success: function success(res) {
	                (0, _jquery2.default)('#demo-photo-upload, #scan-photo').removeClass('disabled');
	                (0, _jquery2.default)('#demo-json > p').html(JSON.stringify(res, null, '\t'));
	                (0, _jquery2.default)('#demo-result .result-background').removeClass('loading');

	                if (res.errno !== 0) {
	                    (0, _jquery2.default)('#demo-result .result-background').toggleClass('has-result man female', false).toggleClass('error-upload-fail', res.errno === 107).toggleClass('error-timeout', res.errno === 28).toggleClass('error-image-format', res.errno === 106);
	                    isScanning = false;
	                    if ([106, 107, 28].indexOf(res.errno) === -1) {
	                        new _alertModal2.default(res.msg);
	                    }
	                    return false;
	                }
	                var hasNoResult = !res.data.words_result_num;

	                for (var i = 0, len = res.data.words_result_num; i < len; i++) {
	                    var record = res.data.words_result[i];
	                    (0, _jquery2.default)('#demo-result tbody').append(['<tr>', '<td>' + (i + 1) + '</td>', '<td>' + record.words + '</td>', '<td>' + record.location.left + '</td>', '<td>' + record.location.top + '</td>', '<td>' + record.location.width + '</td>', '<td>' + record.location.height + '</td>', '</tr>'].join(''));
	                }

	                (0, _jquery2.default)('#demo-result .result-background').toggleClass('has-result', !hasNoResult).toggleClass('error-no-result', hasNoResult);
	                isScanning = false;
	            },
	            fail: function fail(xhr) {
	                new _alertModal2.default('接口发生错误：' + xhr.status + ' - ' + xhr.statusText);
	                resetDemo();
	            }
	        };
	        if (type === 'url') {
	            options.imageUrl = url;
	        } else if (type === 'stream') {
	            options.image = imgSrc;
	        }

	        (0, _demoAPI.scanGeneralText)(options);
	    };

	    // 上传图片
	    (0, _jquery2.default)('#demo-photo-upload  > input').change(function (e) {
	        if ((0, _jquery2.default)(this).val() === '') {
	            return false;
	        }
	        if (isScanning) {
	            new _alertModal2.default('操作正在进行中，请稍候再试！');
	            return;
	        }
	        isScanning = true;
	        (0, _jquery2.default)('#demo-photo-upload, #scan-photo').addClass('disabled');
	        var file = (0, _jquery2.default)(this)[0].files[0];
	        new _demoCanvas2.default({
	            selector: '#demo-origin',
	            image: file,
	            type: 'stream',
	            success: function success(imgSrc) {
	                (0, _jquery2.default)('#demo-photo-upload  > input').val('');
	                startScan('stream', imgSrc);
	            },

	            fail: resetDemo
	        });
	    });

	    // demo 检测输入框事件绑定
	    (0, _jquery2.default)('#demo-photo-url').change(function () {
	        (0, _jquery2.default)('.demo-card-list > li').removeClass('active');
	    });

	    // 检测按钮事件
	    (0, _jquery2.default)('#scan-photo').click(function () {
	        if (isScanning) {
	            new _alertModal2.default('操作正在进行中，请稍候再试！');
	            return;
	        }
	        if ((0, _jquery2.default)(this).hasClass('disabled') || !(0, _jquery2.default)('#demo-photo-url').val()) {
	            return false;
	        }
	        isScanning = true;
	        var url = (0, _jquery2.default)('#demo-photo-url').val();
	        (0, _jquery2.default)('#demo-photo-upload, #scan-photo').addClass('disabled');
	        new _demoCanvas2.default({
	            selector: '#demo-origin',
	            image: url,
	            type: 'url',
	            apiType: 'commontext',
	            success: function success(imgSrc) {
	                startScan('url', imgSrc, url);
	            },

	            fail: resetDemo
	        });
	    });

	    // 阻止多次上传
	    (0, _jquery2.default)('#demo-photo-upload').click(function () {
	        if ((0, _jquery2.default)(this).hasClass('disabled')) {
	            return false;
	        }
	    });

	    var $demoCardImgList = (0, _jquery2.default)('.demo-card-list > li');
	    $demoCardImgList.each(function (index, item) {
	        (0, _jquery2.default)(item).find('img').attr('src', window.location.protocol + '//' + window.location.host + demoImgPath[index]);
	    });

	    // 绑定实例图点击事件
	    $demoCardImgList.click(function () {
	        if (isScanning) {
	            new _alertModal2.default('操作正在进行中，请稍候再试！');
	            return;
	        }
	        isScanning = true;
	        (0, _jquery2.default)('.demo-card-list > li').removeClass('active');
	        (0, _jquery2.default)(this).addClass('active');
	        var url = (0, _jquery2.default)(this).find('img').attr('src');
	        (0, _jquery2.default)('#demo-photo-upload, #scan-photo').addClass('disabled');
	        new _demoCanvas2.default({
	            selector: '#demo-origin',
	            image: url,
	            type: 'url',
	            toCheck: false,
	            success: function success(imgSrc) {
	                startScan('url', imgSrc, url);
	            },

	            fail: resetDemo
	        });
	    });

	    // 触发初始化效果
	    (0, _jquery2.default)('.demo-card-list > li')[0].click();
	});

/***/ },

/***/ 284:
/***/ function(module, exports) {

	module.exports = "/ai_dist/1484894584/ai_images/technology/ocr-general/demo-card-1.png";

/***/ },

/***/ 285:
/***/ function(module, exports) {

	module.exports = "/ai_dist/1484894584/ai_images/technology/ocr-general/demo-card-2.png";

/***/ },

/***/ 286:
/***/ function(module, exports) {

	module.exports = "/ai_dist/1484894584/ai_images/technology/ocr-general/demo-card-3.png";

/***/ },

/***/ 287:
/***/ function(module, exports) {

	module.exports = "/ai_dist/1484894584/ai_images/technology/ocr-general/demo-card-4.png";

/***/ },

/***/ 288:
/***/ function(module, exports) {

	module.exports = "/ai_dist/1484894584/ai_images/technology/ocr-general/demo-card-5.png";

/***/ },

/***/ 289:
/***/ function(module, exports) {

	module.exports = "/ai_dist/1484894584/ai_images/technology/ocr-general/demo-card-6.jpg";

/***/ },

/***/ 290:
/***/ function(module, exports) {

	module.exports = "/ai_dist/1484894584/ai_images/technology/ocr-general/demo-card-7.png";

/***/ },

/***/ 291:
/***/ function(module, exports) {

	module.exports = "/ai_dist/1484894584/ai_images/technology/ocr-general/demo-card-8.png";

/***/ }

});