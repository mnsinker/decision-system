export const overviewUseCasesContent = {
  en: {
    sectionLabel: "Business Applications",

    title: {
      line1: "One structure.",
      line2: "Diverse utility.",
    },

    subtitle:
      "The same planning and execution architecture can support different operational workflows through reusable decision and execution layers.",

    cards: [
      {
        label: "USE CASE 01",

        title: "Order Assistant",

        description:
          "Resolve refund eligibility, order dependencies, policy evaluation, and operational execution dynamically.",

        steps: [
          "Interpret request",
          "Resolve dependencies",
          "Evaluate policies",
          "Execute actions",
        ],
      },

      {
        label: "USE CASE 02",

        title: "Approval System",

        description:
          "Resolve approval dependencies, policy evaluation, operational routing, and traceable execution flows",

        steps: [
          "Interpret operational request",
          "Resolve approval dependencies",
          "Evaluate decision policies",
          "Execute operational flow",
        ],
      },
      {
        label: "USE CASE 03",

        title: "AI Marketing",

        description:
          "Coordinate segmentation, promotion eligibility, policy evaluation, and campaign execution across operational systems.",

        steps: [
          "Interpret audience state",
          "Resolve dependencies",
          "Evaluate campaign policies",
          "Execute campaign flow",
        ],
      },
    ],

    runtimeLabel: "Runtime Trace",

    runtimeFooter: "> decision_flow --executed",

    cta: "Explore in Architecture",

    bottomLabel: "Formalized Logic & Auditability",
  },

  zh: {
    sectionLabel: "业务应用场景",

    title: {
      line1: "同一个结构，",
      line2: "支持多种业务场景。",
    },

    subtitle:
      "同一套规划与执行架构，可以通过可复用的决策层与执行层，支持不同类型的运营工作流。",

    cards: [
      {
        label: "场景 01",

        title: "订单助手",

        description:
          "动态处理退款资格判断、订单依赖关系、策略评估以及运营执行流程。",

        steps: ["理解请求", "解析依赖关系", "评估业务策略", "执行运营动作"],
      },

      {
        label: "场景 02",

        title: "审批系统",

        description: "处理审批依赖、策略评估、运营路由以及可追踪的执行流程。",

        steps: ["理解运营请求", "解析审批依赖", "评估决策策略", "执行运营流程"],
      },

      {
        label: "场景 03",

        title: "AI 营销系统",

        description:
          "协调用户分层、营销资格判断、策略评估以及跨系统营销执行流程。",

        steps: ["理解用户状态", "解析依赖关系", "评估营销策略", "执行营销流程"],
      },
    ],

    runtimeLabel: "运行轨迹",

    runtimeFooter: "> decision_flow --executed",

    cta: "查看系统架构",

    bottomLabel: "结构化逻辑与可审计性",
  },
};
