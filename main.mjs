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

    let name = await this.getName("Enter contact name ('exit' to quit): ");
    while (name !== "exit") {
      const phone = await this.getPhone(`Enter phone number for ${name}: `);
      const email = await this.getAnswer(`Enter email for ${name}: `);
      this.addContact(name, phone, email);

      name = await this.getName("Enter contact name ('exit' to quit): ");
    }

    this.displayBook();
  }

  addContact(name, phone, email) {
    if (!this._book[name]) {
      this._book[name] = { phone, email };
    }
  }

  getAllContacts() {
    return this._book;
  }

  async getAnswer(prompt) {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question(prompt);
    rl.close();
    return answer;
  }

  async getName(prompt) {
    let name = "";
    let again = true;

    while (again) {
      const regex = new RegExp("^[a-zA-Z ]*$");
      name = await this.getAnswer(prompt);

      if (name.length === 0) {
        console.error(
          "A contact name must contain at least one uppercase or lowercase letter"
        );
        continue;
      }

      if (!regex.test(name)) {
        console.error(
          "A contact name must contain only uppercase or lowercase letters and spaces"
        );
        continue;
      }

      again = false;
    }

    return name;
  }

  async getPhone(prompt) {
    let phone = "";
    let again = true;

    while (again) {
      const regex = new RegExp("^[0-9]*$");
      phone = await this.getAnswer(prompt);

      if (phone.length === 0) {
        console.error("A contact phone must contain at least one number");
        continue;
      }

      if (!regex.test(phone)) {
        console.error("A contact phone must contain only numbers");
        continue;
      }

      again = false;
    }

    return phone;
  }

  displayBook() {
    console.log("\nTEST: Display contents of address book");
    console.log("\nTEST: Address book contains the following contacts\n");

    const book = this.getAllContacts();
    const names = Object.keys(book);
    names.sort();

    for (let name of names) {
      console.log(`${name}: 
        phone: ${this._book[name].phone}
        email: ${this._book[name].email}`);
    }
  }
}

addressBook();
