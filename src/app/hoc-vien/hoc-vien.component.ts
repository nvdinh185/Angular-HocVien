import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hoc-vien',
  templateUrl: './hoc-vien.component.html',
  styleUrls: ['./hoc-vien.component.css']
})
export class HocVienComponent implements OnInit {
  isShow = true;
  isShowAdd = false;
  isShowDel = false;
  isShowEdit = false;
  filterStatus = "tat_ca";
  newName = [];
  newGender = [];
  arHocVien = [
    { id: 1, tenHV: "Dinh", gioiTinh: true },
    { id: 5, tenHV: "Hoa", gioiTinh: true },
    { id: 3, tenHV: "Hao", gioiTinh: false },
    { id: 2, tenHV: "Uyen", gioiTinh: false },
    { id: 4, tenHV: "Quyen", gioiTinh: true },
  ];

  constructor() {}

  ngOnInit() {
    //sắp xếp lại danh sách theo thứ tự giảm dần của id
    this.arHocVien.sort((a, b) => {
      return b.id - a.id;
    });
  }

  /**
   * Thêm học viên vào danh sách
   * @param HocVienForm 
   */
  addHV(HocVienForm) {
    var id = this.arHocVien.length + 1;
    var strGioiTinh = HocVienForm.value.gioiTinh.toUpperCase();
    if (strGioiTinh != "nam".toUpperCase() && strGioiTinh != "nu".toUpperCase()) {
      alert("Gioi tinh nhap sai!");
    } else {
      var tenHV = HocVienForm.value.tenHV;
      var gioiTinh = (strGioiTinh == "nam".toUpperCase());
      var hocVien = { id, tenHV, gioiTinh }
      this.arHocVien.unshift(hocVien);
      alert("Da them thanh cong!");
      this.isShowAdd = !this.isShowAdd;
      this.isShow = !this.isShow;
    }
  }

  /**
   * Xóa học viên theo id
   * @param id 
   */
  deleteHV(id) {
    const index = this.arHocVien.findIndex(e => e.id == id);
    this.arHocVien.splice(index, 1);
    alert("Da xoa thanh cong!");
  }

  /**
   * Xác định trạng thái hiển thị theo giới tính
   * @param gioitinh 
   */
  getShowStatus(gioitinh) {
    var txtTatCa = this.filterStatus == 'tat_ca';
    var txtNam = this.filterStatus == 'nam' && gioitinh;
    var txtNu = this.filterStatus == 'nu' && !gioitinh;
    return txtTatCa || txtNam || txtNu;
  }

  /**
   * Sửa học viên theo id
   * @param id 
   */
  editHV(id) {
    //tìm id của phần tử muốn sửa
    const index = this.arHocVien.findIndex(e => e.id == id);
    //Nếu đã nhập thông tin cần sửa thì thực hiện sửa trong danh sách
    //Nếu chưa nhập thì lấy lại thông tin cũ
    this.arHocVien[index].gioiTinh = typeof (this.newGender[id]) != "undefined" ?
      (this.newGender[id] == "nam" || this.newGender[id] == "Nam") : this.arHocVien[index].gioiTinh;
    this.arHocVien[index].tenHV = typeof (this.newName[id]) != "undefined" ?
      this.newName[id] : this.arHocVien[index].tenHV;
    this.newName = []; this.newGender = [];
    alert("Da sua thanh cong!");
  }
}