

// const DefaultIP = 'http://localhost:3000/';
// const DefaultIP = 'http://20.0.15.156:3000/';
const DefaultIP = 'http://192.168.24.239:3000/';
//const DefaultIP = 'http://10.20.15.43:3000/';
// const DefaultIP = 'http://20.0.31.139:3000/';
// const DefaultIP = 'http://172.17.0.1:3000/';
// const DefaultIP = 'http://172.16.0.76:3000/';
// const DefaultIP = 'http://172.16.3.20:3000/';
var DefaultAccount;
function setDefaultAccount(text){
    DefaultAccount = text;
}

var DefaultMaQuanAn;
function setDefaultMaQuanAn(text){
    DefaultMaQuanAn = text;
}

var defaultDanhSachMonAn = {};
function setdefaultDanhSachMonAn(text){
    defaultDanhSachMonAn = text;
}

var DefaultMaMonAn;
function setDefaultMaMonAn(text){
    MaMonAn = text;
}

var defaultMaLoaiMonAnDuocChon;
function setDefaultMaLoaiMonAnDuocChon(text){
    defaultMaLoaiMonAnDuocChon = text
}

var defaultTenLoaiMonAnDuocChon = "Chọn Loại Món Ăn";
function setDefaultTenLoaiMonAnDuocChon(text){
    defaultTenLoaiMonAnDuocChon = text
}
var defaultSoLuongBan;
function setDefautlSoLuongBan(text){
    defaultSoLuongBan = text
}
var defaultQrMaQuan;
var defaultQrMaBan;
function setDefaultQr(text1,text2){
    defaultQrMaQuan = text1,
    defaultQrMaBan = text2
}

export{
    setDefaultQr,
    defaultQrMaQuan,
    defaultQrMaBan,
    DefaultAccount,
    DefaultIP,
    setDefaultAccount,
    DefaultMaQuanAn,
    setDefaultMaQuanAn,
    defaultDanhSachMonAn,
    setdefaultDanhSachMonAn,
    DefaultMaMonAn,
    setDefaultMaMonAn,
    defaultMaLoaiMonAnDuocChon,
    setDefaultMaLoaiMonAnDuocChon,
    defaultTenLoaiMonAnDuocChon,
    setDefaultTenLoaiMonAnDuocChon,
    defaultSoLuongBan,
    setDefautlSoLuongBan,
};
