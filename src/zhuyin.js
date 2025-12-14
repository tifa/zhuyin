function updateZhuyinFont(enabled) {
    let existingStyle = document.getElementById('zhuyin-style');
    if (existingStyle) {
        existingStyle.remove();
    }

    if (!enabled) {
        console.log('Zhuyin extension disabled');
        return;
    }

    const fontFace = new FontFace(
        'ZhuyinKai',
        `url(${chrome.runtime.getURL('fonts/BpmfGenSenRounded/BpmfGenSenRounded-R.ttf')})`
    );

    fontFace.load().then(loadedFace => {
        document.fonts.add(loadedFace);
        const style = document.createElement('style');
        style.id = 'zhuyin-style';
        style.textContent = `
        html, body, * {
            font-family: 'ZhuyinKai' !important;
        }
        `;
        document.head.appendChild(style);
        console.log('ZhuyinKai font applied globally.');
    }).catch(err => {
        console.error('Failed to load font:', err);
    });
}

chrome.storage.sync.get(['enabled'], data => {
    const enabled = data.enabled === true;
    updateZhuyinFont(enabled);
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && 'enabled' in changes) {
        updateZhuyinFont(changes.enabled.newValue);
    }
});
