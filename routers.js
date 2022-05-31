'use strict';

module.exports = function(app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampilsemua);
    
    app.route('/tampil/:id')
        .get(jsonku.tampilid);
    
    app.route('/tambah')
        .post(jsonku.tambahmahasiswa);
    
    app.route('/ubah')
        .put(jsonku.editmahasiswaid);

    app.route('/hapus')
        .delete(jsonku.hapusmahasiswaid);
}