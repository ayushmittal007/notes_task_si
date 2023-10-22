const nodemailer = require('nodemailer');

const sendmail = async (email,otp) => {
  try{
    const msg = {
        from: 'Ayush Agrawal" <ayushagrawal102004@gmail.com>',
        to: email,
        subject: `${otp} is your OTP from Ayush`,
        html: `
          <p style="margin-bottom: 30px;">Please enter this OTP to proceed further</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center; color:green;">${otp}</h1>
        `,
    }

    const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASS
            },
            port: 465,
            secure : true,
            host: "smtp.gmail.com"
    });

    transporter.sendMail(msg,err=>{
        if(err){ 
          console.log(err);
          return false;
        } 
        else {
          console.log("mail sent");
          return true;
        }
    });
  }catch(err){
    return next(err);
  }
}

module.exports = {sendmail};