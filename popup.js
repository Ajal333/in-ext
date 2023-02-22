(() => {
  //   const connectBtn = document.getElementById("connectBtn");
  const count = document.getElementById("count");
  const fill = document.querySelectorAll(".mask.full")[0];
  const progressBar1 = document.getElementById("progressBar1");
  const progressBar2 = document.getElementById("progressBar2");
  const stopBtn = document.getElementById("stopBtn");

  const injectScript = async () => {
    await chrome.storage.session.set({ status: true });
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
      },
      files: ["content.js"],
    });
  };

  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    count.innerHTML = `Count: ${msg.count}`;
    const percent = msg.count * 18;
    fill.style["transform"] = `rotate(${percent}deg)`;
    progressBar1.style["transform"] = `rotate(${percent}deg)`;
    progressBar2.style["transform"] = `rotate(${percent}deg)`;
  });

  stopBtn.addEventListener("click", async () => {
    await chrome.storage.session.set({ status: false });
    stopBtn.innerHTML = "Stopped";
  });

  setTimeout(() => {
    injectScript();
  }, 5000);
})();
