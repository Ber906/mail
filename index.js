const express = require('express');
const axios = require('axios');
const app = express();
const ainz = '@kyouya';

app.get('/', (req, res) => {
    res.json({𝖫𝗈𝗏𝖾𝗒𝗈𝗎: 'endpoints: gen/ and get/:email'});
});

app.get('/gen', async (req, res) => {
  try {
    const response = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
    const getemail = response.data[0];
    res.json({ email: getemail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Err: 500' });
  }
});

app.get('/get/:email', async (req, res) => {
  try {
    const divide = req.params.email.split('@');
    const name = divide[0];
    const domain = divide[1];
    const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${name}&domain=${domain}`); 
    const messages = response.data;
    const tite = [];
    for (const message of messages) {
      const msgId = message.id;
      const sendmsg = await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${name}&domain=${domain}&id=${msgId}`);   
      const sendmessage = {
        from: sendmsg.data.from,
        subject: sendmsg.data.subject,
        body: sendmsg.data.textBody,
        date: sendmsg.data.date
      };
      tite.push(sendmessage);
    }
    res.json(tite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Err: 500' });
  }
});

app.listen('5000', () => {
  console.log(ainz);
});