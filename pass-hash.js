const bcrypt = require('bcrypt');

async function hashPasword() {
  const myPassword = 'SATOSHIBTICOIN';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPasword();

