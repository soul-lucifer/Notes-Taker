import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import 'dotenv/config'

const app = express()

// Middleware
app.use(helmet())
app.use(cors({
    origin: [
        'http://localhost:5173',
        /https:\/\/.*\.vercel\.app$/
    ]
}))
app.use(compression())
app.use(morgan('dev'))
app.use(express.json())

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' })
})

// Placeholder routes
app.use('/api/recordings', (req: Request, res: Response) => { res.json({ msg: "recordings api" }) })
app.use('/api/notes', (req: Request, res: Response) => { res.json({ msg: "notes api" }) })

const PORT = process.env.PORT || 4000

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`)
    })
}

export default app
