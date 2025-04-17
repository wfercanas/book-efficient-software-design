class Model {
  constructor() {
    this._book = {};
  }

  addContact(name, phone, email) {
    if (!this._book[name]) {
      this._book[name] = { phone, email };
    }
  }

  getBook() {
    return this._book;
  }
}

export { Model };
