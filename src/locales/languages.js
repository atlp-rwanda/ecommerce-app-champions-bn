/* eslint-disable import/no-extraneous-dependencies */

import backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import i18next from 'i18next';

i18next.use(backend).use(middleware.LanguageDetector)
.init({
    fallbackLng: 'en',
    backend:{
    
        loadPath: './src/locales/{{lng}}/translation.json'
    }
});

const languages = (app) =>{
    app.use(middleware.handle(i18next));
    app.get('/', (req, res) => {
        const welcome= req.t('welcome');
          res.status(200).json(welcome);
        });
    
};

export default languages;