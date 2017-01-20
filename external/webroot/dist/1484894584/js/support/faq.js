duAI([22],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(98);


/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @file 模板脚本入口
	 * @author wangjiedong@baidu.com
	 */
	'use strict';

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var docAccordionMenu = void 0;

	var jQuery = _jquery2.default;
	(function ($, window, document, undefined) {
	    var pluginName = 'docAccordionMenu';
	    var defaults = {
	        speed: 300,
	        showDelay: 0,
	        hideDelay: 0,
	        singleOpen: true,
	        clickEffect: true
	    };
	    var Plugin = function Plugin(element, options) {
	        this.element = element;
	        this.settings = $.extend({}, defaults, options);
	        this._defaults = defaults;
	        this._name = pluginName;
	        this.init();
	    };
	    $.extend(Plugin.prototype, {
	        init: function init() {
	            this.openSubmenu();
	            this.submenuIndicators();
	            if (defaults.clickEffect) {
	                this.addClickEffect();
	            }
	        },
	        openSubmenu: function openSubmenu() {
	            $(this.element).children('ul').find('li').bind('click touchstart', function (e) {
	                e.stopPropagation();
	                e.preventDefault();
	                if ($(this).children('.submenu').length > 0) {
	                    if ($(this).children('.submenu').css('display') === 'none') {
	                        $(this).children('.submenu').delay(defaults.showDelay).slideDown(defaults.speed);
	                        if (defaults.singleOpen) {
	                            $(this).siblings().children('.submenu').slideUp(defaults.speed);
	                        }
	                        return false;
	                    } else {
	                        $(this).children('.submenu').delay(defaults.hideDelay).slideUp(defaults.speed);
	                    }
	                    if ($(this).children('.submenu').siblings('a').hasClass('submenu-indicator-minus')) {}
	                }
	                window.location.href = $(this).children('a').attr('href');
	            });
	        },
	        submenuIndicators: function submenuIndicators() {
	            if ($(this.element).find('.submenu').length > 0) {}
	        },
	        addClickEffect: function addClickEffect() {
	            var ink = void 0;
	            var d = void 0;
	            var x = void 0;
	            var y = void 0;
	            $(this.element).find('a').bind('click touchstart', function (e) {
	                $('.ink').remove();
	                if ($(this).children('.ink').length === 0) {
	                    $(this).prepend('<span class="ink"></span>');
	                }
	                ink = $(this).find('.ink');
	                ink.removeClass('animate-ink');
	                if (!ink.height() && !ink.width()) {
	                    d = Math.max($(this).outerWidth(), $(this).outerHeight());
	                    ink.css({
	                        height: d,
	                        width: d
	                    });
	                }
	                x = e.pageX - $(this).offset().left - ink.width() / 2;
	                y = e.pageY - $(this).offset().top - ink.height() / 2;
	                ink.css({
	                    top: y + 'px',
	                    left: x + 'px'
	                }).addClass('animate-ink');
	            });
	        }
	    });
	    $.fn[pluginName] = function (options) {
	        this.each(function () {
	            if (!$.data(this, 'plugin_' + pluginName)) {
	                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
	            }
	        });
	        return this;
	    };
	})(jQuery, window, document);

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 */

	;(function() {

	/**
	 * Block-Level Grammar
	 */

	var block = {
	  newline: /^\n+/,
	  code: /^( {4}[^\n]+\n*)+/,
	  fences: noop,
	  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
	  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
	  nptable: noop,
	  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
	  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
	  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
	  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
	  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
	  table: noop,
	  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
	  text: /^[^\n]+/
	};

	block.bullet = /(?:[*+-]|\d+\.)/;
	block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
	block.item = replace(block.item, 'gm')
	  (/bull/g, block.bullet)
	  ();

	block.list = replace(block.list)
	  (/bull/g, block.bullet)
	  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
	  ('def', '\\n+(?=' + block.def.source + ')')
	  ();

	block.blockquote = replace(block.blockquote)
	  ('def', block.def)
	  ();

	block._tag = '(?!(?:'
	  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
	  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
	  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

	block.html = replace(block.html)
	  ('comment', /<!--[\s\S]*?-->/)
	  ('closed', /<(tag)[\s\S]+?<\/\1>/)
	  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
	  (/tag/g, block._tag)
	  ();

	block.paragraph = replace(block.paragraph)
	  ('hr', block.hr)
	  ('heading', block.heading)
	  ('lheading', block.lheading)
	  ('blockquote', block.blockquote)
	  ('tag', '<' + block._tag)
	  ('def', block.def)
	  ();

	/**
	 * Normal Block Grammar
	 */

	block.normal = merge({}, block);

	/**
	 * GFM Block Grammar
	 */

	block.gfm = merge({}, block.normal, {
	  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
	  paragraph: /^/,
	  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
	});

	block.gfm.paragraph = replace(block.paragraph)
	  ('(?!', '(?!'
	    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
	    + block.list.source.replace('\\1', '\\3') + '|')
	  ();

	/**
	 * GFM + Tables Block Grammar
	 */

	block.tables = merge({}, block.gfm, {
	  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
	  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
	});

	/**
	 * Block Lexer
	 */

	function Lexer(options) {
	  this.tokens = [];
	  this.tokens.links = {};
	  this.options = options || marked.defaults;
	  this.rules = block.normal;

	  if (this.options.gfm) {
	    if (this.options.tables) {
	      this.rules = block.tables;
	    } else {
	      this.rules = block.gfm;
	    }
	  }
	}

	/**
	 * Expose Block Rules
	 */

	Lexer.rules = block;

	/**
	 * Static Lex Method
	 */

	Lexer.lex = function(src, options) {
	  var lexer = new Lexer(options);
	  return lexer.lex(src);
	};

	/**
	 * Preprocessing
	 */

	Lexer.prototype.lex = function(src) {
	  src = src
	    .replace(/\r\n|\r/g, '\n')
	    .replace(/\t/g, '    ')
	    .replace(/\u00a0/g, ' ')
	    .replace(/\u2424/g, '\n');

	  return this.token(src, true);
	};

	/**
	 * Lexing
	 */

	Lexer.prototype.token = function(src, top, bq) {
	  var src = src.replace(/^ +$/gm, '')
	    , next
	    , loose
	    , cap
	    , bull
	    , b
	    , item
	    , space
	    , i
	    , l;

	  while (src) {
	    // newline
	    if (cap = this.rules.newline.exec(src)) {
	      src = src.substring(cap[0].length);
	      if (cap[0].length > 1) {
	        this.tokens.push({
	          type: 'space'
	        });
	      }
	    }

	    // code
	    if (cap = this.rules.code.exec(src)) {
	      src = src.substring(cap[0].length);
	      cap = cap[0].replace(/^ {4}/gm, '');
	      this.tokens.push({
	        type: 'code',
	        text: !this.options.pedantic
	          ? cap.replace(/\n+$/, '')
	          : cap
	      });
	      continue;
	    }

	    // fences (gfm)
	    if (cap = this.rules.fences.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'code',
	        lang: cap[2],
	        text: cap[3] || ''
	      });
	      continue;
	    }

	    // heading
	    if (cap = this.rules.heading.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'heading',
	        depth: cap[1].length,
	        text: cap[2]
	      });
	      continue;
	    }

	    // table no leading pipe (gfm)
	    if (top && (cap = this.rules.nptable.exec(src))) {
	      src = src.substring(cap[0].length);

	      item = {
	        type: 'table',
	        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	        cells: cap[3].replace(/\n$/, '').split('\n')
	      };

	      for (i = 0; i < item.align.length; i++) {
	        if (/^ *-+: *$/.test(item.align[i])) {
	          item.align[i] = 'right';
	        } else if (/^ *:-+: *$/.test(item.align[i])) {
	          item.align[i] = 'center';
	        } else if (/^ *:-+ *$/.test(item.align[i])) {
	          item.align[i] = 'left';
	        } else {
	          item.align[i] = null;
	        }
	      }

	      for (i = 0; i < item.cells.length; i++) {
	        item.cells[i] = item.cells[i].split(/ *\| */);
	      }

	      this.tokens.push(item);

	      continue;
	    }

	    // lheading
	    if (cap = this.rules.lheading.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'heading',
	        depth: cap[2] === '=' ? 1 : 2,
	        text: cap[1]
	      });
	      continue;
	    }

	    // hr
	    if (cap = this.rules.hr.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'hr'
	      });
	      continue;
	    }

	    // blockquote
	    if (cap = this.rules.blockquote.exec(src)) {
	      src = src.substring(cap[0].length);

	      this.tokens.push({
	        type: 'blockquote_start'
	      });

	      cap = cap[0].replace(/^ *> ?/gm, '');

	      // Pass `top` to keep the current
	      // "toplevel" state. This is exactly
	      // how markdown.pl works.
	      this.token(cap, top, true);

	      this.tokens.push({
	        type: 'blockquote_end'
	      });

	      continue;
	    }

	    // list
	    if (cap = this.rules.list.exec(src)) {
	      src = src.substring(cap[0].length);
	      bull = cap[2];

	      this.tokens.push({
	        type: 'list_start',
	        ordered: bull.length > 1
	      });

	      // Get each top-level item.
	      cap = cap[0].match(this.rules.item);

	      next = false;
	      l = cap.length;
	      i = 0;

	      for (; i < l; i++) {
	        item = cap[i];

	        // Remove the list item's bullet
	        // so it is seen as the next token.
	        space = item.length;
	        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

	        // Outdent whatever the
	        // list item contains. Hacky.
	        if (~item.indexOf('\n ')) {
	          space -= item.length;
	          item = !this.options.pedantic
	            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
	            : item.replace(/^ {1,4}/gm, '');
	        }

	        // Determine whether the next list item belongs here.
	        // Backpedal if it does not belong in this list.
	        if (this.options.smartLists && i !== l - 1) {
	          b = block.bullet.exec(cap[i + 1])[0];
	          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
	            src = cap.slice(i + 1).join('\n') + src;
	            i = l - 1;
	          }
	        }

	        // Determine whether item is loose or not.
	        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
	        // for discount behavior.
	        loose = next || /\n\n(?!\s*$)/.test(item);
	        if (i !== l - 1) {
	          next = item.charAt(item.length - 1) === '\n';
	          if (!loose) loose = next;
	        }

	        this.tokens.push({
	          type: loose
	            ? 'loose_item_start'
	            : 'list_item_start'
	        });

	        // Recurse.
	        this.token(item, false, bq);

	        this.tokens.push({
	          type: 'list_item_end'
	        });
	      }

	      this.tokens.push({
	        type: 'list_end'
	      });

	      continue;
	    }

	    // html
	    if (cap = this.rules.html.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: this.options.sanitize
	          ? 'paragraph'
	          : 'html',
	        pre: !this.options.sanitizer
	          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
	        text: cap[0]
	      });
	      continue;
	    }

	    // def
	    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
	      src = src.substring(cap[0].length);
	      this.tokens.links[cap[1].toLowerCase()] = {
	        href: cap[2],
	        title: cap[3]
	      };
	      continue;
	    }

	    // table (gfm)
	    if (top && (cap = this.rules.table.exec(src))) {
	      src = src.substring(cap[0].length);

	      item = {
	        type: 'table',
	        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
	      };

	      for (i = 0; i < item.align.length; i++) {
	        if (/^ *-+: *$/.test(item.align[i])) {
	          item.align[i] = 'right';
	        } else if (/^ *:-+: *$/.test(item.align[i])) {
	          item.align[i] = 'center';
	        } else if (/^ *:-+ *$/.test(item.align[i])) {
	          item.align[i] = 'left';
	        } else {
	          item.align[i] = null;
	        }
	      }

	      for (i = 0; i < item.cells.length; i++) {
	        item.cells[i] = item.cells[i]
	          .replace(/^ *\| *| *\| *$/g, '')
	          .split(/ *\| */);
	      }

	      this.tokens.push(item);

	      continue;
	    }

	    // top-level paragraph
	    if (top && (cap = this.rules.paragraph.exec(src))) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'paragraph',
	        text: cap[1].charAt(cap[1].length - 1) === '\n'
	          ? cap[1].slice(0, -1)
	          : cap[1]
	      });
	      continue;
	    }

	    // text
	    if (cap = this.rules.text.exec(src)) {
	      // Top-level should never reach here.
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'text',
	        text: cap[0]
	      });
	      continue;
	    }

	    if (src) {
	      throw new
	        Error('Infinite loop on byte: ' + src.charCodeAt(0));
	    }
	  }

	  return this.tokens;
	};

	/**
	 * Inline-Level Grammar
	 */

	var inline = {
	  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
	  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
	  url: noop,
	  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
	  link: /^!?\[(inside)\]\(href\)/,
	  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
	  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
	  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
	  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
	  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
	  br: /^ {2,}\n(?!\s*$)/,
	  del: noop,
	  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
	};

	inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
	inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

	inline.link = replace(inline.link)
	  ('inside', inline._inside)
	  ('href', inline._href)
	  ();

	inline.reflink = replace(inline.reflink)
	  ('inside', inline._inside)
	  ();

	/**
	 * Normal Inline Grammar
	 */

	inline.normal = merge({}, inline);

	/**
	 * Pedantic Inline Grammar
	 */

	inline.pedantic = merge({}, inline.normal, {
	  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
	  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
	});

	/**
	 * GFM Inline Grammar
	 */

	inline.gfm = merge({}, inline.normal, {
	  escape: replace(inline.escape)('])', '~|])')(),
	  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
	  del: /^~~(?=\S)([\s\S]*?\S)~~/,
	  text: replace(inline.text)
	    (']|', '~]|')
	    ('|', '|https?://|')
	    ()
	});

	/**
	 * GFM + Line Breaks Inline Grammar
	 */

	inline.breaks = merge({}, inline.gfm, {
	  br: replace(inline.br)('{2,}', '*')(),
	  text: replace(inline.gfm.text)('{2,}', '*')()
	});

	/**
	 * Inline Lexer & Compiler
	 */

	function InlineLexer(links, options) {
	  this.options = options || marked.defaults;
	  this.links = links;
	  this.rules = inline.normal;
	  this.renderer = this.options.renderer || new Renderer;
	  this.renderer.options = this.options;

	  if (!this.links) {
	    throw new
	      Error('Tokens array requires a `links` property.');
	  }

	  if (this.options.gfm) {
	    if (this.options.breaks) {
	      this.rules = inline.breaks;
	    } else {
	      this.rules = inline.gfm;
	    }
	  } else if (this.options.pedantic) {
	    this.rules = inline.pedantic;
	  }
	}

	/**
	 * Expose Inline Rules
	 */

	InlineLexer.rules = inline;

	/**
	 * Static Lexing/Compiling Method
	 */

	InlineLexer.output = function(src, links, options) {
	  var inline = new InlineLexer(links, options);
	  return inline.output(src);
	};

	/**
	 * Lexing/Compiling
	 */

	InlineLexer.prototype.output = function(src) {
	  var out = ''
	    , link
	    , text
	    , href
	    , cap;

	  while (src) {
	    // escape
	    if (cap = this.rules.escape.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += cap[1];
	      continue;
	    }

	    // autolink
	    if (cap = this.rules.autolink.exec(src)) {
	      src = src.substring(cap[0].length);
	      if (cap[2] === '@') {
	        text = cap[1].charAt(6) === ':'
	          ? this.mangle(cap[1].substring(7))
	          : this.mangle(cap[1]);
	        href = this.mangle('mailto:') + text;
	      } else {
	        text = escape(cap[1]);
	        href = text;
	      }
	      out += this.renderer.link(href, null, text);
	      continue;
	    }

	    // url (gfm)
	    if (!this.inLink && (cap = this.rules.url.exec(src))) {
	      src = src.substring(cap[0].length);
	      text = escape(cap[1]);
	      href = text;
	      out += this.renderer.link(href, null, text);
	      continue;
	    }

	    // tag
	    if (cap = this.rules.tag.exec(src)) {
	      if (!this.inLink && /^<a /i.test(cap[0])) {
	        this.inLink = true;
	      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
	        this.inLink = false;
	      }
	      src = src.substring(cap[0].length);
	      out += this.options.sanitize
	        ? this.options.sanitizer
	          ? this.options.sanitizer(cap[0])
	          : escape(cap[0])
	        : cap[0]
	      continue;
	    }

	    // link
	    if (cap = this.rules.link.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.inLink = true;
	      out += this.outputLink(cap, {
	        href: cap[2],
	        title: cap[3]
	      });
	      this.inLink = false;
	      continue;
	    }

	    // reflink, nolink
	    if ((cap = this.rules.reflink.exec(src))
	        || (cap = this.rules.nolink.exec(src))) {
	      src = src.substring(cap[0].length);
	      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
	      link = this.links[link.toLowerCase()];
	      if (!link || !link.href) {
	        out += cap[0].charAt(0);
	        src = cap[0].substring(1) + src;
	        continue;
	      }
	      this.inLink = true;
	      out += this.outputLink(cap, link);
	      this.inLink = false;
	      continue;
	    }

	    // strong
	    if (cap = this.rules.strong.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.strong(this.output(cap[2] || cap[1]));
	      continue;
	    }

	    // em
	    if (cap = this.rules.em.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.em(this.output(cap[2] || cap[1]));
	      continue;
	    }

	    // code
	    if (cap = this.rules.code.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.codespan(escape(cap[2], true));
	      continue;
	    }

	    // br
	    if (cap = this.rules.br.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.br();
	      continue;
	    }

	    // del (gfm)
	    if (cap = this.rules.del.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.del(this.output(cap[1]));
	      continue;
	    }

	    // text
	    if (cap = this.rules.text.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.text(escape(this.smartypants(cap[0])));
	      continue;
	    }

	    if (src) {
	      throw new
	        Error('Infinite loop on byte: ' + src.charCodeAt(0));
	    }
	  }

	  return out;
	};

	/**
	 * Compile Link
	 */

	InlineLexer.prototype.outputLink = function(cap, link) {
	  var href = escape(link.href)
	    , title = link.title ? escape(link.title) : null;

	  return cap[0].charAt(0) !== '!'
	    ? this.renderer.link(href, title, this.output(cap[1]))
	    : this.renderer.image(href, title, escape(cap[1]));
	};

	/**
	 * Smartypants Transformations
	 */

	InlineLexer.prototype.smartypants = function(text) {
	  if (!this.options.smartypants) return text;
	  return text
	    // em-dashes
	    .replace(/---/g, '\u2014')
	    // en-dashes
	    .replace(/--/g, '\u2013')
	    // opening singles
	    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
	    // closing singles & apostrophes
	    .replace(/'/g, '\u2019')
	    // opening doubles
	    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
	    // closing doubles
	    .replace(/"/g, '\u201d')
	    // ellipses
	    .replace(/\.{3}/g, '\u2026');
	};

	/**
	 * Mangle Links
	 */

	InlineLexer.prototype.mangle = function(text) {
	  if (!this.options.mangle) return text;
	  var out = ''
	    , l = text.length
	    , i = 0
	    , ch;

	  for (; i < l; i++) {
	    ch = text.charCodeAt(i);
	    if (Math.random() > 0.5) {
	      ch = 'x' + ch.toString(16);
	    }
	    out += '&#' + ch + ';';
	  }

	  return out;
	};

	/**
	 * Renderer
	 */

	function Renderer(options) {
	  this.options = options || {};
	}

	Renderer.prototype.code = function(code, lang, escaped) {
	  if (this.options.highlight) {
	    var out = this.options.highlight(code, lang);
	    if (out != null && out !== code) {
	      escaped = true;
	      code = out;
	    }
	  }

	  if (!lang) {
	    return '<pre><code>'
	      + (escaped ? code : escape(code, true))
	      + '\n</code></pre>';
	  }

	  return '<pre><code class="'
	    + this.options.langPrefix
	    + escape(lang, true)
	    + '">'
	    + (escaped ? code : escape(code, true))
	    + '\n</code></pre>\n';
	};

	Renderer.prototype.blockquote = function(quote) {
	  return '<blockquote>\n' + quote + '</blockquote>\n';
	};

	Renderer.prototype.html = function(html) {
	  return html;
	};

	Renderer.prototype.heading = function(text, level, raw) {
	  return '<h'
	    + level
	    + ' id="'
	    + this.options.headerPrefix
	    + raw.toLowerCase().replace(/[^\w]+/g, '-')
	    + '">'
	    + text
	    + '</h'
	    + level
	    + '>\n';
	};

	Renderer.prototype.hr = function() {
	  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
	};

	Renderer.prototype.list = function(body, ordered) {
	  var type = ordered ? 'ol' : 'ul';
	  return '<' + type + '>\n' + body + '</' + type + '>\n';
	};

	Renderer.prototype.listitem = function(text) {
	  return '<li>' + text + '</li>\n';
	};

	Renderer.prototype.paragraph = function(text) {
	  return '<p>' + text + '</p>\n';
	};

	Renderer.prototype.table = function(header, body) {
	  return '<table>\n'
	    + '<thead>\n'
	    + header
	    + '</thead>\n'
	    + '<tbody>\n'
	    + body
	    + '</tbody>\n'
	    + '</table>\n';
	};

	Renderer.prototype.tablerow = function(content) {
	  return '<tr>\n' + content + '</tr>\n';
	};

	Renderer.prototype.tablecell = function(content, flags) {
	  var type = flags.header ? 'th' : 'td';
	  var tag = flags.align
	    ? '<' + type + ' style="text-align:' + flags.align + '">'
	    : '<' + type + '>';
	  return tag + content + '</' + type + '>\n';
	};

	// span level renderer
	Renderer.prototype.strong = function(text) {
	  return '<strong>' + text + '</strong>';
	};

	Renderer.prototype.em = function(text) {
	  return '<em>' + text + '</em>';
	};

	Renderer.prototype.codespan = function(text) {
	  return '<code>' + text + '</code>';
	};

	Renderer.prototype.br = function() {
	  return this.options.xhtml ? '<br/>' : '<br>';
	};

	Renderer.prototype.del = function(text) {
	  return '<del>' + text + '</del>';
	};

	Renderer.prototype.link = function(href, title, text) {
	  if (this.options.sanitize) {
	    try {
	      var prot = decodeURIComponent(unescape(href))
	        .replace(/[^\w:]/g, '')
	        .toLowerCase();
	    } catch (e) {
	      return '';
	    }
	    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
	      return '';
	    }
	  }
	  var out = '<a href="' + href + '"';
	  if (title) {
	    out += ' title="' + title + '"';
	  }
	  out += '>' + text + '</a>';
	  return out;
	};

	Renderer.prototype.image = function(href, title, text) {
	  var out = '<img src="' + href + '" alt="' + text + '"';
	  if (title) {
	    out += ' title="' + title + '"';
	  }
	  out += this.options.xhtml ? '/>' : '>';
	  return out;
	};

	Renderer.prototype.text = function(text) {
	  return text;
	};

	/**
	 * Parsing & Compiling
	 */

	function Parser(options) {
	  this.tokens = [];
	  this.token = null;
	  this.options = options || marked.defaults;
	  this.options.renderer = this.options.renderer || new Renderer;
	  this.renderer = this.options.renderer;
	  this.renderer.options = this.options;
	}

	/**
	 * Static Parse Method
	 */

	Parser.parse = function(src, options, renderer) {
	  var parser = new Parser(options, renderer);
	  return parser.parse(src);
	};

	/**
	 * Parse Loop
	 */

	Parser.prototype.parse = function(src) {
	  this.inline = new InlineLexer(src.links, this.options, this.renderer);
	  this.tokens = src.reverse();

	  var out = '';
	  while (this.next()) {
	    out += this.tok();
	  }

	  return out;
	};

	/**
	 * Next Token
	 */

	Parser.prototype.next = function() {
	  return this.token = this.tokens.pop();
	};

	/**
	 * Preview Next Token
	 */

	Parser.prototype.peek = function() {
	  return this.tokens[this.tokens.length - 1] || 0;
	};

	/**
	 * Parse Text Tokens
	 */

	Parser.prototype.parseText = function() {
	  var body = this.token.text;

	  while (this.peek().type === 'text') {
	    body += '\n' + this.next().text;
	  }

	  return this.inline.output(body);
	};

	/**
	 * Parse Current Token
	 */

	Parser.prototype.tok = function() {
	  switch (this.token.type) {
	    case 'space': {
	      return '';
	    }
	    case 'hr': {
	      return this.renderer.hr();
	    }
	    case 'heading': {
	      return this.renderer.heading(
	        this.inline.output(this.token.text),
	        this.token.depth,
	        this.token.text);
	    }
	    case 'code': {
	      return this.renderer.code(this.token.text,
	        this.token.lang,
	        this.token.escaped);
	    }
	    case 'table': {
	      var header = ''
	        , body = ''
	        , i
	        , row
	        , cell
	        , flags
	        , j;

	      // header
	      cell = '';
	      for (i = 0; i < this.token.header.length; i++) {
	        flags = { header: true, align: this.token.align[i] };
	        cell += this.renderer.tablecell(
	          this.inline.output(this.token.header[i]),
	          { header: true, align: this.token.align[i] }
	        );
	      }
	      header += this.renderer.tablerow(cell);

	      for (i = 0; i < this.token.cells.length; i++) {
	        row = this.token.cells[i];

	        cell = '';
	        for (j = 0; j < row.length; j++) {
	          cell += this.renderer.tablecell(
	            this.inline.output(row[j]),
	            { header: false, align: this.token.align[j] }
	          );
	        }

	        body += this.renderer.tablerow(cell);
	      }
	      return this.renderer.table(header, body);
	    }
	    case 'blockquote_start': {
	      var body = '';

	      while (this.next().type !== 'blockquote_end') {
	        body += this.tok();
	      }

	      return this.renderer.blockquote(body);
	    }
	    case 'list_start': {
	      var body = ''
	        , ordered = this.token.ordered;

	      while (this.next().type !== 'list_end') {
	        body += this.tok();
	      }

	      return this.renderer.list(body, ordered);
	    }
	    case 'list_item_start': {
	      var body = '';

	      while (this.next().type !== 'list_item_end') {
	        body += this.token.type === 'text'
	          ? this.parseText()
	          : this.tok();
	      }

	      return this.renderer.listitem(body);
	    }
	    case 'loose_item_start': {
	      var body = '';

	      while (this.next().type !== 'list_item_end') {
	        body += this.tok();
	      }

	      return this.renderer.listitem(body);
	    }
	    case 'html': {
	      var html = !this.token.pre && !this.options.pedantic
	        ? this.inline.output(this.token.text)
	        : this.token.text;
	      return this.renderer.html(html);
	    }
	    case 'paragraph': {
	      return this.renderer.paragraph(this.inline.output(this.token.text));
	    }
	    case 'text': {
	      return this.renderer.paragraph(this.parseText());
	    }
	  }
	};

	/**
	 * Helpers
	 */

	function escape(html, encode) {
	  return html
	    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#39;');
	}

	function unescape(html) {
		// explicitly match decimal, hex, and named HTML entities 
	  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
	    n = n.toLowerCase();
	    if (n === 'colon') return ':';
	    if (n.charAt(0) === '#') {
	      return n.charAt(1) === 'x'
	        ? String.fromCharCode(parseInt(n.substring(2), 16))
	        : String.fromCharCode(+n.substring(1));
	    }
	    return '';
	  });
	}

	function replace(regex, opt) {
	  regex = regex.source;
	  opt = opt || '';
	  return function self(name, val) {
	    if (!name) return new RegExp(regex, opt);
	    val = val.source || val;
	    val = val.replace(/(^|[^\[])\^/g, '$1');
	    regex = regex.replace(name, val);
	    return self;
	  };
	}

	function noop() {}
	noop.exec = noop;

	function merge(obj) {
	  var i = 1
	    , target
	    , key;

	  for (; i < arguments.length; i++) {
	    target = arguments[i];
	    for (key in target) {
	      if (Object.prototype.hasOwnProperty.call(target, key)) {
	        obj[key] = target[key];
	      }
	    }
	  }

	  return obj;
	}


	/**
	 * Marked
	 */

	function marked(src, opt, callback) {
	  if (callback || typeof opt === 'function') {
	    if (!callback) {
	      callback = opt;
	      opt = null;
	    }

	    opt = merge({}, marked.defaults, opt || {});

	    var highlight = opt.highlight
	      , tokens
	      , pending
	      , i = 0;

	    try {
	      tokens = Lexer.lex(src, opt)
	    } catch (e) {
	      return callback(e);
	    }

	    pending = tokens.length;

	    var done = function(err) {
	      if (err) {
	        opt.highlight = highlight;
	        return callback(err);
	      }

	      var out;

	      try {
	        out = Parser.parse(tokens, opt);
	      } catch (e) {
	        err = e;
	      }

	      opt.highlight = highlight;

	      return err
	        ? callback(err)
	        : callback(null, out);
	    };

	    if (!highlight || highlight.length < 3) {
	      return done();
	    }

	    delete opt.highlight;

	    if (!pending) return done();

	    for (; i < tokens.length; i++) {
	      (function(token) {
	        if (token.type !== 'code') {
	          return --pending || done();
	        }
	        return highlight(token.text, token.lang, function(err, code) {
	          if (err) return done(err);
	          if (code == null || code === token.text) {
	            return --pending || done();
	          }
	          token.text = code;
	          token.escaped = true;
	          --pending || done();
	        });
	      })(tokens[i]);
	    }

	    return;
	  }
	  try {
	    if (opt) opt = merge({}, marked.defaults, opt);
	    return Parser.parse(Lexer.lex(src, opt), opt);
	  } catch (e) {
	    e.message += '\nPlease report this to https://github.com/chjj/marked.';
	    if ((opt || marked.defaults).silent) {
	      return '<p>An error occured:</p><pre>'
	        + escape(e.message + '', true)
	        + '</pre>';
	    }
	    throw e;
	  }
	}

	/**
	 * Options
	 */

	marked.options =
	marked.setOptions = function(opt) {
	  merge(marked.defaults, opt);
	  return marked;
	};

	marked.defaults = {
	  gfm: true,
	  tables: true,
	  breaks: false,
	  pedantic: false,
	  sanitize: false,
	  sanitizer: null,
	  mangle: true,
	  smartLists: false,
	  silent: false,
	  highlight: null,
	  langPrefix: 'lang-',
	  smartypants: false,
	  headerPrefix: '',
	  renderer: new Renderer,
	  xhtml: false
	};

	/**
	 * Expose
	 */

	marked.Parser = Parser;
	marked.parser = Parser.parse;

	marked.Renderer = Renderer;

	marked.Lexer = Lexer;
	marked.lexer = Lexer.lex;

	marked.InlineLexer = InlineLexer;
	marked.inlineLexer = InlineLexer.output;

	marked.parse = marked;

	if (true) {
	  module.exports = marked;
	} else if (typeof define === 'function' && define.amd) {
	  define(function() { return marked; });
	} else {
	  this.marked = marked;
	}

	}).call(function() {
	  return this || (typeof window !== 'undefined' ? window : global);
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 36:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (C) 2006 Google Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * @fileoverview
	 * some functions for browser-side pretty printing of code contained in html.
	 *
	 * <p>
	 * For a fairly comprehensive set of languages see the
	 * <a href="https://github.com/google/code-prettify#for-which-languages-does-it-work">README</a>
	 * file that came with this source.  At a minimum, the lexer should work on a
	 * number of languages including C and friends, Java, Python, Bash, SQL, HTML,
	 * XML, CSS, Javascript, and Makefiles.  It works passably on Ruby, PHP and Awk
	 * and a subset of Perl, but, because of commenting conventions, doesn't work on
	 * Smalltalk, Lisp-like, or CAML-like languages without an explicit lang class.
	 * <p>
	 * Usage: <ol>
	 * <li> include this source file in an html page via
	 *   {@code <script type="text/javascript" src="/path/to/prettify.js"></script>}
	 * <li> define style rules.  See the example page for examples.
	 * <li> mark the {@code <pre>} and {@code <code>} tags in your source with
	 *    {@code class=prettyprint.}
	 *    You can also use the (html deprecated) {@code <xmp>} tag, but the pretty
	 *    printer needs to do more substantial DOM manipulations to support that, so
	 *    some css styles may not be preserved.
	 * </ol>
	 * That's it.  I wanted to keep the API as simple as possible, so there's no
	 * need to specify which language the code is in, but if you wish, you can add
	 * another class to the {@code <pre>} or {@code <code>} element to specify the
	 * language, as in {@code <pre class="prettyprint lang-java">}.  Any class that
	 * starts with "lang-" followed by a file extension, specifies the file type.
	 * See the "lang-*.js" files in this directory for code that implements
	 * per-language file handlers.
	 * <p>
	 * Change log:<br>
	 * cbeust, 2006/08/22
	 * <blockquote>
	 *   Java annotations (start with "@") are now captured as literals ("lit")
	 * </blockquote>
	 * @requires console
	 */

	// JSLint declarations
	/*global console, document, navigator, setTimeout, window, define */


	/**
	 * {@type !{
	 *   'createSimpleLexer': function (Array, Array): (function (JobT)),
	 *   'registerLangHandler': function (function (JobT), Array.<string>),
	 *   'PR_ATTRIB_NAME': string,
	 *   'PR_ATTRIB_NAME': string,
	 *   'PR_ATTRIB_VALUE': string,
	 *   'PR_COMMENT': string,
	 *   'PR_DECLARATION': string,
	 *   'PR_KEYWORD': string,
	 *   'PR_LITERAL': string,
	 *   'PR_NOCODE': string,
	 *   'PR_PLAIN': string,
	 *   'PR_PUNCTUATION': string,
	 *   'PR_SOURCE': string,
	 *   'PR_STRING': string,
	 *   'PR_TAG': string,
	 *   'PR_TYPE': string,
	 *   'prettyPrintOne': function (string, string, number|boolean),
	 *   'prettyPrint': function (?function, ?(HTMLElement|HTMLDocument))
	 * }}
	 * @const
	 */
	/**
	* @typedef {!Array.<number|string>}
	* Alternating indices and the decorations that should be inserted there.
	* The indices are monotonically increasing.
	*/
	var DecorationsT;

	/**
	* @typedef {!{
	*   sourceNode: !Element,
	*   pre: !(number|boolean),
	*   langExtension: ?string,
	*   numberLines: ?(number|boolean),
	*   sourceCode: ?string,
	*   spans: ?(Array.<number|Node>),
	*   basePos: ?number,
	*   decorations: ?DecorationsT
	* }}
	* <dl>
	*  <dt>sourceNode<dd>the element containing the source
	*  <dt>sourceCode<dd>source as plain text
	*  <dt>pre<dd>truthy if white-space in text nodes
	*     should be considered significant.
	*  <dt>spans<dd> alternating span start indices into source
	*     and the text node or element (e.g. {@code <BR>}) corresponding to that
	*     span.
	*  <dt>decorations<dd>an array of style classes preceded
	*     by the position at which they start in job.sourceCode in order
	*  <dt>basePos<dd>integer position of this.sourceCode in the larger chunk of
	*     source.
	* </dl>
	*/
	var JobT;

	/**
	* @typedef {!{
	*   sourceCode: string,
	*   spans: !(Array.<number|Node>)
	* }}
	* <dl>
	*  <dt>sourceCode<dd>source as plain text
	*  <dt>spans<dd> alternating span start indices into source
	*     and the text node or element (e.g. {@code <BR>}) corresponding to that
	*     span.
	* </dl>
	*/
	var SourceSpansT;

	/** @define {boolean} */
	var IN_GLOBAL_SCOPE = false;

	var PR;

	/**
	 * Split {@code prettyPrint} into multiple timeouts so as not to interfere with
	 * UI events.
	 * If set to {@code false}, {@code prettyPrint()} is synchronous.
	 */
	window['PR_SHOULD_USE_CONTINUATION'] = true;

	/**
	 * Pretty print a chunk of code.
	 * @param {string} sourceCodeHtml The HTML to pretty print.
	 * @param {string} opt_langExtension The language name to use.
	 *     Typically, a filename extension like 'cpp' or 'java'.
	 * @param {number|boolean} opt_numberLines True to number lines,
	 *     or the 1-indexed number of the first line in sourceCodeHtml.
	 * @return {string} code as html, but prettier
	 */
	var prettyPrintOne;
	/**
	 * Find all the {@code <pre>} and {@code <code>} tags in the DOM with
	 * {@code class=prettyprint} and prettify them.
	 *
	 * @param {Function} opt_whenDone called when prettifying is done.
	 * @param {HTMLElement|HTMLDocument} opt_root an element or document
	 *   containing all the elements to pretty print.
	 *   Defaults to {@code document.body}.
	 */
	var prettyPrint;


	(function () {
	  var win = window;
	  // Keyword lists for various languages.
	  // We use things that coerce to strings to make them compact when minified
	  // and to defeat aggressive optimizers that fold large string constants.
	  var FLOW_CONTROL_KEYWORDS = ["break,continue,do,else,for,if,return,while"];
	  var C_KEYWORDS = [FLOW_CONTROL_KEYWORDS,"auto,case,char,const,default," +
	      "double,enum,extern,float,goto,inline,int,long,register,short,signed," +
	      "sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"];
	  var COMMON_KEYWORDS = [C_KEYWORDS,"catch,class,delete,false,import," +
	      "new,operator,private,protected,public,this,throw,true,try,typeof"];
	  var CPP_KEYWORDS = [COMMON_KEYWORDS,"alignof,align_union,asm,axiom,bool," +
	      "concept,concept_map,const_cast,constexpr,decltype,delegate," +
	      "dynamic_cast,explicit,export,friend,generic,late_check," +
	      "mutable,namespace,nullptr,property,reinterpret_cast,static_assert," +
	      "static_cast,template,typeid,typename,using,virtual,where"];
	  var JAVA_KEYWORDS = [COMMON_KEYWORDS,
	      "abstract,assert,boolean,byte,extends,finally,final,implements,import," +
	      "instanceof,interface,null,native,package,strictfp,super,synchronized," +
	      "throws,transient"];
	  var CSHARP_KEYWORDS = [COMMON_KEYWORDS,
	      "abstract,as,base,bool,by,byte,checked,decimal,delegate,descending," +
	      "dynamic,event,finally,fixed,foreach,from,group,implicit,in,interface," +
	      "internal,into,is,let,lock,null,object,out,override,orderby,params," +
	      "partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong," +
	      "unchecked,unsafe,ushort,var,virtual,where"];
	  var COFFEE_KEYWORDS = "all,and,by,catch,class,else,extends,false,finally," +
	      "for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then," +
	      "throw,true,try,unless,until,when,while,yes";
	  var JSCRIPT_KEYWORDS = [COMMON_KEYWORDS,
	      "abstract,async,await,constructor,debugger,enum,eval,export,function," +
	      "get,implements,instanceof,interface,let,null,set,undefined,var,with," +
	      "yield,Infinity,NaN"];
	  var PERL_KEYWORDS = "caller,delete,die,do,dump,elsif,eval,exit,foreach,for," +
	      "goto,if,import,last,local,my,next,no,our,print,package,redo,require," +
	      "sub,undef,unless,until,use,wantarray,while,BEGIN,END";
	  var PYTHON_KEYWORDS = [FLOW_CONTROL_KEYWORDS, "and,as,assert,class,def,del," +
	      "elif,except,exec,finally,from,global,import,in,is,lambda," +
	      "nonlocal,not,or,pass,print,raise,try,with,yield," +
	      "False,True,None"];
	  var RUBY_KEYWORDS = [FLOW_CONTROL_KEYWORDS, "alias,and,begin,case,class," +
	      "def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo," +
	      "rescue,retry,self,super,then,true,undef,unless,until,when,yield," +
	      "BEGIN,END"];
	  var SH_KEYWORDS = [FLOW_CONTROL_KEYWORDS, "case,done,elif,esac,eval,fi," +
	      "function,in,local,set,then,until"];
	  var ALL_KEYWORDS = [
	      CPP_KEYWORDS, CSHARP_KEYWORDS, JAVA_KEYWORDS, JSCRIPT_KEYWORDS,
	      PERL_KEYWORDS, PYTHON_KEYWORDS, RUBY_KEYWORDS, SH_KEYWORDS];
	  var C_TYPES = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/;

	  // token style names.  correspond to css classes
	  /**
	   * token style for a string literal
	   * @const
	   */
	  var PR_STRING = 'str';
	  /**
	   * token style for a keyword
	   * @const
	   */
	  var PR_KEYWORD = 'kwd';
	  /**
	   * token style for a comment
	   * @const
	   */
	  var PR_COMMENT = 'com';
	  /**
	   * token style for a type
	   * @const
	   */
	  var PR_TYPE = 'typ';
	  /**
	   * token style for a literal value.  e.g. 1, null, true.
	   * @const
	   */
	  var PR_LITERAL = 'lit';
	  /**
	   * token style for a punctuation string.
	   * @const
	   */
	  var PR_PUNCTUATION = 'pun';
	  /**
	   * token style for plain text.
	   * @const
	   */
	  var PR_PLAIN = 'pln';

	  /**
	   * token style for an sgml tag.
	   * @const
	   */
	  var PR_TAG = 'tag';
	  /**
	   * token style for a markup declaration such as a DOCTYPE.
	   * @const
	   */
	  var PR_DECLARATION = 'dec';
	  /**
	   * token style for embedded source.
	   * @const
	   */
	  var PR_SOURCE = 'src';
	  /**
	   * token style for an sgml attribute name.
	   * @const
	   */
	  var PR_ATTRIB_NAME = 'atn';
	  /**
	   * token style for an sgml attribute value.
	   * @const
	   */
	  var PR_ATTRIB_VALUE = 'atv';

	  /**
	   * A class that indicates a section of markup that is not code, e.g. to allow
	   * embedding of line numbers within code listings.
	   * @const
	   */
	  var PR_NOCODE = 'nocode';

	  
	  
	  /**
	   * A set of tokens that can precede a regular expression literal in
	   * javascript
	   * http://web.archive.org/web/20070717142515/http://www.mozilla.org/js/language/js20/rationale/syntax.html
	   * has the full list, but I've removed ones that might be problematic when
	   * seen in languages that don't support regular expression literals.
	   *
	   * <p>Specifically, I've removed any keywords that can't precede a regexp
	   * literal in a syntactically legal javascript program, and I've removed the
	   * "in" keyword since it's not a keyword in many languages, and might be used
	   * as a count of inches.
	   *
	   * <p>The link above does not accurately describe EcmaScript rules since
	   * it fails to distinguish between (a=++/b/i) and (a++/b/i) but it works
	   * very well in practice.
	   *
	   * @private
	   * @const
	   */
	  var REGEXP_PRECEDER_PATTERN = '(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*';
	  
	  // CAVEAT: this does not properly handle the case where a regular
	  // expression immediately follows another since a regular expression may
	  // have flags for case-sensitivity and the like.  Having regexp tokens
	  // adjacent is not valid in any language I'm aware of, so I'm punting.
	  // TODO: maybe style special characters inside a regexp as punctuation.

	  /**
	   * Given a group of {@link RegExp}s, returns a {@code RegExp} that globally
	   * matches the union of the sets of strings matched by the input RegExp.
	   * Since it matches globally, if the input strings have a start-of-input
	   * anchor (/^.../), it is ignored for the purposes of unioning.
	   * @param {Array.<RegExp>} regexs non multiline, non-global regexs.
	   * @return {RegExp} a global regex.
	   */
	  function combinePrefixPatterns(regexs) {
	    var capturedGroupIndex = 0;
	  
	    var needToFoldCase = false;
	    var ignoreCase = false;
	    for (var i = 0, n = regexs.length; i < n; ++i) {
	      var regex = regexs[i];
	      if (regex.ignoreCase) {
	        ignoreCase = true;
	      } else if (/[a-z]/i.test(regex.source.replace(
	                     /\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ''))) {
	        needToFoldCase = true;
	        ignoreCase = false;
	        break;
	      }
	    }
	  
	    var escapeCharToCodeUnit = {
	      'b': 8,
	      't': 9,
	      'n': 0xa,
	      'v': 0xb,
	      'f': 0xc,
	      'r': 0xd
	    };
	  
	    function decodeEscape(charsetPart) {
	      var cc0 = charsetPart.charCodeAt(0);
	      if (cc0 !== 92 /* \\ */) {
	        return cc0;
	      }
	      var c1 = charsetPart.charAt(1);
	      cc0 = escapeCharToCodeUnit[c1];
	      if (cc0) {
	        return cc0;
	      } else if ('0' <= c1 && c1 <= '7') {
	        return parseInt(charsetPart.substring(1), 8);
	      } else if (c1 === 'u' || c1 === 'x') {
	        return parseInt(charsetPart.substring(2), 16);
	      } else {
	        return charsetPart.charCodeAt(1);
	      }
	    }
	  
	    function encodeEscape(charCode) {
	      if (charCode < 0x20) {
	        return (charCode < 0x10 ? '\\x0' : '\\x') + charCode.toString(16);
	      }
	      var ch = String.fromCharCode(charCode);
	      return (ch === '\\' || ch === '-' || ch === ']' || ch === '^')
	          ? "\\" + ch : ch;
	    }
	  
	    function caseFoldCharset(charSet) {
	      var charsetParts = charSet.substring(1, charSet.length - 1).match(
	          new RegExp(
	              '\\\\u[0-9A-Fa-f]{4}'
	              + '|\\\\x[0-9A-Fa-f]{2}'
	              + '|\\\\[0-3][0-7]{0,2}'
	              + '|\\\\[0-7]{1,2}'
	              + '|\\\\[\\s\\S]'
	              + '|-'
	              + '|[^-\\\\]',
	              'g'));
	      var ranges = [];
	      var inverse = charsetParts[0] === '^';
	  
	      var out = ['['];
	      if (inverse) { out.push('^'); }
	  
	      for (var i = inverse ? 1 : 0, n = charsetParts.length; i < n; ++i) {
	        var p = charsetParts[i];
	        if (/\\[bdsw]/i.test(p)) {  // Don't muck with named groups.
	          out.push(p);
	        } else {
	          var start = decodeEscape(p);
	          var end;
	          if (i + 2 < n && '-' === charsetParts[i + 1]) {
	            end = decodeEscape(charsetParts[i + 2]);
	            i += 2;
	          } else {
	            end = start;
	          }
	          ranges.push([start, end]);
	          // If the range might intersect letters, then expand it.
	          // This case handling is too simplistic.
	          // It does not deal with non-latin case folding.
	          // It works for latin source code identifiers though.
	          if (!(end < 65 || start > 122)) {
	            if (!(end < 65 || start > 90)) {
	              ranges.push([Math.max(65, start) | 32, Math.min(end, 90) | 32]);
	            }
	            if (!(end < 97 || start > 122)) {
	              ranges.push([Math.max(97, start) & ~32, Math.min(end, 122) & ~32]);
	            }
	          }
	        }
	      }
	  
	      // [[1, 10], [3, 4], [8, 12], [14, 14], [16, 16], [17, 17]]
	      // -> [[1, 12], [14, 14], [16, 17]]
	      ranges.sort(function (a, b) { return (a[0] - b[0]) || (b[1]  - a[1]); });
	      var consolidatedRanges = [];
	      var lastRange = [];
	      for (var i = 0; i < ranges.length; ++i) {
	        var range = ranges[i];
	        if (range[0] <= lastRange[1] + 1) {
	          lastRange[1] = Math.max(lastRange[1], range[1]);
	        } else {
	          consolidatedRanges.push(lastRange = range);
	        }
	      }
	  
	      for (var i = 0; i < consolidatedRanges.length; ++i) {
	        var range = consolidatedRanges[i];
	        out.push(encodeEscape(range[0]));
	        if (range[1] > range[0]) {
	          if (range[1] + 1 > range[0]) { out.push('-'); }
	          out.push(encodeEscape(range[1]));
	        }
	      }
	      out.push(']');
	      return out.join('');
	    }
	  
	    function allowAnywhereFoldCaseAndRenumberGroups(regex) {
	      // Split into character sets, escape sequences, punctuation strings
	      // like ('(', '(?:', ')', '^'), and runs of characters that do not
	      // include any of the above.
	      var parts = regex.source.match(
	          new RegExp(
	              '(?:'
	              + '\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]'  // a character set
	              + '|\\\\u[A-Fa-f0-9]{4}'  // a unicode escape
	              + '|\\\\x[A-Fa-f0-9]{2}'  // a hex escape
	              + '|\\\\[0-9]+'  // a back-reference or octal escape
	              + '|\\\\[^ux0-9]'  // other escape sequence
	              + '|\\(\\?[:!=]'  // start of a non-capturing group
	              + '|[\\(\\)\\^]'  // start/end of a group, or line start
	              + '|[^\\x5B\\x5C\\(\\)\\^]+'  // run of other characters
	              + ')',
	              'g'));
	      var n = parts.length;
	  
	      // Maps captured group numbers to the number they will occupy in
	      // the output or to -1 if that has not been determined, or to
	      // undefined if they need not be capturing in the output.
	      var capturedGroups = [];
	  
	      // Walk over and identify back references to build the capturedGroups
	      // mapping.
	      for (var i = 0, groupIndex = 0; i < n; ++i) {
	        var p = parts[i];
	        if (p === '(') {
	          // groups are 1-indexed, so max group index is count of '('
	          ++groupIndex;
	        } else if ('\\' === p.charAt(0)) {
	          var decimalValue = +p.substring(1);
	          if (decimalValue) {
	            if (decimalValue <= groupIndex) {
	              capturedGroups[decimalValue] = -1;
	            } else {
	              // Replace with an unambiguous escape sequence so that
	              // an octal escape sequence does not turn into a backreference
	              // to a capturing group from an earlier regex.
	              parts[i] = encodeEscape(decimalValue);
	            }
	          }
	        }
	      }
	  
	      // Renumber groups and reduce capturing groups to non-capturing groups
	      // where possible.
	      for (var i = 1; i < capturedGroups.length; ++i) {
	        if (-1 === capturedGroups[i]) {
	          capturedGroups[i] = ++capturedGroupIndex;
	        }
	      }
	      for (var i = 0, groupIndex = 0; i < n; ++i) {
	        var p = parts[i];
	        if (p === '(') {
	          ++groupIndex;
	          if (!capturedGroups[groupIndex]) {
	            parts[i] = '(?:';
	          }
	        } else if ('\\' === p.charAt(0)) {
	          var decimalValue = +p.substring(1);
	          if (decimalValue && decimalValue <= groupIndex) {
	            parts[i] = '\\' + capturedGroups[decimalValue];
	          }
	        }
	      }
	  
	      // Remove any prefix anchors so that the output will match anywhere.
	      // ^^ really does mean an anchored match though.
	      for (var i = 0; i < n; ++i) {
	        if ('^' === parts[i] && '^' !== parts[i + 1]) { parts[i] = ''; }
	      }
	  
	      // Expand letters to groups to handle mixing of case-sensitive and
	      // case-insensitive patterns if necessary.
	      if (regex.ignoreCase && needToFoldCase) {
	        for (var i = 0; i < n; ++i) {
	          var p = parts[i];
	          var ch0 = p.charAt(0);
	          if (p.length >= 2 && ch0 === '[') {
	            parts[i] = caseFoldCharset(p);
	          } else if (ch0 !== '\\') {
	            // TODO: handle letters in numeric escapes.
	            parts[i] = p.replace(
	                /[a-zA-Z]/g,
	                function (ch) {
	                  var cc = ch.charCodeAt(0);
	                  return '[' + String.fromCharCode(cc & ~32, cc | 32) + ']';
	                });
	          }
	        }
	      }
	  
	      return parts.join('');
	    }
	  
	    var rewritten = [];
	    for (var i = 0, n = regexs.length; i < n; ++i) {
	      var regex = regexs[i];
	      if (regex.global || regex.multiline) { throw new Error('' + regex); }
	      rewritten.push(
	          '(?:' + allowAnywhereFoldCaseAndRenumberGroups(regex) + ')');
	    }
	  
	    return new RegExp(rewritten.join('|'), ignoreCase ? 'gi' : 'g');
	  }

	  /**
	   * Split markup into a string of source code and an array mapping ranges in
	   * that string to the text nodes in which they appear.
	   *
	   * <p>
	   * The HTML DOM structure:</p>
	   * <pre>
	   * (Element   "p"
	   *   (Element "b"
	   *     (Text  "print "))       ; #1
	   *   (Text    "'Hello '")      ; #2
	   *   (Element "br")            ; #3
	   *   (Text    "  + 'World';")) ; #4
	   * </pre>
	   * <p>
	   * corresponds to the HTML
	   * {@code <p><b>print </b>'Hello '<br>  + 'World';</p>}.</p>
	   *
	   * <p>
	   * It will produce the output:</p>
	   * <pre>
	   * {
	   *   sourceCode: "print 'Hello '\n  + 'World';",
	   *   //                     1          2
	   *   //           012345678901234 5678901234567
	   *   spans: [0, #1, 6, #2, 14, #3, 15, #4]
	   * }
	   * </pre>
	   * <p>
	   * where #1 is a reference to the {@code "print "} text node above, and so
	   * on for the other text nodes.
	   * </p>
	   *
	   * <p>
	   * The {@code} spans array is an array of pairs.  Even elements are the start
	   * indices of substrings, and odd elements are the text nodes (or BR elements)
	   * that contain the text for those substrings.
	   * Substrings continue until the next index or the end of the source.
	   * </p>
	   *
	   * @param {Node} node an HTML DOM subtree containing source-code.
	   * @param {boolean|number} isPreformatted truthy if white-space in
	   *    text nodes should be considered significant.
	   * @return {SourceSpansT} source code and the nodes in which they occur.
	   */
	  function extractSourceSpans(node, isPreformatted) {
	    var nocode = /(?:^|\s)nocode(?:\s|$)/;
	  
	    var chunks = [];
	    var length = 0;
	    var spans = [];
	    var k = 0;
	  
	    function walk(node) {
	      var type = node.nodeType;
	      if (type == 1) {  // Element
	        if (nocode.test(node.className)) { return; }
	        for (var child = node.firstChild; child; child = child.nextSibling) {
	          walk(child);
	        }
	        var nodeName = node.nodeName.toLowerCase();
	        if ('br' === nodeName || 'li' === nodeName) {
	          chunks[k] = '\n';
	          spans[k << 1] = length++;
	          spans[(k++ << 1) | 1] = node;
	        }
	      } else if (type == 3 || type == 4) {  // Text
	        var text = node.nodeValue;
	        if (text.length) {
	          if (!isPreformatted) {
	            text = text.replace(/[ \t\r\n]+/g, ' ');
	          } else {
	            text = text.replace(/\r\n?/g, '\n');  // Normalize newlines.
	          }
	          // TODO: handle tabs here?
	          chunks[k] = text;
	          spans[k << 1] = length;
	          length += text.length;
	          spans[(k++ << 1) | 1] = node;
	        }
	      }
	    }
	  
	    walk(node);
	  
	    return {
	      sourceCode: chunks.join('').replace(/\n$/, ''),
	      spans: spans
	    };
	  }

	  /**
	   * Apply the given language handler to sourceCode and add the resulting
	   * decorations to out.
	   * @param {!Element} sourceNode
	   * @param {number} basePos the index of sourceCode within the chunk of source
	   *    whose decorations are already present on out.
	   * @param {string} sourceCode
	   * @param {function(JobT)} langHandler
	   * @param {DecorationsT} out
	   */
	  function appendDecorations(
	      sourceNode, basePos, sourceCode, langHandler, out) {
	    if (!sourceCode) { return; }
	    /** @type {JobT} */
	    var job = {
	      sourceNode: sourceNode,
	      pre: 1,
	      langExtension: null,
	      numberLines: null,
	      sourceCode: sourceCode,
	      spans: null,
	      basePos: basePos,
	      decorations: null
	    };
	    langHandler(job);
	    out.push.apply(out, job.decorations);
	  }

	  var notWs = /\S/;

	  /**
	   * Given an element, if it contains only one child element and any text nodes
	   * it contains contain only space characters, return the sole child element.
	   * Otherwise returns undefined.
	   * <p>
	   * This is meant to return the CODE element in {@code <pre><code ...>} when
	   * there is a single child element that contains all the non-space textual
	   * content, but not to return anything where there are multiple child elements
	   * as in {@code <pre><code>...</code><code>...</code></pre>} or when there
	   * is textual content.
	   */
	  function childContentWrapper(element) {
	    var wrapper = undefined;
	    for (var c = element.firstChild; c; c = c.nextSibling) {
	      var type = c.nodeType;
	      wrapper = (type === 1)  // Element Node
	          ? (wrapper ? element : c)
	          : (type === 3)  // Text Node
	          ? (notWs.test(c.nodeValue) ? element : wrapper)
	          : wrapper;
	    }
	    return wrapper === element ? undefined : wrapper;
	  }

	  /** Given triples of [style, pattern, context] returns a lexing function,
	    * The lexing function interprets the patterns to find token boundaries and
	    * returns a decoration list of the form
	    * [index_0, style_0, index_1, style_1, ..., index_n, style_n]
	    * where index_n is an index into the sourceCode, and style_n is a style
	    * constant like PR_PLAIN.  index_n-1 <= index_n, and style_n-1 applies to
	    * all characters in sourceCode[index_n-1:index_n].
	    *
	    * The stylePatterns is a list whose elements have the form
	    * [style : string, pattern : RegExp, DEPRECATED, shortcut : string].
	    *
	    * Style is a style constant like PR_PLAIN, or can be a string of the
	    * form 'lang-FOO', where FOO is a language extension describing the
	    * language of the portion of the token in $1 after pattern executes.
	    * E.g., if style is 'lang-lisp', and group 1 contains the text
	    * '(hello (world))', then that portion of the token will be passed to the
	    * registered lisp handler for formatting.
	    * The text before and after group 1 will be restyled using this decorator
	    * so decorators should take care that this doesn't result in infinite
	    * recursion.  For example, the HTML lexer rule for SCRIPT elements looks
	    * something like ['lang-js', /<[s]cript>(.+?)<\/script>/].  This may match
	    * '<script>foo()<\/script>', which would cause the current decorator to
	    * be called with '<script>' which would not match the same rule since
	    * group 1 must not be empty, so it would be instead styled as PR_TAG by
	    * the generic tag rule.  The handler registered for the 'js' extension would
	    * then be called with 'foo()', and finally, the current decorator would
	    * be called with '<\/script>' which would not match the original rule and
	    * so the generic tag rule would identify it as a tag.
	    *
	    * Pattern must only match prefixes, and if it matches a prefix, then that
	    * match is considered a token with the same style.
	    *
	    * Context is applied to the last non-whitespace, non-comment token
	    * recognized.
	    *
	    * Shortcut is an optional string of characters, any of which, if the first
	    * character, gurantee that this pattern and only this pattern matches.
	    *
	    * @param {Array} shortcutStylePatterns patterns that always start with
	    *   a known character.  Must have a shortcut string.
	    * @param {Array} fallthroughStylePatterns patterns that will be tried in
	    *   order if the shortcut ones fail.  May have shortcuts.
	    *
	    * @return {function (JobT)} a function that takes an undecorated job and
	    *   attaches a list of decorations.
	    */
	  function createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns) {
	    var shortcuts = {};
	    var tokenizer;
	    (function () {
	      var allPatterns = shortcutStylePatterns.concat(fallthroughStylePatterns);
	      var allRegexs = [];
	      var regexKeys = {};
	      for (var i = 0, n = allPatterns.length; i < n; ++i) {
	        var patternParts = allPatterns[i];
	        var shortcutChars = patternParts[3];
	        if (shortcutChars) {
	          for (var c = shortcutChars.length; --c >= 0;) {
	            shortcuts[shortcutChars.charAt(c)] = patternParts;
	          }
	        }
	        var regex = patternParts[1];
	        var k = '' + regex;
	        if (!regexKeys.hasOwnProperty(k)) {
	          allRegexs.push(regex);
	          regexKeys[k] = null;
	        }
	      }
	      allRegexs.push(/[\0-\uffff]/);
	      tokenizer = combinePrefixPatterns(allRegexs);
	    })();

	    var nPatterns = fallthroughStylePatterns.length;

	    /**
	     * Lexes job.sourceCode and attaches an output array job.decorations of
	     * style classes preceded by the position at which they start in
	     * job.sourceCode in order.
	     *
	     * @type{function (JobT)}
	     */
	    var decorate = function (job) {
	      var sourceCode = job.sourceCode, basePos = job.basePos;
	      var sourceNode = job.sourceNode;
	      /** Even entries are positions in source in ascending order.  Odd enties
	        * are style markers (e.g., PR_COMMENT) that run from that position until
	        * the end.
	        * @type {DecorationsT}
	        */
	      var decorations = [basePos, PR_PLAIN];
	      var pos = 0;  // index into sourceCode
	      var tokens = sourceCode.match(tokenizer) || [];
	      var styleCache = {};

	      for (var ti = 0, nTokens = tokens.length; ti < nTokens; ++ti) {
	        var token = tokens[ti];
	        var style = styleCache[token];
	        var match = void 0;

	        var isEmbedded;
	        if (typeof style === 'string') {
	          isEmbedded = false;
	        } else {
	          var patternParts = shortcuts[token.charAt(0)];
	          if (patternParts) {
	            match = token.match(patternParts[1]);
	            style = patternParts[0];
	          } else {
	            for (var i = 0; i < nPatterns; ++i) {
	              patternParts = fallthroughStylePatterns[i];
	              match = token.match(patternParts[1]);
	              if (match) {
	                style = patternParts[0];
	                break;
	              }
	            }

	            if (!match) {  // make sure that we make progress
	              style = PR_PLAIN;
	            }
	          }

	          isEmbedded = style.length >= 5 && 'lang-' === style.substring(0, 5);
	          if (isEmbedded && !(match && typeof match[1] === 'string')) {
	            isEmbedded = false;
	            style = PR_SOURCE;
	          }

	          if (!isEmbedded) { styleCache[token] = style; }
	        }

	        var tokenStart = pos;
	        pos += token.length;

	        if (!isEmbedded) {
	          decorations.push(basePos + tokenStart, style);
	        } else {  // Treat group 1 as an embedded block of source code.
	          var embeddedSource = match[1];
	          var embeddedSourceStart = token.indexOf(embeddedSource);
	          var embeddedSourceEnd = embeddedSourceStart + embeddedSource.length;
	          if (match[2]) {
	            // If embeddedSource can be blank, then it would match at the
	            // beginning which would cause us to infinitely recurse on the
	            // entire token, so we catch the right context in match[2].
	            embeddedSourceEnd = token.length - match[2].length;
	            embeddedSourceStart = embeddedSourceEnd - embeddedSource.length;
	          }
	          var lang = style.substring(5);
	          // Decorate the left of the embedded source
	          appendDecorations(
	              sourceNode,
	              basePos + tokenStart,
	              token.substring(0, embeddedSourceStart),
	              decorate, decorations);
	          // Decorate the embedded source
	          appendDecorations(
	              sourceNode,
	              basePos + tokenStart + embeddedSourceStart,
	              embeddedSource,
	              langHandlerForExtension(lang, embeddedSource),
	              decorations);
	          // Decorate the right of the embedded section
	          appendDecorations(
	              sourceNode,
	              basePos + tokenStart + embeddedSourceEnd,
	              token.substring(embeddedSourceEnd),
	              decorate, decorations);
	        }
	      }
	      job.decorations = decorations;
	    };
	    return decorate;
	  }

	  /** returns a function that produces a list of decorations from source text.
	    *
	    * This code treats ", ', and ` as string delimiters, and \ as a string
	    * escape.  It does not recognize perl's qq() style strings.
	    * It has no special handling for double delimiter escapes as in basic, or
	    * the tripled delimiters used in python, but should work on those regardless
	    * although in those cases a single string literal may be broken up into
	    * multiple adjacent string literals.
	    *
	    * It recognizes C, C++, and shell style comments.
	    *
	    * @param {Object} options a set of optional parameters.
	    * @return {function (JobT)} a function that examines the source code
	    *     in the input job and builds a decoration list which it attaches to
	    *     the job.
	    */
	  function sourceDecorator(options) {
	    var shortcutStylePatterns = [], fallthroughStylePatterns = [];
	    if (options['tripleQuotedStrings']) {
	      // '''multi-line-string''', 'single-line-string', and double-quoted
	      shortcutStylePatterns.push(
	          [PR_STRING,  /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
	           null, '\'"']);
	    } else if (options['multiLineStrings']) {
	      // 'multi-line-string', "multi-line-string"
	      shortcutStylePatterns.push(
	          [PR_STRING,  /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,
	           null, '\'"`']);
	    } else {
	      // 'single-line-string', "single-line-string"
	      shortcutStylePatterns.push(
	          [PR_STRING,
	           /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,
	           null, '"\'']);
	    }
	    if (options['verbatimStrings']) {
	      // verbatim-string-literal production from the C# grammar.  See issue 93.
	      fallthroughStylePatterns.push(
	          [PR_STRING, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
	    }
	    var hc = options['hashComments'];
	    if (hc) {
	      if (options['cStyleComments']) {
	        if (hc > 1) {  // multiline hash comments
	          shortcutStylePatterns.push(
	              [PR_COMMENT, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, '#']);
	        } else {
	          // Stop C preprocessor declarations at an unclosed open comment
	          shortcutStylePatterns.push(
	              [PR_COMMENT, /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,
	               null, '#']);
	        }
	        // #include <stdio.h>
	        fallthroughStylePatterns.push(
	            [PR_STRING,
	             /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,
	             null]);
	      } else {
	        shortcutStylePatterns.push([PR_COMMENT, /^#[^\r\n]*/, null, '#']);
	      }
	    }
	    if (options['cStyleComments']) {
	      fallthroughStylePatterns.push([PR_COMMENT, /^\/\/[^\r\n]*/, null]);
	      fallthroughStylePatterns.push(
	          [PR_COMMENT, /^\/\*[\s\S]*?(?:\*\/|$)/, null]);
	    }
	    var regexLiterals = options['regexLiterals'];
	    if (regexLiterals) {
	      /**
	       * @const
	       */
	      var regexExcls = regexLiterals > 1
	        ? ''  // Multiline regex literals
	        : '\n\r';
	      /**
	       * @const
	       */
	      var regexAny = regexExcls ? '.' : '[\\S\\s]';
	      /**
	       * @const
	       */
	      var REGEX_LITERAL = (
	          // A regular expression literal starts with a slash that is
	          // not followed by * or / so that it is not confused with
	          // comments.
	          '/(?=[^/*' + regexExcls + '])'
	          // and then contains any number of raw characters,
	          + '(?:[^/\\x5B\\x5C' + regexExcls + ']'
	          // escape sequences (\x5C),
	          +    '|\\x5C' + regexAny
	          // or non-nesting character sets (\x5B\x5D);
	          +    '|\\x5B(?:[^\\x5C\\x5D' + regexExcls + ']'
	          +             '|\\x5C' + regexAny + ')*(?:\\x5D|$))+'
	          // finally closed by a /.
	          + '/');
	      fallthroughStylePatterns.push(
	          ['lang-regex',
	           RegExp('^' + REGEXP_PRECEDER_PATTERN + '(' + REGEX_LITERAL + ')')
	           ]);
	    }

	    var types = options['types'];
	    if (types) {
	      fallthroughStylePatterns.push([PR_TYPE, types]);
	    }

	    var keywords = ("" + options['keywords']).replace(/^ | $/g, '');
	    if (keywords.length) {
	      fallthroughStylePatterns.push(
	          [PR_KEYWORD,
	           new RegExp('^(?:' + keywords.replace(/[\s,]+/g, '|') + ')\\b'),
	           null]);
	    }

	    shortcutStylePatterns.push([PR_PLAIN,       /^\s+/, null, ' \r\n\t\xA0']);

	    var punctuation =
	      // The Bash man page says

	      // A word is a sequence of characters considered as a single
	      // unit by GRUB. Words are separated by metacharacters,
	      // which are the following plus space, tab, and newline: { }
	      // | & $ ; < >
	      // ...

	      // A word beginning with # causes that word and all remaining
	      // characters on that line to be ignored.

	      // which means that only a '#' after /(?:^|[{}|&$;<>\s])/ starts a
	      // comment but empirically
	      // $ echo {#}
	      // {#}
	      // $ echo \$#
	      // $#
	      // $ echo }#
	      // }#

	      // so /(?:^|[|&;<>\s])/ is more appropriate.

	      // http://gcc.gnu.org/onlinedocs/gcc-2.95.3/cpp_1.html#SEC3
	      // suggests that this definition is compatible with a
	      // default mode that tries to use a single token definition
	      // to recognize both bash/python style comments and C
	      // preprocessor directives.

	      // This definition of punctuation does not include # in the list of
	      // follow-on exclusions, so # will not be broken before if preceeded
	      // by a punctuation character.  We could try to exclude # after
	      // [|&;<>] but that doesn't seem to cause many major problems.
	      // If that does turn out to be a problem, we should change the below
	      // when hc is truthy to include # in the run of punctuation characters
	      // only when not followint [|&;<>].
	      '^.[^\\s\\w.$@\'"`/\\\\]*';
	    if (options['regexLiterals']) {
	      punctuation += '(?!\s*\/)';
	    }

	    fallthroughStylePatterns.push(
	        // TODO(mikesamuel): recognize non-latin letters and numerals in idents
	        [PR_LITERAL,     /^@[a-z_$][a-z_$@0-9]*/i, null],
	        [PR_TYPE,        /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null],
	        [PR_PLAIN,       /^[a-z_$][a-z_$@0-9]*/i, null],
	        [PR_LITERAL,
	         new RegExp(
	             '^(?:'
	             // A hex number
	             + '0x[a-f0-9]+'
	             // or an octal or decimal number,
	             + '|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)'
	             // possibly in scientific notation
	             + '(?:e[+\\-]?\\d+)?'
	             + ')'
	             // with an optional modifier like UL for unsigned long
	             + '[a-z]*', 'i'),
	         null, '0123456789'],
	        // Don't treat escaped quotes in bash as starting strings.
	        // See issue 144.
	        [PR_PLAIN,       /^\\[\s\S]?/, null],
	        [PR_PUNCTUATION, new RegExp(punctuation), null]);

	    return createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns);
	  }

	  var decorateSource = sourceDecorator({
	        'keywords': ALL_KEYWORDS,
	        'hashComments': true,
	        'cStyleComments': true,
	        'multiLineStrings': true,
	        'regexLiterals': true
	      });

	  /**
	   * Given a DOM subtree, wraps it in a list, and puts each line into its own
	   * list item.
	   *
	   * @param {Node} node modified in place.  Its content is pulled into an
	   *     HTMLOListElement, and each line is moved into a separate list item.
	   *     This requires cloning elements, so the input might not have unique
	   *     IDs after numbering.
	   * @param {number|null|boolean} startLineNum
	   *     If truthy, coerced to an integer which is the 1-indexed line number
	   *     of the first line of code.  The number of the first line will be
	   *     attached to the list.
	   * @param {boolean} isPreformatted true iff white-space in text nodes should
	   *     be treated as significant.
	   */
	  function numberLines(node, startLineNum, isPreformatted) {
	    var nocode = /(?:^|\s)nocode(?:\s|$)/;
	    var lineBreak = /\r\n?|\n/;
	  
	    var document = node.ownerDocument;
	  
	    var li = document.createElement('li');
	    while (node.firstChild) {
	      li.appendChild(node.firstChild);
	    }
	    // An array of lines.  We split below, so this is initialized to one
	    // un-split line.
	    var listItems = [li];
	  
	    function walk(node) {
	      var type = node.nodeType;
	      if (type == 1 && !nocode.test(node.className)) {  // Element
	        if ('br' === node.nodeName) {
	          breakAfter(node);
	          // Discard the <BR> since it is now flush against a </LI>.
	          if (node.parentNode) {
	            node.parentNode.removeChild(node);
	          }
	        } else {
	          for (var child = node.firstChild; child; child = child.nextSibling) {
	            walk(child);
	          }
	        }
	      } else if ((type == 3 || type == 4) && isPreformatted) {  // Text
	        var text = node.nodeValue;
	        var match = text.match(lineBreak);
	        if (match) {
	          var firstLine = text.substring(0, match.index);
	          node.nodeValue = firstLine;
	          var tail = text.substring(match.index + match[0].length);
	          if (tail) {
	            var parent = node.parentNode;
	            parent.insertBefore(
	              document.createTextNode(tail), node.nextSibling);
	          }
	          breakAfter(node);
	          if (!firstLine) {
	            // Don't leave blank text nodes in the DOM.
	            node.parentNode.removeChild(node);
	          }
	        }
	      }
	    }
	  
	    // Split a line after the given node.
	    function breakAfter(lineEndNode) {
	      // If there's nothing to the right, then we can skip ending the line
	      // here, and move root-wards since splitting just before an end-tag
	      // would require us to create a bunch of empty copies.
	      while (!lineEndNode.nextSibling) {
	        lineEndNode = lineEndNode.parentNode;
	        if (!lineEndNode) { return; }
	      }
	  
	      function breakLeftOf(limit, copy) {
	        // Clone shallowly if this node needs to be on both sides of the break.
	        var rightSide = copy ? limit.cloneNode(false) : limit;
	        var parent = limit.parentNode;
	        if (parent) {
	          // We clone the parent chain.
	          // This helps us resurrect important styling elements that cross lines.
	          // E.g. in <i>Foo<br>Bar</i>
	          // should be rewritten to <li><i>Foo</i></li><li><i>Bar</i></li>.
	          var parentClone = breakLeftOf(parent, 1);
	          // Move the clone and everything to the right of the original
	          // onto the cloned parent.
	          var next = limit.nextSibling;
	          parentClone.appendChild(rightSide);
	          for (var sibling = next; sibling; sibling = next) {
	            next = sibling.nextSibling;
	            parentClone.appendChild(sibling);
	          }
	        }
	        return rightSide;
	      }
	  
	      var copiedListItem = breakLeftOf(lineEndNode.nextSibling, 0);
	  
	      // Walk the parent chain until we reach an unattached LI.
	      for (var parent;
	           // Check nodeType since IE invents document fragments.
	           (parent = copiedListItem.parentNode) && parent.nodeType === 1;) {
	        copiedListItem = parent;
	      }
	      // Put it on the list of lines for later processing.
	      listItems.push(copiedListItem);
	    }
	  
	    // Split lines while there are lines left to split.
	    for (var i = 0;  // Number of lines that have been split so far.
	         i < listItems.length;  // length updated by breakAfter calls.
	         ++i) {
	      walk(listItems[i]);
	    }
	  
	    // Make sure numeric indices show correctly.
	    if (startLineNum === (startLineNum|0)) {
	      listItems[0].setAttribute('value', startLineNum);
	    }
	  
	    var ol = document.createElement('ol');
	    ol.className = 'linenums';
	    var offset = Math.max(0, ((startLineNum - 1 /* zero index */)) | 0) || 0;
	    for (var i = 0, n = listItems.length; i < n; ++i) {
	      li = listItems[i];
	      // Stick a class on the LIs so that stylesheets can
	      // color odd/even rows, or any other row pattern that
	      // is co-prime with 10.
	      li.className = 'L' + ((i + offset) % 10);
	      if (!li.firstChild) {
	        li.appendChild(document.createTextNode('\xA0'));
	      }
	      ol.appendChild(li);
	    }
	  
	    node.appendChild(ol);
	  }

	  /**
	   * Breaks {@code job.sourceCode} around style boundaries in
	   * {@code job.decorations} and modifies {@code job.sourceNode} in place.
	   * @param {JobT} job
	   * @private
	   */
	  function recombineTagsAndDecorations(job) {
	    var isIE8OrEarlier = /\bMSIE\s(\d+)/.exec(navigator.userAgent);
	    isIE8OrEarlier = isIE8OrEarlier && +isIE8OrEarlier[1] <= 8;
	    var newlineRe = /\n/g;
	  
	    var source = job.sourceCode;
	    var sourceLength = source.length;
	    // Index into source after the last code-unit recombined.
	    var sourceIndex = 0;
	  
	    var spans = job.spans;
	    var nSpans = spans.length;
	    // Index into spans after the last span which ends at or before sourceIndex.
	    var spanIndex = 0;
	  
	    var decorations = job.decorations;
	    var nDecorations = decorations.length;
	    // Index into decorations after the last decoration which ends at or before
	    // sourceIndex.
	    var decorationIndex = 0;
	  
	    // Remove all zero-length decorations.
	    decorations[nDecorations] = sourceLength;
	    var decPos, i;
	    for (i = decPos = 0; i < nDecorations;) {
	      if (decorations[i] !== decorations[i + 2]) {
	        decorations[decPos++] = decorations[i++];
	        decorations[decPos++] = decorations[i++];
	      } else {
	        i += 2;
	      }
	    }
	    nDecorations = decPos;
	  
	    // Simplify decorations.
	    for (i = decPos = 0; i < nDecorations;) {
	      var startPos = decorations[i];
	      // Conflate all adjacent decorations that use the same style.
	      var startDec = decorations[i + 1];
	      var end = i + 2;
	      while (end + 2 <= nDecorations && decorations[end + 1] === startDec) {
	        end += 2;
	      }
	      decorations[decPos++] = startPos;
	      decorations[decPos++] = startDec;
	      i = end;
	    }
	  
	    nDecorations = decorations.length = decPos;
	  
	    var sourceNode = job.sourceNode;
	    var oldDisplay = "";
	    if (sourceNode) {
	      oldDisplay = sourceNode.style.display;
	      sourceNode.style.display = 'none';
	    }
	    try {
	      var decoration = null;
	      while (spanIndex < nSpans) {
	        var spanStart = spans[spanIndex];
	        var spanEnd = /** @type{number} */ (spans[spanIndex + 2])
	            || sourceLength;
	  
	        var decEnd = decorations[decorationIndex + 2] || sourceLength;
	  
	        var end = Math.min(spanEnd, decEnd);
	  
	        var textNode = /** @type{Node} */ (spans[spanIndex + 1]);
	        var styledText;
	        if (textNode.nodeType !== 1  // Don't muck with <BR>s or <LI>s
	            // Don't introduce spans around empty text nodes.
	            && (styledText = source.substring(sourceIndex, end))) {
	          // This may seem bizarre, and it is.  Emitting LF on IE causes the
	          // code to display with spaces instead of line breaks.
	          // Emitting Windows standard issue linebreaks (CRLF) causes a blank
	          // space to appear at the beginning of every line but the first.
	          // Emitting an old Mac OS 9 line separator makes everything spiffy.
	          if (isIE8OrEarlier) {
	            styledText = styledText.replace(newlineRe, '\r');
	          }
	          textNode.nodeValue = styledText;
	          var document = textNode.ownerDocument;
	          var span = document.createElement('span');
	          span.className = decorations[decorationIndex + 1];
	          var parentNode = textNode.parentNode;
	          parentNode.replaceChild(span, textNode);
	          span.appendChild(textNode);
	          if (sourceIndex < spanEnd) {  // Split off a text node.
	            spans[spanIndex + 1] = textNode
	                // TODO: Possibly optimize by using '' if there's no flicker.
	                = document.createTextNode(source.substring(end, spanEnd));
	            parentNode.insertBefore(textNode, span.nextSibling);
	          }
	        }
	  
	        sourceIndex = end;
	  
	        if (sourceIndex >= spanEnd) {
	          spanIndex += 2;
	        }
	        if (sourceIndex >= decEnd) {
	          decorationIndex += 2;
	        }
	      }
	    } finally {
	      if (sourceNode) {
	        sourceNode.style.display = oldDisplay;
	      }
	    }
	  }

	  /** Maps language-specific file extensions to handlers. */
	  var langHandlerRegistry = {};
	  /** Register a language handler for the given file extensions.
	    * @param {function (JobT)} handler a function from source code to a list
	    *      of decorations.  Takes a single argument job which describes the
	    *      state of the computation and attaches the decorations to it.
	    * @param {Array.<string>} fileExtensions
	    */
	  function registerLangHandler(handler, fileExtensions) {
	    for (var i = fileExtensions.length; --i >= 0;) {
	      var ext = fileExtensions[i];
	      if (!langHandlerRegistry.hasOwnProperty(ext)) {
	        langHandlerRegistry[ext] = handler;
	      } else if (win['console']) {
	        console['warn']('cannot override language handler %s', ext);
	      }
	    }
	  }
	  function langHandlerForExtension(extension, source) {
	    if (!(extension && langHandlerRegistry.hasOwnProperty(extension))) {
	      // Treat it as markup if the first non whitespace character is a < and
	      // the last non-whitespace character is a >.
	      extension = /^\s*</.test(source)
	          ? 'default-markup'
	          : 'default-code';
	    }
	    return langHandlerRegistry[extension];
	  }
	  registerLangHandler(decorateSource, ['default-code']);
	  registerLangHandler(
	      createSimpleLexer(
	          [],
	          [
	           [PR_PLAIN,       /^[^<?]+/],
	           [PR_DECLARATION, /^<!\w[^>]*(?:>|$)/],
	           [PR_COMMENT,     /^<\!--[\s\S]*?(?:-\->|$)/],
	           // Unescaped content in an unknown language
	           ['lang-',        /^<\?([\s\S]+?)(?:\?>|$)/],
	           ['lang-',        /^<%([\s\S]+?)(?:%>|$)/],
	           [PR_PUNCTUATION, /^(?:<[%?]|[%?]>)/],
	           ['lang-',        /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
	           // Unescaped content in javascript.  (Or possibly vbscript).
	           ['lang-js',      /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
	           // Contains unescaped stylesheet content
	           ['lang-css',     /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
	           ['lang-in.tag',  /^(<\/?[a-z][^<>]*>)/i]
	          ]),
	      ['default-markup', 'htm', 'html', 'mxml', 'xhtml', 'xml', 'xsl']);
	  registerLangHandler(
	      createSimpleLexer(
	          [
	           [PR_PLAIN,        /^[\s]+/, null, ' \t\r\n'],
	           [PR_ATTRIB_VALUE, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, '\"\'']
	           ],
	          [
	           [PR_TAG,          /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
	           [PR_ATTRIB_NAME,  /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
	           ['lang-uq.val',   /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
	           [PR_PUNCTUATION,  /^[=<>\/]+/],
	           ['lang-js',       /^on\w+\s*=\s*\"([^\"]+)\"/i],
	           ['lang-js',       /^on\w+\s*=\s*\'([^\']+)\'/i],
	           ['lang-js',       /^on\w+\s*=\s*([^\"\'>\s]+)/i],
	           ['lang-css',      /^style\s*=\s*\"([^\"]+)\"/i],
	           ['lang-css',      /^style\s*=\s*\'([^\']+)\'/i],
	           ['lang-css',      /^style\s*=\s*([^\"\'>\s]+)/i]
	           ]),
	      ['in.tag']);
	  registerLangHandler(
	      createSimpleLexer([], [[PR_ATTRIB_VALUE, /^[\s\S]+/]]), ['uq.val']);
	  registerLangHandler(sourceDecorator({
	          'keywords': CPP_KEYWORDS,
	          'hashComments': true,
	          'cStyleComments': true,
	          'types': C_TYPES
	        }), ['c', 'cc', 'cpp', 'cxx', 'cyc', 'm']);
	  registerLangHandler(sourceDecorator({
	          'keywords': 'null,true,false'
	        }), ['json']);
	  registerLangHandler(sourceDecorator({
	          'keywords': CSHARP_KEYWORDS,
	          'hashComments': true,
	          'cStyleComments': true,
	          'verbatimStrings': true,
	          'types': C_TYPES
	        }), ['cs']);
	  registerLangHandler(sourceDecorator({
	          'keywords': JAVA_KEYWORDS,
	          'cStyleComments': true
	        }), ['java']);
	  registerLangHandler(sourceDecorator({
	          'keywords': SH_KEYWORDS,
	          'hashComments': true,
	          'multiLineStrings': true
	        }), ['bash', 'bsh', 'csh', 'sh']);
	  registerLangHandler(sourceDecorator({
	          'keywords': PYTHON_KEYWORDS,
	          'hashComments': true,
	          'multiLineStrings': true,
	          'tripleQuotedStrings': true
	        }), ['cv', 'py', 'python']);
	  registerLangHandler(sourceDecorator({
	          'keywords': PERL_KEYWORDS,
	          'hashComments': true,
	          'multiLineStrings': true,
	          'regexLiterals': 2  // multiline regex literals
	        }), ['perl', 'pl', 'pm']);
	  registerLangHandler(sourceDecorator({
	          'keywords': RUBY_KEYWORDS,
	          'hashComments': true,
	          'multiLineStrings': true,
	          'regexLiterals': true
	        }), ['rb', 'ruby']);
	  registerLangHandler(sourceDecorator({
	          'keywords': JSCRIPT_KEYWORDS,
	          'cStyleComments': true,
	          'regexLiterals': true
	        }), ['javascript', 'js', 'ts', 'typescript']);
	  registerLangHandler(sourceDecorator({
	          'keywords': COFFEE_KEYWORDS,
	          'hashComments': 3,  // ### style block comments
	          'cStyleComments': true,
	          'multilineStrings': true,
	          'tripleQuotedStrings': true,
	          'regexLiterals': true
	        }), ['coffee']);
	  registerLangHandler(
	      createSimpleLexer([], [[PR_STRING, /^[\s\S]+/]]), ['regex']);

	  /** @param {JobT} job */
	  function applyDecorator(job) {
	    var opt_langExtension = job.langExtension;

	    try {
	      // Extract tags, and convert the source code to plain text.
	      var sourceAndSpans = extractSourceSpans(job.sourceNode, job.pre);
	      /** Plain text. @type {string} */
	      var source = sourceAndSpans.sourceCode;
	      job.sourceCode = source;
	      job.spans = sourceAndSpans.spans;
	      job.basePos = 0;

	      // Apply the appropriate language handler
	      langHandlerForExtension(opt_langExtension, source)(job);

	      // Integrate the decorations and tags back into the source code,
	      // modifying the sourceNode in place.
	      recombineTagsAndDecorations(job);
	    } catch (e) {
	      if (win['console']) {
	        console['log'](e && e['stack'] || e);
	      }
	    }
	  }

	  /**
	   * Pretty print a chunk of code.
	   * @param sourceCodeHtml {string} The HTML to pretty print.
	   * @param opt_langExtension {string} The language name to use.
	   *     Typically, a filename extension like 'cpp' or 'java'.
	   * @param opt_numberLines {number|boolean} True to number lines,
	   *     or the 1-indexed number of the first line in sourceCodeHtml.
	   */
	  function $prettyPrintOne(sourceCodeHtml, opt_langExtension, opt_numberLines) {
	    /** @type{number|boolean} */
	    var nl = opt_numberLines || false;
	    /** @type{string|null} */
	    var langExtension = opt_langExtension || null;
	    /** @type{!Element} */
	    var container = document.createElement('div');
	    // This could cause images to load and onload listeners to fire.
	    // E.g. <img onerror="alert(1337)" src="nosuchimage.png">.
	    // We assume that the inner HTML is from a trusted source.
	    // The pre-tag is required for IE8 which strips newlines from innerHTML
	    // when it is injected into a <pre> tag.
	    // http://stackoverflow.com/questions/451486/pre-tag-loses-line-breaks-when-setting-innerhtml-in-ie
	    // http://stackoverflow.com/questions/195363/inserting-a-newline-into-a-pre-tag-ie-javascript
	    container.innerHTML = '<pre>' + sourceCodeHtml + '</pre>';
	    container = /** @type{!Element} */(container.firstChild);
	    if (nl) {
	      numberLines(container, nl, true);
	    }

	    /** @type{JobT} */
	    var job = {
	      langExtension: langExtension,
	      numberLines: nl,
	      sourceNode: container,
	      pre: 1,
	      sourceCode: null,
	      basePos: null,
	      spans: null,
	      decorations: null
	    };
	    applyDecorator(job);
	    return container.innerHTML;
	  }

	   /**
	    * Find all the {@code <pre>} and {@code <code>} tags in the DOM with
	    * {@code class=prettyprint} and prettify them.
	    *
	    * @param {Function} opt_whenDone called when prettifying is done.
	    * @param {HTMLElement|HTMLDocument} opt_root an element or document
	    *   containing all the elements to pretty print.
	    *   Defaults to {@code document.body}.
	    */
	  function $prettyPrint(opt_whenDone, opt_root) {
	    var root = opt_root || document.body;
	    var doc = root.ownerDocument || document;
	    function byTagName(tn) { return root.getElementsByTagName(tn); }
	    // fetch a list of nodes to rewrite
	    var codeSegments = [byTagName('pre'), byTagName('code'), byTagName('xmp')];
	    var elements = [];
	    for (var i = 0; i < codeSegments.length; ++i) {
	      for (var j = 0, n = codeSegments[i].length; j < n; ++j) {
	        elements.push(codeSegments[i][j]);
	      }
	    }
	    codeSegments = null;

	    var clock = Date;
	    if (!clock['now']) {
	      clock = { 'now': function () { return +(new Date); } };
	    }

	    // The loop is broken into a series of continuations to make sure that we
	    // don't make the browser unresponsive when rewriting a large page.
	    var k = 0;

	    var langExtensionRe = /\blang(?:uage)?-([\w.]+)(?!\S)/;
	    var prettyPrintRe = /\bprettyprint\b/;
	    var prettyPrintedRe = /\bprettyprinted\b/;
	    var preformattedTagNameRe = /pre|xmp/i;
	    var codeRe = /^code$/i;
	    var preCodeXmpRe = /^(?:pre|code|xmp)$/i;
	    var EMPTY = {};

	    function doWork() {
	      var endTime = (win['PR_SHOULD_USE_CONTINUATION'] ?
	                     clock['now']() + 250 /* ms */ :
	                     Infinity);
	      for (; k < elements.length && clock['now']() < endTime; k++) {
	        var cs = elements[k];

	        // Look for a preceding comment like
	        // <?prettify lang="..." linenums="..."?>
	        var attrs = EMPTY;
	        {
	          for (var preceder = cs; (preceder = preceder.previousSibling);) {
	            var nt = preceder.nodeType;
	            // <?foo?> is parsed by HTML 5 to a comment node (8)
	            // like <!--?foo?-->, but in XML is a processing instruction
	            var value = (nt === 7 || nt === 8) && preceder.nodeValue;
	            if (value
	                ? !/^\??prettify\b/.test(value)
	                : (nt !== 3 || /\S/.test(preceder.nodeValue))) {
	              // Skip over white-space text nodes but not others.
	              break;
	            }
	            if (value) {
	              attrs = {};
	              value.replace(
	                  /\b(\w+)=([\w:.%+-]+)/g,
	                function (_, name, value) { attrs[name] = value; });
	              break;
	            }
	          }
	        }

	        var className = cs.className;
	        if ((attrs !== EMPTY || prettyPrintRe.test(className))
	            // Don't redo this if we've already done it.
	            // This allows recalling pretty print to just prettyprint elements
	            // that have been added to the page since last call.
	            && !prettyPrintedRe.test(className)) {

	          // make sure this is not nested in an already prettified element
	          var nested = false;
	          for (var p = cs.parentNode; p; p = p.parentNode) {
	            var tn = p.tagName;
	            if (preCodeXmpRe.test(tn)
	                && p.className && prettyPrintRe.test(p.className)) {
	              nested = true;
	              break;
	            }
	          }
	          if (!nested) {
	            // Mark done.  If we fail to prettyprint for whatever reason,
	            // we shouldn't try again.
	            cs.className += ' prettyprinted';

	            // If the classes includes a language extensions, use it.
	            // Language extensions can be specified like
	            //     <pre class="prettyprint lang-cpp">
	            // the language extension "cpp" is used to find a language handler
	            // as passed to PR.registerLangHandler.
	            // HTML5 recommends that a language be specified using "language-"
	            // as the prefix instead.  Google Code Prettify supports both.
	            // http://dev.w3.org/html5/spec-author-view/the-code-element.html
	            var langExtension = attrs['lang'];
	            if (!langExtension) {
	              langExtension = className.match(langExtensionRe);
	              // Support <pre class="prettyprint"><code class="language-c">
	              var wrapper;
	              if (!langExtension && (wrapper = childContentWrapper(cs))
	                  && codeRe.test(wrapper.tagName)) {
	                langExtension = wrapper.className.match(langExtensionRe);
	              }

	              if (langExtension) { langExtension = langExtension[1]; }
	            }

	            var preformatted;
	            if (preformattedTagNameRe.test(cs.tagName)) {
	              preformatted = 1;
	            } else {
	              var currentStyle = cs['currentStyle'];
	              var defaultView = doc.defaultView;
	              var whitespace = (
	                  currentStyle
	                  ? currentStyle['whiteSpace']
	                  : (defaultView
	                     && defaultView.getComputedStyle)
	                  ? defaultView.getComputedStyle(cs, null)
	                  .getPropertyValue('white-space')
	                  : 0);
	              preformatted = whitespace
	                  && 'pre' === whitespace.substring(0, 3);
	            }

	            // Look for a class like linenums or linenums:<n> where <n> is the
	            // 1-indexed number of the first line.
	            var lineNums = attrs['linenums'];
	            if (!(lineNums = lineNums === 'true' || +lineNums)) {
	              lineNums = className.match(/\blinenums\b(?::(\d+))?/);
	              lineNums =
	                lineNums
	                ? lineNums[1] && lineNums[1].length
	                  ? +lineNums[1] : true
	                : false;
	            }
	            if (lineNums) { numberLines(cs, lineNums, preformatted); }

	            // do the pretty printing
	            var prettyPrintingJob = {
	              langExtension: langExtension,
	              sourceNode: cs,
	              numberLines: lineNums,
	              pre: preformatted,
	              sourceCode: null,
	              basePos: null,
	              spans: null,
	              decorations: null
	            };
	            applyDecorator(prettyPrintingJob);
	          }
	        }
	      }
	      if (k < elements.length) {
	        // finish up in a continuation
	        win.setTimeout(doWork, 250);
	      } else if ('function' === typeof opt_whenDone) {
	        opt_whenDone();
	      }
	    }

	    doWork();
	  }

	  /**
	   * Contains functions for creating and registering new language handlers.
	   * @type {Object}
	   */
	  var PR = win['PR'] = {
	        'createSimpleLexer': createSimpleLexer,
	        'registerLangHandler': registerLangHandler,
	        'sourceDecorator': sourceDecorator,
	        'PR_ATTRIB_NAME': PR_ATTRIB_NAME,
	        'PR_ATTRIB_VALUE': PR_ATTRIB_VALUE,
	        'PR_COMMENT': PR_COMMENT,
	        'PR_DECLARATION': PR_DECLARATION,
	        'PR_KEYWORD': PR_KEYWORD,
	        'PR_LITERAL': PR_LITERAL,
	        'PR_NOCODE': PR_NOCODE,
	        'PR_PLAIN': PR_PLAIN,
	        'PR_PUNCTUATION': PR_PUNCTUATION,
	        'PR_SOURCE': PR_SOURCE,
	        'PR_STRING': PR_STRING,
	        'PR_TAG': PR_TAG,
	        'PR_TYPE': PR_TYPE,
	        'prettyPrintOne':
	           IN_GLOBAL_SCOPE
	             ? (win['prettyPrintOne'] = $prettyPrintOne)
	             : (prettyPrintOne = $prettyPrintOne),
	        'prettyPrint': prettyPrint =
	           IN_GLOBAL_SCOPE
	             ? (win['prettyPrint'] = $prettyPrint)
	             : (prettyPrint = $prettyPrint)
	      };

	  // Make PR available via the Asynchronous Module Definition (AMD) API.
	  // Per https://github.com/amdjs/amdjs-api/wiki/AMD:
	  // The Asynchronous Module Definition (AMD) API specifies a
	  // mechanism for defining modules such that the module and its
	  // dependencies can be asynchronously loaded.
	  // ...
	  // To allow a clear indicator that a global define function (as
	  // needed for script src browser loading) conforms to the AMD API,
	  // any global define function SHOULD have a property called "amd"
	  // whose value is an object. This helps avoid conflict with any
	  // other existing JavaScript code that could have defined a define()
	  // function that does not conform to the AMD API.
	  var define = win['define'];
	  if (typeof define === "function" && define['amd']) {
	    define("google-code-prettify", [], function () {
	      return PR;
	    });
	  }
	})();


/***/ },

/***/ 98:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @file 模板脚本入口
	 * @author wangjiedong@baidu.com
	 */
	'use strict';

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _docAccordionMenu = __webpack_require__(34);

	var _docAccordionMenu2 = _interopRequireDefault(_docAccordionMenu);

	var _marked = __webpack_require__(35);

	var _marked2 = _interopRequireDefault(_marked);

	__webpack_require__(36);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.$ = _jquery2.default;
	window.marked = _marked2.default;

	var lastMdTag = '';

	var bindLeafNodeScroll = function bindLeafNodeScroll(clickNode) {
	    var scrollToLeafNodeH1 = function scrollToLeafNodeH1(index) {
	        var offset = Math.abs((0, _jquery2.default)('#md_container>h1').eq(0).offset().top - (0, _jquery2.default)('#md_container>h1').eq(index).offset().top);
	        (0, _jquery2.default)('#md_container').scrollTop(offset);
	    };
	    var leafNodes = clickNode.parent().find('>ul>li');
	    leafNodes.each(function (i, element) {
	        (0, _jquery2.default)(element).click(function () {
	            scrollToLeafNodeH1(i);
	        });
	    });
	};

	var renderMdPage = function renderMdPage(tagName, clickNode, type) {
	    if (lastMdTag === tagName) {
	        return;
	    }
	    _jquery2.default.ajax({
	        type: 'GET',
	        url: '/data/' + tagName + '.md',
	        success: function success(res) {
	            lastMdTag = tagName;
	            (0, _jquery2.default)('#md_container').html((0, _marked2.default)(res));
	            (0, _jquery2.default)('code').addClass('prettyprint');
	            window.PR.prettyPrint();
	            if (type === 'node') {
	                bindLeafNodeScroll(clickNode);
	            }
	        }
	    });
	};

	var bindAllNodeClick = function bindAllNodeClick() {
	    (0, _jquery2.default)('.click-node').click(function () {
	        var tagName = (0, _jquery2.default)(this).attr('tag');
	        if (tagName) {
	            renderMdPage(tagName, (0, _jquery2.default)(this), 'node');
	        }
	    });
	    (0, _jquery2.default)('.beginner.root .click-node').click(function () {
	        var tagName = (0, _jquery2.default)(this).attr('tag');
	        if (tagName) {
	            renderMdPage(tagName, (0, _jquery2.default)(this), 'beginner');
	        }
	    });
	};

	var bindAllLeafClick = function bindAllLeafClick() {
	    (0, _jquery2.default)('.leaf-node').click(function () {
	        var tagName = (0, _jquery2.default)(this).attr('tag');
	        if (tagName) {
	            renderMdPage(tagName, (0, _jquery2.default)(this), 'leaf');
	        }
	    });
	};

	_jquery2.default.ajax({
	    type: 'GET',
	    url: '/data/notice.md',
	    success: function success(res) {
	        (0, _jquery2.default)('#md_container').html((0, _marked2.default)(res));
	        (0, _jquery2.default)('code').addClass('prettyprint');
	        window.PR.prettyPrint();
	    }
	});
	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)('#jquery-accordion-menu').docAccordionMenu();
	});

	var renderMenuActive = function renderMenuActive() {
	    (0, _jquery2.default)('.sidebar li').click(function () {
	        var thisElement = (0, _jquery2.default)(this);
	        (0, _jquery2.default)('.sidebar li.active').removeClass('active');
	        (0, _jquery2.default)(this).addClass('active');
	        var allParents = thisElement.parents();
	        for (var i = 0; i < allParents.length; i++) {
	            if ((0, _jquery2.default)(allParents[i]).hasClass('root')) {
	                (0, _jquery2.default)(allParents[i]).addClass('active');
	                break;
	            }
	        }
	        if (thisElement.hasClass('leaf') || thisElement.hasClass('sdk-node')) {
	            var breadcrumbList = [thisElement.find('>a').text()];
	            for (var _i = 0; _i < allParents.length; _i++) {
	                if ((0, _jquery2.default)(allParents[_i]).hasClass('non-leaf') || (0, _jquery2.default)(allParents[_i]).hasClass('root')) {
	                    var text = (0, _jquery2.default)(allParents[_i]).find('>a').text();
	                    breadcrumbList.splice(0, 0, text);
	                }
	            }
	            var html = '';
	            for (var _i2 = 0; _i2 < breadcrumbList.length; _i2++) {
	                html += '<li><span class="divider">&gt;</span></li><li><span class="">' + breadcrumbList[_i2] + '</span></li>';
	            }
	            (0, _jquery2.default)('.doc-breadcrumb .crumb').hide().html(html);
	            (0, _jquery2.default)('.doc-breadcrumb .crumb li:eq(0)').remove();
	            (0, _jquery2.default)('.doc-breadcrumb .crumb').show();
	        } else if (thisElement.parent().hasClass('beginner')) {
	            var _html = '<li><span>' + thisElement.text() + '</span></li>';
	            (0, _jquery2.default)('.doc-breadcrumb .crumb').html(_html);
	        }
	    });
	};

	var bindMinusPlus = function bindMinusPlus() {
	    (0, _jquery2.default)('.sidebar .pm-button').click(function () {
	        var button = (0, _jquery2.default)(this);
	        if (button.hasClass('nav-plus1') && button.hasClass('active')) {
	            button.removeClass('active');
	            (0, _jquery2.default)('.toc.jquery-accordion-menu:eq(0)').show(500);
	        } else if (button.hasClass('nav-plus1')) {
	            button.addClass('active');
	            (0, _jquery2.default)('.toc.jquery-accordion-menu:eq(0)').hide(500);
	        } else if (button.hasClass('nav-plus2') && button.hasClass('active')) {
	            button.removeClass('active');
	            (0, _jquery2.default)('.toc.jquery-accordion-menu:eq(1)').show(500);
	        } else {
	            button.addClass('active');
	            (0, _jquery2.default)('.toc.jquery-accordion-menu:eq(1)').hide(500);
	        }
	    });
	};

	var loadDefault = function loadDefault() {
	    (0, _jquery2.default)('.doc-wrap .faq-menu > li:eq(0)').click();
	};

	(0, _jquery2.default)(function () {
	    bindMinusPlus();
	    renderMenuActive();
	    bindAllNodeClick();
	    loadDefault();
	});

/***/ }

});