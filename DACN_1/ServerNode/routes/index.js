var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
let formidable = require('formidable');
// var multer  = require('multer');
// var upload = multer({ dest: 'uploads/' }); 
// const bcrypt = require('bcrypt')
//Xác thực dữ liệu 
//var Validate = require('validator');


var con = mysql.createConnection({
  host:"0.0.0.0",
  user:"admin",
  password:"M@tkh4u1",
  database:"QuanLyQuanAn",
  insecureAuth : true,
  //docker port
  port: 3306,
});
con.connect(function(err){
  if(err) throw err;
  console.log("===========================\nKẾT NỐI DATABASE THÀNH CÔNG\n===========================");
});

router.get('/LayTatCaQuanAn', (request, response, next) => {
 var query = `select * from QuanAn`
 con.query(query,function(err,result,fields){
   if (err) throw err;
   else{
     response.json(result);
      response.end();
   }
 })



});



router.get('/open_image', (request, response, next) => {
    let imageName = "uploads/" + request.query.image_name;
    fs.readFile(imageName, (err, imageData) => {
        if (err) {
            response.json({
                result: "failed",
                messege: `Cannot read image.Error is : ${err}`
            });
            return;
        }
        response.writeHead(200, {'Content-Type': 'image/jpeg'});
        response.end(imageData); // Send the file data to the browser.
    });
});

router.post('/goimon',(req,res,next)=>{
 var data = req.body.data;
 var MaQuan = req.body.MaQuanAn;
 var MaBan = req.body.MaBan;
var dataJson = JSON.parse(data);

console.log(dataJson);
var arr = dataJson; // Represent your array
var len = arr.filter(function (item) { 
  return item.MaMonAn != 0; 
}).length;
console.log("len ======");
console.log(len);
console.log("=========");
/*
Tìm xem có hoá đơn của bàn, quán này chưa thanh toán không, nếu có là đã gọi món không tạo hoá đơn mới
chưa có thì tạo hoá đơn mới return mã hoá đơn để thêm data mới vào
*/



let KiemTra = async () =>{
  return new Promise( async(resolve,reject)=>{
   let queryKiemTra = `SELECT count(MaHoaDon) as SoLuong FROM HoaDon Where TinhTrang = 0 AND MaBan = ${MaBan} and MaQuanAn = ${MaQuan}`
  await  con.query(queryKiemTra,function(err,result,fields){
      if (err){ 
      return reject(new Error("loi query kiem tra, thieu ma ban hoac ma quan"));
      }
      else{
        return resolve(result[0].SoLuong);
      }
    })
  })
}



let TaoHoaDon = async () => {
 return new Promise(async(resolve,reject)=>{
  let queryTaoHoaDon = `insert into HoaDon(TinhTrang,MaBan,MaQuanAn) values(0,${MaBan},${MaQuan});`
   await con.query(queryTaoHoaDon, async function(err,result,filed){
      if (err) {
        return reject(new Error("loi query tao hoa don " + err));
      }
      else{
        return resolve(result.insertId);
      }
    })
 }) 

}

let LayMaHoaDonTuQuanVaBan = async () =>{
  let queryLayMaHoaDon = `SELECT MaHoaDon FROM HoaDon Where TinhTrang = 0 AND MaBan = ${MaBan} and MaQuanAn = ${MaQuan}`;
  return new Promise(async(resolve,reject)=>{
  await  con.query(queryLayMaHoaDon,function(err,result,fields){
      if (err){
        return reject(new Error("lay ma hoa don that bai " + err));
      }else{
        return resolve(result[0].MaHoaDon);
      }
    })
  })
}

let KiemTraMonAnTonTai = async(MaHoaDon,MaMonAn) =>{
  return new Promise(async(resolve,reject)=>{
    let queryKiemTraTonTai = `select count(MaHoaDon) as TonTai from ChiTietHoaDon where MaHoaDon = ${MaHoaDon} and MaMonAn = ${MaMonAn}`;
    console.log(" kiem tra so luong " + queryKiemTraTonTai);
  await   con.query(queryKiemTraTonTai,async function(err,result,fields){
       if (err){
         throw err;
       }
       else{
        await console.log(result[0].TonTai);
          return resolve(result[0].TonTai);
       }
  })

  })
}

let LaySoLuongMonAn = async (MaHoaDon,MaMonAn) => {
  return new Promise(async(resolve,reject)=>{
    let queryLaySoLuong = `select SoLuongMon as SoLuong from ChiTietHoaDon where MaHoaDon = ${MaHoaDon} and MaMonAn = ${MaMonAn}`
    console.log(queryLaySoLuong);
     await con.query(queryLaySoLuong,async function(err,result1,fields){
          if (err){
            return reject(new Error("lay so luong khong thanh cong"));
          } 
          else{
           await console.log(result1[0].SoLuong);
            return resolve(result1[0].SoLuong);
          }
  })
})
}

let CapNhatSoLuong = async(MaHoaDon,MaMonAn,TongSoLuong) =>{
  return new Promise(async(resolve,reject)=>{
    let queryCapNhatSoLuong = `update ChiTietHoaDon set SoLuongMon = ${TongSoLuong} where MaHoaDon = ${MaHoaDon} and MaMonAn = ${MaMonAn}`
    console.log(queryCapNhatSoLuong);
        await con.query(queryCapNhatSoLuong,async function(err,result,fields){
         if (err){
           return reject(false)
         }
         else{
      await console.log("đã cập nhật số lượng món ăn " + MaMonAn);
          return resolve(true)
         }

  })
})
}

let ThemMonAnVaoChiTiet = async(MaHoaDon,MaMonAn,SoLuong) =>{
  let queryThemMonAn  = `insert into ChiTietHoaDon(MaHoaDon,MaMonAn,SoLuongMon) values(${MaHoaDon},${MaMonAn},${SoLuong})`
  console.log(queryThemMonAn);
          await   con.query(queryThemMonAn, async function(err,result,fields){
               if (err) {
                 return reject(new Error("loi khi them mon an vao chi tiet"))
               }
               else{
            await     console.log("thêm thành công món ăn " + "vào hóa đơn ");
          return  resolve(true)
               }
             })
}
let ThemMonAnVaoChiTietHoaDon = async (MaHoaDon,MaMonAn,SoLuong) =>{
  return new Promise( async(resolve,reject)=>{
   let kiemtramon = await KiemTraMonAnTonTai(MaHoaDon,MaMonAn);
   if ( kiemtramon == 1){
      console.log("món đã tồn tại, cập nhật số lượng");
      let lsl = await LaySoLuongMonAn(MaHoaDon,MaMonAn);
      let TongSoLuong = await lsl + SoLuong;
      let cnsl = await CapNhatSoLuong(MaHoaDon,MaMonAn,TongSoLuong);
      console.log(cnsl);
      }
      else{
        let tma = await ThemMonAnVaoChiTiet(MaHoaDon,MaMonAn,SoLuong);
        console.log(tma);
      }
      resolve(true);
      }
    )
  }
let LayMaHoaDon = async(TinhTrang) =>{
  return new Promise(async(resolve,reject)=>{
    if (TinhTrang == 0){
      let thd = await TaoHoaDon();
      console.log("chua co hoa don, tao hoa don " + thd);
     return resolve(thd);
    }
    else if (TinhTrang > 0 ){
      let lmhd = await LayMaHoaDonTuQuanVaBan();
     await console.log("hoa don ton tai, lay ma " + lmhd)
      return resolve(lmhd);
    }
    else{
      return reject(new Error("loi khi lay ma hoa don"))
    }
  })
}



let ThemMonVaoHoaDon = async() => {
  let kt = await KiemTra();
  await console.log("kq tra ve la" + kt);
  let lmhd = await LayMaHoaDon(kt);
  await console.log("lay ma hoa don thanh cong " +lmhd);
  // let tmavcthd = await ThemMonAnVaoChiTietHoaDon(lmhd);
  for (i in dataJson){
    console.log("======================\n Chay vong for lann thu " + i);
    await ThemMonAnVaoChiTietHoaDon(lmhd,dataJson[i].MaMonAn,dataJson[i].SoLuong);
    console.log("them mon an vao chi tiet hoa don");
    // await console.log(dataJson[i].TenMonAn);
    console.log("ket thuc them mon an");
  }
}
ThemMonVaoHoaDon().then(
  res.end({
    TraVe:true
  })
).
catch(console.log("có gì đó sai sai"));



});





router.post('/upload_image', (req, res, next) => {
    // let formidable = require('formidable');
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.maxFieldsSize = 1 * 1024 * 1024; //10 MB
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                messege: `Cannot upload images.Error is : ${err}`
            });
            return;
        }
        else{
     var fileName = files["photo"];
     // console.log(fileName.path);

        console.log(`${fileName.path.split('/')[1]}`);
    res.json({
        imageName: `${fileName.path.split('/')[1]}`,
    })
        res.end();
        return;

    }
    })
});
//
router.post('/DangKy',function(req,res,next){
  var TenTaiKhoan  = req.body.TenTaiKhoan;
  var MatKhau = req.body.MatKhau;

  var sqlCheckExists =  `select  count(TenTaiKhoan) as TenTaiKhoan from TaiKhoan where TenTaiKhoan = '${TenTaiKhoan}'`;

    if(con.query(sqlCheckExists,function(err,result){
      if (err) throw err;
    else{ 
         console.log(result[0]);
       if (result[0].TenTaiKhoan > 0){
         console.log("aaalkasdfj;");
         console.log(result[0].TenTaiKhoan);
        var dataTraVe = {
          status : "Tên tài khoản đã tồn tại!",
          result: `${result[0].TenTaiKhoan}`
        };
        res.json(dataTraVe);
        res.end();
      }
      else{
        //  bcrypt.genSalt(10, function(err, salt) {
          // bcrypt.hash(`${MatKhau}`, salt, function(err, hash){
          var sql = `insert into TaiKhoan(TenTaiKhoan,MatKhau,TenHienThi,Avatar,Email,XacThucEmail,MaDiaChi)
          VALUES ( '${TenTaiKhoan}',"${MatKhau}","Khoa",null,null,null,null)`;
          con.query(sql,function(err,result){
            if (err) throw err;
            else{
              var dataTraVe = {
                status: "Đăng ký thành công!",
                TaiKhoan: `${TenTaiKhoan}`
              };
              res.json(dataTraVe);
              res.end();
            }
          });
        }
      }
    })
    );
  });

  // router.post('/LayDanhSachMonAnTheoLoai',function(req,res,next){
  //   // var TraVe;
  //   var MaQuanAn = req.body.MaQuanAn;
  //   // if((MaQuanAn)!= null && (TenLoaiMonAn != null)){
  //     var sql = `select * from LoaiMonAn where MaQuanAn = '${MaQuanAn}'`;
  //     con.query(sql,function(err,result){
  //       if (err) throw err;
  //       // else{
  //         res.json(result);
  //         console.log(result);
  //         res.end();
  //         return;
  //       // }
  //     });
  //   // }
  // });

  router.post('/LayDanhSachMonAn',function(req,res,next){
    var MaQuanAn = req.body.MaQuanAn;
      var sql = `select * from MonAn,LoaiMonAn where LoaiMonAn.MaLoaiMonAn = MonAn.MaLoaiMonAn and LoaiMonAn.MaQuanAn = ${MaQuanAn}`;
      con.query(sql,function(err,result){
        if (err) throw err;
          res.json(result);
          // console.log(result);
          res.end();
          return;
      });
  });


  router.post('/ThemMonAn',function(req,res,next){
    var GioiThieuMonAn =  req.body.GioiThieuMonAn;
    var TenMonAn  =  req.body.TenMonAn;
    var MaLoaiMonAn  =  req.body.MaLoaiMonAn;
    var MaBinhLuan = 1;
    var Avatar  =  req.body.Avatar;
    var MaAlbum;
    var GiaTien  =  req.body.GiaTien;

    var queryTaoAlbumAnh = `insert into AlbumAnh(LoaiAlbum) values ("QuanAn");`;
    var TaoAlbum = () => {
      return new Promise((resolve,reject)=>{
        con.query(queryTaoAlbumAnh,function(err,result,fields){
          if (err){
              // throw err;
              return reject(new Error('TaoAlbum khong thanh cong'))
            }
          else{
            console.log("tao album");
            MaAlbum =  result.insertId;
            return resolve(result.insertId);
          }
        })
      })
    }
    var tma = async() => {
      let tab = await TaoAlbum();
      var sql =  `insert into MonAn(GioiThieuMonAn,TenMonAn,MaLoaiMonAn,MaBinhLuan,Avatar,MaAlbum,GiaTien) values("${GioiThieuMonAn}","${TenMonAn}",${MaLoaiMonAn},${MaBinhLuan},"${Avatar}",${MaAlbum},${GiaTien})`;
      console.log(sql);
      con.query(sql,function(err,result,fields){
        if (err) throw err;
        else{
          res.json({status:"true"});
          res.end();
        }
      })
    

    }
  

   
    tma();


  })
    
    
// insert into MonAn(GioiThieuMonAn,TenMonAn,MaLoaiMonAn,MaBinhLuan,Avatar,MaAlbum,GiaTien) values("1","a",1,1,"11",1,1)



  
  

  router.post('/LayDanhSachLoaiMonAn',function(req,res,next){
    // var TraVe;
    var MaQuanAn = req.body.MaQuanAn;
    // if((MaQuanAn)!= null && (TenLoaiMonAn != null)){
      var sql = `select * from LoaiMonAn where MaQuanAn = '${MaQuanAn}'`;
      con.query(sql,function(err,result){
        if (err) throw err;
        // else{
          res.json(result);
          console.log(result);
          res.end();
          return;
        // }
      });
    // }
  });

router.post('/ThemLoaiMonAn',function(req,res,next){
  // var TraVe;
  var TenLoaiMonAn = req.body.TenLoaiMonAn;
  var MaQuanAn = req.body.MaQuanAn;
  // if((MaQuanAn)!= null && (TenLoaiMonAn != null)){
    var sql = `insert into LoaiMonAn(TenLoaiMonAn,MaQuanAn) values ('${TenLoaiMonAn}',${MaQuanAn})`;
    con.query(sql,function(err,result){
      if (err) throw err;
      // else{
        res.json(result);
        console.log(result);
        res.end();
        return;
      // }
    });
  // }
});

router.post('/LayQuanAnTuMa',function(req,res,next){
  var TraVe;
  var MaQuanAn = req.body.MaQuanAn;
  if((MaQuanAn)!= null){
    var sql = `select * from QuanAn,ChiTietDiaChi where MaQuanAn = '${MaQuanAn}' and QuanAn.MaDiaChi = ChiTietDiaChi.MaDiaChi`;
    con.query(sql,function(err,result){
      if (err) throw err;
      else{
        res.json(result);
        console.log(result);
        res.end();
        return;
      }
    });
  }
});

router.post('/DanhDauMonAnHoanThanh',function(req,res,next){
  var MaMonAn = req.body.MaMonAn;
  var MaHoaDon = req.body.MaHoaDon;
  var TT = req.body.TinhTrang
  var query = `update ChiTietHoaDon set TinhTrangMonAn = ${TT} where MaMonAn = ${MaMonAn} and MaHoaDon = ${MaHoaDon}`
  con.query(query,function(err,result){
    if (err){
      throw err;
    }else{
      res.json({status:"success"})
      res.end();
    }
  })
})

router.post('/LayCacMonDuocGoi',function(req,res,next){
  var MaQuan = req.body.MaQuan;
  var queryLayMonAn = `select * from HoaDon , ChiTietHoaDon,MonAn where MaQuanAn = ${MaQuan}  and HoaDon.TinhTrang = 0 and ChiTietHoaDon.MaMonAn = MonAn.MaMonAn and HoaDon.MaHoaDon = ChiTietHoaDon.MaHoaDon and ChiTietHoaDon.TinhTrangMonAn = 0`;
  con.query(queryLayMonAn,function(err,result){
    if(err){
      return err;
    }
    else{
      res.json(result);
      res.end();
    }
  })
})


router.post('/LayCacMonDaGoi',function(req,res,next){
  var MaBan = req.body.MaBan;
  var MaQuan = req.body.MaQuan;
  var kq;
  var queryLayMonAn = `SELECT * FROM  ChiTietHoaDon,HoaDon,MonAn
  where ChiTietHoaDon.MaHoaDon = HoaDon.MaHoaDon and HoaDon.TinhTrang = 0 and MonAn.MaMonAn = ChiTietHoaDon.MaMonAn
  and HoaDon.MaBan = ${MaBan} and HoaDon.MaQuanAn = ${MaQuan}`;
  console.log(queryLayMonAn);
  con.query(queryLayMonAn,async function(err,result){
    if (err){
      throw err;
    }
    else{
      await console.log(result);
      
       res.json(result);
       res.end();
      // res.end(result);
    }
  })
});


router.post('/LayDanhSachQuanAn',function(req,res,next){
  var TenTaiKhoan = `${req.body.TenTaiKhoan}`;

    var sql = `  select * from QuanAn,ChiTietDiaChi where ChuSoHuu = '${TenTaiKhoan}' and QuanAn.MaDiaChi = ChiTietDiaChi.MaDiaChi`;
    con.query(sql,function(err,result){
      if (err) throw err;
      else{
        res.json(result);
        console.log(result);
        res.end();
        return;
      }
    });
});






// router.post('/TaoQuanAn',function(req,res,next){
//   var TraVe;
//   var TenTaiKhoan     = `${req.body.TenTaiKhoan}`;
//   var TenQuanAn       = `${req.body.TenQuanAn}`;
//   var Avatar          = `${req.body.Avatar}`;
//   var SoDienThoai     = `${req.body.SoDienThoai}`;
//   var MoTa            = `${req.body.MoTa}`;

//   var GioMoCua        = `${req.body.GioMoCua}`;
//   var GioDongCua      = `${req.body.GioDongCua}`;

//   var So              = `${req.body.So}`;
//   var Duong           = `${req.body.Duong}`;
//   var Phuong          = `${req.body.Phuong}`;
//   var Quan            = `${req.body.Quan}`;
//   var ThanhPho        = `${req.body.ThanhPho}`;
//   var MaDiaChi,MaAlbum;

//   var So              = "1";
//   var Duong           = "Bach dang";
//   var Phuong          = "24";
//   var Quan            = "Binh Thanh";
//   var ThanhPho        = "HCM";



//   var queryTaoAlbumAnh = `insert into AlbumAnh(LoaiAlbum) values ("QuanAn");`;
//   var queryTaoMaDiaChi = `insert into ChiTietDiaChi(So,Duong,Phuong,Quan,ThanhPho) values ("${So}","${Duong}","${Phuong}","${Quan}","${ThanhPho}");`;

//   var MaDiaChiTraVe,MaAlbumTraVe;
// var TaoDiaChi = function(){
//     con.query(queryTaoMaDiaChi,function(err,result,fields){
//     if (err) throw err;
//     else{
//       MaDiaChi  = result.insertId;
//     }
//   })
// };
// var TaoAlbum = function() {
  
//     con.query(queryTaoAlbumAnh,function(err,result,fields){
//       if (err)  throw err;
//       else{
//         MaAlbum =  result.insertId;
//       }
//     })
//   };
  
//   TaoDiaChi();
//   TaoAlbum();
//   setTimeout(()=>{
//     var sql = `insert into QuanAn(TenQuanAn,MaDiaChi,ChuSoHuu,SoDienThoai,MaAlbum,Avatar,GioMoCua,GioDongCua,MoTaQuanAn) values("${TenQuanAn}",${MaDiaChi},"${TenTaiKhoan}","${SoDienThoai}",${MaAlbum},"${Avatar}","${GioMoCua}","${GioDongCua}","${MoTa}");`
//       con.query(sql,function(err,result){
//       if (err) throw err;
//       else{
//           TraVe = {
//             status:"true"
//           }
//           res.json(TraVe);
//           console.log(TraVe);
//           res.end();
//           return;
//          }  
//        });
//   },1500);

// });

// router.post('/TaoQuanAn',function(req,res,next){
//   var TraVe;
//   var TenTaiKhoan     = `${req.body.TenTaiKhoan}`;
//   var TenQuanAn       = `${req.body.TenQuanAn}`;
//   var Avatar          = `${req.body.Avatar}`;
//   var SoDienThoai     = `${req.body.SoDienThoai}`;
//   var MoTa            = `${req.body.MoTa}`;
//   var SoLuongBan      = req.body.SoLuongBan;

//   var GioMoCua        = `${req.body.GioMoCua}`;
//   var GioDongCua      = `${req.body.GioDongCua}`;

//   var So              = `${req.body.So}`;
//   var Duong           = `${req.body.Duong}`;
//   var Phuong          = `${req.body.Phuong}`;
//   var Quan            = `${req.body.Quan}`;
//   var ThanhPho        = `${req.body.ThanhPho}`;
//   var MaDiaChi,MaAlbum;

//   var So              = "1";
//   var Duong           = "Bach dang";
//   var Phuong          = "24";
//   var Quan            = "Binh Thanh";
//   var ThanhPho        = "HCM";



//   var queryTaoAlbumAnh = `insert into AlbumAnh(LoaiAlbum) values ("QuanAn");`;
//   var queryTaoMaDiaChi = `insert into ChiTietDiaChi(So,Duong,Phuong,Quan,ThanhPho) values ("${So}","${Duong}","${Phuong}","${Quan}","${ThanhPho}");`;

//   var MaDiaChiTraVe,MaAlbumTraVe;
// var TaoDiaChi = () => {
//     return new Promise((resolve,reject) =>{
//       con.query(queryTaoMaDiaChi,function(err,result,fields){
//         if (err) {
//           return reject(new Error('Khong the tao dia chi'))
//         }
//         else{
//           MaDiaChi  = result.insertId;
//           console.log("tao dia chi")
//           return resolve(result.insertId)
//         }
//       })
//     })
//   }

// var TaoAlbum = () => {
//   return new Promise((resolve,reject)=>{
//     con.query(queryTaoAlbumAnh,function(err,result,fields){
//       if (err){
//           // throw err;
//           return reject(new Error('TaoAlbum khong thanh cong'))
//         }
//       else{
//         console.log("tao album");
//         MaAlbum =  result.insertId;
//         return resolve(result.insertId);
//       }
//     })
//   })
// }

// var tqa = async() => {
//   let tdc = await TaoDiaChi();
//   let tab = await TaoAlbum();
//   console.log("done");
//   console.log("tao quan an")
//   var sql = `insert into QuanAn(TenQuanAn,MaDiaChi,ChuSoHuu,SoDienThoai,MaAlbum,Avatar,GioMoCua,GioDongCua,MoTaQuanAn,SoLuongBan) values("${TenQuanAn}",${tdc},"${TenTaiKhoan}","${SoDienThoai}",${tab},"${Avatar}","${GioMoCua}","${GioDongCua}","${MoTa}",${SoLuongBan});`
//       con.query(sql,function(err,result){
//       if (err) throw err;
//       else{
//           TraVe = {
//             status:"true"
//           }
//           res.json(TraVe);
//           console.log(TraVe);
//           res.end();
//           return;
//         }
//       })
//     }  

// tqa();

// });





router.post('/TaoQuanAn',function(req,res,next){
  var TraVe;
  var TenTaiKhoan     = `${req.body.TenTaiKhoan}`;
  var TenQuanAn       = `${req.body.TenQuanAn}`;
  var Avatar          = `${req.body.Avatar}`;
  var SoDienThoai     = `${req.body.SoDienThoai}`;
  var MoTa            = `${req.body.MoTa}`;
  var SoLuongBan      = req.body.SoLuongBan;

  var GioMoCua        = `${req.body.GioMoCua}`;
  var GioDongCua      = `${req.body.GioDongCua}`;

  var So              = `${req.body.So}`;
  var Duong           = `${req.body.Duong}`;
  var Phuong          = `${req.body.Phuong}`;
  var Quan            = `${req.body.Quan}`;
  var ThanhPho        = `${req.body.ThanhPho}`;
  var MaDiaChi,MaAlbum;

  var So              = "1";
  var Duong           = "Bach dang";
  var Phuong          = "24";
  var Quan            = "Binh Thanh";
  var ThanhPho        = "HCM";



  var queryTaoAlbumAnh = `insert into AlbumAnh(LoaiAlbum) values ("QuanAn");`;
  var queryTaoMaDiaChi = `insert into ChiTietDiaChi(So,Duong,Phuong,Quan,ThanhPho) values ("${So}","${Duong}","${Phuong}","${Quan}","${ThanhPho}");`;

  var MaDiaChiTraVe,MaAlbumTraVe;
var TaoDiaChi = () => {
    return new Promise((resolve,reject) =>{
      con.query(queryTaoMaDiaChi,function(err,result,fields){
        if (err) {
          return reject(new Error('Khong the tao dia chi'))
        }
        else{
          MaDiaChi  = result.insertId;
          console.log("tao dia chi")
          return resolve(result.insertId)
        }
      })
    })
  }

var TaoAlbum = () => {
  return new Promise((resolve,reject)=>{
    con.query(queryTaoAlbumAnh,function(err,result,fields){
      if (err){
          // throw err;
          return reject(new Error('TaoAlbum khong thanh cong'))
        }
      else{
        console.log("tao album");
        MaAlbum =  result.insertId;
        return resolve(result.insertId);
      }
    })
  })
}


var TaoBanAn = (MaQuanAn) => {
  return new Promise((resolve,reject)=>{
    for(i = 1;i<= SoLuongBan;i++){
      var queryTaoBanAn = `insert into BanAn(MaBan,MaQuanAn) values(${i},${MaQuanAn});`
      con.query(queryTaoBanAn,function(err,result){
        if (err){
          // throw err;
          return reject(new Error("tao ban that bai"));
        }
        else{
          console.log("them thanh cong ban" + i);
        }
      })
    }
    console.log("tao thanh cong")
    return resolve('thanh cong')
    })
  }
  


var tqa = async() => {
  let tdc = await TaoDiaChi();
  let tab = await TaoAlbum();
  console.log("done");
  console.log("tao quan an")
  var sql = `insert into QuanAn(TenQuanAn,MaDiaChi,ChuSoHuu,SoDienThoai,MaAlbum,Avatar,GioMoCua,GioDongCua,MoTaQuanAn,SoLuongBan) values("${TenQuanAn}",${tdc},"${TenTaiKhoan}","${SoDienThoai}",${tab},"${Avatar}","${GioMoCua}","${GioDongCua}","${MoTa}",${SoLuongBan});`
      con.query(sql,async function(err,result){
      if (err) throw err;
      else{
    let taoban = await  TaoBanAn(result.insertId);
          TraVe = {
            status:"true"
          }
          res.json(TraVe);
          // console.log(TraVe);
          res.end();
          return;
        }
      })
    }  

tqa();

});
    
    
    






router.post('/DangNhap',function(req,res,next){
  var TraVe;
  var TenTaiKhoan = req.body.TenTaiKhoan;
  var MatKhau = req.body.MatKhau;
  // var MatKhauTuDb;

  var sqlCheckExists = `select  count(TenTaiKhoan) as TenTaiKhoan from TaiKhoan where TenTaiKhoan = "${TenTaiKhoan}"`;
  if ((TenTaiKhoan == null) && (MatKhau == null)){
    var dataTraVe = {
      status : "false"
    };
    res.json(dataTraVe);
    res.end();
    return;
  }

  if(con.query(sqlCheckExists,function(err,result){
    if (err) throw err;
      else{ 
      if (result[0].TenTaiKhoan == 0){
      var dataTraVe = {
        status : "false"
      };
      res.json(dataTraVe);
      res.end();
      return;
    }
    else{
      var sql = `select MatKhau from TaiKhoan where TenTaiKhoan = "${TenTaiKhoan}"`;
      con.query(sql,function(err,result){
        if (err) throw err;
        else{
          if(result[0].MatKhau == MatKhau){
            console.log("thanh cong");
            TraVe = {
                        status:"true"
                      }
                    }
                    else{
                      console.log("That bai");
                      TraVe = {
                                  status:"false"
                                }
                              }
                              res.json(TraVe);
                              res.end();
                              return;
                            }
                          });
                        }
                      }
                    }));
                  }
);
                  

      //
      // var sql = `select MatKhau from TaiKhoan where TenTaiKhoan = '${TenTaiKhoan}'`;
      // con.query(sql,function(err,result){
      //   if (err) throw err;
      //   MatKhauTuDb = result[0].MatKhau;
      //       if ((result) == true){
      //         console.log("thanh cong");
      //         TraVe = {
      //           status:"true"
      //         }
      //       }
      //       else{
      //         TraVe = {
      //           status :"false"
      //         }
      //         console.log("that bai");
      //       }
      //     res.json(TraVe);
      //       res.end();
      //   });
      // }
      //     }
      //   });
      // });

  








/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// router.post('/SuaQuanAn',function(req,res,next){
  
// })


router.post('/ChuQuanHuyMon',function(req,res,next){
  var MaMonAn = req.body.MaMonAn;
  var MaHoaDon = req.body.MaHoaDon;
  var sql = `delete from ChiTietHoaDon where MaMonAn = ${MaMonAn} and MaHoaDon ${MaHoaDon}`
  con.query(sql,function(err,result){
    if (err){
      throw err;
    }
    else{
      console.log("l")
    }
  })
});



router.post('/BaoCaoChuQuan',function(req,res,next){

  let MaQuanAn = req.body.MaQuanAn;
  let Thang = req.body.Thang;
  let sql = `select * , (GiaTien * SoLuongMon) as TongTien from ChiTietHoaDon , HoaDon,MonAn where ChiTietHoaDon.MaHoaDon = HoaDon.MaHoaDon and MONTH(NgayLap) = ${Thang} and ChiTietHoaDon.MaMonAn = MonAn.MaMonAn and HoaDon.MaQuanAn = ${MaQuanAn}`;
  con.query(sql,function(err,result){
    if (err){
      var rs = {status : "error"};
      res.json(rs);
      res.end();
      throw err;
    }else{
      res.json(result);
      res.end();
    }
  })

});

router.post('/LayDanhSachTinhTien',function(req,res,next){
  let MaQuanAn = req.body.MaQuanAn;
  let sql = `select HoaDon.MaHoaDon,HoaDon.MaBan,sum(ChiTietHoaDon.SoLuongMon * MonAn.GiaTien) as TongTien from HoaDon,ChiTietHoaDon,MonAn where HoaDon.TinhTrang = 1 and ChiTietHoaDon.MaHoaDon = HoaDon.MaHoaDon and MonAn.MaMonAn = ChiTietHoaDon.MaMonAn and ChiTietHoaDon.TinhTrangMonAn = 1 and HoaDon.TinhTrang = 1
  group by HoaDon.MaHoaDon`
  con.query(sql,function(err,result){
    if (err){
      throw err;
    }else{
      res.json(result);
      res.end();
    }
  })

})

router.post('/ChuQuanXacNhanTinhTien',function(req,res,next){
  let MaHoaDon = req.body.MaHoaDon;
  let sql = `update HoaDon set TinhTrang = 2 where HoaDon.MaHoaDon = ${MaHoaDon}`;
  con.query(sql,function(err,result){
    if (err){
      throw err;
    }
    else
    {
      let re = {status : "OK"};
      res.json(re);
      res.end();
    }
  })

})


router.post('/TinhTien',function(req,res,next){
  let MaHoaDon = req.body.MaHoaDon;
 let sql = `update HoaDon set TinhTrang = 1 where HoaDon.MaHoaDon = ${MaHoaDon}`;
 con.query(sql,function(err,result){
   if (err){
     throw err;
   }
   else{
    //  let sql1 = `select MonAn.Avatar,HoaDon.TinhTrang,HoaDon.MahoaDon,HoaDon.NgayLap,MonAn.TenMonAn,ChiTietHoaDon.SoLuongMon,MonAn.GiaTien,(ChiTietHoaDon.SoLuongMon*MonAn.GiaTien) as TongTien from HoaDon , ChiTietHoaDon,MonAn where HoaDon.MaBan = 1 and HoaDon.MaQuanAn = 1  and HoaDon.TinhTrang = 1 and ChiTietHoaDon.MaMonAn = MonAn.MaMonAn and HoaDon.MaHoaDon = ${MaHoaDon} `;
    //  con.query(sql1,function(err,result1){
    //    if (err){
    //      throw err;
    //    }
    //    else{
    //      res.json(result1);
    //      res.end();
    //    }
    //  })
    res.json({Status:"Ok"});
    res.end();
   }
 })



})


// Đăng Ký
// router.post('/DangKyThanhVien',(req,res,next)=>{
//   var sdt =  req.body.sdt;
//   var ten = req.body.ten;
//   var matkhau = req.body.mk;
//   //check exists
//   var sqlCheckExists = `select  count(sdt) as sdt from users where sdt = '${sdt}'`;
//   if(con.query(sqlCheckExists,function(err,result){
//     if (err) throw err;
//     else{ 
//      if (result[0].sdt >= 1){
//       var dataTraVe = {
//         status : "Số điện thoại này đã được đăng ký!"
//       };
//     console.log(result[0].sdt);
//     console.log("Đăng ký không thành công");
//     res.json(dataTraVe);
//       res.end();
//     }
//     else{
//       var sql = `insert into users values('${sdt}','${ten}','${matkhau}',now())`;
//       con.query(sql,function(err,result){
//         if (err) throw err;
//         var dataTraVe = {
//           status : "successful"
//         }
//         res.json(dataTraVe);
//         console.log("Dang ky thanh cong")
//         res.end();
//       })
//     }
//   }
//   }
//     ));
//   });
//

// router.post('/DangNhap',(req,res,next)=>{
//   var sdt = req.body.sdt;
//   var matkhau = req.body.mk;
//   var sql = `select count(sdt) as sdt from users where sdt = '${sdt}' and matkhau = '${matkhau}'`;
//   con.query(sql,function(err,result){
//     if(err) throw err;
//     else{
//       if (result[0].sdt == 1){
//        console.log("dang nhap thanh cong");
//        console.log(result[0].sdt);
//        var dataTraVe = {
//         status : "THANH CONG"
//       };
//       res.json(dataTraVe)
//         res.end();
//       }
//       else if (result[0].sdt == 0) {
//         console.log("THAT BAI");
//         console.log(result[0].sdt);
//         var dataTraVe = {
//           status : "THAT BAI"
//         };
//         res.json(dataTraVe)
//         res.end();
//       }
//     }
//   })
// })


















module.exports = router;




