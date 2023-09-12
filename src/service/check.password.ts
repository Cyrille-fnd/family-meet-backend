const checkPassword = async (plainPassword: string, hash: string): Promise<boolean> => {
    const bcrypt = require('bcrypt')

    return await bcrypt.compare(plainPassword, hash)
}

export default checkPassword

