import { useTranslation } from "react-i18next";
import frFlag from "../../assets/flags/french.png"
import usFlag from "../../assets/flags/english.png"
import deFlag from "../../assets/flags/dutch.jpg"
import esFlag from "../../assets/flags/spanish.png"


const LANGUAGES = {
  en: {
    label: "En",
    flag: usFlag,
  },
  fr: {
    label: "Fr",
    flag: frFlag,
  },
  de: {
    label: "De",
    flag: deFlag,
  },
  es: {
    label: "Es",
    flag: esFlag,
  },
};


export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const currentLang = LANGUAGES[i18n.language] || LANGUAGES.en;

  return (
    <div className="flex items-center gap-0" >
      {/* Flag */}
      <img
        src={currentLang.flag}
        alt={currentLang.label}
        className="w-7 h-7 rounded-full"
       
      />

      {/* Dropdown */}
      <select
        value={i18n.language}
        onChange={changeLanguage}
        className="border-none outline-none focus:outline-none focus:ring-0  rounded-lg text-sm bg-white"
      >
        {Object.entries(LANGUAGES).map(([code, lang]) => (
          <option key={code} value={code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}