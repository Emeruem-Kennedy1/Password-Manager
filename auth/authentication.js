import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
const apiUrl = `${process.env.API_ENTRYPOINT}/${process.env.API_KEY}/users`;
console.log(apiUrl);

const findUsers = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}
const findUserDetails = async (emailID) => {
    const response = await fetch(apiUrl+`/${emailID}`);
    const data = await response.json();
    return data;
}

export {findUsers, findUserDetails};
