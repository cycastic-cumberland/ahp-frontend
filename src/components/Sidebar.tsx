import {Link, useLocation, useNavigate} from 'react-router-dom';
import {FiBarChart2, FiEdit, FiHome, FiUpload} from "react-icons/fi";
import {MdOutlineDriveFolderUpload} from "react-icons/md";

const menuItems = [
    { path: '/landing', label: 'Giới thiệu', icon: FiHome, color:'text-black' },
    { path: '/upload-matrices', label: 'Tải ma trận', icon: MdOutlineDriveFolderUpload , color:'text-black'},
    { path: '/input', label: 'Nhập dữ liệu', icon: FiEdit, color:'text-black' },
    { path: '/process', label: 'Tính điểm các phương án', icon: FiBarChart2, color:'text-black' },
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

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
                                    onClick={() => navigate(item.path.slice(1))}
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