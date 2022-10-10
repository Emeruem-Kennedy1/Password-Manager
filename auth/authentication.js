const {fetch} = import('node-fetch');
const apiUrl = `${process.env.API_ENTRYPOINT}/${process.env.API_KEY}/users`;

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

module.exports = {findUsers, findUserDetails};
