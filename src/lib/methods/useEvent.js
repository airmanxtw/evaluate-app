import { createEventDispatcher } from "svelte";
import { get_current_component } from "svelte/internal";

export function useEvent() {
  const component = get_current_component();
  const svelteDispatch = createEventDispatcher();

  /**
   * 取消事件
   * @date 2022-10-12
   * @returns {any}
   */
  const cancel = () => {
    component.dispatchEvent &&
      component.dispatchEvent(new CustomEvent("cancel"));
  };

  /**
   * 確認事件
   * @date 2022-10-12
   * @returns {any}
   */
  const confirm = () => {
    component.dispatchEvent &&
      component.dispatchEvent(new CustomEvent("confirm"));
  };

  /**
   * 刪除檔案
   * @date 2022-10-12
   * @param {any} guid
   * @returns {any}
   */
  const delFile = (
    guid,
    { deletingCallback, successCallback, errorCallback, finallyCallbcak }
  ) => {
    component.dispatchEvent &&
      component.dispatchEvent(
        new CustomEvent("delFile", {
          detail: {
            guid,
            deleting() {
              deletingCallback();
            },
            success() {
              successCallback();
            },
            error(msg) {
              errorCallback(msg);
            },
            finally() {
              finallyCallbcak();
            },
          },
        })
      );
  };

  /**
   * 下載事件
   * @date 2022-10-12
   * @param {any} gid
   * @param {any} callback
   * @returns {any}
   */
  const download = (gid, callback) => {
    component.dispatchEvent &&
      component.dispatchEvent(
        new CustomEvent("download", {
          detail: {
            guid: gid,
            downloadUrl(url) {
              callback(url);
            },
          },
        })
      );
  };

  const upload = (
    file,
    { uploadingCallback, successCallback, errorCallback, finallyCallbcak }
  ) => {
    component.dispatchEvent &&
      component.dispatchEvent(
        new CustomEvent("upload", {
          detail: {
            file,
            uploading() {
              uploadingCallback();
            },
            success(gid, fname) {
              successCallback(gid, fname);
            },
            error(msg) {
              errorCallback(msg);
            },
            finally() {
              finallyCallbcak();
            },
          },
        })
      );
  };

  return { cancel, confirm, delFile, download, upload };
}
