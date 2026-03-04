import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { useAppStore } from './store/useAppStore'
import type { User } from '@flownote/shared'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import NotePage from './pages/NotePage'
import AuthPage from './pages/AuthPage'

function App() {
    const navigate = useNavigate()
    const location = useLocation()
    const setUser = useAppStore(s => s.setUser)
    const [isInit, setIsInit] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser({ id: session.user.id, email: session.user.email!, name: '', plan: 'free' } as User)
                if (location.pathname === '/auth') navigate('/')
            } else {
                setUser(null)
                if (location.pathname !== '/auth') navigate('/auth')
            }
            setIsInit(true)
        })

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                setUser({ id: session.user.id, email: session.user.email!, name: '', plan: 'free' } as User)
            } else if (event === 'SIGNED_OUT') {
                setUser(null)
                navigate('/auth')
            }
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [navigate, setUser])

    if (!isInit) return <div className="h-screen w-screen bg-bg-primary" />

    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<AppShell />}>
                    <Route index element={<Dashboard />} />
                    <Route path="notes/:id" element={<NotePage />} />
                </Route>
            </Routes>
            <Toaster position="bottom-right" />
        </>
    )
}

export default App
