<svelte:options tag="confirm-dialog" />

<script>
  import { createEventDispatcher } from "svelte";
  export let delModel = true;
  export let message = "hello";
  const dispatch = createEventDispatcher();
</script>

<div class="modal {delModel ? 'is-active' : ''}">
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title" />
    </header>
    <section class="modal-card-body">
      <span class="is-size-3">{message}</span>
    </section>
    <footer class="modal-card-foot">
      <button
        class="button is-success is-small"
        on:click={() => dispatch("confirm")}>確定</button
      >
      <button class="button is-small" on:click={() => dispatch("cancel")}
        >取消</button
      >
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
