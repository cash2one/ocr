using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Script.Serialization;

namespace baiduaip
{
	public class Nlp
	{

		//分词接口
		public static string wordseg() { 
			string host = "https://aip.baidubce.com/rpc/2.0/nlp/v1/wordseg";
			List<KeyValuePair<string, string>> paraList = new List<KeyValuePair<string, string>>();
			paraList.Add(new KeyValuePair<string, string>("access_token", AccessToken.TOKEN));
			paraList.Add(new KeyValuePair<string, string>("query", "百度是一家高科技公司"));
			paraList.Add(new KeyValuePair<string, string>("lang_id", "1"));// 输入字符串的语言对应的id，简体中文设置为1（目前不支持其他语言）
			HttpClient client = new HttpClient();
			HttpResponseMessage response = client.PostAsync(host, new FormUrlEncodedContent(paraList)).Result;
			string result = response.Content.ReadAsStringAsync().Result;
			Console.WriteLine(result);
			return result;
		}

		//词性标注接口
		public static string wordpos()
		{
			string host = "https://aip.baidubce.com/rpc/2.0/nlp/v1/wordpos";
			List<KeyValuePair<string, string>> paraList = new List<KeyValuePair<string, string>>();
			paraList.Add(new KeyValuePair<string, string>("access_token", AccessToken.TOKEN));
			paraList.Add(new KeyValuePair<string, string>("query", "你好百度"));
			HttpClient client = new HttpClient();
			HttpResponseMessage response = client.PostAsync(host, new FormUrlEncodedContent(paraList)).Result;
			string result = response.Content.ReadAsStringAsync().Result;
			Console.WriteLine(result);
			return result;
		}

		//词向量表示接口
		public static string wordembedding()
		{
			string host = "https://aip.baidubce.com/rpc/2.0/nlp/v1/wordembedding";
			List<KeyValuePair<string, string>> paraList = new List<KeyValuePair<string, string>>();
			paraList.Add(new KeyValuePair<string, string>("access_token", AccessToken.TOKEN));
			paraList.Add(new KeyValuePair<string, string>("query1", "百度"));
			paraList.Add(new KeyValuePair<string, string>("query2", "谷歌"));
			paraList.Add(new KeyValuePair<string, string>("tid", "1"));

			HttpClient client = new HttpClient();
			HttpResponseMessage response = client.PostAsync(host, new FormUrlEncodedContent(paraList)).Result;
			string result = response.Content.ReadAsStringAsync().Result;
			Console.WriteLine(result);
			return result;
		}

		//中文DNN语言模型
		public static string dnnlmcn()
		{
			string host = "https://aip.baidubce.com/rpc/2.0/nlp/v1/dnnlm_cn";
			List<KeyValuePair<string, string>> paraList = new List<KeyValuePair<string, string>>();
			paraList.Add(new KeyValuePair<string, string>("access_token", AccessToken.TOKEN));
			paraList.Add(new KeyValuePair<string, string>("input_sequence", "百度是个搜索公司"));
			HttpClient client = new HttpClient();
			HttpResponseMessage response = client.PostAsync(host, new FormUrlEncodedContent(paraList)).Result;
			string result = response.Content.ReadAsStringAsync().Result;
			Console.WriteLine(result);
			return result;
		}

		//短文本相似度接口
		public static string simnet()
		{
			string host = "https://aip.baidubce.com/rpc/2.0/nlp/v1/simnet?access_token=" + AccessToken.TOKEN;
			List<Dictionary<string,string>> qslots = new List<Dictionary<string,string>>();
			Dictionary<string, string> qslotsp = new Dictionary<string, string>();
			qslotsp.Add("terms_sequence","你好世界");
			qslotsp.Add("type", "0");
			qslotsp.Add("items", "[]");
			qslots.Add(qslotsp);

			List<Dictionary<string, string>> tslots = new List<Dictionary<string, string>>();
			Dictionary<string, string> tslotsp = new Dictionary<string, string>();
			tslotsp.Add("terms_sequence", "你好百度");
			tslotsp.Add("type", "0");
			tslotsp.Add("items", "[]");
			tslots.Add(tslotsp);


			Dictionary<string, object> input = new Dictionary<string, object>();
			input.Add("qslots", qslots);
			input.Add("tslotsp", tslotsp);
			input.Add("type", "0");

			Dictionary<string, object> param = new Dictionary<string, object>();
			param.Add("input", input);

			JavaScriptSerializer json = new JavaScriptSerializer();
			string paramstr = json.Serialize(param);
			HttpClient client = new HttpClient();
			HttpResponseMessage response = client.PostAsync(host, new StringContent(paramstr)).Result;
			string result = response.Content.ReadAsStringAsync().Result;
			Console.WriteLine(result);
			return result;
		}

		//评论观点抽取接口
		public static string commenttag()
		{
			string host = "https://aip.baidubce.com/rpc/2.0/nlp/v1/comment_tag";
			List<KeyValuePair<string, string>> paraList = new List<KeyValuePair<string, string>>();
			paraList.Add(new KeyValuePair<string, string>("access_token", AccessToken.TOKEN));
			paraList.Add(new KeyValuePair<string, string>("comment", "个人觉得福克斯好，外观漂亮年轻，动力和操控性都不错"));
			paraList.Add(new KeyValuePair<string, string>("entity", "NULL"));
			paraList.Add(new KeyValuePair<string, string>("type", "10"));
			HttpClient client = new HttpClient();
			HttpResponseMessage response = client.PostAsync(host, new FormUrlEncodedContent(paraList)).Result;
			string result = response.Content.ReadAsStringAsync().Result;
			Console.WriteLine(result);
			return result;
		}

	}
}
