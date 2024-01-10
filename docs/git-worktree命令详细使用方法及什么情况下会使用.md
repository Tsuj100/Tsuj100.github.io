# git worktree 命令详细使用方法及什么情况下会使用

`git worktree` 是 Git 中的一个命令，它允许你在同一个仓库中同时工作在多个工作目录中，每个目录都有自己的工作树和索引。这对于同时处理多个分支或版本非常有用。以下是 `git worktree` 命令的一些详细使用方法和情况下的常见用例：

### 1. 创建一个新的工作树：

```bash
git worktree add <path> <branch>
```

这会在指定的 `<path>` 目录下创建一个新的工作树，并检出指定的 `<branch>` 分支。例如：

```bash
git worktree add ../my-feature-branch feature-branch
```

这会在上级目录中创建一个新的工作树，切换到 `feature-branch` 分支。

### 2. 查看当前的工作树：

```bash
git worktree list
```

这会列出所有的工作树及其路径。

### 3. 移除工作树：

```bash
git worktree remove <path>
```

这会移除指定路径下的工作树。

### 4. 锁定工作树：

在某些情况下，你可能想要锁定工作树，防止意外的修改。可以使用：

```bash
git worktree lock <path>
```

### 5. 解锁工作树：

如果你需要在一个被锁定的工作树上进行修改，可以使用：

```bash
git worktree unlock <path>
```

### 6. 同时在多个工作树中工作的常见用例：

- **并行开发不同功能或修复：** 你可以为每个任务创建一个独立的工作树，这样它们之间的更改不会相互干扰。
- **测试不同分支：** 你可以在一个工作树上测试一个分支，同时在另一个工作树上测试另一个分支。
- **维护长期和短期修复：** 你可以使用一个工作树来处理长期的功能开发，而另一个工作树则用于及时修复和维护。

`git worktree` 的使用场景主要是在需要同时处理多个任务、分支或版本时。这使得在同一个仓库中进行并行开发变得更加方便。

## 指定某一次提交创建 worktree

在 Git 中，你可以使用 `git worktree` 命令结合提交哈希值来创建一个工作树。以下是具体的步骤：

1. **查看提交历史：**

   首先，你需要找到你想要创建工作树的特定提交的哈希值。可以使用 `git log` 或其他提交历史查看命令来获取。

   ```bash
   git log
   ```

   找到你想要的提交的哈希值。

2. **使用 `git worktree` 创建工作树：**

   使用以下命令创建一个工作树，指定要创建的提交：

   ```bash
   git worktree add -b <branch_name> <path> <commit_hash>
   ```

   - `<branch_name>`：新分支的名称，如果该分支不存在的话。
   - `<path>`：新工作树的路径。
   - `<commit_hash>`：你想要基于的提交的哈希值。

   例如：

   ```bash
   git worktree add -b my-feature ../my-feature-branch abcd1234
   ```

   这会在 `../my-feature-branch` 目录中创建一个新的工作树，基于提交哈希值为 `abcd1234`，并创建一个名为 `my-feature` 的新分支。

请注意，使用 `git worktree add` 时，如果要基于一个已有的分支，可以将 `-b <branch_name>` 部分省略，Git 会自动使用已有的分支。如果指定的分支不存在，Git 会自动创建一个新的分支。

## 开发完如何合并到主分支

一旦你在一个工作树中完成了特定功能的开发，通常的做法是将这些更改合并回主分支（通常是 `master` 或 `main` 分支）。以下是基本的合并步骤：

1. **切换回主分支：**

   ```bash
   git checkout master
   ```

   或者，如果你使用的是 `main` 分支：

   ```bash
   git checkout main
   ```

   这将确保你目前在主分支上。

2. **拉取主分支最新的更改：**

   在合并更改之前，确保你的主分支是最新的：

   ```bash
   git pull origin master
   ```

   或者，如果你使用的是 `main` 分支：

   ```bash
   git pull origin main
   ```

3. **合并你的分支：**

   ```bash
   git merge your-feature-branch
   ```

   或者，如果你使用的是 `main` 分支：

   ```bash
   git merge your-feature-branch
   ```

   这会将你的功能分支的更改合并到主分支。

4. **解决合并冲突（如果有的话）：**

   如果 Git 在合并时发现冲突，它会在合并冲突的文件中显示冲突标记。需要手动解决冲突，然后使用以下命令标记文件为已解决：

   ```bash
   git add <conflicted_file>
   ```

   然后继续合并：

   ```bash
   git merge --continue
   ```

   或者使用以下命令取消合并：

   ```bash
   git merge --abort
   ```

5. **推送到远程仓库：**

   一旦合并完成，将更新推送到远程仓库：

   ```bash
   git push origin master
   ```

   或者，如果你使用的是 `main` 分支：

   ```bash
   git push origin main
   ```

以上步骤基于你的开发是在一个新的分支（例如 `your-feature-branch`）上进行的。确保替换命令中的分支名称以匹配你的实际分支名称。如果你在 `main` 或 `master` 分支上进行开发，可能需要直接在那个分支上提交更改，而不是创建一个新的分支。

## git 如何其它分支上的某一次提交

如果你想将另一个分支上的某一次提交应用到当前分支，可以使用 `git cherry-pick` 命令。以下是具体步骤：

1. **切换到目标分支：**

   首先，确保你在要应用提交的目标分支上：

   ```bash
   git checkout <target-branch>
   ```

   例如：

   ```bash
   git checkout master
   ```

2. **查找要应用的提交的哈希值：**

   使用 `git log` 或其他提交查看命令找到要应用的提交的哈希值：

   ```bash
   git log
   ```

3. **切回到当前分支：**

   切回到你想要应用这个提交的当前分支：

   ```bash
   git checkout <current-branch>
   ```

   例如：

   ```bash
   git checkout feature-branch
   ```

4. **应用提交：**

   使用 `git cherry-pick` 命令应用提交：

   ```bash
   git cherry-pick <commit-hash>
   ```

   例如：

   ```bash
   git cherry-pick abc1234
   ```

   如果应用过程中出现冲突，需要手动解决冲突，然后使用以下命令标记文件为已解决：

   ```bash
   git add <conflicted-file>
   ```

   继续 cherry-pick 过程：

   ```bash
   git cherry-pick --continue
   ```

   或者取消 cherry-pick：

   ```bash
   git cherry-pick --abort
   ```

5. **解决冲突后提交：**

   如果有冲突，解决冲突后，需要手动提交：

   ```bash
   git commit
   ```

6. **推送到远程仓库：**

   最后，如果你想将这个变更推送到远程仓库：

   ```bash
   git push origin <current-branch>
   ```

   例如：

   ```bash
   git push origin feature-branch
   ```

请注意，`git cherry-pick` 是将单个提交应用到当前分支的操作。如果你需要应用多个提交，你可能需要多次执行 `git cherry-pick` 或者考虑其他合并策略，比如使用 `git merge`。
