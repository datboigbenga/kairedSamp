const sendEmail =require("./sendEmail");


const sendVerificationEmail= async({userName, email, verificationPin})=>{

    const message = `<h5>please input the 6 digit pin attached to this mail to verify your email
    Here-> ${verificationPin}`
    return sendEmail({
        to:email,
        subject: "Email Confirmation",
        html: `Hello ${userName},
        ${message}` 
    })
}

module.exports = sendVerificationEmail;