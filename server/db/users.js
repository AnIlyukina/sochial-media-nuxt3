import { prisma } from "~/server/db/index";
import bcript from 'bcrypt'

export const createUser = (userDate) => {
    const finalUserDate = {
        ...userDate,
        password: bcript.hashSync(userDate.password, 10)
    }
    return prisma.user.create({
        data: finalUserDate
    })
}

export const getUserByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}

export const getUserById = (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}
