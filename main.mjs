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

  async getName(rl) {
    return await rl.question("Enter contact name ('exit' to quit): ");
  }

  async go() {
    console.log("Hello, welcome to your Adress Book App (ABA)");
    const rl = readline.createInterface({ input, output });

    let name = await this.getName(rl);
    while (name !== "exit") {
      this.addName(name);
      name = await this.getName(rl);
    }

    rl.close();
    this.displayBook();
  }
}

addressBook();
