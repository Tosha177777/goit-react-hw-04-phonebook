import React, { useState, useEffect } from 'react';
import Contacts from './Form/Contacts';
import Title from 'components/Title/Title';
import ContactList from './ContactList/ContactItemRender';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
    if (parsedContacts.length > 0) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const onDelete = name => {
    setContacts(contacts.filter(contact => contact.name !== name));
  };

  const handleContact = newContact => {
    if (
      contacts.some(
        name => name.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    } else if (!newContact.name || !newContact.number) {
      alert('Fill the form');
      return;
    }

    setContacts([...contacts, newContact]);
  };

  const onFilterChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'filter':
        setFilter(value);
        break;

      default:
        return;
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <Title title={'Phonebook'}>
        <Contacts handleContact={handleContact} />
      </Title>
      <Title title={'Contacts'}>
        <Filter filter={filter} onFilterChange={onFilterChange} />
        <ContactList contacts={filteredContacts} onDelete={onDelete} />
      </Title>
    </div>
  );
};
export default App;
// export default class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const stringifiedContacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
//     if (parsedContacts.length > 0) {
//       this.setState({
//         contacts: parsedContacts,
//       });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts.length !== prevState.contacts.length) {
//       const stringifiedContacts = JSON.stringify(this.state.contacts);
//       localStorage.setItem('contacts', stringifiedContacts);
//     }
//   }

//   onDelete = name => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.name !== name),
//     }));
//   };

//   handleContact = newContact => {
//     if (
//       this.state.contacts.some(
//         name => name.name.toLowerCase() === newContact.name.toLowerCase()
//       )
//     ) {
//       alert(`${newContact.name} is already in contacts`);
//       return;
//     } else if (!newContact.name || !newContact.number) {
//       alert('Fill the form');
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   };

//   onFilterChange = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//     return (
//       <div>
//         <Title title={'Phonebook'}>
//           <Contacts handleContact={this.handleContact} />
//         </Title>
//         <Title title={'Contacts'}>
//           <Filter filter={filter} onFilterChange={this.onFilterChange} />
//           <ContactList contacts={filteredContacts} onDelete={this.onDelete} />
//         </Title>
//       </div>
//     );
//   }
// }
