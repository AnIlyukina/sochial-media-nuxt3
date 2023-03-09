import UrlPattern from "url-pattern";
import {decodeAccessToken} from "~/server/utils/jwt";
import {sendError} from "h3";
import {createError} from "nuxt/app";
import {getUserById} from "~/server/db/users";

export default defineEventHandler (async(event) => {
    const endpoints = [
        '/api/auth/user'
    ]

    const isHandleByThisMiddleware = endpoints.some(endpoints => {
        const pattern = new UrlPattern(endpoints)

        return pattern.match(event.req.url)
    })

    if (!isHandleByThisMiddleware) {
        return
    }

    const token = event.req.headers['authorization']?.split(' '[1])
    const decoded = decodeAccessToken(token)

    if(!decoded) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorised'
        }))
    }

    try {

        const userId = decoded.userId
        const user = await getUserById(userId)
        event.context.auth = { user }
    } catch (error) {
        return
    }

})
