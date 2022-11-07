const $siteList = $('.favorites_content>ul');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn/' },
    { logo: 'B', url: 'https://www.bilibili.com/' },
    { logo: 'G', url: 'https://github.com/' }
];
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '').replace(/\/.*/, '');
}
const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $Li = $(`<li>
            <div class="site">
                <div class="logo">
                  ${simplifyUrl(node.url)[0].toUpperCase()}
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close" >
                  <button type="submit">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-close"></use>
                    </svg>
                  </button>
                </div>
            </div>
    </li>`).insertBefore($lastLi);
        $Li.on('click', () => {
            window.open(node.url);
        });
        $Li.on('click', '.close', (e) => {
            e.stopPropagation();//阻止冒泡
            hashMap.splice(index, 1);
            render();
        });
    });
}
render();
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入想要添加的网址：');
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        };
        console.log(url);
        hashMap.push({
            logo: url[0],
            logoType: 'text',
            url: url
        });
        render();
    });
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    window.localStorage.setItem('x', string)
}