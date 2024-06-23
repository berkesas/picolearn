import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "Error": "Error",
            "Success": "Success",
            "Some errors occurred": "Some errors occurrred. For details, please see the errors.txt file",
            "Confirm delete": "Confirm delete",
            "No resources installed yet": "No resources have been installed yet",
            "search here": "search here",
            "Add": "Add",
            "Search": "Search",
            "Refresh": "Refresh",
            "confirm delete question": "Are you sure you want to delete <strong>{{title}}</strong>?",
            "<0>Installed packages</0>": "<0>Installed packages</0>",
            "Yes":"Yes",
            "No": "No"
        }
    },
    tk: {
        translation: {
            "Success": "Üstünlik",
            "Error": "Ýalňyşlyk",
            "Some errors occurred": "Käbir ýalňyşlyklar çykdy. Jikme-jik maglumat almak üçin, error.txt faýlyna serediň.",
            "Confirm delete": "Aýyrmagy tassyklamak",
            "No resources installed yet": "Häzirlikçe hiç hili gurnalgy toplum ýok.",
            "search here": "şu ýerde gözle",
            "Add": "Goş",
            "Search": "Gözle",
            "Refresh": "Täzele",
            "confirm delete question": "<strong>{{title}}</strong> kitaby çyndanam pozmalymy?",
            "<0>Installed packages</0>": "<0>Gurnalan toplumlar</0>",
            "Yes":"Hawa",
            "No": "Ýok"
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;