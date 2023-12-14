const { admin, firestore } = require('./config/firebaseConfig')

const tes = async () => {
  // const collectionRef = firestore.collection('articles');
  const collectionRef = firestore.collection('batik');

  collectionRef.get()
    .then(snapshot => {
      const batch = admin.firestore().batch();

      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      return batch.commit();
    })
    .then(() => {
      console.log('Seluruh dokumen dihapus dari koleksi.');
    })
    .catch(error => {
      console.error('Error menghapus dokumen:', error);
    });
}
tes();
