import { ClientSession, connection } from 'mongoose'

export const runTransaction = async <T>(fn: (session: ClientSession) => Promise<T>): Promise<T> => {
	const session: ClientSession = await connection.startSession()

	try {
		session.startTransaction()
		const result = await fn(session)
		await session.commitTransaction()
		return result
	} catch (error) {
		await session.abortTransaction()
		throw error
	} finally {
		session.endSession()
	}
}
