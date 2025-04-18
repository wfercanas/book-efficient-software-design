import { ContactData } from "../Model/ContactData.mjs";
import { GetData } from "./GetData.mjs";

class View {
  constructor() {
    this._getData = new GetData();
  }

  async getNewContact() {
    const name = await this._getData.getAnswer(
      "Enter contact name ('exit' to quit): "
    );
    if (name !== "exit") {
      var phone = await this._getData.getAnswer("Enter phone number: ");
      var email = await this._getData.getAnswer("Enter email: ");
      return new ContactData(name, phone, email);
    } else {
      this._getData.close();
    }
  }

  print(message) {
    console.log(message);
  }
}

export { View };
