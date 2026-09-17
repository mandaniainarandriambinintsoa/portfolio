import { initBotId } from "botid/client/core";

initBotId({
  protect: [
    {
      path: "/api/lead-signal",
      method: "POST",
      advancedOptions: {
        checkLevel: "basic",
      },
    },
  ],
});
