import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProductAnalytics, getKeywordAnalytics } from "@/apiHelpers";

interface ResultsData {
  website: string;
  keywords: string[];
  product: {
    id: string;
    name: string;
  };
  search_keywords: Array<{
    id: string;
    keyword: string;
  }>;
  isExample?: boolean;
}

interface InsightCard {
  title: string;
  value: string;
  trend: "up" | "down" | "stable";
  description: string;
  icon: string;
}

interface RecommendedAction {
  category: string;
  priority: "high" | "medium" | "low";
  action: string;
  impact: string;
  effort: "high" | "medium" | "low";
}

interface AnalyticsData {
  id: string;
  type: string;
  status: string;
  analytics: {
    insight_cards: InsightCard[];
    recommended_actions: RecommendedAction[];
    drilldowns: {
      query_explorer: Array<{
        query: string;
        performance_score: number;
        search_volume: string;
        competition: string;
      }>;
      sources_list: Array<{
        source: string;
        frequency: number;
        relevance_score: number;
        url: string;
      }>;
      attributes_matrix: Array<{
        attribute: string;
        value: string;
        frequency: number;
        importance: string;
      }>;
    };
    reason_missing?: string;
  };
  created_at: string;
  updated_at: string;
}

export default function Results() {
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const [currentTab, setCurrentTab] = useState("overall");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [keywordAnalytics, setKeywordAnalytics] = useState<Record<string, AnalyticsData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const accessToken = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch overall analytics data
  const fetchOverallAnalytics = async () => {
    if (!resultsData || !accessToken) return;

    setIsLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
      const response = await getProductAnalytics(resultsData.product.id, today, accessToken);
      setAnalyticsData(response);
    } catch (error) {
      console.error("Error fetching overall analytics:", error);
      toast.error("Failed to load overall analytics");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch keyword analytics data
  const fetchKeywordAnalytics = async (keywordId: string) => {
    if (!accessToken || keywordAnalytics[keywordId]) return;

    try {
      const today = new Date().toISOString().split("T")[0];
      const response = await getKeywordAnalytics(keywordId, today, accessToken);
      setKeywordAnalytics((prev) => ({
        ...prev,
        [keywordId]: response,
      }));
    } catch (error) {
      console.error("Error fetching keyword analytics:", error);
      toast.error("Failed to load keyword analytics");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (location.state) {
      const data = location.state as ResultsData;
      setResultsData(data);
    } else {
      navigate("/input");
    }
  }, [user, navigate, location.state]);

  useEffect(() => {
    if (resultsData && currentTab === "overall") {
      fetchOverallAnalytics();
    }
  }, [resultsData, currentTab]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);

    if (tab.startsWith("keyword-")) {
      const keywordIndex = parseInt(tab.split("-")[1]);
      const keyword = resultsData?.search_keywords?.[keywordIndex];
      if (keyword) fetchKeywordAnalytics(keyword.id);
    } else if (tab === "overall") {
      fetchOverallAnalytics();
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!resultsData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Loading Analysis...</h2>
              <p className="text-muted-foreground">Please wait while we prepare your results.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {/* Brand Info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold">
                  {resultsData.website?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="font-semibold text-lg">{resultsData.website}</h1>
                  <p className="text-sm text-muted-foreground">These insights come directly from AI answers.</p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Keywords analyzed:</span>
                  <span className="font-semibold">{resultsData.search_keywords?.length || 0}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Generated:</span>
                  <span className="font-semibold">{formatDate()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/input")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>

          {/* Keywords Menu */}
          <div className="mb-6">
            <div className="bg-card border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Navigate by Keyword</h3>
              <div className="flex flex-wrap gap-2">
                {resultsData.search_keywords?.map((keyword, index) => (
                  <Button
                    key={index}
                    variant={currentTab === `keyword-${index}` ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTabChange(`keyword-${index}`)}
                    className="text-sm"
                  >
                    {keyword.keyword}
                  </Button>
                ))}
                <Button
                  variant={currentTab === "overall" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTabChange("overall")}
                  className="text-sm"
                >
                  Overall View
                </Button>
              </div>
            </div>
          </div>

          {/* Render overall or keyword-specific content */}
          {currentTab === "overall" ? (
            <div>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4 animate-spin" />
                    <p className="text-muted-foreground">Loading analytics...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Insight Cards */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    {analyticsData?.analytics?.insight_cards?.map((card, index) => (
                      <Card key={index} className="card-gradient border-0">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                              <span className="text-sm font-medium">{card.title}</span>
                            </div>
                            {getTrendIcon(card.trend)}
                          </div>
                          <div className="text-lg font-semibold mb-2">{card.value}</div>
                          <p className="text-xs text-muted-foreground">{card.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Recommended Actions */}
                  <Card className="card-gradient border-0 mb-8">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Recommended Actions</h3>
                      <div className="space-y-4">
                        {analyticsData?.analytics?.recommended_actions?.map((action, index) => (
                          <div key={index} className="p-4 rounded-lg bg-accent/50">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant={getPriorityColor(action.priority) as any}>{action.priority.toUpperCase()}</Badge>
                              <span className="font-semibold">{action.category}</span>
                              <Badge variant="outline">{action.effort} effort</Badge>
                            </div>
                            <p className="text-sm mb-2">{action.action}</p>
                            <p className="text-xs text-muted-foreground">{action.impact}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Drilldowns */}
                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    {/* Query Explorer */}
                    <Card className="card-gradient border-0">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-4">Query Explorer</h3>
                        <div className="space-y-3">
                          {analyticsData?.analytics?.drilldowns?.query_explorer?.slice(0, 8).map((query, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium flex-shrink-0 mt-1">
                                {query.performance_score}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm">{query.query}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline" className="text-xs">{query.search_volume}</Badge>
                                  <Badge variant="outline" className="text-xs">{query.competition}</Badge>
                                </div>
                              </div>
                            </div>
                          )) || <p className="text-muted-foreground text-sm">No queries found</p>}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Sources List */}
                    <Card className="card-gradient border-0">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-4">Top Sources</h3>
                        <div className="space-y-3">
                          {analyticsData?.analytics?.drilldowns?.sources_list?.map((source, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium">{source.source}</p>
                                <p className="text-xs text-muted-foreground">{source.url}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{source.frequency}</Badge>
                                <div className="w-16 h-2 bg-muted rounded-full">
                                  <div
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${Math.min((source.relevance_score / 10) * 100, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )) || <p className="text-muted-foreground text-sm">No sources found</p>}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Attributes Matrix */}
                  <Card className="card-gradient border-0">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Key Attributes</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {analyticsData?.analytics?.drilldowns?.attributes_matrix?.map((attr, index) => (
                          <div key={index} className="p-4 rounded-lg bg-accent/30">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{attr.attribute}</h4>
                              <Badge variant={attr.importance === "high" ? "default" : "outline"}>{attr.importance}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{attr.value}</p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs">Frequency:</span>
                              <Badge variant="outline">{attr.frequency}</Badge>
                            </div>
                          </div>
                        )) || <p className="text-muted-foreground text-sm">No attributes found</p>}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          ) : (
            <KeywordTab
              currentTab={currentTab}
              resultsData={resultsData}
              keywordAnalytics={keywordAnalytics}
              getTrendIcon={getTrendIcon}
              getPriorityColor={getPriorityColor}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

// Optional: Move keyword-specific rendering to a separate component
function KeywordTab({
  currentTab,
  resultsData,
  keywordAnalytics,
  getTrendIcon,
  getPriorityColor,
}: any) {
  const keywordIndex = parseInt(currentTab.split("-")[1]);
  const keyword = resultsData.search_keywords?.[keywordIndex];
  const keywordData = keyword ? keywordAnalytics[keyword.id] : null;

  if (!keyword) return null;

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">Insights for "{keyword.keyword}"</h3>
        <p className="text-muted-foreground">Deep dive analysis for this keyword</p>
      </div>

      {keywordData ? (
        <>
          {/* Insight Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {keywordData?.analytics?.insight_cards?.map((card, index) => (
              <Card key={index} className="card-gradient border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                      <span className="text-sm font-medium">{card.title}</span>
                    </div>
                    {getTrendIcon(card.trend)}
                  </div>
                  <div className="text-lg font-semibold mb-2">{card.value}</div>
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            )) || <p className="text-muted-foreground text-sm">No insight cards found</p>}
          </div>

          {/* Recommended Actions */}
          <Card className="card-gradient border-0 mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recommended Actions</h3>
              <div className="space-y-4">
                {keywordData?.analytics?.recommended_actions?.map((action, index) => (
                  <div key={index} className="p-4 rounded-lg bg-accent/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant={getPriorityColor(action.priority) as any}>{action.priority?.toUpperCase()}</Badge>
                      <span className="font-semibold">{action.category}</span>
                      <Badge variant="outline">{action.effort} effort</Badge>
                    </div>
                    <p className="text-sm mb-2">{action.action}</p>
                    <p className="text-xs text-muted-foreground">{action.impact}</p>
                  </div>
                )) || <p className="text-muted-foreground text-sm">No recommended actions</p>}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading analytics for this keyword...</p>
        </div>
      )}
    </div>
  );
}
