import 'reflect-metadata'

import { Connection, createConnection } from 'typeorm'

export const query = async (sqlStatement: string): Promise<void> => {
  const connection: Connection = await createConnection()
  console.log('Connection established.')

  const queryResult = await connection.manager.query(sqlStatement)
  console.log(`queryResult`)
  console.log(JSON.stringify(queryResult, null, 2))

  console.log('Closing connection.')
  await connection.close()
  console.log('Connection closed.')
}
