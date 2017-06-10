using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Script.Serialization;

namespace com.baidu.ai
{
	public class Wordseg
	{
		// 分词接口
		public static string wordseg()
		{
			string token = "########";
			string host = "https://aip.baidubce.com/rpc/2.0/nlp/v1/wordseg?access_token=" + token;
			Dictionary<string, object> para = new Dictionary<string, object>();
			para.Add("query", "百度是一家高科技公司");
			para.Add("lang_id", 1);

			Encoding encoding = Encoding.GetEncoding("GBK");
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(host);
			request.Method = "post";
			request.ContentType = "application/json";
			request.KeepAlive = true;
			JavaScriptSerializer json = new JavaScriptSerializer();
			String str = json.Serialize(para);
			byte[] buffer = encoding.GetBytes(str);
			request.ContentLength = buffer.Length;
			request.GetRequestStream().Write(buffer, 0, buffer.Length);
			HttpWebResponse response = (HttpWebResponse)request.GetResponse();
			StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("GBK"));
			string result = reader.ReadToEnd();
			Console.WriteLine("分词接口:");
			Console.WriteLine(result);
			return result;
		}
	}
}
