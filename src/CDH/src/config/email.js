import nodomailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodomailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
});

const sendemail = async(to, subject, text)=>{
    const mailoption ={
        from:process.env.EMAIL_USER,
        to:to,
        subject: subject,
        text: text,
    };
    return transporter.sendMail(mailoption);
}

const sendemailnotification = async(to,subject,text)=>{
    const transporter = nodomailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
    });
    const mail = {
        from:process.env.EMAIL_USER,
        to,
        subject,
        text,
    };
    return transporter.sendMail(mail);
}

export default {sendemail, sendemailnotification};