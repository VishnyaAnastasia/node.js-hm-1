const path = require("path");
const fs = require("fs/promises");

const { uid } = require("uid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
  return JSON.parse(await fs.readFile(contactsPath, "utf8"));
}

async function listContacts() {
  const listContacts = await readContacts();
  console.table(listContacts);
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const [contactById] = contacts.filter(
    (item) => item.id === String(contactId)
  );
  console.log(contactById);
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = {
    id: uid(2),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log("New contact successfully added");
  console.table(contacts);
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const newContacts = contacts.filter((item) => item.id !== String(contactId));
  fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  console.log("Contact successfully removed");
  console.table(newContacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
