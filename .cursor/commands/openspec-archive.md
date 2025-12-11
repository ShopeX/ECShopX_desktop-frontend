---
name: /openspec-archive
id: openspec-archive
category: OpenSpec
description: 归档已部署的OpenSpec变更并更新规格
---
<!-- OPENSPEC:START -->
**指导原则**
- 优先选择简单、最小化的实现，只有在被明确要求或明显需要时才添加复杂性。
- 将变更严格限制在请求的结果范围内。
- 如需额外的OpenSpec约定或说明，请参考`openspec/AGENTS.md`（位于`openspec/`目录内—如果看不到请运行`ls openspec`或`openspec update`）。

**步骤**
1. 确定要归档的变更ID：
   - 如果此提示已包含特定的变更ID（例如在由斜杠命令参数填充的`<ChangeId>`块内），请在修剪空白后使用该值。
   - 如果对话中松散地引用了变更（例如通过标题或摘要），运行`openspec list`以显示可能的ID，分享相关候选，并确认用户意图。
   - 否则，审查对话，运行`openspec list`，并询问用户要归档哪个变更；在继续之前等待确认的变更ID。
   - 如果仍然无法识别单个变更ID，停止并告诉用户您还无法归档任何内容。
2. 通过运行`openspec list`（或`openspec show <id>`）验证变更ID，如果变更缺失、已归档或未准备好归档则停止。
3. 运行`openspec archive <id> --yes`，使CLI移动变更并应用规格更新而不提示（仅对纯工具工作使用`--skip-specs`）。
4. 审查命令输出以确认目标规格已更新，变更已放置在`changes/archive/`中。
5. 使用`openspec validate --strict`进行验证，如果看起来有问题，使用`openspec show <id>`进行检查。

**参考**
- 在归档之前使用`openspec list`确认变更ID。
- 使用`openspec list --specs`检查刷新的规格，并在移交之前解决任何验证问题。
<!-- OPENSPEC:END -->
