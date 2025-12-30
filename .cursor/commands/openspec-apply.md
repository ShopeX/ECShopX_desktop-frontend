---
name: /openspec-apply
id: openspec-apply
category: OpenSpec
description: 实现已批准的OpenSpec变更并保持任务同步
---
<!-- OPENSPEC:START -->
**指导原则**
- 优先选择简单、最小化的实现，只有在被明确要求或明显需要时才添加复杂性。
- 将变更严格限制在请求的结果范围内。
- 如需额外的OpenSpec约定或说明，请参考`openspec/AGENTS.md`（位于`openspec/`目录内—如果看不到请运行`ls openspec`或`openspec update`）。

**步骤**
将这些步骤作为TODO跟踪并逐一完成。
1. 阅读`changes/<id>/proposal.md`、`design.md`（如果存在）和`tasks.md`以确认范围和验收标准。
2. 按顺序完成任务，保持编辑最小化并专注于请求的变更。
3. 在更新状态之前确认完成—确保`tasks.md`中的每个项目都已完成。
4. 在所有工作完成后更新检查清单，使每个任务标记为`- [x]`并反映现实。
5. 当需要额外上下文时，参考`openspec list`或`openspec show <item>`。

**参考**
- 如果在实现过程中需要提案的额外上下文，使用`openspec show <id> --json --deltas-only`。
<!-- OPENSPEC:END -->
