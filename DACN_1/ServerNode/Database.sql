CREATE DATABASE IF NOT EXISTS QuanLyQuanAn  CHARACTER SET utf8 COLLATE utf8_general_ci;


use QuanLyQuanAn;
create table AlbumAnh(
    MaAlbum int AUTO_INCREMENT,
    LoaiAlbum nvarchar(50),
    primary key (MaAlbum)
);
insert into AlbumAnh(LoaiAlbum) values("quanan");
insert into AlbumAnh(LoaiAlbum) values("quanan");
insert into AlbumAnh(LoaiAlbum) values("monan");
insert into AlbumAnh(LoaiAlbum) values("monan");
insert into AlbumAnh(LoaiAlbum) values("binhluan");
insert into AlbumAnh(LoaiAlbum) values("binhluan");


create table DanhGia(
MaDanhGia int AUTO_INCREMENT,
LoaiDanhGia char(12),
TenTaiKhoan char(12),
NoiDungBinhLuan nvarchar(1000),
MaAlbum int,
primary key(MaDanhGia)
);
insert into DanhGia(LoaiDanhGia,TenTaiKhoan,NoiDungBinhLuan,MaAlbum)  values("quanan","1","ngon",4);
insert into DanhGia(LoaiDanhGia,TenTaiKhoan,NoiDungBinhLuan,MaAlbum)  values("quanan","1","ngon",5);
insert into DanhGia(LoaiDanhGia,TenTaiKhoan,NoiDungBinhLuan,MaAlbum)  values("quanan","1","ngon",6);
insert into DanhGia(LoaiDanhGia,TenTaiKhoan,NoiDungBinhLuan,MaAlbum)  values("quanan","1","ngon",7);




create table HinhAnh(
    MaHinhAnh int AUTO_INCREMENT,
    MaAlbum int ,
    LinkHinhAnh nvarchar(500),
    primary key (MaHinhAnh)
);
insert into HinhAnh(MaAlbum,LinkHinhAnh) values(1,"https://o.aolcdn.com/images/dims3/GLOB/crop/5760x2880+0+480/resize/630x315!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F1e6a11c0ceb369bee739518f2618916d%2F205881769%2Fhealth-food-for-fitness-picture-id855098134");
insert into HinhAnh(MaAlbum,LinkHinhAnh) values(1,"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg");
insert into HinhAnh(MaAlbum,LinkHinhAnh) values(2,"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/6/0/FN_snapchat_coachella_wingman%20.jpeg.rend.hgtvcom.616.462.suffix/1523633513292.jpeg");
insert into HinhAnh(MaAlbum,LinkHinhAnh) values(2,"https://foodrevolution.org/wp-content/uploads/2018/04/blog-featured-diabetes-20180406-1330.jpg");



create table ChiTietDiaChi(
MaDiaChi int AUTO_INCREMENT,
So char(10),
Duong nvarchar(50),
Phuong nvarchar(50),
Quan nvarchar(50),
ThanhPho nvarchar(50),
primary key (MaDiaChi)
);
insert into ChiTietDiaChi(So,Duong,Phuong,Quan,ThanhPho) values("475A","Điện Biên Phủ","Phường 24","Quận Bình Thạnh","TP.HCM");
insert into ChiTietDiaChi(So,Duong,Phuong,Quan,ThanhPho) values("12","Dien Bien Phu","P25","Q Binh Thanh","TP HCM");
insert into ChiTietDiaChi(So,Duong,Phuong,Quan,ThanhPho) values("223","Xo Viet Nghe Tinh","P22","Q Binh Thanh","TP HCM");
insert into ChiTietDiaChi(So,Duong,Phuong,Quan,ThanhPho) values("45","Dien Bien Phu","P5","Q Binh Thanh","TP HCM");


create table TaiKhoan(
TenTaiKhoan char(12) ,
MatKhau nvarchar(100),
TenHienThi nvarchar(50),
Avatar nvarchar(100),
Email nvarchar(100),
XacThucEmail Bit(1),
MaDiaChi char(10),
primary key(TenTaiKhoan)
);
insert into TaiKhoan(TenTaiKhoan,MatKhau) values("1","1");
insert into TaiKhoan(TenTaiKhoan,MatKhau) values("2","2");
insert into TaiKhoan(TenTaiKhoan,MatKhau) values("3","3");
insert into TaiKhoan(TenTaiKhoan,MatKhau) values("Khoa","khoa");





create table QuanAn(
    MaQuanAn int AUTO_INCREMENT,
    TenQuanAn nvarchar(100),
    MaDiaChi int,
    ChuSoHuu char(12),
    SoDienThoai char(12),
    MaAlbum int,
    Avatar nvarchar(300),
    GioMoCua nvarchar(10),
    GioDongCua nvarchar(10),
    MoTaQuanAn nvarchar(1000),
    SoLuongBan int,
    PRIMARY key (MaQuanAn)
);


insert into QuanAn(TenQuanAn,MaDiaChi,ChuSoHuu,SoDienThoai,MaAlbum,Avatar,GioMoCua,GioDongCua,MoTaQuanAn,SoLuongBan) values("Lẩu Gà Ớt Hiểm",1,"1","0971554664",1,"quanan1.jpg","10","10","Lẩu Gà Ớt Hiểm 109 là một quán ăn nổi tiếng với các món lẩu gà và gà nướng, với giá cả phải chăng nên là sự lựa chọn của nhiều học sinh, sinh viên.",20);


insert into QuanAn(TenQuanAn,MaDiaChi,ChuSoHuu,SoDienThoai,MaAlbum,Avatar,GioMoCua,GioDongCua,MoTaQuanAn,SoLuongBan) values("Lau ga",2,"Khoa","0909",1,"quanan2.jpg","10","10","mota",10);

insert into QuanAn(TenQuanAn,MaDiaChi,ChuSoHuu,SoDienThoai,MaAlbum,Avatar,GioMoCua,GioDongCua,MoTaQuanAn,SoLuongBan) values("Lau ga",3,"Khoa","0909",1,"quanan3.jpg","10","10","mota",10);

insert into QuanAn(TenQuanAn,MaDiaChi,ChuSoHuu,SoDienThoai,MaAlbum,Avatar,GioMoCua,GioDongCua,MoTaQuanAn,SoLuongBan) values("Lau ga",4,"Khoa","0909",1,"quanan4.jpg","10","10","mota",1);





create table LoaiMonAn(
    MaLoaiMonAn Int NOT NULL AUTO_INCREMENT,
    TenLoaiMonAn nvarchar(50),
    MaQuanAn int,
    primary key (MaLoaiMonAn)
);
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Lẩu","1");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Nướng","1");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Chiên","1");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Xào","1");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Nước","1");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Thêm","1");


insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Lẩu","2");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Nướng","2");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Chiên","2");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Xào","2");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Nước","2");

create table MonAn(
    MaMonAn int AUTO_INCREMENT,
    GioiThieuMonAn nvarchar(1000),
    TenMonAn nvarchar(100),
    MaLoaiMonAn int,
    MaBinhLuan int,
    Avatar nvarchar(300),
    MaAlbum int,
    GiaTien int,
    TinhTrang int DEFAULT 1,
    primary key (MaMonAn)
);
/* insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Lẩu","1");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Nướng","1");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Chiên","1");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Xào","1");
insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values("Nước","1"); */
insert into MonAn(GioiThieuMonAn,TenMonAn,MaLoaiMonAn,MaBinhLuan,Avatar,MaAlbum,GiaTien) values("Là một 1 món lẩu cay rất ngon","Lẩu gà ớt hiểm",1,1,"lauga.jpg",5,200000);

insert into MonAn(GioiThieuMonAn,TenMonAn,MaLoaiMonAn,MaBinhLuan,Avatar,MaAlbum,GiaTien) values("Gà nướng muối ớt","Gà Nướng",2,1,"ganuong.jpg",6,150000);

insert into MonAn(GioiThieuMonAn,TenMonAn,MaLoaiMonAn,MaBinhLuan,Avatar,MaAlbum,GiaTien) values("Tôm Chiên Giòn hấp dẫn","Tôm Chiên Giòn",3,1,"tomchiengion.jpg",7,150000);

insert into MonAn(GioiThieuMonAn,TenMonAn,MaLoaiMonAn,MaBinhLuan,Avatar,MaAlbum,GiaTien) values("Bánh Bao Chiên với nhân thịt và trứng cút","Bánh Bao Chiên",3,1,"banhbaochien.jpg",1,50000);

insert into MonAn(GioiThieuMonAn,TenMonAn,MaLoaiMonAn,MaBinhLuan,Avatar,MaAlbum,GiaTien) values("Mì xào giòn hải sản ","Mì Xào Hải Sản",4,1,"mixao.jpg",1,50000);
insert into MonAn(GioiThieuMonAn,TenMonAn,MaLoaiMonAn,MaBinhLuan,Avatar,MaAlbum,GiaTien) values("String","Sting",5,1,"sting.jpg",1,15000);
insert into MonAn(GioiThieuMonAn,TenMonAn,MaLoaiMonAn,MaBinhLuan,Avatar,MaAlbum,GiaTien) values("Pepsi","Pepsi",5,1,"pepsi.jpg",1,50000);

insert into MonAn(GioiThieuMonAn,TenMonAn,MaLoaiMonAn,MaBinhLuan,Avatar,MaAlbum,GiaTien) values("Rau Thêm","Rau Thêm",6,1,"rauthem.jpg",1,15000);

insert into MonAn(GioiThieuMonAn,TenMonAn,MaLoaiMonAn,MaBinhLuan,Avatar,MaAlbum,GiaTien) values("Mì Thêm","Mì Thêm",6,1,"mithem.jpg",1,15000);





create table BanAn(
    MaBan int,
    MaQuanAn int,
    PRIMARY key(MaBan,MaQuanAn)
);

insert into BanAn(MaBan,MaQuanAn) values(1,1);
insert into BanAn(MaBan,MaQuanAn) values(2,1);
insert into BanAn(MaBan,MaQuanAn) values(3,1);
insert into BanAn(MaBan,MaQuanAn) values(4,1);
insert into BanAn(MaBan,MaQuanAn) values(5,1);
insert into BanAn(MaBan,MaQuanAn) values(6,1);
insert into BanAn(MaBan,MaQuanAn) values(7,1);
insert into BanAn(MaBan,MaQuanAn) values(8,1);
insert into BanAn(MaBan,MaQuanAn) values(9,1);
insert into BanAn(MaBan,MaQuanAn) values(10,1);


create table HoaDon(
    MaHoaDon int AUTO_INCREMENT,
    NgayLap TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TinhTrang int DEFAULT 0,
    MaBan int,
    MaQuanAn int,
    PRIMARY KEY(MaHoaDon)
);

insert into HoaDon(TinhTrang,MaBan,MaQuanAn) values(1,1,1);
insert into HoaDon(TinhTrang,MaBan,MaQuanAn) values(0,1,1);
create table ChiTietHoaDon(
    MaHoaDon int,
    MaMonAn int,
    SoLuongMon int,
    TinhTrangMonAn int DEFAULT 0,
    PRIMARY key(MaHoaDon,MaMonAn)
);
insert into ChiTietHoaDon(MaHoaDon,MaMonAn,SoLuongMon) values(1,1,1);
insert into ChiTietHoaDon(MaHoaDon,MaMonAn,SoLuongMon) values(1,2,2);
insert into ChiTietHoaDon(MaHoaDon,MaMonAn,SoLuongMon) values(1,3,2);

use QuanLyQuanAn;
select * from MonAn;
