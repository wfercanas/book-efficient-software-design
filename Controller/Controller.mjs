import { View } from "../View/View.mjs";
import { Model } from "../Model/Model.mjs";
import { ContactData } from "../Model/ContactData.mjs";
import test from "node:test";

class Controller {
  constructor() {
    this._view = new View();
    this._model = new Model();
    this._NAME_PATTERN = "^[a-zA-Z ]*$";
    this._PHONE_PATTERN = "^[0-9]*$";
  }

  async go() {
    this._view.log("Hello, welcome to your Address Book App (ABA)");

    const nameValidations = {
      property: "name",
      minLength: {
        value: 1,
        errMessage: "\tInvalid: a name must be at least 1 character long",
      },
      pattern: {
        value: this._NAME_PATTERN,
        errMessage:
          "\tInvalid: A contact name must contain only uppercase or lowercase letters and spaces",
      },
    };

    const phoneValidations = {
      property: "phone",
      minLength: {
        value: 1,
        errMessage: `\tInvalid: a phone number must be at least 1 character long`,
      },
      pattern: {
        value: this._PHONE_PATTERN,
        errMessage: "\tInvalid: a phone must contain only numbers",
      },
    };

    let again = true;
    while (again) {
      const newContact = await this._view.getNewContact();

      if (newContact instanceof ContactData) {
        let tests = [];
        tests.push(this.validateAnswer(newContact.getName(), nameValidations));
        tests.push(
          this.validateAnswer(newContact.getPhone(), phoneValidations)
        );

        const passed = tests.filter((result) => result === true);
        if (passed.length === tests.length) {
          this._model.addContact(newContact);
        }
      }

      if (!newContact) {
        again = false;
      }
    }

    this.displayBook();
  }

  isValid(pattern, value) {
    const regex = new RegExp(pattern);
    return regex.test(value);
  }

  validateAnswer(answer, validations) {
    const { minLength, pattern } = validations;

    if (answer.length < minLength.value) {
      this._view.error(minLength.errMessage);
      return false;
    }

    if (!this.isValid(pattern.value, answer)) {
      this._view.error(pattern.errMessage);
      return false;
    }

    return true;
  }

  displayBook() {
    this._view.log("\nTEST: Display contents of address book");
    this._view.log("\nTEST: Address book contains the following contacts\n");

    const names = this._model.getAllNames();

    if (names.length === 0) {
      this._view.log("No entries in address book");
      return;
    } else {
      names.sort();
      for (let name of names) {
        const contact = this._model.getContact(name);
        this._view.log(`${name}:
            name: ${contact.name} 
            phone: ${contact.phone}
            email: ${contact.email}`);
      }
      return;
    }
  }
}

export { Controller };
