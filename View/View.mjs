import { ContactData } from "../Model/ContactData.mjs";
import { DisplayData } from "./DisplayData.mjs";
import { GetData } from "./GetData.mjs";

class View {
  constructor() {
    this._getData = new GetData();
    this._displayData = new DisplayData();
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
    this._displayData.print(message);
  }
}

export { View };
