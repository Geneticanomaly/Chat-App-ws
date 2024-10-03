import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
    AllowNull,
} from 'sequelize-typescript';

@Table({
    tableName: 'users',
    underscored: true,
    timestamps: true,
})
export default class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING,
        validate: {
            isEmail: true,
        },
    })
    email!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    username!: string;
}
