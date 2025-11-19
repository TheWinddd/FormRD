# Bảng Mapping Cột Google Sheets

## Tổng quan

Tài liệu này mô tả cấu trúc chi tiết các cột trong Google Sheets và cách mapping từ form React.

## Cấu trúc Cột (A-BU)

### PHẦN A: Thông tin định danh (Cột A-J)

| Cột | Tên trường | Form field | Ghi chú |
|-----|-----------|-----------|---------|
| A | Timestamp | Auto-generated | Thời gian submit form |
| B | Họ và tên | step1.fullName | |
| C | Đơn vị | step1.department | |
| D | Phòng ban | step1.unit | |
| E | Vị trí công tác | step1.position | |
| F | Số năm kinh nghiệm R&D | step1.yearsExperience | |
| G | Bậc học | step1.degree | Tiến sĩ/Thạc sĩ/Đại học |
| H | Chuyên ngành | step1.major | |
| I | Từ khóa chuyên sâu | step1.keywords | Array join bằng ", " |
| J | Các dự án R&D nổi bật | step1.notableProjects | |

### PHẦN B: Năng lực hiện tại

#### B1. Năng lực NỀN TẢNG (Cột K-T) - 10 năng lực

| Cột | Mã | Tên năng lực | Form field |
|-----|-----|-------------|-----------|
| K | 1.1.1 | Phương pháp luận nghiên cứu khoa học | step2.methodology1 |
| L | 1.1.2 | Xây dựng đề cương nghiên cứu khoa học | step2.methodology2 |
| M | 1.1.3 | Phương pháp phân tích số liệu khoa học | step2.methodology3 |
| N | 1.1.4 | Công bố khoa học và sở hữu trí tuệ | step2.methodology4 |
| O | 1.2.1 | Năng lực Sáng tạo & Phát triển Ý tưởng | step2.creativity1 |
| P | 1.2.2 | Năng lực Hoạch định Chiến lược R&D | step2.creativity2 |
| Q | 1.2.3 | Quản lý và triển khai dự án nghiên cứu | step2.creativity3 |
| R | 1.2.4 | Năng lực Quản lý Danh mục Dự án | step2.creativity4 |
| S | 1.3.1 | Hệ thống hóa thông tin khoa học | step2.tools1 |
| T | 1.3.2 | Áp dụng AI trong nghiên cứu & chuyển đổi số | step2.tools2 |

**Format**: `0: Chưa có`, `1: Cơ bản`, `2: Áp dụng`, `3: Thành thạo`, `4: Chuyên gia`

#### B2. Năng lực CHUYÊN MÔN (Cột U-AM) - 18 năng lực

| Cột | Mã | Tên năng lực | Form field |
|-----|-----|-------------|-----------|
| U | 2.1.1 | Năng lực Phân tích Thị trường & Xu hướng sản phẩm | step3.market1 |
| V | 2.2.1 | Năng lực Nghiên cứu Y học Cổ truyền | step3.source1 |
| W | 2.2.2 | Tạo vùng trồng tiêu chuẩn GACP | step3.source2 |
| X | 2.2.3 | Tiêu chuẩn hóa và đảm bảo chất lượng dược liệu | step3.source3 |
| Y | 2.2.4 | Tối ưu hóa chiết xuất tạo cao định chuẩn | step3.source4 |
| Z | 2.2.5 | Năng lực Công nghệ Sinh học Dược liệu | step3.source5 |
| AA | 2.3.1 | Xây dựng công thức sản phẩm | step3.formula1 |
| AB | 2.3.2 | R&D sản phẩm mới | step3.formula2 |
| AC | 2.3.3 | Năng lực Công nghệ Bào chế Nâng cao | step3.formula3 |
| AD | 2.4.1 | Nghiên cứu tin sinh học - in silico | step3.preclinical1 |
| AE | 2.4.2 | Đánh giá tác dụng sinh học (in vitro, in vivo) | step3.preclinical2 |
| AF | 2.5.1 | Năng lực Thiết kế & Quản lý Thử nghiệm Lâm sàng | step3.clinical1 |
| AG | 2.5.2 | Kiến thức về BA/BE | step3.clinical2 |
| AH | 2.6.1 | Năng lực Pháp chế & Đăng ký | step3.regulatory1 |
| AI | 2.6.2 | Năng lực Pháp chế Quốc tế | step3.regulatory2 |
| AJ | 2.7.1 | Năng lực Chuyển giao Công nghệ | step3.transfer1 |
| AK | 2.7.2 | Vận hành máy móc thiết bị sản xuất | step3.transfer2 |
| AL | 2.8.1 | Năng lực Cảnh giác Dược/Mỹ phẩm | step3.postmarket1 |
| AM | 2.8.2 | Năng lực Hỗ trợ Kỹ thuật & Y khoa | step3.postmarket2 |

**Format**: Giống Phần B1

### PHẦN C: Nhu cầu đào tạo

#### C1. Nhu cầu đào tạo NỀN TẢNG (Cột AN-AW) - 10 câu hỏi

| Cột | Index | Tên năng lực | Form field |
|-----|-------|-------------|-----------|
| AN | 0 | Phương pháp luận NCKH | step4.foundationPriorities[0] |
| AO | 1 | Xây dựng đề cương NCKH | step4.foundationPriorities[1] |
| AP | 2 | Phương pháp phân tích số liệu | step4.foundationPriorities[2] |
| AQ | 3 | Công bố khoa học và sở hữu trí tuệ | step4.foundationPriorities[3] |
| AR | 4 | Năng lực Sáng tạo & Phát triển Ý tưởng | step4.foundationPriorities[4] |
| AS | 5 | Hoạch định Chiến lược R&D | step4.foundationPriorities[5] |
| AT | 6 | Quản lý Danh mục Dự án | step4.foundationPriorities[6] |
| AU | 7 | Quản lý và triển khai dự án | step4.foundationPriorities[7] |
| AV | 8 | Hệ thống hóa thông tin khoa học | step4.foundationPriorities[8] |
| AW | 9 | Áp dụng AI trong nghiên cứu | step4.foundationPriorities[9] |

**Format**:
- `0: Không phù hợp với chuyên môn của tôi`
- `1: Sẽ học nếu có thời gian (chưa phải là ưu tiên trong năm tới)`
- `2: Muốn được học ngay (Ưu tiên cao trong năm tới)`

#### C2. Năng lực NỀN TẢNG khác (Cột AX)

| Cột | Tên | Form field |
|-----|-----|-----------|
| AX | Năng lực NỀN TẢNG khác | step4.otherFoundation |

#### C3. Nhu cầu đào tạo CHUYÊN MÔN (Cột AY-BR) - 20 câu hỏi

| Cột | Index | Tên năng lực | Form field |
|-----|-------|-------------|-----------|
| AY | 0 | Phân tích Thị trường & Xu hướng | step4.professionalPriorities[0] |
| AZ | 1 | Nghiên cứu Y học Cổ truyền | step4.professionalPriorities[1] |
| BA | 2 | Tạo vùng trồng GACP | step4.professionalPriorities[2] |
| BB | 3 | Tiêu chuẩn hóa dược liệu | step4.professionalPriorities[3] |
| BC | 4 | Tối ưu chiết xuất | step4.professionalPriorities[4] |
| BD | 5 | Công nghệ Sinh học Dược liệu | step4.professionalPriorities[5] |
| BE | 6 | Xây dựng công thức sản phẩm | step4.professionalPriorities[6] |
| BF | 7 | R&D sản phẩm mới | step4.professionalPriorities[7] |
| BG | 8 | Công nghệ Bào chế Nâng cao | step4.professionalPriorities[8] |
| BH | 9 | Nghiên cứu tin sinh học | step4.professionalPriorities[9] |
| BI | 10 | Đánh giá tác dụng sinh học | step4.professionalPriorities[10] |
| BJ | 11 | Thiết kế & Quản lý Lâm sàng | step4.professionalPriorities[11] |
| BK | 12 | Sinh khả dụng & BA/BE | step4.professionalPriorities[12] |
| BL | 13 | Pháp chế & Đăng ký | step4.professionalPriorities[13] |
| BM | 14 | Pháp chế Quốc tế | step4.professionalPriorities[14] |
| BN | 15 | Công nghệ & dây chuyền sản xuất | step4.professionalPriorities[15] |
| BO | 16 | Vận hành máy móc | step4.professionalPriorities[16] |
| BP | 17 | Chuyển giao Công nghệ | step4.professionalPriorities[17] |
| BQ | 18 | Cảnh giác Dược/Mỹ phẩm | step4.professionalPriorities[18] |
| BR | 19 | Hỗ trợ Kỹ thuật & Y khoa | step4.professionalPriorities[19] |

**Format**: Giống C1

#### C4. Năng lực CHUYÊN MÔN khác (Cột BS)

| Cột | Tên | Form field |
|-----|-----|-----------|
| BS | Năng lực CHUYÊN MÔN khác | step4.otherProfessional |

#### C5-C6. Khó khăn và Đề xuất (Cột BT-BU)

| Cột | Tên | Form field |
|-----|-----|-----------|
| BT | Khó khăn hiện tại trong R&D | step4.challenges |
| BU | Đề xuất chương trình đào tạo | step4.suggestions |

## Mapping Functions

### Format Competency Level
```typescript
const formatCompetencyLevel = (level: number): string => {
  0: '0: Chưa có kiến thức/Kỹ năng',
  1: '1: Cơ bản',
  2: '2: Áp dụng',
  3: '3: Thành thạo',
  4: '4: Chuyên gia'
}
```

### Format Training Priority
```typescript
const formatTrainingPriority = (priority: string): string => {
  'not-relevant': '0: Không phù hợp...',
  'not-priority': '1: Sẽ học nếu có thời gian...',
  'high-priority': '2: Muốn được học ngay...'
}
```

## Tổng số cột: 73 cột (A-BU)

- **A-J**: Thông tin cá nhân (10 cột)
- **K-T**: Năng lực Nền tảng (10 cột)
- **U-AM**: Năng lực Chuyên môn (18 cột)
- **AN-AW**: Nhu cầu đào tạo Nền tảng (10 cột)
- **AX**: Nền tảng khác (1 cột)
- **AY-BR**: Nhu cầu đào tạo Chuyên môn (20 cột)
- **BS**: Chuyên môn khác (1 cột)
- **BT-BU**: Khó khăn & Đề xuất (2 cột)

## Lưu ý quan trọng

1. **Index trong Form**: Bắt đầu từ 0
2. **Cột trong Google Sheets**: Bắt đầu từ 1 (A=1, B=2,...)
3. **Array trong Code**: row[columnIndex - 1]
4. **START_COL_PART_C**: Cột 40 (AN) - nếu thay đổi cấu trúc, cần update biến này trong AppScript

