import {Link, useLocation, useNavigate} from 'react-router-dom';
import {FiBarChart2, FiEdit, FiHome, FiUpload} from "react-icons/fi";
import {MdOutlineDriveFolderUpload} from "react-icons/md";

const menuItems = [
    { path: '/', label: 'Giới thiệu', icon: FiHome, color:'text-black' },
    { path: '/criteriaComparisonMatrix', label: 'Nhập dữ liệu', icon: FiEdit, color:'text-black' },
    { path: '/calculationMatrix', label: 'Tính điểm các phương án', icon: FiBarChart2, color:'text-black' },
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="my-5 mx-5">
            <div className="mb-8">
                <h1 className="text-xl font-bold text-center text-black">Lựa chọn đầu tư năng lượng tái tạo</h1>
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
                                            ? 'bg-gray-300 text-black font-bold'
                                            : ' text-black hover:font-bold'
                                    } group`}
                                    onClick={() => navigate(item.path.slice(1))}
                                >
                                    <Icon className={`text-xl ${
                                        location.pathname === item.path
                                            ? 'text-black'
                                            : `${item.color} group-hover:font-bold`
                                    } transition-all duration-200`} />
                                    <span className={`${
                                        location.pathname === item.path
                                            ? 'text-black font-bold'
                                            : 'text-black group-hover:font-bold'
                                    } transition-all duration-200`}>
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}