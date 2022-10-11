<svelte:options tag="e-file" />

<script>
  import "./icons/IconPaperclip.svelte";
  import "./icons/IconContentSave.svelte";
  import "./icons/IconCloseThick.svelte";
  import "./components/ConfirmDialog.svelte";

  export let guid;
  let delModel = false;
  let cd=null;

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
    <a href="#2" on:click={()=>cd.setTitle('this is test title')}>
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

<div class="modal {delModel ? 'is-active' : ''}">
  <confirm-dialog on:cancel={() => (delModel = false)} bind:this={cd}>
    <span slot="message" class="is-size-3">確定要刪除這個檔案嗎？</span>
  </confirm-dialog>
</div>

<style lang="scss">
  @import "bulma/sass/base/_all.sass";
  @import "bulma/sass/utilities/_all.sass";
  @import "bulma/sass/elements/icon.sass";
  @import "bulma/sass/elements/button.sass";
  @import "bulma/sass/helpers/color.sass";
  @import "bulma/sass/components/modal.sass";
  @import "bulma/sass/helpers/typography.sass";
</style>
