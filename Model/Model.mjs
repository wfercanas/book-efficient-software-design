import { ContactData } from "./ContactData.mjs";

class Model {
  constructor() {
    this._book = {};
  }

  addContact(name, phone, email) {
    const data = new ContactData(name, phone, email);
    if (!this._book[name]) {
      this._book[name] = data;
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
