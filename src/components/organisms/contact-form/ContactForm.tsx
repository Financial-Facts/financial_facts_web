import { useState } from 'react';
import SubmitButton from '../../molecules/submit-button/submit-button';
import { Outcome } from '../../molecules/submit-button/submit-button.typings';
import './ContactForm.scss';
import { CONSTANTS } from '../../../constants/constants';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environment';

function ContactForm() {

    const [name, setName] = useState(CONSTANTS.EMPTY);
    const [email, setEmail] = useState(CONSTANTS.EMPTY);
    const [message, setMessage] = useState(CONSTANTS.EMPTY);
    const [loading, setLoading] = useState(false);
    const [outcome, setOutcome] = useState<Outcome>('neutral');

    const clearFields = (): void => {
        setName(CONSTANTS.EMPTY);
        setEmail(CONSTANTS.EMPTY);
        setMessage(CONSTANTS.EMPTY);
    }

    const validateFields = (): boolean => {
        return (!!name && !!email && !!message);
    }

    const handleSetTimer = (outcome: Outcome): void => {
        setOutcome(outcome);
        setTimeout(() => {
            setOutcome('neutral');
        }, outcome === 'isSuccess' ? 3000 : 1000);
    }

    const sendEmail = (form: HTMLFormElement): void => {
        emailjs.sendForm(
            environment.emailServiceId,
            environment.emailTemplateId,
            form,
            {
                publicKey: environment.emailPublicToken
            })
        .then(() => {
                clearFields();
                handleSetTimer('isSuccess');
            }, () => {
                handleSetTimer('isFailure');
            })
        .finally(() => setLoading(false));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (outcome !== 'neutral') {
            return;
        }
        
        if (!validateFields()) {
            handleSetTimer('isFailure');
            return;
        }

        setLoading(true);
        const element = event.target as HTMLFormElement;
        sendEmail(element);
    }

    return (
        <div className='contact-form'>
            <h2>Contact Us</h2>
            <span>Send us a message</span>
            <form onSubmit={ handleSubmit }>
                <input type='text' name='user_name' className='text-field name-field' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input type='text' name='user_email' className='text-field subject-field' placeholder='Reply email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <textarea name='message' className='text-field message-field' maxLength={128} placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)}/>
                <SubmitButton loading={loading} outcome={outcome}/>
            </form>
        </div>
    )
  }
  
  export default ContactForm;