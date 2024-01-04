const sendEmail =require("./sendEmail");


const sendVerificationEmail= async({userName, email, verificationToken})=>{

    const message = `<h5>please input the 5 digit pin attached to this mail to verify your email <br>${verificationToken}</h5>`
    return sendEmail({
        to:email,
        subject: "Email Confirmation",
        html: `Hello ${userName},
        ${message}` 
    })
}

module.exports = sendVerificationEmail;
