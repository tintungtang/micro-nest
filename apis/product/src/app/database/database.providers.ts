import * as mongoose from 'mongoose';
import * as process from 'node:process';

const { DB_CONNECTION_STRING, DB_ADMIN_USER, DB_ADMIN_PASSWORD, DB_NAME } = process.env;

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> => {
            if (!DB_CONNECTION_STRING) {
                throw new Error('DB_CONNECTION_STRING is required');
            }

            return mongoose.connect(DB_CONNECTION_STRING, {
                dbName: DB_NAME,
                ...(DB_ADMIN_USER && DB_ADMIN_PASSWORD
                    ? {
                        auth: {
                            username: DB_ADMIN_USER,
                            password: DB_ADMIN_PASSWORD
                        }
                    }
                    : {})
            });
        }
    }
];
