import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

function addressBook() {
  const book = new AddressBook();
  book.go();
}

class AddressBook {
  constructor() {
    this._book = [];
  }

  addName(name) {
    if (!this._book.includes(name)) {
      this._book.push(name);
    }
  }

  getNames() {
    return this._book;
  }

  displayBook() {
    console.log("\nTEST: Display contents of address book");
    console.log("\nTEST: Address book contains the following contacts\n");

    for (let item of this.getNames()) {
      console.log(item);
    }
  }

  async getName() {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question("Enter contact name ('exit' to quit): ");
    rl.close();
    return answer;
  }

  async go() {
    console.log("Hello, welcome to your Address Book App (ABA)");

    let name = await this.getName();
    while (name !== "exit") {
      this.addName(name);
      name = await this.getName();
    }

    this.displayBook();
  }
}

addressBook();
