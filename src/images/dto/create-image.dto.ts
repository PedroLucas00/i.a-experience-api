export class CreateImageDto {
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    urlImage: string;
    name: string;
    prompt: string;
    isSolved: boolean;
}
