import { TbPointFilled } from "react-icons/tb";

export default function LandingPage() {
    return (
        <div className="m-3 ml-5">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex justify-center">Giới thiệu</h1>
                <div className=" flex flex-row justify-center items-center">
                    <div className='m-2 w-[665px] h-[76] mr-20 text-6xl font-bold'>
                        LỰA CHỌN DỰ ÁN ĐẦU TƯ NĂNG LƯỢNG
                        TÁI TẠO.
                    </div>

                    <div className=''>
                        <img src='/oc-work-balance.svg' className='w-[700]'/>
                    </div>

                </div>
                <div className='flex justify-center text-3xl font-bold mb-10 mt-20'>Mục tiêu nghiên cứu</div>

                <div className="mb-6 flex flex-row justify-center">
                    <div>
                        <img src='/oc-project-development.svg'/>
                    </div>
                    <div className='flex justify-center'>
                        <div className="flex flex-col space-y-3 w-3/4 r">
                            {[
                                { icon: <TbPointFilled />, text: "Nghiên cứu và ứng dụng phương pháp AHP trong lựa chọn phương án đầu tư năng lượng tái tạo" },
                                { icon: <TbPointFilled />, text: "Xây dựng mô hình phân tích quyết định" },
                                { icon: <TbPointFilled />, text: "Tích hợp các yếu tố kinh tế, kỹ thuật và môi trường trong đánh giá phương án đầu tư" },
                                { icon: <TbPointFilled />, text: "Phát triển hệ thống hỗ trợ ra quyết định trực quan và dễ sử dụng" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="text-xl">{item.icon}</div>
                                    <div className="text-gray-700 text-2xl font-bold items-center">{item.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center text-3xl font-bold mb-10 mt-20'>
                    Tiêu chí - Phương án
                </div>
                <div className='flex flex-row justify-center items-center m-2'>
                    <div className='flex flex-row mr-20 h-80 w-[500px] bg-gray-300 rounded-lg'>
                        <div className="flex flex-col space-y-3 ">
                            <div className='flex justify-center w-[500px] text-2xl font-bold mt-6'> Tiêu chí</div>
                            {[
                                { icon: <TbPointFilled />, text: "Chi phí đầu tư." },
                                { icon: <TbPointFilled />, text: "Tiêu thụ năng lượng." },
                                { icon: <TbPointFilled />, text: "Xuất khẩu năng lượng." },
                                { icon: <TbPointFilled />, text: "Công suất lắp đặt." },
                                { icon: <TbPointFilled />, text: "Lượng phát thải CO2." },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3 ">
                                    <div className="text-xl pl-10 pr-4">{item.icon}</div>
                                    <div className="text-gray-700 text-2xl font-bold items-center">{item.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-row ml-20 h-80 bg-gray-300 w-[500px] rounded-lg'>
                        <div className="flex flex-col space-y-3 ">
                            <div className='flex justify-center w-[500px] text-2xl font-bold mt-6'>Phương án</div>
                            {[
                                { icon: <TbPointFilled />, text: "Điện mặt trời.." },
                                { icon: <TbPointFilled />, text: "Điện gió." },
                                { icon: <TbPointFilled />, text: "Thủy điện." },
                                { icon: <TbPointFilled />, text: "Địa nhiệt." },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="text-xl pl-10 pr-4">{item.icon}</div>
                                    <div className="text-gray-700 text-2xl font-bold items-center">{item.text}</div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <div className='flex flex-col w-full justify-center items-center mt-20 mb-10'>
                    <div className='text-3xl font-bold'>Nhóm thực hiện</div>
                    <div className='mb-10 mt-10'>
                        {[
                            { icon: "Môn:", text: "Hệ hỗ trợ ra quyết định" },
                            { icon: "Nhóm:", text: "4" },
                            { icon: "Lớp:", text: "10ĐH_CNPM1" },
                        ].map((item, index) => (

                            <div key={index} className="flex items-center space-x-3">
                                <div className="text-xl pl-10 pr-4">{item.icon}</div>
                                <div className="text-gray-700 text-2xl font-bold items-center">{item.text}</div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className='flex justify-center space-x-4 space-x-reverse gap-16'>
                    <div className='flex flex-col justify-center items-center'>
                        <div><img src='/frog.svg'/></div>
                        <div className="font-bold">Nguyễn Thanh Hà</div>
                        <div>1050080048</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div><img src='/cow.svg'/></div>
                        <div className="font-bold">Đào Ngọc Hòa</div>
                        <div>1050080050</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div><img src='/koala.svg'/></div>
                        <div className="font-bold">Nguyễn Khánh Nam</div>
                        <div>1050080065</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div><img src='/hamster.svg'/></div>
                        <div className="font-bold">Lưu Thy THy</div>
                        <div>1050080078</div>
                    </div>
                </div>
            </div>
        </div>
    );
}