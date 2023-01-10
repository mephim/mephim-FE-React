import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';
import { v4 } from 'uuid';

export const formatDate = (date: any) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

// To upload trailer and poster movie
// Upload poster => isImage = true
// Upload trailer => isImage = false
export const uploadFile = async (file: any, isImage: boolean) => {
    if (file == null) return;
    let imageRef;
    if (isImage) {
        imageRef = ref(storage, `images/${file?.name + v4()}`);
    } else {
        imageRef = ref(storage, `videos/${file?.name + v4()}`);
    }

    const snapshot =  await uploadBytes(imageRef, file);
    return await getDownloadURL(snapshot.ref);
};
