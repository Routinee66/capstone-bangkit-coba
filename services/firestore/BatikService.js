// const { Firestore } = require('@google-cloud/firestore');
const { admin, firestore } = require('../../config/firebaseConfig');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');

class BatikService {
  constructor() {
    this.collection = 'batik';
    this.firestore = firestore;
    this.collectionRef = this.firestore.collection(this.collection);
  }

  async getAllBatik() {
    var dataAll = [];
    await this.collectionRef.get()
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          dataAll.push(doc.data());
        });

      })
      .catch((error) => {
        return ('Gagal mendapatkan data:', error);
      });
    return dataAll;
  }

  async getBatikById(documentId) {
    const querySnapshot = await this.collectionRef.doc(documentId).get();
    if (querySnapshot.empty) {
      throw new NotFoundError('Batik Tidak Ditemukan');
    } else {
      return querySnapshot.data();
    }
  }

  async postBatik(title, origin, description, imageUrl) {
    const documentId = `batik-${nanoid(16)}`;
    const batik = {
      id: documentId,
      title: title,
      origin: origin,
      description: description,
      imageUrl: imageUrl
    };

    const documentRef = this.collectionRef.doc(documentId);
    
    if (!title || !origin || !description || !imageUrl) {
      throw new Error('Data tidak lengkap. Pastikan semua field terisi.');
    }

    await documentRef.set(batik);
    console.log('Berhasil menambahkan batik');
    return batik.id;
  }
}

module.exports = BatikService;
