import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
    return (
        <div className="flex min-h-screen justify-center items-center bg-gray-200 p-4">
            <div className="flex w-full  min-w-max h-[95vh] gap-4">
                <div className="w-64 bg-white rounded-xl shadow-md overflow-hidden">
                    <Sidebar />
                </div>
                <main className="flex-1 bg-white rounded-xl shadow-md overflow-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
