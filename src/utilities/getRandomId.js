const getRandomLetter = () => {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter;
};

const getRandomId = () => {
  // let randomId = localStorage.getItem('randomId8');

  // if coming back to the page, keep the previous id
  // if (randomId !== 'initialize') {
  // return randomId;
  // }

  let randomId = '';
  for (let i = 0; i < 8; i++) {
    randomId += getRandomLetter();
  }
  return randomId;
};

export default getRandomId;
