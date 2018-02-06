const options = {
    extensions: []
};

function getMessage(message) {
    return chrome.i18n.getMessage(message);
}

function renderExtensions() {
    const extensionList = document.getElementById("extensionList");

    let htmlStr = "";

    htmlStr += `<div class="header">${getMessage("extensionListHeader")}</div>`;

    for (let i in options.extensions) {
        /** @const extension ExtensionInfo https://developer.chrome.com/extensions/management#type-ExtensionInfo */
        const extension = options.extensions[i];
        if (extension.id) {
            htmlStr += `
                    <div class="extension">
                        <div class="name">${extension.name}</div>
                        <div class="details">
                            <div class="description">${getMessage("extensionListDescription")} ${extension.description}</div>
                            <div class="enabled">${getMessage("extensionListEnabled")} ${extension.enabled ? "yes" : "no"}</div>
                            <div class="type">${getMessage("extensionListType")} ${extension.type}</div>
                            <div class="id">${getMessage("extensionListId")}  <a href="${extension.homepageUrl}" target="_blank">${extension.id}</a></div>
                        </div>
                    </div>
                 `;
        }
    }

    extensionList.innerHTML = htmlStr;
}

function getExtensions() {
    return new Promise(function (resolve, reject) {
        chrome.management.getAll(function (extensions) {
            console.log("result", extensions);

            extensions.sort((a, b) => {
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;
            });

            for (let i in extensions) {
                /** @const extension ExtensionInfo https://developer.chrome.com/extensions/management#type-ExtensionInfo */
                const extension = extensions[i];
                options.extensions.push(extension);
            }

            resolve();
        });
    });
}

function initialize() {
    //TODO: other settings to be continued (note: API???)
    getExtensions()
        .then(function () {
            renderExtensions();
            //TODO: do something with options
        });
}

document.addEventListener('DOMContentLoaded', initialize);
