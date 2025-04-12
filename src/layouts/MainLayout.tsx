import Sidebar from '../components/Sidebar';
import {FC, ReactNode} from "react";

const MainLayout: FC<{ children?: ReactNode | ReactNode[] }> = ({ children }) => {
    return (
        <div className="flex flex-row min-h-screen bg-gray-300">
            <Sidebar />
            <main className="flex-1 ml-72 transition-all duration-300">
                { children }
            </main>
        </div>
    );
}
export default MainLayout;
