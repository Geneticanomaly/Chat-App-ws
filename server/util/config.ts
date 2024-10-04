import dotenv from 'dotenv';

dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL || '';
export const PORT: number = Number(process.env.PORT) || 3000;
export const SECRET: string = process.env.SECRET || '';
