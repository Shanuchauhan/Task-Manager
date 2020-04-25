const sgMail=require('@sendgrid/mail')

const sendGridApi=process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendGridApi)

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'abc@abc.com',
        subject:'Welcome',
        text:`Welcome to the App,${name}. Let us know more.`
    })
}

const sendExitEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'abc@abc.com',
        subject:'We Hope to See You Again!',
        text:`Sad to see you go, ${name}. Let us know where we went wrong. Hope to see you again!`
    })
}

module.exports={
    sendWelcomeEmail,
    sendExitEmail
}