import { useState } from "react";
import "./ContactForm.scss"

function ContactForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
    }

    return (
        <div className="contact-form">
            <h2>Contact</h2>
            <span>Send a message</span>
            <form onSubmit={ handleSubmit }>
                <input type="text" className="text-field" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                <input type="text" className="text-field" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <textarea className="text-field" maxLength={128} placeholder='Message' onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
  }
  
  export default ContactForm;