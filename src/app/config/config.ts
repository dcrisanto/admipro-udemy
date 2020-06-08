import { URL } from 'url';

export const URL_SERVICES = 'http://localhost:3000';
export const URL_LOGIN = URL_SERVICES + '/login';
export const URL_LOGIN_GOOGLE = URL_LOGIN + '/google';
export const URL_IMAGE = URL_SERVICES + '/img';
export const URL_UPLOAD_IMAGE = URL_SERVICES + '/upload/';
// Users
export const URL_PATH_USER = URL_SERVICES + '/user';
export const URL_SEARCH_USERS = URL_SERVICES + '/search/collection/users/';
// Hospitals
export const URL_PATH_HOSPITALS = URL_SERVICES + '/hospital';
export const URL_SEARCH_HOSPITALS = URL_SERVICES + '/search/collection/hospitals/';
// Medics
export const URL_PATH_MEDICS = URL_SERVICES + '/doctor';
export const URL_SEARCH_MEDICS = URL_SERVICES + '/search/collection/doctors/';
