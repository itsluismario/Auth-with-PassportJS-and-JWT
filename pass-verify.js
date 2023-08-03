const bcrypt = require('bcrypt');

async function hashPasword() {
  const myPassword = 'SATOSHIBTICOIN';
  const hash = '$2b$10$hlfCc8ODapOcNL.BQAN7Gul2./NaQx5io/KSbb/jad1792aeitLIW';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

hashPasword();

