export function preloadImages(urls, onProgress) {
  return new Promise((resolve) => {
    if (!urls || urls.length === 0) {
      onProgress && onProgress(1);
      resolve([]);
      return;
    }

    let loaded = 0;
    const results = [];

    urls.forEach((url, i) => {
      const img = new Image();
      img.onload = () => {
        loaded += 1;
        results[i] = { url, success: true };
        onProgress && onProgress(loaded / urls.length);
        if (loaded === urls.length) resolve(results);
      };
      img.onerror = () => {
        loaded += 1;
        results[i] = { url, success: false };
        onProgress && onProgress(loaded / urls.length);
        if (loaded === urls.length) resolve(results);
      };
      img.src = url;
    });
  });
}
