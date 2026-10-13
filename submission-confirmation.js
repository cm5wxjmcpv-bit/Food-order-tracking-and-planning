"use strict";
// Recovery reads never create another request. The backend is the sole authority
// on whether the atomic submission succeeded; availability is not proof.
window.MealSubmission = {
  async recover({ check, onChecking = () => {}, pause = ms => new Promise(resolve => setTimeout(resolve, ms)) }) {
    onChecking();
    for (let attempt = 0; attempt < 2; attempt++) {
      if (attempt) await pause(1000);
      try {
        const result = await check();
        if (result?.receipt) return result.receipt;
      } catch (error) {
        // A damaged saved record must not be treated as a missing receipt.
        if (error.code === "INTEGRITY") throw error;
      }
    }
    return null;
  },
  async confirm({ send, check, onChecking = () => {}, pause = ms => new Promise(resolve => setTimeout(resolve, ms)) }) {
    try {
      return await send();
    } catch (error) {
      if (!error.uncertain) throw error;
      const receipt = await this.recover({ check, onChecking, pause });
      if (receipt) return receipt;
      const uncertain = new Error("We could not confirm whether your request was saved. Please retry without changing the information; the same request ID will be used to prevent duplicates.");
      uncertain.uncertain = true;
      throw uncertain;
    }
  }
};
