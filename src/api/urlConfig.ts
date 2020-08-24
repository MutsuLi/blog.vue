
export const serverRoot = `${process.env.NODE_ENV === 'production' ? 'http://47.102.128.186' : 'http://47.102.128.186'}`;

export const user = {
    infoByToken: 'user/GetInfoByToken',
    infoById: "user/get",
    register: "user/post",
    update: "user/put"
}

export const getToken = 'login/JWTToken3.0';

export const refreshToken = 'login/RefreshToken';

export const blogs = {
    list: "blogs",
    post: "blogs/post",
    rank: "blogs/rank"
}

export const tag = {
    list: "tag",
    post: "tag/post"
}


