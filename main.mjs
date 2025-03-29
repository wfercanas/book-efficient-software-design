import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

function addressBook() {
  const book = new AddressBook();
  book.go();
}

class AddressBook {
  constructor() {
    this._book = {};
  }

  async go() {
    console.log("Hello, welcome to your Address Book App (ABA)");

    let name = await this.getName();
    while (name !== "exit") {
      const phone = await this.getPhone(name);
      this.addContact(name, phone);

      name = await this.getName();
    }

    this.displayBook();
  }

  addContact(name, phone) {
    if (!this._book[name]) {
      this._book[name] = phone;
    }
  }

  getAllContacts() {
    return this._book;
  }

  async getName() {
    const rl = readline.createInterface({ input, output });
    const name = await rl.question("Enter contact name ('exit' to quit): ");
    rl.close();
    return name;
  }

  async getPhone(name) {
    const rl = readline.createInterface({ input, output });
    const phone = await rl.question(`Enter phone number for ${name}: `);
    rl.close();
    return phone;
  }

  displayBook() {
    console.log("\nTEST: Display contents of address book");
    console.log("\nTEST: Address book contains the following contacts\n");

    const book = this.getAllContacts();
    const names = Object.keys(book);
    names.sort();

    for (let name of names) {
      console.log(`${name}: ${this._book[name]}`);
    }
  }
}

addressBook();
