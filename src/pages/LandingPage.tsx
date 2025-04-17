import { TbPointFilled } from "react-icons/tb";

export default function LandingPage() {
    return (
        <div className="space-y-20 px-8 pt-2">
            <h1 className="text-4xl font-bold text-gray-800 text-center">Giới thiệu</h1>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
                <div className="max-w-xl text-5xl font-bold leading-snug text-center lg:text-left">
                    LỰA CHỌN DỰ ÁN<br />ĐẦU TƯ NĂNG LƯỢNG TÁI TẠO.
                </div>
                <img src="/oc-work-balance.svg" alt="intro" className="w-[450px] object-contain" />
            </div>

            <div className="space-y-10">
                <h2 className="text-3xl font-bold text-center">Mục tiêu nghiên cứu</h2>
                <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
                    <img src="/oc-project-development.svg" alt="goal" className="w-[400px]" />
                    <div className="flex flex-col space-y-4 max-w-2xl">
                        {[
                            "Nghiên cứu và ứng dụng phương pháp AHP trong lựa chọn phương án đầu tư năng lượng tái tạo",
                            "Xây dựng mô hình phân tích quyết định",
                            "Tích hợp các yếu tố kinh tế, kỹ thuật và môi trường trong đánh giá phương án đầu tư",
                            "Phát triển hệ thống hỗ trợ ra quyết định trực quan và dễ sử dụng",
                        ].map((text, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div className="text-xl text-black"><TbPointFilled /></div>
                                <div className="text-lg font-semibold text-gray-800">{text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                <h2 className="text-3xl font-bold text-center">Tiêu chí - Phương án</h2>
                <div className="flex flex-col lg:flex-row justify-center items-start gap-12">
                    <div className="bg-gray-100 rounded-xl p-6 w-full lg:w-[500px] shadow">
                        <h3 className="text-center text-2xl font-bold mb-4">Tiêu chí</h3>
                        {[
                            "Chi phí đầu tư.",
                            "Tiêu thụ năng lượng.",
                            "Xuất khẩu năng lượng.",
                            "Công suất lắp đặt.",
                            "Lượng phát thải CO2.",
                        ].map((text, index) => (
                            <div key={index} className="flex items-center space-x-3 mb-2">
                                <div className="text-xl"><TbPointFilled /></div>
                                <div className="text-lg font-medium text-gray-700">{text}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-100 rounded-xl p-6 w-full lg:w-[500px] shadow pb-14">
                        <h3 className="text-center text-2xl font-bold mb-4">Phương án</h3>
                        {[
                            "Điện mặt trời.",
                            "Điện gió.",
                            "Thủy điện.",
                            "Địa nhiệt.",
                        ].map((text, index) => (
                            <div key={index} className="flex items-center space-x-3 mb-2">
                                <div className="text-xl"><TbPointFilled /></div>
                                <div className="text-lg font-medium text-gray-700">{text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-10 text-center">
                <h2 className="text-3xl font-bold">Nhóm thực hiện</h2>
                <div className="space-y-2 text-xl font-medium text-gray-700">
                    <div><strong>Môn:</strong> Hệ hỗ trợ ra quyết định</div>
                    <div><strong>Nhóm:</strong> 4</div>
                    <div><strong>Lớp:</strong> 10ĐH_CNPM1</div>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-12">
                {[
                    { name: "Nguyễn Thanh Hà", id: "1050080048", img: "/frog.svg" },
                    { name: "Đào Ngọc Hòa", id: "1050080050", img: "/cow.svg" },
                    { name: "Nguyễn Khánh Nam", id: "1050080065", img: "/koala.svg" },
                    { name: "Lưu Thy Thy", id: "1050080078", img: "/hamster.svg" },
                ].map((member, idx) => (
                    <div key={idx} className="flex flex-col items-center space-y-2">
                        <img src={member.img} className="w-24 h-24" />
                        <div className="font-bold text-lg">{member.name}</div>
                        <div className="text-gray-600">{member.id}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
