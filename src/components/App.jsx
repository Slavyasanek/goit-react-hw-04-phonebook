import { Component } from "react";
import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

const CONTACTS_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }
  componentDidMount() {
    localStorage.getItem(CONTACTS_KEY) &&
    this.setState({contacts: JSON.parse(localStorage.getItem(CONTACTS_KEY))})
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length > this.state.contacts.length) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts))
    } else if (prevState.contacts.length < this.state.contacts.length) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts))
    }
  }

  addContact = data => {
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, data]
    }))
  }
  deleteContact = e => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e.target.closest('li').dataset.contact)
    }))
  }
  filterChange = ({ target }) => {
    this.setState({
      filter: target.value
    })
  }
  render() {
    return (
      <div>
        <Section 
        sectionType="form" 
        title="Phonebook">
          <ContactForm 
          saveContact={this.addContact} />
        </Section>
        <Section 
        sectionType="phonebook" 
        title="Contacts">
          {this.state.contacts.length > 0 ? (
            <>
              <Filter 
              filterChange={this.filterChange} 
              filterValue={this.state.filter} />
              <ContactList
                contacts={this.state.filter === ''
                  ? this.state.contacts
                  : this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()))} 
                  deleteContact={this.deleteContact} />
            </>
          ) : (
            <p>No contacts added yet</p>
          )}
        </Section>
      </div>
    );
  }
}

export default App;
