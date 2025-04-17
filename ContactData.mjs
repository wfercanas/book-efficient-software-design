class ContactData {
  constructor(phone, email) {
    this._phone = phone;
    this._email = email;
  }

  getPhone() {
    return this._phone;
  }

  getEmail() {
    return this._email;
  }
}

export { ContactData };
