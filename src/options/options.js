function initialize() {
    const options = {
        extensions: []
    };

    chrome.management.getAll(function (result) {
        console.log("result", result);
        const extensionList = document.getElementById("extensionList");

        let htmlStr = "";

        htmlStr += `<div class="header">${chrome.i18n.getMessage("extensionListHeader")}</div>`;

        for (let i in result) {
            /** @const extension ExtensionInfo https://developer.chrome.com/extensions/management#type-ExtensionInfo */
            const extension = result[i];
            if (extension.id) {
                htmlStr += `
                    <div class="extension">
                        <div class="name">${extension.name}</div>
                        <div class="details">
                            <div class="description">${chrome.i18n.getMessage("extensionListDescription")} ${extension.description}</div>
                            <div class="enabled">${chrome.i18n.getMessage("extensionListEnabled")} ${extension.enabled ? "yes" : "no"}</div>
                            <div class="id">${chrome.i18n.getMessage("extensionListId")}  <a href="${extension.homepageUrl}" target="_blank">${extension.id}</a></div>
                        </div>
                    </div>
                 `;
                options.extensions.push(extension.id);
            }
        }

        //TODO: do something with options
        //TODO: other settings to be continued (note: API???)

        extensionList.innerHTML = htmlStr;
    })
}

document.addEventListener('DOMContentLoaded', initialize);
