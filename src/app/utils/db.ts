import { createClient } from "@supabase/supabase-js";
import { ProductAnalysisInfo, ProjectListItem, ProductData } from "../data";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getProjectList = async (): Promise<ProjectListItem[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id,project_name");
    if (error) {
      throw error;
    }
    return data as ProjectListItem[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductAnalysis = async (id: string): Promise<ProductAnalysisInfo> => {
  try {
    const productInfoReq = supabase.from("products").select("*").eq("id", id);
    const dtmIngoReq = supabase.from("dtm").select("*").eq("product_id", id);

    const [{ data, error }, { data: dtmData, error: dtmError }] =
      await Promise.all([productInfoReq, dtmIngoReq]);

    if (error) throw error;
    if (dtmError) throw dtmError;

    return {
      p_data: data[0] as ProductData,
      dtm_result: dtmData,
      decomposed_trend: [],
      decomposed_seasonal: [],
      seasonality_score: 0,
      period: 0,
    };
  } catch (error) {
    console.error(error);
    return {
      p_data: {
        id: 0,
        product_name: "---",
        project_name: "---",
        pros: [[]],
        cons: [[]],
        csvname: "string",
        trend: [],
        trend_start_date: "",
        trend_end_date: "string",
        trend_warning: false,
        trend_keyword1: "",
        trend_keyword2: "",
      },
      dtm_result: [],
      decomposed_trend: [],
      decomposed_seasonal: [],
      seasonality_score: 0,
      period: 0,
    };
  }
};

export const getOriginalReview = async (productId: string, chosenWord: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from("originaldoc")
      .select("document")
      .eq("product_id", productId)
      .like("tokens", `%${chosenWord}%`);

    if (error) {
      throw error;
    }
    return data.map((item) => item.document);
  } catch (error) {
    console.error(error);
    return [];
  }
};
