export class MonsterError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MonsterError';
    }
}