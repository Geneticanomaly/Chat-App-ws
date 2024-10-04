import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import { DATABASE_URL } from './config';
import path from 'path';

// Initialize Sequelize with Sequelize-typescript
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    models: [path.resolve(__dirname, 'models')],
});

// Function to run migrations
const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: {
            glob: 'migrations/*.js',
        },
        storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
        context: sequelize.getQueryInterface(),
        logger: console,
    });
    const migrations = await migrator.up();
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    });
};

// Function to connect to the database and run migrations
const connectToDatabase = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        await runMigrations();
        console.log('Connected to database');
    } catch (error) {
        console.error('Connecting to database failed!', error);
        process.exit(1);
    }
};

// Exporting sequelize and connection function
export { connectToDatabase, sequelize };
