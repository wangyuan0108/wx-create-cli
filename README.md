
### 创建包
```
// 命令
wx-cli -pack 

// 运行
➜  water git:(develop) ✗ wx-cli -pack wPack

// 目录

├── wPack
```
### 创建页面
```
// 命令
wx-cli -pack wPack -p wPage

// 运行
➜  water git:(develop) ✗ wx-cli -pack wPack -p wPage

// 结果
ℹ page is ===========> wPage
✔ 操作成功
```

// 目录
wPack
└── pages
    └── wPage
        ├── index.js
        ├── index.json
        ├── index.wxml
        ├── index.wxss
        └── strings.js
### 同时创建包和页面

```
// 命令
wx-cli -pack wPack -p wPage

// 运行
➜  water git:(develop) ✗ wx-cli -pack wPack -p wPage

// 结果
ℹ page is ===========> wPage
✔ 操作成功


// 目录
wPack
└── pages
    └── wPage
        ├── index.js
        ├── index.json
        ├── index.wxml
        ├── index.wxss
        └── strings.js
```

### app.json添加分包路径
```
{
        "root": "wPack",
        "pages": [
            "pages/wPage/index"
        ]
    }
```

### 创建全局组件

```
// 命令
wx-cli -c wComponent

// 运行
➜  water git:(develop) wx-cli -c wComponent


// 结果
➜  water git:(develop) wx-cli -c wComponent
ℹ 创建全局公用组件
component is ===========> wComponent
```
### 创建分包组件

```
// 命令
wx-cli -pack wPack -c wComponent

```

### 创建分包页面组件

```
// 命令
wx-cli -pack wPack -p wPage -c wComponent
```