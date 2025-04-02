import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Layout() {
    return (
        <div className="flex min-h-screen w-full bg-gray-300">
            <Sidebar />
            <main className="flex-1 ml-64 transition-all duration-300">
                <Outlet />
            </main>
        </div>
    );
}