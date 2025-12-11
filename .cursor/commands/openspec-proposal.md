---
name: /openspec-proposal
id: openspec-proposal
category: OpenSpec
description: 创建新的OpenSpec变更提案并进行严格验证
---
<!-- OPENSPEC:START -->
**指导原则**
- 优先选择简单、最小化的实现，只有在被明确要求或明显需要时才添加复杂性。
- 将变更严格限制在请求的结果范围内。
- 如需额外的OpenSpec约定或说明，请参考`openspec/AGENTS.md`（位于`openspec/`目录内—如果看不到请运行`ls openspec`或`openspec update`）。
- 识别任何模糊或含糊的细节，在编辑文件之前提出必要的后续问题。

**步骤**
1. 审查`openspec/project.md`，运行`openspec list`和`openspec list --specs`，检查相关代码或文档（例如通过`rg`/`ls`）以将提案建立在当前行为基础上；注意任何需要澄清的空白。
2. 选择一个唯一的动词引导的`change-id`，并在`openspec/changes/<id>/`下创建`proposal.md`、`tasks.md`和`design.md`（如需要）。
3. 将变更映射为具体的能力或需求，将多范围工作分解为具有清晰关系和顺序的不同规格增量。
4. 当解决方案跨越多个系统、引入新模式或在提交规格之前需要权衡讨论时，在`design.md`中捕获架构推理。
5. 在`changes/<id>/specs/<capability>/spec.md`中起草规格增量（每个能力一个文件夹），使用`## ADDED|MODIFIED|REMOVED Requirements`，每个需求至少包含一个`#### Scenario:`，并在相关时交叉引用相关能力。
6. 将`tasks.md`起草为有序的小型、可验证工作项目列表，这些项目提供用户可见的进度，包括验证（测试、工具），并突出依赖关系或可并行化的工作。
7. 使用`openspec validate <id> --strict`进行验证，在分享提案之前解决所有问题。

**参考**
- 当验证失败时，使用`openspec show <id> --json --deltas-only`或`openspec show <spec> --type spec`检查详细信息。
- 在编写新需求之前，使用`rg -n "Requirement:|Scenario:" openspec/specs`搜索现有需求。
- 使用`rg <keyword>`、`ls`或直接文件读取探索代码库，使提案与当前实现现实保持一致。
<!-- OPENSPEC:END -->
