<svelte:options tag="e-file" />

<script>
  import "./icons/IconPaperclip.svelte";
  import "./icons/IconContentSave.svelte";
  import "./icons/IconCloseThick.svelte";
  import "./components/ConfirmDialog.svelte";
  import { useEvent } from "./methods/useEvent.js";

  const { delFile, download, upload } = useEvent();

  export let guid;
  export let filename;
  export let accept = ".";
  export let limit = 1024 * 1024 * 1;

  let downloadUrl;

  let delModel = false;
  let cd = null;
  let down = null;
  let up = null;
  let selectFile = null;
  let message = null;

  $: nofile = !!guid ? false : true;
  $: limitSize = typeof limit === "string" ? parseInt(limit) : limit;
</script>

<div>
  {#if !nofile}
    <span class="icon has-text-danger">
      <a
        href="#1"
        on:click={() =>
          download(guid, (url) => {
            downloadUrl = url;
            down.open("下載檔案");
          })}
      >
        <icon-paperclip />
      </a>
    </span>
  {/if}

  <span class="icon">
    <a href="#2" on:click={() => up.open("上傳檔案")}>
      <icon-content-save />
    </a>
  </span>

  {#if !nofile}
    <span class="icon">
      <a href="#3" on:click={() => cd.open("刪除檔案")}>
        <icon-close-thick />
      </a>
    </span>
  {/if}
</div>

<confirm-dialog
  on:confirm={() =>
    delFile(guid, {
      deletingCallback() {
        cd.processMsg("檔案刪除中...");
      },
      successCallback() {
        cd.close();
      },
      errorCallback(msg) {
        cd.errorMsg(msg);
      },
      finallyCallbcak() {},
    })}
  bind:this={cd}
>
  <span slot="message" class="is-size-3">確定要刪除這個檔案{filename}嗎？</span>
</confirm-dialog>

<confirm-dialog bind:this={down} onlyclose>
  <div slot="message">
    <div>
      <a class="is-size-3" target="_blank" href={downloadUrl}>{filename}</a>
    </div>
  </div>
</confirm-dialog>

<confirm-dialog
  on:confirm={() => {
    if (!!selectFile) {
      if (selectFile.size <= limitSize) {
        upload(selectFile, {
          uploadingCallback() {
            up.processMsg("檔案上傳中...");
          },
          successCallback(_guid, _fname) {
            guid = _guid;
            filename = _fname;
            up.close();
          },
          errorCallback(msg) {
            up.errorMsg(msg);
          },
          finallyCallbcak() {},
        });
      } else {
        up.errorMsg("檔案大小超過系統限制");
      }
    } else {
      up.errorMsg("尚未選擇檔案");
    }
  }}
  bind:this={up}
>
  <div slot="message">
    <input
      type="file"
      {accept}
      on:change={(e) => {
        selectFile = e.target.files.length > 0 ? e.target.files[0] : null;
      }}
    />
    <div>
      <slot />
    </div>
  </div>
</confirm-dialog>

<style lang="scss">
  @import "bulma/sass/base/_all.sass";
  @import "bulma/sass/utilities/_all.sass";
  @import "bulma/sass/elements/icon.sass";
  @import "bulma/sass/elements/button.sass";
  @import "bulma/sass/helpers/color.sass";
  @import "bulma/sass/components/modal.sass";
  @import "bulma/sass/helpers/typography.sass";
</style>
