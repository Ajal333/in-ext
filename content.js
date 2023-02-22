(async () => {
  function connectUser(child, count) {
    setTimeout(async () => {
      const connectBtn = child.getElementsByClassName("artdeco-button")[0];
      const { status } = await chrome.storage.session.get(["status"]);
      if (status) {
        if (
          connectBtn.getElementsByTagName("span")[0].innerText.toLowerCase() !==
          "connect"
        ) {
          chrome.runtime.sendMessage({
            count,
          });
        } else {
          connectBtn.innerHTML = "Invite sent";
          //   connectBtn.click();
          //   const modal = document.getElementById("artdeco-modal-outlet");
          //   const sendBtn = modal.getElementById("artdeco-button");
          //   sendBtn.click();
          chrome.runtime.sendMessage({
            count,
          });
        }
      }
    }, count * 1000);
  }

  // Get the dom element containing the list of user search results
  const ulList = document.getElementsByClassName(
    "reusable-search__entity-result-list list-style-none"
  )[0];
  const list = ulList.getElementsByTagName("li");
  if (ulList.children.length === 0) {
    console.log("No search results found.");
    chrome.runtime.sendMessage({
      count: 0,
    });
  } else {
    await chrome.storage.session.set({ count: 1 });
    Array.from(list).forEach(async (child, count) => {
      connectUser(child, count + 1);
    });
  }
})();
