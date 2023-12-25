import { useState } from "react";
import "./ContactForm.scss"
import EmailService from "../../services/email/email.service";
import LoadingSpinner from "../loading-spinner/loading-spinner";

function ContactForm() {

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const clearFields = (): void => {
        setName('');
        setSubject('');
        setMessage('');
    }

    const validateFields = (): boolean => {
        return (!!name && !!subject && !!message);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!validateFields()) {
            return;
        }

        setLoading(true);
        EmailService.sendEmail(name, subject, message).subscribe(isSuccess => {
            if (isSuccess) {
                clearFields();
            } else {

            }
            setLoading(false);
        })
    }

    return (
        <div className="contact-form">
            <h2>Contact</h2>
            <span>Send a message</span>
            <form onSubmit={ handleSubmit }>
                <input type="text" className="text-field" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" className="text-field" placeholder='Subject' value={subject} onChange={(e) => setSubject(e.target.value)}/>
                <textarea className="text-field" maxLength={128} placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit">{ loading ? <LoadingSpinner size="SMALL" color="BLACK"></LoadingSpinner> : 'Send' }</button>
            </form>
        </div>
    )
  }
  
  export default ContactForm;