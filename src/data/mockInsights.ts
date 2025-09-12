// Updated data structure to match the new comprehensive format
export const mockInsightsData = {
  keywordData: [
    {
      keyword: "customer support chatbot",
      id: "68b48f00f62969a00768791a",
      type: "product",
      status: "completed",
      analytics: {
        insight_cards: [
          {
            title: "Market Positioning",
            value: "SMB friendly support automation",
            trend: "stable",
            description: "Positioned as an affordable chatbot and live chat platform for small and medium businesses offering bot plus human agent workflows",
            icon: "positioning"
          },
          {
            title: "Core Strengths", 
            value: "Bot to human handoff",
            trend: "up",
            description: "Search results consistently highlight bot to agent escalation with full conversation context and integrations",
            icon: "strength"
          },
          {
            title: "Competitive Pressure",
            value: "High",
            trend: "up", 
            description: "Multiple established competitors cited including Intercom, Zendesk, Freshchat, Drift, and Ada",
            icon: "competition"
          },
          {
            title: "User Sentiment",
            value: "Generally positive with gaps",
            trend: "mixed",
            description: "Fast setup and hybrid workflows are praised, but smaller ecosystem versus incumbents noted",
            icon: "sentiment"
          }
        ],
        recommended_actions: [
          {
            category: "Marketing",
            priority: "high",
            action: "Emphasize hybrid bot to human handoff case studies and SMB ROI in landing pages",
            impact: "Improved lead conversion from support focused buyers and differentiation versus competitors",
            effort: "low"
          },
          {
            category: "Product Development", 
            priority: "high",
            action: "Simplify multilingual setup and ship clear integration templates for common providers",
            impact: "Reduced implementation friction for multilingual customers and faster deployments",
            effort: "medium"
          },
          {
            category: "Partnerships and Integrations",
            priority: "medium", 
            action: "Expand and document native connectors for Zendesk Salesforce and other top helpdesk CRMs",
            impact: "Broader appeal to buyers evaluating platform fit with existing helpdesk ecosystems",
            effort: "medium"
          }
        ],
        drilldowns: {
          query_explorer: [
            {
              query: "customer support chatbot with analytics and reporting features",
              performance_score: 0,
              search_volume: "",
              competition: ""
            },
            {
              query: "real user reviews of chatbot for customer support",
              performance_score: 0,
              search_volume: "",
              competition: ""
            },
            {
              query: "affordable customer support chatbots for startups",
              performance_score: 0,
              search_volume: "",
              competition: ""
            }
          ],
          sources_list: [
            {
              source: "https://g2.com",
              frequency: 9,
              relevance_score: 9,
              url: "https://g2.com"
            },
            {
              source: "https://www.capterra.com", 
              frequency: 4,
              relevance_score: 4,
              url: "https://www.capterra.com"
            },
            {
              source: "https://www.zendesk.com",
              frequency: 4,
              relevance_score: 4,
              url: "https://www.zendesk.com"
            }
          ],
          attributes_matrix: [
            {
              attribute: "Bot to human handoff",
              value: "Supported with conversation context and routing rules",
              frequency: 5,
              importance: "high"
            },
            {
              attribute: "Multilingual support",
              value: "Supported via integrations and external NLU services",
              frequency: 3,
              importance: "medium"
            },
            {
              attribute: "Integrations", 
              value: "Integrates with Dialogflow Rasa Zendesk Salesforce and messaging channels",
              frequency: 6,
              importance: "high"
            }
          ]
        },
        ai_provider_share: {
          chatgpt: 45,
          perplexity: 25
        }
      }
    },
    {
      keyword: "live chat software",
      id: "68b48f00f62969a00768792b", 
      type: "product",
      status: "completed",
      analytics: {
        insight_cards: [
          {
            title: "Market Positioning",
            value: "Cost-effective live chat solution",
            trend: "up",
            description: "Positioned as affordable live chat with AI capabilities for small to medium businesses",
            icon: "positioning"
          },
          {
            title: "Core Strengths",
            value: "Mobile SDK and omnichannel support", 
            trend: "up",
            description: "Strong mobile integration capabilities and multi-channel messaging support",
            icon: "strength"
          },
          {
            title: "Competitive Pressure",
            value: "Medium",
            trend: "stable",
            description: "Competing against established players like LiveChat, Drift, and Intercom in live chat space",
            icon: "competition"
          },
          {
            title: "User Sentiment",
            value: "Positive for small businesses",
            trend: "up", 
            description: "Users appreciate affordability and ease of setup, some want more advanced features",
            icon: "sentiment"
          }
        ],
        recommended_actions: [
          {
            category: "Marketing",
            priority: "medium",
            action: "Create content highlighting mobile SDK capabilities and omnichannel advantages",
            impact: "Better positioning against mobile-first competitors and improved lead quality",
            effort: "low"
          },
          {
            category: "Product Development",
            priority: "high",
            action: "Enhance analytics dashboard with real-time visitor tracking and conversation insights",
            impact: "Competitive advantage in reporting capabilities and better customer retention",
            effort: "high"
          }
        ],
        drilldowns: {
          query_explorer: [
            {
              query: "best affordable live chat software for small business",
              performance_score: 0,
              search_volume: "",
              competition: ""
            },
            {
              query: "live chat with mobile SDK integration",
              performance_score: 0,
              search_volume: "",
              competition: ""
            }
          ],
          sources_list: [
            {
              source: "https://capterra.com",
              frequency: 7,
              relevance_score: 7,
              url: "https://capterra.com"
            },
            {
              source: "https://softwareadvice.com",
              frequency: 5,
              relevance_score: 5,
              url: "https://softwareadvice.com"
            }
          ],
          attributes_matrix: [
            {
              attribute: "Mobile integration",
              value: "Native SDK support for iOS and Android",
              frequency: 4,
              importance: "high"
            },
            {
              attribute: "Pricing transparency",
              value: "Clear tiered pricing with free entry tier",
              frequency: 6,
              importance: "high"
            }
          ]
        },
        ai_provider_share: {
          chatgpt: 50,
          perplexity: 20
        }
      }
    }
  ],
  
  // Overall analysis combining all keywords
  overall: {
    total_queries: 200,
    ai_provider_share: {
      chatgpt: 47,
      perplexity: 23
    },
    combined_insights: {
      market_positioning: "SMB-focused support automation platform with competitive pricing",
      core_strengths: "Bot-to-human handoff, mobile SDK, and integration flexibility",
      competitive_pressure: "High from established players like Intercom, Zendesk, and specialized live chat tools",
      user_sentiment: "Generally positive, especially among small businesses, with requests for more advanced features"
    },
    top_sources: [
      { source: "https://g2.com", frequency: 16, relevance_score: 9 },
      { source: "https://capterra.com", frequency: 11, relevance_score: 7 },
      { source: "https://zendesk.com", frequency: 4, relevance_score: 6 },
      { source: "https://softwareadvice.com", frequency: 5, relevance_score: 5 }
    ],
    top_queries: [
      "customer support chatbot with analytics and reporting features",
      "best affordable live chat software for small business", 
      "real user reviews of chatbot for customer support",
      "live chat with mobile SDK integration"
    ],
    consolidated_actions: [
      {
        category: "Marketing",
        priority: "high",
        actions: [
          "Emphasize hybrid bot to human handoff case studies",
          "Create content highlighting mobile SDK capabilities", 
          "Focus on SMB ROI messaging across all channels"
        ]
      },
      {
        category: "Product Development",
        priority: "high", 
        actions: [
          "Simplify multilingual setup process",
          "Enhance analytics dashboard with real-time insights",
          "Ship integration templates for common providers"
        ]
      },
      {
        category: "Partnerships and Integrations",
        priority: "medium",
        actions: [
          "Expand native connectors for top helpdesk CRMs",
          "Document integration capabilities more prominently"
        ]
      }
    ]
  },

  // Legacy data structure for existing components
  insights: {
    competitor_share_of_voice: [
      { name: "Zendesk", count: 89, percent: 44.5 },
      { name: "Intercom", count: 67, percent: 33.5 },
      { name: "Freshdesk", count: 45, percent: 22.5 },
      { name: "Help Scout", count: 34, percent: 17 },
      { name: "LiveChat", count: 28, percent: 14 }
    ],
    source_influence: {
      total_citations: 847,
      domains: [
        { domain: "g2.com", count: 156, percent: 18.4 },
        { domain: "capterra.com", count: 134, percent: 15.8 },
        { domain: "trustpilot.com", count: 98, percent: 11.6 },
        { domain: "softwareadvice.com", count: 87, percent: 10.3 },
        { domain: "getapp.com", count: 73, percent: 8.6 }
      ]
    }
  }
};