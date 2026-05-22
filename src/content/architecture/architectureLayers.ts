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

export type RuntimeLayerContent = {
  id: RuntimeLayerId;
  title: string;
  responsibility: string;
  details: {
    responsibility: string;
    pressure: string;
    current: string;
    future: string;
  };
};

export type StabilitySystemContent = {
  id: StabilitySystemId;
  title: string;
  narrative: string;
  items: string[];
};

export const architectureLayersContent = {
  en: {
    eyebrow: "SECTION 03 // INFRASTRUCTURE",
    sectionTitle: "Architecture Layers",
    subtitle:
      "AI execution becomes unreliable when runtime structure is missing.",
    viewModes: {
      core: "[ Core Runtime ]",
      expanded: "[ Expanded Runtime View ]",
    },
    spineLabel: "Core Runtime Spine",
    systemsLabel: "Runtime Stability Systems",
    systemsHint: "(Toggle Expanded View to show connections)",
    boundariesLabel: "Boundaries Active",
    specLabel: "Synchronized Controller Spec",
    specFields: {
      responsibility: "1. Runtime Responsibility",
      pressure: "2. Runtime Pressure",
      current: "3. Current Implementation",
      future: "4. Future Extensions",
    },
    insights: [
      "Unconstrained conversational prompt interfaces fail standard corporate compliance. Structure-driven runtimes enforce logical integrity.",
      "Isolated state layers guarantee 100% downstream auditability, transforming probabilistic models into repeatable, stable components.",
      "By treating stability mechanisms as continuous validation boundaries rather than static post-processing stages, runtime latency is minimized.",
    ],
    coreLayers: [
      {
        id: "semantic",
        title: "Semantic Layer",
        responsibility: "Unify operational meaning across runtime systems.",
        details: {
          responsibility: "Unify operational meaning across runtime systems.",
          pressure:
            "Business semantics fragment as systems evolve independently.",
          current:
            "Ontology nodes, entity mapping, and semantic runtime contracts.",
          future: "Retrieval-aware semantic resolution.",
        },
      },
      {
        id: "planning",
        title: "Planning Layer",
        responsibility: "Resolve runtime dependencies and execution paths.",
        details: {
          responsibility: "Resolve execution dependencies dynamically.",
          pressure:
            "Operational workflows become difficult to hardcode as dependency graphs grow.",
          current:
            "DFS-based dependency planning using requires/provides relations.",
          future: "Conditional routing and adaptive execution graphs.",
        },
      },
      {
        id: "policy",
        title: "Policy Layer",
        responsibility: "Evaluate business rules before execution continues.",
        details: {
          responsibility: "Evaluate business rules before execution continues.",
          pressure: "Business rules evolve faster than execution infrastructure.",
          current: "Policy isolation through structured PolicyResult DTOs.",
          future: "Context-aware runtime policy evaluation.",
        },
      },
      {
        id: "execution",
        title: "Execution Layer",
        responsibility: "Orchestrate tools, services, and runtime actions.",
        details: {
          responsibility: "Orchestrate tools, services, and runtime actions.",
          pressure:
            "Execution becomes difficult to trace across distributed runtime systems.",
          current: "Structured tool execution with audit trace emission.",
          future: "Adaptive operational execution orchestration.",
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
      core: "[ 核心运行时 ]",
      expanded: "[ 扩展运行时视图 ]",
    },
    spineLabel: "核心运行时主干",
    systemsLabel: "运行时稳定性系统",
    systemsHint: "（切换至扩展视图以显示连接）",
    boundariesLabel: "边界已激活",
    specLabel: "同步控制器规格",
    specFields: {
      responsibility: "1. 运行时职责",
      pressure: "2. 运行时压力",
      current: "3. 当前实现",
      future: "4. 未来扩展",
    },
    insights: [
      "无约束的对话式提示界面难以满足企业合规要求，结构驱动的运行时才能保障逻辑完整性。",
      "隔离的状态层保证下游 100% 可审计，将概率模型转化为可重复、稳定的组件。",
      "将稳定性机制视为持续验证边界而非静态后处理阶段，可最小化运行时延迟。",
    ],
    coreLayers: [
      {
        id: "semantic",
        title: "语义层",
        responsibility: "在运行时系统中统一运营语义。",
        details: {
          responsibility: "在运行时系统中统一运营语义。",
          pressure: "随着系统独立演进，业务语义逐渐碎片化。",
          current: "本体节点、实体映射与语义运行时契约。",
          future: "检索感知的语义解析。",
        },
      },
      {
        id: "planning",
        title: "规划层",
        responsibility: "解析运行时依赖与执行路径。",
        details: {
          responsibility: "动态解析执行依赖。",
          pressure: "依赖图增长后，运营工作流难以硬编码。",
          current: "基于 requires/provides 关系的 DFS 依赖规划。",
          future: "条件路由与自适应执行图。",
        },
      },
      {
        id: "policy",
        title: "策略层",
        responsibility: "在执行继续前评估业务规则。",
        details: {
          responsibility: "在执行继续前评估业务规则。",
          pressure: "业务规则演进速度快于执行基础设施。",
          current: "通过结构化 PolicyResult DTO 实现策略隔离。",
          future: "上下文感知的运行时策略评估。",
        },
      },
      {
        id: "execution",
        title: "执行层",
        responsibility: "编排工具、服务与运行时动作。",
        details: {
          responsibility: "编排工具、服务与运行时动作。",
          pressure: "分布式运行时系统中，执行轨迹难以追踪。",
          current: "结构化工具执行与审计轨迹输出。",
          future: "自适应运营执行编排。",
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
        items: [
          "语法验证",
          "结构验证",
          "依赖验证",
          "运行时参数检查",
        ],
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
        highlightedItems: [
          "结构化 DTO 契约",
          "运行时边界定义",
          "结构验证",
        ],
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
