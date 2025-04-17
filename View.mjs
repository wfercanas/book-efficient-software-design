import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

class View {
  constructor() {
    this._NAME_PATTERN = "^[a-zA-Z ]*$";
    this._PHONE_PATTERN = "^[0-9]*$";
  }

  async getAnswer(prompt) {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question(prompt);
    rl.close();
    return answer;
  }

  greet() {
    console.log("Hello, welcome to your Address Book App (ABA)");
  }

  displayBook(book) {
    console.log("\nTEST: Display contents of address book");
    console.log("\nTEST: Address book contains the following contacts\n");

    const names = Object.keys(book);

    if (names.length === 0) {
      console.log("No entries in address book");
      return;
    } else {
      names.sort();
      for (let name of names) {
        console.log(`${name}: 
            phone: ${book[name].getPhone()}
            email: ${book[name].getEmail()}`);
      }
      return;
    }
  }
}

export { View };
