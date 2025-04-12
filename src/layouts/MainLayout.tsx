import Sidebar from '../components/Sidebar';
import {FC, ReactNode} from "react";

const MainLayout: FC<{ children?: ReactNode | ReactNode[] }> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-300">
            <Sidebar />
            <main className="flex-1 ml-64 transition-all duration-300">
                { children }
            </main>
        </div>
    );
}
export default MainLayout;
