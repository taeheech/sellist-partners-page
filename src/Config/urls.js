export const serverAPI = "https://api.buzzikid.com/PartnersApi";

export const logInApi = `${serverAPI}/member_login.php`;

export const registerApi = `${serverAPI}/member_register.php`;

export const forgotPwApi = `${serverAPI}/pswd_reset_request.php`;

export const resetPwApi = `${serverAPI}/reset_password.php`;

export const tokenApi = `${serverAPI}/validate_reset_token.php`;

export const TOKEN = "6cz2w6BC9mgpAhKNmmgcSnpEnJX9w34mF3dzzMyAqzBYkBTfEE";

export const headers = { Authorization: TOKEN };
