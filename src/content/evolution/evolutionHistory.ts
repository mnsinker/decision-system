export type EvolutionVersionContent = {
  version: string;
  title: string;
  subtitle: string;
  capability: string;
  changeSummary: string;
  beforeTooltip: string[];
  afterTooltip: string[];
  diagram: {
    before: {
      title?: string;
      nodes: string[];
      helperLabel?: string;
      manualLabel?: string;
    };
    after: {
      title?: string;
      nodes: string[];
      expandedPoints?: string[];
    };
  };
};

export type EvolutionHistoryContent = {
  sectionLabel: string;
  title: string;
  beforeLabel: string;
  afterLabel: string;
  problemsLabel: string;
  capabilitiesLabel: string;
  integrityGuaranteesLabel: string;
  versions: EvolutionVersionContent[];
};

export const evolutionHistoryContent: Record<"en" | "zh", EvolutionHistoryContent> = {
  en: {
    sectionLabel: "SECTION 01",
    title: "How the Architecture Evolved",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER",
    problemsLabel: "Problems",
    capabilitiesLabel: "New Capabilities",
    integrityGuaranteesLabel: "Integrity Guarantees",
    versions: [
      {
        version: "V1",
        title: "Runtime Repair → Pre-runtime Planning",
        subtitle:
          "Extracting runtime topology and path logic outside of the execution loop path.",
        capability: "Dependency-aware execution planning",
        changeSummary: "Move planning out of execution",
        beforeTooltip: [
          "Graph correctness could not be validated upfront",
          "Execution paths emerged during runtime",
          "Dependency issues could only be surfaced after execution started",
        ],
        afterTooltip: [
          "Execution steps became deterministic",
          "Graph correctness became testable upfront",
          "Runtime loop no longer mutates execution paths",
        ],
        diagram: {
          before: {
            helperLabel: "Missing Pre-Flight Domain",
            nodes: ["Runtime Loop", "Missing dep", "Insert step", "Execute"],
          },
          after: { nodes: ["Planned Steps", "Runtime Loop", "Execute"] },
        },
      },
      {
        version: "V2",
        title: "Implicit Trust → Explicit Validation",
        subtitle:
          "Isolating topology health verification away from core calculation execution.",
        capability: "Deterministic upfront structural guarantees",
        changeSummary: "Move validation out of execution",
        beforeTooltip: [
          "Cycle safety existed, but validation only happened during active execution.",
          "Graph integrity was still unknown",
          "Missing producers were undetected",
          "Failures surfaced after execution started",
        ],
        afterTooltip: [
          "Producer Completeness: every required node must be producible",
          "Dependency Completeness: unresolved dependencies are detected upfront",
          "Orphan Detection: orphan nodes are surfaced before execution",
        ],
        diagram: {
          before: {
            helperLabel: "Missing Evaluation Gates",
            nodes: ["RUNTIME LOOP", "Cycle Detection", "Execute"],
          },
          after: {
            nodes: ["VALIDATOR", "RUNTIME LOOP", "Execute"],
            expandedPoints: [
              "Graph correctness became testable upfront.",
              "Execution paths became deterministic.",
              "Failures moved into pre-flight validation.",
            ],
          },
        },
      },
      {
        version: "V3",
        title: "Manual Tool Wiring → Self-Describing Tools",
        subtitle:
          "Decomposing macro objects into granular nodes explicitly typed for runtime routing.",
        capability:
          "Decoupled validation, feature scoring, and strategy branches",
        changeSummary: "Move metadata out of manual wiring",
        beforeTooltip: [
          "Architectural Bottleneck: Monolithic black boxes combine schema constraints, deep neural feature transforms, and fallback strategies, resulting in regression collisions across teams.",
        ],
        afterTooltip: ["Metadata defined once", "Graph derived automatically"],
        diagram: {
          before: {
            title: "3 Sources of Truth",
            nodes: [
              "Tool Signature",
              "Dependency Args",
              "Entity-to-Tool Mapping",
              "Execution Graph",
            ],
            manualLabel: "manual",
          },
          after: {
            title: "Single Source of Truth",
            nodes: ["Tool Signature", "Requires / Provides", "Execution Graph"],
          },
        },
      },
    ],
  },
  zh: {
    sectionLabel: "SECTION 01",
    title: "架构如何演进",
    beforeLabel: "改造前",
    afterLabel: "改造后",
    problemsLabel: "问题",
    capabilitiesLabel: "新增能力",
    integrityGuaranteesLabel: "完整性保障",
    versions: [
      {
        version: "V1",
        title: "运行时修复 → 运行前规划",
        subtitle: "将运行时拓扑与路径逻辑移出执行循环。",
        capability: "具备依赖感知能力的执行规划",
        changeSummary: "将规划移出执行流程",
        beforeTooltip: [
          "无法在执行前校验图的正确性",
          "执行路径仅在运行时出现",
          "依赖问题只能在执行开始后暴露",
        ],
        afterTooltip: [
          "执行步骤变得确定",
          "图的正确性可以在执行前测试",
          "运行时循环不再修改执行路径",
        ],
        diagram: {
          before: {
            helperLabel: "缺少运行前层",
            nodes: ["运行时循环", "缺少依赖", "插入步骤", "执行"],
          },
          after: { nodes: ["已规划步骤", "运行时循环", "执行"] },
        },
      },
      {
        version: "V2",
        title: "隐式信任 → 显式校验",
        subtitle: "将拓扑健康检查从核心执行流程中隔离出来。",
        capability: "确定性的前置结构保障",
        changeSummary: "将校验移出执行流程",
        beforeTooltip: [
          "虽然具备环路安全机制，但校验只发生在实际执行期间。",
          "图的完整性仍然未知",
          "缺失的生产节点无法被识别",
          "故障只能在执行开始后暴露",
        ],
        afterTooltip: [
          "生产者完整性：每个必需节点都必须可被生成",
          "依赖完整性：未解析依赖会在执行前被发现",
          "孤立节点检测：孤立节点会在执行前暴露",
        ],
        diagram: {
          before: {
            helperLabel: "缺少评估关卡",
            nodes: ["运行时循环", "环路检测", "执行"],
          },
          after: {
            nodes: ["校验器", "运行时循环", "执行"],
            expandedPoints: [
              "图的正确性可以在执行前测试。",
              "执行路径变得确定。",
              "故障被前移至运行前校验。",
            ],
          },
        },
      },
      {
        version: "V3",
        title: "手工工具接线 → 自描述工具",
        subtitle: "将宏观对象拆解为可供运行时路由的、显式类型化的细粒度节点。",
        capability: "解耦的校验、特征评分与策略分支",
        changeSummary: "将元数据移出手工配置",
        beforeTooltip: [
          "架构瓶颈：单体黑盒同时承载 schema 约束、深度神经特征转换与兜底策略，导致团队之间出现回归冲突。",
        ],
        afterTooltip: ["元数据只定义一次", "执行图自动推导"],
        diagram: {
          before: {
            title: "三处事实来源",
            nodes: ["工具签名", "依赖参数", "实体到工具映射", "执行图"],
            manualLabel: "手工维护",
          },
          after: {
            title: "单一事实来源",
            nodes: ["工具签名", "需要 / 提供", "执行图"],
          },
        },
      },
    ],
  },
};
