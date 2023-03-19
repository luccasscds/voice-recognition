import filePackage from '../package.json';

export const constants = {
    APP_VERSION: filePackage.version,
    APP_NAME: filePackage.name.replace(/-/g, ' ')
}