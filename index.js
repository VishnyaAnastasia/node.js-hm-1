const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        listContacts();
      } catch (error) {
        console.error(error);
      }
      break;

    case "get":
      try {
        getContactById(id);
      } catch (error) {
        console.error(error);
      }
      break;

    case "add":
      try {
        addContact(name, email, phone);
      } catch (error) {
        console.error(error);
      }
      break;

    case "remove":
      try {
        removeContact(id);
      } catch (error) {
        console.error(error);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
