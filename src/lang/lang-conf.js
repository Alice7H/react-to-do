import English from './en-US.json';
import Portuguese from './pt-BR.json';

export const getLang = (locale) => {
  let lang;
  if (locale === "en") {
    lang = English;
  } else {
    lang = Portuguese;
  }
  return lang;
}
