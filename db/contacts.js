const  {nanoid} = require('nanoid');
const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.join('db','contacts.json');


async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    }
    catch (error) {
        console.log(error);   
    }
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.filter((i) => i.id === contactId);
    if (contact.length>0) {
        return contact;
    }
    else{
        console.log('its not contact with such ID, try another ID');
    }
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    if (contacts.find((i) => i.id === contactId)) {
        const delContact = contacts.filter((i) => i.id === contactId);
        const contactsNew = contacts.filter((i) => i.id !== contactId);
        console.log(`this contact del`);
        console.table(delContact)
       return await fs.writeFile(contactsPath, JSON.stringify(contactsNew))
    }
    console.log("cant find such contact for del");
    return
}

async function addContact(name, email, phone) {
    if (!name || !email || !phone) {
        console.log("you miss some");
        return
    }
    const contacts = await listContacts();
    const contactForAdd = {id: nanoid(2), name, email, phone}
    const contactsNew = [...contacts, contactForAdd]
    console.table(contactForAdd);
    await fs.writeFile(contactsPath, JSON.stringify(contactsNew))
}
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
    