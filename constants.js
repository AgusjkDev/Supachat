export const IS_DEVELOPMENT_MODE = process.env.NODE_ENV === "development";
export const MIN_LOADING_SCREEN_TIME = IS_DEVELOPMENT_MODE ? 0 : 1000;
export const ALERT_TIMEOUT = !IS_DEVELOPMENT_MODE && 5000;
