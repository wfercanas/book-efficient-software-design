import { View } from "./View.mjs";
import { Model } from "./Model.mjs";

class Controller {
  constructor() {
    this.view = new View();
    this.model = new Model();
    this._NAME_PATTERN = "^[a-zA-Z ]*$";
    this._PHONE_PATTERN = "^[0-9]*$";
  }

  async go() {
    this.view.greet();

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
      const email = await this.view.getAnswer(`Enter email for ${name}: `);
      this.model.addContact(name, phone, email);

      name = await this.getValidatedAnswer(nameQuestion);
    }

    this.view.displayBook(this.model.getBook());
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
      answer = await this.view.getAnswer(prompt);
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
}

export { Controller };
