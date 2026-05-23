export const overviewChallengesContent = {
  en: {
    transition: "WHERE DO PROBLEMS COME FROM?",

    interpretationLabel: "System impact",

    sectionLabel: "Operational Complexity",

    title: {
      line1: "Business logic becomes harder",
      line2: "as operational systems fragment.",
    },

    tabs: [
      { id: "challenge1", label: "Dependency Explosion" },
      { id: "challenge2", label: "Policy Fragmentation" },
      { id: "challenge3", label: "Workflow Drift" },
    ],

    challenge1: {
      variant: "variant1",
      businessLabel: "Business Request",
      businessQuote: '"We only need one extra refund condition."',

      interpretationPoints: [
        "Appears as one localized rule change.",
        "Spreads across policies and dependency chains.",
        "Adds execution paths that must stay coordinated.",
      ],

      systemLabel: "System Reality",
      systemQuestions: [
        "Which VIP definition should apply?",
        "Does shipping status affect eligibility?",
        "Should coupon recovery execute too?",
        "Which approval path should run?",
      ],

      consequenceLabel: "Consequence",
      consequenceTitleBeg: "What started as a single rule evolved into a ",
      consequenceHighlight: "dependency collision",
      consequenceTitleEnd: "across multiple execution paths.",
    },

    challenge2: {
      variant: "variant2",

      businessLabel: "Business Request",

      businessQuote: '"VIP users should receive priority customer support."',

      interpretationPoints: [
        "Starts as a single support-policy intent.",
        "Fragments across CRM, tickets, and overrides.",
        "Becomes difficult to audit as one logic surface.",
      ],

      systemLabel: "System Reality",

      systemCards: [
        {
          label: "CRM_RULES",
          items: [
            "VIP tiers are defined differently",
            "Customer priority logic lives inside CRM",
          ],
        },
        {
          label: "TICKET_WORKFLOW",
          items: [
            "Escalation rules exist inside ticket flows",
            "SLA policies are maintained separately",
          ],
        },
        {
          label: "HISTORICAL_EXCEPTIONS",
          items: [
            "Manual override rules still apply",
            "Special-case workflows bypass standard routing",
          ],
        },
      ],

      consequenceLabel: "Consequence",

      consequenceTitleBeg: "What started as a simple policy evolved into ",

      consequenceHighlight: "fragmented decision logic",

      consequenceTitleEnd: "across multiple operational systems.",
    },

    challenge3: {
      variant: "variant3",
      businessLabel: "Business Request",

      businessQuote:
        '"We need a special campaign flow for inactive VIP users."',

      interpretationPoints: [
        "Begins as a campaign workflow request.",
        "Couples targeting, eligibility, and live user state.",
        "Propagates across multiple execution systems.",
      ],

      systemLabel: "System Reality",

      systemQuestions: [
        "VIP definitions now differ across systems",
        "A/B routing logic must support multiple campaign paths",
        "Coupon eligibility rules require dynamic filtering",
        "Campaign execution now depends on real-time user state",
      ],

      consequenceLabel: "Consequence",

      consequenceTitleBeg: "What started as a workflow update evolved into ",

      consequenceHighlight: "unstable campaign rules",

      consequenceTitleEnd: "across changing operational environments.",
    },
  },

  zh: {
    transition: "问题从哪里开始出现？",

    interpretationLabel: "系统影响",

    sectionLabel: "运营复杂度",

    title: {
      line1: "业务逻辑会变得更难，",
      line2: "因为运营系统正在不断碎片化。",
    },

    tabs: [
      { id: "challenge1", label: "依赖扩散" },
      { id: "challenge2", label: "策略碎片化" },
      { id: "challenge3", label: "工作流漂移" },
    ],

    challenge1: {
      variant: "variant1",

      businessLabel: "业务需求",

      businessQuote: "我们只需要再加一个退款条件。",

      interpretationPoints: [
        "表面上只是一个局部规则变更。",
        "会扩散到策略与依赖链路。",
        "并引入需要协同的执行路径。",
      ],

      systemLabel: "系统现实",

      systemQuestions: [
        "应该采用哪一种 VIP 定义？",
        "物流状态是否会影响退款资格？",
        "是否还需要执行优惠券回收？",
        "当前应该走哪条审批路径？",
      ],

      consequenceLabel: "结果",

      consequenceTitleBeg: "最初只是一个简单规则，最终却演变成了",

      consequenceHighlight: "依赖冲突",

      consequenceTitleEnd: "并扩散到多个运营系统之中。",
    },

    challenge2: {
      variant: "variant2",

      businessLabel: "业务需求",

      businessQuote: "VIP 用户应该获得优先客服支持。",

      interpretationPoints: [
        "最初只是一个客服策略诉求。",
        "分散到 CRM、工单与 override 逻辑。",
        "越来越难作为统一逻辑面审计。",
      ],

      systemLabel: "系统现实",

      systemCards: [
        {
          label: "CRM_RULES",

          items: [
            "不同系统中的 VIP 等级定义并不一致",
            "客户优先级逻辑存在于 CRM 系统内部",
          ],
        },

        {
          label: "TICKET_WORKFLOW",

          items: ["升级规则存在于工单流程中", "SLA 策略被单独维护"],
        },

        {
          label: "HISTORICAL_EXCEPTIONS",

          items: ["人工 override 规则依然存在", "特殊流程绕过了标准路由逻辑"],
        },
      ],

      consequenceLabel: "结果",

      consequenceTitleBeg: "最初只是一个简单策略，最终却演变成了",

      consequenceHighlight: "碎片化的运营逻辑",

      consequenceTitleEnd: "并散落在多个割裂的系统中。",
    },

    challenge3: {
      variant: "variant3",

      businessLabel: "业务需求",

      businessQuote: "我们需要为沉默 VIP 用户增加一条特殊营销流程。",

      interpretationPoints: [
        "最初只是一条营销活动流程需求。",
        "耦合分群、资格判断与实时用户状态。",
        "并扩散到多个执行系统。",
      ],

      systemLabel: "系统现实",

      systemQuestions: [
        "不同系统中的 VIP 定义已经开始不一致",
        "A/B 路由逻辑需要支持多条营销路径",
        "优惠券资格规则需要动态过滤",
        "营销执行开始依赖实时用户状态",
      ],

      consequenceLabel: "结果",

      consequenceTitleBeg: "最初只是一次工作流更新，最终却演变成了",

      consequenceHighlight: "不稳定的运行时行为",

      consequenceTitleEnd: "并扩散到不断变化的运营环境中。",
    },
  },
};
