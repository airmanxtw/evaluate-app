<svelte:options tag="confirm-dialog" />

<script>
  import { useEvent } from "../methods/useEvent.js";
  const { cancel, confirm } = useEvent();
  let title = null;
  let delModel = false;
  let messageStyle = null;
  let message = null;
  let disableBtn = false;

  export function open(_title) {
    title = _title;
    delModel = true;
    disableBtn = false;
    message=null;
  }

  export function close() {
    delModel = false;
  }

  export function errorMsg(_message) {
    messageStyle = "has-text-danger";
    message = _message;
    disableBtn=false;
  }

  export function successMsg(_message) {
    messageStyle = "has-text-success";
    message = _message;
    disableBtn=false;
  }

  export function processMsg(_message) {
    messageStyle = "has-text-info";
    message = _message;
    disableBtn = true;
  }

  export let onlyclose = false;
</script>

<div class="modal {delModel ? 'is-active' : ''}">
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{title}</p>
    </header>
    <section class="modal-card-body">
      <slot name="message" />
    </section>
    <footer class="modal-card-foot">
      {#if !onlyclose}
        <button
          class="button is-success is-small"
          disabled={disableBtn}
          on:click={() => {
            confirm();
          }}>確定</button
        >
      {/if}
      <button
        class="button is-small"
        disabled={disableBtn}
        on:click={() => (delModel = false)}
      >
        {onlyclose ? "關閉" : "取消"}
      </button>
      <span class={messageStyle}>{!!message ? message : ""}</span>
    </footer>
  </div>
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
