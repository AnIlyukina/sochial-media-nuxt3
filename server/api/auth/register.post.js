export default defineEventHandler ( async (event) => {
    console.log(event)
    const body = await readBody(event)

    return {
        body: body
    }
})
