import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASS

console.log("이메일 : ", email);
console.log("비번 : ", password);

export const transporter = nodemailer.createTransport({
    service: 'naver',
    auth: {
        user: email,
        pass: password,
    },
});

export const mailOptions = {
    from: email,
    to: email,
}
