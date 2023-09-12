const hashPassword = async (plainPassword: string): Promise<string> => {
    const bcrypt = require('bcrypt')
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds);

    return bcrypt.hash(plainPassword, salt)
}

export default hashPassword
