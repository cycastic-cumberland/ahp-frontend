import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Layout() {
    return (
        <div className="flex flex-row min-h-screen w-full bg-gray-300">
            <Sidebar />
            <main className="flex-1  ml-72 transition-all duration-300">
                <Outlet />
            </main>
        </div>
    );
}