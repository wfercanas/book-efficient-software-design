import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

function addressBook() {
  const book = new AddressBook();
  book.go();
}

class AddressBook {
  constructor() {
    this._book = {};
    this._NAME_PATTERN = "^[a-zA-Z ]*$";
    this._PHONE_PATTERN = "^[0-9]*$";
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
    if (!this.isValid(this._NAME_PATTERN, name)) {
      return;
    }

    if (!this.isValid(this._PHONE_PATTERN, phone)) {
      return;
    }

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

  isValid(pattern, value) {
    const regex = new RegExp(pattern);
    return regex.test(value);
  }

  async getName(prompt) {
    let name = "";
    let again = true;

    while (again) {
      name = await this.getAnswer(prompt);
      name = name.trim();

      if (name.length === 0) {
        console.error(
          "A contact name must contain at least one uppercase or lowercase letter"
        );
        continue;
      }

      if (!this.isValid(this._NAME_PATTERN, name)) {
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
      phone = await this.getAnswer(prompt);

      if (phone.length === 0) {
        console.error("A contact phone must contain at least one number");
        continue;
      }

      if (!this.isValid(this._PHONE_PATTERN, phone)) {
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

    if (names.length === 0) {
      console.log("No entries in address book");
    } else {
      names.sort();
      for (let name of names) {
        if (
          !this.isValid(this._NAME_PATTERN, name) ||
          !this.isValid(this._PHONE_PATTERN, this._book[name].phone)
        ) {
          console.log(`["Invalid Name"]: ["Invalid Contact"]`);
        } else {
          console.log(`${name}: 
            phone: ${this._book[name].phone}
            email: ${this._book[name].email}`);
        }
      }
    }
  }
}

addressBook();
