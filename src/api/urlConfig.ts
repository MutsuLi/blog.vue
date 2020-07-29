
const serverRoot = `${process.env.NODE_ENV === 'production' ? 'http://www.lybenson.com' : 'http://127.0.0.1:9100'}`

export const user = serverRoot + '/api/user'

export const login = serverRoot + '/api/login/'

export const blogs= serverRoot + '/api/blogs'
