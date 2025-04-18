import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

class GetData {
  constructor() {
    this._readline = readline.createInterface({ input, output });
  }

  async getAnswer(prompt) {
    const answer = await this._readline.question(prompt);
    return answer.trim();
  }

  close() {
    this._readline.close();
  }
}

export { GetData };
