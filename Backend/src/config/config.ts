import 'dotenv/config'

const config = {
    DATABASE  : process.env.DATABASE || 'mongodb://localhost:27017/library2',
    PORT      : process.env.PORT || 3700,
}

export default config