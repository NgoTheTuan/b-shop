export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month starts from 0
  const year = date.getFullYear(); // Get last 2 digits of year
  return `${day}/${month}/${year}`;
};

export const number_to_price = (v) => {
  return (
    "" +
    v.toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
    })
  );
};

export function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

export function convertBase64ToFile(dataurl) {
  return new Promise((resolve, reject) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    resolve(new File([u8arr], { type: mime }));
  });
}
