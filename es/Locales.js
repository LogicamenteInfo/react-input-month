var Available = ['en', 'pt-BR'];
var Locales = {};
Available.map(function (lang) {
  Locales[lang] = require("./Locales/" + lang + ".json");
});
export default Locales;