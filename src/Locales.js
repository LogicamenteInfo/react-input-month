const Available = ['en', 'pt-BR'];
const Locales = {};
Available.map(lang => {
  Locales[lang] = require(`./Locales/${lang}.json`);
});

export default Locales;