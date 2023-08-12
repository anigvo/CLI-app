const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const contactsPath = path.join(__dirname, "db", "contacts.json");

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const newContacts = [...data.slice(0, index), ...data.slice(index + 1)];
  await write(newContacts);
  return data[index];
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  data.push(newContact);
  await write(data);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
