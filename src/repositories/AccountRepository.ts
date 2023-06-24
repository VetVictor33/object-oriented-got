import { AppDataSource } from "../data-source";
import { Account } from "../entities/Account";
import { AccountError } from "../errors/AccountErrors";

export abstract class AccountRepository {
    private static accountRepository = AppDataSource.getRepository(Account);

    public static async createAccount(email: string, encryptedPassword: string): Promise<Account> {
        const newAccount = this.accountRepository.create({ email, password: encryptedPassword });
        await this.accountRepository.save(newAccount);
        return newAccount
    }
    public static async findById(accountId: number): Promise<Account> {
        const account = await this.accountRepository.findOneBy({ id: accountId });
        if (!account) throw new AccountError("Account not found")
        return account
    }
    public static async findByEmail(email: string): Promise<Account> {
        const account = await this.accountRepository.findOneBy({ email });
        if (!account) throw new AccountError("Account not found")
        return account
    }
    public static async findAll(): Promise<Account[]> {
        const sensibleAccounts = await this.accountRepository.find();
        sensibleAccounts.forEach(a => a.password = '******');
        const unsensibleAccounts = sensibleAccounts;
        return unsensibleAccounts
    }
}