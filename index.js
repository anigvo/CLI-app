const Contacts = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      console.table(contacts);
      return contacts;
    case "get":
      const contact = await Contacts.getContactById(id);
      console.log(contact);
      return contact;
    case "add":
      const newContact = await Contacts.addContact({ name, email, phone });
      console.log(newContact);
      return newContact;
    case "remove":
      const removedContact = await Contacts.removeContact(id);
      console.log(removedContact);
      return removedContact;
    default:
      throw new Error("Invalid action");
  }
}

invokeAction(argv);
