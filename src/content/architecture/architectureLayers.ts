export type RuntimeLayerId = "semantic" | "planning" | "policy" | "execution";

export type StabilitySystemId =
  | "contract"
  | "validation"
  | "registry"
  | "observability";

export type RuntimeHighlightMapping = {
  strongSystems: StabilitySystemId[];
  weakSystems: StabilitySystemId[];
  highlightedItems: string[];
};

export type LayerSemanticFlow = {
  input: string[];
  process: string[];
  output: string[];
};

export type RuntimeLayerContent = {
  id: RuntimeLayerId;
  title: string;
  responsibility: string;
  semanticFlow: LayerSemanticFlow;
};

export type StabilitySystemContent = {
  id: StabilitySystemId;
  title: string;
  narrative: string;
  items: string[];
};

export const architectureLayersContent = {
  en: {
    eyebrow: "SECTION 02 // INFRASTRUCTURE",
    sectionTitle: "Architecture Layers",
    subtitle:
      "AI execution becomes unreliable when runtime structure is missing.",
    viewModes: {
      core: "Layer View",
      expanded: "Full View",
    },
    spineLabel: "Core Runtime Spine",
    systemsLabel: "Runtime Stability Systems",
    semanticStrip: {
      input: "INPUT",
      process: "PROCESS",
      output: "OUTPUT",
    },
    coreLayers: [
      {
        id: "semantic",
        title: "Semantic Layer",
        responsibility: "Unify operational meaning across runtime systems.",
        semanticFlow: {
          input: ["Natural Language", "Tool Metadata"],
          process: ["Ontology Mapping", "Semantic Resolution"],
          output: ["Structured Entities", "Execution Context"],
        },
      },
      {
        id: "planning",
        title: "Planning Layer",
        responsibility: "Resolve runtime dependencies and execution paths.",
        semanticFlow: {
          input: ["Structured Entities", "Dependency Graph"],
          process: ["Path Resolution", "Requires / Provides"],
          output: ["Execution Plan", "Capability Route"],
        },
      },
      {
        id: "policy",
        title: "Policy Layer",
        responsibility: "Evaluate business rules before execution continues.",
        semanticFlow: {
          input: ["Execution Plan", "Business Context"],
          process: ["Rule Evaluation", "Policy Isolation"],
          output: ["PolicyResult DTO", "Approval Gate"],
        },
      },
      {
        id: "execution",
        title: "Execution Layer",
        responsibility: "Orchestrate tools, services, and runtime actions.",
        semanticFlow: {
          input: ["PolicyResult DTO", "Tool Contracts"],
          process: ["Tool Orchestration", "State Emission"],
          output: ["Audit Trace", "Runtime Actions"],
        },
      },
    ] satisfies RuntimeLayerContent[],
    stabilitySystems: [
      {
        id: "contract",
        title: "Contract System",
        narrative:
          "This system defines structured runtime boundaries between layers.",
        items: [
          "Structured DTO Contracts",
          "Tool Interface Schemas",
          "Runtime Boundary Definitions",
          "Structured LLM Outputs",
        ],
      },
      {
        id: "validation",
        title: "Validation System",
        narrative:
          "This system constrains unstable runtime behavior before execution continues.",
        items: [
          "Syntax Validation",
          "Structure Validation",
          "Dependency Validation",
          "Runtime Parameter Checks",
        ],
      },
      {
        id: "registry",
        title: "Tool Registry",
        narrative:
          "This system supports runtime orchestration and dependency-aware execution planning.",
        items: [
          "Structured Tool Discovery",
          "Execution Capability Mapping",
          "Runtime Tool Routing",
          "Requires / Provides Resolution",
        ],
      },
      {
        id: "observability",
        title: "Observability System",
        narrative:
          "This system makes runtime execution traceable and debuggable.",
        items: [
          "Execution Trace Timeline",
          "Runtime Decision Path",
          "Tool Execution Logs",
          "Runtime State Visibility",
        ],
      },
    ] satisfies StabilitySystemContent[],
    highlightsMap: {
      semantic: {
        strongSystems: ["contract"],
        weakSystems: ["validation"],
        highlightedItems: [
          "Structured DTO Contracts",
          "Runtime Boundary Definitions",
          "Structure Validation",
        ],
      },
      planning: {
        strongSystems: ["registry", "validation"],
        weakSystems: ["contract"],
        highlightedItems: [
          "Execution Capability Mapping",
          "Requires / Provides Resolution",
          "Dependency Validation",
          "Runtime Parameter Checks",
          "Tool Interface Schemas",
        ],
      },
      policy: {
        strongSystems: ["contract", "validation"],
        weakSystems: ["observability"],
        highlightedItems: [
          "Structured DTO Contracts",
          "Structured LLM Outputs",
          "Structure Validation",
          "Runtime Parameter Checks",
          "Runtime Decision Path",
        ],
      },
      execution: {
        strongSystems: ["observability"],
        weakSystems: ["registry"],
        highlightedItems: [
          "Execution Trace Timeline",
          "Tool Execution Logs",
          "Runtime State Visibility",
          "Runtime Tool Routing",
        ],
      },
    } satisfies Record<RuntimeLayerId, RuntimeHighlightMapping>,
  },

  zh: {
    eyebrow: "第三节 // 基础设施",
    sectionTitle: "架构层",
    subtitle: "当运行时结构缺失时，AI 执行将变得不可靠。",
    viewModes: {
      core: "层级视图",
      expanded: "完整视图",
    },
    spineLabel: "核心运行时主干",
    systemsLabel: "运行时稳定性系统",
    semanticStrip: {
      input: "输入",
      process: "处理",
      output: "输出",
    },
    coreLayers: [
      {
        id: "semantic",
        title: "语义层",
        responsibility: "在运行时系统中统一运营语义。",
        semanticFlow: {
          input: ["自然语言", "工具元数据"],
          process: ["本体映射", "语义解析"],
          output: ["结构化实体", "执行上下文"],
        },
      },
      {
        id: "planning",
        title: "规划层",
        responsibility: "解析运行时依赖与执行路径。",
        semanticFlow: {
          input: ["结构化实体", "依赖图"],
          process: ["路径解析", "Requires / Provides"],
          output: ["执行计划", "能力路由"],
        },
      },
      {
        id: "policy",
        title: "策略层",
        responsibility: "在执行继续前评估业务规则。",
        semanticFlow: {
          input: ["执行计划", "业务上下文"],
          process: ["规则评估", "策略隔离"],
          output: ["PolicyResult DTO", "审批闸门"],
        },
      },
      {
        id: "execution",
        title: "执行层",
        responsibility: "编排工具、服务与运行时动作。",
        semanticFlow: {
          input: ["PolicyResult DTO", "工具契约"],
          process: ["工具编排", "状态发射"],
          output: ["审计轨迹", "运行时动作"],
        },
      },
    ] satisfies RuntimeLayerContent[],
    stabilitySystems: [
      {
        id: "contract",
        title: "契约系统",
        narrative: "该系统定义层与层之间的结构化运行时边界。",
        items: [
          "结构化 DTO 契约",
          "工具接口模式",
          "运行时边界定义",
          "结构化 LLM 输出",
        ],
      },
      {
        id: "validation",
        title: "验证系统",
        narrative: "该系统在执行继续前约束不稳定的运行时行为。",
        items: ["语法验证", "结构验证", "依赖验证", "运行时参数检查"],
      },
      {
        id: "registry",
        title: "工具注册表",
        narrative: "该系统支持运行时编排与依赖感知的执行规划。",
        items: [
          "结构化工具发现",
          "执行能力映射",
          "运行时工具路由",
          "Requires / Provides 解析",
        ],
      },
      {
        id: "observability",
        title: "可观测系统",
        narrative: "该系统使运行时执行可追踪、可调试。",
        items: [
          "执行轨迹时间线",
          "运行时决策路径",
          "工具执行日志",
          "运行时状态可见性",
        ],
      },
    ] satisfies StabilitySystemContent[],
    highlightsMap: {
      semantic: {
        strongSystems: ["contract"],
        weakSystems: ["validation"],
        highlightedItems: ["结构化 DTO 契约", "运行时边界定义", "结构验证"],
      },
      planning: {
        strongSystems: ["registry", "validation"],
        weakSystems: ["contract"],
        highlightedItems: [
          "执行能力映射",
          "Requires / Provides 解析",
          "依赖验证",
          "运行时参数检查",
          "工具接口模式",
        ],
      },
      policy: {
        strongSystems: ["contract", "validation"],
        weakSystems: ["observability"],
        highlightedItems: [
          "结构化 DTO 契约",
          "结构化 LLM 输出",
          "结构验证",
          "运行时参数检查",
          "运行时决策路径",
        ],
      },
      execution: {
        strongSystems: ["observability"],
        weakSystems: ["registry"],
        highlightedItems: [
          "执行轨迹时间线",
          "工具执行日志",
          "运行时状态可见性",
          "运行时工具路由",
        ],
      },
    } satisfies Record<RuntimeLayerId, RuntimeHighlightMapping>,
  },
} as const;
