"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var Available = ['en', 'pt-BR'];
var Locales = {};
Available.map(function (lang) {
  Locales[lang] = require("./Locales/" + lang + ".json");
});
var _default = Locales;
exports["default"] = _default;
module.exports = exports.default;