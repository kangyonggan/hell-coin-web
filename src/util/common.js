import Message from "element-plus/es/el-message";

let common = {}

/**
 * 设置浏览器标题
 *
 * @param title
 */
common.title = function (title) {
    title = title ? title + ' - Bzone': 'Bzone'
    window.document.title = title
}


/**
 * 消息队列。用于过滤重复的message
 *
 * @type {Array}
 */
const messageQueue = [];

/**
 * 成功消息
 *
 * @param msg
 */
common.success = function success(msg) {
    message('success', msg);
}

/**
 * 警告消息
 *
 * @param msg
 */
common.warning = function warning(msg) {
    message('warning', msg);
}

/**
 * 错误消息
 *
 * @param msg
 */
common.error = function error(msg) {
    message('error', msg);
}

/**
 * 消息
 *
 * @param type
 * @param msg
 */
function message(type, msg) {
    // 消息去重
    if (messageQueue.includes(msg)) {
        return;
    }
    // 消息放入队列
    messageQueue.push(msg);
    Message({
        showClose: true,
        message: msg,
        type: type,
        onClose: function () {
            // 从队列移除消息
            messageQueue.splice(messageQueue.indexOf(msg), 1);
        }
    });
}

export default common