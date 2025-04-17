import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

class View {
  constructor() {}

  async getAnswer(prompt) {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question(prompt);
    rl.close();
    return answer;
  }

  print(message) {
    console.log(message);
  }
}

export { View };
