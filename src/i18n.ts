import i18n from 'i18n';
import path from 'path';

i18n.configure({
    locales: ['en', 'sk'],
    directory: path.join(__dirname, '/locales'),
    defaultLocale: 'en',
    objectNotation: true,
})

export default i18n