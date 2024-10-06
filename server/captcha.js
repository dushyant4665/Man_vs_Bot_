const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json()); 

app.post('/verify-captcha', async (req, res) => {
  const { captchaToken } = req.body;
  const secretKey = your-hcaptcha-secret-key; 

  const verificationURL = `https://hcaptcha.com/siteverify`;
  try {
    const response = await axios.post(verificationURL, null, {
      params: {
        secret: secretKey,
        response: captchaToken,
      },
    });

    if (response.data.success) {
      res.status(200).json({ message: 'CAPTCHA verified successfully.' });
    } else {
      res.status(400).json({ message: 'CAPTCHA verification failed.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying CAPTCHA.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
