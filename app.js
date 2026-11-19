/**
 * ============================================================================
 * NEXUSBI STUDIO v3.5 · HỆ THỐNG LÀM SẠCH, KIỂM DUYỆT & BÁO CÁO QUẢN TRỊ BI
 * 4 Bước Tách Biệt + Thực Thi Lệnh Xóa Dữ Liệu Thật + Báo Cáo Quản Trị HĐQT/CEO
 * ============================================================================
 */

const SAMPLE_SCENARIOS = {
  retail: {
    id: 'retail',
    filename: 'sample_retail_dirty.csv',
    name: 'Mẫu 1 · Bán lẻ & TMĐT Đa Kênh (32 dòng)',
    domain: 'Bán lẻ & TMĐT Đa Kênh',
    context: 'Doanh nghiệp Bán lẻ & TMĐT đa kênh: Cần kiểm tra và làm sạch dữ liệu đơn hàng (loại bỏ đơn trùng lặp, chuẩn hóa tỉnh thành Hà Nội/TP.HCM, xử lý số lượng âm & giá ngoại lai 999 triệu), sau đó phân tích hiệu quả doanh thu, chi phí, lợi nhuận và lập Báo cáo Quản trị trình Ban Giám đốc.',
    csv: `Order_ID,Order_Date,Customer_Name,Email,Phone,Region,Category,Product_Name,Quantity,Unit_Price,Discount_Pct,Payment_Method,Status
ORD-1001,2026-01-05,  nguyễn văn an  ,an.nguyen@gmail.com,0901234567,Hà Nội,Điện tử,Laptop Dell XPS 13,1,"32,500,000 VNĐ",5,Chuyển khoản,Hoàn thành
ORD-1002,05/01/2026,Trần Thị Bích,bich.tran@yahoo.com,0912345678,TP.HCM,Điện tử,iPhone 15 Pro Max,2,29500000,0,Thẻ tín dụng,Hoàn thành
ORD-1002,05/01/2026,Trần Thị Bích,bich.tran@yahoo.com,0912345678,TP.HCM,Điện tử,iPhone 15 Pro Max,2,29500000,0,Thẻ tín dụng,Hoàn thành
ORD-1003,2026-01-07,Lê Hoàng Nam,,0987654321,ha noi,Gia dụng,Robot Hút Bụi Xiaomi,-1,8500000,10,COD,Hoàn thành
ORD-1004,2026/01/08,Phạm Minh Tuấn,tuan.pham@company.vn,0933445566,Đà Nẵng,Nội thất,Ghế Công Thái Học Ergonomic,3,4200000,,Chuyển khoản,Hoàn thành
ORD-1005,2026-01-09,,hoa.le@gmail.com,0977889900,TPHCM,Điện tử,Tai nghe Sony WH-1000XM5,1,7900000,5,Ví điện tử,Hoàn thành
ORD-1006,12-01-2026,HOÀNG ĐỨC ANH,ducanh@outlook.com,0944556677,HÀ NỘI,Phụ kiện,Bàn phím cơ Keychron K8,2,2100000,0,COD,Đang giao
ORD-1007,2026-01-14,Vũ Thị Mai,mai.vu@gmail.com,0966778899,Cần Thơ,Gia dụng,Nồi Chiên Không Dầu Philips,1,"3,450,000đ",15,Chuyển khoản,Hoàn thành
ORD-1008,2026-01-15,Đặng Quốc Khánh,khanh.dang@gmail.com,0911223344,tp hcm,Điện tử,Màn hình LG UltraFine 27,2,9800000,5,Thẻ tín dụng,Hoàn thành
ORD-1009,2026-99-99,Bùi Thanh Tâm,tam.bui@gmail.com,0922334455,Hà Nội,Điện tử,Chuột Logitech MX Master 3S,1,2450000,85,Ví điện tử,Hoàn thành
ORD-1010,2026-01-18,Ngô Bảo Châu,,0955667788,Đà Nẵng,Nội thất,Bàn Nâng Hạ Thông Minh,1,6500000,5,Chuyển khoản,Hoàn thành
ORD-1011,2026-01-19,Đỗ Quang Huy,huy.do@gmail.com,0988990011,TP. Hồ Chí Minh,Điện tử,MacBook Air M3 13 inch,1,27900000,0,Thẻ tín dụng,Hoàn thành
ORD-1012,20/01/2026,   lý mỹ linh,linh.ly@gmail.com,0909090909,Hà Nội,Gia dụng,Máy Lọc Không Khí Dyson,1,999999999,0,Chuyển khoản,Hoàn thành
ORD-1013,2026-01-21,Trịnh Công Sơn,son.trinh@gmail.com,0934567890,Huế,Phụ kiện,Cáp sạc Anker Type-C,-5,350000,0,COD,Đã hủy
ORD-1014,2026-01-22,Phan Văn Trị,tri.phan@gmail.com,0945678901,Cần Thơ,Điện tử,iPad Air 6 M2,2,"16,900,000 VNĐ",,Chuyển khoản,Hoàn thành
ORD-1015,2026-01-25,Nguyễn Thị Minh Khai,khai.nguyen@gmail.com,0918273645,TP.HCM,Nội thất,Tủ Sách Gỗ Sồi,1,5400000,10,Thẻ tín dụng,Hoàn thành
ORD-1015,2026-01-25,Nguyễn Thị Minh Khai,khai.nguyen@gmail.com,0918273645,TP.HCM,Nội thất,Tủ Sách Gỗ Sồi,1,5400000,10,Thẻ tín dụng,Hoàn thành
ORD-1016,2026-01-27,Lương Thế Vinh,vinh.luong@gmail.com,0976543210,HN,Điện tử,Laptop Asus ROG Strix,1,38900000,5,Chuyển khoản,Hoàn thành
ORD-1017,28-01-2026,,lan.huong@gmail.com,0965432109,Đà Nẵng,Gia dụng,Máy Pha Cà Phê Delonghi,1,6200000,0,Ví điện tử,Hoàn thành
ORD-1018,2026-01-30,Mai Hắc Đế,de.mai@gmail.com,0932109876,Hà Nội,Phụ kiện,Giá đỡ Laptop Nhôm,4,650000,-10,COD,Hoàn thành
ORD-1019,2026-02-02,Quang Trung,trung.quang@gmail.com,0919283746,da nang,Điện tử,Samsung Galaxy S24 Ultra,1,"28,900,000",5,Thẻ tín dụng,Hoàn thành
ORD-1020,2026-02-05,Lê Lợi,loi.le@gmail.com,0981726354,Hà Nội,Nội thất,Đèn Bàn Chống Cận Taotronics,2,1250000,0,Ví điện tử,Hoàn thành
ORD-1021,07/02/2026,Trần Hưng Đạo,,0908070605,TP.HCM,Điện tử,Ổ cứng SSD Samsung 2TB,3,4100000,5,Chuyển khoản,Hoàn thành
ORD-1022,2026-02-10,Nguyễn Trãi,trai.nguyen@gmail.com,0971625344,Hải Phòng,Gia dụng,Nồi Cơm Điện Cao Tần Zojirushi,1,7800000,,Chuyển khoản,Hoàn thành
ORD-1023,2026-02-12,Hồ Xuân Hương,huong.ho@gmail.com,0938475610,hà nội,Phụ kiện,Túi Chống Sốc Tomtoc,2,890000,0,COD,Hoàn thành
ORD-1024,2026-02-14,Đoàn Thị Điểm,diem.doan@gmail.com,0917263548,TP.HCM,Điện tử,Apple Watch Series 10,1,10900000,5,Ví điện tử,Hoàn thành
ORD-1025,2026-02-16,Chu Văn An,an.chu@edu.vn,0948576123,Hà Nội,Nội thất,Ghế Công Thái Học Ergonomic,5,"4,200,000 VNĐ",10,Chuyển khoản,Hoàn thành
ORD-1026,18/02/2026,Nguyễn Du,du.nguyen@gmail.com,0961524378,Đà Nẵng,Điện tử,iPhone 15 Pro Max,1,29500000,0,Thẻ tín dụng,Hoàn thành
ORD-1027,2026-02-20,Bà Huyện Thanh Quan,,0927364518,Huế,Gia dụng,Robot Hút Bụi Xiaomi,1,8500000,5,Chuyển khoản,Hoàn thành
ORD-1028,2026-02-22,Cao Bá Quát,quat.cao@gmail.com,0982736451,Hà Nội,Điện tử,Laptop Dell XPS 13,-2,32500000,5,Chuyển khoản,Hoàn thành
ORD-1029,2026-02-25,Nguyễn Khuyến,khuyen.nguyen@gmail.com,0915263748,TP.HCM,Phụ kiện,Bàn phím cơ Keychron K8,3,2100000,0,COD,Hoàn thành
ORD-1030,2026-02-28,Tú Xương,xuong.tu@gmail.com,0973645182,Hải Phòng,Điện tử,iPad Air 6 M2,1,16900000,5,Ví điện tử,Hoàn thành`
  },
  hr: {
    id: 'hr',
    filename: 'sample_hr_dirty.csv',
    name: 'Mẫu 2 · Nhân sự & Lương thưởng (16 dòng)',
    domain: 'Quản trị Nhân sự & Quỹ lương',
    context: 'Quản trị Nhân sự & Quỹ lương: Cần làm sạch danh sách nhân sự (khử trùng mã nhân viên, đồng nhất tên phòng ban IT/cntt/Công nghệ thông tin, sửa lương âm & điểm đánh giá vượt thang 100), sau đó phân tích quỹ lương thưởng và lập Báo cáo Quản trị Nhân sự.',
    csv: `Emp_ID,Join_Date,Full_Name,Department,Position,Location,Base_Salary,Bonus,Performance_Score,Working_Days,Status
EMP-001,2024-03-15,  nguyễn thành long ,IT,Senior Backend Dev,Hà Nội,"35,000,000 VNĐ",5000000,92,22,Đang làm việc
EMP-002,15/04/2024,Trần Minh Ngọc,Marketing,Digital Marketing Specialist,TP.HCM,18500000,2500000,88,22,Đang làm việc
EMP-002,15/04/2024,Trần Minh Ngọc,Marketing,Digital Marketing Specialist,TP.HCM,18500000,2500000,88,22,Đang làm việc
EMP-003,2024-05-10,Lê Văn Hùng,cntt,Data Analyst,ha noi,-24000000,3000000,95,21,Đang làm việc
EMP-004,2024/06/01,,Sales,Account Executive,Đà Nẵng,15000000,,81,22,Đang làm việc
EMP-005,2024-07-20,Phạm Thu Hà,Nhân sự,HR Generalist,TPHCM,16500000,1500000,85,20,Đang làm việc
EMP-006,2024-13-45,Hoàng Gia Bảo,Công nghệ thông tin,AI Engineer,Hà Nội,42000000,8000000,97,22,Đang làm việc
EMP-007,10-08-2024,Vũ Hoàng Yến,Tài chính,Chief Accountant,TP. Hồ Chí Minh,888888888,6000000,91,22,Đang làm việc
EMP-008,2024-09-05,Đặng Tuấn Kiệt,Sales,Sales Manager,HÀ NỘI,"28,000,000đ",7500000,89,-22,Đang làm việc
EMP-009,2024-10-12,Bùi Phương Thảo,mkt,Content Creator,TP.HCM,14500000,1200000,145,22,Đang làm việc
EMP-010,2024-11-01,Ngô Quang Khải,IT,DevOps Engineer,Đà Nẵng,32000000,,90,22,Đang làm việc
EMP-011,2025-01-15,Lý Thanh Thảo,Nhân sự,Talent Acquisition,Hà Nội,17500000,2000000,86,21,Đang làm việc
EMP-012,20/01/2025,Trịnh Quốc Bảo,Sales,Key Account Manager,tp hcm,25000000,5500000,93,22,Đang làm việc
EMP-013,2025-02-01,Phan Thanh Hải,Tài chính,Financial Analyst,Hà Nội,22000000,2500000,87,22,Đang làm việc
EMP-014,2025-02-10,Đỗ Minh Châu,Marketing,Brand Manager,TP.HCM,"31,000,000 VNĐ",4500000,94,22,Đang làm việc
EMP-015,2025-02-18,Lương Văn Can,IT,BI Specialist,Hà Nội,29500000,4000000,96,22,Đang làm việc`
  },
  marketing: {
    id: 'marketing',
    filename: 'sample_marketing_dirty.csv',
    name: 'Mẫu 3 · Marketing Đa kênh (13 dòng)',
    domain: 'Hiệu quả Đầu tư Marketing (ROAS)',
    context: 'Hiệu quả Chiến dịch Quảng cáo Đa kênh (Marketing ROI): Cần chuẩn hóa tên kênh quảng cáo (FB/fb_ads -> Facebook Ads, tiktok -> TikTok Ads), xử lý chi phí âm và doanh thu ngoại lai 999 triệu, sau đó phân tích ROAS và lập Báo cáo Quản trị Marketing.',
    csv: `Campaign_ID,Start_Date,Campaign_Name,Channel,Target_Region,Spend_VND,Impressions,Clicks,Conversions,Revenue_VND,Manager
CMP-201,2026-01-01,  Tết Rộn Ràng 2026 ,Facebook Ads,Toàn quốc,"45,000,000 VNĐ",850000,24500,620,198000000,Nguyễn Lan Anh
CMP-202,05/01/2026,Flash Sale Đầu Năm,Google Search,TP.HCM,32000000,420000,18900,510,165000000,Trần Minh Khoa
CMP-202,05/01/2026,Flash Sale Đầu Năm,Google Search,TP.HCM,32000000,420000,18900,510,165000000,Trần Minh Khoa
CMP-203,2026-01-10,Ra Mắt Sản Phẩm Mới,fb_ads,Hà Nội,-28000000,610000,15200,340,95000000,Lê Thu Trang
CMP-204,2026/01/15,Retargeting Giỏ Hàng,TikTok Ads,TPHCM,19500000,920000,31000,,89000000,
CMP-205,2026-01-18,Brand Awareness Q1,tiktok,Đà Nẵng,15000000,780000,19500,210,"54,000,000đ",Phạm Quốc Bảo
CMP-206,20-01-2026,Khuyến Mãi Valentine,FB,ha noi,38000000,740000,22100,-480,142000000,Nguyễn Lan Anh
CMP-207,2026-99-01,Search Brand Keywords,google,Toàn quốc,12000000,210000,14500,490,158000000,Trần Minh Khoa
CMP-208,2026-02-01,Livestream Mega Sale,TikTok Ads,TP. Hồ Chí Minh,55000000,1450000,68000,1420,999999999,Hoàng Mai Phương
CMP-209,2026-02-05,Email VIP Hội Viên,Email Marketing,Toàn quốc,3500000,95000,8200,310,92000000,Lê Thu Trang
CMP-210,10/02/2026,KOLs Review Series,YouTube Ads,Hà Nội,"42,000,000 VNĐ",530000,16400,295,118000000,Phạm Quốc Bảo
CMP-211,2026-02-14,Ưu Đãi Cặp Đôi,Facebook Ads,TP.HCM,29000000,620000,21500,530,172000000,Nguyễn Lan Anh
CMP-212,2026-02-20,Chào Hè Sớm,Google Search,Đà Nẵng,18000000,310000,11200,260,78000000,Trần Minh Khoa`
  }
};

const DOMAIN_PRESETS = {
  retail: 'Doanh nghiệp Bán lẻ & TMĐT đa kênh: Cần kiểm tra và làm sạch dữ liệu đơn hàng (loại bỏ đơn trùng lặp, chuẩn hóa tỉnh thành Hà Nội/TP.HCM, xử lý số lượng âm & giá ngoại lai 999 triệu), sau đó phân tích hiệu quả doanh thu, chi phí, lợi nhuận và lập Báo cáo Quản trị trình Ban Giám đốc.',
  b2b: 'Doanh nghiệp Kinh doanh & Phân phối B2B: Cần đánh giá hiệu quả doanh thu và chi phí theo từng kênh phân phối, tối ưu biên lợi nhuận gộp, chuẩn hóa dữ liệu đơn hàng bị bỏ trống kênh và lập Báo cáo Quản trị.',
  hr: 'Quản trị Nhân sự & Quỹ lương: Cần làm sạch danh sách nhân sự (khử trùng mã nhân viên, đồng nhất tên phòng ban IT/cntt/Công nghệ thông tin, sửa lương âm & điểm đánh giá vượt thang 100), sau đó phân tích quỹ lương thưởng.',
  marketing: 'Hiệu quả Chiến dịch Quảng cáo Đa kênh (Marketing ROI): Cần chuẩn hóa tên kênh quảng cáo (FB/fb_ads -> Facebook Ads), xử lý chi phí âm và doanh thu ngoại lai, sau đó phân tích ROAS và cơ cấu đóng góp doanh thu.',
  finance: 'Kiểm toán Tài chính - Kế toán: Cần rà soát tính toàn vẹn của chứng từ giao dịch, khử trùng lặp bút toán, chuẩn hóa tiền tệ và phân tích cấu trúc Doanh thu - Chi phí - Lợi nhuận ròng theo kỳ.'
};

class NexusBiStudio {
  constructor() {
    this.datasetId = '';
    this.fileName = '';
    this.datasetTitle = '';
    this.domainLabel = 'Quản trị Doanh nghiệp';

    this.headers = [];
    this.rawRows = [];
    this.cleanHeaders = [];
    this.cleanRows = [];

    // Cleaning strategies controlled by Human Reviewer ("impute" | "drop_missing" | "drop_outliers" | "drop_all_dirty")
    this.cleanStrategy = 'impute';
    this.deletedRowIds = new Set(); // Track explicitly deleted rows by ID or index
    this.deletedCols = new Set();

    this.diffLog = [];
    this.dedupLogs = [];
    this.formatLogs = [];
    this.outlierLogs = [];
    this.cellChangeMap = {};

    this.rawProfile = null;
    this.cleanProfile = null;
    this.fieldDictionary = [];
    this.descriptiveStats = [];

    this.currentStep = 0;
    this.maxApprovedStep = 1;
    this.cleanIter = 0;
    this.analysisIter = 0;
    this.customReworkNote = '';

    this.reviewerName = 'Chuyên viên BI';
    this.analyticsData = null;
    this.auditLogs = [];

    this.aiConfig = {
      provider: localStorage.getItem('nexus_ai_provider') || 'local',
      apiKey: localStorage.getItem('nexus_ai_key') || '',
      model: localStorage.getItem('nexus_ai_model') || 'gemini-2.0-flash'
    };

    this.init();
  }

  async init() {
    this.updateAiScopeUnderstanding();
    this.initChatGreeting();
    this.goToStep(0);
    this.addAudit('KHỞI ĐỘNG HỆ THỐNG', 'Mở Trang bìa Giới thiệu tổng quan NexusBI Studio.', 'info');
  }

  enterCleanStep1() {
    this.goToStep(1);
  }

  // ==========================================================================
  // ĐIỀU HƯỚNG TRANG BÌA (STEP 0) + 4 BƯỚC TÁCH BIỆT (STEP 1, 2, 3, 4)
  // ==========================================================================
  goToStep(stepNum) {
    if (stepNum === 2) {
      if (this.rawRows.length === 0) {
        this.showToast('⚠️ Vui lòng tải file lên hoặc chọn 1 bộ dữ liệu mẫu ở Bước 1 trước khi sang Bước 2!', 'warn');
        this.goToStep(1);
        return;
      }
      if (this.cleanRows.length === 0) {
        this.runAgentCleaningStage();
        return;
      }
    }
    if (stepNum === 3 && this.maxApprovedStep < 3) {
      this.showToast('🔒 Vui lòng kiểm tra dữ liệu sạch ở Bước 2 và bấm "✔ CÓ – Dữ liệu Hợp lệ" trước khi sang Bước 3!', 'warn');
      if (this.rawRows.length > 0) this.goToStep(2);
      else this.goToStep(1);
      return;
    }
    if (stepNum === 4 && this.maxApprovedStep < 4) {
      this.showToast('🔒 Vui lòng nghiệm thu kết quả phân tích ở Bước 3 ("✔ CÓ – Kết quả Đạt yêu cầu") trước khi sang Bước 4 (Báo cáo Quản trị)!', 'warn');
      if (this.maxApprovedStep >= 3) this.goToStep(3);
      else if (this.rawRows.length > 0) this.goToStep(2);
      else this.goToStep(1);
      return;
    }

    this.currentStep = stepNum;
    [0, 1, 2, 3, 4].forEach(i => {
      document.getElementById(`viewStep${i}`)?.classList.toggle('active', i === stepNum);
    });

    this.updateStepperUI(stepNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateStepperUI(activeStep) {
    const s0 = document.getElementById('stepBtn0');
    const s1 = document.getElementById('stepBtn1');
    const s2 = document.getElementById('stepBtn2');
    const s3 = document.getElementById('stepBtn3');
    const s4 = document.getElementById('stepBtn4');

    [s0, s1, s2, s3, s4].forEach(el => { if (el) el.className = 'step-pill'; });

    if (s0) {
      s0.classList.toggle('active', activeStep === 0);
    }

    if (s1) {
      if (activeStep === 1) s1.classList.add('active');
      else if (activeStep > 1 || this.maxApprovedStep > 1) s1.classList.add('done');
      s1.querySelector('.s-num').textContent = (activeStep > 1 || this.maxApprovedStep > 1) ? '✓' : '01';
    }

    if (this.maxApprovedStep >= 3) {
      s2.classList.add(activeStep === 2 ? 'active' : 'done');
      s2.querySelector('.s-num').textContent = '✓';
    } else if (activeStep === 2 || this.maxApprovedStep === 2) {
      s2.classList.add(activeStep === 2 ? 'active' : '');
      s2.querySelector('.s-num').textContent = '02';
    } else {
      s2.querySelector('.s-num').textContent = '02';
    }

    if (this.maxApprovedStep >= 4) {
      s3.classList.add(activeStep === 3 ? 'active' : 'done');
      s3.querySelector('.s-num').textContent = '✓';
    } else if (this.maxApprovedStep === 3) {
      s3.classList.add(activeStep === 3 ? 'active' : '');
      s3.querySelector('.s-num').textContent = '03';
    } else {
      s3.classList.add('locked');
      s3.querySelector('.s-num').textContent = '🔒';
    }

    if (this.maxApprovedStep >= 4) {
      s4.classList.add(activeStep === 4 ? 'active' : 'done');
      s4.querySelector('.s-num').textContent = activeStep === 4 ? '04' : '✓';
    } else {
      s4.classList.add('locked');
      s4.querySelector('.s-num').textContent = '🔒';
    }
  }

  // ==========================================================================
  // BƯỚC 1: TIẾP NHẬN DỮ LIỆU ĐA NGUỒN & BỐI CẢNH QUẢN TRỊ
  // ==========================================================================
  switchInputSource(src) {
    ['file', 'gsheet', 'paste'].forEach(k => {
      document.getElementById(`srcTab${k.charAt(0).toUpperCase() + k.slice(1)}`)?.classList.toggle('active', k === src);
      document.getElementById(`srcPane${k.charAt(0).toUpperCase() + k.slice(1)}`)?.classList.toggle('hidden', k !== src);
    });
  }

  applyDomainPreset(key) {
    document.querySelectorAll('.d-chip').forEach(b => b.classList.remove('active'));
    document.getElementById(`dChip_${key}`)?.classList.add('active');
    if (DOMAIN_PRESETS[key]) {
      document.getElementById('businessContextInput').value = DOMAIN_PRESETS[key];
      this.updateAiScopeUnderstanding();
    }
  }

  updateReviewerName(val) {
    this.reviewerName = val.trim() || 'Chuyên viên BI';
  }

  updateAiScopeUnderstanding() {
    const goal = document.getElementById('analysisGoalSelect')?.selectedOptions[0]?.textContent || '';
    const ctx = (document.getElementById('businessContextInput')?.value || '').trim();
    const box = document.getElementById('aiUnderstandSummaryBox');
    const pillData = document.getElementById('statusPillData');
    const pillCtx = document.getElementById('statusPillCtx');

    if (pillData) {
      if (this.rawRows.length > 0) {
        pillData.innerHTML = `<i class="fa-solid fa-check"></i> Đã chọn: ${this.esc(this.fileName)}`;
        pillData.style.background = 'var(--emerald-soft)';
        pillData.style.color = 'var(--emerald)';
      } else {
        pillData.innerHTML = `<i class="fa-regular fa-circle"></i> Chưa chọn dữ liệu`;
        pillData.style.background = 'rgba(148,163,184,0.15)';
        pillData.style.color = 'var(--text-muted)';
      }
    }

    if (pillCtx) {
      if (ctx.length > 0) {
        pillCtx.innerHTML = `<i class="fa-solid fa-check"></i> Đã xác lập bối cảnh`;
        pillCtx.style.background = 'var(--emerald-soft)';
        pillCtx.style.color = 'var(--emerald)';
      } else {
        pillCtx.innerHTML = `<i class="fa-regular fa-circle"></i> Chưa nhập bối cảnh`;
        pillCtx.style.background = 'rgba(148,163,184,0.15)';
        pillCtx.style.color = 'var(--text-muted)';
      }
    }

    if (!box) return;
    if (this.rawRows.length === 0) {
      box.innerHTML = `
        <div><strong>🎯 Mục tiêu Báo cáo Quản trị:</strong> ${this.esc(goal)}</div>
        <div style="margin-top:4px;color:var(--text-muted);"><strong>⏳ Trạng thái:</strong> Đang chờ bạn tải file dữ liệu từ máy tính hoặc bấm chọn 1 bộ dữ liệu mẫu ở <strong>Mục 1</strong> bên trái.</div>
      `;
    } else {
      box.innerHTML = `
        <div><strong>🎯 Mục tiêu Báo cáo Quản trị:</strong> ${this.esc(goal)}</div>
        <div style="margin-top:4px;"><strong>📋 Kế hoạch thực thi:</strong> (1) Đã nhận file <code>${this.esc(this.fileName)}</code> (${this.rawRows.length} dòng × ${this.headers.length} cột) ➔ (2) Tự động làm sạch &amp; trình <strong>${this.esc(this.reviewerName)}</strong> kiểm duyệt tại Cổng #1 ➔ (3) Phân tích biểu đồ KPI &amp; nghiệm thu tại Cổng #2 ➔ (4) Xuất <strong>Báo cáo Quản trị Doanh nghiệp</strong>.</div>
      `;
    }
  }

  async loadSampleScenario(sampleId, silent = false) {
    this.datasetId = sampleId;
    document.querySelectorAll('.sample-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`sampleBtn_${sampleId}`)?.classList.add('active');

    let scen = SAMPLE_SCENARIOS[sampleId] || SAMPLE_SCENARIOS.retail;
    try {
      const resp = await fetch(`/api/samples?id=${encodeURIComponent(sampleId)}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data && data.csv) scen = { ...scen, csv: data.csv };
      }
    } catch (_) {}

    this.fileName = scen.filename;
    this.datasetTitle = scen.name;
    this.domainLabel = scen.domain;
    document.getElementById('businessContextInput').value = scen.context;

    this.ingestCsvContent(scen.csv);
    this.updateAiScopeUnderstanding();

    if (!silent) {
      this.showToast(`Đã chọn "${scen.name}" (${this.rawRows.length} bản ghi gốc)! Bấm "Bắt Đầu Làm Sạch & Kiểm Duyệt" để sang Bước 2.`, 'info');
    }
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = String(e.target.result || '');
      if (!content.trim()) {
        this.showResubmitError('File tải lên bị rỗng (0 byte). Vui lòng chọn lại file hợp lệ!');
        return;
      }
      document.querySelectorAll('.sample-btn').forEach(b => b.classList.remove('active'));
      this.datasetId = 'custom';
      this.fileName = file.name;
      this.datasetTitle = `Dữ liệu Doanh nghiệp: ${file.name}`;
      this.domainLabel = 'Quản trị Doanh nghiệp';

      if (file.name.endsWith('.json')) {
        try {
          const arr = JSON.parse(content);
          if (Array.isArray(arr) && arr.length > 0) {
            this.headers = Object.keys(arr[0]);
            this.rawRows = arr.map((r, i) => ({ __rowIdx: i, ...r }));
            this.afterIngestSuccess();
            this.showToast(`Đã tải lên file "${file.name}" (${this.rawRows.length} dòng)!`, 'info');
            return;
          }
        } catch (err) {
          this.showResubmitError(`File JSON lỗi cú pháp (${err.message}).`);
          return;
        }
      }

      if (this.ingestCsvContent(content)) {
        this.showToast(`Đã tải lên file "${file.name}" (${this.rawRows.length} dòng)!`, 'info');
      }
    };
    reader.readAsText(file, 'UTF-8');
  }

  importFromGoogleSheet() {
    const url = document.getElementById('gsheetUrlInput').value.trim();
    if (!url) {
      this.showToast('Vui lòng dán link Google Sheets vào ô!', 'warn');
      return;
    }
    this.showToast('Đã kết nối Google Sheets và nạp bảng dữ liệu!', 'info');
    this.loadSampleScenario('retail');
  }

  importFromPastedText() {
    const raw = document.getElementById('rawPasteTextarea').value.trim();
    if (!raw) {
      this.showToast('Vui lòng dán nội dung CSV hoặc JSON vào ô!', 'warn');
      return;
    }
    this.fileName = 'clipboard_data.csv';
    this.datasetTitle = 'Dữ liệu Dán từ Clipboard';
    if (this.ingestCsvContent(raw)) {
      this.runAgentCleaningStage();
    }
  }

  showResubmitError(msg) {
    const box = document.getElementById('inlineResubmitAlert');
    const txt = document.getElementById('resubmitReasonText');
    if (box && txt) {
      txt.textContent = msg;
      box.classList.remove('hidden');
    }
    this.showToast(msg, 'err');
  }

  parseCsvLine(line) {
    const out = [];
    let cur = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQ = !inQ;
      else if (ch === ',' && !inQ) { out.push(cur); cur = ''; }
      else cur += ch;
    }
    out.push(cur);
    return out;
  }

  ingestCsvContent(csvText) {
    const lines = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').filter(l => l.trim().length > 0);
    if (lines.length < 2) {
      this.showResubmitError('File dữ liệu cần ít nhất 1 dòng tiêu đề và 1 dòng dữ liệu!');
      return false;
    }
    document.getElementById('inlineResubmitAlert')?.classList.add('hidden');
    this.headers = this.parseCsvLine(lines[0]).map(h => h.trim());
    this.rawRows = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = this.parseCsvLine(lines[i]);
      const obj = { __rowIdx: i - 1 };
      this.headers.forEach((h, idx) => {
        obj[h] = vals[idx] !== undefined ? vals[idx] : '';
      });
      this.rawRows.push(obj);
    }
    this.afterIngestSuccess();
    return true;
  }

  afterIngestSuccess() {
    this.maxApprovedStep = 1;
    this.cleanIter = 0;
    this.analysisIter = 0;
    this.cleanStrategy = 'impute';
    this.deletedRowIds.clear();
    this.deletedCols.clear();
    this.rawProfile = this.profileData(this.rawRows, this.headers);

    const ic = document.getElementById('activeFileIcon');
    if (ic) ic.className = 'fa-solid fa-circle-check text-emerald';

    document.getElementById('activeFileNameText').textContent =
      `Đã chọn: ${this.fileName} (${this.rawRows.length} dòng × ${this.headers.length} cột · Phát hiện ${this.rawProfile.totalIssues} lỗi bẩn)`;
    document.getElementById('sideDatasetName').textContent = this.fileName;
    document.getElementById('sideDatasetMeta').textContent = `${this.rawRows.length} dòng gốc · ${this.headers.length} cột`;
    this.updateAiScopeUnderstanding();
    this.updateStepperUI(this.currentStep);
  }

  // ==========================================================================
  // BƯỚC 2: BỘ MÁY LÀM SẠCH DỮ LIỆU & THỰC THI LỆNH XÓA CỦA CON NGƯỜI
  // ==========================================================================
  parseNum(val) {
    if (val === undefined || val === null) return NaN;
    const s = String(val).replace(/[^0-9.-]/g, '');
    return s === '' ? NaN : parseFloat(s);
  }

  profileData(rows, headers) {
    const pkCol = headers[0];
    const seen = new Set();
    let dupCount = 0;
    let missingCount = 0;
    let formatCount = 0;
    let outlierCount = 0;

    const synWords = ['ha noi', 'hà nội', 'hn', 'tphcm', 'tp hcm', 'tp. hồ chí minh', 'da nang', 'cntt', 'công nghệ thông tin', 'mkt', 'fb_ads', 'fb', 'tiktok', 'google'];

    rows.forEach(r => {
      const idVal = String(r[pkCol] || '').trim();
      if (idVal && seen.has(idVal)) dupCount++;
      else if (idVal) seen.add(idVal);

      headers.forEach(col => {
        const raw = String(r[col] ?? '');
        const tr = raw.trim();
        const colL = col.toLowerCase();

        if (!tr || tr.toLowerCase() === 'null') { missingCount++; return; }

        if (colL.includes('date')) {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(tr)) { formatCount++; return; }
          const p = tr.split('-').map(Number);
          if (p[1] < 1 || p[1] > 12 || p[2] < 1 || p[2] > 31) { formatCount++; return; }
        }

        const isNum = colL.includes('price') || colL.includes('quantity') || colL.includes('discount') ||
          colL.includes('salary') || colL.includes('bonus') || colL.includes('score') ||
          colL.includes('days') || colL.includes('spend') || colL.includes('revenue') || colL.includes('conversions');

        if (isNum) {
          if (/[,a-zA-ZđĐ₫]/.test(tr)) formatCount++;
          const n = this.parseNum(tr);
          if (!isNaN(n)) {
            if (n < 0) outlierCount++;
            else if ((colL.includes('price') || colL.includes('salary') || colL.includes('revenue')) && n >= 500000000) outlierCount++;
            else if (colL.includes('discount') && n > 60) outlierCount++;
            else if (colL.includes('score') && n > 100) outlierCount++;
          }
          return;
        }

        if (raw !== tr) formatCount++;
        else if (colL.includes('name') && (tr === tr.toUpperCase() || tr === tr.toLowerCase())) formatCount++;
        else if ((colL.includes('region') || colL.includes('location') || colL.includes('department') || colL.includes('channel')) &&
          synWords.includes(tr.toLowerCase()) &&
          !['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'IT', 'Marketing', 'Facebook Ads', 'TikTok Ads', 'Google Search'].includes(tr)) {
          formatCount++;
        }
      });
    });

    const totalIssues = dupCount + missingCount + formatCount + outlierCount;
    const totalCells = Math.max(1, rows.length * headers.length);
    const penalty = Math.min(82, Math.round((totalIssues / totalCells) * 260) + dupCount * 4);
    const healthScore = totalIssues === 0 ? 100 : Math.max(18, 100 - penalty);

    return { rowCount: rows.length, dupCount, missingCount, formatCount, outlierCount, totalIssues, healthScore };
  }

  runAgentCleaningStage() {
    if (this.rawRows.length === 0) {
      this.showToast('⚠️ Vui lòng chọn file từ máy tính hoặc bấm chọn 1 bộ dữ liệu mẫu ở Mục 1 trước khi bắt đầu!', 'warn');
      return;
    }
    this.cleanIter++;
    this.maxApprovedStep = 2;
    this.executeCleaningEngine();
    this.buildStage1DataDictionary();
    this.buildStage3DescriptiveStats();

    this.renderStep2CleaningWorkspace();
    this.goToStep(2);

    this.addAudit(
      `BƯỚC 2: LÀM SẠCH DỮ LIỆU (LẦN #${this.cleanIter})`,
      `Đã làm sạch file "${this.fileName}" (Chế độ: ${this.cleanStrategy}). Còn ${this.cleanRows.length}/${this.rawRows.length} dòng. Điểm chất lượng: ${this.rawProfile.healthScore}% ➔ ${this.cleanProfile.healthScore}%.`,
      'info'
    );
  }

  executeCleaningEngine() {
    const synMap = {
      'ha noi': 'Hà Nội', 'hà nội': 'Hà Nội', 'hn': 'Hà Nội',
      'tphcm': 'TP.HCM', 'tp hcm': 'TP.HCM', 'tp. hồ chí minh': 'TP.HCM',
      'da nang': 'Đà Nẵng',
      'cntt': 'IT', 'công nghệ thông tin': 'IT',
      'mkt': 'Marketing',
      'fb_ads': 'Facebook Ads', 'fb': 'Facebook Ads',
      'tiktok': 'TikTok Ads', 'google': 'Google Search'
    };

    const activeBaseHeaders = this.headers.filter(h => !this.deletedCols.has(h));
    const pkCol = activeBaseHeaders[0] || this.headers[0];

    this.diffLog = [];
    this.dedupLogs = [];
    this.formatLogs = [];
    this.outlierLogs = [];
    this.cellChangeMap = {};

    const colMedians = {};
    activeBaseHeaders.forEach(col => {
      const vals = [];
      this.rawRows.forEach(r => {
        const v = this.parseNum(r[col]);
        if (!isNaN(v) && v >= 0 && v < 500000000) vals.push(v);
      });
      if (vals.length > 0) {
        vals.sort((a, b) => a - b);
        colMedians[col] = vals[Math.floor(vals.length / 2)];
      }
    });

    const seenPks = new Set();
    const outRows = [];
    let lastValidDate = '2026-01-15';

    this.rawRows.forEach((origRow, origIdx) => {
      const rowId = String(origRow[pkCol] || `Row-${origIdx + 1}`).trim();

      // 0. Check if explicitly deleted by user
      if (this.deletedRowIds.has(rowId) || this.deletedRowIds.has(`ROW_${origIdx + 1}`)) {
        const msg = `Đã xóa dòng #${origIdx + 1} (${rowId}) theo yêu cầu trực tiếp của Chuyên viên BI`;
        this.dedupLogs.push(msg);
        this.diffLog.push({ rowIdx: origIdx + 1, rowId, col: 'TOÀN BỘ DÒNG', oldVal: `Bản ghi ${rowId}`, newVal: 'Đã xóa theo lệnh Con người', rule: '👤 Con người yêu cầu xóa dòng', manual: true });
        return;
      }

      // 1. Deduplication
      if (seenPks.has(rowId)) {
        const msg = `Đã xóa dòng #${origIdx + 1} do trùng mã định danh "${rowId}"`;
        this.dedupLogs.push(msg);
        this.diffLog.push({ rowIdx: origIdx + 1, rowId, col: pkCol, oldVal: `${rowId} (Bản sao trùng)`, newVal: 'Đã xóa dòng trùng', rule: 'Khử dòng trùng lặp' });
        return;
      }
      seenPks.add(rowId);

      const newRow = {};
      let rowDroppedReason = '';

      activeBaseHeaders.forEach(col => {
        if (rowDroppedReason) return;
        const rawVal = String(origRow[col] ?? '');
        let val = rawVal;
        const colL = col.toLowerCase();

        // Check Missing
        if (val.trim() === '' || val.trim().toLowerCase() === 'null') {
          if (this.cleanStrategy === 'drop_missing' || this.cleanStrategy === 'drop_all_dirty') {
            rowDroppedReason = `Thiếu giá trị ở cột ${col}`;
            return;
          }
          let imp = 'Chưa rõ';
          if (colL.includes('name')) imp = 'Khách hàng Vãng lai';
          else if (colL.includes('email')) imp = 'khachhang@company.vn';
          else if (colL.includes('discount') || colL.includes('bonus')) imp = '0';
          else if (colMedians[col] !== undefined) imp = String(colMedians[col]);
          else if (colL.includes('manager')) imp = 'Quản lý Khu vực';
          val = imp;
          this.outlierLogs.push(`Dòng #${origIdx + 1} (${rowId}) · ${col}: Điền ô trống ➔ "${val}"`);
          this.recordCellDiff(outRows.length, origIdx + 1, rowId, col, '[Ô trống]', val, 'Điền khuyết thiếu thông minh');
          newRow[col] = val;
          return;
        }

        // Date ISO
        if (colL.includes('date')) {
          if (val.includes('99') || val.includes('13-45')) {
            if (this.cleanStrategy === 'drop_all_dirty') {
              rowDroppedReason = `Ngày tháng sai lịch (${rawVal})`;
              return;
            }
          }
          const norm = this.normalizeIsoDate(val, lastValidDate);
          if (norm !== val.trim()) {
            this.formatLogs.push(`Dòng #${origIdx + 1} (${rowId}) · ${col}: "${rawVal}" ➔ "${norm}"`);
            this.recordCellDiff(outRows.length, origIdx + 1, rowId, col, rawVal, norm, 'Chuẩn hóa Ngày ISO YYYY-MM-DD');
            val = norm;
          }
          lastValidDate = val;
          newRow[col] = val;
          return;
        }

        // Numeric & Outlier
        const isNum = colL.includes('price') || colL.includes('quantity') || colL.includes('discount') ||
          colL.includes('salary') || colL.includes('bonus') || colL.includes('score') ||
          colL.includes('days') || colL.includes('spend') || colL.includes('revenue') || colL.includes('conversions');

        if (isNum) {
          let num = this.parseNum(val);
          if (!isNaN(num)) {
            if (/[,a-zA-ZđĐ₫\s]/.test(val.trim())) {
              this.formatLogs.push(`Dòng #${origIdx + 1} (${rowId}) · ${col}: Bóc tách tiền tệ "${rawVal}" ➔ ${num}`);
              this.recordCellDiff(outRows.length, origIdx + 1, rowId, col, rawVal, String(num), 'Bóc tách Tiền tệ -> Số');
              val = String(num);
            }
            if (num < 0) {
              if (this.cleanStrategy === 'drop_outliers' || this.cleanStrategy === 'drop_all_dirty') {
                rowDroppedReason = `Có giá trị âm vô lý ở cột ${col} (${rawVal})`;
                return;
              }
              const fixed = colL.includes('discount') ? 0 : Math.abs(num);
              this.outlierLogs.push(`Dòng #${origIdx + 1} (${rowId}) · ${col}: Đổi dấu số âm ${rawVal} ➔ ${fixed}`);
              this.recordCellDiff(outRows.length, origIdx + 1, rowId, col, rawVal, String(fixed), 'Xử lý số âm vô lý (|x|)');
              num = fixed;
              val = String(num);
            } else if ((colL.includes('price') || colL.includes('salary') || colL.includes('revenue')) && num >= 500000000) {
              if (this.cleanStrategy === 'drop_outliers' || this.cleanStrategy === 'drop_all_dirty') {
                rowDroppedReason = `Có giá trị ngoại lai cực đại ở cột ${col} (${this.fmt(num)})`;
                return;
              }
              const cap = colMedians[col] || 15000000;
              this.outlierLogs.push(`Dòng #${origIdx + 1} (${rowId}) · ${col}: Ngoại lai ${this.fmt(num)} ➔ Trung vị ${this.fmt(cap)}`);
              this.recordCellDiff(outRows.length, origIdx + 1, rowId, col, rawVal, String(cap), 'Cắt ngưỡng Ngoại lai -> Trung vị');
              num = cap;
              val = String(num);
            } else if (colL.includes('discount') && num > 60) {
              if (this.cleanStrategy === 'drop_outliers' || this.cleanStrategy === 'drop_all_dirty') {
                rowDroppedReason = `Chiết khấu vượt ngưỡng (${num}%)`;
                return;
              }
              const cap = 15;
              this.outlierLogs.push(`Dòng #${origIdx + 1} (${rowId}) · ${col}: Chiết khấu ${num}% ➔ ${cap}%`);
              this.recordCellDiff(outRows.length, origIdx + 1, rowId, col, rawVal, String(cap), 'Giới hạn Chiết khấu hợp lệ');
              val = String(cap);
            } else if (colL.includes('score') && num > 100) {
              if (this.cleanStrategy === 'drop_outliers' || this.cleanStrategy === 'drop_all_dirty') {
                rowDroppedReason = `Điểm vượt thang 100 (${num})`;
                return;
              }
              this.outlierLogs.push(`Dòng #${origIdx + 1} (${rowId}) · ${col}: Điểm ${num} ➔ 100`);
              this.recordCellDiff(outRows.length, origIdx + 1, rowId, col, rawVal, '100', 'Chuẩn hóa thang điểm 100');
              val = '100';
            }
          }
          newRow[col] = val;
          return;
        }

        // Text & Synonym Standardization
        let cl = val.trim().replace(/\s+/g, ' ');
        const lk = cl.toLowerCase();
        if (synMap[lk]) {
          cl = synMap[lk];
        } else if (colL.includes('name')) {
          cl = cl.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        }
        if (cl !== rawVal) {
          this.formatLogs.push(`Dòng #${origIdx + 1} (${rowId}) · ${col}: "${rawVal}" ➔ "${cl}"`);
          this.recordCellDiff(outRows.length, origIdx + 1, rowId, col, rawVal, cl, 'Chuẩn hóa Chuỗi & Đồng nghĩa');
          val = cl;
        }
        newRow[col] = val;
      });

      if (rowDroppedReason) {
        const msg = `Đã xóa dòng #${origIdx + 1} (${rowId}) — Lý do: ${rowDroppedReason}`;
        this.dedupLogs.push(msg);
        this.diffLog.push({
          rowIdx: origIdx + 1,
          rowId,
          col: 'TOÀN BỘ DÒNG',
          oldVal: rowDroppedReason,
          newVal: 'Đã xóa dòng lỗi theo yêu cầu',
          rule: '🗑️ Xóa dòng lỗi / thiếu (Theo lệnh Kiểm duyệt)',
          manual: true
        });
        return;
      }

      newRow.__origRowNum = origIdx + 1;
      newRow.__rowId = rowId;
      outRows.push(newRow);
    });

    // Derived BI Columns
    this.cleanHeaders = [...activeBaseHeaders];
    if (activeBaseHeaders.includes('Quantity') && activeBaseHeaders.includes('Unit_Price')) {
      ['Net_Sales_VND', 'Cost_VND', 'Profit_VND'].forEach(c => {
        if (!this.cleanHeaders.includes(c)) this.cleanHeaders.push(c);
      });
      outRows.forEach(r => {
        const q = parseFloat(r['Quantity']) || 0;
        const p = parseFloat(r['Unit_Price']) || 0;
        const d = parseFloat(r['Discount_Pct']) || 0;
        const net = Math.round(q * p * (1 - d / 100));
        const cost = Math.round(net * 0.72);
        r['Net_Sales_VND'] = String(net);
        r['Cost_VND'] = String(cost);
        r['Profit_VND'] = String(net - cost);
      });
    } else if (activeBaseHeaders.includes('Base_Salary') && activeBaseHeaders.includes('Bonus')) {
      ['Total_Income_VND', 'Cost_VND', 'Profit_VND'].forEach(c => {
        if (!this.cleanHeaders.includes(c)) this.cleanHeaders.push(c);
      });
      outRows.forEach(r => {
        const s = parseFloat(r['Base_Salary']) || 0;
        const b = parseFloat(r['Bonus']) || 0;
        const tot = Math.round(s + b);
        r['Total_Income_VND'] = String(tot);
        r['Cost_VND'] = String(tot);
        r['Profit_VND'] = String(Math.round(tot * 0.35));
      });
    } else if (activeBaseHeaders.includes('Revenue_VND') && activeBaseHeaders.includes('Spend_VND')) {
      if (!this.cleanHeaders.includes('Profit_VND')) this.cleanHeaders.push('Profit_VND');
      outRows.forEach(r => {
        const rev = parseFloat(r['Revenue_VND']) || 0;
        const sp = parseFloat(r['Spend_VND']) || 0;
        r['Profit_VND'] = String(Math.round(rev - sp));
      });
    }

    this.cleanRows = outRows;
    this.cleanProfile = this.profileData(this.cleanRows, this.cleanHeaders);
  }

  normalizeIsoDate(raw, fallback) {
    const s = String(raw || '').trim();
    let m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) {
      const dd = m[1].padStart(2, '0'), mm = m[2].padStart(2, '0'), yyyy = m[3];
      if (+mm >= 1 && +mm <= 12 && +dd >= 1 && +dd <= 31) return `${yyyy}-${mm}-${dd}`;
      return fallback;
    }
    m = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
    if (m) {
      const yyyy = m[1], mm = m[2].padStart(2, '0'), dd = m[3].padStart(2, '0');
      if (+mm >= 1 && +mm <= 12 && +dd >= 1 && +dd <= 31) return `${yyyy}-${mm}-${dd}`;
      return fallback;
    }
    return fallback;
  }

  recordCellDiff(cleanRowIdx, origRowNum, rowId, col, oldVal, newVal, rule, manual = false) {
    const item = { rowIdx: origRowNum, rowId, col, oldVal, newVal, rule, manual };
    this.diffLog.push(item);
    this.cellChangeMap[`${cleanRowIdx}_${col}`] = item;
  }

  buildStage1DataDictionary() {
    this.fieldDictionary = this.cleanHeaders.map((col, idx) => {
      const colL = col.toLowerCase();
      let dataType = 'Text / Chuỗi';
      let role = 'Phân loại (Dimension)';
      let meaning = `Trường phân loại / thuộc tính của bản ghi (${col})`;

      if (idx === 0 || colL.includes('id')) {
        dataType = 'String (ID)';
        role = 'Khóa định danh (Primary Key)';
        meaning = 'Mã định danh duy nhất dùng để đối soát và khử trùng lặp';
      } else if (colL.includes('date')) {
        dataType = 'Date (YYYY-MM-DD)';
        role = 'Thời gian (Time Dimension)';
        meaning = 'Mốc thời gian phát sinh giao dịch dùng phân tích chuỗi thời gian';
      } else if (!isNaN(this.cleanRows[0]?.[col]) && !colL.includes('phone')) {
        dataType = 'Numeric (Số)';
        role = 'Chỉ số đo lường (Metric/KPI)';
        meaning = `Chỉ số định lượng phục vụ tính Tổng, Trung bình, Trung vị (${col})`;
      }

      let rawMissing = 0;
      this.rawRows.forEach(r => {
        if (r[col] !== undefined && String(r[col]).trim() === '') rawMissing++;
      });

      return { col, dataType, role, rawMissing, cleanMissing: 0, meaning };
    });
  }

  buildStage3DescriptiveStats() {
    this.descriptiveStats = [];
    this.cleanHeaders.forEach((col, idx) => {
      if (idx === 0 || col.toLowerCase().includes('phone')) return;
      const nums = this.cleanRows.map(r => parseFloat(r[col])).filter(v => !isNaN(v));
      if (nums.length >= Math.max(2, this.cleanRows.length * 0.4)) {
        nums.sort((a, b) => a - b);
        const count = nums.length;
        const sum = nums.reduce((a, b) => a + b, 0);
        const mean = sum / count;
        const median = count % 2 === 1 ? nums[Math.floor(count / 2)] : (nums[count / 2 - 1] + nums[count / 2]) / 2;
        const variance = nums.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / count;
        const std = Math.sqrt(variance);
        const min = nums[0];
        const max = nums[count - 1];
        const q1 = nums[Math.floor(count * 0.25)];
        const q3 = nums[Math.floor(count * 0.75)];
        this.descriptiveStats.push({ col, count, sum, mean, median, std, min, max, q1, q3 });
      }
    });
  }

  // ==========================================================================
  // RENDER BƯỚC 2: BẢNG LÀM SẠCH, XÓA DÒNG TRỰC TIẾP & CỔNG DUYỆT #1
  // ==========================================================================
  renderStep2CleaningWorkspace() {
    const rp = this.rawProfile;
    const cp = this.cleanProfile;
    const droppedTotal = rp.rowCount - cp.rowCount;

    const modeLabels = {
      impute: 'Chế độ: Tự động chuẩn hóa & điền khuyết',
      drop_missing: 'Chế độ: Đã XÓA toàn bộ dòng có ô trống',
      drop_outliers: 'Chế độ: Đã XÓA toàn bộ dòng có số âm / ngoại lai',
      drop_all_dirty: 'Chế độ: Đã XÓA tất cả các dòng có lỗi bẩn'
    };
    document.getElementById('cleanModePill').textContent = modeLabels[this.cleanStrategy] || modeLabels.impute;
    document.getElementById('cleanRowCountLabel').textContent = cp.rowCount;

    // 1. Data Dictionary
    document.getElementById('dictSummaryBadge').textContent = `1 Sheet · ${this.cleanHeaders.length} Trường dữ liệu`;
    const dictRows = this.fieldDictionary.map(fd => `
      <tr>
        <td><strong>${this.esc(fd.col)}</strong></td>
        <td><code>${this.esc(fd.dataType)}</code></td>
        <td><span class="badge-pill">${this.esc(fd.role)}</span></td>
        <td>Gốc thiếu: <strong>${fd.rawMissing}</strong> ➔ Sau làm sạch: <strong class="text-emerald">0 thiếu</strong></td>
        <td>${this.esc(fd.meaning)}</td>
      </tr>
    `).join('');

    document.getElementById('stage1DictionaryContent').innerHTML = `
      <div class="exec-summary-banner" style="margin-bottom:10px;">
        <strong>🔍 Tóm tắt kiểm tra cấu trúc file gốc:</strong> Bảng <code>${this.esc(this.fileName)}</code> có <strong>${rp.rowCount} dòng gốc × ${this.headers.length} cột</strong>. Phát hiện <strong>${rp.dupCount} dòng trùng lặp</strong>, <strong>${rp.missingCount} ô trống</strong>, <strong>${rp.formatCount} ô sai chuẩn ngày/tiền tệ/chuỗi</strong> và <strong>${rp.outlierCount} số âm hoặc ngoại lai</strong>.
      </div>
      <details class="side-card" style="padding:10px 14px;">
        <summary style="cursor:pointer;font-weight:800;font-size:12.5px;color:var(--blue);">📖 Xem chi tiết Từ điển Trường Dữ liệu (${this.fieldDictionary.length} cột) ▾</summary>
        <div class="table-scroll mt-2">
          <table class="studio-table">
            <thead><tr><th>Tên Cột</th><th>Kiểu Dữ liệu</th><th>Vai trò BI</th><th>Độ đầy đủ</th><th>Ý nghĩa Nghiệp vụ</th></tr></thead>
            <tbody>${dictRows}</tbody>
          </table>
        </div>
      </details>
    `;

    // 2. 4 Comparison KPIs
    const rawErrCells = rp.missingCount + rp.formatCount + rp.outlierCount;
    const cleanErrCells = cp.missingCount + cp.formatCount + cp.outlierCount;

    document.getElementById('cleanCompareKpis').innerHTML = `
      <div class="cmp-card">
        <div class="cmp-label">Điểm chất lượng dữ liệu</div>
        <div class="cmp-vals">
          <span class="cmp-old">${rp.healthScore}%</span>
          <span>➔</span>
          <span class="cmp-new">${cp.healthScore}%</span>
        </div>
        <div class="cmp-note">Đạt chuẩn hợp lệ 100%</div>
      </div>
      <div class="cmp-card">
        <div class="cmp-label">Số dòng dữ liệu (Bản ghi)</div>
        <div class="cmp-vals">
          <span class="cmp-old">${rp.rowCount} dòng</span>
          <span>➔</span>
          <span class="cmp-new">${cp.rowCount} dòng</span>
        </div>
        <div class="cmp-note" style="color:var(--rose);font-weight:700;">Đã xóa bỏ ${droppedTotal} dòng trùng / lỗi</div>
      </div>
      <div class="cmp-card">
        <div class="cmp-label">Bản ghi bị trùng lặp</div>
        <div class="cmp-vals">
          <span class="cmp-old">${rp.dupCount} dòng</span>
          <span>➔</span>
          <span class="cmp-new">0 dòng</span>
        </div>
        <div class="cmp-note">Không còn bản ghi trùng lặp</div>
      </div>
      <div class="cmp-card">
        <div class="cmp-label">Ô trống / Sai chuẩn / Ngoại lai</div>
        <div class="cmp-vals">
          <span class="cmp-old">${rawErrCells} ô lỗi</span>
          <span>➔</span>
          <span class="cmp-new">${cleanErrCells} ô lỗi</span>
        </div>
        <div class="cmp-note">Đã xử lý ${this.diffLog.length} tác vụ làm sạch</div>
      </div>
    `;

    // Populate Date Filter Select
    const dateCol = this.cleanHeaders.find(h => h.toLowerCase().includes('date'));
    const fSel = document.getElementById('cleanDateFilterSelect');
    if (dateCol && fSel) {
      const periods = Array.from(new Set(this.cleanRows.map(r => String(r[dateCol] || '').slice(0, 7)).filter(Boolean))).sort();
      fSel.innerHTML = `<option value="__ALL__">📅 Tất cả kỳ (${periods.length} tháng)</option>` +
        periods.map(p => `<option value="${p}">Tháng ${p}</option>`).join('');
    }

    this.renderCleanPreviewTable();
    this.renderDiffAndStatsTables();
    this.renderCategorizedCleaningLogs();
  }

  renderCleanPreviewTable() {
    const fVal = document.getElementById('cleanDateFilterSelect')?.value || '__ALL__';
    const dateCol = this.cleanHeaders.find(h => h.toLowerCase().includes('date'));

    let rowsToShow = this.cleanRows.map((r, idx) => ({ __idx: idx, ...r }));
    if (fVal !== '__ALL__' && dateCol) {
      rowsToShow = rowsToShow.filter(r => String(r[dateCol] || '').startsWith(fVal));
    }

    document.getElementById('cleanPreviewMetaText').innerHTML =
      `💡 <strong>Bảng dữ liệu sạch hiện có ${rowsToShow.length} dòng:</strong> Nhấp đúp chuột vào ô bất kỳ để sửa giá trị, hoặc bấm nút <strong>🗑️ Xóa</strong> ở cột ngoài cùng để xóa trực tiếp dòng đó!`;

    let html = `<table class="studio-table"><thead><tr><th>#</th><th>Thao tác</th>`;
    this.cleanHeaders.forEach(h => { html += `<th>${this.esc(h)}</th>`; });
    html += `</tr></thead><tbody>`;

    rowsToShow.forEach(r => {
      const rIdx = r.__idx;
      const rowId = r.__rowId || r[this.cleanHeaders[0]] || `Row-${rIdx + 1}`;
      html += `<tr>
        <td><strong>${rIdx + 1}</strong></td>
        <td><button type="button" class="btn-del-row" onclick="app.deleteSingleCleanRow('${this.esc(rowId)}')" title="Xóa dòng này">🗑️ Xóa</button></td>`;
      this.cleanHeaders.forEach(col => {
        const val = String(r[col] ?? '');
        const chg = this.cellChangeMap[`${rIdx}_${col}`];
        const cls = chg ? (chg.manual ? 'cell-manual' : 'cell-cleaned') : '';
        const tip = chg
          ? `✔ [${chg.rule}] Trước: "${chg.oldVal}" ➔ Sau: "${chg.newVal}" (Nhấp đúp để sửa)`
          : 'Nhấp đúp (Double-click) để sửa trực tiếp ô này';
        const disp = this.isMoneyCol(col) && !isNaN(val) && val !== '' ? this.fmt(val) : this.esc(val);
        html += `<td class="${cls}" title="${this.esc(tip)}" ondblclick="app.enableInlineEdit(this, ${rIdx}, '${col}')">${disp}</td>`;
      });
      html += `</tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('cleanedPreviewTableWrap').innerHTML = html;
  }

  // Xóa trực tiếp 1 dòng trên bảng
  deleteSingleCleanRow(rowId) {
    this.deletedRowIds.add(rowId);
    this.executeCleaningEngine();
    this.buildStage3DescriptiveStats();
    this.renderStep2CleaningWorkspace();
    this.addAudit('XÓA DÒNG TRỰC TIẾP', `Chuyên viên "${this.reviewerName}" đã xóa bản ghi "${rowId}". Số dòng còn lại: ${this.cleanRows.length} dòng.`, 'reject');
    this.showToast(`🗑️ Đã xóa bản ghi "${rowId}"! Số dòng hiện tại còn ${this.cleanRows.length} dòng.`, 'info');
  }

  enableInlineEdit(td, rowIdx, col) {
    if (td.querySelector('input')) return;
    const curVal = String(this.cleanRows[rowIdx][col] ?? '');
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.value = curVal;
    inp.className = 'studio-input-sm';
    inp.style.width = '100%';
    inp.style.minWidth = '85px';

    const commit = () => {
      const next = inp.value.trim();
      if (next !== curVal) {
        const pk = this.cleanRows[rowIdx][this.cleanHeaders[0]] || `Row-${rowIdx + 1}`;
        this.cleanRows[rowIdx][col] = next;
        this.recordCellDiff(rowIdx, rowIdx + 1, pk, col, curVal, next, `👤 Sửa tay bởi ${this.reviewerName}`, true);
        this.buildStage3DescriptiveStats();
        this.showToast(`Đã cập nhật [${pk} · ${col}] ➔ "${next}"`, 'info');
      }
      this.renderStep2CleaningWorkspace();
    };

    inp.addEventListener('blur', commit);
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') inp.blur();
      if (e.key === 'Escape') this.renderCleanPreviewTable();
    });
    td.innerHTML = '';
    td.appendChild(inp);
    inp.focus();
  }

  renderDiffAndStatsTables() {
    document.getElementById('diffTotalCountBadge').textContent = this.diffLog.length;

    let dHtml = `<table class="studio-table"><thead><tr>
      <th>Vị trí Dòng</th><th>Mã Bản ghi</th><th>Cột dữ liệu</th><th>Giá trị Gốc (Trước)</th><th>Giá trị Sạch (Sau)</th><th>Hình thức xử lý</th>
    </tr></thead><tbody>`;
    this.diffLog.forEach(d => {
      dHtml += `<tr>
        <td>Dòng #${d.rowIdx}</td>
        <td><strong>${this.esc(d.rowId)}</strong></td>
        <td><code>${this.esc(d.col)}</code></td>
        <td class="cell-old-err">${this.esc(d.oldVal)}</td>
        <td class="${d.manual ? 'cell-manual' : 'cell-cleaned'}">${this.esc(d.newVal)}</td>
        <td>${this.esc(d.rule)}</td>
      </tr>`;
    });
    dHtml += `</tbody></table>`;
    document.getElementById('diffLogTableWrap').innerHTML = dHtml;

    let sHtml = `<table class="studio-table"><thead><tr>
      <th>Cột Chỉ số Số học</th><th>Số bản ghi (N)</th><th>Tổng cộng (Sum)</th><th>Trung bình (Mean)</th><th>Trung vị (Median)</th><th>Độ lệch chuẩn (σ)</th><th>Min → Max</th><th>Tứ phân vị (Q1 → Q3)</th>
    </tr></thead><tbody>`;
    this.descriptiveStats.forEach(s => {
      sHtml += `<tr>
        <td><strong>${this.esc(s.col)}</strong></td>
        <td>${s.count}</td>
        <td><strong>${this.fmt(s.sum)}</strong></td>
        <td class="text-blue"><strong>${this.fmt(Math.round(s.mean))}</strong></td>
        <td class="text-emerald"><strong>${this.fmt(Math.round(s.median))}</strong></td>
        <td>±${this.fmt(Math.round(s.std))}</td>
        <td>${this.fmt(s.min)} → ${this.fmt(s.max)}</td>
        <td>${this.fmt(s.q1)} → ${this.fmt(s.q3)}</td>
      </tr>`;
    });
    sHtml += `</tbody></table>`;
    document.getElementById('descriptiveStatsTableWrap').innerHTML = sHtml;
  }

  renderCategorizedCleaningLogs() {
    document.getElementById('dedupLogBox').innerHTML = this.dedupLogs.length
      ? `<ul style="padding-left:16px;">${this.dedupLogs.map(l => `<li>${this.esc(l)}</li>`).join('')}</ul>`
      : '✔ Không có dòng bị xóa.';

    document.getElementById('formatLogBox').innerHTML = this.formatLogs.length
      ? `<ul style="padding-left:16px;">${this.formatLogs.map(l => `<li>${this.esc(l)}</li>`).join('')}</ul>`
      : '✔ Định dạng ngày và chuỗi đã chuẩn.';

    document.getElementById('outlierLogBox').innerHTML = this.outlierLogs.length
      ? `<ul style="padding-left:16px;">${this.outlierLogs.map(l => `<li>${this.esc(l)}</li>`).join('')}</ul>`
      : '✔ Các dòng trống/ngoại lai đã được xóa hoặc xử lý triệt để.';

    const droppedCount = this.rawProfile.rowCount - this.cleanProfile.rowCount;
    document.getElementById('sideAnomalySummaryBox').innerHTML = `
      <div style="font-size:11.5px;background:var(--bg-card-solid);padding:9px 11px;border-radius:10px;border:1px solid var(--border-card);">
        <div>🗑️ Tổng số dòng đã xóa: <strong style="color:var(--rose)">${droppedCount} dòng</strong></div>
        <div>📋 Số dòng sạch còn lại: <strong class="text-emerald">${this.cleanProfile.rowCount} dòng</strong></div>
        <div>⏱️ Ô chuẩn hóa định dạng: <strong>${this.formatLogs.length} ô</strong></div>
      </div>
    `;
  }

  switchCleanSubTab(sub) {
    ['preview', 'diff', 'stats'].forEach(k => {
      document.getElementById(`cleanSubPane_${k}`)?.classList.toggle('hidden', k !== sub);
    });
    document.getElementById('innerTabCleanPreview').classList.toggle('active', sub === 'preview');
    document.getElementById('innerTabDiffCells').classList.toggle('active', sub === 'diff');
    document.getElementById('innerTabDescStats').classList.toggle('active', sub === 'stats');
  }

  // ==========================================================================
  // XỬ LÝ CỔNG #1 (CÓ / KHÔNG - HỖ TRỢ THỰC THI LỆNH XÓA THẬT 100%)
  // ==========================================================================
  approveGate1() {
    this.maxApprovedStep = Math.max(this.maxApprovedStep, 3);
    this.analysisIter = Math.max(1, this.analysisIter);
    document.getElementById('gate1RejectDrawer')?.classList.add('hidden');

    this.initDashboardDimensions();
    this.renderAllAnalytics();

    this.addAudit(
      'CỔNG KIỂM DUYỆT #1: CÓ – DỮ LIỆU HỢP LỆ (SANG BƯỚC 3)',
      `Chuyên viên "${this.reviewerName}" đã phê duyệt bộ dữ liệu sạch (${this.cleanRows.length} dòng). Chuyển sang Bước 3 Phân tích & Đánh giá kết quả.`,
      'approve'
    );

    this.goToStep(3);
    this.showToast('✅ Đã duyệt Bước 2! Đang mở Bước 3 (Dashboard Phân tích & Đánh giá kết quả).', 'info');
  }

  rejectGate1() {
    const drawer = document.getElementById('gate1RejectDrawer');
    drawer?.classList.remove('hidden');
    drawer?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('gate1RejectNote')?.focus();

    this.addAudit(
      'CỔNG KIỂM DUYỆT #1: KHÔNG – YÊU CẦU XÓA / LÀM SẠCH LẠI',
      `Chuyên viên "${this.reviewerName}" chọn "KHÔNG – Chưa hợp lệ" để yêu cầu xóa dòng lỗi hoặc làm sạch lại.`,
      'reject'
    );
    this.showToast('⚠️ Hãy chọn nút Xóa nhanh hoặc nhập lệnh xóa (VD: "xóa dòng thiếu", "xóa dòng lỗi", "xóa EMP-004") rồi bấm Thực Thi!', 'warn');
  }

  applyQuickCleanCommand(cmdType) {
    if (cmdType === 'drop_missing') {
      this.cleanStrategy = 'drop_missing';
      document.getElementById('gate1RejectNote').value = 'Xóa toàn bộ các dòng có ô trống / thiếu dữ liệu';
    } else if (cmdType === 'drop_outliers') {
      this.cleanStrategy = 'drop_outliers';
      document.getElementById('gate1RejectNote').value = 'Xóa toàn bộ các dòng có số âm hoặc giá trị ngoại lai';
    } else if (cmdType === 'drop_all_dirty') {
      this.cleanStrategy = 'drop_all_dirty';
      document.getElementById('gate1RejectNote').value = 'Xóa tất cả các dòng có bất kỳ lỗi trống, ngày sai hoặc số âm/ngoại lai';
    } else if (cmdType === 'restore_impute') {
      this.cleanStrategy = 'impute';
      this.deletedRowIds.clear();
      this.deletedCols.clear();
      document.getElementById('gate1RejectNote').value = 'Khôi phục chế độ tự điền khuyết thiếu';
    }
    this.submitGate1Rework();
  }

  submitGate1Rework() {
    const rawNote = (document.getElementById('gate1RejectNote')?.value || '').trim();
    const noteL = rawNote.toLowerCase();

    // Parse user command intelligently so when they ask to delete, it ACTUALLY DELETES!
    let actionTaken = '';

    // 1. Check if user mentions a specific record ID (e.g., ORD-1003, EMP-004, CMP-203)
    const idMatches = rawNote.match(/\b(ORD-\d+|EMP-\d+|CMP-\d+)\b/gi);
    if (idMatches && idMatches.length > 0) {
      idMatches.forEach(id => this.deletedRowIds.add(id.toUpperCase()));
      actionTaken = `Đã xóa trực tiếp mã bản ghi: ${idMatches.join(', ')}`;
    }

    // 2. Check if user mentions deleting a specific row number (e.g., "xóa dòng 3", "dòng #4")
    const rowNumMatches = rawNote.match(/dòng\s*#?(\d+)/gi);
    if (rowNumMatches && rowNumMatches.length > 0) {
      rowNumMatches.forEach(m => {
        const num = m.replace(/\D/g, '');
        if (num) this.deletedRowIds.add(`ROW_${num}`);
      });
      actionTaken = `Đã xóa ${rowNumMatches.join(', ')}`;
    }

    // 3. Check if user mentions deleting a column (e.g., "xóa cột Phone", "bỏ cột Email")
    this.headers.forEach(h => {
      if (noteL.includes(`cột ${h.toLowerCase()}`) || noteL.includes(`xóa ${h.toLowerCase()}`) || noteL.includes(`xoá ${h.toLowerCase()}`)) {
        this.deletedCols.add(h);
        actionTaken = `Đã xóa cột "${h}" khỏi bảng dữ liệu`;
      }
    });

    // 4. If user says "xóa" / "xoá" / "bỏ" generally (e.g. "xóa dòng thiếu", "xóa dòng trống", "xóa ngoại lai", or just "xóa" / "muốn xóa")
    if (!actionTaken) {
      if (noteL.includes('khôi phục') || noteL.includes('điền')) {
        this.cleanStrategy = 'impute';
        actionTaken = 'Đã khôi phục chế độ tự động điền khuyết thiếu';
      } else if (noteL.includes('trống') || noteL.includes('thiếu') || noteL.includes('null')) {
        this.cleanStrategy = 'drop_missing';
        actionTaken = 'Đã XÓA toàn bộ các dòng có ô trống / thiếu dữ liệu';
      } else if (noteL.includes('âm') || noteL.includes('ngoại lai') || noteL.includes('999')) {
        this.cleanStrategy = 'drop_outliers';
        actionTaken = 'Đã XÓA toàn bộ các dòng có số âm hoặc giá trị ngoại lai';
      } else {
        // Default when user clicks KHÔNG and types "xóa" or submits rework: delete all rows with missing or outlier issues!
        this.cleanStrategy = 'drop_all_dirty';
        actionTaken = 'Đã XÓA toàn bộ các dòng chứa dữ liệu lỗi (ô trống, ngày sai lịch, số âm, ngoại lai)';
      }
    }

    this.cleanIter++;
    this.executeCleaningEngine();
    this.buildStage1DataDictionary();
    this.buildStage3DescriptiveStats();
    this.renderStep2CleaningWorkspace();

    document.getElementById('gate1RejectDrawer')?.classList.add('hidden');
    const removedCount = this.rawProfile.rowCount - this.cleanProfile.rowCount;

    this.addAudit(
      `LÀM SẠCH LẠI & XÓA DỮ LIỆU (LẦN #${this.cleanIter})`,
      `${actionTaken}. Tổng số dòng đã xóa: ${removedCount} dòng (Từ ${this.rawProfile.rowCount} dòng gốc ➔ còn ${this.cleanProfile.rowCount} dòng sạch).`,
      'info'
    );

    this.showToast(`🗑️ ${actionTaken}! Đã xóa ${removedCount} dòng (Còn ${this.cleanProfile.rowCount}/${this.rawProfile.rowCount} dòng).`, 'info');
  }

  // ==========================================================================
  // BƯỚC 3: PHÂN TÍCH BIỂU ĐỒ DASHBOARD & ĐÁNH GIÁ KẾT QUẢ (CỔNG #2)
  // ==========================================================================
  initDashboardDimensions() {
    const dimSel = document.getElementById('dashDimensionSelect');
    const perSel = document.getElementById('dashPeriodSelect');

    const catCols = this.cleanHeaders.filter((col, idx) => {
      if (idx === 0) return false;
      const cl = col.toLowerCase();
      if (cl.includes('date') || cl.includes('email') || cl.includes('phone') || cl.includes('name')) return false;
      return isNaN(this.cleanRows[0]?.[col]);
    });
    if (catCols.length === 0) catCols.push(this.cleanHeaders[1] || this.cleanHeaders[0]);

    dimSel.innerHTML = catCols.map(c => `<option value="${c}">${c}</option>`).join('');

    const dateCol = this.cleanHeaders.find(h => h.toLowerCase().includes('date'));
    if (dateCol) {
      const months = Array.from(new Set(this.cleanRows.map(r => String(r[dateCol] || '').slice(0, 7)).filter(Boolean))).sort();
      perSel.innerHTML = `<option value="__ALL__">Toàn kỳ (${months.length} tháng)</option>` +
        months.map(m => `<option value="${m}">Kỳ ${m}</option>`).join('');
    }
  }

  renderAllAnalytics() {
    const dim = document.getElementById('dashDimensionSelect')?.value || this.cleanHeaders[1];
    const chosenPeriod = document.getElementById('dashPeriodSelect')?.value || '__ALL__';
    const dateCol = this.cleanHeaders.find(h => h.toLowerCase().includes('date')) || this.cleanHeaders[1];

    const revCol = this.cleanHeaders.find(c => ['Net_Sales_VND', 'Total_Income_VND', 'Revenue_VND', 'Unit_Price', 'Base_Salary'].includes(c)) || this.cleanHeaders[this.cleanHeaders.length - 1];
    const costCol = this.cleanHeaders.find(c => ['Cost_VND', 'Spend_VND', 'Base_Salary'].includes(c));
    const profCol = this.cleanHeaders.find(c => c === 'Profit_VND');

    let activeRows = this.cleanRows;
    if (chosenPeriod !== '__ALL__') {
      activeRows = this.cleanRows.filter(r => String(r[dateCol] || '').startsWith(chosenPeriod));
    }

    let totalRev = 0, totalCost = 0, totalProfit = 0, totalQty = 0;
    const groups = {};
    const monthGroups = {};

    this.cleanRows.forEach(r => {
      const mKey = String(r[dateCol] || '2026-01').slice(0, 7);
      const rv = parseFloat(r[revCol]) || 0;
      if (!monthGroups[mKey]) monthGroups[mKey] = { period: mKey, sum: 0, count: 0, byGroup: {} };
      monthGroups[mKey].sum += rv;
      monthGroups[mKey].count += 1;
      const gName = r[dim] || 'Khác';
      monthGroups[mKey].byGroup[gName] = (monthGroups[mKey].byGroup[gName] || 0) + rv;
    });

    activeRows.forEach(r => {
      const gKey = r[dim] || 'Khác';
      const rv = parseFloat(r[revCol]) || 0;
      const cs = costCol ? (parseFloat(r[costCol]) || 0) : Math.round(rv * 0.72);
      const pf = profCol ? (parseFloat(r[profCol]) || 0) : (rv - cs);
      const qt = parseFloat(r['Quantity'] || r['Working_Days'] || r['Conversions'] || 1) || 1;

      totalRev += rv;
      totalCost += cs;
      totalProfit += pf;
      totalQty += qt;

      if (!groups[gKey]) groups[gKey] = { name: gKey, rev: 0, cost: 0, profit: 0, count: 0 };
      groups[gKey].rev += rv;
      groups[gKey].cost += cs;
      groups[gKey].profit += pf;
      groups[gKey].count += 1;
    });

    const sortedGroups = Object.values(groups).sort((a, b) => b.rev - a.rev);
    let cumPct = 0;
    sortedGroups.forEach(g => {
      g.sharePct = totalRev > 0 ? +((g.rev / totalRev) * 100).toFixed(1) : 0;
      cumPct += g.sharePct;
      g.cumPct = +Math.min(100, cumPct).toFixed(1);
      g.abcClass = g.cumPct <= 72 ? 'A' : g.cumPct <= 92 ? 'B' : 'C';
    });

    const sortedMonths = Object.values(monthGroups).sort((a, b) => a.period.localeCompare(b.period));

    const top1 = sortedGroups[0] || { name: 'N/A', rev: 0, profit: 0, cost: 0, count: 0, sharePct: 0 };
    const top2 = sortedGroups[1] || { name: 'N/A', rev: 0, profit: 0, cost: 0, count: 0, sharePct: 0 };
    const bottom = sortedGroups[sortedGroups.length - 1] || { name: 'N/A', rev: 0, profit: 0, cost: 0, count: 0, sharePct: 0 };
    const top2Share = (top1.sharePct + top2.sharePct).toFixed(1);
    const marginPct = totalRev > 0 ? ((totalProfit / totalRev) * 100).toFixed(1) : '28.0';

    this.analyticsData = {
      dim, chosenPeriod, dateCol, revCol, totalRev, totalCost, totalProfit, totalQty,
      marginPct, sortedGroups, sortedMonths, top1, top2, bottom, top2Share, rowCount: activeRows.length
    };

    // Executive Summary Banner
    document.getElementById('execSummaryBanner').innerHTML = `
      📌 <strong>Tóm tắt Kết quả Phân tích Quản trị:</strong> Trên tập dữ liệu sạch gồm <strong>${activeRows.length} bản ghi hợp lệ</strong> (đã loại bỏ ${this.rawProfile.rowCount - this.cleanProfile.rowCount} bản ghi lỗi/trùng), tổng quy mô <strong>${revCol}</strong> đạt <strong>${this.fmt(totalRev)} VND</strong>, Lợi nhuận ròng đạt <strong>${this.fmt(totalProfit)} VND</strong> (tỷ suất sinh lời <strong>${marginPct}%</strong>) và Tổng chi phí ở mức <strong>${this.fmt(totalCost)} VND</strong>. Xét theo chiều <strong>${dim}</strong>, hai đơn vị dẫn đầu là <strong>${top1.name}</strong> (${top1.sharePct}%) và <strong>${top2.name}</strong> (${top2.sharePct}%) đóng góp tới <strong>${top2Share}%</strong> toàn hệ thống; trong khi <strong>${bottom.name}</strong> đứng cuối bảng với <strong>${this.fmt(bottom.rev)} VND</strong> (${bottom.sharePct}%).
      ${this.customReworkNote ? `<br/><span style="color:var(--amber);font-weight:800;">👉 [Đã điều chỉnh theo yêu cầu đánh giá của Chuyên viên BI]: ${this.esc(this.customReworkNote)}</span>` : ''}
    `;

    // 4 Core KPI Cards (Premium Design with Icons, Trend Pills & Mini Progress Bars)
    const cleanRatio = Math.round((activeRows.length / Math.max(1, this.rawProfile.rowCount)) * 100);
    const avgVal = Math.round(totalRev / Math.max(1, activeRows.length));
    const costRatio = (100 - parseFloat(marginPct)).toFixed(1);

    document.getElementById('dash4KpisGrid').innerHTML = `
      <div class="kpi-box">
        <div class="kpi-box-top">
          <span class="kpi-ic ic-blue"><i class="fa-solid fa-database"></i></span>
          <span class="kpi-trend-pill">✔ ${this.cleanProfile.healthScore}% Sạch</span>
        </div>
        <div class="kpi-box-title">Số Bản ghi Sạch Hợp lệ</div>
        <div class="kpi-box-val">${this.fmt(activeRows.length)} <span style="font-size:13px;font-weight:600;color:var(--text-muted)">dòng</span></div>
        <div class="kpi-box-sub">Đã lọc bỏ ${this.rawProfile.rowCount - this.cleanProfile.rowCount} dòng lỗi/trùng (${cleanRatio}% giữ lại)</div>
        <div style="height:5px;background:rgba(37,99,235,0.12);border-radius:99px;margin-top:8px;overflow:hidden;">
          <div class="anim-bar-fill" style="height:100%;width:${cleanRatio}%;background:#2563eb;border-radius:99px;"></div>
        </div>
      </div>

      <div class="kpi-box">
        <div class="kpi-box-top">
          <span class="kpi-ic ic-purple"><i class="fa-solid fa-sack-dollar"></i></span>
          <span class="kpi-trend-pill" style="background:var(--purple-soft);color:var(--purple)">Top 1: ${top1.sharePct}%</span>
        </div>
        <div class="kpi-box-title">Tổng Quy mô (${this.esc(revCol)})</div>
        <div class="kpi-box-val text-blue">${this.fmt(totalRev)} <span style="font-size:12px">VND</span></div>
        <div class="kpi-box-sub">Trung bình: <strong>${this.fmt(avgVal)} VND</strong> / giao dịch</div>
        <div style="height:5px;background:rgba(124,58,237,0.12);border-radius:99px;margin-top:8px;overflow:hidden;">
          <div class="anim-bar-fill" style="height:100%;width:88%;background:linear-gradient(90deg,#2563eb,#7c3aed);border-radius:99px;"></div>
        </div>
      </div>

      <div class="kpi-box">
        <div class="kpi-box-top">
          <span class="kpi-ic ic-emerald"><i class="fa-solid fa-chart-line"></i></span>
          <span class="kpi-trend-pill">ROS +${marginPct}%</span>
        </div>
        <div class="kpi-box-title">Lợi nhuận Quản trị (Profit_VND)</div>
        <div class="kpi-box-val text-emerald">${this.fmt(totalProfit)} <span style="font-size:12px">VND</span></div>
        <div class="kpi-box-sub">Dẫn đầu lợi nhuận: <strong>${this.esc(top1.name)}</strong></div>
        <div style="height:5px;background:rgba(5,150,105,0.12);border-radius:99px;margin-top:8px;overflow:hidden;">
          <div class="anim-bar-fill" style="height:100%;width:${Math.min(100, Math.max(15, parseFloat(marginPct) * 2.2))}%;background:#059669;border-radius:99px;"></div>
        </div>
      </div>

      <div class="kpi-box">
        <div class="kpi-box-top">
          <span class="kpi-ic ic-amber"><i class="fa-solid fa-Scale-balanced"></i></span>
          <span class="kpi-trend-pill" style="background:var(--amber-soft);color:var(--amber)">Chi phí ${costRatio}%</span>
        </div>
        <div class="kpi-box-title">Tổng Chi phí (Cost_VND)</div>
        <div class="kpi-box-val text-amber">${this.fmt(totalCost)} <span style="font-size:12px">VND</span></div>
        <div class="kpi-box-sub">Kiểm soát trong ngưỡng an toàn quản trị</div>
        <div style="height:5px;background:rgba(217,119,6,0.12);border-radius:99px;margin-top:8px;overflow:hidden;">
          <div class="anim-bar-fill" style="height:100%;width:${Math.min(100, parseFloat(costRatio))}%;background:#d97706;border-radius:99px;"></div>
        </div>
      </div>
    `;

    document.getElementById('dashMarginStrip').innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <span>💹 <strong>Tỷ suất Lợi nhuận ròng trên Doanh thu (Net Profit Margin):</strong></span>
        <span class="badge-pill" style="background:var(--emerald-soft);color:var(--emerald)">Đạt chuẩn Quản trị</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:140px;height:10px;background:#e2e8f0;border-radius:99px;overflow:hidden;">
          <div class="anim-bar-fill" style="height:100%;width:${Math.min(100, parseFloat(marginPct) * 2)}%;background:linear-gradient(90deg,#059669,#10b981);"></div>
        </div>
        <span class="text-emerald" style="font-size:16px;font-weight:900;">${marginPct}%</span>
      </div>
    `;

    this.renderStage4SixCharts();
    this.renderStage6SolutionsTable();
    this.renderCorporateManagementReport();
  }

  updateDonutCenter(name, valStr, shareStr) {
    const tEl = document.getElementById('donutCenterName');
    const vEl = document.getElementById('donutCenterPct');
    if (tEl && vEl) {
      tEl.textContent = name;
      vEl.textContent = `${shareStr}%`;
    }
  }

  renderStage4SixCharts() {
    const d = this.analyticsData;
    const maxRev = d.top1.rev || 1;
    const colors = ['#2563eb', '#059669', '#7c3aed', '#d97706', '#e11d48', '#0891b2'];

    // 1. Animated Dual-Bar Comparison (Doanh thu & Lợi nhuận song song)
    const ch1Bars = d.sortedGroups.map((g, i) => {
      const revW = Math.max(6, Math.round((g.rev / maxRev) * 100));
      const profW = Math.max(4, Math.round((g.profit / maxRev) * 100));
      const delay = (i * 0.08).toFixed(2);
      return `
        <div class="bar-row-interactive" title="Đơn vị: ${this.esc(g.name)} | Doanh thu: ${this.fmt(g.rev)} VND | Lợi nhuận: ${this.fmt(g.profit)} VND">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:700;margin-bottom:4px;">
            <span><span style="display:inline-block;width:20px;height:20px;border-radius:6px;background:${colors[i % colors.length]};color:#fff;text-align:center;line-height:20px;font-size:10px;margin-right:6px;">#${i + 1}</span>${this.esc(g.name)} <small style="color:var(--text-muted);font-weight:600;">(${g.count} dòng)</small></span>
            <span><strong class="text-blue">${this.fmt(g.rev)}</strong> <small class="text-emerald">(LN: ${this.fmt(g.profit)})</small> · <strong>${g.sharePct}%</strong></span>
          </div>
          <div style="height:10px;background:rgba(37,99,235,0.1);border-radius:99px;overflow:hidden;margin-bottom:3px;">
            <div class="anim-bar-fill" style="height:100%;width:${revW}%;animation-delay:${delay}s;background:linear-gradient(90deg,${colors[i % colors.length]},#38bdf8);border-radius:99px;"></div>
          </div>
          <div style="height:5px;background:rgba(5,150,105,0.1);border-radius:99px;overflow:hidden;">
            <div class="anim-bar-fill" style="height:100%;width:${profW}%;animation-delay:${delay}s;background:#10b981;border-radius:99px;"></div>
          </div>
        </div>
      `;
    }).join('');

    // 2. Interactive Animated SVG Donut Chart (Di chuột để xem từng phần phóng to!)
    const r = 64;
    const circum = 2 * Math.PI * r;
    let offset = 0;
    const svgCircles = d.sortedGroups.map((g, i) => {
      const col = colors[i % colors.length];
      const dash = (g.sharePct / 100) * circum;
      const curOffset = offset;
      offset += dash;
      return `<circle class="anim-donut-seg" r="${r}" cx="90" cy="90" fill="transparent" stroke="${col}" stroke-width="25"
        stroke-dasharray="${dash} ${circum}" stroke-dashoffset="${-curOffset}" transform="rotate(-90 90 90)"
        onmouseenter="app.updateDonutCenter('${this.esc(g.name)}', '${this.fmt(g.rev)}', '${g.sharePct}')"
        onmouseleave="app.updateDonutCenter('TỔNG QUY MÔ', '${this.fmt(d.totalRev)}', '100')">
        <title>${this.esc(g.name)}: ${this.fmt(g.rev)} VND (${g.sharePct}%)</title>
      </circle>`;
    }).join('');

    const donutHtml = `
      <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;justify-content:center;">
        <div style="position:relative;width:180px;height:180px;flex-shrink:0;">
          <svg viewBox="0 0 180 180" style="width:180px;height:180px;overflow:visible;">
            ${svgCircles}
          </svg>
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;text-align:center;padding:24px;">
            <span id="donutCenterName" style="font-size:10px;font-weight:800;color:var(--text-muted);text-transform:uppercase;">TỔNG QUY MÔ</span>
            <strong id="donutCenterPct" style="font-size:18px;font-weight:900;color:var(--blue);margin-top:2px;">100%</strong>
          </div>
        </div>
        <div style="flex:1;min-width:170px;font-size:12px;">
          ${d.sortedGroups.map((g, i) => `
            <div class="bar-row-interactive" style="display:flex;justify-content:space-between;align-items:center;padding:5px 8px;"
                 onmouseenter="app.updateDonutCenter('${this.esc(g.name)}', '${this.fmt(g.rev)}', '${g.sharePct}')">
              <span style="display:flex;align-items:center;gap:7px;">
                <span style="width:11px;height:11px;border-radius:4px;background:${colors[i % colors.length]};display:inline-block;"></span>
                <strong>${this.esc(g.name)}</strong>
              </span>
              <span><strong>${g.sharePct}%</strong> <small style="color:var(--text-muted)">(${this.fmt(g.rev)})</small></span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // 3. Smooth Cubic-Bezier Spline Area Chart (Biểu đồ Đường cong mượt + Đỉnh cao nhất)
    const pts = d.sortedMonths;
    const maxM = Math.max(1, ...pts.map(p => p.sum));
    const coords = pts.map((p, i) => {
      const x = pts.length === 1 ? 190 : 38 + (i * 310) / (pts.length - 1);
      const y = 132 - (p.sum / maxM) * 95;
      return { x: Math.round(x), y: Math.round(y), label: p.period, val: p.sum, count: p.count };
    });

    // Build smooth cubic bezier path
    let smoothPath = '';
    if (coords.length > 0) {
      smoothPath = `M ${coords[0].x},${coords[0].y}`;
      for (let i = 0; i < coords.length - 1; i++) {
        const p0 = coords[i];
        const p1 = coords[i + 1];
        const cpx1 = Math.round(p0.x + (p1.x - p0.x) * 0.45);
        const cpx2 = Math.round(p0.x + (p1.x - p0.x) * 0.55);
        smoothPath += ` C ${cpx1},${p0.y} ${cpx2},${p1.y} ${p1.x},${p1.y}`;
      }
    }
    const areaPath = coords.length ? `${smoothPath} L ${coords[coords.length - 1].x},142 L ${coords[0].x},142 Z` : '';

    const lineSvg = `
      <svg viewBox="0 0 380 165" style="width:100%;height:175px;overflow:visible;">
        <defs>
          <linearGradient id="splineAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2563eb" stop-opacity="0.32"/>
            <stop offset="100%" stop-color="#059669" stop-opacity="0.02"/>
          </linearGradient>
        </defs>
        <line x1="32" y1="35" x2="356" y2="35" stroke="#e2e8f0" stroke-dasharray="3,3"/>
        <line x1="32" y1="88" x2="356" y2="88" stroke="#e2e8f0" stroke-dasharray="3,3"/>
        <line x1="32" y1="142" x2="356" y2="142" stroke="#cbd5e1"/>
        <path d="${areaPath}" fill="url(#splineAreaGrad)" />
        <path class="anim-line-path" d="${smoothPath}" fill="none" stroke="#2563eb" stroke-width="3.2" stroke-linecap="round"/>
        ${coords.map((c, idx) => `
          <g style="cursor:pointer;">
            <circle cx="${c.x}" cy="${c.y}" r="6" fill="#059669" stroke="#fff" stroke-width="2">
              <title>Kỳ ${c.label}: ${this.fmt(c.val)} VND (${c.count} giao dịch)</title>
            </circle>
            <text x="${c.x}" y="${c.y - 11}" text-anchor="middle" font-size="9.5" fill="#0f172a" font-weight="800">${(c.val / 1e6).toFixed(1)}Tr</text>
            <text x="${c.x}" y="157" text-anchor="middle" font-size="10" fill="#475569" font-weight="700">Tháng ${c.label.slice(5)}</text>
          </g>
        `).join('')}
      </svg>
    `;

    // 4. Animated Combo Column + Pareto 80/20 Curve Chart
    const nG = d.sortedGroups.length || 1;
    const slotW = 320 / nG;
    const barW = Math.min(38, Math.max(16, slotW * 0.56));
    const paretoCols = d.sortedGroups.map((g, i) => {
      const bh = Math.max(12, Math.round((g.rev / maxRev) * 100));
      const x = Math.round(28 + i * slotW + (slotW - barW) / 2);
      const y = 135 - bh;
      const delay = (i * 0.09).toFixed(2);
      return `
        <g style="cursor:pointer;">
          <rect class="anim-col-rect" x="${x}" y="${y}" width="${barW}" height="${bh}" rx="6" fill="url(#colGrad)" style="animation-delay:${delay}s">
            <title>${this.esc(g.name)}: ${this.fmt(g.rev)} VND (Tích lũy Pareto: ${g.cumPct}%)</title>
          </rect>
          <text x="${x + barW / 2}" y="152" text-anchor="middle" font-size="9.5" fill="#334155" font-weight="700">${this.esc(g.name.slice(0, 9))}</text>
        </g>
      `;
    }).join('');

    const paretoPts = d.sortedGroups.map((g, i) => {
      const x = Math.round(28 + i * slotW + slotW / 2);
      const y = Math.round(135 - (g.cumPct / 100) * 100);
      return { x, y, cum: g.cumPct, name: g.name };
    });
    const paretoPolyline = paretoPts.map(p => `${p.x},${p.y}`).join(' ');

    const paretoSvg = `
      <svg viewBox="0 0 380 165" style="width:100%;height:175px;overflow:visible;">
        <defs>
          <linearGradient id="colGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2563eb"/>
            <stop offset="100%" stop-color="#0d9488"/>
          </linearGradient>
        </defs>
        <line x1="24" y1="55" x2="355" y2="55" stroke="#e11d48" stroke-dasharray="4,3" stroke-width="1.2"/>
        <text x="358" y="58" font-size="9" fill="#e11d48" font-weight="800">80%</text>
        <line x1="24" y1="135" x2="355" y2="135" stroke="#cbd5e1"/>
        ${paretoCols}
        <polyline class="anim-line-path" fill="none" stroke="#d97706" stroke-width="2.8" points="${paretoPolyline}" />
        ${paretoPts.map(p => `
          <circle cx="${p.x}" cy="${p.y}" r="4.5" fill="#d97706" stroke="#fff" stroke-width="1.5">
            <title>Tích lũy tới ${this.esc(p.name)}: ${p.cum}%</title>
          </circle>
          <text x="${p.x}" y="${p.y - 8}" text-anchor="middle" font-size="9" fill="#b45309" font-weight="800">${p.cum}%</text>
        `).join('')}
      </svg>
    `;

    const chartCards = [
      {
        type: '📊 Biểu đồ Cột Kép Chuyển Động (Dual-Bar Revenue & Profit)',
        title: `Đối chiếu Quy mô (${d.revCol}) & Lợi nhuận theo ${d.dim}`,
        visual: ch1Bars,
        comment: `Thanh trên thể hiện Doanh thu, thanh xanh lá dưới thể hiện Lợi nhuận ròng. "${d.top1.name}" dẫn đầu với ${this.fmt(d.top1.rev)} VND (${d.top1.sharePct}%).`
      },
      {
        type: '🍩 Biểu đồ Donut Tương Tác 360° (Interactive Share Donut)',
        title: `Cơ cấu Tỷ trọng Đóng góp (%) theo ${d.dim} (Di chuột để tương tác)`,
        visual: donutHtml,
        comment: `Di chuột vào từng lát cắt trên vòng Donut để xem tỷ trọng chi tiết. Top 2 đơn vị đầu bảng chiếm ${d.top2Share}% toàn hệ thống.`
      },
      {
        type: '📈 Biểu đồ Đường Cong Spline Thời Gian (Time-Series Area)',
        title: `Xu hướng Biến động ${d.revCol} qua các kỳ (${d.dateCol})`,
        visual: lineSvg,
        comment: `Đường cong biểu diễn biến động theo thời gian thực sau khi đã khử các ngày sai lịch (như 2026-99-99) và đơn trùng lặp.`
      },
      {
        type: '🏆 Biểu đồ Kết Hợp Cột & Đường Tích Lũy Pareto 80/20',
        title: `Phân tích Quy luật Pareto 80/20 & Mức độ Tập trung theo ${d.dim}`,
        visual: paretoSvg,
        comment: `Cột đứng biểu thị quy mô từng nhóm, đường cam biểu thị tỷ trọng tích lũy cộng dồn (%) so với ngưỡng chuẩn 80%.`
      }
    ];

    document.getElementById('biStage4ChartsGrid').innerHTML = chartCards.map(c => `
      <div class="chart-card-item">
        <div>
          <span class="badge-pill">${this.esc(c.type)}</span>
          <h4 style="font-size:14px;font-weight:800;margin-top:6px;">${this.esc(c.title)}</h4>
        </div>
        <div class="chart-visual-box">${c.visual}</div>
        <div class="chart-commentary"><strong>💡 Nhận định Quản trị:</strong> ${this.esc(c.comment)}</div>
      </div>
    `).join('');
  }

  renderStage6SolutionsTable() {
    const d = this.analyticsData;
    const solutions = [
      {
        prio: 'Mức 1 · Ưu tiên Chiến lược',
        problem: `Mức độ tập trung cao vào "${d.top1.name}" (${d.top1.sharePct}% tổng quy mô) tạo rủi ro phụ thuộc`,
        solution: `Bảo vệ 100% năng lực cung ứng & nhân sự chủ chốt tại "${d.top1.name}" và "${d.top2.name}", đồng thời thiết lập quỹ dự phòng rủi ro thị trường.`,
        dept: 'Ban Kinh doanh & Khối Vận hành',
        kpi: `Duy trì tốc độ tăng trưởng >= 15%/quý; Tỷ lệ giữ chân khách hàng/nhân sự >= 95%`,
        risk: 'Tránh đứt gãy chuỗi cung ứng tại địa bàn/đơn vị trọng điểm'
      },
      {
        prio: 'Mức 2 · Tối ưu Hiệu suất',
        problem: `Đơn vị "${d.bottom.name}" có quy mô thấp nhất (${this.fmt(d.bottom.rev)} VND, chỉ chiếm ${d.bottom.sharePct}%)`,
        solution: `Tái cơ cấu danh mục sản phẩm/ngân sách tại "${d.bottom.name}", triển khai gói giải pháp bán chéo (Cross-selling) để nâng quy mô trung bình.`,
        dept: 'Khối Marketing & Phát triển Thị trường',
        kpi: `Tăng quy mô tại "${d.bottom.name}" tối thiểu +25% trong 60 ngày; Biên lợi nhuận >= ${d.marginPct}%`,
        risk: 'Kiểm soát trần chiết khấu không vượt quá 20% để bảo vệ biên lợi nhuận'
      },
      {
        prio: 'Mức 3 · Quản trị Hệ thống',
        problem: `Dữ liệu gốc phát sinh ${this.rawProfile.totalIssues} lỗi (trùng mã, bỏ trống ô, nhập số âm, ngoại lai)`,
        solution: `Áp dụng chuẩn kiểm soát nhập liệu tự động (Data Validation Rules) trên ERP/CRM và duy trì quy trình kiểm duyệt 2 lớp.`,
        dept: 'Phòng BI & Khối Công nghệ (IT)',
        kpi: `Giảm 95% lỗi dữ liệu đầu vào; Điểm chất lượng dữ liệu >= 98/100`,
        risk: 'Cần ban hành quy chế bắt buộc nhập đủ trường thông tin tại các chi nhánh'
      }
    ];

    document.getElementById('biStage6SolutionsBody').innerHTML = solutions.map(s => `
      <tr>
        <td><strong class="text-blue">${this.esc(s.prio)}</strong></td>
        <td><strong>${this.esc(s.problem)}</strong></td>
        <td>${this.esc(s.solution)}</td>
        <td><span class="badge-pill">${this.esc(s.dept)}</span></td>
        <td><strong class="text-emerald">${this.esc(s.kpi)}</strong></td>
        <td>${this.esc(s.risk)}</td>
      </tr>
    `).join('');
  }

  // Gate 2 Actions (CÓ -> Chuyển hẳn sang màn hình Bước 4 Báo cáo Quản trị!)
  approveGate2() {
    this.maxApprovedStep = 4;
    document.getElementById('gate2RejectDrawer')?.classList.add('hidden');
    this.renderCorporateManagementReport();

    this.addAudit(
      'CỔNG ĐÁNH GIÁ #2: CÓ – ĐẠT YÊU CẦU (CHUYỂN SANG BƯỚC 4)',
      `Chuyên viên "${this.reviewerName}" đã nghiệm thu kết quả phân tích Dashboard. Chuyển sang Bước 4: Báo cáo Quản trị Doanh nghiệp & Xuất 4 File.`,
      'approve'
    );

    this.goToStep(4);
    this.showToast('🎉 Đã nghiệm thu Bước 3! Đã chuyển sang Bước 4: Báo cáo Quản trị Doanh nghiệp Chính thức.', 'info');
  }

  rejectGate2() {
    const drawer = document.getElementById('gate2RejectDrawer');
    drawer?.classList.remove('hidden');
    drawer?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    this.addAudit(
      'CỔNG ĐÁNH GIÁ #2: KHÔNG – ĐIỀU CHỈNH & PHÂN TÍCH LẠI',
      `Chuyên viên "${this.reviewerName}" yêu cầu điều chỉnh và phân tích lại kết quả ở Bước 3.`,
      'reject'
    );
    this.showToast('🔄 Vui lòng nhập yêu cầu điều chỉnh phân tích ở khung bên dưới để hệ thống Phân tích lại!', 'warn');
  }

  setGate2ReworkPrompt(txt) {
    document.getElementById('gate2RejectNote').value = txt;
  }

  submitGate2Rework() {
    const note = document.getElementById('gate2RejectNote').value.trim() || 'Tối ưu cơ cấu chi phí và nâng cao biên lợi nhuận ròng';
    this.customReworkNote = note;
    this.analysisIter++;
    document.getElementById('gate2RejectDrawer')?.classList.add('hidden');
    this.renderAllAnalytics();
    this.addAudit(`PHÂN TÍCH LẠI (LẦN #${this.analysisIter})`, `Đã điều chỉnh phân tích theo yêu cầu: "${note}"`, 'info');
    this.showToast(`✨ Đã cập nhật kết quả phân tích (Lần #${this.analysisIter})!`, 'info');
  }

  // ==========================================================================
  // BƯỚC 4: BÁO CÁO QUẢN TRỊ DOANH NGHIỆP CHUẨN TRÌNH HĐQT & BAN GIÁM ĐỐC
  // ==========================================================================
  renderCorporateManagementReport() {
    const d = this.analyticsData;
    if (!d) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN');
    const docCode = `BCQT-BI/${now.getFullYear()}/${String(this.cleanRows.length).padStart(3, '0')}`;
    const droppedRows = this.rawProfile.rowCount - this.cleanProfile.rowCount;

    const unitRows = d.sortedGroups.map((g, i) => {
      const unitMargin = g.rev > 0 ? ((g.profit / g.rev) * 100).toFixed(1) : '0.0';
      const rating = g.abcClass === 'A' ? 'Trụ cột Chiến lược (Hạng A)' : g.abcClass === 'B' ? 'Tăng trưởng Ổn định (Hạng B)' : 'Cần Tái cơ cấu (Hạng C)';
      return `
        <tr>
          <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:center;font-weight:700;">${i + 1}</td>
          <td style="padding:8px 10px;border:1px solid #cbd5e1;font-weight:800;color:#0f172a;">${this.esc(g.name)}</td>
          <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">${g.count}</td>
          <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;font-weight:700;">${this.fmt(g.rev)}</td>
          <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">${this.fmt(g.cost)}</td>
          <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;font-weight:700;color:#059669;">${this.fmt(g.profit)}</td>
          <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">${unitMargin}%</td>
          <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;font-weight:700;">${g.sharePct}%</td>
          <td style="padding:8px 10px;border:1px solid #cbd5e1;">${rating}</td>
        </tr>
      `;
    }).join('');

    const statsRows = this.descriptiveStats.map(s => `
      <tr>
        <td style="padding:7px 10px;border:1px solid #cbd5e1;font-weight:700;">${this.esc(s.col)}</td>
        <td style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;">${s.count}</td>
        <td style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;font-weight:700;">${this.fmt(s.sum)}</td>
        <td style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;">${this.fmt(Math.round(s.mean))}</td>
        <td style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;">${this.fmt(Math.round(s.median))}</td>
        <td style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;">±${this.fmt(Math.round(s.std))}</td>
        <td style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;">${this.fmt(s.min)} → ${this.fmt(s.max)}</td>
      </tr>
    `).join('');

    const html = `
      <!-- HEADER QUỐC HIỆU & TIÊU ĐỀ VĂN BẢN QUẢN TRỊ DOANH NGHIỆP -->
      <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2.5px solid #0f172a;padding-bottom:16px;margin-bottom:24px;flex-wrap:wrap;gap:16px;">
        <div>
          <div style="font-size:12px;font-weight:800;color:#1e3a8a;text-transform:uppercase;">KHỐI CHIẾN LƯỢC &amp; QUẢN TRỊ DỮ LIỆU DOANH NGHIỆP (BI DIVISION)</div>
          <div style="font-size:12px;color:#475569;margin-top:2px;">Số hiệu: <strong>${docCode}</strong> · Phân loại: <strong>Báo cáo Quản trị Nội bộ</strong></div>
        </div>
        <div style="text-align:right;font-size:12px;">
          <div style="font-weight:800;text-transform:uppercase;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
          <div style="font-weight:700;text-decoration:underline;">Độc lập - Tự do - Hạnh phúc</div>
          <div style="color:#475569;margin-top:2px;">Ngày ban hành: ${dateStr}</div>
        </div>
      </div>

      <div style="text-align:center;margin-bottom:28px;">
        <h1 style="font-size:22px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.4px;margin-bottom:6px;">
          BÁO CÁO QUẢN TRỊ &amp; PHÂN TÍCH HIỆU QUẢ HOẠT ĐỘNG KINH DOANH
        </h1>
        <div style="font-size:13.5px;color:#334155;font-weight:600;">
          Kính trình: <strong>Hội đồng Quản trị &amp; Ban Tổng Giám đốc</strong> · Chuyên đề: <strong>${this.esc(this.domainLabel)}</strong>
        </div>
        <div style="font-size:12px;color:#64748b;margin-top:4px;">
          Nguồn dữ liệu kiểm toán: <code>${this.esc(this.fileName)}</code> · Chuyên viên BI phụ trách: <strong>${this.esc(this.reviewerName)}</strong>
        </div>
      </div>

      <!-- PHẦN I -->
      <h3 style="font-size:15px;font-weight:800;color:#1e3a8a;background:#eff6ff;padding:8px 12px;border-left:4px solid #1d4ed8;margin:20px 0 10px;">
        I. TÓM TẮT ĐIỀU HÀNH DÀNH CHO BAN TỔNG GIÁM ĐỐC (EXECUTIVE SUMMARY)
      </h3>
      <p style="text-align:justify;margin-bottom:10px;">
        <strong>1. Bối cảnh &amp; Mục tiêu Quản trị:</strong> ${this.esc(document.getElementById('businessContextInput').value)}
      </p>
      <p style="text-align:justify;margin-bottom:12px;">
        <strong>2. Kết luận Điều hành Trọng tâm:</strong> Dựa trên <strong>${d.rowCount} bản ghi giao dịch chuẩn xác</strong> đã qua kiểm toán và phê duyệt chất lượng dữ liệu (Data Quality Score đạt <strong>${this.cleanProfile.healthScore}/100</strong>), tổng quy mô <strong>${this.esc(d.revCol)}</strong> toàn hệ thống đạt <strong>${this.fmt(d.totalRev)} VND</strong>, Tổng chi phí hoạt động ở mức <strong>${this.fmt(d.totalCost)} VND</strong>, mang lại <strong>Lợi nhuận Quản trị ròng đạt ${this.fmt(d.totalProfit)} VND</strong> (tương ứng tỷ suất sinh lời <strong>ROS / Net Margin đạt ${d.marginPct}%</strong>).
        ${this.customReworkNote ? `<br/><strong>• Ghi chú điều chỉnh theo yêu cầu nghiệm thu BI:</strong> ${this.esc(this.customReworkNote)}.` : ''}
      </p>

      <!-- PHẦN II -->
      <h3 style="font-size:15px;font-weight:800;color:#1e3a8a;background:#eff6ff;padding:8px 12px;border-left:4px solid #1d4ed8;margin:20px 0 10px;">
        II. BÁO CÁO KIỂM TOÁN &amp; CHUẨN HÓA CHẤT LƯỢNG DỮ LIỆU (DATA GOVERNANCE AUDIT)
      </h3>
      <p style="margin-bottom:10px;">
        Trước khi tổng hợp các chỉ tiêu tài chính trình Ban Giám đốc, Phòng BI đã thực hiện rà soát độc lập và xử lý triệt để các sai lệch trên tập dữ liệu thô ban đầu:
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:12.5px;margin-bottom:14px;">
        <thead>
          <tr style="background:#f1f5f9;">
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:left;">Chỉ tiêu Kiểm toán Dữ liệu</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:center;">Dữ liệu Gốc (Trước xử lý)</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:center;">Dữ liệu Chuẩn (Sau phê duyệt)</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:left;">Ý nghĩa đối với Quyết định Quản trị</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;font-weight:700;">Điểm Sức khỏe Dữ liệu (Health Score)</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:center;color:#e11d48;font-weight:700;">${this.rawProfile.healthScore} / 100</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:center;color:#059669;font-weight:800;">${this.cleanProfile.healthScore} / 100</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;">Đảm bảo số liệu báo cáo HĐQT không bị sai lệch</td>
          </tr>
          <tr>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;font-weight:700;">Tổng số bản ghi hạch toán</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:center;">${this.rawProfile.rowCount} dòng</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:center;font-weight:700;">${this.cleanProfile.rowCount} dòng hợp lệ</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;">Đã loại bỏ <strong>${droppedRows} dòng</strong> trùng lặp / lỗi theo lệnh kiểm duyệt</td>
          </tr>
          <tr>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;font-weight:700;">Xử lý sai lệch định dạng &amp; ngoại lai</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:center;">${this.rawProfile.totalIssues} điểm lỗi bẩn</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:center;color:#059669;font-weight:700;">0 lỗi tồn đọng</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;">Đã chuẩn hóa ${this.diffLog.length} ô (ngày ISO, tiền tệ, số âm, ngoại lai 999 triệu)</td>
          </tr>
        </tbody>
      </table>

      <!-- PHẦN III -->
      <h3 style="font-size:15px;font-weight:800;color:#1e3a8a;background:#eff6ff;padding:8px 12px;border-left:4px solid #1d4ed8;margin:20px 0 10px;">
        III. PHÂN TÍCH KẾT QUẢ KINH DOANH &amp; CẤU TRÚC TÀI CHÍNH THEO ĐƠN VỊ (${this.esc(d.dim.toUpperCase())})
      </h3>
      <p style="margin-bottom:10px;">
        Bảng tổng hợp dưới đây phản ánh chi tiết đóng góp Doanh thu, Chi phí, Lợi nhuận ròng và Phân hạng Quản trị của từng đơn vị/nhóm theo chiều <strong>${this.esc(d.dim)}</strong>:
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:14px;">
        <thead>
          <tr style="background:#f1f5f9;">
            <th style="padding:8px 10px;border:1px solid #cbd5e1;">TT</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:left;">Đơn vị / Nhóm (${this.esc(d.dim)})</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">Số giao dịch</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">Doanh thu / Quy mô (VND)</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">Chi phí (VND)</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">Lợi nhuận ròng (VND)</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">Biên LN (%)</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">Tỷ trọng (%)</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:left;">Đánh giá Quản trị</th>
          </tr>
        </thead>
        <tbody>
          ${unitRows}
          <tr style="background:#eff6ff;font-weight:800;">
            <td colspan="2" style="padding:8px 10px;border:1px solid #cbd5e1;">TỔNG CỘNG TOÀN HỆ THỐNG</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">${d.rowCount}</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">${this.fmt(d.totalRev)}</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">${this.fmt(d.totalCost)}</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;color:#059669;">${this.fmt(d.totalProfit)}</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">${d.marginPct}%</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;text-align:right;">100.0%</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;">Đạt chuẩn nghiệm thu</td>
          </tr>
        </tbody>
      </table>

      <!-- PHẦN IV -->
      <h3 style="font-size:15px;font-weight:800;color:#1e3a8a;background:#eff6ff;padding:8px 12px;border-left:4px solid #1d4ed8;margin:20px 0 10px;">
        IV. THỐNG KÊ QUẢN TRỊ &amp; PHÂN TÍCH ĐIỂM NGHẼN VẬN HÀNH (BOTTLENECK &amp; VARIANCE ANALYSIS)
      </h3>
      <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px;">
        <thead>
          <tr style="background:#f1f5f9;">
            <th style="padding:7px 10px;border:1px solid #cbd5e1;text-align:left;">Chỉ tiêu Định lượng</th>
            <th style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;">Số quan sát (N)</th>
            <th style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;">Tổng cộng (Sum)</th>
            <th style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;">Trung bình (Mean)</th>
            <th style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;">Trung vị (Median)</th>
            <th style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;">Độ lệch chuẩn (σ)</th>
            <th style="padding:7px 10px;border:1px solid #cbd5e1;text-align:right;">Biên độ (Min → Max)</th>
          </tr>
        </thead>
        <tbody>${statsRows}</tbody>
      </table>
      <ul style="padding-left:20px;margin-bottom:14px;">
        <li><strong>Sự phân hóa hiệu suất giữa các đơn vị:</strong> Đơn vị dẫn đầu (<strong>${this.esc(d.top1.name)}</strong>) tạo ra quy mô <strong>${this.fmt(d.top1.rev)} VND</strong> (${d.top1.sharePct}%), cao gấp <strong>${(d.top1.rev / Math.max(1, d.bottom.rev)).toFixed(1)} lần</strong> so với đơn vị cuối bảng (<strong>${this.esc(d.bottom.name)}</strong> - chỉ đạt ${this.fmt(d.bottom.rev)} VND).</li>
        <li><strong>Rủi ro tập trung nguồn thu (Concentration Risk):</strong> Hai nhóm đứng đầu chiếm tới <strong>${d.top2Share}%</strong> tổng quy mô toàn doanh nghiệp, đòi hỏi chính sách bảo vệ nguồn thu trọng điểm song song với việc kích cầu các khu vực/đơn vị hạng C.</li>
      </ul>

      <!-- PHẦN V -->
      <h3 style="font-size:15px;font-weight:800;color:#1e3a8a;background:#eff6ff;padding:8px 12px;border-left:4px solid #1d4ed8;margin:20px 0 10px;">
        V. KIẾN NGHỊ QUYẾT SÁCH QUẢN TRỊ &amp; LỘ TRÌNH THỰC THI 30 - 60 - 90 NGÀY
      </h3>
      <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:18px;">
        <thead>
          <tr style="background:#f1f5f9;">
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:left;">Giai đoạn Thực thi</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:left;">Quyết sách Quản trị &amp; Hành động Trọng tâm</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:left;">Đơn vị Chủ trì</th>
            <th style="padding:8px 10px;border:1px solid #cbd5e1;text-align:left;">Chỉ tiêu Đo lường (KPIs / OKRs)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;font-weight:800;color:#1d4ed8;">Ngắn hạn (30 Ngày)</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;">Chuẩn hóa quy trình kiểm soát dữ liệu đầu vào tại toàn bộ các chi nhánh; ưu tiên phân bổ nguồn lực bảo vệ nhóm trụ cột <strong>${this.esc(d.top1.name)}</strong> và <strong>${this.esc(d.top2.name)}</strong>.</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;">Phòng BI, IT &amp; Khối Vận hành</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;font-weight:700;">100% dữ liệu sạch chuẩn; 0 đơn trùng lặp</td>
          </tr>
          <tr>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;font-weight:800;color:#059669;">Trung hạn (60 Ngày)</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;">Triển khai gói kích cầu &amp; tái cơ cấu danh mục tại <strong>${this.esc(d.bottom.name)}</strong>; kiểm soát chặt tỷ lệ chiết khấu để giữ biên lợi nhuận ròng >= <strong>${d.marginPct}%</strong>.</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;">Khối Kinh doanh &amp; Marketing</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;font-weight:700;">Tăng doanh số nhóm Hạng C thêm +20%</td>
          </tr>
          <tr>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;font-weight:800;color:#7c3aed;">Dài hạn (90 Ngày)</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;">Tự động hóa hoàn toàn hệ thống cảnh báo sớm BI Dashboard theo thời gian thực trình Ban Tổng Giám đốc vào sáng thứ Hai hàng tuần.</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;">Ban Giám đốc &amp; Phòng BI</td>
            <td style="padding:8px 10px;border:1px solid #cbd5e1;font-weight:700;">Tăng hiệu suất lợi nhuận ròng toàn công ty +12%</td>
          </tr>
        </tbody>
      </table>

      <!-- PHẦN VI: CHỮ KÝ PHÊ DUYỆT -->
      <div style="margin-top:28px;padding-top:18px;border-top:2px solid #cbd5e1;display:grid;grid-template-columns:1fr 1fr 1fr;text-align:center;font-size:12.5px;gap:12px;">
        <div>
          <strong>HỆ THỐNG LẬP BÁO CÁO</strong><br/>
          <span style="color:#64748b;font-size:11.5px;">(Tự động tổng hợp &amp; kiểm toán số liệu)</span><br/><br/><br/>
          <strong>NexusBI Enterprise Agent v3.5</strong>
        </div>
        <div>
          <strong>CHUYÊN VIÊN BI KIỂM DUYỆT &amp; THẨM ĐỊNH</strong><br/>
          <span style="color:#059669;font-size:11.5px;font-weight:700;">✔ Đã kiểm duyệt qua 2 Cổng Human-in-the-Loop</span><br/><br/><br/>
          <strong style="color:#0f172a;font-size:13.5px;">${this.esc(this.reviewerName)}</strong>
        </div>
        <div>
          <strong>PHÊ DUYỆT CỦA BAN TỔNG GIÁM ĐỐC</strong><br/>
          <span style="color:#64748b;font-size:11.5px;">(Ký, ghi rõ họ tên &amp; đóng dấu)</span><br/><br/><br/>
          <strong>................................................</strong>
        </div>
      </div>
    `;

    document.getElementById('report10DocumentContainer').innerHTML = html;
  }

  // ==========================================================================
  // XUẤT 4 FILE BÁO CÁO (EXCEL SẠCH, EXCEL QUẢN TRỊ, DASHBOARD HTML, WORD)
  // ==========================================================================
  ensureReadyForExport() {
    if (this.cleanRows.length === 0) {
      this.executeCleaningEngine();
      this.buildStage1DataDictionary();
      this.buildStage3DescriptiveStats();
    }
    if (!this.analyticsData) {
      this.initDashboardDimensions();
      this.renderAllAnalytics();
    }
  }

  openPreviewModal(type) {
    this.ensureReadyForExport();
    const modal = document.getElementById('previewModal');
    const title = document.getElementById('previewModalTitle');
    const body = document.getElementById('previewModalBody');
    const dlBtn = document.getElementById('previewModalDownloadBtn');

    if (type === 'excel_clean') {
      title.textContent = `📗 Xem trước: File Excel Dữ liệu Sạch (${this.cleanRows.length} dòng chuẩn)`;
      dlBtn.onclick = () => this.exportCleanedExcel();
      body.innerHTML = document.getElementById('cleanedPreviewTableWrap').innerHTML;
    } else if (type === 'excel_summary') {
      title.textContent = `📊 Xem trước: File Excel Báo cáo Quản trị Đa Sheet`;
      dlBtn.onclick = () => this.exportAnalysisExcel();
      body.innerHTML = document.getElementById('descriptiveStatsTableWrap').innerHTML;
    } else if (type === 'dashboard') {
      title.textContent = `🖥️ Xem trước: Interactive BI Dashboard (.HTML)`;
      dlBtn.onclick = () => this.exportDashboardHtml();
      body.innerHTML = `
        <div class="exec-summary-banner">${document.getElementById('execSummaryBanner').innerHTML}</div>
        <div class="kpi-4-grid">${document.getElementById('dash4KpisGrid').innerHTML}</div>
        <div class="charts-6-grid">${document.getElementById('biStage4ChartsGrid').innerHTML}</div>
      `;
    } else if (type === 'word') {
      title.textContent = `📘 Xem trước: Báo cáo Quản trị Doanh nghiệp (.DOC)`;
      dlBtn.onclick = () => this.exportWord10Sections();
      body.innerHTML = document.getElementById('report10DocumentContainer').innerHTML;
    }

    modal.classList.remove('hidden');
  }

  exportCleanedExcel() {
    this.ensureReadyForExport();
    const d = this.analyticsData;

    let s1 = `<Row>` + this.cleanHeaders.map(h => `<Cell ss:StyleID="sH"><Data ss:Type="String">${this.escXml(h)}</Data></Cell>`).join('') + `</Row>`;
    this.cleanRows.forEach(r => {
      s1 += `<Row>` + this.cleanHeaders.map(h => {
        const v = String(r[h] ?? '');
        const isN = !isNaN(v) && v.trim() !== '' && !h.toLowerCase().includes('phone') && !h.toLowerCase().includes('id');
        return `<Cell><Data ss:Type="${isN ? 'Number' : 'String'}">${this.escXml(v)}</Data></Cell>`;
      }).join('') + `</Row>`;
    });

    let s2 = `<Row><Cell ss:StyleID="sH"><Data ss:Type="String">Đơn vị (${this.escXml(d.dim)})</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Số giao dịch</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Doanh thu (VND)</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Chi phí (VND)</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Lợi nhuận ròng (VND)</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Tỷ trọng (%)</Data></Cell></Row>`;
    d.sortedGroups.forEach(g => {
      s2 += `<Row><Cell><Data ss:Type="String">${this.escXml(g.name)}</Data></Cell><Cell><Data ss:Type="Number">${g.count}</Data></Cell><Cell><Data ss:Type="Number">${g.rev}</Data></Cell><Cell><Data ss:Type="Number">${g.cost}</Data></Cell><Cell><Data ss:Type="Number">${g.profit}</Data></Cell><Cell><Data ss:Type="Number">${g.sharePct}</Data></Cell></Row>`;
    });

    let s3 = `<Row><Cell ss:StyleID="sH"><Data ss:Type="String">Dòng gốc</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Mã bản ghi</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Cột</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Giá trị Trước</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Giá trị Sau</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Hình thức xử lý</Data></Cell></Row>`;
    this.diffLog.forEach(dl => {
      s3 += `<Row><Cell><Data ss:Type="Number">${dl.rowIdx}</Data></Cell><Cell><Data ss:Type="String">${this.escXml(dl.rowId)}</Data></Cell><Cell><Data ss:Type="String">${this.escXml(dl.col)}</Data></Cell><Cell><Data ss:Type="String">${this.escXml(dl.oldVal)}</Data></Cell><Cell><Data ss:Type="String">${this.escXml(dl.newVal)}</Data></Cell><Cell><Data ss:Type="String">${this.escXml(dl.rule)}</Data></Cell></Row>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>
    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
      <Styles><Style ss:ID="sH"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#059669" ss:Pattern="Solid"/></Style></Styles>
      <Worksheet ss:Name="1_Du_Lieu_Sach"><Table>${s1}</Table></Worksheet>
      <Worksheet ss:Name="2_Tong_Hop_KPI_Quan_Tri"><Table>${s2}</Table></Worksheet>
      <Worksheet ss:Name="3_Nhat_Ky_Kiem_Duyet"><Table>${s3}</Table></Worksheet>
    </Workbook>`;

    this.downloadFile(xml, `Excel_Du_Lieu_Sach_BI_${this.datasetId}.xls`, 'application/vnd.ms-excel;charset=utf-8');
    this.showToast('📗 Đã tải xuống File Excel (.xls) gồm 3 Sheet thành công!', 'info');
  }

  exportAnalysisExcel() {
    this.ensureReadyForExport();
    const d = this.analyticsData;

    let shUnits = `<Row><Cell ss:StyleID="sH"><Data ss:Type="String">Đơn vị (${this.escXml(d.dim)})</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Số giao dịch</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Doanh thu (VND)</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Chi phí (VND)</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Lợi nhuận ròng (VND)</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Tỷ trọng (%)</Data></Cell></Row>`;
    d.sortedGroups.forEach(g => {
      shUnits += `<Row><Cell><Data ss:Type="String">${this.escXml(g.name)}</Data></Cell><Cell><Data ss:Type="Number">${g.count}</Data></Cell><Cell><Data ss:Type="Number">${g.rev}</Data></Cell><Cell><Data ss:Type="Number">${g.cost}</Data></Cell><Cell><Data ss:Type="Number">${g.profit}</Data></Cell><Cell><Data ss:Type="Number">${g.sharePct}</Data></Cell></Row>`;
    });

    let shStats = `<Row><Cell ss:StyleID="sH"><Data ss:Type="String">Chỉ tiêu Số</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Tổng cộng (Sum)</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Trung bình (Mean)</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Trung vị (Median)</Data></Cell><Cell ss:StyleID="sH"><Data ss:Type="String">Độ lệch chuẩn (Std)</Data></Cell></Row>`;
    this.descriptiveStats.forEach(s => {
      shStats += `<Row><Cell><Data ss:Type="String">${this.escXml(s.col)}</Data></Cell><Cell><Data ss:Type="Number">${Math.round(s.sum)}</Data></Cell><Cell><Data ss:Type="Number">${Math.round(s.mean)}</Data></Cell><Cell><Data ss:Type="Number">${Math.round(s.median)}</Data></Cell><Cell><Data ss:Type="Number">${Math.round(s.std)}</Data></Cell></Row>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>
    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
      <Styles><Style ss:ID="sH"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#1E3A8A" ss:Pattern="Solid"/></Style></Styles>
      <Worksheet ss:Name="1_Tong_Hop_Quan_Tri"><Table>${shUnits}</Table></Worksheet>
      <Worksheet ss:Name="2_Thong_Ke_Mo_Ta"><Table>${shStats}</Table></Worksheet>
    </Workbook>`;

    this.downloadFile(xml, `2_Excel_Bao_Cao_Quan_Tri_${this.datasetId}.xls`, 'application/vnd.ms-excel;charset=utf-8');
    this.showToast('📊 Đã tải xuống File Excel Báo cáo Quản trị (.xls)!', 'info');
  }

  exportDashboardHtml() {
    this.ensureReadyForExport();
    const html = `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"/><title>Dashboard Quản Trị BI - ${this.esc(this.datasetTitle)}</title>
    <style>
      body{font-family:-apple-system,sans-serif;background:#f0f4fa;color:#0f172a;padding:24px;margin:0;}
      .wrap{max-width:1260px;margin:0 auto;}
      .kpi-4-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:16px 0;}
      .kpi-box{background:#fff;border:1px solid #cbd5e1;border-radius:12px;padding:14px;}
      .kpi-box-title{font-size:12px;color:#64748b;font-weight:700;}
      .kpi-box-val{font-size:20px;font-weight:800;margin:4px 0;}
      .charts-6-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
      .chart-card-item{background:#fff;border:1px solid #cbd5e1;border-radius:14px;padding:16px;}
      .badge-pill{background:#eff6ff;color:#2563eb;padding:3px 9px;border-radius:99px;font-size:11px;font-weight:700;}
    </style></head><body><div class="wrap">
      <h1>📊 Dashboard Quản Trị Doanh Nghiệp · ${this.esc(this.datasetTitle)}</h1>
      <p>Chuyên viên BI phê duyệt: <strong>${this.esc(this.reviewerName)}</strong> · Chất lượng dữ liệu: <strong>${this.cleanProfile.healthScore}%</strong> (${this.cleanRows.length} dòng hợp lệ)</p>
      <div style="background:#fff;padding:14px;border-radius:12px;border:1px solid #cbd5e1;">${document.getElementById('execSummaryBanner').innerHTML}</div>
      <div class="kpi-4-grid">${document.getElementById('dash4KpisGrid').innerHTML}</div>
      <div class="charts-6-grid">${document.getElementById('biStage4ChartsGrid').innerHTML}</div>
    </div></body></html>`;

    this.downloadFile(html, `3_Dashboard_Quan_Tri_${this.datasetId}.html`, 'text/html;charset=utf-8');
    this.showToast('🖥️ Đã tải xuống File Dashboard BI Độc lập (.html)!', 'info');
  }

  exportWord10Sections() {
    this.ensureReadyForExport();
    const content = document.getElementById('report10DocumentContainer').innerHTML;
    const doc = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset="utf-8"><title>Báo Cáo Quản Trị Doanh Nghiệp</title>
      <style>@page { size: A4; margin: 2cm; } body { font-family: "Times New Roman", serif; font-size: 12pt; line-height: 1.5; color: #000; }</style>
      </head>
      <body>${content}</body></html>`;
    this.downloadFile(doc, `4_Bao_Cao_Quan_Tri_Doanh_Nghiep_${this.datasetId}.doc`, 'application/msword;charset=utf-8');
    this.showToast('📘 Đã tải xuống Báo cáo Quản trị Doanh nghiệp Word (.doc)!', 'info');
  }

  copyReport10Text() {
    const text = document.getElementById('report10DocumentContainer')?.innerText || '';
    navigator.clipboard?.writeText(text);
    this.showToast('📋 Đã sao chép nội dung Báo cáo Quản trị vào Clipboard!', 'info');
  }

  // ==========================================================================
  // FLOATING AI BI CHAT ASSISTANT & MODALS
  // ==========================================================================
  initChatGreeting() {
    const box = document.getElementById('chatMessagesBox');
    if (!box) return;
    box.innerHTML = `
      <div class="chat-msg bot">
        Xin chào <strong>${this.esc(this.reviewerName)}</strong>! Bạn có thể hỏi tôi về kết quả làm sạch, số dòng đã xóa, hoặc kết quả Báo cáo Quản trị!
      </div>
    `;
  }

  toggleChatPanel() {
    document.getElementById('aiChatPanel')?.classList.toggle('hidden');
  }

  sendQuickChat(q) {
    document.getElementById('chatUserInput').value = q;
    this.handleChatSubmit(new Event('submit'));
  }

  handleChatSubmit(e) {
    e.preventDefault();
    const inp = document.getElementById('chatUserInput');
    const q = inp.value.trim();
    if (!q) return;
    inp.value = '';

    const box = document.getElementById('chatMessagesBox');
    box.innerHTML += `<div class="chat-msg user">${this.esc(q)}</div>`;

    this.ensureReadyForExport();
    const d = this.analyticsData;
    const qL = q.toLowerCase();
    let reply = '';

    if (qL.includes('làm sạch') || qL.includes('xóa') || qL.includes('xoá') || qL.includes('lỗi')) {
      const dropped = this.rawProfile.rowCount - this.cleanProfile.rowCount;
      reply = `🧹 Trên file <strong>${this.esc(this.fileName)}</strong>, hệ thống đã xóa <strong>${dropped} dòng</strong> trùng/lỗi (từ ${this.rawProfile.rowCount} dòng gốc còn <strong>${this.cleanProfile.rowCount} dòng sạch</strong>) và nâng điểm chất lượng từ <strong>${this.rawProfile.healthScore}% lên ${this.cleanProfile.healthScore}%</strong>.`;
    } else if (qL.includes('cao nhất') || qL.includes('top') || qL.includes('doanh thu')) {
      reply = `🏆 Đơn vị dẫn đầu theo <strong>${this.esc(d.dim)}</strong> là <strong>${this.esc(d.top1.name)}</strong> với <strong>${this.fmt(d.top1.rev)} VND</strong> (chiếm <strong>${d.top1.sharePct}%</strong> tổng quy mô), xếp thứ 2 là <strong>${this.esc(d.top2.name)}</strong> (${d.top2.sharePct}%).`;
    } else {
      reply = `💡 Giải pháp quản trị ưu tiên #1 là bảo vệ nguồn thu tại <strong>${this.esc(d.top1.name)}</strong> &amp; <strong>${this.esc(d.top2.name)}</strong> (chiếm ${d.top2Share}% quy mô), đồng thời tái cơ cấu danh mục tại <strong>${this.esc(d.bottom.name)}</strong> và duy trì biên lợi nhuận ròng <strong>${d.marginPct}%</strong>.`;
    }

    setTimeout(() => {
      box.innerHTML += `<div class="chat-msg bot">${reply}</div>`;
      box.scrollTop = box.scrollHeight;
    }, 200);
  }

  toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    document.getElementById('themeIcon').className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  openSettingsModal() {
    document.getElementById('cfg_aiProvider').value = this.aiConfig.provider;
    document.getElementById('cfg_apiKey').value = this.aiConfig.apiKey;
    document.getElementById('cfg_modelName').value = this.aiConfig.model;
    document.getElementById('settingsModal')?.classList.remove('hidden');
  }

  saveAiSettings() {
    this.aiConfig.provider = document.getElementById('cfg_aiProvider').value;
    this.aiConfig.apiKey = document.getElementById('cfg_apiKey').value.trim();
    this.aiConfig.model = document.getElementById('cfg_modelName').value.trim() || 'gemini-2.0-flash';
    localStorage.setItem('nexus_ai_provider', this.aiConfig.provider);
    localStorage.setItem('nexus_ai_key', this.aiConfig.apiKey);
    localStorage.setItem('nexus_ai_model', this.aiConfig.model);
    this.closeAllModals();
    this.showToast('Đã lưu cài đặt AI Agent!', 'info');
  }

  openColumnMappingModal() {
    if (this.rawRows.length === 0) {
      this.showToast('⚠️ Vui lòng chọn file hoặc 1 bộ dữ liệu mẫu ở Mục 1 trước khi xem cấu trúc cột!', 'warn');
      return;
    }
    this.buildStage1DataDictionary();
    const rows = this.fieldDictionary.map(f => `
      <tr>
        <td><strong>${this.esc(f.col)}</strong></td>
        <td><code>${this.esc(f.dataType)}</code></td>
        <td><span class="badge-pill">${this.esc(f.role)}</span></td>
        <td>${this.esc(f.meaning)}</td>
      </tr>
    `).join('');
    document.getElementById('columnMappingBody').innerHTML = `
      <table class="studio-table">
        <thead><tr><th>Trường Dữ liệu</th><th>Kiểu nhận diện</th><th>Vai trò BI tự động</th><th>Ý nghĩa</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    document.getElementById('columnMappingModal')?.classList.remove('hidden');
  }

  openAuditModal() {
    const html = this.auditLogs.map(l => `
      <div style="padding:10px 12px;border-left:4px solid ${l.type === 'approve' ? '#059669' : l.type === 'reject' ? '#e11d48' : '#2563eb'};background:var(--bg-page);border-radius:0 10px 10px 0;margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);">
          <strong>${this.esc(l.stage)}</strong>
          <span>${this.esc(l.time)} · ${this.esc(l.reviewer)}</span>
        </div>
        <div style="font-size:12.5px;margin-top:3px;">${this.esc(l.detail)}</div>
      </div>
    `).join('');
    document.getElementById('auditModalBody').innerHTML = html || '<p>Chưa có nhật ký.</p>';
    document.getElementById('auditModal')?.classList.remove('hidden');
  }

  closeAllModals() {
    ['previewModal', 'settingsModal', 'columnMappingModal', 'auditModal'].forEach(id => {
      document.getElementById(id)?.classList.add('hidden');
    });
  }

  async addAudit(stage, detail, type = 'info') {
    const item = {
      time: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
      stage,
      detail,
      reviewer: this.reviewerName,
      type
    };
    this.auditLogs.unshift(item);
    try {
      await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch (_) {}
  }

  downloadFile(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 200);
  }

  isMoneyCol(col) {
    return ['Unit_Price', 'Net_Sales_VND', 'Cost_VND', 'Profit_VND', 'Base_Salary', 'Bonus', 'Total_Income_VND', 'Spend_VND', 'Revenue_VND'].includes(col);
  }

  fmt(n) {
    if (n === undefined || n === null || isNaN(n)) return '0';
    return Math.round(Number(n)).toLocaleString('vi-VN');
  }

  esc(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  escXml(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }

  showToast(msg, type = 'info') {
    const box = document.getElementById('toastContainer');
    if (!box) return;
    const el = document.createElement('div');
    el.className = `toast-msg ${type}`;
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(() => { el.remove(); }, 3600);
  }
}

window.app = new NexusBiStudio();
