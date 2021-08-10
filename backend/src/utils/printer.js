/**
 * 打印插件 License By http://eleadmin.com
 */
export default {
    /**
     * 打印当前页面
     * @param hide 需要隐藏的元素
     * @param horizontal 是否横向打印
     * @param iePreview  是否支持ie打印预览
     * @param blank  是否在新窗口打印
     * @param close  如果在新窗口打印，打印完是否关闭新窗口
     * @param margin  页间距
     * @param title  页面标题
     * @returns {Window}  打印的窗口对象
     */
    print({hide, horizontal, iePreview = true, blank, close, margin, title}) {
        if (close === undefined && blank && !this.isIE()) close = true;
        window.focus();  // 让当前窗口获取焦点
        this.addCommonCss();  // 加入核心样式
        // 打印方向控制
        let setElem = document.getElementById(this.pSetId);
        if (setElem) setElem.parentNode.removeChild(setElem);
        let sizeHtml = '', marginHtml = '';
        if (horizontal !== undefined) sizeHtml = `size: ${horizontal ? 'landscape' : 'portrait'};`;  // 打印方向
        if (margin === 0 || margin) marginHtml = `margin: ${margin};`;  // 页间距
        if (sizeHtml || marginHtml) {
            let elem = document.createElement('style');
            elem.id = this.pSetId;
            elem.setAttribute('type', 'text/css');
            elem.setAttribute('media', 'print');
            elem.innerHTML = `@page {${sizeHtml}${marginHtml}}`;
            document.body.appendChild(elem);
        }
        this.hideElem(hide);  // 隐藏打印时需要隐藏的内容
        // 打印
        let oldTitle = document.title;
        if (title) document.title = title;
        let pWin;
        if (blank) {  // 新窗口打印
            // 创建打印窗口
            pWin = window.open('', '_blank');
            pWin.focus();  // 让打印窗口获取焦点
            // 写入内容到打印窗口
            const pDoc = pWin.document;
            pDoc.open();
            const closeJs = close ? 'window.close();' : '';
            let html = '<!DOCTYPE html>' + document.getElementsByTagName('html')[0].outerHTML;
            html = html.replace(/<script[^>]+>/g, '');  // 去除js
            if (iePreview && this.isIE()) {
                if (!document.getElementById('WebBrowser')) {
                    html = html.replace(/<\/html>/, `${this.ieWebBrowser}</html>`);
                }
                let pjs = `<script>window.onload=function(){window.WebBrowser.ExecWB?(window.WebBrowser.ExecWB(7,1)):window.print();${closeJs}}</script>`;
                html = html.replace(/<\/html>/, `${pjs}</html>`);
            } else {
                let pjs = `<script>window.onload=function(){window.print();${closeJs}}</script>`;
                html = html.replace(/<\/html>/, `${pjs}</html>`);
            }
            pDoc.write(html);
            pDoc.close();
        } else {  // 当前窗口打印
            pWin = window;
            if (iePreview && this.isIE()) {
                if (!document.getElementById('WebBrowser')) {
                    let elem = document.createElement('object');
                    elem.id = 'WebBrowser';
                    elem.setAttribute('classid', 'clsid:8856F961-340A-11D0-A96B-00C04FD705A2');
                    elem.style.display = 'none';
                    document.body.appendChild(elem);
                }
                try {
                    window.WebBrowser.ExecWB(7, 1);
                } catch (e) {
                    console.error(e);
                    pWin.print();
                }
            } else {
                pWin.print();
            }
        }
        if (title) document.title = oldTitle;
        this.showElem(hide);  // 打印完恢复隐藏的内容
        return pWin;
    },
    /**
     * 打印任意内容
     * @param html  要打印的html内容
     * @param blank  是否在新窗口打印
     * @param close  如果在新窗口打印，打印完是否关闭新窗口
     * @param print  是否立即打印
     * @param horizontal  纸张是否是横向
     * @param iePreview  是否兼容ie打印预览
     * @param loading  是否显示加载层
     * @param before  打印开始的回调
     * @param done  打印完成的回调
     * @param margin  页间距
     * @param header  页眉
     * @param footer  页脚
     * @returns {Window}  打印的窗口对象
     */
    printHtml({html, blank, close, print = true, horizontal, iePreview = true, loading = true, before, done, margin, header, footer}) {
        if (blank === undefined && this.isIE() && iePreview) blank = true;
        if (close === undefined && blank && !this.isIE()) close = true;
        if (loading && !blank) this.showLoading();
        // 创建打印窗口
        let pWin, pDoc;
        if (blank) {  // 新窗口打印
            pWin = window.open('', '_blank');
            pDoc = pWin.document;
        } else {  // 当前窗口打印
            let pFrame = this.getPFrame();
            pWin = pFrame.contentWindow;
            pDoc = pFrame.contentDocument || pFrame.contentWindow.document;
        }
        pWin.focus();  // 让打印窗口获取焦点
        // 写入内容到打印窗口
        if (html) {
            if (header || footer) html = this.addHeaderFooter(html, header, footer);  // 添加页眉页脚
            html += `<style>${this.getCommonCss(true)}</style>`;  // 加入公共css
            html += this.getPrintHtml(horizontal, close, print, iePreview, before, done, margin);
            pDoc.open();
            pDoc.write(`<!DOCTYPE html><html lang="zh">${html}</html>`);  // 写入html
            pDoc.close();
        }
        return pWin;
    },
    /**
     * 分页打印
     * @param htmls  要打印的内容
     * @param horizontal  纸张是否是横向
     * @param style  打印的自定义样式
     * @param padding  每一页的边距
     * @param blank  是否在新窗口打印
     * @param close  如果在新窗口打印，打印完是否关闭新窗口
     * @param print  是否立即打印
     * @param width  每一页宽度
     * @param height  每一页高度
     * @param iePreview  是否兼容ie打印预览
     * @param isDebug  是否开启调试模式
     * @param loading  是否显示加载层
     * @param before  打印开始的回调
     * @param done  打印完成的回调
     * @param margin  页间距
     * @param header  页眉
     * @param footer  页脚
     * @param title  页面标题
     * @returns {Window} 打印的窗口对象
     */
    printPage({htmls, horizontal, style, padding, blank, close, print = true, width, height, iePreview = true, isDebug, loading = true, before, done, margin, header, footer, title}) {
        if (blank === undefined && this.isIE() && iePreview) blank = true;
        if (close === undefined && blank && !this.isIE()) close = true;
        if (loading && !blank) this.showLoading();
        // 创建打印窗口
        let pWin, pDoc;
        if (blank) {  // 新窗口打印
            pWin = window.open('', '_blank');
            pDoc = pWin.document;
        } else {  // 当前窗口打印
            let pFrame = this.getPFrame();
            pWin = pFrame.contentWindow;
            pDoc = pFrame.contentDocument || pFrame.contentWindow.document;
        }
        pWin.focus();  // 让打印窗口获取焦点
        // 拼接打印内容
        let html = `<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8"><title>${title || ''}</title>`;
        html += this.getPageCss(padding, width, height) + (style || '') + '</head><body>';  // 控制分页的css
        // 拼接分页内容
        let contentHtml = '';
        if (htmls) {
            contentHtml += `<div class="ele-printer-page ${isDebug ? 'ele-printer-debug' : ''}">`;
            contentHtml += htmls.map(h => `<div class="ele-printer-page-item">${h}</div>`).join('');
            contentHtml += '</div>';
        }
        if (header || footer) html += this.addHeaderFooter(contentHtml, header, footer);  // 添加页眉页脚
        else html += contentHtml;
        html += this.getPrintHtml(horizontal, close, print, iePreview, before, done, margin);
        html += '</body></html>';
        pDoc.open();
        pDoc.write(html);  // 写入打印内容
        pDoc.close();
        return pWin;
    },
    /* 生成控制打印的html */
    getPrintHtml(horizontal, close, print, iePreview, before, done, margin) {
        let {beforeJs, doneJs} = this.addCallback(before, done);
        let html = '', sizeHtml = '', marginHtml = '';
        if (horizontal !== undefined) sizeHtml = `size: ${horizontal ? 'landscape' : 'portrait'};`;  // 打印方向
        if (margin === 0 || margin) marginHtml = `margin: ${margin};`;  // 页间距
        html += `<style type="text/css" media="print" id="${this.pSetId}">@page{${sizeHtml}${marginHtml}</style>`;
        // 兼容ie打印预览
        const closeJs = (close ? 'window.close();' : '') + doneJs;
        const hideLoadJs = `${beforeJs};parent.hideElePrinterLoading&&parent.hideElePrinterLoading();`;
        if (iePreview && this.isIE()) {
            html += this.ieWebBrowser;
            if (print) html += `<script>window.onload=function(){${hideLoadJs}window.WebBrowser.ExecWB?(window.WebBrowser.ExecWB(7,1)):window.print();${closeJs}}</script>`;
        } else if (print) {
            html += `<script>window.onload=function(){${hideLoadJs}window.print();${closeJs}}</script>`;
        }
        return html;
    },
    /* 增加页眉页脚 */
    addHeaderFooter(html, header, footer) {
        let result = '<table class="ele-printer-table-page">';
        if (header) result += `<thead><tr><td>${header}</td></tr></thead>`;
        result += `<tbody><tr><td>${html}</td></tr></tbody>`;
        if (footer) result += `<tfoot><tr><td>${footer}</td></tr></tfoot>`;
        return result + '</table>';
    },
    /* 隐藏元素 */
    hideElem(elems) {
        document.getElementsByClassName(this.hideClass).forEach(elem => {
            elem.classList.add(this.printingClass);
        });
        if (!elems) return;
        if (!Array.isArray(elems)) elems = [elems];
        elems.forEach(elem => {
            if (typeof elem === 'string') elem = document.querySelector(elem);
            elem.classList.add(this.hideClass);
            elem.classList.add(this.printingClass);
        });
    },
    /* 取消隐藏 */
    showElem(elems) {
        document.getElementsByClassName(this.hideClass).forEach(elem => {
            elem.classList.remove(this.printingClass);
        });
        if (!elems) return;
        if (!Array.isArray(elems)) elems = [elems];
        elems.forEach(elem => {
            if (typeof elem === 'string') elem = document.querySelector(elem);
            elem.classList.remove(this.hideClass);
            elem.classList.remove(this.printingClass);
        });
    },
    /**
     * 获取打印核心样式
     * @param isPrinting  是否已开始打印
     * @returns {String}
     */
    getCommonCss(isPrinting) {
        return `
        .${this.hideClass}.${this.printingClass} {
            visibility: hidden !important;
        }
        .${this.hideClass} {
            ${isPrinting ? 'visibility: hidden !important;' : ''}
        }
        .${this.hideClass}.${this.printingClass}.${this.hideNoneClass},
        .${this.hideClass}.${this.hideNoneClass}${isPrinting ? '' : '-no'} {
            display: none !important;
        }
        /* 表格样式 */
        .ele-printer-table {
            width: 100%;
            border-collapse: collapse;
            border: none;
        }
        .ele-printer-table td, .ele-printer-table th {
            color: #333;
            padding: 9px 15px;
            border: 1px solid #333;
            word-break: break-all;
        }
        /* loading样式 */
        #ele-printer-loading {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: hsla(0,0%,100%,.9);
            z-index: 19000000 ;
        }
        #ele-printer-loading:after {
            content: "";
            width: 40px;
            height: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -20px auto auto -20px;
            border: 2px solid #3296FA;
            border-right-color: transparent;
            border-bottom-color: transparent;
            border-radius: 50%;
            animation: ele-printer-loading-anim .8s linear  infinite;
        }
        @keyframes ele-printer-loading-anim {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        /* 带页眉页脚页面样式 */
        .ele-printer-table-page {
            width: 100%;
        }
        `;
    },
    /**
     * 获取分页打印的样式
     * @param padding  每一页边距
     * @param width  每一页宽度
     * @param height  每一页高度
     * @returns {String}
     */
    getPageCss(padding, width, height) {
        return `
        <style>
            body { margin: 0 !important; }
            /* 自定义边距竖屏样式 */
            .ele-printer-page .ele-printer-page-item {
                width: ${width || 'auto'};
                height: ${height || 'auto'};
                padding: ${padding || '0'};
                page-break-after: always !important;
                box-sizing: border-box !important;
                border: none !important;
                position: relative;
            }
            /* 调试模式样式 */
            .ele-printer-page.ele-printer-debug .ele-printer-page-item {
                border: 1px solid red !important;
            }
            /* 核心样式 */
            ${this.getCommonCss(true)}
        </style>
        `;
    },
    /**
     * 打印pdf
     * @param url  pdf链接地址
     * @param arraybuffer  直接指定arraybuffer数据
     * @param error  错误回调
     * @param loading  是否显示加载层
     * @param before  打印开始的回调
     * @param done  打印完成的回调
     * @returns {Window} 打印的窗口对象
     */
    printPdf({url, arraybuffer, error, loading = true, before, done}) {
        if (loading) this.showLoading();
        let pWin;
        let pFrame = this.getPFrame();
        pWin = pFrame.contentWindow;
        pFrame.onload = () => {
            if (!pFrame.getAttribute('src')) return;
            pFrame.focus();
            before && before();
            pWin.print();
            this.hideLoading();
            done && done();
        };

        // 开始打印
        function doPrint(hideLoading) {
            let localPdf = new window.Blob([arraybuffer], {type: 'application/pdf'});
            // 兼容IE
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(localPdf, 'print.pdf');
                hideLoading();
            } else {
                localPdf = window.URL.createObjectURL(localPdf);
                pFrame.setAttribute('src', localPdf);
            }
        }

        // 请求pdf数据
        if (!arraybuffer) {
            let req = new window.XMLHttpRequest();
            req.open('GET', url, true);
            req.responseType = 'arraybuffer';
            req.onload = () => {
                if ([200, 201].indexOf(req.status) === -1) return error && error(req.status, req.statusText);
                arraybuffer = req.response;
                doPrint(() => {
                    this.hideLoading();
                });
            };
            req.send();
        } else {
            doPrint(() => {
                this.hideLoading();
            });
        }
        return pWin;
    },
    /* 获取隐藏的打印iframe */
    getPFrame() {
        let pFrame = document.getElementById(this.pFrameId);
        if (pFrame) pFrame.parentNode.removeChild(pFrame);
        let elem = document.createElement('iframe');
        elem.id = this.pFrameId;
        elem.style.width = 0;
        elem.style.height = 0;
        elem.style.position = 'fixed';
        elem.style.visibility = 'hidden';
        document.body.appendChild(elem);
        pFrame = document.getElementById(this.pFrameId);
        pFrame.focus();
        return pFrame;
    },
    /**
     * 生成表格html
     * @param data  数据
     * @param cols  列配置
     * @returns {string}
     */
    makeTable(data, cols) {
        // 恢复cols参数初始状态
        cols.forEach(col => {
            col.forEach(c => {
                c.INIT_OK = undefined;
                c.key = undefined;
                c.colGroup = undefined;
                c.HAS_PARENT = undefined;
                c.parentKey = undefined;
                c.PARENT_COL_INDEX = undefined;
            });
        });

        // cols转为嵌套结构
        let colArrays = [], colIndex = 0;
        for (let i1 = 0; i1 < cols.length; i1++) {
            let item1 = cols[i1];
            for (let i2 = 0; i2 < item1.length; i2++) {
                let item2 = item1[i2];
                if (!item2) {
                    item1.splice(i2, 1);
                    continue;
                }
                // 合并单元格处理
                item2.key = i1 + '-' + i2;
                let CHILD_COLS = undefined;
                if (item2.colGroup || item2.colspan > 1) {
                    item2.colGroup = true;
                    CHILD_COLS = [];
                    colIndex++;
                    let childIndex = 0;
                    for (let i22 = 0; i22 < cols[i1 + 1].length; i22++) {
                        let item22 = Object.assign({}, cols[i1 + 1][i22]);
                        if (item22.HAS_PARENT || (childIndex > 1 && childIndex == item2.colspan)) {
                            cols[i1 + 1][i22] = item22;
                            continue;
                        }
                        item22.HAS_PARENT = true;
                        item22.parentKey = i1 + '-' + i2;
                        item22.key = (i1 + 1) + '-' + i22;
                        item22.PARENT_COL_INDEX = colIndex;
                        CHILD_COLS.push(item22);
                        childIndex = childIndex + parseInt(item22.colspan > 1 ? item22.colspan : 1);
                        cols[i1 + 1][i22] = item22;
                    }
                }
                item2.CHILD_COLS = CHILD_COLS;
                if (!item2.PARENT_COL_INDEX) colArrays.push(item2);
                cols[i1][i2] = item2;
            }
        }

        // 遍历嵌套结构cols的方法
        function eachCols(callback, obj) {
            if (!obj) obj = colArrays;
            for (let i = 0; i < obj.length; i++) {
                let item = obj[i];
                callback && callback(i, item);
                if (item.CHILD_COLS) eachCols(callback, item.CHILD_COLS);
            }
        }

        // 计算表格宽度
        let width = 1, needSetWidth = true, colgroup = [];
        eachCols((i, c) => {
            if (c.colGroup) return;
            colgroup.push('<col');
            if (c.width) colgroup.push(` width="${c.width}"`);
            colgroup.push('/>');
            if (c.width && !/\d+%$/.test(width)) width += (c.width + 1);
            else needSetWidth = false;
        });
        width += 'px';

        // 生成html
        let html = `<table style="width:${needSetWidth ? width : '100%'};" class="ele-printer-table">`;
        html += `<colgroup>${colgroup.join('')}</colgroup>`;

        // 表头
        let trs = cols.map(col => {
            let ths = col.map(c => `<th colspan="${c.colspan || 1}" rowspan="${c.rowspan || 1}" 
                align="${c.thAlign || c.align || 'left'}" style="${c.thStyle}">${c.title || ''}</th>`);
            return `<tr>${ths.join('')}</tr>`;
        });
        html += `<thead>${trs.join('')}</thead>`;

        // 主体
        html += '<tbody>';
        data.forEach((d, index) => {
            html += '<tr>';
            let colIndex = 0;
            eachCols((i, c) => {
                if (c.colGroup) return;
                let content = c.templet ? c.templet(d, index, colIndex) : d[c.field];
                html += `<td align="${c.align || 'left'}"  style="${c.style}">${content}</td>`;
                colIndex++;
            });
            html += '</tr>';
        });
        return html + '</tbody></table>';
    },
    /* 加入核心样式 */
    addCommonCss() {
        if (!document.getElementById(this.pStyleId)) {
            let elem = document.createElement('style');
            elem.id = this.pStyleId;
            elem.setAttribute('type', 'text/css');
            elem.innerHTML = this.getCommonCss();
            document.body.appendChild(elem);
        }
    },
    /* 检查并补全隐藏元素的class */
    checkHideClass() {
        document.getElementsByClassName(this.hideNoneClass).forEach(elem => {
            elem.classList.add(this.hideClass);
        });
    },
    /* 显示加载层 */
    showLoading() {
        this.addCommonCss();
        let elem = document.getElementById('ele-printer-loading');
        if (!elem) {
            elem = document.createElement('div');
            elem.id = 'ele-printer-loading';
            document.body.appendChild(elem);
        }
        elem.style.display = 'block';
        window.hideElePrinterLoading = () => {
            this.hideLoading();
        };
        return elem;
    },
    /* 关闭加载层 */
    hideLoading() {
        setTimeout(() => {
            let elem = document.getElementById('ele-printer-loading');
            if (elem) elem.style.display = 'none';
        }, 1500);
    },
    /* 添加回调监听 */
    addCallback(before, done) {
        let taskId = 'p' + this.uuid();
        if (!window.elePrinterBefore) window.elePrinterBefore = {};
        if (!window.elePrinterDone) window.elePrinterDone = {};
        if (before) window.elePrinterBefore[taskId] = before;
        if (done) window.elePrinterDone[taskId] = done;
        let beforeJs = `;parent.elePrinterBefore&&parent.elePrinterBefore.${taskId}&&parent.elePrinterBefore.${taskId}();`;
        let doneJs = `;parent.elePrinterDone&&parent.elePrinterDone.${taskId}&&parent.elePrinterDone.${taskId}();`;
        return {taskId, beforeJs, doneJs};
    },
    /* 生成随机id */
    uuid(length = 8) {
        const num = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let str = 'p_';
        for (let i = 0; i < length; i++) str += num.charAt(Math.floor(Math.random() * num.length));
        return str;
    },
    /* 是否是ie */
    isIE() {
        return !!window.ActiveXObject || 'ActiveXObject' in window;
    },
    /* 是否是Edge */
    isEdge() {
        return navigator.userAgent.indexOf('Edge') !== -1;
    },
    /* 是否是Firefox */
    isFirefox() {
        return navigator.userAgent.indexOf('Firefox') !== -1;
    },
    // 支持ie打印预览控件
    ieWebBrowser: '<object id="WebBrowser" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" width="0" height="0"></object>',
    pFrameId: 'ele-printer-frame',  // 当前窗口打印隐藏的iframe的id
    pStyleId: 'ele-printer-style',  // 打印核心样式的style的id
    pSetId: 'ele-printer-set',  // 打印方向设置的style的id
    printingClass: 'ele-printer-printing',  // 正在打印标识的class
    hideClass: 'ele-printer-hide',  // 打印时隐藏的class
    hideNoneClass: 'ele-printer-hide-none'  // 打印时隐藏不占位置的class
}