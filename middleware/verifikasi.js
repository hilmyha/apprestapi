const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(roles) {
    return function (req, rest, next) {
        // cek auth token header
        var tokenWithBearer = req.headers['authorization'];
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];
            // verify
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return rest.status(401).send({auth:false, message:"Token tidak terdaftar"});
                } else {
                    if (roles == 2) {
                        req.auth =  decoded;
                        next();
                    } else {
                        return rest.status(401).send({auth:false, message:"Gagal otorisasi role anda"});
                    }
                } 
            });
        } else {
            return rest.status(401).send({auth:false, message:"Token tidak tersedia"});
        }
    }
}

module.exports = verifikasi();