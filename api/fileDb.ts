import { promises as fs } from 'fs';
import { randomUUID } from 'crypto';
import { IMessage, TMessageWithoutIdAndDatetime } from "./types";

const pathName = './db.json';
let data: IMessage[] = [];

const fileDb = {
  async init () {
    try {
      const fileContents = await fs.readFile(pathName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      console.error(e);
      data = [];
    }
  },
  async getItems() {
    return data;
  },
  async addItem(item: TMessageWithoutIdAndDatetime) {
    const product: IMessage = {
      ...item,
      id: randomUUID(),
      datetime: new Date().toISOString(),
    };

    data.push(product);
    await this.save();
    return product.id;
  },
  async save() {
    await fs.writeFile(pathName, JSON.stringify(data));
  },
}

export default fileDb;