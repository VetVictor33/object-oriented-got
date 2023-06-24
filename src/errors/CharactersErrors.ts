export class CharacterError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CharacterError';
    }
}