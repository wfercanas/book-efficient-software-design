import { View } from "./View.mjs";
import { Model } from "./Model.mjs";

class Controller {
  constructor() {
    this._view = new View();
    this._model = new Model();
    this._NAME_PATTERN = "^[a-zA-Z ]*$";
    this._PHONE_PATTERN = "^[0-9]*$";
  }

  async go() {
    this._view.print("Hello, welcome to your Address Book App (ABA)");

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
      const email = await this._view.getAnswer(`Enter email for ${name}: `);
      this._model.addContact(name, phone, email);

      name = await this.getValidatedAnswer(nameQuestion);
    }

    this.displayBook();
  }

  isValid(pattern, value) {
    const regex = new RegExp(pattern);
    return regex.test(value);
  }

  async getValidatedAnswer(props) {
    const { prompt, minLength, pattern, errMessage } = props;
    let answer = "";
    let again = true;

    while (again) {
      answer = await this._view.getAnswer(prompt);
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
    this._view.print("\nTEST: Display contents of address book");
    this._view.print("\nTEST: Address book contains the following contacts\n");

    const names = Object.keys(this._model.getBook());

    if (names.length === 0) {
      this._view.print("No entries in address book");
      return;
    } else {
      names.sort();
      for (let name of names) {
        const contact = this._model.getContact(name);
        this._view.print(`${name}:
            name: ${contact.name} 
            phone: ${contact.phone}
            email: ${contact.email}`);
      }
      return;
    }
  }
}

export { Controller };
