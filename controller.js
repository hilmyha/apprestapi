'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function(req, res) {
    response.ok("aplikasi REST API sudah berjalan", res)
};

// show all data mahasiswa
exports.tampilsemua = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

// menampilkan semua data mahasiswa berdasarkan id
exports.tampilid = function(req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
};

// menambah data mahasiswa
exports.tambahmahasiswa = function(req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    connection.query('INSERT INTO `mahasiswa`(`nim`, `nama`, `jurusan`) VALUES(?,?,?)', [nim, nama, jurusan],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menambahkan data", res);
            }
        });
};

// mengubah data berdasarkan id
exports.editmahasiswaid = function(req, res) {
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim, nama, jurusan, id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Data berhasil diubah", res);
            }
        });
};

// menghapus data berdasarkan id
exports.hapusmahasiswaid = function(req, res) {
    var id = req.body.id_mahasiswa;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Data berhasil dihapus", res);
            }
        });
}

// tampilkan matakuliah group
exports.tampilgroupmatkul = function(req, res) {
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.oknested(rows, res);
            }
        });
};