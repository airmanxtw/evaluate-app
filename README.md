# Upload, delete and download files - svelte custom element

## [Demo](https://airmanxtw.github.io/evaluate-app/)

## Usage
```html 
<script type="module" crossorigin src="evaluate-app.0.1.0.js"></script>
<body>
    <e-file guid="12" filename="a.pdf" accept=".jpg,.jpeg,.pdf" limit="2097152">
      <ul>
        <li>請多加利用RAR及ZIP等壓縮軟體,以節省資料庫空間。</li>
        <li>上傳檔案大小限制1M。</li>
        <li style="color: red">
          系統不保證任何檔案或資料於傳送過程均係可靠且正確無誤，亦不保證所儲存或所傳送之檔案或資料之安全性、可靠性、完整性、正確性及不會斷線和出錯等。若有重要檔案,請老師自行妥善保存檔案。
        </li>
      </ul>
    </e-file>   

    <script>
      const efiles = document.querySelectorAll("e-file");
      efiles.forEach((efile) => {

        efile.addEventListener("delFile", (res) => {
          res.detail.deleting();
          setTimeout(() => {
            //res.detail.success();
            res.detail.error("存取拒絕");
            res.detail.finally();
          }, 1000 * 3);
        });

        efile.addEventListener("download", (res) => {
          const url = `https://xxxx.xxxx.edu.tw/app?guid=${res.detail.guid}`;
          res.detail.downloadUrl(url);
        });

        efile.addEventListener("upload", (res) => {
          res.detail.uploading();
          setTimeout(() => {
            //res.detail.success();
            res.detail.error("網路出問題");
            res.detail.finally();
          }, 1000 * 3);
        });
      });
    </script>
</body>
  ```