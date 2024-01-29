# 关闭 Git 拉取代码时自动转换换行符

罪魁祸首是`git`的一个配置属性：`core.autocrlf `

由于历史原因，`windows`下和`linux`下的文本文件的换行符不一致。

| Windows | Linux/Mac | Old Mac(pre-OSX |
| ------- | --------- | --------------- |
| CRLF    | LF        | CR              |
| '\n\r'  | '\n'      | '\r'            |

## **最佳实践**

如果你用的是`windows`，文件编码是`UTF-8`且包含中文，最好全局将`autocrlf`设置为`false`。

```bash
git config --global core.autocrlf false
```

注意：`git`全局配置之后，你需要重新拉取代码。
