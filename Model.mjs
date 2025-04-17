import { ContactData } from "./ContactData.mjs";

class Model {
  constructor() {
    this._book = {};
  }

  addContact(name, phone, email) {
    const data = new ContactData(phone, email);
    if (!this._book[name]) {
      this._book[name] = data;
    }
  }

  getBook() {
    return this._book;
  }
}

export { Model };
