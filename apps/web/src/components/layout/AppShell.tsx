import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import RecordModal from '../recorder/RecordModal'

export default function AppShell() {
    return (
        <div className="flex flex-col h-screen w-full bg-bg-primary overflow-hidden">
            <Topbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-auto flex flex-col relative">
                    <Outlet />
                </main>
            </div>
            <RecordModal />
        </div>
    )
}
