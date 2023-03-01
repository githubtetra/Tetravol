import * as CryptoJS from 'crypto-js';

const key: string = "12345678901234567890123456789012";

export default class Encrypt {
    public static encrypt(data: string): string {
        return CryptoJS.AES.encrypt(data, key).toString();
    }

    public static decrypt(data: string): string {
        return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
    }
}