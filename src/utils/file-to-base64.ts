import { promises as fs } from 'fs';
import { join } from 'path';

export async function fileToBase64(filePath: string): Promise<string> {
  const fileBuffer = await fs.readFile(filePath);
  return fileBuffer.toString('base64');
}
