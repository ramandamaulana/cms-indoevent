class Utils {
    setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }

    toJSON(json) {
        if (json !== undefined || json !==null) {
            let record = JSON.parse(json);
            return JSON.parse(record);
        }
    }

    currencyRp(nominal) {
        let number_string = nominal.toString();
        let sisa = number_string.length % 3;
        let rupiah = number_string.substr(0, sisa);
        let ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        return rupiah;
    }
}

export default new Utils();