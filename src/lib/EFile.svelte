<svelte:options tag="e-file" />

<script>
  import "./icons/IconPaperclip.svelte";
  import "./icons/IconContentSave.svelte";
  import "./icons/IconCloseThick.svelte";
  import "./components/ConfirmDialog.svelte";
  
  export let guid;
  let delModel = false;

  $: nofile = !!guid ? false : true;
</script>

<div>
  {#if !nofile}
    <span class="icon has-text-danger">
      <a href="#1">
        <icon-paperclip />
      </a>
    </span>
  {/if}

  <span class="icon">
    <a href="#2">
      <icon-content-save />
    </a>
  </span>

  {#if !nofile}
    <span class="icon">
      <a href="#3" on:click={() => (delModel = true)}>
        <icon-close-thick />
      </a>
    </span>
  {/if}
</div>

<confirm-dialog></confirm-dialog>

<!-- <div class="modal {delModel ? 'is-active' : ''}">
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title" />
    </header>
    <section class="modal-card-body">
        <span class="is-size-3">確定要刪除這個檔案嗎?</span>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success is-small">Save changes</button>
      <button class="button is-small">Cancel</button>
    </footer>
  </div>  
</div> -->
<style lang="scss">
  @import "bulma/sass/base/_all.sass";
  @import "bulma/sass/utilities/_all.sass";
  @import "bulma/sass/elements/icon.sass";
  @import "bulma/sass/elements/button.sass";
  @import "bulma/sass/helpers/color.sass";
  @import "bulma/sass/components/modal.sass";
  @import "bulma/sass/helpers/typography.sass";
</style>
