chrome.runtime.onInstalled.addListener(function() {
  // Show the extension's icon as active when these conditions are satisfied
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    const actions = [new chrome.declarativeContent.ShowPageAction()];

    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostSuffix: ".ultimate-guitar.com"},
            css: ["pre"]
          })
        ],
        actions: actions
      }
    ]);
  });
});

/**
 * Add listener for context menu clicks. This must be done outside the
 * onInstalled hook. Otherwise they will be registered only when the extension
 * or Chrome is updated.
 */
chrome.pageAction.onClicked.addListener((info, tab) => {
  chrome.tabs.query({active: true, currentWindow: true}, ([activeTab]) => {
    chrome.tabs.executeScript(activeTab.id, {
      file: "src/contentScripts/tabReader.js"
    });
  });
});
