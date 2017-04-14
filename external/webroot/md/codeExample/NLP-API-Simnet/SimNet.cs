using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Script.Serialization;

namespace com.baidu.ai
{
	public class Simnet
	{
		// 短文本相似度接口
		public static string simnet()
		{
			string token = "########";
			string host = "https://aip.baidubce.com/rpc/2.0/nlp/v1/simnet?access_token=" + token;
			List<Dictionary<string, Object>> qslots = new List<Dictionary<string, Object>>();
			Dictionary<string, Object> qslotsp = new Dictionary<string, Object>();
			qslotsp.Add("terms_sequence", "你好世界");
			qslotsp.Add("type", 0);
			qslotsp.Add("items", new List<string>());
			qslots.Add(qslotsp);

			List<Dictionary<string, Object>> tslots = new List<Dictionary<string, Object>>();
			Dictionary<string, Object> tslotsp = new Dictionary<string, Object>();
			tslotsp.Add("terms_sequence", "你好百度");
			tslotsp.Add("type", 0);
			tslotsp.Add("items", new List<string>());
			tslots.Add(tslotsp);

			Dictionary<string, object> input = new Dictionary<string, object>();
			input.Add("qslots", qslots);
			input.Add("tslots", tslots);
			input.Add("type", 0);

			Dictionary<string, object> param = new Dictionary<string, object>();
			param.Add("input", input);

			JavaScriptSerializer json = new JavaScriptSerializer();
			string paramstr = json.Serialize(param);
			Encoding encoding = Encoding.GetEncoding("GBK");
			byte[] buffer = encoding.GetBytes(paramstr);
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/json";
			request.KeepAlive = true;
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("GBK"));
			string result = reader.ReadToEnd();
			Console.WriteLine("短文本相似度接口:");
			Console.WriteLine(result);
			return result;
		}
	}
}
