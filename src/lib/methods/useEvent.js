import { createEventDispatcher } from "svelte";
import { get_current_component } from "svelte/internal";

export function useEvent() {
  const component = get_current_component();
  const svelteDispatch = createEventDispatcher();
  const cancel = () => {
    component.dispatchEvent &&
      component.dispatchEvent(new CustomEvent("cancel"));
  };
  return { cancel };
}
