
const serverRoot = `${process.env.NODE_ENV === 'production' ? 'https://www.lybenson.com' : 'https://127.0.0.1:9100'}`;

export const user = 'user/GetInfoByToken';

export const getToken = 'login/JWTToken3.0';

export const refreshToken = 'login/RefreshToken';

export const blogs={
    list:"blogs",
    post:"blogs/post"
}

export const tag={
    list:"tag",
    post:"tag/post"
}


