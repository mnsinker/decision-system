type ConsequenceItem = {
  title: string;
  msg: string;
};

type HoverCardItem = {
  title: string;
  msg: string;
};

type LeftCardContent = {
  pressure: string;
  label: string;
  badges: string[];
  rootCauseTitle: string;
  rootCauseMsg: string;
  hoverHint: string;
  hoverCards: HoverCardItem[];
  engineeringConsequencesTitle: string;
  consequences: ConsequenceItem[];
};

type RightCardContent = {
  label: string;
  layerTitle: string;
  layerSubtitle: string;
  architectureShiftTitle: string;
  architectureShiftMsg: string;
  plannerLabel: string;
  outputLabel: string;
  nodes: string[];
};

type ModuleContent = {
  bizCase: string;
  leftCard: LeftCardContent;
  rightCard: RightCardContent;
};

// 显式声明模块字典结构，满足严格校验并消除未引用的 TS 报警
type LanguageContent = {
  eyebrow: string;
  sectionTitle: string;
  label: string;

  tabs: { id: string; label: string }[];
  modules: {
    tab1: ModuleContent;
    tab2: ModuleContent;
    tab3: ModuleContent;
  };
};

export const architecturePressureContent: Record<string, LanguageContent> = {
  en: {
    eyebrow: "SECTION 01 // Runtime Pressure",
    sectionTitle: "Different pressures activate different layers.",

    tabs: [
      { id: "tab1", label: "Semantic Consistency" },
      { id: "tab2", label: "Runtime Planning" },
      { id: "tab3", label: "Policy Isolation" },
    ],

    label: "Business Case",

    modules: {
      tab1: {
        bizCase:
          "\"Define 'VIP Status' consistently across 5 different operational tools.\"",
        leftCard: {
          pressure: "VIP means different things in different systems.",
          label: "Runtime Pressure",
          badges: ["Data Fragment", "Distributed Definitions"],
          rootCauseTitle: "Root Cause (Semantic Fragmentation)",
          rootCauseMsg:
            "Operational meaning leaks into individual front-facing systems without a runtime contract.",
          hoverHint: "Trace shared definitions across unmapped system nodes.",
          hoverCards: [],
          engineeringConsequencesTitle: "Engineering Consequences",
          consequences: [],
        },
        rightCard: {
          label: "Architecture Response",
          layerTitle: "Semantic Layer",
          layerSubtitle: "Shared runtime meaning across systems.",
          architectureShiftTitle: "Architectural Shift",
          architectureShiftMsg:
            "Operational definitions move out of fragmented client tools into a centralized runtime contract.",
          plannerLabel: "Semantic Resolver",
          outputLabel: "Unified Entity",
          nodes: ["CRM", "Billing", "Support", "Analytics"],
        },
      },

      tab2: {
        bizCase:
          '"Add a regional shipping-zone tax rule into an existing refund flow."',
        leftCard: {
          pressure:
            "Small parameter changes gradually entangle the execution flow.",
          label: "Runtime Pressure",
          badges: ["Procedural Coding", "Implicit Dependency Graph"],
          rootCauseTitle: "Root Cause (Procedural Coupling)",
          rootCauseMsg: "Dependency graph only exists implicitly in code.",
          hoverHint:
            "Hover highlighted lines to trace implicit architecture leak.",
          hoverCards: [
            {
              title: "Hidden Dependency",
              msg: "Tax calculation silently depends on shipping runtime context.",
            },
            {
              title: "Implicit Coupling",
              msg: "Eligibility now depends on shipping runtime context through parameter propagation.",
            },
          ],
          engineeringConsequencesTitle: "Engineering Consequences",
          consequences: [
            {
              title: "Hard to Test",
              msg: "Tests must reason about full runtime order instead of isolated dependency edges.",
            },
            {
              title: "Hard to Audit",
              msg: "Execution paths must be reconstructed from procedural flow instead of explicit dependency contracts.",
            },
            {
              title: "High Blast Radius",
              msg: "Small dependency changes silently rewrite downstream orchestration behavior.",
            },
          ],
        },
        rightCard: {
          label: "Architecture Response",
          layerTitle: "Planning Layer",
          layerSubtitle: "Execution paths are resolved dynamically.",
          architectureShiftTitle: "Architectural Shift",
          architectureShiftMsg:
            "Dependency resolution moves out of procedural runtime flow into an explicit planning layer.",
          plannerLabel: "Dependency Planner",
          outputLabel: "Refund Eligibility",
          nodes: ["Order", "Shipping", "History", "TaxProfile", "Contract"],
        },
      },

      tab3: {
        bizCase:
          '"Apply custom coupon rules for VIPs without touching core execution code."',
        leftCard: {
          pressure:
            "Logic pollution. Business rules are leaking into execution services, creating a brittle black box.",
          label: "Runtime Pressure",
          badges: ["Business Rule Leakage", "Execution Coupling"],
          rootCauseTitle: "Root Cause (Policy Leakage)",
          rootCauseMsg:
            "Business decision logic is embedded directly into execution services.",
          hoverHint: "Hover highlighted lines to trace policy leakage.",
          hoverCards: [
            {
              title: "Business Rule Leakage",
              msg: "Coupon eligibility is hardcoded directly into the execution flow.",
            },
            {
              title: "Policy Coupling",
              msg: "Adding new marketing rules now requires modifying execution services.",
            },
          ],
          engineeringConsequencesTitle: "Engineering Consequences",
          consequences: [
            {
              title: "Hard to Scale",
              msg: "Every new policy requires modifying execution services.",
            },
            {
              title: "Hard to Reuse",
              msg: "Business rules cannot be composed independently.",
            },
            {
              title: "Hard to Govern",
              msg: "Policy evolution gradually contaminates the orchestration layer.",
            },
          ],
        },
        rightCard: {
          label: "Architecture Response",
          layerTitle: "Policy Layer",
          layerSubtitle:
            "Decision logic is isolated into reusable policy layers, decoupled from the execution path.",
          architectureShiftTitle: "Architectural Shift",
          architectureShiftMsg:
            "Business decision logic moves out of execution flow into independent policy layers.",
          plannerLabel: "Policy Engine",
          outputLabel: "Coupon Decision",
          nodes: [
            "UserProfile",
            "CampaignPolicy",
            "CouponRules",
            "RiskPolicy",
            "EligibilityPolicy",
          ],
        },
      },
    },
  },

  zh: {
    eyebrow: "01 / 运行压力",
    sectionTitle: "不同的压力催生不同的层级",
    tabs: [
      { id: "tab1", label: "语义一致" },
      { id: "tab2", label: "路径规划" },
      { id: "tab3", label: "策略隔离" },
    ],
    label: "业务场景",

    modules: {
      tab1: {
        bizCase: "5 个不同系统，都定义了 VIP 用户。",
        leftCard: {
          pressure: "VIP 在不同系统中意味着完全不同的东西。",
          label: "运行压力",
          badges: ["数据碎片", "分布式定义"],
          rootCauseTitle: "根因 (语义偏移)",
          rootCauseMsg:
            "同一个业务对象在不同的提示词、工具、DTO 和策略中描述不同。缺乏共享的语义契约，微小的措辞改动可能会悄无声息地改变下游行为。",
          hoverHint: "悬停高亮行以追踪隐式架构泄漏。",
          hoverCards: [],
          engineeringConsequencesTitle: "工程后果",
          consequences: [],
        },
        rightCard: {
          label: "架构响应",
          layerTitle: "语义层",
          layerSubtitle: "在系统间共享运行时含义。",
          architectureShiftTitle: "架构转变",
          architectureShiftMsg:
            "运营定义从破碎的客户端工具中抽离，进入中心化的运行时契约。",
          plannerLabel: "语义解析器",
          outputLabel: "统一实体",
          nodes: ["CRM", "Billing", "Support", "Analytics"],
        },
      },

      tab2: {
        bizCase: "新增退款税务规则，影响 12 条已有依赖链路。",
        leftCard: {
          pressure: "微小的参数变更正在逐步纠缠整个执行流。",
          label: "运行压力",
          badges: ["过程式编码", "隐式依赖图"],
          rootCauseTitle: "根因 (过程式耦合)",
          rootCauseMsg: "依赖关系图仅隐式存在于代码中。",
          hoverHint: "悬停高亮行以追踪隐式架构泄漏。",
          hoverCards: [
            {
              title: "隐藏依赖",
              msg: "税务计算悄悄依赖了 shipping 的运行时上下文。",
            },
            {
              title: "隐式耦合",
              msg: "Eligibility 通过参数传播开始依赖 shipping 运行时上下文。",
            },
          ],
          engineeringConsequencesTitle: "工程后果",
          consequences: [
            {
              title: "难以测试",
              msg: "测试必须推理整个运行时顺序，而不是隔离的依赖边。",
            },
            {
              title: "难以审计",
              msg: "必须从过程式流中重建执行路径，而非显式的依赖契约。",
            },
            {
              title: "连锁影响",
              msg: "微小的依赖改动会悄悄重写下游业务逻辑。",
            },
          ],
        },
        rightCard: {
          label: "架构响应",
          layerTitle: "规划层",
          layerSubtitle: "执行路径被动态解析和规划。",
          architectureShiftTitle: "架构转变",
          architectureShiftMsg:
            "依赖解析从过程式运行时流中抽离，进入显式的规划层。",
          plannerLabel: "依赖规划器",
          outputLabel: "退款资格",
          nodes: ["Order", "Shipping", "History", "TaxProfile", "Contract"],
        },
      },

      tab3: {
        bizCase: "为 VIP 用户增加特殊优惠券逻辑，而不修改核心执行代码。",
        leftCard: {
          pressure:
            "逻辑污染。业务规则正在泄漏进执行服务中，形成了一个易碎的黑盒。",
          label: "运行压力",
          badges: ["业务规则泄漏", "执行耦合"],
          rootCauseTitle: "根因 (策略泄漏)",
          rootCauseMsg: "业务决策逻辑直接嵌入到了执行服务中。",
          hoverHint: "悬停高亮行以追踪策略泄漏。",
          hoverCards: [
            {
              title: "业务规则泄漏",
              msg: "优惠券资格直接硬编码在执行流中。",
            },
            {
              title: "策略耦合",
              msg: "新增营销规则需要直接修改执行服务。",
            },
          ],
          engineeringConsequencesTitle: "工程后果",
          consequences: [
            {
              title: "难以扩展",
              msg: "每次新增策略都需要修改执行服务。",
            },
            {
              title: "难以复用",
              msg: "业务规则无法独立组合。",
            },
            {
              title: "难以治理",
              msg: "策略演化逐渐污染了整个编排层。",
            },
          ],
        },
        rightCard: {
          label: "架构响应",
          layerTitle: "规则层",
          layerSubtitle: "决策逻辑被隔离为可复用的规则层，与执行路径解耦。",
          architectureShiftTitle: "架构转变",
          architectureShiftMsg:
            "业务决策逻辑从执行流中抽离，进入独立的规划层。",
          plannerLabel: "规划引擎",
          outputLabel: "优惠券决策",
          nodes: [
            "UserProfile",
            "CampaignPolicy",
            "CouponRules",
            "RiskPolicy",
            "EligibilityPolicy",
          ],
        },
      },
    },
  },
};
