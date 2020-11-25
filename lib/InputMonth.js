"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Locales = _interopRequireDefault(require("./Locales"));

var _uuid = require("uuid");

require("./Style/style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var currentMonth = new Date().getMonth();
var currentYear = new Date().getFullYear();

var InputMonth = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(InputMonth, _React$Component);

  function InputMonth(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    if (_Locales["default"][_this.props.lang] === undefined) throw 'Language not implemented.';
    _this.state = {
      id: (0, _uuid.v4)(),
      lang: _this.props.lang,
      locales: _Locales["default"][_this.props.lang],
      month: '',
      year: '',
      startYear: new Date().getFullYear() - 4,
      value: '---------- ----',
      showMonthViewer: false,
      showYearViewer: false
    };
    return _this;
  }

  var _proto = InputMonth.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.loadValue(this.props.value);
  };

  _proto.componentDidUpdate = function componentDidUpdate(pPros) {
    if (this.props.value !== pPros.value) {
      this.loadValue(this.props.value);
    }
  };

  _proto.loadValue = function loadValue(val) {
    if (val === '' || val === undefined || val === null) {
      this.setState({
        value: '---------- ----'
      });
    } else {
      var sentence = val.match(/(\d{4})\-(\d{2})/);
      var year = sentence[1];
      var monthNumber = parseInt(sentence[2]) - 1;
      var months = Object.keys(this.state.locales);
      this.setState({
        value: this.state.locales[months[monthNumber]] + " " + year
      });
    }
  };

  _proto.drawMonthButtons = function drawMonthButtons() {
    var _this2 = this;

    var mB = [];
    Object.keys(this.state.locales).filter(function (m) {
      return !m.includes('ABBR');
    }).forEach(function (monthName, i) {
      mB.push( /*#__PURE__*/_react["default"].createElement("button", {
        key: i,
        className: "imp--month--button imp--button " + (currentMonth === i ? 'imp--month--current' : ''),
        type: "button",
        children: _this2.state.locales["ABBR_" + monthName.substr(0, 3)],
        onClick: function onClick(e) {
          return _this2.onMonthClick(e, _this2.state.locales[monthName], i + 1);
        }
      }));
    });
    return mB;
  };

  _proto.drawYearButtons = function drawYearButtons() {
    var _this3 = this;

    var yB = [];

    var _loop = function _loop(i) {
      yB.push( /*#__PURE__*/_react["default"].createElement("button", {
        key: i,
        className: "imp--year--button imp--button " + (currentYear === i ? 'imp--year--current' : ''),
        type: "button",
        "data-year": i,
        children: i,
        onClick: function onClick(e) {
          return _this3.onYearClick(e, i);
        }
      }));
    };

    for (var i = this.state.startYear; i < this.state.startYear + 9; i++) {
      _loop(i);
    }

    return yB;
  };

  _proto.onMonthClick = function onMonthClick(e, monthName, monthNumber, callback) {
    var _this4 = this;

    this.isInContainer = true;
    var sentence = this.state.value.match(/(.+) (.+)/);
    this.setState({
      value: monthName + " " + sentence[2],
      month: monthNumber,
      showYearViewer: true,
      showMonthViewer: false
    }, function () {
      if (callback) {
        callback();
      } else {
        var input = document.getElementById(_this4.state.id);
        input.selectionStart = monthName.length + 1;
        input.selectionEnd = input.selectionStart + 4;
        input.focus();

        _this4.onInputChange();
      }
    });
  };

  _proto.onYearClick = function onYearClick(e, year) {
    var sentence = this.state.value.match(/(.+) (.+)/);
    this.setState({
      value: sentence[1] + " " + year,
      year: year,
      showMonthViewer: false,
      showYearViewer: false
    }, this.onInputChange.bind(this));
  };

  _proto.onInputClick = function onInputClick(e) {
    var sentence = e.target.value.match(/(.+) (.+)/);

    if (e.target.selectionStart <= sentence[1].length) {
      e.target.selectionStart = 0;
      e.target.selectionEnd = sentence[1].length;
      this.setState({
        showMonthViewer: true,
        showYearViewer: false
      });
    } else {
      e.target.selectionStart = sentence[1].length + 1;
      e.target.selectionEnd = e.target.selectionStart + 4;
      this.setState({
        showMonthViewer: false,
        showYearViewer: true
      });
    }
  };

  _proto.onInputFocus = function onInputFocus(e) {
    this.onInputClick(e);
  };

  _proto.onInputBlur = function onInputBlur() {
    var _this5 = this;

    setTimeout(function () {
      if (!_this5.isInContainer) {
        _this5.setState({
          showMonthViewer: false,
          showYearViewer: false
        });
      }

      _this5.isInContainer = false;
    }, 150);
  };

  _proto.onInputChange = /*#__PURE__*/function () {
    var _onInputChange = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.state.month !== '' && this.state.year !== '') {
                this.props.onChange(this.state.year + "-" + this.state.month.toString().padStart(2, '0'));
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function onInputChange() {
      return _onInputChange.apply(this, arguments);
    }

    return onInputChange;
  }();

  _proto.onInputKeyDown = function onInputKeyDown(e) {
    if (e.shiftKey && e.keyCode === 9 && e.target.selectionStart === 0 || !e.shiftKey && e.keyCode === 9 && e.target.selectionEnd === e.target.value.length) {
      return true;
    }

    e.preventDefault();
    var keyCode = e.keyCode;
    this.onInputBlur();
    if (document.getElementById(this.state.id).selectionStart === 0) this.keyboardMonthSelect(keyCode);else this.keyboardYearSelect(keyCode);
  };

  _proto.keyboardMonthSelect = function keyboardMonthSelect(code) {
    var cMonth = this.state.month;
    var monthNames = Object.keys(this.state.locales).filter(function (m) {
      return !m.includes('ABBR');
    });

    switch (code) {
      case 38:
        // up
        if (cMonth === '' || cMonth === 12) this.onMonthClick(null, this.state.locales[monthNames[0]], 1, this.selectInputMonth.bind(this));else this.onMonthClick(null, this.state.locales[monthNames[cMonth]], cMonth + 1, this.selectInputMonth.bind(this));
        break;

      case 39:
        // right
        this.selectInputYear();
        break;

      case 40:
        // down
        if (cMonth === '' || cMonth === 1) this.onMonthClick(null, this.state.locales[monthNames[11]], 12, this.selectInputMonth.bind(this));else this.onMonthClick(null, this.state.locales[monthNames[cMonth - 2]], cMonth - 1, this.selectInputMonth.bind(this));
        break;

      case 9:
        // tab
        this.selectInputYear();
        break;
    }
  };

  _proto.keyboardYearSelect = function keyboardYearSelect(code) {
    var input = document.getElementById(this.state.id);
    var sentence = this.state.value.match(/(.+) (.+)/);
    var cYear = this.state.year;

    switch (code) {
      case 37:
        // left
        this.selectInputMonth();
        break;

      case 38:
        // up
        if (cYear === '') {
          this.setState({
            value: sentence[1] + " " + new Date().getFullYear(),
            year: new Date().getFullYear()
          }, this.selectInputYear.bind(this));
        } else {
          this.setState({
            value: sentence[1] + " " + (cYear + 1),
            year: cYear + 1
          }, this.selectInputYear.bind(this));
        }

        break;

      case 40:
        // down
        if (cYear === '') {
          this.setState({
            value: sentence[1] + " " + (new Date().getFullYear() - 1),
            year: new Date().getFullYear() - 1
          }, this.selectInputYear.bind(this));
        } else {
          this.setState({
            value: sentence[1] + " " + (cYear - 1),
            year: cYear - 1
          }, this.selectInputYear.bind(this));
        }

        break;

      case 9:
        // tab
        this.selectInputMonth();
        break;
    }
  };

  _proto.selectInputMonth = function selectInputMonth() {
    var _this6 = this;

    this.setState({
      showMonthViewer: false,
      showYearViewer: false
    }, function () {
      _this6.onInputChange().then(function () {
        var input = document.getElementById(_this6.state.id);

        var sentence = _this6.state.value.match(/(.+) (.+)/);

        input.selectionStart = 0;
        input.selectionEnd = sentence[1].length;
        input.focus();
      });
    });
  };

  _proto.selectInputYear = function selectInputYear() {
    var _this7 = this;

    this.setState({
      showMonthViewer: false,
      showYearViewer: false
    }, function () {
      _this7.onInputChange().then(function () {
        var input = document.getElementById(_this7.state.id);
        input.selectionStart = input.value.length - 4;
        input.selectionEnd = input.value.length;
        input.focus();
      });
    });
  };

  _proto.onPrevButtonClick = function onPrevButtonClick() {
    this.isInContainer = true;
    this.setState({
      startYear: this.state.startYear - 9
    });
  };

  _proto.onNextButtonClick = function onNextButtonClick() {
    this.isInContainer = true;
    this.setState({
      startYear: this.state.startYear + 9
    });
  };

  _proto.render = function render() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "imp--container"
    }, /*#__PURE__*/_react["default"].createElement("input", _extends({}, this.props, {
      id: this.state.id,
      className: "imp--input " + this.props.className,
      type: "text",
      value: this.state.value,
      onClick: this.onInputClick.bind(this),
      onBlur: this.onInputBlur.bind(this),
      onKeyPress: function onKeyPress(e) {
        return e.preventDefault();
      },
      onKeyDown: this.onInputKeyDown.bind(this),
      onChange: this.onInputChange.bind(this),
      onFocus: this.onInputFocus.bind(this)
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "imp--viewers"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: !this.state.showMonthViewer ? {
        display: 'none'
      } : {},
      className: "imp--month--viewer"
    }, this.drawMonthButtons().map(function (b) {
      return b;
    })), /*#__PURE__*/_react["default"].createElement("div", {
      style: !this.state.showYearViewer ? {
        display: 'none'
      } : {},
      className: "imp--year--viewer"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "imp--viewer--controls"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      className: "imp--year--button--prev imp--button",
      type: "button",
      children: '<',
      onClick: this.onPrevButtonClick.bind(this)
    }), /*#__PURE__*/_react["default"].createElement("button", {
      className: "imp--year--button--next imp--button",
      type: "button",
      children: '>',
      onClick: this.onNextButtonClick.bind(this)
    })), this.drawYearButtons().map(function (b) {
      return b;
    }))));
  };

  return InputMonth;
}(_react["default"].Component);

exports["default"] = InputMonth;

_defineProperty(InputMonth, "defaultProps", {
  lang: 'en',
  className: ''
});

InputMonth.propTypes = process.env.NODE_ENV !== "production" ? {
  lang: _propTypes["default"].string,
  className: _propTypes["default"].string
} : {};
module.exports = exports.default;