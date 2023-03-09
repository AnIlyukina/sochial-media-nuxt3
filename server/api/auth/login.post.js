import {sendError} from "h3";
import { getUserByUsername } from "~/server/db/users";
import bcript from "bcrypt";
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt";
import { userTransformer } from "~/server/transformers/user";
import { createRefreshToken } from "~/server/db/refreshToken";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, password } = body
    if (!username || !password) {
        return  sendError(event, createError({statusCode:400, statusMessage: 'Invalid params'}))
    }

    // Пользователь зарегистрирован
    const user = await getUserByUsername(username)

    if (!user) {
        return  sendError(event, createError({statusCode:400, statusMessage: 'Username or password is invalid'}))
    }

    // Сопоставить пароли
    const doesThePasswordMatch = await bcript.compare(password, user.password)

    if (!doesThePasswordMatch) {
        return  sendError(event, createError({statusCode:400, statusMessage: 'Username or password is invalid'}))
    }


    const { accessToken, refreshToken } = generateTokens(user)

    // сохранить в бд
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    // добавить http only cookie
    sendRefreshToken(event, refreshToken)
    return {
        user: userTransformer(user),
        access_token: accessToken
    }

})
