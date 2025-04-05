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

  getBook() {
    return this._book;
  }

  async go() {
    console.log("Hello, welcome to your Address Book App (ABA)");

    const nameQuestion = {
      prompt: "Enter contact name ('exit' to quit): ",
      minLength: 1,
      pattern: this._NAME_PATTERN,
      errMessage:
        "A contact name must contain only uppercase or lowercase letters and spaces",
    };

    const phoneQuestion = {
      prompt: "Enter phone number: ",
      minLength: 1,
      pattern: this._PHONE_PATTERN,
      errMessage: "A contact phone must contain only numbers",
    };

    let name = await this.getValidatedAnswer(nameQuestion);

    while (name !== "exit") {
      const phone = await this.getValidatedAnswer(phoneQuestion);
      const email = await this.getAnswer(`Enter email for ${name}: `);
      this.addContact(name, phone, email);

      name = await this.getValidatedAnswer(nameQuestion);
    }

    this.displayBook();
  }

  isValid(pattern, value) {
    const regex = new RegExp(pattern);
    return regex.test(value);
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

  async getAnswer(prompt) {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question(prompt);
    rl.close();
    return answer;
  }

  async getValidatedAnswer(props) {
    const { prompt, minLength, pattern, errMessage } = props;
    let answer = "";
    let again = true;

    while (again) {
      answer = await this.getAnswer(prompt);
      answer = answer.trim();

      if (answer.length < minLength) {
        console.error(
          `Invalid: your answer your be at least ${minLength} characters long`
        );
        continue;
      }

      if (!this.isValid(pattern, answer)) {
        console.error(errMessage);
        continue;
      }

      again = false;
    }

    return answer;
  }

  displayBook() {
    console.log("\nTEST: Display contents of address book");
    console.log("\nTEST: Address book contains the following contacts\n");

    const book = this.getBook();
    const names = Object.keys(book);

    if (names.length === 0) {
      console.log("No entries in address book");
      return;
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
      return;
    }
  }
}

addressBook();
