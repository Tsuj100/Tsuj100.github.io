# 修改 winget 源

## 第一步：删除微软提供的 winget 源

```bash
winget source list
```

命令行列出了 winget 更新源时访问的服务器。

```
名称        参数
---------------------------------------------------------
msstore     https://storeedgefd.dsx.mp.microsoft.com/v9.0
winget      https://cdn.winget.microsoft.com/cache
```

执行删除源命令

```bash
winget source remove --name winget
winget source remove --name msstore
```

## 第二步：添加 winget 镜像源

中科大镜像：https://mirrors.ustc.edu.cn/winget-source/

执行

```bash
winget source add --name ustc-mirror https://mirrors.ustc.edu.cn/winget-source/
```

测试

```bash
winget source update
```
