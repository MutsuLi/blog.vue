
const serverRoot = `${process.env.NODE_ENV === 'production' ? 'https://www.lybenson.com' : 'https://127.0.0.1:9100'}`;

export const user = serverRoot + 'user';

export const getToken = serverRoot + 'login/JWTToken3.0';

export const refreshToken = serverRoot + 'login/RefreshToken';

export const blogs = serverRoot + 'blogs';
