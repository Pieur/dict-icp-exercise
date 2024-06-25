import { Response, Request } from 'express';
import { createReadStream, writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import mime from 'mime';

export default class ApisController {
  static async health(request: Request, response: Response) {
    return (response.send().statusCode = 204);
  }
}