export type VirusTotalUrlInfoResponse = {
  error?: {
    code: string;
    message: string;
  };
  data: {
    id: string;
    type: string;
    attributes: {
      last_analysis_stats: {
        harmless: number;
        malicious: number;
        suspicious: number;
        timeout: number;
        undetected: number;
      };
      last_analysis_results: Record<
        string,
        {
          category: string;
          result: string;
          method: string;
          engine_name: string;
        }
      >;
      trackers: string[];
      html_meta: {
        description: string;
        title: string;
        og: {
          description: string;
          title: string;
          type: string;
          url: string;
        };
        twitter: {
          description: string;
          title: string;
          type: string;
          url: string;
        };
      };
      tags: string[];
      last_http_response_headers: Record<string, string>;
      last_http_response_content_sha256: string;
      categories: string[];
      last_http_response_code: number;
      last_http_response_content_length: number;
      last_http_response_content_hash: string;
      last_http_response_date: string;
      title: string;
      url: string;
    };
  };
};

export type VirusTotalScanUrlResponse = {
  data: {
    type: string;
    id: string;
    links: {
      self: string;
    };
  };
};

export type VirusTotalAnalysisResponse = {
  data: {
    type: string;
    id: string;
    links: {
      self: string;
      item: string;
    };
    attributes: {
      date: number;
      status: string;
      results: VirusTotalUrlInfoResponse["data"]["attributes"]["last_analysis_results"];
      stats: VirusTotalUrlInfoResponse["data"]["attributes"]["last_analysis_stats"];
    };
    meta: {
      url_info: {
        id: string;
        url: string;
      };
    };
  };
};
