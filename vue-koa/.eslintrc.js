// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        "sourceType": "module"
    },
    env: {
        browser: true,
    },
    extends: ['eslint-config-alloy/vue'],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        toast: false,
        Vue: false,
        fullHeight: true,
        changeTitle: false,
        envStr: false
    },
    // add your custom rules here
    rules: {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 取消分号
        'semi': ['error', 'never'],
        // 关闭强制使用"==="
        'eqeqeq': 'off',
        // 允许使用for-in
        'guard-for-in': 'off'
    }
}
