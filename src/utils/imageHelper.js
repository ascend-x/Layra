export const compressImage = (file, maxWidth = 800) => {
    return new Promise((resolve, reject) => {
        if (!file || !file.type.match(/image.*/)) {
            reject(new Error("Not an image file"));
            return;
        }

        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => {
            const img = new Image();
            img.onerror = reject;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Compress as webp, quality 0.7
                const dataUrl = canvas.toDataURL('image/webp', 0.7);
                resolve(dataUrl);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
};
