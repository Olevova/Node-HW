const some = require('./module.js');
const { listContacts, getContactById, removeContact, addContact} = require('./db/contacts');

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
    console.log(action);
    switch (action) {
    case "list":
          const contacts = await listContacts();
          console.table(contacts)
      break;

        case "get":
            const contactId = id.toString();
            const contact = await getContactById(contactId);
            console.table(contact)
      break;

    case "add":
            const contactAd = await addContact(name, email, phone);
      break;

        case "remove":
            const delId = id.toString();
            removeContact(delId);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);