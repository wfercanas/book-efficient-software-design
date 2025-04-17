class ContactData {
  constructor(name, phone, email) {
    this._name = name;
    this._phone = phone;
    this._email = email;
  }

  getName() {
    return this._name;
  }

  getPhone() {
    return this._phone;
  }

  getEmail() {
    return this._email;
  }
}

export { ContactData };
