"use strict";
// Recovery reads never create another request. The backend is the sole authority
// on whether the atomic submission succeeded; availability is not proof.
window.MealSubmission = {
  async confirm({ send, check, onChecking = () => {}, pause = ms => new Promise(resolve => setTimeout(resolve, ms)) }) {
    try {
      return await send();
    } catch (error) {
      if (!error.uncertain) throw error;
      onChecking();
      for (let attempt = 0; attempt < 2; attempt++) {
        if (attempt) await pause(1000);
        try {
          const result = await check();
          if (result?.receipt) return result.receipt;
        } catch (_) {
          // The read may also fail. Keep the original submission ID intact.
        }
      }
      const uncertain = new Error("We could not confirm whether your request was saved. Please retry without changing the information; the same request ID will be used to prevent duplicates.");
      uncertain.uncertain = true;
      throw uncertain;
    }
  }
};
