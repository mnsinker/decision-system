# Overview Narrative Inventory

## Hero

export const heroContent = {

  en: {
    badge: "AI Decision System",

    title: {
      normal: "AI-powered system for",
      highlight: "structured business decisions",
      end: ".",
    },

    subtitle:
      "An ontology-driven architecture for planning, policy evaluation, and business execution - designed for workflows that cannot be solved by static automation alone.",

    primaryButton: "View Demo",

    secondaryButton: "Architecture",
  },

  zh: {
    badge: "AI 决策系统",

    title: {
      normal: "构建能够",
      highlight: "规划、决策、执行",
      end: "的 AI 系统",
    },

    subtitle:
      "一种面向复杂业务决策的 ontology-driven 架构，用于支持可复用的规划能力与结构化执行流程。",

    primaryButton: "查看 Demo",

    secondaryButton: "系统架构",
  },
};
---

## Challenges

export const challengesContent = {

  en: {

    transition:
      "WHERE DO THESE OPERATIONAL PROBLEMS COME FROM?",

    sectionLabel:
      "Operational Challenges",

    title: {
      line1: "Business logic becomes harder",
      line2: "as systems grow together.",
    },

    tabs: [
      "Planning",
      "Policy Coordination",
      "Operational Change",
    ],

    planning: {

      businessQuote:
        "We just need one extra refund rule.",

      businessDescription:
        "Operational changes often appear simple, but already depend on multiple connected systems underneath.",

      systemQuestions: [
        "Which VIP definition should apply?",
        "Does shipping affect eligibility?",
        "Should coupon recovery run too?",
        "Which approval path should execute?",
      ],

      result:
        "A small operational change now affects multiple systems and execution paths.",
    },
  },
};
---

## Lifecycle

export const lifecycleContent = {

  en: {

    transition:
      "HOW THE SYSTEM HANDLES THESE PROBLEMS.",

    sectionLabel:
      "Execution Lifecycle",

    title: {
      line1: "Structured execution,",
      line2: "not static workflows.",
    },

    subtitle:
      "Instead of hardcoding every operational path, the system interprets requests, resolves dependencies, evaluates runtime conditions, and executes traceable actions dynamically.",

    steps: [

      {
        num: "01",
        title: "Interpret",
        desc:
          "Understand the operational request and extract structured intent from runtime input.",
      },

      {
        num: "02",
        title: "Plan",
        desc:
          "Resolve dependencies and prepare execution dynamically across connected systems.",
      },

      {
        num: "03",
        title: "Decide",
        desc:
          "Evaluate policies, approvals, and runtime operational constraints.",
      },

      {
        num: "04",
        title: "Execute",
        desc:
          "Run traceable operational actions with auditable execution results.",
      },

    ],
  },
};
---

## Use Cases

export const useCasesContent = {

  en: {

    sectionLabel:
      "Operational Projections",

    title: {
      line1: "One structure.",
      line2: "Diverse utility.",
    },

    subtitle:
      "The same execution model supports different operational workflows across business systems.",

    tabs: [
      "Order Assistant",
      "AI Marketing",
      "Workflow Automation",
    ],

  },

  zh: {

    sectionLabel:
      "业务投影",

    title: {
      line1: "一个结构。",
      line2: "多种业务能力。",
    },

    subtitle:
      "同一套执行结构，可以支持不同类型的业务流程与运营系统。",

    tabs: [
      "订单助手",
      "AI营销",
      "工作流自动化",
    ],

  },

};