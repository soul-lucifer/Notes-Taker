import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'react-hot-toast'
import type { User } from '@flownote/shared'

export default function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const setUser = useAppStore((s: any) => s.setUser)

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password })
                if (error) throw error
                if (data.user) {
                    setUser({ id: data.user.id, email: data.user.email!, name: '', plan: 'free' } as User)
                    navigate('/')
                }
            } else {
                const { data, error } = await supabase.auth.signUp({ email, password })
                if (error) throw error
                if (data.user) {
                    toast.success('Registration successful! Check your email.')
                }
            }
        } catch (error: any) {
            toast.error(error.message || 'Authentication failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-bg-primary">
            <div className="bg-bg-card border border-border p-8 rounded-lg w-full max-w-sm">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">
                    {isLogin ? 'Login to FlowNote' : 'Create an Account'}
                </h2>

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent hover:bg-red-600 text-white font-medium py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>

                    <div className="text-center mt-4 text-sm text-text-secondary">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-accent hover:underline"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
