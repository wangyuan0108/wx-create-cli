
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

### 自定义页面和组件模版

在项目根目录下建立`template`文件夹，其中包括页面的模版文件夹`page`和组件的模版文件夹`comp`,文件夹里面的文件就是自定义的模版，会按模版生成自定义的页面和组件。文件目录如下：
```
template
├── comp
│   ├── index.js
│   ├── index.json
│   ├── index.wxml
│   └── index.wxss
└── page
    ├── index.js
    ├── index.json
    ├── index.wxml
    └── index.wxss
```
你可以自定义文件，如果根目录没有自定义模版，则生成默认的页面。