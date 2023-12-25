import { Observable } from "rxjs/internal/Observable";
import { environment } from "../../environment";
import { toParams } from "./email.utils";

const EmailService = {

    sendEmail: (name: string, subject: string, message: string): Observable<boolean> => {
        return new Observable<boolean>(observer => {
            sendEmail(name, subject, message)
                .then(isSuccess => observer.next(isSuccess))
                .finally(() => observer.unsubscribe());
        })
    }
}

async function sendEmail(name: string, subject: string, message: string): Promise<boolean> {
    return fetch(environment.mailServiceUrl, {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: toParams({
            access_token: environment.mailServiceToken,
            subject: `${name} - ${subject}`,
            text: message
        })
    }).then(response => {
        return response.status === 200;
    });
}

export default EmailService;
