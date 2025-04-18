import { ContactData } from "./ContactData.mjs";

class Model {
  constructor() {
    this._book = {};
  }

  addContact(newContact) {
    if (newContact instanceof ContactData) {
      const name = newContact.getName();
      if (!this._book[name]) {
        this._book[name] = newContact;
      }
    }
  }

  getAllNames() {
    return Object.keys(this._book);
  }

  getContact(name) {
    if (!this._book[name]) {
      return {
        name: undefined,
        phone: undefined,
        email: undefined,
      };
    }

    return {
      name: this._book[name].getName(),
      phone: this._book[name].getPhone(),
      email: this._book[name].getEmail(),
    };
  }
}

export { Model };
