export default {
formattingRupiah(value) {
    return `Rp ${this.formatNumber(value)}`;
},
formatting(value) {
    return this.formatNumber(value);
},
formatNumber(number) {
    return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
},
extractJson(json) {
    return JSON.parse(
    JSON.stringify(json)
        .replace(/"{/g, "{")
        .replace(/}"/g, "}")
        .replace(/\\/g, "")
    );
},
async convertToBase64(event, callback) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
    // console.log(reader.result);
    callback(reader.result);
    };

    reader.readAsDataURL(file);
},

urlFileSitama(folderName, id, nik, namePhoto) {
    if (namePhoto.indexOf("data:image") === 0) {
    return namePhoto;
    }
    return `https://file.sitama.co.id/storage/${folderName}/${id}_${nik}/${namePhoto}`;
}
};
