import twilio from "twilio";

const accountSid = process.env.ACCOUNT_SID_KEY;
const authToken = process.env.AUTH_TOKEN_KEY;
console.log(accountSid);
const client = twilio(accountSid, authToken);

export const GenerateAccessCode = () => {
  const code = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
  return { code, expiry };
};

export const SendVerificationCode = async (
  code: number,
  toPhoneNumber: string
) => {
  console.log(toPhoneNumber, 'toPhoneNumber');
  const response = await client.messages.create({
    body: `Your verification code is ${code} it will expire within 30 minutes.`,
    from: process.env.PHONE_ADMIN,
    to: toPhoneNumber.trim(),
  });
  console.log(response);
  return response;
};