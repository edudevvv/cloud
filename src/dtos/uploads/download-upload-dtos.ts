import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DownloadUploadService {
    constructor () {}

    async saveFile(buffer: string, name: string): Promise<string> {
        const filePath = path.join(`${process.cwd()}/data/uploads`, name);
        const fileBuffer = Buffer.from(buffer, 'base64');

        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, fileBuffer, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(filePath);
                }
            });
        });
    }

    async deleteFile(path: string) {
        if (!fs.existsSync(path)) return false;
        
        await fs.rmSync(path, { recursive: true });
        return true;
    }
}