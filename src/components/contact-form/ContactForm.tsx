import { useState } from 'react';
import './ContactForm.scss'
import EmailService from '../../services/email/email.service';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { Outcome } from './ContactForm.typings';

function ContactForm() {

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [outcome, setOutcome] = useState('neutral' as Outcome);

    const clearFields = (): void => {
        setName('');
        setSubject('');
        setMessage('');
    }

    const validateFields = (): boolean => {
        return (!!name && !!subject && !!message);
    }

    const handleSetTimer = (outcome: Outcome): void => {
        setOutcome(outcome);
        setTimeout(() => {
            setOutcome('neutral');
        }, outcome === 'isSuccess' ? 3000 : 1000);
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
        EmailService.sendEmail(name, subject, message).subscribe(isSuccess => {
            if (isSuccess) {
                clearFields();
            }
            setLoading(false);
            handleSetTimer(isSuccess ? 'isSuccess' : 'isFailure');
        });
    }

    return (
        <div className='contact-form'>
            <h2>Contact</h2>
            <span>Send a message</span>
            <form onSubmit={ handleSubmit }>
                <input type='text' className='text-field name-field' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input type='text' className='text-field subject-field' placeholder='Subject' value={subject} onChange={(e) => setSubject(e.target.value)}/>
                <textarea className='text-field message-field' maxLength={128} placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type='submit' className={outcome}>{ 
                    loading ? 
                        <LoadingSpinner size='SMALL' color='BLACK'></LoadingSpinner> : 
                        outcome !== 'neutral' ?
                            <img src={`/assets/icons/${outcome === 'isSuccess' ? 'check' : 'x'}.svg`}/> :
                            'Send' 
                }</button>
            </form>
        </div>
    )
  }
  
  export default ContactForm;