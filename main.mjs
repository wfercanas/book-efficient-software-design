import { Controller } from "./Controller/Controller.mjs";

class AddressBook {
  static main() {
    const controller = new Controller();
    controller.go();
  }
}

AddressBook.main();
