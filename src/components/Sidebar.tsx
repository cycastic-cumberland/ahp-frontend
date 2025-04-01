import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import {FiBarChart2, FiEdit, FiHome, FiUpload} from "react-icons/fi";
import {MdOutlineDriveFolderUpload} from "react-icons/md";

const menuItems = [
    { path: '/gioi-thieu', label: 'Giới thiệu', icon: FiHome, color:'text-black' },
    { path: '/tai-ma-tran', label: 'Tải ma trận', icon: MdOutlineDriveFolderUpload , color:'text-black'},
    { path: '/nhap-du-lieu', label: 'Nhập dữ liệu', icon: FiEdit, color:'text-black' },
    { path: '/tinh-diem', label: 'Tính điểm các phương án', icon: FiBarChart2, color:'text-black' },
];

export default function Sidebar() {
    const location = useLocation();
    const { setCurrentPage } = useApp();

    return (
        <div className="w-72 fixed min-h-screen bg-gray-100 text-white  p-4 rounded-lg m-3">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-center text-black">Nhóm 4 - HTTRQĐ</h1>
            </div>
            <nav className="mb-8">
                <ul className="space-y-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        location.pathname === item.path
                                            ? 'bg-gray-300 text-white'
                                            : 'hover:bg-gray-300 text-gray-300 hover:text-black'
                                    }`}
                                    onClick={() => setCurrentPage(item.path.slice(1))}
                                >
                                    <Icon className={`text-xl ${location.pathname === item.path ? 'text-black' : item.color}`} />
                                    <span className="font-medium text-black">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

        </div>
    );
}