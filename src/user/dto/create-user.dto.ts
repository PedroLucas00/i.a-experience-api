export class CreateUserDto {
    createdAt?: Date;
    updatedAt?: Date;
    email: string;
    password: string;
    name?: string;
}
