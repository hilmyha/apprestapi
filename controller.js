'use strict';

var response = require('./res');
var connection = require('./koneksi');

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