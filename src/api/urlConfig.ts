
const serverRoot = `${process.env.NODE_ENV === 'production' ? 'http://www.lybenson.com' : 'http://127.0.0.1:9100'}`;

export const user = serverRoot + '/api/user';

export const getToken = serverRoot + '/api/login/JWTToken3.0';

export const refreshToken = serverRoot + '/api/login/RefreshToken';

export const blogs = serverRoot + '/api/blogs';
